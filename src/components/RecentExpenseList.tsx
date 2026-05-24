import { useExpenses } from '../context/ExpenseContext'

function twd(value: number) {
  return `NT$${value.toLocaleString()}`
}

export function RecentExpenseList() {
  const { expenses } = useExpenses()
  const recentExpenses = expenses.slice(0, 5)

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
        <div className="recentExpenseList">
          {recentExpenses.map((expense) => (
            <article className="recentExpenseItem" key={`${expense.id}-${expense.item}`}>
              <div>
                <strong>{expense.item}</strong>
                <span>{expense.category}・{expense.date}</span>
              </div>
              <div className="recentExpenseAmount">
                <strong>{twd(expense.twd)}</strong>
                <span>{expense.pay}</span>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}
