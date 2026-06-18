import type { CSSProperties } from 'react'
import type { DayPlan, TransitPoint } from '../data/types'
import { TicketAccordion } from './TicketAccordion'
import { TransitAccordion } from './TransitAccordion'

type DayCardProps = {
  day: DayPlan
}

type DayCardStyle = CSSProperties & {
  '--day-theme'?: string
}

function mapUrl(point: TransitPoint) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(point.query)}`
}

export function DayCard({ day }: DayCardProps) {
  const dayStyle: DayCardStyle = day.themeColor
    ? { '--day-theme': day.themeColor }
    : {}

  return (
    <article className="card dayCard" id={day.id} style={dayStyle}>
      <div className="dayHeader">
        <div>
          <span className="dayDate">{day.date}</span>
          <h2>{day.title}</h2>
          <p>{day.subtitle}</p>
        </div>

        <div className="departBox">
          <span>建議出發</span>
          <strong>{day.suggestedDeparture}</strong>
        </div>
      </div>

      <section className="dayOverview">
        <strong>每日行程總覽</strong>

        <div className="routeLine routeLineWithArrows">
          {day.route.map((stop, index) => (
            <a
              key={`${day.id}-${index}-${stop.label}-${stop.query}`}
              className="routeChip"
              href={mapUrl(stop)}
              target="_blank"
              rel="noreferrer"
              aria-label={`在 Google Maps 開啟 ${stop.label}`}
            >
              {stop.label}
            </a>
          ))}
        </div>
      </section>

      <TransitAccordion
        outbound={day.outbound}
        inbound={day.inbound}
      />

      <TicketAccordion tickets={day.tickets} />

      <div className="dayNote">
        <strong>旅遊提醒</strong>
        <p>{day.note}</p>
      </div>
    </article>
  )
}
