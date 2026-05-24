import type { DayPlan } from './types'

export const day5Plan: DayPlan = {
  id: 'day-5',
  date: '7/28',
  title: 'Day 5｜換飯店＋難波神社＋心齋橋購物',
  subtitle: '先寄放行李，再輕裝逛街。',
  suggestedDeparture: '10:30 Liber Hotel 退房；搭大車計程車前往 OASIS NANIWA 寄放行李；下午前往難波神社、心齋橋與道頓堀。',
  themeColor: '#c26a6a',
  route: [
    { label: 'Liber Hotel', query: 'Liber Hotel Osaka' },
    { label: 'OASIS NANIWA', query: '1 Chome-3-18 Shioji Nishinari Ward Osaka' },
    { label: '岸里站', query: '岸里駅' },
    { label: '難波神社', query: '難波神社' },
    { label: '心齋橋', query: '心斎橋駅' },
    { label: 'シモジマ', query: 'Shimojima Shinsaibashi' },
    { label: '道頓堀', query: '道頓堀' }
  ],
  tickets: [
    { title: 'OASIS NANIWA 住宿訂單', detail: '住宿訂單截圖；抵達後先寄放行李。' },
    { title: '計程車預估', detail: 'Liber Hotel → OASIS NANIWA 約 ¥3,500～¥6,000；依時段、塞車與車型浮動。' },
    { title: '購物退稅', detail: '可能需要護照，請放隨身包。' }
  ],
  quickLinks: [
    { label: '🏨 OASIS NANIWA', query: '1 Chome-3-18 Shioji Nishinari Ward Osaka' },
    { label: '🚇 岸里站', query: '岸里駅' },
    { label: '⛩ 難波神社', query: '難波神社' },
    { label: '✏ シモジマ', query: 'Shimojima Shinsaibashi' },
    { label: '🌉 道頓堀', query: '道頓堀' }
  ],
  outbound: [
    {
      text: 'Liber Hotel → OASIS NANIWA 寄放行李',
      lineName: '大車計程車｜約25～40分鐘',
      lineColor: '#6b7280',
      direction: '2 大 2 小加 2 件 28 吋行李，換飯店日建議請 Liber Hotel 協助叫大一點的計程車，車程約 25～40 分鐘。',
      from: { label: 'Liber Hotel', query: 'Liber Hotel Osaka' },
      to: { label: 'OASIS NANIWA', query: '1 Chome-3-18 Shioji Nishinari Ward Osaka' },
      exit: '日文：大人2人、子ども2人、28インチのスーツケースが2個あります。OASIS NANIWAまで行きたいです。大きめのタクシーを呼んでいただけますか？'
    },
    {
      text: 'OASIS NANIWA → 岸里站 → 四ツ橋站／本町側 → 難波神社',
      lineName: 'Osaka Metro 四つ橋線＋步行｜約35～50分鐘',
      lineColor: '#0078ba',
      direction: '寄放行李後輕裝出發。從 OASIS 步行到岸里站約 5～8 分鐘，搭四つ橋線往西梅田方向約 15～20 分鐘，依 Google Maps 於四ツ橋或本町側下車，再步行前往難波神社。',
      from: { label: '岸里站', query: '岸里駅' },
      to: { label: '難波神社', query: '難波神社' },
      exit: '出口依 Google Maps 當日路線為準；難波神社作為逛街前的休息與轉場點。'
    },
    {
      text: '難波神社 → 心齋橋 → シモジマ',
      lineName: 'Google Maps 步行／地鐵｜約15～30分鐘',
      lineColor: '#6b7280',
      direction: '從難波神社依 Google Maps 前往心齋橋商圈與シモジマ，近距離段落多以步行為主，約 15～30 分鐘。',
      from: { label: '難波神社', query: '難波神社' },
      to: { label: 'シモジマ', query: 'Shimojima Shinsaibashi' },
      exit: '心齋橋與シモジマ逛街時間不要拉太滿，保留晚餐與回住宿體力。'
    },
    {
      text: 'シモジマ → 道頓堀',
      lineName: 'Google Maps 步行｜約10～20分鐘',
      lineColor: '#6b7280',
      direction: '依 Google Maps 從心齋橋／シモジマ往道頓堀移動，約 10～20 分鐘；晚餐安排在道頓堀或周邊。',
      from: { label: 'シモジマ', query: 'Shimojima Shinsaibashi' },
      to: { label: '道頓堀', query: '道頓堀' },
      exit: '人潮多時走外圍道路，不要穿越最擠的戎橋中央。'
    }
  ],
  inbound: [
    {
      text: '道頓堀 → なんば／四ツ橋側 → 岸里站 → OASIS NANIWA',
      lineName: 'Osaka Metro 四つ橋線｜約30～45分鐘',
      lineColor: '#0078ba',
      direction: '晚餐後依 Google Maps 前往四つ橋線可搭乘站點，搭往住之江公園方向到岸里站，再步行回 OASIS NANIWA，約 30～45 分鐘。',
      from: { label: '道頓堀', query: '道頓堀' },
      to: { label: '岸里站', query: '岸里駅' },
      exit: '購物袋多、孩子累或下雨時，直接短程計程車回 OASIS NANIWA。'
    }
  ],
  note: 'Day 5 是恢復型購物日：先到 OASIS 寄放行李，再以岸里／四つ橋線為核心輕裝移動。晚上購物袋多或孩子累時，直接搭計程車回住宿。'
}
