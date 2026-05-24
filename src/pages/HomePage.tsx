import { Hero } from '../components/Hero'
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
        <div className="appVisualImage" aria-label="金童家關西旅程主視覺" />
      </section>

      <Hero
        title="旅程總覽"
        subtitle="7/23～7/31｜親子體力、行李移動與每日交通已整理在各日行程中。"
      />

      <NavGrid items={navigationItems} />

      <section className="card">
        <span className="badge">旅行提醒</span>
        <h2>使用方式</h2>
        <p>首頁保留總覽與快速入口；每日交通、票券、預約連結與注意事項請進入「每日行程」查看。</p>
      </section>

      <ExpenseSummary />
    </main>
  )
}
