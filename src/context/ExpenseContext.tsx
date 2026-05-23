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
const syncChannel = typeof BroadcastChannel !== 'undefined'
  ? new BroadcastChannel('kansai-expense-sync')
  : null

function mapRow(row: any): Expense {
  return {
    id: row.id,
    createdAt: row.created_at,
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

function sortNewestFirst(expenses: Expense[]) {
  return [...expenses].sort((a, b) => {
    const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0
    const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0
    return bTime - aTime
  })
}

function broadcastSync() {
  syncChannel?.postMessage({ type: 'expense-sync', time: Date.now() })
  window.localStorage.setItem('kansai-expense-sync', String(Date.now()))
}

export function ExpenseProvider({ children }: { children: React.ReactNode }) {
  const [cloudExpenses, setCloudExpenses] = useState<Expense[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [realtimeStatus, setRealtimeStatus] = useState<
    'connecting' | 'connected' | 'disconnected'
  >('connecting')

  const reload = useCallback(async (showLoading = false) => {
    if (showLoading) setLoading(true)
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

    setCloudExpenses(sortNewestFirst((data ?? []).map(mapRow)))
    setLoading(false)
  }, [])

  async function addExpense(input: ExpenseInput) {
    setError(null)

    const optimisticId = `local-${Date.now()}`
    const optimisticExpense: Expense = {
      id: optimisticId,
      createdAt: new Date().toISOString(),
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
      setCloudExpenses((current) =>
        sortNewestFirst([
          mapRow(data),
          ...current.filter((expense) => expense.id !== optimisticId)
        ])
      )
    }

    broadcastSync()
    window.setTimeout(() => reload(), 500)
  }

  async function updateExpense(id: string, input: ExpenseInput) {
    setError(null)

    const previous = cloudExpenses

    setCloudExpenses((current) =>
      sortNewestFirst(
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

    broadcastSync()
    window.setTimeout(() => reload(), 500)
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

    broadcastSync()
    window.setTimeout(() => reload(), 500)
  }

  useEffect(() => {
    reload(true)
  }, [reload])

  useEffect(() => {
    const timer = window.setInterval(() => {
      reload()
    }, 5000)

    return () => window.clearInterval(timer)
  }, [reload])

  useEffect(() => {
    function handleFocus() {
      reload()
    }

    function handleVisibilityChange() {
      if (document.visibilityState === 'visible') {
        reload()
      }
    }

    window.addEventListener('focus', handleFocus)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      window.removeEventListener('focus', handleFocus)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [reload])

  useEffect(() => {
    function handleStorage(event: StorageEvent) {
      if (event.key === 'kansai-expense-sync') reload()
    }

    function handleBroadcast() {
      reload()
    }

    syncChannel?.addEventListener('message', handleBroadcast)
    window.addEventListener('storage', handleStorage)

    return () => {
      syncChannel?.removeEventListener('message', handleBroadcast)
      window.removeEventListener('storage', handleStorage)
    }
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
      ...sortNewestFirst(cloudExpenses)
    ],
    [cloudExpenses]
  )

  const value = useMemo(
    () => ({
      expenses,
      loading,
      realtimeStatus,
      error,
      reload: () => reload(true),
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
