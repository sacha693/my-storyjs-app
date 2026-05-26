import { useExpenses } from '../context/ExpenseContext'

function safeAmount(value: number) {
  return Number.isFinite(value) ? value : 0
}

function yen(value: number) {
  return `¥${Math.round(value).toLocaleString()}`
}

function twd(value: number) {
  return `NT$${Math.round(value).toLocaleString()}`
}

function useExpenseStats() {
  const { expenses } = useExpenses()
  const totalJpy = expenses.reduce((sum, item) => sum + safeAmount(item.jpy), 0)
  const totalTwd = expenses.reduce((sum, item) => sum + safeAmount(item.twd), 0)
  const fixedCount = expenses.filter((expense) => expense.fixed).length
  const flexibleCount = expenses.length - fixedCount

  const family = ['固定費', 'sacha', 'yang'].map((name) => ({
    name,
    jpy: expenses
      .filter((expense) => expense.createdBy === name)
      .reduce((sum, item) => sum + safeAmount(item.jpy), 0),
    twd: expenses
      .filter((expense) => expense.createdBy === name)
      .reduce((sum, item) => sum + safeAmount(item.twd), 0),
    count: expenses.filter((expense) => expense.createdBy === name).length
  }))

  return { expenses, totalJpy, totalTwd, fixedCount, flexibleCount, family }
}

export function ExpenseTotalStats() {
  const { expenses, totalJpy, totalTwd, fixedCount, flexibleCount } = useExpenseStats()

  return (
    <section className="card expenseStatCard expenseStatPrimary">
      <span className="badge">總覽</span>
      <h2>💰 總旅費</h2>
      <div className="summaryTotal summaryTotalMain">
        <span>目前總額</span>
        <strong>{yen(totalJpy)}</strong>
        <span>{twd(totalTwd)}</span>
      </div>
      <p className="miniHint">
        共 {expenses.length} 筆，固定費 {fixedCount} 筆，自行新增 {flexibleCount} 筆。
      </p>
    </section>
  )
}

export function ExpenseBreakdownStats() {
  const { family } = useExpenseStats()

  return (
    <section className="grid expenseStatsGrid">
      {family.map((member) => (
        <article className="card expenseStatCard" key={member.name}>
          <span className="badge">{member.count} 筆</span>
          <h2>{member.name}</h2>
          <div className="summaryTotal">
            <span>累積金額</span>
            <strong>{yen(member.jpy)}</strong>
            <span>{twd(member.twd)}</span>
          </div>
        </article>
      ))}
    </section>
  )
}

export function ExpenseStats() {
  return (
    <>
      <ExpenseTotalStats />
      <ExpenseBreakdownStats />
    </>
  )
}