import { NavGrid } from '../components/NavGrid'
import { ExpenseSummary } from '../components/ExpenseSummary'
import { navigationItems } from '../data/navigation'

export function HomePage() {
  return (
    <main className="wrap appVisualWrap">
      <section className="appVisualHero card">
        <div>
          <span className="badge">2026 關西親子自由行</span>
          <h1>金童家關西旅程</h1>
          <p>大阪・京都・神戶・USJ｜每日行程、交通與旅費整理</p>
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

      <ExpenseSummary />
    </main>
  )
}
