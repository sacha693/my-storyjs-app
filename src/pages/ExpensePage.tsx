import { ExpenseCharts } from '../components/ExpenseCharts'
import { ExpenseExport } from '../components/ExpenseExport'
import { ExpenseForm } from '../components/ExpenseForm'
import { ExpenseStats } from '../components/ExpenseStats'
import { ExpenseTable } from '../components/ExpenseTable'
import { ExpenseProvider, useExpenses } from '../context/ExpenseContext'

function ExpenseContent() {
  const { loading, error, reload, realtimeStatus } = useExpenses()

  return (
    <main className="wrap expenseWrap" id="expense-top">
      <section className="card hero expenseHero">
        <div className="expenseHeroText">
          <span className="badge">旅費儀表板</span>
          <h1>旅費記帳系統</h1>
          <p>把金童家關西旅程的住宿、機票、餐食與購物支出集中管理。</p>

          <div className="buttonRow">
            <button onClick={reload}>重新同步</button>

            <span className="statusPill">
              即時同步：{realtimeStatus}
            </span>
          </div>

          {loading ? <p className="miniHint">同步中，正在取得最新旅費資料...</p> : null}

          {error ? (
            <p className="errorHint" role="alert">
              同步錯誤：{error}
            </p>
          ) : null}
        </div>

        <div className="expenseHeroPhoto" aria-hidden="true" />
      </section>

      <div id="expense-summary">
        <ExpenseStats />
      </div>

      <ExpenseCharts />

      <div id="add-expense">
        <ExpenseForm />
      </div>

      <div id="expense-export">
        <ExpenseExport />
      </div>

      <div id="expense-details">
        <ExpenseTable />
      </div>

      <nav className="expenseQuickBar" aria-label="旅費快捷操作">
        <a href="#expense-summary">總額</a>
        <a href="#add-expense">＋新增</a>
        <a href="#expense-details">明細</a>
        <a href="#expense-export">匯出</a>
      </nav>
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
