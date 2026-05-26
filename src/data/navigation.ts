import type { NavItem } from '../types'

export const navigationItems: NavItem[] = [
  {
    icon: '🗓️',
    title: '每日行程',
    description: '含交通與出口資訊',
    href: '/days'
  },
  {
    icon: '💰',
    title: '旅費記帳',
    description: '記錄旅途中每一筆花費',
    href: '/expense'
  },
  {
    icon: '🎢',
    title: 'USJ 攻略',
    description: '快速通關與動線',
    href: '/days/day-4'
  },
  {
    icon: '🚃',
    title: '交通導航',
    description: '站名與出口整理',
    href: '/days'
  }
]