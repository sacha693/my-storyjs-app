#!/usr/bin/env node
import { spawnSync } from 'node:child_process'
import { createRequire } from 'node:module'
import { existsSync } from 'node:fs'
import { mkdir, rm, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROUTE_DATA_COMMIT = 'b9df62c13176faac2da0477a42234d6763f96114'
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
const outputSqlPath = resolve(repoRoot, 'private/trip-data-documents.sql')
const workDir = resolve(repoRoot, 'private/recovered-route-data-work')
const sourceRoot = resolve(workDir, 'src')
const dataDir = resolve(sourceRoot, 'data')
const distDir = resolve(workDir, 'dist')

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

  await writeFile(resolve(workDir, 'package.json'), JSON.stringify({ type: 'commonjs' }), 'utf8')
  await writeFile(
    resolve(workDir, 'tsconfig.json'),
    JSON.stringify(
      {
        compilerOptions: {
          target: 'ES2020',
          module: 'CommonJS',
          moduleResolution: 'Node',
          outDir: 'dist',
          rootDir: 'src',
          strict: false,
          skipLibCheck: true,
          esModuleInterop: true
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

async function readDayPlans() {
  const requireFromWorkDir = createRequire(resolve(workDir, 'package.json'))
  const { dayPlans } = requireFromWorkDir(resolve(distDir, 'data/days.js'))

  if (!Array.isArray(dayPlans) || dayPlans.length === 0) {
    throw new Error('找回的 dayPlans 為空，已停止產生 SQL。')
  }

  return dayPlans
}

function createSql(dayPlans) {
  const payload = sqlString(JSON.stringify(dayPlans))

  return `create table if not exists public.trip_data_documents (
  trip_id text not null,
  data_key text not null,
  payload jsonb not null,
  is_active boolean not null default true,
  updated_at timestamptz not null default now(),
  primary key (trip_id, data_key)
);

alter table public.trip_data_documents enable row level security;

drop policy if exists "Allow public read active trip data" on public.trip_data_documents;
create policy "Allow public read active trip data"
  on public.trip_data_documents
  for select
  using (is_active = true);

insert into public.trip_data_documents (trip_id, data_key, payload, is_active, updated_at)
values (
  '${TRIP_ID}',
  '${DATA_KEY}',
  '${payload}'::jsonb,
  true,
  now()
)
on conflict (trip_id, data_key)
do update set
  payload = excluded.payload,
  is_active = true,
  updated_at = now();
`
}

try {
  await mkdir(dirname(outputSqlPath), { recursive: true })
  await writeRecoveredSource()
  await compileRecoveredSource()
  const dayPlans = await readDayPlans()
  await writeFile(outputSqlPath, createSql(dayPlans), 'utf8')
  await rm(workDir, { recursive: true, force: true })
  console.log(`已產生 Supabase 匯入 SQL：${outputSqlPath}`)
  console.log('這份 SQL 留在 private/，不要提交到 GitHub。匯入 Supabase 後，手機 App 會免密碼讀取。')
} catch (error) {
  await rm(workDir, { recursive: true, force: true })
  console.error(error instanceof Error ? error.message : error)
  process.exit(1)
}
