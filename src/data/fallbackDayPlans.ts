import type { DayPlan } from './types'

export const FALLBACK_TRIP_PASSPHRASE = 'kansai2026'

export const fallbackDayPlans: DayPlan[] = [
  {
    id: 'day-1',
    date: '7/20',
    title: 'Day 1｜抵達大阪・難波暖身',
    subtitle: '機場進大阪，先熟悉住宿周邊與道頓堀晚餐。',
    suggestedDeparture: '依航班抵達時間彈性安排',
    themeColor: '#7fd3df',
    route: [
      { label: '關西機場 KIX', query: 'Kansai International Airport' },
      { label: '難波住宿區', query: 'Namba Osaka' },
      { label: '道頓堀', query: 'Dotonbori Osaka' }
    ],
    tickets: [
      { title: '南海電鐵 Rapi:t 或空港急行', detail: '依抵達時間選擇快速或省預算版本。' },
      { title: 'ICOCA', detail: '抵達後先儲值，後續 JR、地鐵與私鐵都方便。' }
    ],
    quickLinks: [
      { label: '關西機場到難波', query: 'KIX to Namba train' },
      { label: '道頓堀晚餐', query: 'Dotonbori family dinner' }
    ],
    outbound: [
      { text: '關西機場出關後往南海電鐵方向移動。', lineName: 'Nankai', from: { label: 'KIX', query: 'Kansai International Airport' }, to: { label: 'Namba', query: 'Namba Station Osaka' } },
      { text: '抵達難波後先寄放行李或辦理入住。' },
      { text: '傍晚步行到道頓堀與心齋橋周邊覓食。' }
    ],
    inbound: [
      { text: '晚餐後步行回住宿，第一晚不排太滿。' }
    ],
    note: '第一天以交通和休息為主，便利商店可先補水、早餐與雨具。'
  },
  {
    id: 'day-2',
    date: '7/21',
    title: 'Day 2｜京都伏見稻荷・祇園散步',
    subtitle: '清晨鳥居、午後祇園，晚上回大阪。',
    suggestedDeparture: '08:00 從大阪出發',
    themeColor: '#e86f51',
    route: [
      { label: '大阪難波', query: 'Namba Station Osaka' },
      { label: '伏見稻荷大社', query: 'Fushimi Inari Taisha' },
      { label: '祇園四條', query: 'Gion Shijo Station' }
    ],
    tickets: [
      { title: '京阪電車', detail: '前往伏見稻荷與祇園都方便。' },
      { title: 'ICOCA', detail: '轉乘彈性高，適合親子行程。' }
    ],
    quickLinks: [
      { label: '伏見稻荷', query: 'Fushimi Inari Taisha' },
      { label: '祇園甜點', query: 'Gion Kyoto dessert' }
    ],
    outbound: [
      { text: '大阪搭車往京都方向，先到伏見稻荷。' },
      { text: '走千本鳥居前段即可，不必硬攻山頂。' },
      { text: '午後移動到祇園四條，安排花見小路與甜點。' }
    ],
    inbound: [
      { text: '傍晚從京都河原町或祇園四條回大阪。' }
    ],
    note: '京都夏天偏熱，伏見稻荷務必早到，水和防曬先準備。'
  },
  {
    id: 'day-3',
    date: '7/22',
    title: 'Day 3｜奈良公園・東大寺',
    subtitle: '半日近郊，保留下午休息或購物彈性。',
    suggestedDeparture: '08:30 從難波出發',
    themeColor: '#8ab66b',
    route: [
      { label: '大阪難波', query: 'Osaka Namba Station' },
      { label: '近鐵奈良', query: 'Kintetsu Nara Station' },
      { label: '東大寺', query: 'Todaiji Temple Nara' }
    ],
    tickets: [
      { title: '近鐵電車', detail: '難波到近鐵奈良直達最簡單。' }
    ],
    quickLinks: [
      { label: '奈良公園', query: 'Nara Park' },
      { label: '東大寺', query: 'Todaiji Temple' }
    ],
    outbound: [
      { text: '近鐵難波搭車至近鐵奈良。', lineName: 'Kintetsu Nara Line' },
      { text: '步行前往奈良公園，視體力接東大寺。' }
    ],
    inbound: [
      { text: '午後回大阪，安排午休、百貨或藥妝補給。' }
    ],
    note: '餵鹿請使用鹿仙貝，食物和紙袋收好。'
  },
  {
    id: 'day-4',
    date: '7/23',
    title: 'Day 4｜USJ 一日攻略',
    subtitle: '環球影城主日，動線以熱門設施與兒童體力為核心。',
    suggestedDeparture: '07:00 從住宿出發',
    themeColor: '#4f8cff',
    route: [
      { label: '難波', query: 'Namba Station Osaka' },
      { label: '西九條', query: 'Nishikujo Station' },
      { label: '環球城', query: 'Universal City Station Osaka' }
    ],
    tickets: [
      { title: 'USJ 門票', detail: '入園前確認 QR code、快速通關與整理券。' },
      { title: 'JR 車票 / ICOCA', detail: '西九條轉 JR 夢咲線。' }
    ],
    quickLinks: [
      { label: 'USJ 官方 App', query: 'Universal Studios Japan app timed entry' },
      { label: '超級任天堂世界', query: 'Super Nintendo World USJ timed entry' }
    ],
    outbound: [
      { text: '難波出發，經西九條轉往環球城。' },
      { text: '入園後先處理整理券，再跑第一個熱門設施。' }
    ],
    inbound: [
      { text: '閉園前後人潮多，保留排隊出站時間。' }
    ],
    note: '前一晚先把門票、整理券流程和必玩清單截圖。'
  },
  {
    id: 'day-5',
    date: '7/24',
    title: 'Day 5｜大阪城・梅田空中庭園',
    subtitle: '城市日，上午歷史景點，下午梅田室內與夜景。',
    suggestedDeparture: '09:00',
    themeColor: '#d59b42',
    route: [
      { label: '大阪城公園', query: 'Osaka Castle Park' },
      { label: '梅田', query: 'Umeda Osaka' },
      { label: '空中庭園展望台', query: 'Umeda Sky Building' }
    ],
    tickets: [
      { title: '大阪地鐵 / JR', detail: '依住宿位置選最少轉乘路線。' },
      { title: '展望台門票', detail: '天候佳時再決定是否上樓。' }
    ],
    quickLinks: [
      { label: '大阪城', query: 'Osaka Castle' },
      { label: '梅田空中庭園', query: 'Umeda Sky Building' }
    ],
    outbound: [
      { text: '上午到大阪城公園，外圍散步比登城更輕鬆。' },
      { text: '午後移動梅田，安排百貨、美食街或室內休息。' }
    ],
    inbound: [
      { text: '看完夜景後搭地鐵或 JR 回住宿。' }
    ],
    note: '這天可作為體力恢復日，午後若太熱就改室內。'
  },
  {
    id: 'day-6',
    date: '7/25',
    title: 'Day 6｜神戶北野・港區夜景',
    subtitle: '異國街區、甜點、港邊夜景。',
    suggestedDeparture: '10:00',
    themeColor: '#6a8fbf',
    route: [
      { label: '大阪梅田', query: 'Osaka Umeda Station' },
      { label: '三宮', query: 'Sannomiya Kobe' },
      { label: '神戶港', query: 'Kobe Harborland' }
    ],
    tickets: [
      { title: '阪急 / 阪神 / JR', detail: '依當天所在位置選最方便路線到三宮。' }
    ],
    quickLinks: [
      { label: '北野異人館', query: 'Kobe Kitano Ijinkan' },
      { label: '神戶港夜景', query: 'Kobe Harborland night view' }
    ],
    outbound: [
      { text: '大阪前往三宮，先走北野異人館周邊。' },
      { text: '下午安排甜點或咖啡，傍晚到港區。' }
    ],
    inbound: [
      { text: '夜景後從三宮或神戶站回大阪。' }
    ],
    note: '北野坡道較多，鞋子要舒服，嬰幼兒推車需評估。'
  },
  {
    id: 'day-7',
    date: '7/26',
    title: 'Day 7｜臨空城・採買整理',
    subtitle: '把購物、行李整理與彈性補行程放在最後完整一天。',
    suggestedDeparture: '10:00 或依體力調整',
    themeColor: '#c27691',
    route: [
      { label: '難波', query: 'Namba Osaka' },
      { label: '臨空城', query: 'Rinku Town Premium Outlets' },
      { label: '住宿', query: 'Namba hotel' }
    ],
    tickets: [
      { title: '南海電鐵', detail: '前往臨空城方便，也可熟悉隔天機場方向。' }
    ],
    quickLinks: [
      { label: '臨空城 Outlet', query: 'Rinku Premium Outlets' },
      { label: '大阪伴手禮', query: 'Osaka souvenir shopping' }
    ],
    outbound: [
      { text: '若要購物，上午出發到臨空城。' },
      { text: '若前幾天有遺珠，可改成京都或大阪市區補行程。' }
    ],
    inbound: [
      { text: '傍晚回住宿整理行李，確認隔天交通。' }
    ],
    note: '最後一晚不要排太晚，行李重量和機場交通先確認。'
  },
  {
    id: 'day-8',
    date: '7/27',
    title: 'Day 8｜返回台灣',
    subtitle: '退房、前往關西機場，保留足夠緩衝。',
    suggestedDeparture: '起飛前 4 小時離開住宿較安心',
    themeColor: '#9aa1a8',
    route: [
      { label: '住宿', query: 'Namba Osaka' },
      { label: '關西機場', query: 'Kansai International Airport' }
    ],
    tickets: [
      { title: '南海電鐵 / JR', detail: '依住宿位置與航廈選擇路線。' }
    ],
    quickLinks: [
      { label: '關西機場航廈', query: 'Kansai Airport terminal information' },
      { label: '難波到關西機場', query: 'Namba to KIX train' }
    ],
    outbound: [
      { text: '退房前再次檢查護照、錢包、交通卡和充電器。' },
      { text: '搭車前往關西機場，預留購物與退稅時間。' }
    ],
    inbound: [
      { text: '返台後整理票券與花費紀錄。' }
    ],
    note: '機場日不要壓線，暑假人潮和行李托運都需要緩衝。'
  }
]
