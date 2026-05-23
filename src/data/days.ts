export type TransitPoint = {
  label: string
  query: string
}

export type TransitStep = {
  text: string
  lineName?: string
  lineColor?: string
  direction?: string
  from?: TransitPoint
  to?: TransitPoint
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
  route: TransitPoint[]
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
    route: [
      { label: '台中火車站', query: '台中火車站' },
      { label: '客運', query: '台中轉運站' },
      { label: '桃園機場 T2', query: '桃園國際機場第二航廈' },
      { label: '5F 美食街外圍休息', query: '桃園國際機場第二航廈 5F 美食街' }
    ],
    tickets: [{ title: '護照、機票截圖、飯店訂單截圖先放手機相簿。' }],
    quickLinks: [
      { label: '🚌 台中火車站', query: '台中火車站' },
      { label: '✈ 桃園機場 T2', query: '桃園國際機場第二航廈' }
    ],
    outbound: [
      {
        text: '台中火車站／台中轉運站 → 桃園機場第二航廈',
        lineName: '國光／統聯客運',
        lineColor: '#0068b7',
        direction: '往桃園國際機場第二航廈',
        from: { label: '台中轉運站', query: '台中轉運站' },
        to: { label: '桃園機場第二航廈', query: '桃園國際機場第二航廈' },
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
    route: [
      { label: '桃園 T2', query: '桃園國際機場第二航廈' },
      { label: '神戶機場', query: '神戶機場' },
      { label: '三宮', query: '三宮駅' },
      { label: 'Mouriya 本店', query: 'Mouriya Honten Kobe' },
      { label: 'APA 天滿橋', query: 'APA Hotel Osaka Temmabashi Ekimae' },
      { label: '天神祭宵宮', query: '大阪天神祭 天満橋' }
    ],
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
      {
        text: '神戶機場站 → 三宮站',
        lineName: 'Port Liner',
        lineColor: '#00a7db',
        direction: '往三宮站',
        from: { label: '神戶機場站', query: '神戸空港駅' },
        to: { label: '三宮站', query: '三宮駅' },
        exit: '往三宮站西側／北野坂方向。'
      },
      {
        text: '三宮站 → 大阪市區 → 天滿橋站',
        lineName: 'JR／阪神＋Osaka Metro 谷町線',
        lineColor: '#6a2c91',
        direction: '往大日／天滿橋方向',
        from: { label: '三宮站', query: '三宮駅' },
        to: { label: '天滿橋站', query: '天満橋駅' },
        exit: '天滿橋站 4 號出口較接近 APA 天滿橋方向。'
      }
    ],
    inbound: [
      {
        text: 'APA 天滿橋 → 天滿橋大川河岸',
        lineName: '步行',
        lineColor: '#6b7280',
        direction: '往大川河岸／天神祭會場',
        from: { label: 'APA 天滿橋', query: 'APA Hotel Osaka Temmabashi Ekimae' },
        to: { label: '天滿橋大川河岸', query: '天満橋 大川' },
        exit: '往大川河岸方向，避開橋中央。'
      },
      {
        text: '天滿橋河岸 → APA 天滿橋',
        lineName: '步行',
        lineColor: '#6b7280',
        direction: '往 APA Hotel Osaka Temmabashi Ekimae',
        from: { label: '天滿橋河岸', query: '天満橋 大川' },
        to: { label: 'APA 天滿橋', query: 'APA Hotel Osaka Temmabashi Ekimae' },
        exit: '回程建議沿河岸外側走。'
      }
    ],
    note: '神戶牛吃完先到大阪休息，晚上只感受祭典氣氛。'
  },
  {
    id: 'day-2',
    date: '7/25',
    title: '大阪市區經典日',
    subtitle: '以大阪城、道頓堀、心齋橋為主，保留親子彈性。',
    suggestedDeparture: '09:00 從 APA 天滿橋出發；上午先走大阪城，下午轉往心齋橋／道頓堀。',
    route: [
      { label: 'APA 天滿橋', query: 'APA Hotel Osaka Temmabashi Ekimae' },
      { label: '大阪城', query: '大阪城' },
      { label: '心齋橋', query: '心斎橋駅' },
      { label: '道頓堀', query: '道頓堀' },
      { label: 'APA 天滿橋', query: 'APA Hotel Osaka Temmabashi Ekimae' }
    ],
    tickets: [
      { title: '大阪市區交通', detail: '依當日搭乘次數評估是否使用一日券。' }
    ],
    quickLinks: [
      { label: '🏯 大阪城', query: '大阪城' },
      { label: '🛍️ 心齋橋', query: '心斎橋駅' },
      { label: '🐙 道頓堀', query: '道頓堀' }
    ],
    outbound: [
      {
        text: '天滿橋站 → 谷町四丁目站／大阪城周邊',
        lineName: 'Osaka Metro 谷町線',
        lineColor: '#6a2c91',
        direction: '往八尾南方向，依大阪城入口選擇谷町四丁目或天滿橋步行',
        from: { label: '天滿橋站', query: '天満橋駅' },
        to: { label: '大阪城', query: '大阪城' },
        exit: '谷町四丁目站 9 號出口或天滿橋站往大阪城公園方向。'
      },
      {
        text: '大阪城周邊 → 心齋橋／道頓堀',
        lineName: 'Osaka Metro 中央線＋御堂筋線',
        lineColor: '#e5171f',
        direction: '往本町轉御堂筋線，往難波／心齋橋方向',
        from: { label: '大阪城', query: '大阪城' },
        to: { label: '心齋橋站', query: '心斎橋駅' },
        exit: '心齋橋站 5 或 6 號出口接商店街較順。'
      }
    ],
    inbound: [
      {
        text: '難波／心齋橋 → 天滿橋 → APA 天滿橋',
        lineName: 'Osaka Metro 御堂筋線＋谷町線',
        lineColor: '#e5171f',
        direction: '往梅田方向轉谷町線，再往天滿橋方向',
        from: { label: '難波站', query: 'なんば駅' },
        to: { label: 'APA 天滿橋', query: 'APA Hotel Osaka Temmabashi Ekimae' },
        exit: '天滿橋站 4 號出口較接近飯店。'
      }
    ],
    note: '若小孩體力下降，大阪城可只走外圍與拍照，不一定進天守閣。'
  },
  {
    id: 'day-3',
    date: '7/26',
    title: '海遊館＋天保山',
    subtitle: '室內水族館為主，適合調整步調。',
    suggestedDeparture: '09:00 出發；10:00 前後抵達海遊館。',
    route: [
      { label: 'APA 天滿橋', query: 'APA Hotel Osaka Temmabashi Ekimae' },
      { label: '大阪港站', query: '大阪港駅' },
      { label: '海遊館', query: '海遊館' },
      { label: '天保山 Market Place', query: '天保山マーケットプレース' }
    ],
    tickets: [
      { title: '海遊館門票', detail: '建議事先截圖 QR Code 或購票憑證。' }
    ],
    quickLinks: [
      { label: '🐠 海遊館', query: '海遊館' },
      { label: '🚉 大阪港站', query: '大阪港駅' },
      { label: '🎡 天保山', query: '天保山マーケットプレース' }
    ],
    outbound: [
      {
        text: '天滿橋站 → 谷町四丁目／本町轉乘 → 大阪港站',
        lineName: '谷町線＋中央線',
        lineColor: '#019a66',
        direction: '中央線往大阪港／夢洲方向',
        from: { label: '天滿橋站', query: '天満橋駅' },
        to: { label: '大阪港站', query: '大阪港駅' },
        exit: '大阪港站 1 號出口往海遊館最順。'
      },
      {
        text: '大阪港站 → 步行 → 海遊館',
        lineName: '步行',
        lineColor: '#6b7280',
        direction: '往天保山／海遊館方向',
        from: { label: '大阪港站 1 號出口', query: '大阪港駅 1番出口' },
        to: { label: '海遊館', query: '海遊館' },
        exit: '跟著海遊館指標步行約 5～8 分鐘。'
      }
    ],
    inbound: [
      {
        text: '海遊館 → 大阪港站 → 天滿橋站',
        lineName: '中央線＋谷町線',
        lineColor: '#019a66',
        direction: '中央線往長田方向，轉谷町線回天滿橋',
        from: { label: '海遊館', query: '海遊館' },
        to: { label: 'APA 天滿橋', query: 'APA Hotel Osaka Temmabashi Ekimae' },
        exit: '回飯店從天滿橋站 4 號出口較順。'
      }
    ],
    note: '海遊館人潮多時先吃午餐或逛 Market Place，避開入口尖峰。'
  },
  {
    id: 'day-4',
    date: '7/27',
    title: 'USJ 環球影城',
    subtitle: '早上熱門、下午表演與輕鬆設施。',
    suggestedDeparture: '07:20 出門；07:30～08:00 到 USJ 門口排隊。',
    route: [
      { label: 'Liber Hotel', query: 'Liber Hotel Osaka' },
      { label: '環球城站／USJ 入口', query: 'ユニバーサルシティ駅' },
      { label: '哈利波特／任天堂', query: 'Super Nintendo World USJ' },
      { label: '蘑菇餐廳', query: 'Kinopio Cafe USJ' },
      { label: '水世界', query: 'WaterWorld Universal Studios Japan' },
      { label: 'CityWalk', query: 'Universal CityWalk Osaka' }
    ],
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
      {
        text: 'Liber Hotel → 櫻島站 → 環球城站',
        lineName: 'JR 夢咲線',
        lineColor: '#e87511',
        direction: '往西九條方向，搭 1 站到環球城站',
        from: { label: '櫻島站', query: '桜島駅' },
        to: { label: '環球城站', query: 'ユニバーサルシティ駅' },
        exit: '環球城站出站後穿過 Universal CityWalk，跟著 USJ 入口指標。'
      },
      {
        text: 'USJ 入口 → 園區步行 → 任天堂世界／哈利波特區',
        lineName: '園區步行',
        lineColor: '#16a34a',
        direction: '入園後先往熱門區域，不先逛商店',
        from: { label: 'USJ 入口', query: 'Universal Studios Japan entrance' },
        to: { label: '任天堂世界', query: 'Super Nintendo World USJ' },
        exit: '入園後不要先逛商店。'
      }
    ],
    inbound: [
      {
        text: 'USJ 入口 → Universal CityWalk → Liber Hotel',
        lineName: '步行／JR 夢咲線',
        lineColor: '#e87511',
        direction: '若搭車請往櫻島方向，從環球城站搭 1 站到櫻島站',
        from: { label: 'USJ 入口', query: 'Universal Studios Japan entrance' },
        to: { label: 'Liber Hotel', query: 'Liber Hotel Osaka' },
        exit: '出園後穿過 CityWalk，避開商店街停留。'
      }
    ],
    note: 'USJ 正門最近站是環球城站；櫻島站較適合 Liber Hotel。熱門設施排超過 40 分鐘就考慮放棄。'
  },
  {
    id: 'day-5',
    date: '7/28',
    title: '京都一日散策',
    subtitle: '以一主一副景點為原則，避免親子行程過滿。',
    suggestedDeparture: '08:00 出發；先到京都主景點，午後視體力調整。',
    route: [
      { label: '大阪住宿', query: '大阪駅' },
      { label: '京都站', query: '京都駅' },
      { label: '清水寺', query: '清水寺' },
      { label: '祇園', query: '祇園 京都' },
      { label: '大阪住宿', query: '大阪駅' }
    ],
    tickets: [
      { title: '京都交通', detail: '可用 ICOCA；巴士人多時優先地鐵與步行。' }
    ],
    quickLinks: [
      { label: '🚄 京都站', query: '京都駅' },
      { label: '⛩️ 清水寺', query: '清水寺' },
      { label: '🏮 祇園', query: '祇園 京都' }
    ],
    outbound: [
      {
        text: '大阪站／梅田 → 京都站',
        lineName: 'JR 京都線',
        lineColor: '#0072bc',
        direction: '往京都／野洲方向',
        from: { label: '大阪站', query: '大阪駅' },
        to: { label: '京都站', query: '京都駅' },
        exit: '京都站中央口或八條口依轉乘巴士／計程車調整。'
      },
      {
        text: '京都站 → 清水寺',
        lineName: '京都市巴士／計程車',
        lineColor: '#2e8b57',
        direction: '往五條坂／清水道方向',
        from: { label: '京都站', query: '京都駅' },
        to: { label: '清水寺', query: '清水寺' },
        exit: '五條坂或清水道下車後需上坡步行。'
      }
    ],
    inbound: [
      {
        text: '祇園／京都站 → 大阪站',
        lineName: 'JR 京都線',
        lineColor: '#0072bc',
        direction: '往大阪／姬路方向',
        from: { label: '京都站', query: '京都駅' },
        to: { label: '大阪站', query: '大阪駅' },
        exit: '回大阪後依住宿點轉乘。'
      }
    ],
    note: '京都日以清水寺或祇園擇重點即可，不建議再硬塞嵐山與伏見稻荷。'
  },
  {
    id: 'day-6',
    date: '7/29',
    title: '奈良小鹿日',
    subtitle: '以奈良公園、東大寺與商店街為主。',
    suggestedDeparture: '08:30 出發；上午抵達奈良公園。',
    route: [
      { label: '大阪難波', query: '大阪難波駅' },
      { label: '近鐵奈良', query: '近鉄奈良駅' },
      { label: '奈良公園', query: '奈良公園' },
      { label: '東大寺', query: '東大寺' },
      { label: '大阪難波', query: '大阪難波駅' }
    ],
    tickets: [
      { title: '近鐵車票／ICOCA', detail: '可用 ICOCA；若搭特急需另購特急券。' }
    ],
    quickLinks: [
      { label: '🦌 奈良公園', query: '奈良公園' },
      { label: '🏯 東大寺', query: '東大寺' },
      { label: '🚉 近鐵奈良站', query: '近鉄奈良駅' }
    ],
    outbound: [
      {
        text: '大阪難波站 → 近鐵奈良站',
        lineName: '近鐵奈良線',
        lineColor: '#d9232e',
        direction: '往近鐵奈良方向',
        from: { label: '大阪難波站', query: '大阪難波駅' },
        to: { label: '近鐵奈良站', query: '近鉄奈良駅' },
        exit: '近鐵奈良站 2 或 3 號出口往奈良公園方向。'
      },
      {
        text: '近鐵奈良站 → 奈良公園／東大寺',
        lineName: '步行',
        lineColor: '#6b7280',
        direction: '往奈良公園與東大寺方向',
        from: { label: '近鐵奈良站', query: '近鉄奈良駅' },
        to: { label: '奈良公園', query: '奈良公園' },
        exit: '沿登大路步行，注意小鹿與車流。'
      }
    ],
    inbound: [
      {
        text: '近鐵奈良站 → 大阪難波站',
        lineName: '近鐵奈良線',
        lineColor: '#d9232e',
        direction: '往大阪難波方向',
        from: { label: '近鐵奈良站', query: '近鉄奈良駅' },
        to: { label: '大阪難波站', query: '大阪難波駅' },
        exit: '回難波後依住宿點轉乘。'
      }
    ],
    note: '餵鹿時餅乾拿好，小孩不要奔跑或把餅乾放太低。'
  },
  {
    id: 'day-7',
    date: '7/30',
    title: '大阪購物與彈性補完日',
    subtitle: '保留購物、補買伴手禮與前幾天未完成景點。',
    suggestedDeparture: '09:30 輕鬆出門；依體力安排梅田、難波或臨空城。',
    route: [
      { label: '大阪住宿', query: '大阪駅' },
      { label: '梅田', query: '梅田駅' },
      { label: '難波', query: 'なんば駅' },
      { label: '心齋橋', query: '心斎橋駅' }
    ],
    tickets: [
      { title: '購物日提醒', detail: '保留護照退稅，整理行李重量。' }
    ],
    quickLinks: [
      { label: '🛍️ 梅田', query: '梅田駅' },
      { label: '🛒 難波', query: 'なんば駅' },
      { label: '🎁 心齋橋', query: '心斎橋筋商店街' }
    ],
    outbound: [
      {
        text: '住宿點 → 梅田／難波／心齋橋',
        lineName: 'Osaka Metro／JR',
        lineColor: '#e5171f',
        direction: '依當天目的地選擇最近路線',
        from: { label: '大阪住宿', query: '大阪駅' },
        to: { label: '心齋橋', query: '心斎橋駅' },
        exit: '心齋橋站 5 或 6 號出口接商店街；難波站依商場指標。'
      }
    ],
    inbound: [
      {
        text: '購物區 → 住宿點',
        lineName: 'Osaka Metro／JR',
        lineColor: '#e5171f',
        direction: '回住宿點方向，避開末班車前尖峰',
        from: { label: '心齋橋', query: '心斎橋駅' },
        to: { label: '大阪住宿', query: '大阪駅' },
        exit: '若行李多，優先找有電梯的出口。'
      }
    ],
    note: '這天不要排太滿，作為補休與補買日。'
  },
  {
    id: 'day-8',
    date: '7/31',
    title: '搭上 Rapi:t，把夏日關西收進行李',
    subtitle: '回程日以簡單俐落為主。',
    suggestedDeparture: '07:30 從住宿出發；預留機場報到、退稅與早餐時間。',
    route: [
      { label: '住宿點', query: '大阪駅' },
      { label: '難波站', query: 'なんば駅' },
      { label: '南海難波站', query: '南海なんば駅' },
      { label: '關西機場', query: '関西国際空港' }
    ],
    tickets: [
      { title: '南海 Rapi:t 車票', detail: '請先確認班次與座位，截圖 QR Code。' },
      { title: '回程機票', detail: '請確認航廈、報到櫃台與行李重量。' }
    ],
    quickLinks: [
      { label: '🚄 南海難波', query: '南海なんば駅' },
      { label: '✈ 關西機場', query: '関西国際空港' },
      { label: '🎫 Rapi:t', query: '南海ラピート なんば 関西空港' }
    ],
    outbound: [
      {
        text: '住宿點 → 難波／南海難波站',
        lineName: 'Osaka Metro／JR',
        lineColor: '#e5171f',
        direction: '往難波方向，轉南海電鐵',
        from: { label: '住宿點', query: '大阪駅' },
        to: { label: '南海難波站', query: '南海なんば駅' },
        exit: '抵達難波後跟著南海電鐵／Nankai 指標走。'
      },
      {
        text: '南海難波站 → 關西機場站',
        lineName: '南海 Rapi:t',
        lineColor: '#1f4fa3',
        direction: '往關西空港方向',
        from: { label: '南海難波站', query: '南海なんば駅' },
        to: { label: '關西機場站', query: '関西空港駅' },
        exit: '關西機場站出站後依航廈與航空公司櫃台指標。'
      }
    ],
    inbound: [{ text: '回台灣，無日本市區回程。' }],
    note: '回程日不要安排購物景點，保留行李整理、退稅與報到時間。'
  }
]
