import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'

import type { DayPlan } from '../data/types'
import {
  clearTripDataPassphrase,
  fetchSecureDayPlans,
  hasTripDataPassphrase,
  saveTripDataPassphrase,
  TripDataUnlockRequiredError
} from '../services/secureTripData'

type DayPlansContextValue = {
  dayPlans: DayPlan[]
  loading: boolean
  locked: boolean
  error: string | null
  unlock: (passphrase: string) => Promise<void>
  lock: () => void
  reload: () => Promise<void>
}

const DayPlansContext = createContext<DayPlansContextValue | null>(null)

export function DayPlansProvider({ children }: { children: React.ReactNode }) {
  const [dayPlans, setDayPlans] = useState<DayPlan[]>([])
  const [loading, setLoading] = useState(hasTripDataPassphrase())
  const [locked, setLocked] = useState(!hasTripDataPassphrase())
  const [error, setError] = useState<string | null>(null)

  const reload = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const plans = await fetchSecureDayPlans()
      setDayPlans(plans)
      setLocked(false)
    } catch (loadError) {
      setDayPlans([])

      if (loadError instanceof TripDataUnlockRequiredError) {
        setLocked(true)
      } else {
        setLocked(!hasTripDataPassphrase())
        setError(loadError instanceof Error ? loadError.message : '旅遊資料讀取失敗。')
      }
    } finally {
      setLoading(false)
    }
  }, [])

  const unlock = useCallback(async (passphrase: string) => {
    const trimmedPassphrase = passphrase.trim()

    if (!trimmedPassphrase) {
      setError('請輸入旅遊資料密碼。')
      setLocked(true)
      return
    }

    saveTripDataPassphrase(trimmedPassphrase)
    await reload()
  }, [reload])

  const lock = useCallback(() => {
    clearTripDataPassphrase()
    setDayPlans([])
    setLocked(true)
    setError(null)
  }, [])

  useEffect(() => {
    if (hasTripDataPassphrase()) {
      reload()
    }
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
