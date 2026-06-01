import { useExpenses } from '../context/ExpenseContext'
import type { Expense } from '../types'

const CSV_HEADERS = ['日期', '類別', '項目', '日圓', '台幣', '付款方式', '記帳人', '是否固定費', '建立時間']

function csvCell(value: string | number | boolean | undefined) {
  const text = value === undefined ? '' : String(value)
  return `"${text.replace(/"/g, '""')}"`
}

function expenseToRow(expense: Expense) {
  return [
    expense.date,
    expense.category,
    expense.item,
    expense.jpy,
    expense.twd,
    expense.pay,
    expense.createdBy,
    expense.fixed ? '是' : '否',
    expense.createdAt ?? ''
  ]
}

function buildCsv(expenses: Expense[]) {
  const sorted = [...expenses].sort((a, b) => {
    const dateCompare = a.date.localeCompare(b.date)
    if (dateCompare !== 0) return dateCompare
    return (a.createdAt ?? '').localeCompare(b.createdAt ?? '')
  })

  const rows = [CSV_HEADERS, ...sorted.map(expenseToRow)]
  return rows.map((row) => row.map(csvCell).join(',')).join('\n')
}

function todayStamp() {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${year}${month}${day}`
}

export function ExpenseCsvExport() {
  const { expenses } = useExpenses()

  function downloadCsv() {
    const csv = `\ufeff${buildCsv(expenses)}`
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')

    link.href = url
    link.download = `kansai-expenses-${todayStamp()}.csv`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <article className="card chartCard csvExportCard">
      <div>
        <h2>📥 匯出消費紀錄</h2>
        <p className="miniHint">下載目前所有旅費資料為 CSV，可用 Excel 或 Google 試算表開啟。</p>
      </div>
      <button type="button" className="csvExportButton" onClick={downloadCsv} disabled={expenses.length === 0}>
        下載 CSV
      </button>
    </article>
  )
}
