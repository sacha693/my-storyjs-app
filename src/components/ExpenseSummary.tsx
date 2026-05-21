import { fixedCosts } from '../data/fixedCosts'

function formatJPY(value: number) {
  return `¥${value.toLocaleString()}`
}

export function ExpenseSummary() {
  const total = fixedCosts.reduce((sum, item) => sum + item.jpy, 0)

  return (
    <section className="card" id="expense">
      <h2>💰 固定費總覽</h2>

      <div className="summaryTotal">
        <span>固定費總額</span>
        <strong>{formatJPY(total)}</strong>
      </div>

      <table>
        <thead>
          <tr>
            <th>類別</th>
            <th>項目</th>
            <th>JPY</th>
          </tr>
        </thead>

        <tbody>
          {fixedCosts.map((cost) => (
            <tr key={`${cost.category}-${cost.item}`}>
              <td>{cost.category}</td>
              <td>{cost.item}</td>
              <td>{formatJPY(cost.jpy)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
