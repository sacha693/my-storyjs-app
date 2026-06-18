#!/usr/bin/env node
import { spawnSync } from 'node:child_process'
import { webcrypto } from 'node:crypto'
import { existsSync } from 'node:fs'
import { mkdir, rm, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROUTE_DATA_COMMIT = 'b9df62c13176faac2da0477a42234d6763f96114'
const PBKDF2_ITERATIONS = 210_000
const TRIP_ID = 'kansai-2026'
const DATA_KEY = 'day_plans'
const RECOVERED_FILES = [
  'src/data/types.ts',
  'src/data/day0.ts',
  'src/data/day1.ts',
  'src/data/day2.ts',
  'src/data/day3.ts',
  'src/data/day4.ts',
  'src/data/day5.ts',
  'src/data/day6.ts',
  'src/data/day7.ts',
  'src/data/day8.ts',
  'src/data/days.ts'
]

const __dirname = dirname(fileURLToPath(import.meta.url))
const repoRoot = resolve(__dirname, '..')
const args = new Set(process.argv.slice(2))
const keepPlaintext = args.has('--keep-plaintext')
const outputSqlPath = resolve(repoRoot, 'private/encrypted-day-plans.sql')
const plaintextJsonPath = resolve(repoRoot, 'private/recovered-day-plans.json')
const workDir = resolve(repoRoot, 'private/recovered-route-data-work')
const sourceRoot = resolve(workDir, 'src')
const dataDir = resolve(sourceRoot, 'data')
const distDir = resolve(workDir, 'dist')
const passphrase = process.env.TRIP_DATA_PASSPHRASE

function run(command, commandArgs, options = {}) {
  const result = spawnSync(command, commandArgs, {
    cwd: repoRoot,
    encoding: 'utf8',
    shell: process.platform === 'win32',
    ...options
  })

  if (result.status !== 0) {
    const detail = [result.stdout, result.stderr].filter(Boolean).join('\n')
    throw new Error(`${command} ${commandArgs.join(' ')} failed.\n${detail}`)
  }

  return result.stdout
}

function toBase64(bytes) {
  return Buffer.from(bytes).toString('base64')
}

function sqlString(value) {
  return value.replaceAll("'", "''")
}

async function writeRecoveredSource() {
  await rm(workDir, { recursive: true, force: true })
  await mkdir(dataDir, { recursive: true })

  for (const file of RECOVERED_FILES) {
    const content = run('git', ['show', `${ROUTE_DATA_COMMIT}:${file}`])
    await writeFile(resolve(workDir, file), content, 'utf8')
  }

  await writeFile(
    resolve(sourceRoot, 'export-day-plans.ts'),
    `import { writeFileSync } from 'node:fs'\nimport { resolve } from 'node:path'\nimport { dayPlans } from './data/days'\n\nwriteFileSync(resolve('${plaintextJsonPath.replaceAll('\\', '\\\\')}'), JSON.stringify(dayPlans, null, 2), 'utf8')\n`,
    'utf8'
  )

  await writeFile(
    resolve(workDir, 'tsconfig.json'),
    JSON.stringify(
      {
        compilerOptions: {
          target: 'ES2022',
          module: 'NodeNext',
          moduleResolution: 'NodeNext',
          outDir: 'dist',
          rootDir: 'src',
          strict: false,
          skipLibCheck: true,
          esModuleInterop: true,
          types: ['node']
        },
        include: ['src/**/*.ts']
      },
      null,
      2
    ),
    'utf8'
  )
}

async function compileRecoveredSource() {
  const localTsc = resolve(repoRoot, 'node_modules/typescript/bin/tsc')

  if (existsSync(localTsc)) {
    run('node', [localTsc, '-p', resolve(workDir, 'tsconfig.json')])
    return
  }

  run('npx', ['tsc', '-p', resolve(workDir, 'tsconfig.json')])
}

async function encryptPlaintext() {
  const plaintext = await import('node:fs/promises').then(({ readFile }) => readFile(plaintextJsonPath, 'utf8'))
  JSON.parse(plaintext)

  const encoder = new TextEncoder()
  const salt = webcrypto.getRandomValues(new Uint8Array(16))
  const iv = webcrypto.getRandomValues(new Uint8Array(12))
  const keyMaterial = await webcrypto.subtle.importKey(
    'raw',
    encoder.encode(passphrase),
    'PBKDF2',
    false,
    ['deriveKey']
  )
  const key = await webcrypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt,
      iterations: PBKDF2_ITERATIONS,
      hash: 'SHA-256'
    },
    keyMaterial,
    {
      name: 'AES-GCM',
      length: 256
    },
    false,
    ['encrypt']
  )
  const ciphertext = await webcrypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv
    },
    key,
    encoder.encode(plaintext)
  )

  const sql = `insert into public.encrypted_trip_data (trip_id, data_key, salt, iv, ciphertext, is_active)\nvalues (\n  '${TRIP_ID}',\n  '${DATA_KEY}',\n  '${toBase64(salt)}',\n  '${toBase64(iv)}',\n  '${sqlString(toBase64(new Uint8Array(ciphertext)))}',\n  true\n)\non conflict (trip_id, data_key)\ndo update set\n  salt = excluded.salt,\n  iv = excluded.iv,\n  ciphertext = excluded.ciphertext,\n  is_active = true;\n`

  await mkdir(dirname(outputSqlPath), { recursive: true })
  await writeFile(outputSqlPath, sql, 'utf8')
}

if (!passphrase) {
  console.error('請先在本機設定 TRIP_DATA_PASSPHRASE。不要把密碼提交或貼到聊天。')
  console.error('範例：TRIP_DATA_PASSPHRASE="your-private-passphrase" npm run recover:encrypted-trip-data')
  process.exit(1)
}

try {
  await mkdir(dirname(outputSqlPath), { recursive: true })
  await writeRecoveredSource()
  await compileRecoveredSource()
  run('node', [resolve(distDir, 'export-day-plans.js')])
  await encryptPlaintext()

  if (!keepPlaintext) {
    await rm(plaintextJsonPath, { force: true })
  }

  await rm(workDir, { recursive: true, force: true })
  console.log(`已產生加密 SQL：${outputSqlPath}`)
  console.log(keepPlaintext ? `已保留明文 JSON：${plaintextJsonPath}` : '明文 JSON 已刪除。')
  console.log('請將 SQL 匯入 Supabase，然後用同一組密碼解鎖 App。')
} catch (error) {
  await rm(workDir, { recursive: true, force: true })
  console.error(error instanceof Error ? error.message : error)
  process.exit(1)
}
