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

const gmailLink = 'https://mail.google.com/mail/#all/19d0bc83a8e341b3'

export const dayPlans: DayPlan[] = [
  {
    id: 'day-0',
    date: '7/23',
    title: 'Day 0｜台中 → 桃園機場過夜',
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
      { label: '✈ 桃園機場T2', query: '桃園國際機場第二航廈' }
    ],
    outbound: [
      {
        text: '台中火車站／台中轉運站 → 桃園機場第二航廈',
        lineName: '國光／統聯客運',
        lineColor: '#0068b7',
        direction: '往桃園機場第二航廈',
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
    title: 'Day 1｜神戶牛＋大阪天神祭宵宮',
    subtitle: '神戶進、大阪住，第一天不塞太滿。',
    suggestedDeparture: '04:20 桃園機場 T2 報到；10:00 抵達神戶機場；15:30 前後到 APA 天滿橋休息。',
    route: [
      { label: '桃園 T2', query: '桃園國際機場第二航廈' },
      { label: '神戶機場', query: '神戶機場' },
      { label: '三宮', query: '三宮駅' },
      { label: 'Mouriya 本店', query: 'Mouriya Honten Kobe' },
      { label: 'APA 天滿橋', query: 'APA Hotel Osaka Temmabashi Ekimae' },
      { label: '天神祭宵宮', query: '天満橋 大川 大阪 天神祭' }
    ],
    tickets: [
      { title: '長榮 BR134', detail: '06:20 桃園 T2 → 10:00 神戶機場，PNR：FP5WJ4。' },
      { title: 'Trip.com 訂單編號', detail: '1616329870509999。' },
      { title: '機票總計', detail: 'TWD44,988；票價 TWD31,551；稅項及費用 TWD13,437。來源：Trip.com 付款成功郵件。' },
      { title: 'Mouriya 本店神戶牛午餐', detail: '訂位資訊請先截圖。' },
      { title: 'Gmail 憑證信', detail: gmailLink }
    ],
    quickLinks: [
      { label: '🛬 神戶機場', query: '神戶機場' },
      { label: '🚃 三宮站', query: '三宮駅' },
      { label: '🥩 Mouriya本店', query: 'Mouriya Honten Kobe' },
      { label: '🏨 APA天滿橋', query: 'APA Hotel Osaka Temmabashi Ekimae' },
      { label: '🎆 天神祭宵宮', query: '天満橋 大川 大阪 天神祭' }
    ],
    outbound: [
      {
        text: '神戶機場站 → 三宮站',
        lineName: 'Port Liner',
        lineColor: '#00a7db',
        direction: '往三宮站',
        from: { label: '神戶機場站', query: '神戸空港駅' },
        to: { label: '三宮站', query: '三宮駅' },
        exit: '往三宮站西側／北野坂方向，步行到 Mouriya 本店較順。'
      },
      {
        text: '三宮站 → 大阪市區 → 天滿橋站',
        lineName: 'JR／阪神＋Osaka Metro 谷町線',
        lineColor: '#6a2c91',
        direction: '往大阪市區後轉谷町線天滿橋方向',
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
        direction: '回 APA Hotel Osaka Temmabashi Ekimae',
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
    title: 'Day 2｜童書之森＋天神祭本宮',
    subtitle: '白天室內輕鬆，晚上看祭典。',
    suggestedDeparture: '09:10 出門去童書之森；17:30 出門前往天神祭觀賞點。',
    route: [
      { label: 'APA天滿橋', query: 'APA Hotel Osaka Temmabashi Ekimae' },
      { label: '童書之森中之島', query: 'こども本の森 中之島' },
      { label: '北浜午餐', query: '北浜 カフェ 大阪' },
      { label: '飯店午休', query: 'APA Hotel Osaka Temmabashi Ekimae' },
      { label: '天滿橋觀賞點', query: '34.6923,135.5200' }
    ],
    tickets: [
      { title: '童書之森預約', detail: '若童書之森需預約，請將預約畫面截圖。' },
      { title: '祭典觀賞點', detail: '祭典日不需票券，但建議先保存觀賞點地圖。' }
    ],
    quickLinks: [
      { label: '🌿 童書之森', query: 'こども本の森 中之島' },
      { label: '☕ 北浜咖啡午餐', query: '北浜 カフェ 大阪' },
      { label: '🏨 回APA飯店', query: 'APA Hotel Osaka Temmabashi Ekimae' },
      { label: '🎆 親子觀賞點', query: '34.6923,135.5200' }
    ],
    outbound: [
      {
        text: '天滿橋站 → なにわ橋站 → 童書之森中之島',
        lineName: '京阪中之島線／步行銜接',
        lineColor: '#0072bc',
        direction: '往中之島／なにわ橋方向',
        from: { label: '天滿橋站', query: '天満橋駅' },
        to: { label: 'なにわ橋站', query: 'なにわ橋駅' },
        exit: 'なにわ橋站 1 號出口，往中之島公園與童書之森。'
      },
      {
        text: '童書之森中之島 → 北浜咖啡區',
        lineName: '步行',
        lineColor: '#6b7280',
        direction: '往北浜站、土佐堀川河岸咖啡區',
        from: { label: '童書之森中之島', query: 'こども本の森 中之島' },
        to: { label: '北浜咖啡區', query: '北浜 カフェ 大阪' },
        exit: '往北浜站、土佐堀川河岸咖啡區。'
      }
    ],
    inbound: [
      {
        text: '北浜 → APA 天滿橋',
        lineName: '京阪／步行',
        lineColor: '#0072bc',
        direction: '往天滿橋方向',
        from: { label: '北浜', query: '北浜駅 大阪' },
        to: { label: 'APA 天滿橋', query: 'APA Hotel Osaka Temmabashi Ekimae' },
        exit: '天滿橋站 4 號出口或依飯店地圖。'
      },
      {
        text: '天滿橋河岸 → APA 天滿橋',
        lineName: '步行',
        lineColor: '#6b7280',
        direction: '沿南側河岸外圍回飯店',
        from: { label: '天滿橋河岸', query: '天満橋 大川' },
        to: { label: 'APA 天滿橋', query: 'APA Hotel Osaka Temmabashi Ekimae' },
        exit: '沿南側河岸外圍回飯店。'
      }
    ],
    note: '親子版不擠橋中央。帶小風扇、水、濕紙巾。'
  },
  {
    id: 'day-3',
    date: '7/26',
    title: 'Day 3｜海遊館主軸＋移動到 USJ 區',
    subtitle: '一個主景點，不消耗隔天 USJ 體力。',
    suggestedDeparture: '09:30 退房出門；10:30 抵達海遊館較剛好；15:30 前後到 Liber Hotel。',
    route: [
      { label: '天滿橋', query: '天満橋駅' },
      { label: '海遊館', query: 'Osaka Aquarium Kaiyukan' },
      { label: '天保山午餐', query: 'Tempozan Marketplace' },
      { label: 'Liber Hotel', query: 'Liber Hotel Osaka' }
    ],
    tickets: [
      { title: '海遊館票券', detail: '海遊館票券／QR Code 先截圖。' },
      { title: 'Liber Hotel', detail: '住宿訂單截圖。' }
    ],
    quickLinks: [
      { label: '🐠 大阪海遊館', query: 'Osaka Aquarium Kaiyukan' },
      { label: '🍽 天保山午餐', query: 'Tempozan Marketplace' },
      { label: '🏨 Liber Hotel', query: 'Liber Hotel Osaka' },
      { label: '🍜 CityWalk晚餐', query: 'Universal CityWalk Osaka' }
    ],
    outbound: [
      {
        text: '天滿橋站 → 大阪港站 → 海遊館',
        lineName: 'Osaka Metro 谷町線＋中央線',
        lineColor: '#019a66',
        direction: '中央線往大阪港／夢洲方向',
        from: { label: '天滿橋站', query: '天満橋駅' },
        to: { label: '大阪港站', query: '大阪港駅' },
        exit: '大阪港站 1 號出口，最接近海遊館與天保山 Market Place。'
      },
      {
        text: '大阪港站 → 弁天町 → 西九條 → 櫻島站 → Liber Hotel',
        lineName: '中央線＋JR 大阪環狀線＋JR 夢咲線',
        lineColor: '#e87511',
        direction: '往櫻島方向',
        from: { label: '大阪港站', query: '大阪港駅' },
        to: { label: '櫻島站', query: '桜島駅' },
        exit: '櫻島站出站後依 Liber Hotel 指標步行。'
      }
    ],
    inbound: [
      {
        text: 'Liber Hotel → Universal CityWalk',
        lineName: '步行或 JR 夢咲線',
        lineColor: '#e87511',
        direction: '若要進 USJ 正門請以環球城站為主',
        from: { label: 'Liber Hotel', query: 'Liber Hotel Osaka' },
        to: { label: 'Universal CityWalk', query: 'Universal CityWalk Osaka' },
        exit: '若要進 USJ 正門請以環球城站為主。'
      },
      {
        text: 'Universal CityWalk → Liber Hotel',
        lineName: '步行／JR',
        lineColor: '#6b7280',
        direction: '晚餐後直接回飯店',
        from: { label: 'Universal CityWalk', query: 'Universal CityWalk Osaka' },
        to: { label: 'Liber Hotel', query: 'Liber Hotel Osaka' },
        exit: '晚餐後直接回飯店。'
      }
    ],
    note: '下午回飯店休息，為隔天 USJ 存體力。'
  },
  {
    id: 'day-4',
    date: '7/27',
    title: 'Day 4｜USJ 環球影城',
    subtitle: '早上熱門、下午表演與輕鬆設施。',
    suggestedDeparture: '07:20 出門；07:30～08:00 到 USJ 門口排隊。',
    route: [
      { label: 'Liber Hotel', query: 'Liber Hotel Osaka' },
      { label: '環球城站／USJ入口', query: 'ユニバーサルシティ駅' },
      { label: '哈利波特/任天堂', query: 'Super Nintendo World USJ' },
      { label: '蘑菇餐廳', query: 'Kinopio Cafe USJ' },
      { label: '水世界', query: 'WaterWorld Universal Studios Japan' },
      { label: 'CityWalk', query: 'Universal CityWalk Osaka' }
    ],
    tickets: [
      { title: 'USJ 門票 QR Code', detail: '請先截圖。' },
      { title: 'Express Pass', detail: '截圖，入園前先確認指定時段。' },
      { title: '任天堂世界整理券', detail: '入園後依 App 顯示確認。' }
    ],
    quickLinks: [
      { label: '🎢 USJ園區', query: 'Universal Studios Japan' },
      { label: '🚉 環球城站', query: 'ユニバーサルシティ駅' },
      { label: '🍄 任天堂世界', query: 'Super Nintendo World USJ' },
      { label: '🎈 小小兵樂園', query: 'Minion Park USJ' }
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
        text: 'USJ入口 → 園區步行 → 任天堂世界／哈利波特區',
        lineName: '園區步行',
        lineColor: '#16a34a',
        direction: '入園後不要先逛商店',
        from: { label: 'USJ入口', query: 'Universal Studios Japan entrance' },
        to: { label: '任天堂世界', query: 'Super Nintendo World USJ' },
        exit: '最快方向：入園後不要先逛商店。'
      }
    ],
    inbound: [
      {
        text: 'USJ入口 → Universal CityWalk → Liber Hotel',
        lineName: '步行或 JR 夢咲線',
        lineColor: '#e87511',
        direction: '出園後穿過 CityWalk，避開商店街停留',
        from: { label: 'USJ入口', query: 'Universal Studios Japan entrance' },
        to: { label: 'Liber Hotel', query: 'Liber Hotel Osaka' },
        exit: '出園後穿過 CityWalk，避開商店街停留。'
      }
    ],
    note: 'USJ 正門最近站是環球城站；櫻島站較適合 Liber Hotel。熱門設施排超過40分鐘就考慮放棄。'
  },
  {
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
        text: '櫻島站／環球城站 → 西九條站 → 大阪難波站',
        lineName: 'JR 夢咲線＋阪神難波線',
        lineColor: '#e87511',
        direction: '往西九條，再往大阪難波方向',
        from: { label: '櫻島站／環球城站', query: '桜島駅' },
        to: { label: '大阪難波站', query: '大阪難波駅' },
        exit: '往 OASIS NANIWA 依地圖出口；難波商圈可用 14、15-B 方向。'
      },
      {
        text: '大阪難波／難波站 → 心齋橋站',
        lineName: 'Osaka Metro 御堂筋線',
        lineColor: '#e5171f',
        direction: '往心齋橋／梅田方向',
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
  },
  {
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
        direction: '往京都方向',
        from: { label: '大阪站', query: '大阪駅' },
        to: { label: '京都站', query: 'Kyoto Station' },
        exit: '京都站中央口適合車站用餐；前往 teamLab 建議八條東口／東南側方向。'
      },
      {
        text: '京都站 → teamLab Biovortex Kyoto',
        lineName: '步行或短程計程車',
        lineColor: '#6b7280',
        direction: '往京都站八條東口／東南側方向',
        from: { label: '京都站', query: 'Kyoto Station' },
        to: { label: 'teamLab Biovortex Kyoto', query: 'teamLab Biovortex Kyoto' },
        exit: '京都站八條東口。'
      },
      {
        text: '京都站／teamLab → 祇園四条站／鴨川',
        lineName: '公車／計程車／京阪線',
        lineColor: '#009688',
        direction: '往祇園四条／鴨川方向',
        from: { label: 'teamLab Biovortex Kyoto', query: 'teamLab Biovortex Kyoto' },
        to: { label: '祇園四条站／鴨川', query: '祇園四条駅 Kamo River Kyoto' },
        exit: '祇園四条站 6、7 號出口。'
      }
    ],
    inbound: [
      {
        text: '祇園四条／京都站 → 大阪站／難波',
        lineName: 'JR 京都線或阪急／京阪',
        lineColor: '#0072bc',
        direction: '往大阪方向',
        from: { label: '京都站', query: 'Kyoto Station' },
        to: { label: '大阪站／難波', query: '大阪駅' },
        exit: '京都站回程依 JR 中央口；人多時用計程車回京都站較省力。'
      }
    ],
    note: 'teamLab 入場時間 13:00，鴨川/祇園二選一。'
  },
  {
    id: 'day-7',
    date: '7/30',
    title: 'Day 7｜自由購物＋補買日',
    subtitle: '整天保留彈性。',
    suggestedDeparture: '睡晚一點，建議 10:30 後再出門；下午保留整理行李時間。',
    route: [
      { label: 'OASIS', query: 'OASIS NANIWA Osaka' },
      { label: 'Joshin Super Kids Land', query: 'Joshin Super Kids Land Osaka' },
      { label: '黑門市場／難波補買', query: 'Kuromon Market' },
      { label: '飯店整理行李', query: 'OASIS NANIWA Osaka' }
    ],
    tickets: [
      { title: '購物退稅', detail: '需護照。' },
      { title: '藥妝折價券', detail: '如有藥妝折價券，先截圖放手機相簿。' }
    ],
    quickLinks: [
      { label: '🧸 Joshin Super Kids Land', query: 'Joshin Super Kids Land Osaka' },
      { label: '🛍 黑門市場', query: 'Kuromon Market' },
      { label: '🏨 回OASIS', query: 'OASIS NANIWA Osaka' }
    ],
    outbound: [
      {
        text: 'OASIS NANIWA → 日本橋站／黑門市場',
        lineName: '步行或 Osaka Metro',
        lineColor: '#6b7280',
        direction: '往日本橋站／黑門市場方向',
        from: { label: 'OASIS NANIWA', query: 'OASIS NANIWA Osaka' },
        to: { label: '日本橋站／黑門市場', query: 'Kuromon Market' },
        exit: '日本橋站 10 號出口方向。'
      },
      {
        text: '難波站 → Joshin Super Kids Land',
        lineName: '步行',
        lineColor: '#6b7280',
        direction: '往南海難波／日本橋／電電城方向',
        from: { label: '難波站', query: 'Namba Station' },
        to: { label: 'Joshin Super Kids Land', query: 'Joshin Super Kids Land Osaka' },
        exit: '難波站往南海難波／日本橋／電電城方向出口。'
      }
    ],
    inbound: [
      {
        text: '黑門市場／日本橋 → OASIS NANIWA',
        lineName: '步行或 Metro',
        lineColor: '#6b7280',
        direction: '往 OASIS NANIWA 方向',
        from: { label: '黑門市場／日本橋', query: 'Kuromon Market' },
        to: { label: 'OASIS NANIWA', query: 'OASIS NANIWA Osaka' },
        exit: '採買後先回住宿放東西。'
      }
    ],
    note: '購物與整理日，不要排太滿。'
  },
  {
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
]
