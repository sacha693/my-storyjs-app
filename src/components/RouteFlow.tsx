import type { TransitPoint, TransitStep } from '../data/days'

type RouteFlowProps = {
  route: TransitPoint[]
  outbound: TransitStep[]
}

function mapUrl(point: TransitPoint) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(point.query)}`
}

function iconForStep(step?: TransitStep) {
  const text = `${step?.lineName ?? ''} ${step?.text ?? ''}`

  if (/步行|園區/.test(text)) return '🚶'
  if (/飛機|航空|機場|BR/.test(text)) return '✈️'
  if (/客運|巴士|公車/.test(text)) return '🚌'
  if (/Rapi|南海|JR|阪神|近鐵|京阪/.test(text)) return '🚆'
  if (/Metro|谷町|中央|御堂筋|地下鐵/.test(text)) return '🚇'
  if (/計程車|taxi/i.test(text)) return '🚕'

  return '➡️'
}

function labelForStep(step?: TransitStep) {
  if (!step?.lineName) return '移動'
  return step.lineName
}

export function RouteFlow({ route, outbound }: RouteFlowProps) {
  return (
    <section className="dayOverview routeFlowPanel">
      <strong>每日行程總覽</strong>

      <div className="routeFlow" aria-label="每日移動路線">
        {route.map((stop, index) => {
          const step = outbound[index - 1] ?? outbound[index]

          return (
            <div className="routeFlowItem" key={`${stop.label}-${index}`}>
              {index > 0 ? (
                <div className="routeMove">
                  <span className="moveIcon">{iconForStep(step)}</span>
                  <span className="moveLine">{labelForStep(step)}</span>
                  <span className="moveArrow">→</span>
                </div>
              ) : null}

              <a
                className="routeChip routeStop"
                href={mapUrl(stop)}
                target="_blank"
                rel="noreferrer"
              >
                {stop.label}
              </a>
            </div>
          )
        })}
      </div>
    </section>
  )
}
