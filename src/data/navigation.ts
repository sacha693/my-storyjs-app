import type { NavItem } from '../types'

export const navigationItems: NavItem[] = [
  {
    icon: '🗓️',
    title: '每日行程',
    description: '含交通與出口資訊',
    href: '#days'
  },
  {
    icon: '💰',
    title: '旅費記帳',
    description: 'Supabase 雲端同步',
    href: '#expense'
  },
  {
    icon: '🎢',
    title: 'USJ 攻略',
    description: '快速通關與動線',
    href: '#usj'
  },
  {
    icon: '🚃',
    title: '交通導航',
    description: '站名與出口整理',
    href: '#transit'
  }
]
