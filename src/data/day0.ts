import type { DayPlan } from './types'

export const day0Plan: DayPlan = {
  id: 'day-0',
  date: '7/23',
  title: 'Day 0｜出發前夜',
  subtitle: '提早睡、行李確認、電子票券最後檢查。',
  suggestedDeparture: '22:00 前睡覺；03:00 起床最穩。',
  route: [
    { label: '家', query: 'Taoyuan Taiwan' },
    { label: '桃園機場 T2', query: '桃園國際機場第二航廈' }
  ],
  tickets: [
    { title: '護照', detail: '確認有效期限。' },
    { title: '機票 QR / 訂位代號', detail: 'BR134／FP5WJ4。' },
    { title: '住宿訂單', detail: 'APA、Liber、OASIS 截圖保存。' },
    { title: '行動電源', detail: '放隨身包，不要托運。' }
  ],
  quickLinks: [
    { label: '✈ 桃園機場 T2', query: '桃園國際機場第二航廈' }
  ],
  outbound: [
    {
      text: '家 → 桃園機場 T2',
      lineName: '機場接送／自駕／計程車',
      lineColor: '#2563eb',
      direction: '凌晨出發，建議預留高速公路與航廈時間',
      from: { label: '家', query: 'Taoyuan Taiwan' },
      to: { label: '桃園機場 T2', query: '桃園國際機場第二航廈' },
      exit: '長榮航空通常於 T2 辦理報到。'
    }
  ],
  inbound: [
    {
      text: '桃園機場 T2 → 長榮航空報到櫃台',
      lineName: '航廈步行',
      lineColor: '#10b981',
      direction: '依 BR134 航班資訊前往報到',
      from: { label: '桃園機場 T2', query: '桃園國際機場第二航廈' },
      to: { label: '長榮航空櫃台', query: 'EVA Air check in counter TPE T2' },
      exit: '先完成托運再吃早餐。'
    }
  ],
  note: '出發日前一天不要排行程，早睡最重要。'
}
