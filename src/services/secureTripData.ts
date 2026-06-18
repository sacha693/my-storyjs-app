import { supabase, TRIP_ID } from './supabase'
import type { DayPlan } from '../data/types'

const PASSPHRASE_STORAGE_KEY = 'kansai-trip-data-passphrase'
const PBKDF2_ITERATIONS = 210_000

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

export async function fetchSecureDayPlans() {
  const passphrase = getSavedPassphrase()

  if (!passphrase) {
    throw new TripDataUnlockRequiredError()
  }

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

  if (!data) {
    throw new Error('後台尚未建立 encrypted_trip_data/day_plans 資料。')
  }

  try {
    return await decryptDayPlans(data as EncryptedTripDataRow, passphrase)
  } catch {
    clearTripDataPassphrase()
    throw new Error('旅遊資料密碼不正確，或後台資料已損毀。')
  }
}
