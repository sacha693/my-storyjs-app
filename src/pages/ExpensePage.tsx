import { ExpenseForm } from '../components/ExpenseForm'
import { ExpenseStats } from '../components/ExpenseStats'
import { ExpenseTable } from '../components/ExpenseTable'
import { ExpenseProvider, useExpenses } from '../context/ExpenseContext'

function ExpenseContent() {
  const { loading, error, reload } = useExpenses()

  return (
    <main className="wrap">
      <section className="card hero">
        <span className="badge">旅費儀表板</span>
        <h1>旅費記帳系統</h1>
        <p>React + Supabase 即時同步架構。</p>

        <button onClick={reload}>重新同步</button>

        {loading ? <p>同步中...</p> : null}

        {error ? <p>錯誤：{error}</p> : null}
      </section>

      <ExpenseStats />

      <ExpenseForm />

      <ExpenseTable />
    </main>
  )
}

export function ExpensePage() {
  return (
    <ExpenseProvider>
      <ExpenseContent />
    </ExpenseProvider>
  )
}
