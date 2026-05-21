export type TransitStep = {
  text: string
  exit?: string
}

export type TicketInfo = {
  title: string
  detail?: string
}

export type QuickLink = {
  label: string
  query: string
}

export type DayPlan = {
  id: string
  date: string
  title: string
  subtitle: string
  suggestedDeparture: string
  route: string[]
  tickets: TicketInfo[]
  quickLinks: QuickLink[]
  outbound: TransitStep[]
  inbound: TransitStep[]
  note: string
}

export const dayPlans: DayPlan[] = [
  {
    id: 'day-0',
    date: '7/23',
    title: '台中 → 桃園機場過夜',
    subtitle: '前一天晚上出發，降低凌晨趕車壓力。',
    suggestedDeparture: '20:20 台中火車站附近集合；21:00 搭客運前往桃園機場。',
    route: ['台中火車站', '客運', '桃園機場 T2', '5F 美食街外圍休息'],
    tickets: [{ title: '護照、機票截圖、飯店訂單截圖先放手機相簿。' }],
    quickLinks: [
      { label: '🚌 台中火車站', query: '台中火車站' },
      { label: '✈ 桃園機場 T2', query: '桃園國際機場第二航廈' }
    ],
    outbound: [
      {
        text: '台中火車站／台中轉運站 → 國光或統聯客運 → 桃園機場第二航廈',
        exit: '抵達 T2 後依 5F 美食街指標。'
      }
    ],
    inbound: [{ text: '無回程；抵達機場後以休息為主。' }],
    note: '提早到站，確認護照、機票截圖、頸枕、外套與小孩零食。'
  },
  {
    id: 'day-1',
    date: '7/24',
    title: '神戶牛＋大阪天神祭宵宮',
    subtitle: '神戶進、大阪住，第一天不塞太滿。',
    suggestedDeparture: '04:20 桃園機場 T2 報到；10:00 抵達神戶機場。',
    route: ['桃園 T2', '神戶機場', '三宮', 'Mouriya 本店', 'APA 天滿橋', '天神祭宵宮'],
    tickets: [
      { title: '長榮 BR134', detail: '06:20 桃園 T2 → 10:00 神戶機場，PNR：FP5WJ4。' },
      { title: 'Trip.com 訂單', detail: '1616329870509999。' },
      { title: '機票總計', detail: 'TWD44,988；票價 TWD31,551；稅項及費用 TWD13,437。' }
    ],
    quickLinks: [
      { label: '🛬 神戶機場', query: '神戶機場' },
      { label: '🚃 三宮站', query: '三宮駅' },
      { label: '🥩 Mouriya 本店', query: 'Mouriya Honten Kobe' },
      { label: '🏨 APA 天滿橋', query: 'APA Hotel Osaka Temmabashi Ekimae' }
    ],
    outbound: [
      { text: '神戶機場站 → Port Liner → 三宮站', exit: '往三宮站西側／北野坂方向。' },
      { text: '三宮站 → JR／阪神進大阪市區 → Osaka Metro 谷町線 → 天滿橋站', exit: '天滿橋站 4 號出口較接近 APA 天滿橋方向。' }
    ],
    inbound: [
      { text: 'APA 天滿橋 → 步行 → 天滿橋大川河岸', exit: '往大川河岸方向，避開橋中央。' },
      { text: '天滿橋河岸 → 步行 → APA 天滿橋', exit: '回程建議沿河岸外側走。' }
    ],
    note: '神戶牛吃完先到大阪休息，晚上只感受祭典氣氛。'
  },
  {
    id: 'day-4',
    date: '7/27',
    title: 'USJ 環球影城',
    subtitle: '早上熱門、下午表演與輕鬆設施。',
    suggestedDeparture: '07:20 出門；07:30～08:00 到 USJ 門口排隊。',
    route: ['Liber Hotel', '環球城站／USJ 入口', '哈利波特／任天堂', '蘑菇餐廳', '水世界', 'CityWalk'],
    tickets: [
      { title: 'USJ 門票 QR Code', detail: '請先截圖。' },
      { title: 'Express Pass', detail: '入園前先確認指定時段。' },
      { title: '任天堂世界整理券', detail: '入園後依 App 顯示確認。' }
    ],
    quickLinks: [
      { label: '🎢 USJ 園區', query: 'Universal Studios Japan' },
      { label: '🚉 環球城站', query: 'ユニバーサルシティ駅' },
      { label: '🍄 任天堂世界', query: 'Super Nintendo World USJ' }
    ],
    outbound: [
      { text: 'Liber Hotel → 步行約 10～15 分鐘，或櫻島站搭 JR 夢咲線 1 站 → 環球城站', exit: '環球城站出站後穿過 Universal CityWalk，跟著 USJ 入口指標。' },
      { text: 'USJ 入口 → 園區步行 → 任天堂世界／哈利波特區', exit: '入園後不要先逛商店。' }
    ],
    inbound: [
      { text: 'USJ 入口 → Universal CityWalk → 步行或 JR 夢咲線 → Liber Hotel', exit: '出園後穿過 CityWalk，避開商店街停留。' }
    ],
    note: 'USJ 正門最近站是環球城站；櫻島站較適合 Liber Hotel。熱門設施排超過 40 分鐘就考慮放棄。'
  }
]
