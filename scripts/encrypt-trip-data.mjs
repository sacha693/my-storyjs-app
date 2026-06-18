#!/usr/bin/env node
import { webcrypto } from 'node:crypto'
import { readFile, writeFile } from 'node:fs/promises'

const [, , inputPath, outputPath] = process.argv

if (!inputPath || !outputPath) {
  console.error('用法：node scripts/encrypt-trip-data.mjs ./day-plans.json ./encrypted-day-plans.sql')
  process.exit(1)
}

const passphrase = process.env.TRIP_DATA_PASSPHRASE

if (!passphrase) {
  console.error('請先設定 TRIP_DATA_PASSPHRASE 環境變數。')
  process.exit(1)
}

const PBKDF2_ITERATIONS = 210_000
const encoder = new TextEncoder()

function toBase64(bytes) {
  return Buffer.from(bytes).toString('base64')
}

function sqlString(value) {
  return value.replaceAll("'", "''")
}

const plaintext = await readFile(inputPath, 'utf8')
JSON.parse(plaintext)

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

const sql = `insert into public.encrypted_trip_data (trip_id, data_key, salt, iv, ciphertext, is_active)
values (
  'kansai-2026',
  'day_plans',
  '${toBase64(salt)}',
  '${toBase64(iv)}',
  '${sqlString(toBase64(new Uint8Array(ciphertext)))}',
  true
)
on conflict (trip_id, data_key)
do update set
  salt = excluded.salt,
  iv = excluded.iv,
  ciphertext = excluded.ciphertext,
  is_active = true;
`

await writeFile(outputPath, sql, 'utf8')
console.log(`已產生 ${outputPath}`)
