import type { TicketInfo } from '../data/days'

type TicketAccordionProps = {
  tickets: TicketInfo[]
}

function isUrl(text: string) {
  return /^https?:\/\//.test(text)
}

function TicketDetail({ detail }: { detail: string }) {
  if (isUrl(detail)) {
    return (
      <p>
        <a href={detail} target="_blank" rel="noreferrer">
          開啟憑證連結
        </a>
      </p>
    )
  }

  return <p>{detail}</p>
}

export function TicketAccordion({ tickets }: TicketAccordionProps) {
  return (
    <details className="accordion">
      <summary>🎫 票券資訊與憑證</summary>

      <div className="accordionBody">
        {tickets.map((ticket, index) => (
          <article key={`${index}-${ticket.title}-${ticket.detail ?? ''}`} className="ticketCard">
            <strong>{ticket.title}</strong>
            {ticket.detail ? <TicketDetail detail={ticket.detail} /> : null}
          </article>
        ))}
      </div>
    </details>
  )
}
