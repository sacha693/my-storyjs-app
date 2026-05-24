import type { DayPlan } from './types'

const doguyasujiBookingUrl = 'https://widgets.bokun.io/online-sales/a7e844d2-8af2-49c6-a141-51834c1fed33/experience/725397'

export const day7Plan: DayPlan = {
  id: 'day-7',
  date: '7/30',
  title: 'Day 7｜住吉大社＋日本橋補買日',
  subtitle: '上午安靜參拜，下午回難波／日本橋慢慢補買。',
  suggestedDeparture: '09:30 從 OASIS 出發前往住吉大社；下午安排日本橋、Joshin 與千日前道具屋筋；晚上回住宿整理行李。',
  route: [
    { label: 'OASIS NANIWA', query: '1 Chome-3-18 Shioji Nishinari Ward Osaka' },
    { label: '天下茶屋站', query: '天下茶屋駅' },
    { label: '住吉大社', query: '2 Chome-9 Sumiyoshi Sumiyoshi Ward Osaka' },
    { label: '南海難波', query: '南海なんば駅' },
    { label: '日本橋電電街', query: 'Nipponbashi Denden Town Osaka' },
    { label: 'Joshin Super Kids Land', query: 'Joshin Super Kids Land Osaka' },
    { label: '千日前道具屋筋', query: '千日前道具屋筋商店街' },
    { label: '道頓堀', query: '道頓堀' },
    { label: 'OASIS NANIWA', query: '1 Chome-3-18 Shioji Nishinari Ward Osaka' }
  ],
  tickets: [
    { title: '千日前道具屋筋預約頁', detail: doguyasujiBookingUrl },
    { title: '購物退稅', detail: '需護照。' },
    { title: '藥妝折價券', detail: '如有藥妝折價券，先截圖放手機相簿。' }
  ],
  quickLinks: [
    { label: '⛩ 住吉大社', query: '2 Chome-9 Sumiyoshi Sumiyoshi Ward Osaka' },
    { label: '🧸 Joshin Super Kids Land', query: 'Joshin Super Kids Land Osaka' },
    { label: '🍳 千日前道具屋筋', query: '千日前道具屋筋商店街' },
    { label: '🎟 道具屋筋預約', query: doguyasujiBookingUrl },
    { label: '🌉 道頓堀', query: '道頓堀' },
    { label: '🏨 回OASIS', query: '1 Chome-3-18 Shioji Nishinari Ward Osaka' }
  ],
  outbound: [
    {
      text: 'OASIS NANIWA → 天下茶屋站 → 住吉大社站 → 住吉大社',
      lineName: '南海本線＋步行｜約30～45分鐘',
      lineColor: '#1f4fa3',
      direction: '從 OASIS 依 Google Maps 前往天下茶屋站，步行或短程移動約 10～15 分鐘；搭南海本線到住吉大社站約 5～8 分鐘，再步行到住吉大社。',
      from: { label: 'OASIS NANIWA', query: '1 Chome-3-18 Shioji Nishinari Ward Osaka' },
      to: { label: '住吉大社', query: '2 Chome-9 Sumiyoshi Sumiyoshi Ward Osaka' },
      exit: '上午先去住吉大社，避開午後高溫與商圈人潮。'
    },
    {
      text: '住吉大社 → 南海難波 → 日本橋電電街',
      lineName: '南海本線＋步行｜約30～45分鐘',
      lineColor: '#1f4fa3',
      direction: '住吉大社參拜後回南海線，搭往南海難波約 10～15 分鐘，再依 Google Maps 步行約 10～20 分鐘往日本橋電電街。',
      from: { label: '住吉大社', query: '2 Chome-9 Sumiyoshi Sumiyoshi Ward Osaka' },
      to: { label: '日本橋電電街', query: 'Nipponbashi Denden Town Osaka' },
      exit: '回難波後以日本橋／電電街為下午補買主軸。'
    },
    {
      text: '日本橋電電街 → Joshin Super Kids Land → 千日前道具屋筋',
      lineName: 'Google Maps 步行｜約15～30分鐘',
      lineColor: '#6b7280',
      direction: '日本橋、Joshin 與千日前道具屋筋屬同一區塊，依 Google Maps 步行串接，約 15～30 分鐘。',
      from: { label: '日本橋電電街', query: 'Nipponbashi Denden Town Osaka' },
      to: { label: '千日前道具屋筋', query: '千日前道具屋筋商店街' },
      exit: `千日前道具屋筋預約頁：${doguyasujiBookingUrl}`
    },
    {
      text: '千日前道具屋筋 → 道頓堀晚餐',
      lineName: 'Google Maps 步行｜約10～20分鐘',
      lineColor: '#6b7280',
      direction: '傍晚依 Google Maps 往道頓堀移動，約 10～20 分鐘，晚餐後不要再追加太多行程。',
      from: { label: '千日前道具屋筋', query: '千日前道具屋筋商店街' },
      to: { label: '道頓堀', query: '道頓堀' },
      exit: '人潮多時走外圍道路，避免擠在戎橋中央。'
    }
  ],
  inbound: [
    {
      text: '道頓堀 → なんば／四ツ橋側 → 岸里站 → OASIS NANIWA',
      lineName: 'Osaka Metro 四つ橋線｜約30～45分鐘',
      lineColor: '#0078ba',
      direction: '晚餐後依 Google Maps 前往四つ橋線可搭乘站點，搭往住之江公園方向到岸里站，再步行回 OASIS，約 30～45 分鐘。',
      from: { label: '道頓堀', query: '道頓堀' },
      to: { label: 'OASIS NANIWA', query: '1 Chome-3-18 Shioji Nishinari Ward Osaka' },
      exit: '購物袋多、孩子累或下雨時，直接短程計程車回 OASIS。回住宿後整理行李，為隔天機場日預留體力。'
    }
  ],
  note: 'Day 7 是大阪收尾日。上午住吉大社，下午日本橋與千日前道具屋筋，晚上道頓堀晚餐後回住宿整理行李；不要排太滿。'
}
