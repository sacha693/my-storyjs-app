import { Link, useParams } from 'react-router-dom'
import { DayCard } from '../components/DayCard'
import { TripDataGate } from '../components/TripDataGate'
import { useDayPlans } from '../context/DayPlansContext'

export function DayDetailPage() {
  const { dayId } = useParams()
  const { dayPlans } = useDayPlans()
  const day = dayPlans.find((item) => item.id === dayId)

  return (
    <main className="wrap">
      <TripDataGate>
        {!day ? (
          <section className="card hero">
            <span className="badge">行程提醒</span>
            <h1>找不到這一天的行程</h1>
            <p>請回每日行程列表重新選擇。</p>
            <Link className="quickButton" to="/days">
              回每日行程
            </Link>
          </section>
        ) : (
          <>
            <section className="card hero compactHero">
              <span className="badge">單日詳細行程</span>
              <h1>{day.title}</h1>
              <p>{day.subtitle}</p>
              <Link className="quickButton" to="/days">
                回每日行程
              </Link>
            </section>

            <DayCard day={day} />
          </>
        )}
      </TripDataGate>
    </main>
  )
}
