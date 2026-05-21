import { Hero } from '../components/Hero'
import { NavGrid } from '../components/NavGrid'
import { ExpenseSummary } from '../components/ExpenseSummary'
import { navigationItems } from '../data/navigation'

export function HomePage() {
  return (
    <main className="wrap">
      <Hero
        title="金童家關西旅程"
        subtitle="正式框架化版本｜Vite + React + TypeScript"
      />

      <NavGrid items={navigationItems} />

      <ExpenseSummary />
    </main>
  )
}
