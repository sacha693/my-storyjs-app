import type { DayPlan } from '../data/days'
import { QuickNav } from './QuickNav'
import { RouteFlow } from './RouteFlow'
import { TicketAccordion } from './TicketAccordion'
import { TransitAccordion } from './TransitAccordion'

type DayCardProps = {
  day: DayPlan
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

      <RouteFlow route={day.route} outbound={day.outbound} />

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
