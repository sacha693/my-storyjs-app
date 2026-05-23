import { Hero } from '../components/Hero'
import { NavGrid } from '../components/NavGrid'
import { ExpenseSummary } from '../components/ExpenseSummary'
import { DaySection } from '../components/DaySection'
import { navigationItems } from '../data/navigation'

export function HomePage() {
  return (
    <main className="wrap appVisualWrap">
      <section className="appVisualHero card">
        <div>
          <span className="badge">2026 關西親子自由行</span>
          <h1>金童家關西旅程</h1>
          <p>每日行程 × 交通導覽 × 旅費記帳 × 家庭旅行主視覺</p>
        </div>
        <div className="appVisualImage" aria-label="金童家關西旅程主視覺" />
      </section>

      <Hero
        title="金童家關西旅程"
        subtitle="正式框架化版本｜Vite + React + TypeScript"
      />

      <NavGrid items={navigationItems} />

      <DaySection />

      <ExpenseSummary />
    </main>
  )
}
