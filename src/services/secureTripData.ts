import { supabase, TRIP_ID } from './supabase'
import type { DayPlan } from '../data/types'

const PASSPHRASE_STORAGE_KEY = 'kansai-trip-data-passphrase'
const PBKDF2_ITERATIONS = 210_000
const ENCRYPTED_TRIP_DATA_URL = `${import.meta.env.BASE_URL}encrypted-trip-data.json`

export class TripDataUnlockRequiredError extends Error {
  constructor() {
    super('請先輸入旅遊資料密碼。')
    this.name = 'TripDataUnlockRequiredError'
  }
}

type EncryptedTripDataRow = {
  salt: string
  iv: string
  ciphertext: string
}

function base64ToBytes(value: string): Uint8Array<ArrayBuffer> {
  const binary = window.atob(value)
  const buffer = new ArrayBuffer(binary.length)
  const bytes = new Uint8Array(buffer)

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index)
  }

  return bytes
}

function bytesToText(value: ArrayBuffer) {
  return new TextDecoder().decode(value)
}

async function getAesKey(passphrase: string, salt: Uint8Array<ArrayBuffer>) {
  const encodedPassphrase = new TextEncoder().encode(passphrase)
  const keyMaterial = await window.crypto.subtle.importKey(
    'raw',
    encodedPassphrase,
    'PBKDF2',
    false,
    ['deriveKey']
  )

  return window.crypto.subtle.deriveKey(
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
    ['decrypt']
  )
}

function getSavedPassphrase() {
  return window.sessionStorage.getItem(PASSPHRASE_STORAGE_KEY)
}

export function hasTripDataPassphrase() {
  return Boolean(getSavedPassphrase())
}

export function saveTripDataPassphrase(passphrase: string) {
  window.sessionStorage.setItem(PASSPHRASE_STORAGE_KEY, passphrase)
}

export function clearTripDataPassphrase() {
  window.sessionStorage.removeItem(PASSPHRASE_STORAGE_KEY)
}

async function decryptDayPlans(row: EncryptedTripDataRow, passphrase: string) {
  const salt = base64ToBytes(row.salt)
  const iv = base64ToBytes(row.iv)
  const ciphertext = base64ToBytes(row.ciphertext)
  const key = await getAesKey(passphrase, salt)
  const decrypted = await window.crypto.subtle.decrypt(
    {
      name: 'AES-GCM',
      iv
    },
    key,
    ciphertext
  )

  return JSON.parse(bytesToText(decrypted)) as DayPlan[]
}

async function fetchSupabaseEncryptedDayPlans() {
  const { data, error } = await supabase
    .from('encrypted_trip_data')
    .select('salt, iv, ciphertext')
    .eq('trip_id', TRIP_ID)
    .eq('data_key', 'day_plans')
    .eq('is_active', true)
    .maybeSingle()

  if (error) {
    throw new Error(`後台資料讀取失敗：${error.message}`)
  }

  return data as EncryptedTripDataRow | null
}

async function fetchStaticEncryptedDayPlans() {
  const response = await fetch(ENCRYPTED_TRIP_DATA_URL, {
    cache: 'no-store'
  })

  if (!response.ok) {
    return null
  }

  return (await response.json()) as EncryptedTripDataRow
}

export async function fetchSecureDayPlans() {
  const passphrase = getSavedPassphrase()

  if (!passphrase) {
    throw new TripDataUnlockRequiredError()
  }

  const encryptedSources = await Promise.allSettled([
    fetchSupabaseEncryptedDayPlans(),
    fetchStaticEncryptedDayPlans()
  ])

  for (const source of encryptedSources) {
    if (source.status !== 'fulfilled' || !source.value) {
      continue
    }

    try {
      return await decryptDayPlans(source.value, passphrase)
    } catch {
      // Try the next encrypted source before reporting a PIN failure.
    }
  }

  clearTripDataPassphrase()
  throw new Error('旅遊 PIN 不正確，或加密資料尚未用這組 PIN 重新產生。')
}
