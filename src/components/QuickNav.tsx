import type { QuickLink } from '../data/days'

type QuickNavProps = {
  items: QuickLink[]
}

export function QuickNav({ items }: QuickNavProps) {
  return (
    <div className="quickNav">
      {items.map((item) => (
        <a
          key={item.label}
          className="quickButton"
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.query)}`}
          target="_blank"
          rel="noreferrer"
        >
          {item.label}
        </a>
      ))}
    </div>
  )
}
