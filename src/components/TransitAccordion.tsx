import type { TransitPoint, TransitStep } from '../data/days'

type TransitAccordionProps = {
  outbound: TransitStep[]
  inbound: TransitStep[]
}

function mapUrl(point: TransitPoint) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(point.query)}`
}

function MapButton({ point }: { point: TransitPoint }) {
  return (
    <a
      className="mapButton"
      href={mapUrl(point)}
      target="_blank"
      rel="noreferrer"
    >
      📍 {point.label}
    </a>
  )
}

function TransitList({ title, steps }: { title: string; steps: TransitStep[] }) {
  return (
    <div className="transitColumn">
      <h4>{title}</h4>

      {steps.map((step, index) => (
        <article key={`${title}-${index}-${step.text}`} className="transitStep">
          {step.lineName ? (
            <div
              className="lineBadge"
              style={{ backgroundColor: step.lineColor ?? '#12323a' }}
            >
              {step.lineName}
            </div>
          ) : null}

          <p className="transitText">{step.text}</p>

          {step.direction ? (
            <div className="directionBox">
              <strong>搭乘方向</strong>
              <span>{step.direction}</span>
            </div>
          ) : null}

          {step.from || step.to ? (
            <div className="stationLinks">
              {step.from ? <MapButton point={step.from} /> : null}
              {step.to ? <MapButton point={step.to} /> : null}
            </div>
          ) : null}

          {step.exit ? <span className="exitHint">提醒：{step.exit}</span> : null}
        </article>
      ))}
    </div>
  )
}

export function TransitAccordion({ outbound, inbound }: TransitAccordionProps) {
  return (
    <details className="accordion">
      <summary>🚃 詳細交通與移動提醒</summary>

      <div className="accordionBody transitGrid">
        <TransitList title="去程" steps={outbound} />
        <TransitList title="回程" steps={inbound} />
      </div>
    </details>
  )
}
