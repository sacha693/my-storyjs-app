type HeroProps = {
  title: string
  subtitle: string
}

export function Hero({ title, subtitle }: HeroProps) {
  return (
    <section className="card hero">
      <span className="badge">2026 關西親子自由行</span>
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </section>
  )
}
