import type { DayPlan } from './types'

const gmailLink = 'https://mail.google.com/mail/#all/19d0bc83a8e341b3'

export const day8Plan: DayPlan = {
  id: 'day-8',
  date: '7/31',
  title: 'Day 8｜回程日',
  subtitle: '早上直接前往關西機場。',
  suggestedDeparture: '08:00 出發前往關西機場；09:00 前抵達 T1 最穩。',
  route: [
    { label: '飯店', query: 'OASIS NANIWA Osaka' },
    { label: '南海難波站', query: '南海なんば駅' },
    { label: '南海電鐵 Rapi:t／空港急行', query: '南海ラピート なんば 関西空港' },
    { label: '關西機場 T1', query: 'Kansai International Airport Terminal 1' }
  ],
  tickets: [
    { title: '長榮 BR177', detail: '11:10 關西機場 T1 → 13:05 桃園 T2，PNR：FP5WJ4。' },
    { title: 'Trip.com 訂單編號', detail: '1616329870509999。' },
    { title: '機票總計', detail: 'TWD44,988；票價 TWD31,551；稅項及費用 TWD13,437。來源：Trip.com 付款成功郵件。' },
    { title: 'Gmail 憑證信', detail: gmailLink }
  ],
  quickLinks: [
    { label: '🚆 難波站', query: 'Namba Station' },
    { label: '✈ 關西機場T1', query: 'Kansai International Airport Terminal 1' }
  ],
  outbound: [
    {
      text: 'OASIS NANIWA → 南海難波站',
      lineName: '步行／地下鐵銜接',
      lineColor: '#6b7280',
      direction: '往南海難波站 3F 改札口',
      from: { label: 'OASIS NANIWA', query: 'OASIS NANIWA Osaka' },
      to: { label: '南海難波站', query: '南海なんば駅' },
      exit: '往南海難波站 3F 改札口。'
    },
    {
      text: '南海難波站 → 關西機場站',
      lineName: '南海電鐵 Rapi:t／空港急行',
      lineColor: '#1f4fa3',
      direction: '往關西空港方向',
      from: { label: '南海難波站', query: '南海なんば駅' },
      to: { label: '關西機場站', query: '関西空港駅' },
      exit: '出閘後依 Terminal 1／國際線出發指標。'
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
  note: 'BR177 11:10 起飛，09:00 前到機場最穩。'
}
