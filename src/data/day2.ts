import type { DayPlan } from './types'

export const day2Plan: DayPlan = {
  id: 'day-2',
  date: '7/25',
  title: 'Day 2｜童書之森＋天神祭本宮',
  subtitle: '白天室內輕鬆，晚上看祭典。',
  suggestedDeparture: '09:10 出門去童書之森；17:30 出門前往天神祭觀賞點。',
  route: [
    { label: 'APA天滿橋', query: 'APA Hotel Osaka Temmabashi Ekimae' },
    { label: '童書之森中之島', query: 'こども本の森 中之島' },
    { label: '北浜午餐', query: '北浜 カフェ 大阪' },
    { label: '飯店午休', query: 'APA Hotel Osaka Temmabashi Ekimae' },
    { label: '天滿橋觀賞點', query: '34.6923,135.5200' }
  ],
  tickets: [
    { title: '童書之森預約', detail: '若童書之森需預約，請將預約畫面截圖。' },
    { title: '祭典觀賞點', detail: '祭典日不需票券，但建議先保存觀賞點地圖。' }
  ],
  quickLinks: [
    { label: '🌿 童書之森', query: 'こども本の森 中之島' },
    { label: '☕ 北浜咖啡午餐', query: '北浜 カフェ 大阪' },
    { label: '🏨 回APA飯店', query: 'APA Hotel Osaka Temmabashi Ekimae' },
    { label: '🎆 親子觀賞點', query: '34.6923,135.5200' }
  ],
  outbound: [
    {
      text: '天滿橋站 → なにわ橋站 → 童書之森中之島',
      lineName: '京阪中之島線／步行銜接',
      lineColor: '#0072bc',
      direction: '往中之島／なにわ橋方向',
      from: { label: '天滿橋站', query: '天満橋駅' },
      to: { label: 'なにわ橋站', query: 'なにわ橋駅' },
      exit: 'なにわ橋站 1 號出口，往中之島公園與童書之森。'
    },
    {
      text: '童書之森中之島 → 北浜咖啡區',
      lineName: '步行',
      lineColor: '#6b7280',
      direction: '往北浜站、土佐堀川河岸咖啡區',
      from: { label: '童書之森中之島', query: 'こども本の森 中之島' },
      to: { label: '北浜咖啡區', query: '北浜 カフェ 大阪' },
      exit: '往北浜站、土佐堀川河岸咖啡區。'
    }
  ],
  inbound: [
    {
      text: '北浜 → APA 天滿橋',
      lineName: '京阪／步行',
      lineColor: '#0072bc',
      direction: '往天滿橋方向',
      from: { label: '北浜', query: '北浜駅 大阪' },
      to: { label: 'APA 天滿橋', query: 'APA Hotel Osaka Temmabashi Ekimae' },
      exit: '天滿橋站 4 號出口或依飯店地圖。'
    },
    {
      text: '天滿橋河岸 → APA 天滿橋',
      lineName: '步行',
      lineColor: '#6b7280',
      direction: '沿南側河岸外圍回飯店',
      from: { label: '天滿橋河岸', query: '天満橋 大川' },
      to: { label: 'APA 天滿橋', query: 'APA Hotel Osaka Temmabashi Ekimae' },
      exit: '沿南側河岸外圍回飯店。'
    }
  ],
  note: '親子版不擠橋中央。帶小風扇、水、濕紙巾。'
}
