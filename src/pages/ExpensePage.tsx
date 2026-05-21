import { ExpenseSummary } from '../components/ExpenseSummary'

export function ExpensePage() {
  return (
    <main className="wrap">
      <section className="card hero">
        <span className="badge">旅費儀表板</span>
        <h1>旅費與固定費</h1>
        <p>之後會接 Supabase 即時同步與圖表。</p>
      </section>

      <ExpenseSummary />
    </main>
  )
}
