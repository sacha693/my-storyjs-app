import { ExpenseCharts } from '../components/ExpenseCharts'
import { DailyExpenseBoard } from '../components/DailyExpenseBoard'
import { ExpenseForm } from '../components/ExpenseForm'
import { ExpenseProvider } from '../context/ExpenseContext'

function ExpenseContent() {
  return (
    <main className="wrap expenseAppLayout">
      <section className="expenseBottomSection">
        <ExpenseForm />
      </section>

      <section className="expenseTopSection">
        <DailyExpenseBoard />
      </section>

      <section className="expenseBottomSection">
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