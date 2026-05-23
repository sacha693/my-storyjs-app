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

export function ExpenseStats() {
  const { expenses } = useExpenses()

  const totalJpy = expenses.reduce((sum, item) => sum + safeAmount(item.jpy), 0)
  const totalTwd = expenses.reduce((sum, item) => sum + safeAmount(item.twd), 0)

  const family = ['固定費', 'sacha', 'yang'].map((name) => ({
    name,
    jpy: expenses
      .filter((expense) => expense.createdBy === name)
      .reduce((sum, item) => sum + safeAmount(item.jpy), 0),
    twd: expenses
      .filter((expense) => expense.createdBy === name)
      .reduce((sum, item) => sum + safeAmount(item.twd), 0)
  }))

  return (
    <section className="grid">
      <article className="card">
        <h2>💰 總旅費</h2>
        <div className="summaryTotal">
          <span>目前總額</span>
          <strong>{yen(totalJpy)}</strong>
          <span>{twd(totalTwd)}</span>
        </div>
      </article>

      {family.map((member) => (
        <article className="card" key={member.name}>
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
