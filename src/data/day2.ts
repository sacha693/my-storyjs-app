import type { DayPlan } from './types'

export const day2Plan: DayPlan = {
  id: 'day-2',
  date: '7/25',
  title: 'Day 2｜童書之森＋天神祭本宮',
  subtitle: '白天室內輕鬆，晚上看祭典。',
  suggestedDeparture: '09:10 從 APA 天滿橋出發；先搭京阪中之島線前往童書之森，17:30 出門前往天神祭觀賞點。',
  themeColor: '#2563a9',
  route: [
    { label: 'APA天滿橋', query: 'APA Hotel Osaka Temmabashi Ekimae' },
    { label: '天滿橋站', query: '天満橋駅' },
    { label: 'なにわ橋站', query: 'なにわ橋駅' },
    { label: '童書之森中之島', query: 'こども本の森 中之島' },
    { label: '北浜午餐', query: '北浜 カフェ 大阪' },
    { label: '飯店午休', query: 'APA Hotel Osaka Temmabashi Ekimae' },
    { label: '天滿橋觀賞點', query: '34.6923,135.5200' }
  ],
  tickets: [
    { title: '童書之森預約', detail: '若童書之森需預約，請將預約畫面截圖。' },
    { title: '京阪中之島線時刻', detail: '出發前請用 Google Maps 與京阪時刻確認天滿橋 → なにわ橋班次。' },
    { title: '祭典觀賞點', detail: '祭典日不需票券，但建議先保存觀賞點地圖。' }
  ],
  quickLinks: [
    { label: '🌿 童書之森', query: 'こども本の森 中之島' },
    { label: '🚃 なにわ橋站', query: 'なにわ橋駅' },
    { label: '☕ 北浜咖啡午餐', query: '北浜 カフェ 大阪' },
    { label: '🏨 回APA飯店', query: 'APA Hotel Osaka Temmabashi Ekimae' },
    { label: '🎆 親子觀賞點', query: '34.6923,135.5200' }
  ],
  outbound: [
    {
      text: 'APA 天滿橋 → 天滿橋站 → なにわ橋站 → 童書之森中之島',
      lineName: '京阪中之島線＋步行｜約20～30分鐘',
      lineColor: '#0072bc',
      direction: '09:10 從 APA 出發，步行到天滿橋站約 5～8 分鐘；搭京阪中之島線到なにわ橋站約 2～3 分鐘，含等車與步行約 20～30 分鐘。',
      from: { label: 'APA 天滿橋', query: 'APA Hotel Osaka Temmabashi Ekimae' },
      to: { label: 'なにわ橋站', query: 'なにわ橋駅' },
      exit: 'なにわ橋站 1 號出口，出站後依 Google Maps 步行約 8～10 分鐘前往中之島公園與童書之森；班次較少，出發前請再確認時刻。'
    },
    {
      text: '童書之森中之島 → 北浜咖啡區',
      lineName: '步行｜約8～12分鐘',
      lineColor: '#6b7280',
      direction: '依 Google Maps 往北浜站、土佐堀川河岸咖啡區步行，約 8～12 分鐘。',
      from: { label: '童書之森中之島', query: 'こども本の森 中之島' },
      to: { label: '北浜咖啡區', query: '北浜 カフェ 大阪' },
      exit: '往北浜站、土佐堀川河岸咖啡區；天氣熱時找室內午餐或咖啡店休息。'
    }
  ],
  inbound: [
    {
      text: '北浜 → APA 天滿橋',
      lineName: '京阪／步行｜約15～25分鐘',
      lineColor: '#0072bc',
      direction: '以 Google Maps 當日路線為準；搭京阪或步行回飯店約 15～25 分鐘，孩子累或天氣熱時可短程計程車回飯店午休。',
      from: { label: '北浜', query: '北浜駅 大阪' },
      to: { label: 'APA 天滿橋', query: 'APA Hotel Osaka Temmabashi Ekimae' },
      exit: '若搭京阪回天滿橋，可由天滿橋站 4 號出口或依 Google Maps 導航回飯店。'
    },
    {
      text: 'APA 天滿橋 → 天滿橋觀賞點 → APA 天滿橋',
      lineName: '步行｜單程約5～10分鐘',
      lineColor: '#6b7280',
      direction: '晚上看天神祭時，從飯店步行到天滿橋河岸觀賞點，單程約 5～10 分鐘，再步行回飯店。',
      from: { label: 'APA 天滿橋', query: 'APA Hotel Osaka Temmabashi Ekimae' },
      to: { label: '天滿橋觀賞點', query: '34.6923,135.5200' },
      exit: '祭典人潮多，請依 Google Maps 與現場管制走外圍路線，不要擠橋中央。'
    }
  ],
  note: '親子版不擠橋中央。童書之森去程以京阪中之島線為主，班次較少，請出發前確認 Google Maps 與京阪時刻。'
}
