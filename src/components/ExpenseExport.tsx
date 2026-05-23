import { useExpenses } from '../context/ExpenseContext'

function safeCsvCell(value: unknown) {
  const text = String(value ?? '')
  const safeText = /^[=+\-@]/.test(text) ? `'${text}` : text
  return `"${safeText.replace(/"/g, '""')}"`
}

export function ExpenseExport() {
  const { expenses } = useExpenses()

  function exportCSV() {
    const headers = [
      '日期',
      '類別',
      '項目',
      'JPY',
      'TWD',
      '付款方式',
      '記帳者',
      '固定費'
    ]

    const rows = expenses.map((expense) => [
      expense.date,
      expense.category,
      expense.item,
      expense.jpy,
      expense.twd,
      expense.pay,
      expense.createdBy,
      expense.fixed ? '是' : '否'
    ])

    const csv = [headers, ...rows]
      .map((row) => row.map(safeCsvCell).join(','))
      .join('\r\n')

    const blob = new Blob(['\ufeff' + csv], {
      type: 'text/csv;charset=utf-8;'
    })

    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')

    link.href = url
    link.download = `kansai-expense-${new Date().toISOString().slice(0, 10)}.csv`
    document.body.appendChild(link)
    link.click()
    link.remove()

    URL.revokeObjectURL(url)
  }

  return (
    <section className="card expensePanel">
      <span className="badge">資料匯出</span>
      <h2>📤 Excel / CSV 匯出</h2>

      <p>可直接使用 Excel、Google Sheets 開啟，並保留固定費辨識。</p>

      <button onClick={exportCSV}>匯出 CSV</button>
    </section>
  )
}
