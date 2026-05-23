import type { DayPlan } from './types'

export const day0Plan: DayPlan = {
  id: 'day-0',
  date: '7/23',
  title: 'Day 0｜台中 → 桃園機場過夜',
  subtitle: '前一天晚上出發，降低凌晨趕車壓力。',
  suggestedDeparture: '20:20 台中火車站附近集合；21:00 搭客運前往桃園機場。',
  route: [
    { label: '台中火車站', query: '台中火車站' },
    { label: '客運', query: '台中轉運站' },
    { label: '桃園機場 T2', query: '桃園國際機場第二航廈' },
    { label: '5F 美食街外圍休息', query: '桃園國際機場第二航廈 5F 美食街' }
  ],
  tickets: [
    { title: '護照、機票截圖、飯店訂單截圖先放手機相簿。' }
  ],
  quickLinks: [
    { label: '🚌 台中火車站', query: '台中火車站' },
    { label: '✈ 桃園機場T2', query: '桃園國際機場第二航廈' }
  ],
  outbound: [
    {
      text: '台中火車站／台中轉運站 → 桃園機場第二航廈',
      lineName: '國光／統聯客運',
      lineColor: '#0068b7',
      direction: '往桃園機場第二航廈',
      from: { label: '台中轉運站', query: '台中轉運站' },
      to: { label: '桃園機場第二航廈', query: '桃園國際機場第二航廈' },
      exit: '抵達 T2 後依 5F 美食街指標。'
    }
  ],
  inbound: [
    { text: '無回程；抵達機場後以休息為主。' }
  ],
  note: '提早到站，確認護照、機票截圖、頸枕、外套與小孩零食。'
}
