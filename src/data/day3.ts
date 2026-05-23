import type { DayPlan } from './types'

export const day3Plan: DayPlan = {
  id: 'day-3',
  date: '7/26',
  title: 'Day 3｜海遊館主軸＋移動到 USJ 區',
  subtitle: '一個主景點，不消耗隔天 USJ 體力。',
  suggestedDeparture: '09:30 退房出門；10:30 抵達海遊館較剛好；15:30 前後到 Liber Hotel。',
  route: [
    { label: '天滿橋', query: '天満橋駅' },
    { label: '海遊館', query: 'Osaka Aquarium Kaiyukan' },
    { label: '天保山午餐', query: 'Tempozan Marketplace' },
    { label: 'Liber Hotel', query: 'Liber Hotel Osaka' }
  ],
  tickets: [
    { title: '海遊館票券', detail: '海遊館票券／QR Code 先截圖。' },
    { title: 'Liber Hotel', detail: '住宿訂單截圖。' }
  ],
  quickLinks: [
    { label: '🐠 大阪海遊館', query: 'Osaka Aquarium Kaiyukan' },
    { label: '🍽 天保山午餐', query: 'Tempozan Marketplace' },
    { label: '🏨 Liber Hotel', query: 'Liber Hotel Osaka' },
    { label: '🍜 CityWalk晚餐', query: 'Universal CityWalk Osaka' }
  ],
  outbound: [
    {
      text: '天滿橋站 → 谷町四丁目站轉車 → 大阪港站 → 海遊館',
      lineName: 'Osaka Metro 谷町線＋中央線',
      lineColor: '#019a66',
      direction: '先搭谷町線往八尾南方向到谷町四丁目，再轉中央線往大阪港／夢洲方向',
      from: { label: '天滿橋站', query: '天満橋駅' },
      to: { label: '大阪港站', query: '大阪港駅' },
      exit: '大阪港站 1 號出口，出站後步行約 5～8 分鐘到海遊館與天保山 Market Place。'
    },
    {
      text: '大阪港站 → 弁天町站轉 JR → 西九條站轉 JR 夢咲線 → 櫻島站 → Liber Hotel',
      lineName: 'Osaka Metro 中央線＋JR 大阪環狀線＋JR 夢咲線',
      lineColor: '#e87511',
      direction: '中央線往弁天町，轉 JR 往西九條，再轉 JR 夢咲線往櫻島方向',
      from: { label: '大阪港站', query: '大阪港駅' },
      to: { label: '櫻島站', query: '桜島駅' },
      exit: '櫻島站出站後步行約 2～5 分鐘，依 Liber Hotel 指標或地圖前往。'
    }
  ],
  inbound: [
    {
      text: 'Liber Hotel → Universal CityWalk',
      lineName: '步行或 JR 夢咲線',
      lineColor: '#e87511',
      direction: '若要進 USJ 正門請以環球城站為主',
      from: { label: 'Liber Hotel', query: 'Liber Hotel Osaka' },
      to: { label: 'Universal CityWalk', query: 'Universal CityWalk Osaka' },
      exit: '若要進 USJ 正門請以環球城站為主。'
    },
    {
      text: 'Universal CityWalk → Liber Hotel',
      lineName: '步行／JR',
      lineColor: '#6b7280',
      direction: '晚餐後直接回飯店',
      from: { label: 'Universal CityWalk', query: 'Universal CityWalk Osaka' },
      to: { label: 'Liber Hotel', query: 'Liber Hotel Osaka' },
      exit: '晚餐後直接回飯店。'
    }
  ],
  note: '下午回飯店休息，為隔天 USJ 存體力。'
}
