import { dayPlans } from '../data/days'
import { DayCard } from './DayCard'

export function DaySection() {
  return (
    <section id="days">
      {dayPlans.map((day) => (
        <DayCard key={day.id} day={day} />
      ))}
    </section>
  )
}
