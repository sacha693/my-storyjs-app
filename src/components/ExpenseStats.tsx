import { useExpenses } from '../context/ExpenseContext'

function yen(value: number) {
  return `¥${value.toLocaleString()}`
}

export function ExpenseStats() {
  const { expenses } = useExpenses()

  const total = expenses.reduce((sum, item) => sum + item.jpy, 0)

  const family = ['固定費', 'sacha', 'yang'].map((name) => ({
    name,
    total: expenses
      .filter((expense) => expense.createdBy === name)
      .reduce((sum, item) => sum + item.jpy, 0)
  }))

  return (
    <section className="grid">
      <article className="card">
        <h2>💰 總旅費</h2>
        <div className="summaryTotal">
          <span>目前總額</span>
          <strong>{yen(total)}</strong>
        </div>
      </article>

      {family.map((member) => (
        <article className="card" key={member.name}>
          <h2>{member.name}</h2>
          <div className="summaryTotal">
            <span>累積金額</span>
            <strong>{yen(member.total)}</strong>
          </div>
        </article>
      ))}
    </section>
  )
}
