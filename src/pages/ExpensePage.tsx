import { ExpenseCharts } from '../components/ExpenseCharts'
import { DailyExpenseBoard } from '../components/DailyExpenseBoard'
import { ExpenseForm } from '../components/ExpenseForm'
import { ExpenseProvider } from '../context/ExpenseContext'

function ExpenseContent() {
  return (
    <main className="wrap expenseAppLayout">
      <section className="expenseTopSection">
        <DailyExpenseBoard />
      </section>

      <section className="expenseBottomSection">
        <div className="card expenseCreateCard">
          <span className="badge">新增花費</span>
          <h2>新增消費</h2>
          <p>新增後會立即同步到上方日期記錄。</p>
          <ExpenseForm />
        </div>

        <details className="accordion expenseAnalysisSection">
          <summary>📊 花費分析</summary>
          <div className="accordionBody">
            <ExpenseCharts />
          </div>
        </details>
      </section>
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