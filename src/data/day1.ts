import type { DayPlan } from './types'

const gmailLink = 'https://mail.google.com/mail/#all/19d0bc83a8e341b3'

export const day1Plan: DayPlan = {
  id: 'day-1',
  date: '7/24',
  title: 'Day 1｜神戶牛＋大阪天神祭宵宮',
  subtitle: '神戶進、大阪住，第一天不塞太滿。',
  suggestedDeparture: '04:20 桃園機場 T2 報到；10:00 抵達神戶機場；15:30 前後到 APA 天滿橋休息。',
  route: [
    { label: '桃園 T2', query: '桃園國際機場第二航廈' },
    { label: '神戶機場', query: '神戶機場' },
    { label: '三宮', query: '三宮駅' },
    { label: 'Mouriya 本店', query: 'Mouriya Honten Kobe' },
    { label: 'APA 天滿橋', query: 'APA Hotel Osaka Temmabashi Ekimae' },
    { label: '天神祭宵宮', query: '天満橋 大川 大阪 天神祭' }
  ],
  tickets: [
    { title: '長榮 BR134', detail: '06:20 桃園 T2 → 10:00 神戶機場，PNR：FP5WJ4。' },
    { title: 'Trip.com 訂單編號', detail: '1616329870509999。' },
    { title: '機票總計', detail: 'TWD44,988；票價 TWD31,551；稅項及費用 TWD13,437。來源：Trip.com 付款成功郵件。' },
    { title: 'Mouriya 本店神戶牛午餐', detail: '訂位資訊請先截圖。' },
    { title: 'Gmail 憑證信', detail: gmailLink }
  ],
  quickLinks: [
    { label: '🛬 神戶機場', query: '神戶機場' },
    { label: '🚃 三宮站', query: '三宮駅' },
    { label: '🥩 Mouriya本店', query: 'Mouriya Honten Kobe' },
    { label: '🏨 APA天滿橋', query: 'APA Hotel Osaka Temmabashi Ekimae' },
    { label: '🎆 天神祭宵宮', query: '天満橋 大川 大阪 天神祭' }
  ],
  outbound: [
    {
      text: '神戶機場站 → 三宮站',
      lineName: 'Port Liner',
      lineColor: '#00a7db',
      direction: '往三宮站',
      from: { label: '神戶機場站', query: '神戸空港駅' },
      to: { label: '三宮站', query: '三宮駅' },
      exit: '抵達三宮後，往西口／北野坂方向，依 Google Maps 步行到 Mouriya 本店。'
    },
    {
      text: '三宮站 → 大阪站 → 天滿橋站 → APA 天滿橋',
      lineName: 'JR 神戶線＋Osaka Metro 谷町線',
      lineColor: '#6a2c91',
      direction: '三宮站搭 JR 神戶線新快速／快速往大阪；大阪站轉乘谷町線系統前往天滿橋方向，當日以 Google Maps 路線為準。',
      from: { label: '三宮站', query: '三宮駅' },
      to: { label: '天滿橋站', query: '天満橋駅' },
      exit: '天滿橋站 4 號出口較接近 APA 天滿橋方向；帶行李時優先依 Google Maps 選擇電梯出口。'
    }
  ],
  inbound: [
    {
      text: 'APA 天滿橋 → 天滿橋大川河岸',
      lineName: '步行',
      lineColor: '#6b7280',
      direction: '往大川河岸／天神祭會場',
      from: { label: 'APA 天滿橋', query: 'APA Hotel Osaka Temmabashi Ekimae' },
      to: { label: '天滿橋大川河岸', query: '天満橋 大川' },
      exit: '祭典人潮多，依 Google Maps 與現場管制走外圍河岸，避免擠在橋中央。'
    },
    {
      text: '天滿橋河岸 → APA 天滿橋',
      lineName: '步行',
      lineColor: '#6b7280',
      direction: '回 APA Hotel Osaka Temmabashi Ekimae',
      from: { label: '天滿橋河岸', query: '天満橋 大川' },
      to: { label: 'APA 天滿橋', query: 'APA Hotel Osaka Temmabashi Ekimae' },
      exit: '回程建議沿河岸外側走；若人潮過多，依現場警備引導繞行。'
    }
  ],
  note: '神戶牛吃完先到大阪休息。第一天有行李，三宮到大阪建議以 JR 神戶線＋Google Maps 當日路線為準。'
}
