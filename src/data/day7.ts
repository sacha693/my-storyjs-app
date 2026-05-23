import type { DayPlan } from './types'

export const day7Plan: DayPlan = {
  id: 'day-7',
  date: '7/30',
  title: 'Day 7｜自由購物＋補買日',
  subtitle: '整天保留彈性。',
  suggestedDeparture: '睡晚一點，建議 10:30 後再出門；下午保留整理行李時間。',
  route: [
    { label: 'OASIS', query: 'OASIS NANIWA Osaka' },
    { label: 'Joshin Super Kids Land', query: 'Joshin Super Kids Land Osaka' },
    { label: '黑門市場／難波補買', query: 'Kuromon Market' },
    { label: '飯店整理行李', query: 'OASIS NANIWA Osaka' }
  ],
  tickets: [
    { title: '購物退稅', detail: '需護照。' },
    { title: '藥妝折價券', detail: '如有藥妝折價券，先截圖放手機相簿。' }
  ],
  quickLinks: [
    { label: '🧸 Joshin Super Kids Land', query: 'Joshin Super Kids Land Osaka' },
    { label: '🛍 黑門市場', query: 'Kuromon Market' },
    { label: '🏨 回OASIS', query: 'OASIS NANIWA Osaka' }
  ],
  outbound: [
    {
      text: 'OASIS NANIWA → 日本橋站／黑門市場',
      lineName: '步行或 Osaka Metro',
      lineColor: '#6b7280',
      direction: '往日本橋站／黑門市場方向',
      from: { label: 'OASIS NANIWA', query: 'OASIS NANIWA Osaka' },
      to: { label: '日本橋站／黑門市場', query: 'Kuromon Market' },
      exit: '日本橋站 10 號出口方向。'
    },
    {
      text: '難波站 → Joshin Super Kids Land',
      lineName: '步行',
      lineColor: '#6b7280',
      direction: '往南海難波／日本橋／電電城方向',
      from: { label: '難波站', query: 'Namba Station' },
      to: { label: 'Joshin Super Kids Land', query: 'Joshin Super Kids Land Osaka' },
      exit: '難波站往南海難波／日本橋／電電城方向出口。'
    }
  ],
  inbound: [
    {
      text: '黑門市場／日本橋 → OASIS NANIWA',
      lineName: '步行或 Metro',
      lineColor: '#6b7280',
      direction: '往 OASIS NANIWA 方向',
      from: { label: '黑門市場／日本橋', query: 'Kuromon Market' },
      to: { label: 'OASIS NANIWA', query: 'OASIS NANIWA Osaka' },
      exit: '採買後先回住宿放東西。'
    }
  ],
  note: '購物與整理日，不要排太滿。'
}
