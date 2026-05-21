import type { TransitStep } from '../data/days'

type TransitAccordionProps = {
  outbound: TransitStep[]
  inbound: TransitStep[]
}

function TransitList({ title, steps }: { title: string; steps: TransitStep[] }) {
  return (
    <div className="transitColumn">
      <h4>{title}</h4>

      {steps.map((step) => (
        <article key={step.text} className="transitStep">
          <p>{step.text}</p>

          {step.exit ? <span>最近出口：{step.exit}</span> : null}
        </article>
      ))}
    </div>
  )
}

export function TransitAccordion({ outbound, inbound }: TransitAccordionProps) {
  return (
    <details className="accordion">
      <summary>🚃 去回程交通</summary>

      <div className="accordionBody transitGrid">
        <TransitList title="去程" steps={outbound} />
        <TransitList title="回程" steps={inbound} />
      </div>
    </details>
  )
}
