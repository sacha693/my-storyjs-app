export type NavItem = {
  icon: string
  title: string
  description: string
  href: string
}

export type MemberName = '固定費' | 'sacha' | 'yang'

export type FixedCost = {
  date: string
  category: '住宿' | '機票'
  item: string
  jpy: number
  twd: number
  pay: string
  createdBy: '固定費'
}

export type Expense = {
  id?: string
  date: string
  category: string
  item: string
  jpy: number
  twd: number
  pay: string
  createdBy: MemberName
  fixed?: boolean
}
