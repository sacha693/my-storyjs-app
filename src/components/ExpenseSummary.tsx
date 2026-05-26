import { fixedCosts } from '../data/fixedCosts'

function formatJPY(value: number) {
  return `¥${value.toLocaleString()}`
}

function formatTWD(value: number) {
  return `NT$${value.toLocaleString()}`
}

export function ExpenseSummary() {
  const totalJpy = fixedCosts.reduce((sum, item) => sum + item.jpy, 0)
  const totalTwd = fixedCosts.reduce((sum, item) => sum + item.twd, 0)
  const categorySummary = fixedCosts.reduce<Record<string, { count: number; jpy: number }>>(
    (summary, item) => {
      const current = summary[item.category] ?? { count: 0, jpy: 0 }
      summary[item.category] = {
        count: current.count + 1,
        jpy: current.jpy + item.jpy
      }
      return summary
    },
    {}
  )

  return (
    <section className="card fixedCostCompact" id="expense">
      <div className="sectionTitleRow">
        <div>
          <span className="badge">已發生固定支出</span>
          <h2>💰 固定費總覽</h2>
        </div>
        <span className="statusPill">{fixedCosts.length} 筆</span>
      </div>

      <div className="fixedCostSummaryCard">
        <span>固定費總額</span>
        <strong>{formatJPY(totalJpy)}</strong>
        <span>{formatTWD(totalTwd)}</span>
      </div>

      <div className="fixedCostChips" aria-label="固定費分類摘要">
        {Object.entries(categorySummary).map(([category, summary]) => (
          <span className="fixedCostChip" key={category}>
            {category}・{summary.count} 筆・{formatJPY(summary.jpy)}
          </span>
        ))}
      </div>

      <details className="fixedCostDetails">
        <summary>查看固定支出明細</summary>
        <div className="fixedCostList">
          {fixedCosts.map((cost) => (
            <article className="fixedCostItem" key={`${cost.category}-${cost.item}`}>
              <div>
                <strong>{cost.item}</strong>
                <span>{cost.date}・{cost.category}・{cost.pay}</span>
              </div>
              <strong>{formatJPY(cost.jpy)}</strong>
            </article>
          ))}
        </div>
      </details>
    </section>
  )
}