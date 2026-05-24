import { Link } from 'react-router-dom'
import type { NavItem } from '../types'

type NavGridProps = {
  items: NavItem[]
}

export function NavGrid({ items }: NavGridProps) {
  return (
    <section className="grid">
      {items.map((item) => (
        <Link key={item.title} className="card navCard" to={item.href}>
          <div className="navIcon">{item.icon}</div>
          <h2>{item.title}</h2>
          <p>{item.description}</p>
        </Link>
      ))}
    </section>
  )
}
