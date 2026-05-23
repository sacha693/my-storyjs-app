import type { TicketInfo } from '../data/days'

type TicketAccordionProps = {
  tickets: TicketInfo[]
}

export function TicketAccordion({ tickets }: TicketAccordionProps) {
  return (
    <details className="accordion">
      <summary>🎫 票券資訊</summary>

      <div className="accordionBody">
        {tickets.map((ticket) => (
          <article key={ticket.title} className="ticketCard">
            <strong>{ticket.title}</strong>
            {ticket.detail ? <p>{ticket.detail}</p> : null}
          </article>
        ))}
      </div>
    </details>
  )
}
