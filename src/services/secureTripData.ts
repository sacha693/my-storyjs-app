import { supabase, TRIP_ID } from './supabase'
import type { DayPlan } from '../data/types'

type TripDataDocumentRow = {
  payload: DayPlan[]
}

export class TripDataUnlockRequiredError extends Error {
  constructor() {
    super('旅遊資料正在讀取中。')
    this.name = 'TripDataUnlockRequiredError'
  }
}

export function hasTripDataPassphrase() {
  return true
}

export function saveTripDataPassphrase(_passphrase: string) {
  // No-op: this app now loads trip data from Supabase without a phone password.
}

export function clearTripDataPassphrase() {
  // No-op: no client-side passphrase is stored.
}

export async function fetchSecureDayPlans() {
  const { data, error } = await supabase
    .from('trip_data_documents')
    .select('payload')
    .eq('trip_id', TRIP_ID)
    .eq('data_key', 'day_plans')
    .eq('is_active', true)
    .maybeSingle()

  if (error) {
    throw new Error(`後台資料讀取失敗：${error.message}`)
  }

  if (!data) {
    throw new Error('後台尚未建立行程資料。請先執行 private/trip-data-documents.sql 匯入 Supabase。')
  }

  const { payload } = data as TripDataDocumentRow

  if (!Array.isArray(payload) || payload.length === 0) {
    throw new Error('後台行程資料格式不正確。')
  }

  return payload
}
