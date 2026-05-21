import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'

import type { Expense } from '../types'
import { fixedCosts } from '../data/fixedCosts'
import { supabase, TRIP_ID } from '../services/supabase'

type ExpenseContextValue = {
  expenses: Expense[]
  loading: boolean
  reload: () => Promise<void>
}

const ExpenseContext = createContext<ExpenseContextValue | null>(null)

export function ExpenseProvider({
  children
}: {
  children: React.ReactNode
}) {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [loading, setLoading] = useState(true)

  async function reload() {
    setLoading(true)

    const { data, error } = await supabase
      .from('expenses')
      .select('*')
      .eq('trip_id', TRIP_ID)
      .order('created_at', { ascending: false })

    if (error) {
      console.error(error)
      setLoading(false)
      return
    }

    const mapped: Expense[] = (data ?? []).map((row) => ({
      id: row.id,
      date: row.date,
      category: row.category,
      item: row.item,
      jpy: Number(row.jpy ?? 0),
      twd: Number(row.twd ?? 0),
      pay: row.pay,
      createdBy: row.created_by,
      fixed: false
    }))

    setExpenses([
      ...fixedCosts.map((cost) => ({
        ...cost,
        fixed: true
      })),
      ...mapped
    ])

    setLoading(false)
  }

  useEffect(() => {
    reload()
  }, [])

  const value = useMemo(
    () => ({
      expenses,
      loading,
      reload
    }),
    [expenses, loading]
  )

  return (
    <ExpenseContext.Provider value={value}>
      {children}
    </ExpenseContext.Provider>
  )
}

export function useExpenses() {
  const context = useContext(ExpenseContext)

  if (!context) {
    throw new Error('useExpenses must be used within ExpenseProvider')
  }

  return context
}
