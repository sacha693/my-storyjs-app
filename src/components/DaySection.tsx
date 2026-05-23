import { dayPlans } from '../data/days'
import { DayCard } from './DayCard'

export function DaySection() {
  if (dayPlans.length === 0) {
    return (
      <section id="days" className="card">
        <span className="badge">系統提醒</span>
        <h2>目前沒有行程資料</h2>
        <p>請確認 src/data/days.ts 是否已正確匯入行程。</p>
      </section>
    )
  }

  return (
    <section id="days" aria-label="每日行程列表">
      {dayPlans.map((day) => (
        <DayCard key={day.id} day={day} />
      ))}
    </section>
  )
}
