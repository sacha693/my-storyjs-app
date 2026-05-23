import type { DayPlan, TransitPoint } from '../data/days'
import { QuickNav } from './QuickNav'
import { TicketAccordion } from './TicketAccordion'
import { TransitAccordion } from './TransitAccordion'

type DayCardProps = {
  day: DayPlan
}

function mapUrl(point: TransitPoint) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(point.query)}`
}

export function DayCard({ day }: DayCardProps) {
  return (
    <article className="card dayCard" id={day.id}>
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
        <div className="routeLine">
          {day.route.map((stop) => (
            <a
              key={stop.label}
              className="routeChip"
              href={mapUrl(stop)}
              target="_blank"
              rel="noreferrer"
            >
              {stop.label}
            </a>
          ))}
        </div>
      </section>

      <QuickNav items={day.quickLinks} />

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
