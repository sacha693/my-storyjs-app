import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'

import type { DayPlan } from '../data/types'
import { fetchSecureDayPlans } from '../services/secureTripData'
import {
  clearTripAccess,
  hasStoredTripAccess,
  rememberTripAccess,
  verifyTripAccessCode
} from '../services/accessGate'

type DayPlansContextValue = {
  dayPlans: DayPlan[]
  loading: boolean
  locked: boolean
  error: string | null
  unlock: (passphrase?: string) => Promise<void>
  lock: () => void
  reload: () => Promise<void>
}

const DayPlansContext = createContext<DayPlansContextValue | null>(null)

export function DayPlansProvider({ children }: { children: ReactNode }) {
  const [dayPlans, setDayPlans] = useState<DayPlan[]>([])
  const [loading, setLoading] = useState(hasStoredTripAccess())
  const [locked, setLocked] = useState(!hasStoredTripAccess())
  const [error, setError] = useState<string | null>(null)

  const reload = useCallback(async () => {
    if (!hasStoredTripAccess()) {
      setLoading(false)
      setLocked(true)
      return
    }

    setLoading(true)
    setError(null)

    try {
      const plans = await fetchSecureDayPlans()
      setDayPlans(plans)
      setLocked(false)
    } catch (loadError) {
      setDayPlans([])
      setError(loadError instanceof Error ? loadError.message : '旅遊資料讀取失敗。')
    } finally {
      setLoading(false)
    }
  }, [])

  const unlock = useCallback(async (passphrase = '') => {
    const isValid = await verifyTripAccessCode(passphrase)

    if (!isValid) {
      setError('密碼不正確，請再試一次。')
      setLocked(true)
      return
    }

    rememberTripAccess()
    setLocked(false)
    await reload()
  }, [reload])

  const lock = useCallback(() => {
    clearTripAccess()
    setDayPlans([])
    setLocked(true)
    setError(null)
    setLoading(false)
  }, [])

  useEffect(() => {
    void reload()
  }, [reload])

  const value = useMemo(
    () => ({
      dayPlans,
      loading,
      locked,
      error,
      unlock,
      lock,
      reload
    }),
    [dayPlans, loading, locked, error, unlock, lock, reload]
  )

  return (
    <DayPlansContext.Provider value={value}>
      {children}
    </DayPlansContext.Provider>
  )
}

export function useDayPlans() {
  const context = useContext(DayPlansContext)

  if (!context) {
    throw new Error('useDayPlans must be used within DayPlansProvider')
  }

  return context
}
