import {
  createContext,
  useCallback,
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
  realtimeStatus: 'connecting' | 'connected' | 'disconnected'
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
    pay: row.pay ?? '現金',
    createdBy: row.created_by,
    fixed: false
  }
}

export function ExpenseProvider({ children }: { children: React.ReactNode }) {
  const [cloudExpenses, setCloudExpenses] = useState<Expense[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [realtimeStatus, setRealtimeStatus] = useState<
    'connecting' | 'connected' | 'disconnected'
  >('connecting')

  const reload = useCallback(async () => {
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
  }, [])

  async function addExpense(input: ExpenseInput) {
    setError(null)

    const optimisticId = `local-${Date.now()}`
    const optimisticExpense: Expense = {
      id: optimisticId,
      date: input.date,
      category: input.category,
      item: input.item,
      jpy: input.jpy,
      twd: input.twd,
      pay: input.pay,
      createdBy: input.createdBy,
      fixed: false
    }

    setCloudExpenses((current) => [optimisticExpense, ...current])

    const { data, error: supabaseError } = await supabase
      .from('expenses')
      .insert({
        trip_id: TRIP_ID,
        date: input.date,
        category: input.category,
        item: input.item,
        jpy: input.jpy,
        twd: input.twd,
        pay: input.pay,
        created_by: input.createdBy
      })
      .select('*')
      .single()

    if (supabaseError) {
      setCloudExpenses((current) =>
        current.filter((expense) => expense.id !== optimisticId)
      )
      setError(supabaseError.message)
      throw supabaseError
    }

    if (data) {
      setCloudExpenses((current) => [
        mapRow(data),
        ...current.filter((expense) => expense.id !== optimisticId)
      ])
    }

    await reload()
  }

  async function updateExpense(id: string, input: ExpenseInput) {
    setError(null)

    const previous = cloudExpenses

    setCloudExpenses((current) =>
      current.map((expense) =>
        expense.id === id
          ? {
              ...expense,
              date: input.date,
              category: input.category,
              item: input.item,
              jpy: input.jpy,
              twd: input.twd,
              pay: input.pay,
              createdBy: input.createdBy
            }
          : expense
      )
    )

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
      setCloudExpenses(previous)
      setError(supabaseError.message)
      throw supabaseError
    }

    await reload()
  }

  async function deleteExpense(id: string) {
    setError(null)

    const previous = cloudExpenses

    setCloudExpenses((current) =>
      current.filter((expense) => expense.id !== id)
    )

    const { error: supabaseError } = await supabase
      .from('expenses')
      .delete()
      .eq('id', id)
      .eq('trip_id', TRIP_ID)

    if (supabaseError) {
      setCloudExpenses(previous)
      setError(supabaseError.message)
      throw supabaseError
    }

    await reload()
  }

  useEffect(() => {
    reload()
  }, [reload])

  useEffect(() => {
    setRealtimeStatus('connecting')

    const channel = supabase
      .channel(`expenses-${TRIP_ID}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'expenses',
          filter: `trip_id=eq.${TRIP_ID}`
        },
        () => {
          reload()
        }
      )
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          setRealtimeStatus('connected')
          return
        }

        if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT') {
          setRealtimeStatus('disconnected')
        }
      })

    return () => {
      supabase.removeChannel(channel)
    }
  }, [reload])

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
      realtimeStatus,
      error,
      reload,
      addExpense,
      updateExpense,
      deleteExpense
    }),
    [expenses, loading, realtimeStatus, error, reload]
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
