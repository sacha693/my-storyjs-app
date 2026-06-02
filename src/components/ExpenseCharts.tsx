import { useMemo } from 'react'
import { ExpenseCsvExport } from './ExpenseCsvExport'
import { useExpenses } from '../context/ExpenseContext'
import type { Expense } from '../types'

const categories = ['餐食', '交通', '門票', '購物', '住宿', '機票', '便利商店', '其他']
const days = ['7/23', '7/24', '7/25', '7/26', '7/27', '7/28', '7/29', '7/30', '7/31']
const members = ['固定費', 'sacha', 'yang']

function safeAmount(value: number) {
  return Number.isFinite(value) ? value : 0
}

function yen(value: number) {
  return `¥${Math.round(value).toLocaleString()}`
}

function twd(value: number) {
  return `NT$${Math.round(value).toLocaleString()}`
}

type BarChartProps = {
  title: string
  rows: Array<{
    label: string
    jpy: number
    twd: number
  }>
}

function BarChart({ title, rows }: BarChartProps) {
  const safeRows = rows.map((row) => ({
    ...row,
    jpy: safeAmount(row.jpy),
    twd: safeAmount(row.twd)
  }))
  const max = Math.max(...safeRows.map((row) => row.jpy), 1)

  return (
    <article className="card chartCard">
      <h2>{title}</h2>

      <div className="chartRows">
        {safeRows.map((row) => {
          const percent = Math.max(0, Math.min(100, Math.round((row.jpy / max) * 100)))

          return (
            <div className="chartRow" key={row.label}>
              <div className="chartLabel">
                <span>{row.label}</span>
                <strong>{yen(row.jpy)}</strong>
              </div>
              <p className="miniHint">{twd(row.twd)}</p>

              <div className="chartTrack" aria-label={`${row.label} ${yen(row.jpy)} ${twd(row.twd)}`}>
                <div
                  className="chartFill"
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </article>
  )
}

function sumBy(rows: Expense[], predicate: (expense: Expense) => boolean) {
  return rows
    .filter(predicate)
    .reduce(
      (sum, expense) => ({
        jpy: sum.jpy + safeAmount(expense.jpy),
        twd: sum.twd + safeAmount(expense.twd)
      }),
      { jpy: 0, twd: 0 }
    )
}

export function ExpenseCharts() {
  const { expenses } = useExpenses()

  const categoryRows = useMemo(
    () =>
      categories.map((category) => ({
        label: category,
        ...sumBy(expenses, (expense) => expense.category === category)
      })),
    [expenses]
  )

  const memberRows = useMemo(
    () =>
      members.map((member) => ({
        label: member,
        ...sumBy(expenses, (expense) => expense.createdBy === member)
      })),
    [expenses]
  )

  const dailyRows = useMemo(
    () =>
      days.map((day) => ({
        label: day,
        ...sumBy(expenses, (expense) => expense.date === day)
      })),
    [expenses]
  )

  return (
    <section className="chartGrid">
      <ExpenseCsvExport />
      <BarChart title="📊 類別支出比例" rows={categoryRows} />
      <BarChart title="👨‍👩‍👦 家庭記帳比例" rows={memberRows} />
      <BarChart title="🗓️ 每日支出趨勢" rows={dailyRows} />
    </section>
  )
}
