import { createClient } from '@supabase/supabase-js'

export const SUPABASE_URL = 'https://pdmswvntuxzlvlrvhvma.supabase.co'
export const SUPABASE_PUBLISHABLE_KEY =
  'sb_publishable_Zy_iMjo47uyH2kwtrApJLQ_z83oZ856'

export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY
)

export const TRIP_ID = 'kansai-2026'
