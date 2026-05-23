import { ExpenseCharts } from '../components/ExpenseCharts'
import { ExpenseForm } from '../components/ExpenseForm'
import { ExpenseStats } from '../components/ExpenseStats'
import { ExpenseTable } from '../components/ExpenseTable'
import { ExpenseProvider, useExpenses } from '../context/ExpenseContext'

function ExpenseContent() {
  const { loading, error, reload, realtimeStatus } = useExpenses()

  return (
    <main className="wrap">
      <section className="card hero">
        <span className="badge">旅費儀表板</span>
        <h1>旅費記帳系統</h1>
        <p>React + Supabase 即時同步架構。</p>

        <div className="buttonRow">
          <button onClick={reload}>重新同步</button>

          <span className="statusPill">
            即時同步：{realtimeStatus}
          </span>
        </div>

        {loading ? <p>同步中...</p> : null}

        {error ? <p>錯誤：{error}</p> : null}
      </section>

      <ExpenseStats />

      <ExpenseCharts />

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
