import type { DayPlan } from './types'

const captainLineTimetable = 'https://www.mmjp.or.jp/Capt-Line/'

export const day3Plan: DayPlan = {
  id: 'day-3',
  date: '7/26',
  title: 'Day 3｜海遊館主軸＋移動到 USJ 區',
  subtitle: '先處理行李，再用 Captain Line 輕裝去海遊館。',
  suggestedDeparture: '09:30 APA 退房；請飯店叫大車計程車前往 Liber Hotel 寄放行李；再搭 Captain Line 前往海遊館。',
  themeColor: '#0e7490',
  route: [
    { label: 'APA 天滿橋', query: 'APA Hotel Osaka Temmabashi Ekimae' },
    { label: 'Liber Hotel', query: 'Liber Hotel Osaka' },
    { label: 'Captain Line 乘船處', query: 'Universal City Port Captain Line Osaka' },
    { label: '海遊館西はとば', query: '海遊館西はとば Captain Line' },
    { label: '海遊館', query: 'Osaka Aquarium Kaiyukan' },
    { label: '天保山午餐', query: 'Tempozan Marketplace' }
  ],
  tickets: [
    { title: '海遊館票券', detail: '海遊館票券／QR Code 先截圖。' },
    { title: 'Liber Hotel', detail: '住宿訂單截圖；抵達後先寄放行李。' },
    { title: 'Captain Line 官方時刻表', detail: captainLineTimetable },
    { title: '計程車預估', detail: 'APA 天滿橋 → Liber Hotel 約 ¥4,500～¥7,000；依時段、塞車與車型浮動。' }
  ],
  quickLinks: [
    { label: '🏨 Liber Hotel', query: 'Liber Hotel Osaka' },
    { label: '⛴ Captain Line時刻', query: captainLineTimetable },
    { label: '🐠 大阪海遊館', query: 'Osaka Aquarium Kaiyukan' },
    { label: '🍽 天保山午餐', query: 'Tempozan Marketplace' },
    { label: '🍜 CityWalk晚餐', query: 'Universal CityWalk Osaka' }
  ],
  outbound: [
    {
      text: 'APA 天滿橋 → Liber Hotel 寄放行李',
      lineName: '大車計程車｜約25～40分鐘',
      lineColor: '#6b7280',
      direction: '換飯店日不拖 2 件 28 吋行李轉乘。請 APA 櫃台協助叫大一點的車，先到 Liber Hotel 寄放行李，車程約 25～40 分鐘。',
      from: { label: 'APA 天滿橋', query: 'APA Hotel Osaka Temmabashi Ekimae' },
      to: { label: 'Liber Hotel', query: 'Liber Hotel Osaka' },
      exit: '日文：大人2人、子ども2人、28インチのスーツケースが2個あります。Liber Hotel Osakaまで行きたいです。大きめのタクシーを呼んでいただけますか？'
    },
    {
      text: 'Liber Hotel → Captain Line 乘船處 → 海遊館西はとば → 海遊館',
      lineName: 'Captain Line＋步行｜約20～35分鐘',
      lineColor: '#0072bc',
      direction: '寄放行李後輕裝前往 USJ 區乘船處，步行約 10～15 分鐘；Captain Line 船程約 10 分鐘，到海遊館西はとば後再步行到海遊館。',
      from: { label: 'Liber Hotel', query: 'Liber Hotel Osaka' },
      to: { label: '海遊館西はとば', query: '海遊館西はとば Captain Line' },
      exit: `船班受天候與營運日影響，出發前一天與當天早上確認官方時刻表：${captainLineTimetable}`
    },
    {
      text: '海遊館西はとば → 海遊館／天保山 Market Place',
      lineName: '步行｜約5～8分鐘',
      lineColor: '#6b7280',
      direction: '下船後依 Google Maps 步行到海遊館，約 5～8 分鐘；午餐可安排在天保山 Market Place。',
      from: { label: '海遊館西はとば', query: '海遊館西はとば Captain Line' },
      to: { label: '海遊館', query: 'Osaka Aquarium Kaiyukan' },
      exit: '若船班停航，備案為 Google Maps 推薦的大眾交通或計程車。'
    }
  ],
  inbound: [
    {
      text: '海遊館 → Captain Line → Liber Hotel／USJ 區',
      lineName: 'Captain Line／備案交通｜約20～35分鐘',
      lineColor: '#0072bc',
      direction: '玩完後優先依 Captain Line 船班返回 USJ 區，船程約 10 分鐘，含步行約 20～35 分鐘；若船班時間不合，改用 Google Maps 推薦路線。',
      from: { label: '海遊館', query: 'Osaka Aquarium Kaiyukan' },
      to: { label: 'Liber Hotel', query: 'Liber Hotel Osaka' },
      exit: '回到 Liber 後休息，晚上只安排 CityWalk 輕鬆晚餐。'
    },
    {
      text: 'Liber Hotel → Universal CityWalk → Liber Hotel',
      lineName: '步行｜單程約10～15分鐘',
      lineColor: '#6b7280',
      direction: '晚餐以 CityWalk 或飯店周邊為主，單程步行約 10～15 分鐘，不再拉長行程。',
      from: { label: 'Liber Hotel', query: 'Liber Hotel Osaka' },
      to: { label: 'Universal CityWalk', query: 'Universal CityWalk Osaka' },
      exit: '為隔天 USJ 存體力。'
    }
  ],
  note: 'Day 3 是行李友善日：先用大車計程車到 Liber 寄放行李，再輕裝搭 Captain Line 去海遊館。Captain Line 請點官方時刻表確認當日船班與停航公告。'
}
