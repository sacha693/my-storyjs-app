import type { DayPlan } from './days'

export const day6Plan: DayPlan = {
  id: 'day-6',
  date: '7/29',
  title: 'Day 6｜京都 teamLab',
  subtitle: '一主一副，看光影、走河邊，不暴走京都。',
  suggestedDeparture: '10:00 出發前往京都；11:30 京都車站午餐；13:00 teamLab 入場。',
  route: [
    { label: '大阪', query: '大阪駅' },
    { label: '京都車站', query: 'Kyoto Station' },
    { label: '拉麵小路', query: 'Kyoto Ramen Street' },
    { label: 'teamLab Biovortex Kyoto', query: 'teamLab Biovortex Kyoto' },
    { label: '鴨川或祇園', query: 'Kamo River Kyoto' },
    { label: '回大阪', query: '大阪駅' }
  ],
  tickets: [
    { title: 'Klook 訂單', detail: 'TXM612450。' },
    { title: 'teamLab Biovortex Kyoto', detail: '入場時間：2026-07-29 13:00。' },
    { title: '票種', detail: '成人1、兒童1、傷殘人士優惠2；不可取消、退款或更改訂單。' }
  ],
  quickLinks: [
    { label: '🚉 京都車站', query: 'Kyoto Station' },
    { label: '🍜 京都拉麵小路', query: 'Kyoto Ramen Street' },
    { label: '✨ teamLab', query: 'teamLab Biovortex Kyoto' },
    { label: '🌿 鴨川', query: 'Kamo River Kyoto' },
    { label: '🏨 回OASIS', query: 'OASIS NANIWA Osaka' }
  ],
  outbound: [
    {
      text: '大阪站 → 京都站',
      lineName: 'JR 京都線',
      lineColor: '#0072bc',
      direction: '從大阪站搭 JR 京都線新快速／快速，往京都方向，到京都站下車。',
      from: { label: '大阪站', query: '大阪駅' },
      to: { label: '京都站', query: 'Kyoto Station' },
      exit: '京都站中央口適合車站午餐；前往 teamLab 建議往八條東口／東南側方向移動。'
    },
    {
      text: '京都站 → teamLab Biovortex Kyoto',
      lineName: '步行或短程計程車',
      lineColor: '#6b7280',
      direction: '從京都站八條東口出站，往東南側方向前往；若天氣熱、帶小孩或時間接近 13:00，建議改搭短程計程車。',
      from: { label: '京都站', query: 'Kyoto Station' },
      to: { label: 'teamLab Biovortex Kyoto', query: 'teamLab Biovortex Kyoto' },
      exit: '京都站八條東口；建議預留 20～30 分鐘緩衝。'
    },
    {
      text: 'teamLab Biovortex Kyoto → 祇園四条站／鴨川',
      lineName: '計程車／公車／京阪線銜接',
      lineColor: '#009688',
      direction: 'teamLab 結束後前往祇園四条或鴨川，親子行程建議優先用計程車；若搭大眾交通，依現場最近站點銜接京阪線往祇園四条方向。',
      from: { label: 'teamLab Biovortex Kyoto', query: 'teamLab Biovortex Kyoto' },
      to: { label: '祇園四条站／鴨川', query: '祇園四条駅 Kamo River Kyoto' },
      exit: '祇園四条站 6、7 號出口可往鴨川與祇園方向。'
    }
  ],
  inbound: [
    {
      text: '祇園四条／京都站 → 大阪站／難波',
      lineName: '京阪＋Osaka Metro／阪急／JR 京都線',
      lineColor: '#0072bc',
      direction: '若從祇園四条出發，可搭京阪往大阪方向，再依住宿位置轉 Metro 回難波；若先回京都站，則搭 JR 京都線往大阪方向。',
      from: { label: '祇園四条／京都站', query: '祇園四条駅 Kyoto Station' },
      to: { label: '大阪站／難波', query: '大阪駅 なんば駅' },
      exit: '人多或孩子累時，建議從祇園四条直接搭計程車回京都站，再搭 JR 回大阪，流程最單純。'
    }
  ],
  note: 'teamLab 入場時間 13:00，鴨川/祇園二選一。'
}
