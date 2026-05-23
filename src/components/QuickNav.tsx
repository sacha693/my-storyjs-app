import type { QuickLink } from '../data/days'

type QuickNavProps = {
  items: QuickLink[]
}

function mapSearchUrl(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`
}

export function QuickNav({ items }: QuickNavProps) {
  return (
    <nav className="quickNav" aria-label="快速開啟地圖">
      {items.map((item) => (
        <a
          key={`${item.label}-${item.query}`}
          className="quickButton"
          href={mapSearchUrl(item.query)}
          target="_blank"
          rel="noreferrer"
          aria-label={`在 Google Maps 開啟 ${item.label}`}
          title={`在 Google Maps 開啟 ${item.label}`}
        >
          {item.label}
        </a>
      ))}
    </nav>
  )
}
