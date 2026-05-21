import { useExpenses } from '../context/ExpenseContext'

function yen(value: number) {
  return `¥${value.toLocaleString()}`
}

export function ExpenseTable() {
  const { expenses, deleteExpense } = useExpenses()

  return (
    <section className="card">
      <h2>📋 消費明細</h2>

      <table>
        <thead>
          <tr>
            <th>日期</th>
            <th>類別</th>
            <th>項目</th>
            <th>JPY</th>
            <th>記帳人</th>
            <th>操作</th>
          </tr>
        </thead>

        <tbody>
          {expenses.map((expense) => (
            <tr key={`${expense.id}-${expense.item}`}>
              <td>{expense.date}</td>
              <td>{expense.category}</td>
              <td>{expense.item}</td>
              <td>{yen(expense.jpy)}</td>
              <td>{expense.createdBy}</td>
              <td>
                {expense.fixed ? (
                  '固定費'
                ) : (
                  <button
                    className="dangerButton"
                    onClick={() => deleteExpense(expense.id!)}
                  >
                    刪除
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
