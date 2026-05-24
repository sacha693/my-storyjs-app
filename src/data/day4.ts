import type { DayPlan } from './types'

export const day4Plan: DayPlan = {
  id: 'day-4',
  date: '7/27',
  title: 'Day 4｜USJ 環球影城',
  subtitle: '早上熱門、下午表演與輕鬆設施。',
  suggestedDeparture: '07:20 從 Liber Hotel 步行出發；07:30～08:00 抵達 USJ 門口排隊。',
  route: [
    { label: 'Liber Hotel', query: 'Liber Hotel Osaka' },
    { label: 'Universal CityWalk', query: 'Universal CityWalk Osaka' },
    { label: 'USJ入口', query: 'Universal Studios Japan entrance' },
    { label: '哈利波特/任天堂', query: 'Super Nintendo World USJ' },
    { label: '蘑菇餐廳', query: 'Kinopio Cafe USJ' },
    { label: '水世界', query: 'WaterWorld Universal Studios Japan' },
    { label: 'CityWalk', query: 'Universal CityWalk Osaka' }
  ],
  tickets: [
    { title: 'USJ 門票 QR Code', detail: '請先截圖。' },
    { title: 'Express Pass', detail: '截圖，入園前先確認指定時段。' },
    { title: '任天堂世界整理券', detail: '入園後依 App 顯示確認。' }
  ],
  quickLinks: [
    { label: '🎢 USJ園區', query: 'Universal Studios Japan' },
    { label: '🚉 環球城站', query: 'ユニバーサルシティ駅' },
    { label: '🏨 Liber Hotel', query: 'Liber Hotel Osaka' },
    { label: '🍄 任天堂世界', query: 'Super Nintendo World USJ' },
    { label: '🎈 小小兵樂園', query: 'Minion Park USJ' }
  ],
  outbound: [
    {
      text: 'Liber Hotel → Universal CityWalk → USJ 正門',
      lineName: '步行',
      lineColor: '#6b7280',
      direction: '從 Liber Hotel 直接步行前往 Universal CityWalk 與 USJ 正門，早上不用為 1 站 JR 進站等車。',
      from: { label: 'Liber Hotel', query: 'Liber Hotel Osaka' },
      to: { label: 'USJ入口', query: 'Universal Studios Japan entrance' },
      exit: '依 Google Maps 步行約抓 10～15 分鐘；現場跟著人流與 USJ 入口指標。'
    },
    {
      text: '下雨／孩子累備案：櫻島站 → 環球城站',
      lineName: 'JR 夢咲線',
      lineColor: '#e87511',
      direction: '若天氣不好或孩子體力不足，可從櫻島站搭 JR 夢咲線 1 站到環球城站。',
      from: { label: '櫻島站', query: '桜島駅' },
      to: { label: '環球城站', query: 'ユニバーサルシティ駅' },
      exit: '環球城站出站後穿過 Universal CityWalk，跟著 USJ 入口指標。'
    },
    {
      text: 'USJ入口 → 園區步行 → 任天堂世界／哈利波特區',
      lineName: '園區步行',
      lineColor: '#16a34a',
      direction: '入園後先確認 Express Pass 與整理券時段，熱門區優先，不要先逛商店。',
      from: { label: 'USJ入口', query: 'Universal Studios Japan entrance' },
      to: { label: '任天堂世界', query: 'Super Nintendo World USJ' },
      exit: '依 App 與園區動線前往。'
    }
  ],
  inbound: [
    {
      text: 'USJ入口 → Universal CityWalk → Liber Hotel',
      lineName: '步行',
      lineColor: '#6b7280',
      direction: '出園後穿過 CityWalk，直接步行回 Liber Hotel。',
      from: { label: 'USJ入口', query: 'Universal Studios Japan entrance' },
      to: { label: 'Liber Hotel', query: 'Liber Hotel Osaka' },
      exit: '晚上很累時不要再加行程；若下雨可改搭 JR 夢咲線 1 站回櫻島站。'
    }
  ],
  note: 'Liber Hotel 最近是櫻島站，USJ 正門最近是環球城站；親子早上入園以步行為主，JR 夢咲線 1 站作為下雨或體力不足備案。'
}
