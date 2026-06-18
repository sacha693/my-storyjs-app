import { Link } from 'react-router-dom'
import { NavGrid } from '../components/NavGrid'
import { TripDataGate } from '../components/TripDataGate'
import { navigationItems } from '../data/navigation'
import { useDayPlans } from '../context/DayPlansContext'
import type { DayPlan } from '../data/types'

const TRIP_YEAR = 2026

function getTripDate(date: string) {
  const [month, day] = date.split('/').map(Number)
  return new Date(TRIP_YEAR, month - 1, day)
}

function startOfToday() {
  const now = new Date()
  return new Date(now.getFullYear(), now.getMonth(), now.getDate())
}

function getJourneySummary(dayPlans: DayPlan[]) {
  const today = startOfToday()
  const firstDay = getTripDate(dayPlans[0].date)
  const lastDay = getTripDate(dayPlans[dayPlans.length - 1].date)
  const activeDay = dayPlans.find((day) => getTripDate(day.date).getTime() === today.getTime())

  if (activeDay) {
    return {
      label: `今日旅程｜${activeDay.title}`,
      line1: activeDay.subtitle,
      line2: `建議出發：${activeDay.suggestedDeparture}`,
      href: `/days/${activeDay.id}`,
      action: '查看今日詳細行程'
    }
  }

  if (today < firstDay) {
    const daysLeft = Math.ceil((firstDay.getTime() - today.getTime()) / 86400000)
    return {
      label: `出門倒數｜還有 ${daysLeft} 天`,
      line1: `${dayPlans[0].title} 即將開始`,
      line2: dayPlans[0].subtitle,
      href: `/days/${dayPlans[0].id}`,
      action: '查看出發日行程'
    }
  }

  if (today > lastDay) {
    return {
      label: '旅程回顧｜關西親子自由行',
      line1: '旅程已完成，可以回來查看行程紀錄與消費明細。',
      line2: `最後一天：${dayPlans[dayPlans.length - 1].title}`,
      href: '/days',
      action: '查看全部行程'
    }
  }

  const nextDay = dayPlans.find((day) => getTripDate(day.date) > today)

  return {
    label: nextDay ? `下一段旅程｜${nextDay.title}` : '旅程提醒',
    line1: nextDay?.subtitle ?? '今天沒有排定行程。',
    line2: nextDay ? `建議出發：${nextDay.suggestedDeparture}` : '可以查看每日行程與旅費記錄。',
    href: nextDay ? `/days/${nextDay.id}` : '/days',
    action: nextDay ? '查看下一段行程' : '查看每日行程'
  }
}

export function HomePage() {
  const { dayPlans } = useDayPlans()

  return (
    <main className="wrap appVisualWrap">
      <TripDataGate>
        {dayPlans.length === 0 ? (
          <section className="card hero">
            <span className="badge">系統提醒</span>
            <h1>目前沒有行程資料</h1>
            <p>請先在 Supabase 後台建立加密行程資料。</p>
          </section>
        ) : (
          <HomeContent dayPlans={dayPlans} />
        )}
      </TripDataGate>
    </main>
  )
}

function HomeContent({ dayPlans }: { dayPlans: DayPlan[] }) {
  const journeySummary = getJourneySummary(dayPlans)

  return (
    <>
      <section className="appVisualHero card">
        <div>
          <span className="badge">2026 關西親子自由行</span>
          <h1>金童家關西旅程</h1>
          <p>大阪・京都・神戶・USJ｜每日行程、交通與旅費整理</p>

          <div className="todayJourneyCard">
            <strong>{journeySummary.label}</strong>
            <span>{journeySummary.line1}</span>
            <span>{journeySummary.line2}</span>
            <Link className="quickButton" to={journeySummary.href}>
              {journeySummary.action}
            </Link>
          </div>
        </div>
        <div
          className="appVisualImage"
          aria-label="金童家關西旅程主視覺"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.08), rgba(255,255,255,0.12)), url('/my-storyjs-app/family_q1.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
      </section>

      <NavGrid items={navigationItems} />
    </>
  )
}
