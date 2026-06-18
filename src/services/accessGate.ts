const ACCESS_STORAGE_KEY = 'kansai-trip-access-granted'
const ACCESS_CODE_HASH = 'f296867839c8befafed32b55a7c11ab4ad14387d2434b970a55237d537bc9353'

async function sha256Hex(value: string) {
  const bytes = new TextEncoder().encode(value)
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', bytes)
  const hashBytes = Array.from(new Uint8Array(hashBuffer))

  return hashBytes.map((byte) => byte.toString(16).padStart(2, '0')).join('')
}

export function hasStoredTripAccess() {
  return window.localStorage.getItem(ACCESS_STORAGE_KEY) === 'true'
}

export async function verifyTripAccessCode(code: string) {
  return sha256Hex(code.trim()) === ACCESS_CODE_HASH
}

export function rememberTripAccess() {
  window.localStorage.setItem(ACCESS_STORAGE_KEY, 'true')
}

export function clearTripAccess() {
  window.localStorage.removeItem(ACCESS_STORAGE_KEY)
}
