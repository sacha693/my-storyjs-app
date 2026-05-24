export type TransitPoint = {
  label: string
  query: string
}

export type TransitStep = {
  text: string
  lineName?: string
  lineColor?: string
  direction?: string
  from?: TransitPoint
  to?: TransitPoint
  exit?: string
}

export type TicketInfo = {
  title: string
  detail?: string
}

export type QuickLink = {
  label: string
  query: string
}

export type DayPlan = {
  id: string
  date: string
  title: string
  subtitle: string
  suggestedDeparture: string
  route: TransitPoint[]
  tickets: TicketInfo[]
  quickLinks: QuickLink[]
  outbound: TransitStep[]
  inbound: TransitStep[]
  note: string
  themeColor?: string
}
