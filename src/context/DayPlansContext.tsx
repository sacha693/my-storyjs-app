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

type DayPlansContextValue = {
  dayPlans: DayPlan[]
  loading: boolean
  locked: boolean
  error: string | null
  unlock: (_passphrase?: string) => Promise<void>
  lock: () => void
  reload: () => Promise<void>
}

const DayPlansContext = createContext<DayPlansContextValue | null>(null)

export function DayPlansProvider({ children }: { children: ReactNode }) {
  const [dayPlans, setDayPlans] = useState<DayPlan[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const reload = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const plans = await fetchSecureDayPlans()
      setDayPlans(plans)
    } catch (loadError) {
      setDayPlans([])
      setError(loadError instanceof Error ? loadError.message : '旅遊資料讀取失敗。')
    } finally {
      setLoading(false)
    }
  }, [])

  const unlock = useCallback(async () => {
    await reload()
  }, [reload])

  const lock = useCallback(() => {
    setDayPlans([])
    setError(null)
    void reload()
  }, [reload])

  useEffect(() => {
    void reload()
  }, [reload])

  const value = useMemo(
    () => ({
      dayPlans,
      loading,
      locked: false,
      error,
      unlock,
      lock,
      reload
    }),
    [dayPlans, loading, error, unlock, lock, reload]
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
