import { useMemo } from 'react'
import { useExpenses } from '../context/ExpenseContext'

const categories = ['餐食', '交通', '門票', '購物', '住宿', '機票', '便利商店', '其他']
const days = ['7/23', '7/24', '7/25', '7/26', '7/27', '7/28', '7/29', '7/30', '7/31']
const members = ['固定費', 'sacha', 'yang']

function yen(value: number) {
  return `¥${Math.round(value).toLocaleString()}`
}

type BarChartProps = {
  title: string
  rows: Array<{
    label: string
    value: number
  }>
}

function BarChart({ title, rows }: BarChartProps) {
  const max = Math.max(...rows.map((row) => row.value), 1)

  return (
    <article className="card chartCard">
      <h2>{title}</h2>

      <div className="chartRows">
        {rows.map((row) => {
          const percent = Math.round((row.value / max) * 100)

          return (
            <div className="chartRow" key={row.label}>
              <div className="chartLabel">
                <span>{row.label}</span>
                <strong>{yen(row.value)}</strong>
              </div>

              <div className="chartTrack">
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

export function ExpenseCharts() {
  const { expenses } = useExpenses()

  const categoryRows = useMemo(
    () =>
      categories.map((category) => ({
        label: category,
        value: expenses
          .filter((expense) => expense.category === category)
          .reduce((sum, expense) => sum + expense.jpy, 0)
      })),
    [expenses]
  )

  const memberRows = useMemo(
    () =>
      members.map((member) => ({
        label: member,
        value: expenses
          .filter((expense) => expense.createdBy === member)
          .reduce((sum, expense) => sum + expense.jpy, 0)
      })),
    [expenses]
  )

  const dailyRows = useMemo(
    () =>
      days.map((day) => ({
        label: day,
        value: expenses
          .filter((expense) => expense.date === day)
          .reduce((sum, expense) => sum + expense.jpy, 0)
      })),
    [expenses]
  )

  return (
    <section className="chartGrid">
      <BarChart title="📊 類別支出比例" rows={categoryRows} />
      <BarChart title="👨‍👩‍👦 家庭記帳比例" rows={memberRows} />
      <BarChart title="🗓️ 每日支出趨勢" rows={dailyRows} />
    </section>
  )
}
