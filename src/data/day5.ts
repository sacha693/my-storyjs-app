import type { DayPlan } from './types'

export const day5Plan: DayPlan = {
  id: 'day-5',
  date: '7/28',
  title: 'Day 5｜換飯店＋心齋橋購物恢復日',
  subtitle: 'USJ隔天恢復體力，慢慢逛。',
  suggestedDeparture: '10:30 退房移動到市區；14:00 前後安排心齋橋購物。',
  route: [
    { label: 'Liber/USJ區', query: 'Liber Hotel Osaka' },
    { label: 'OASIS NANIWA', query: 'OASIS NANIWA Osaka' },
    { label: '難波午餐', query: 'なんば ランチ 大阪' },
    { label: 'シモジマ', query: 'Shimojima Shinsaibashi' },
    { label: '道頓堀', query: '道頓堀' }
  ],
  tickets: [
    { title: 'OASIS NANIWA 住宿訂單', detail: '住宿訂單截圖。' },
    { title: '購物退稅', detail: '可能需要護照，請放隨身包。' }
  ],
  quickLinks: [
    { label: '🏨 OASIS NANIWA', query: 'OASIS NANIWA Osaka' },
    { label: '✏ シモジマ', query: 'Shimojima Shinsaibashi' },
    { label: '🥞 美津の大阪燒', query: 'Mizuno Okonomiyaki Osaka' }
  ],
  outbound: [
    {
      text: '櫻島站／環球城站 → 西九條站轉阪神難波線 → 大阪難波站',
      lineName: 'JR 夢咲線＋阪神難波線',
      lineColor: '#e87511',
      direction: '先搭 JR 夢咲線往西九條方向；在西九條站轉阪神難波線，搭往大阪難波／近鐵奈良方向',
      from: { label: '櫻島站／環球城站', query: '桜島駅' },
      to: { label: '大阪難波站', query: '大阪難波駅' },
      exit: '抵達大阪難波站後，依 OASIS NANIWA 地圖選擇最近出口；若先逛難波商圈，可往 14、15-B 方向。'
    },
    {
      text: '大阪難波／なんば站 → 心齋橋站',
      lineName: 'Osaka Metro 御堂筋線',
      lineColor: '#e5171f',
      direction: '從 Osaka Metro なんば站搭御堂筋線，往梅田／新大阪方向，1 站到心齋橋站',
      from: { label: '大阪難波／難波站', query: 'なんば駅' },
      to: { label: '心齋橋站', query: '心斎橋駅' },
      exit: '心齋橋站 5、6 號出口往心齋橋筋與シモジマ方向。'
    }
  ],
  inbound: [
    {
      text: '道頓堀 → OASIS NANIWA',
      lineName: '步行／Metro',
      lineColor: '#6b7280',
      direction: '往 OASIS NANIWA 方向',
      from: { label: '道頓堀', query: '道頓堀' },
      to: { label: 'OASIS NANIWA', query: 'OASIS NANIWA Osaka' },
      exit: '人潮多時走外圍道路，不要穿越最擠的戎橋。'
    }
  ],
  note: '購物要慢慢逛，咖啡休息不要省。'
}
