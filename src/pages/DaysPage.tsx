import { DaySection } from '../components/DaySection'

export function DaysPage() {
  return (
    <main className="wrap">
      <section className="card hero">
        <span className="badge">每日行程</span>
        <h1>關西每日旅程</h1>
        <p>含交通路線、站名、出口與票券整理。</p>
      </section>

      <DaySection />
    </main>
  )
}
