import type { DayPlan } from './types'

export const day4Plan: DayPlan = {
  id: 'day-4',
  date: '7/27',
  title: 'Day 4｜USJ 環球影城',
  subtitle: '早上熱門、下午表演與輕鬆設施。',
  suggestedDeparture: '07:20 出門；07:30～08:00 到 USJ 門口排隊。',
  route: [
    { label: 'Liber Hotel', query: 'Liber Hotel Osaka' },
    { label: '環球城站／USJ入口', query: 'ユニバーサルシティ駅' },
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
    { label: '🍄 任天堂世界', query: 'Super Nintendo World USJ' },
    { label: '🎈 小小兵樂園', query: 'Minion Park USJ' }
  ],
  outbound: [
    {
      text: 'Liber Hotel → 櫻島站 → 環球城站',
      lineName: 'JR 夢咲線',
      lineColor: '#e87511',
      direction: '往西九條方向，搭 1 站到環球城站',
      from: { label: '櫻島站', query: '桜島駅' },
      to: { label: '環球城站', query: 'ユニバーサルシティ駅' },
      exit: '環球城站出站後穿過 Universal CityWalk，跟著 USJ 入口指標。'
    },
    {
      text: 'USJ入口 → 園區步行 → 任天堂世界／哈利波特區',
      lineName: '園區步行',
      lineColor: '#16a34a',
      direction: '入園後不要先逛商店',
      from: { label: 'USJ入口', query: 'Universal Studios Japan entrance' },
      to: { label: '任天堂世界', query: 'Super Nintendo World USJ' },
      exit: '最快方向：入園後不要先逛商店。'
    }
  ],
  inbound: [
    {
      text: 'USJ入口 → Universal CityWalk → Liber Hotel',
      lineName: '步行或 JR 夢咲線',
      lineColor: '#e87511',
      direction: '出園後穿過 CityWalk，避開商店街停留',
      from: { label: 'USJ入口', query: 'Universal Studios Japan entrance' },
      to: { label: 'Liber Hotel', query: 'Liber Hotel Osaka' },
      exit: '出園後穿過 CityWalk，避開商店街停留。'
    }
  ],
  note: 'USJ 正門最近站是環球城站；櫻島站較適合 Liber Hotel。熱門設施排超過40分鐘就考慮放棄。'
}
