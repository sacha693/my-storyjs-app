import { useMemo } from 'react'
import { useExpenses } from '../context/ExpenseContext'

function twd(value: number) {
  return `NT$${value.toLocaleString()}`
}

function parseDate(date: string) {
  const [month, day] = date.split('/').map(Number)
  return month * 100 + day
}

export function RecentExpenseList() {
  const { expenses } = useExpenses()

  const recentExpenses = useMemo(() => {
    return [...expenses]
      .sort((a, b) => {
        const dateDiff = parseDate(b.date) - parseDate(a.date)
        if (dateDiff !== 0) return dateDiff

        return (b.createdAt ?? '').localeCompare(a.createdAt ?? '')
      })
      .slice(0, 5)
  }, [expenses])

  return (
    <section className="card expensePanel recentExpensePanel">
      <div className="sectionTitleRow">
        <div>
          <span className="badge">最新 5 筆</span>
          <h2>消費明細</h2>
        </div>
        <a className="quickButton" href="#expense-details">
          查看全部
        </a>
      </div>

      {recentExpenses.length === 0 ? (
        <p className="miniHint">目前還沒有新增消費。</p>
      ) : (
        <div className="recentExpenseMobileList">
          {recentExpenses.map((expense) => (
            <article className="recentExpenseMobileItem" key={`${expense.id}-${expense.item}`}>
              <div className="recentExpenseTopRow">
                <div>
                  <strong>{expense.item}</strong>
                  <span>
                    {expense.date}・{expense.category}
                  </span>
                </div>

                <strong className="recentExpensePrice">
                  {twd(expense.twd)}
                </strong>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}