import type { DayPlan } from './types'

const gmailLink = 'https://mail.google.com/mail/#all/19d0bc83a8e341b3'

export const day8Plan: DayPlan = {
  id: 'day-8',
  date: '7/31',
  title: 'Day 8｜回程日',
  subtitle: '行李優先，從天下茶屋搭南海前往關西機場。',
  suggestedDeparture: '07:30 從 OASIS 出發；優先搭計程車到天下茶屋站；目標 09:00 前抵達關西機場 T1。',
  route: [
    { label: 'OASIS NANIWA', query: '1 Chome-3-18 Shioji Nishinari Ward Osaka' },
    { label: '天下茶屋站', query: '天下茶屋駅' },
    { label: '南海電鐵 Rapi:t／空港急行', query: '南海 天下茶屋 関西空港' },
    { label: '關西機場 T1', query: 'Kansai International Airport Terminal 1' }
  ],
  tickets: [
    { title: '長榮 BR177', detail: '11:10 關西機場 T1 → 13:05 桃園 T2，PNR：FP5WJ4。' },
    { title: 'Trip.com 訂單編號', detail: '1616329870509999。' },
    { title: '機票總計', detail: 'TWD44,988；票價 TWD31,551；稅項及費用 TWD13,437。來源：Trip.com 付款成功郵件。' },
    { title: 'Gmail 憑證信', detail: gmailLink },
    { title: '南海車次提醒', detail: 'Rapi:t／空港急行請以當日 Google Maps 與南海時刻為準；確認車次是否停靠天下茶屋。' }
  ],
  quickLinks: [
    { label: '🏨 OASIS NANIWA', query: '1 Chome-3-18 Shioji Nishinari Ward Osaka' },
    { label: '🚉 天下茶屋站', query: '天下茶屋駅' },
    { label: '🚆 南海到關西機場', query: '南海 天下茶屋 関西空港' },
    { label: '✈ 關西機場T1', query: 'Kansai International Airport Terminal 1' }
  ],
  outbound: [
    {
      text: 'OASIS NANIWA → 天下茶屋站',
      lineName: '短程計程車',
      lineColor: '#6b7280',
      direction: '回程日有行李，建議直接短程計程車到天下茶屋站，避免拖行李進難波地下街。',
      from: { label: 'OASIS NANIWA', query: '1 Chome-3-18 Shioji Nishinari Ward Osaka' },
      to: { label: '天下茶屋站', query: '天下茶屋駅' },
      exit: '若想搭地鐵，也可依 Google Maps 從岸里／天下茶屋銜接；行李多時以計程車最穩。'
    },
    {
      text: '天下茶屋站 → 關西機場站',
      lineName: '南海電鐵 Rapi:t／空港急行',
      lineColor: '#1f4fa3',
      direction: '從天下茶屋搭南海往關西空港方向。優先選 Rapi:t 或 Google Maps 推薦車次，並確認該班車停靠天下茶屋。',
      from: { label: '天下茶屋站', query: '天下茶屋駅' },
      to: { label: '關西機場站', query: '関西空港駅' },
      exit: '出閘後依 Terminal 1／國際線出發指標；目標 09:00 前抵達機場。'
    }
  ],
  inbound: [
    {
      text: '關西機場 T1 → 桃園機場 T2',
      lineName: '長榮航空 BR177',
      lineColor: '#00843d',
      direction: '往桃園機場 T2',
      from: { label: '關西機場 T1', query: 'Kansai International Airport Terminal 1' },
      to: { label: '桃園機場 T2', query: '桃園國際機場第二航廈' },
      exit: '抵台後依入境／行李轉盤指標。'
    }
  ],
  note: 'BR177 11:10 起飛，建議 09:00 前到關西機場 T1。回程日以行李與準點為優先，避免拖行李穿越難波地下街。'
}
