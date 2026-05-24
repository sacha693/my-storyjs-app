import { Link, useParams } from 'react-router-dom'
import { DayCard } from '../components/DayCard'
import { dayPlans } from '../data/days'

export function DayDetailPage() {
  const { dayId } = useParams()
  const day = dayPlans.find((item) => item.id === dayId)

  if (!day) {
    return (
      <main className="wrap">
        <section className="card hero">
          <span className="badge">行程提醒</span>
          <h1>找不到這一天的行程</h1>
          <p>請回每日行程列表重新選擇。</p>
          <Link className="quickButton" to="/days">
            回每日行程
          </Link>
        </section>
      </main>
    )
  }

  return (
    <main className="wrap">
      <section className="card hero compactHero">
        <span className="badge">單日詳細行程</span>
        <h1>{day.title}</h1>
        <p>{day.subtitle}</p>
        <Link className="quickButton" to="/days">
          回每日行程
        </Link>
      </section>

      <DayCard day={day} />
    </main>
  )
}
