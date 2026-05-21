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

export type ExpenseInput = {
  date: string
  category: string
  item: string
  jpy: number
  twd: number
  pay: string
  createdBy: 'sacha' | 'yang'
}

type ExpenseContextValue = {
  expenses: Expense[]
  loading: boolean
  error: string | null
  reload: () => Promise<void>
  addExpense: (input: ExpenseInput) => Promise<void>
  updateExpense: (id: string, input: ExpenseInput) => Promise<void>
  deleteExpense: (id: string) => Promise<void>
}

const ExpenseContext = createContext<ExpenseContextValue | null>(null)

function mapRow(row: any): Expense {
  return {
    id: row.id,
    date: row.date,
    category: row.category,
    item: row.item,
    jpy: Number(row.jpy ?? 0),
    twd: Number(row.twd ?? 0),
    pay: row.pay,
    createdBy: row.created_by,
    fixed: false
  }
}

export function ExpenseProvider({ children }: { children: React.ReactNode }) {
  const [cloudExpenses, setCloudExpenses] = useState<Expense[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  async function reload() {
    setLoading(true)
    setError(null)

    const { data, error: supabaseError } = await supabase
      .from('expenses')
      .select('*')
      .eq('trip_id', TRIP_ID)
      .order('created_at', { ascending: false })

    if (supabaseError) {
      setError(supabaseError.message)
      setLoading(false)
      return
    }

    setCloudExpenses((data ?? []).map(mapRow))
    setLoading(false)
  }

  async function addExpense(input: ExpenseInput) {
    setError(null)

    const { error: supabaseError } = await supabase.from('expenses').insert({
      trip_id: TRIP_ID,
      date: input.date,
      category: input.category,
      item: input.item,
      jpy: input.jpy,
      twd: input.twd,
      pay: input.pay,
      created_by: input.createdBy
    })

    if (supabaseError) {
      setError(supabaseError.message)
      throw supabaseError
    }

    await reload()
  }

  async function updateExpense(id: string, input: ExpenseInput) {
    setError(null)

    const { error: supabaseError } = await supabase
      .from('expenses')
      .update({
        date: input.date,
        category: input.category,
        item: input.item,
        jpy: input.jpy,
        twd: input.twd,
        pay: input.pay,
        created_by: input.createdBy
      })
      .eq('id', id)
      .eq('trip_id', TRIP_ID)

    if (supabaseError) {
      setError(supabaseError.message)
      throw supabaseError
    }

    await reload()
  }

  async function deleteExpense(id: string) {
    setError(null)

    const { error: supabaseError } = await supabase
      .from('expenses')
      .delete()
      .eq('id', id)
      .eq('trip_id', TRIP_ID)

    if (supabaseError) {
      setError(supabaseError.message)
      throw supabaseError
    }

    await reload()
  }

  useEffect(() => {
    reload()
  }, [])

  const expenses = useMemo(
    () => [
      ...fixedCosts.map((cost) => ({ ...cost, fixed: true })),
      ...cloudExpenses
    ],
    [cloudExpenses]
  )

  const value = useMemo(
    () => ({
      expenses,
      loading,
      error,
      reload,
      addExpense,
      updateExpense,
      deleteExpense
    }),
    [expenses, loading, error]
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
