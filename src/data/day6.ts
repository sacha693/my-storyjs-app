import type { DayPlan } from './types'

export const day6Plan: DayPlan = {
  id: 'day-6',
  date: '7/29',
  title: 'Day 6｜京都 teamLab',
  subtitle: '大阪往返京都，一主一副，看光影、走河邊，不暴走。',
  suggestedDeparture: '10:00 從 OASIS 出發；11:30 京都車站午餐；13:00 teamLab 入場。',
  themeColor: '#5f7f3a',
  route: [
    { label: 'OASIS NANIWA', query: '1 Chome-3-18 Shioji Nishinari Ward Osaka' },
    { label: '岸里站', query: '岸里駅' },
    { label: '大阪站', query: '大阪駅' },
    { label: '京都車站', query: 'Kyoto Station' },
    { label: '拉麵小路', query: 'Kyoto Ramen Street' },
    { label: 'teamLab Biovortex Kyoto', query: 'teamLab Biovortex Kyoto' },
    { label: '祇園四条／鴨川', query: '祇園四条駅 Kamo River Kyoto' },
    { label: 'OASIS NANIWA', query: '1 Chome-3-18 Shioji Nishinari Ward Osaka' }
  ],
  tickets: [
    { title: 'Klook 訂單', detail: 'TXM612450。' },
    { title: 'teamLab Biovortex Kyoto', detail: '入場時間：2026-07-29 13:00。' },
    { title: '票種', detail: '成人1、兒童1、傷殘人士優惠2；不可取消、退款或更改訂單。' }
  ],
  quickLinks: [
    { label: '🚇 岸里站', query: '岸里駅' },
    { label: '🚉 京都車站', query: 'Kyoto Station' },
    { label: '🍜 京都拉麵小路', query: 'Kyoto Ramen Street' },
    { label: '✨ teamLab', query: 'teamLab Biovortex Kyoto' },
    { label: '🌿 鴨川／祇園', query: '祇園四条駅 Kamo River Kyoto' },
    { label: '🏨 回OASIS', query: '1 Chome-3-18 Shioji Nishinari Ward Osaka' }
  ],
  outbound: [
    {
      text: 'OASIS NANIWA → 岸里站 → 西梅田／大阪站 → 京都站',
      lineName: 'Osaka Metro 四つ橋線＋JR 京都線｜約80～105分鐘',
      lineColor: '#0078ba',
      direction: '從 OASIS 步行到岸里站約 5～8 分鐘，搭四つ橋線往西梅田方向約 15～20 分鐘，步行銜接大阪站，再搭 JR 京都線新快速／快速往京都，整段約 80～105 分鐘。',
      from: { label: '岸里站', query: '岸里駅' },
      to: { label: '京都站', query: 'Kyoto Station' },
      exit: '大阪站轉乘時依 Google Maps 與站內指標前往 JR 京都線月台；京都站中央口適合午餐，前往 teamLab 再往八條東口／東南側方向。'
    },
    {
      text: '京都站 → teamLab Biovortex Kyoto',
      lineName: '京都市巴士／計程車｜約15～30分鐘',
      lineColor: '#6b7280',
      direction: '午餐後依 Google Maps 前往 teamLab，巴士或步行銜接約 20～30 分鐘；若巴士人多、天氣熱或接近 13:00，短程計程車約 10～15 分鐘。',
      from: { label: '京都站', query: 'Kyoto Station' },
      to: { label: 'teamLab Biovortex Kyoto', query: 'teamLab Biovortex Kyoto' },
      exit: '請預留 20～30 分鐘緩衝；13:00 入場不要壓線。'
    },
    {
      text: 'teamLab Biovortex Kyoto → 祇園四条／鴨川',
      lineName: '計程車優先／巴士備案｜約15～35分鐘',
      lineColor: '#009688',
      direction: 'teamLab 結束後若孩子累或天氣熱，優先短程計程車前往祇園四条或鴨川，約 15～25 分鐘；體力足夠時依 Google Maps 搭巴士約 25～35 分鐘。',
      from: { label: 'teamLab Biovortex Kyoto', query: 'teamLab Biovortex Kyoto' },
      to: { label: '祇園四条／鴨川', query: '祇園四条駅 Kamo River Kyoto' },
      exit: '祇園四条站 6、7 號出口可往鴨川與祇園方向；下午不要再追加太多景點。'
    }
  ],
  inbound: [
    {
      text: '祇園四条 → 淀屋橋／北浜 → 四つ橋線 → 岸里站 → OASIS NANIWA',
      lineName: '京阪電車＋Osaka Metro｜約80～110分鐘',
      lineColor: '#0072bc',
      direction: '從祇園四条搭京阪往大阪方向，依 Google Maps 於淀屋橋／北浜銜接 Osaka Metro，再轉回四つ橋線到岸里站，整段約 80～110 分鐘。',
      from: { label: '祇園四条站', query: '祇園四条駅' },
      to: { label: '岸里站', query: '岸里駅' },
      exit: '晚上孩子累時，不必折返回京都站；若人潮或體力狀況不佳，可改計程車回京都站再搭 JR，或直接依 Google Maps 選最少轉乘路線。'
    }
  ],
  note: 'Day 6 是京都體力管理日：teamLab 是主軸，鴨川／祇園只保留氛圍散步。京都市巴士暑假可能擁擠，teamLab 後往祇園可優先計程車。'
}
