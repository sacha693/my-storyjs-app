import { Link } from 'react-router-dom'
import { dayPlans } from '../data/days'

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
    <section id="days" className="dayList" aria-label="每日行程列表">
      {dayPlans.map((day) => (
        <article
          key={day.id}
          className="card dayListCard"
          style={day.themeColor ? { '--day-theme': day.themeColor } as React.CSSProperties : undefined}
        >
          <div>
            <span className="dayDate">{day.date}</span>
            <h2>{day.title}</h2>
            <p>{day.subtitle}</p>
          </div>

          <div className="dayListAction">
            <span>{day.suggestedDeparture}</span>
            <Link className="quickButton" to={`/days/${day.id}`}>
              查看詳細行程
            </Link>
          </div>
        </article>
      ))}
    </section>
  )
}