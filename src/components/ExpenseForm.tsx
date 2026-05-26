import { useEffect, useState } from 'react'
import { useExpenses } from '../context/ExpenseContext'

const JPY_TO_TWD = 0.22
const QUICK_AMOUNTS = [500, 1000, 3000, 5000, 10000]
const CATEGORY_OPTIONS = ['交通', '餐食', '住宿', '機票', '票券', '購物', '便利商店', '伴手禮', '其他']
const DATE_OPTIONS = ['7/23', '7/24', '7/25', '7/26', '7/27', '7/28', '7/29', '7/30', '7/31']
const ITEM_OPTIONS = ['早餐', '午餐', '晚餐', '飲料', '便利商店', '計程車', '電車', '門票', '藥妝', '伴手禮', '拉麵', '咖啡', 'USJ門票', 'Rapi:t', '其他／自訂']
const CUSTOM_ITEM_VALUE = '其他／自訂'

function autoCategory(item: string) {
  const text = item.toLowerCase()

  if (/飯店|住宿|hotel|apa|liber|oasis/.test(text)) return '住宿'
  if (/機票|航空|長榮|br134|br177|flight|airport/.test(text)) return '機票'
  if (/餐|早餐|午餐|晚餐|飯|拉麵|咖啡|飲料|牛|燒|市場|food|cafe|restaurant/.test(text)) return '餐食'
  if (/票|門票|usj|teamlab|海遊館|klook|express/.test(text)) return '票券'
  if (/車|電車|jr|metro|rapi|交通|巴士|taxi|計程車/.test(text)) return '交通'
  if (/便利商店|超商|lawson|familymart|famima|7-11|seven/.test(text)) return '便利商店'
  if (/伴手禮|土產|禮物|souvenir/.test(text)) return '伴手禮'
  if (/藥妝|購物|玩具|joshin|退稅/.test(text)) return '購物'

  return '其他'
}

function round(value: number) {
  return Math.round(value)
}

function parseAmount(value: string) {
  if (value.trim() === '') return 0
  const amount = Number(value)
  return Number.isFinite(amount) && amount > 0 ? amount : 0
}

function messageType(message: string) {
  if (!message) return ''
  return message.includes('失敗') || message.includes('請') ? 'toastError' : 'toastSuccess'
}

export function ExpenseForm() {
  const { addExpense } = useExpenses()
  const [message, setMessage] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [selectedItem, setSelectedItem] = useState('')

  const [form, setForm] = useState({
    date: '7/24',
    category: '餐食',
    item: '',
    jpy: 0,
    twd: 0,
    pay: '現金',
    createdBy: 'sacha' as 'sacha' | 'yang'
  })

  useEffect(() => {
    if (!message) return

    const timer = window.setTimeout(() => {
      setMessage('')
    }, 2600)

    return () => window.clearTimeout(timer)
  }, [message])

  function applyItem(item: string) {
    setSelectedItem(item)

    if (item === CUSTOM_ITEM_VALUE) {
      setForm({ ...form, item: '', category: '其他' })
      return
    }

    setForm({ ...form, item, category: autoCategory(item) })
  }

  function applyJpy(jpy: number) {
    setForm({ ...form, jpy, twd: round(jpy * JPY_TO_TWD) })
  }

  function clearAmounts() {
    setForm({ ...form, jpy: 0, twd: 0 })
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    if (isSaving) return
    setMessage('')

    if (!form.item.trim()) {
      setMessage('請先選擇或輸入消費項目。')
      return
    }

    if (form.jpy <= 0 && form.twd <= 0) {
      setMessage('請至少輸入日幣或台幣其中一種金額。')
      return
    }

    try {
      setIsSaving(true)
      await addExpense(form)

      setForm({
        ...form,
        item: '',
        jpy: 0,
        twd: 0
      })
      setSelectedItem('')

      setMessage('已新增消費，最新明細會顯示在上方。')
    } catch {
      setMessage('新增失敗，請稍後再試。')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <section className="card expensePanel expenseFormPanel compactExpenseForm">
      <div className="sectionTitleRow">
        <div>
          <span className="badge">快速記帳</span>
          <h2>➕ 新增消費</h2>
        </div>
        <span className="statusPill">¥1 ≈ NT${JPY_TO_TWD}</span>
      </div>

      <p className="miniHint">旅行中先選項目與金額即可；類別會自動判斷，也可以手動調整。</p>

      <form className="expenseForm" onSubmit={handleSubmit}>
        <label className="fieldGroup">
          <span>日期</span>
          <select
            value={form.date}
            disabled={isSaving}
            onChange={(event) =>
              setForm({ ...form, date: event.target.value })
            }
          >
            {DATE_OPTIONS.map((date) => (
              <option key={date} value={date}>
                {date}
              </option>
            ))}
          </select>
        </label>

        <label className="fieldGroup fieldWide">
          <span>消費項目</span>
          <select
            value={selectedItem}
            disabled={isSaving}
            onChange={(event) => applyItem(event.target.value)}
          >
            <option value="">請選擇消費項目</option>
            {ITEM_OPTIONS.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        {selectedItem === CUSTOM_ITEM_VALUE ? (
          <label className="fieldGroup fieldWide">
            <span>自訂消費項目</span>
            <input
              value={form.item}
              disabled={isSaving}
              onChange={(event) => {
                const item = event.target.value
                setForm({ ...form, item, category: autoCategory(item) })
              }}
              placeholder="例如：章魚燒、置物櫃、扭蛋"
            />
          </label>
        ) : null}

        <label className="fieldGroup">
          <span>類別</span>
          <select
            value={form.category}
            disabled={isSaving}
            onChange={(event) =>
              setForm({ ...form, category: event.target.value })
            }
          >
            {CATEGORY_OPTIONS.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>

        <label className="fieldGroup">
          <span>日幣 JPY</span>
          <input
            inputMode="numeric"
            type="number"
            min="0"
            value={form.jpy || ''}
            disabled={isSaving}
            onChange={(event) => {
              const jpy = parseAmount(event.target.value)
              setForm({ ...form, jpy, twd: jpy > 0 ? round(jpy * JPY_TO_TWD) : 0 })
            }}
            placeholder="輸入日幣"
          />
        </label>

        <label className="fieldGroup">
          <span>台幣 TWD</span>
          <input
            inputMode="numeric"
            type="number"
            min="0"
            value={form.twd || ''}
            disabled={isSaving}
            onChange={(event) => {
              const twd = parseAmount(event.target.value)
              setForm({ ...form, twd, jpy: twd > 0 ? round(twd / JPY_TO_TWD) : 0 })
            }}
            placeholder="或輸入台幣"
          />
        </label>

        <div className="quickChoiceRow fieldWide" aria-label="常用金額">
          {QUICK_AMOUNTS.map((amount) => (
            <button
              key={amount}
              type="button"
              className="softChoiceButton"
              disabled={isSaving}
              onClick={() => applyJpy(amount)}
            >
              ¥{amount.toLocaleString()}
            </button>
          ))}
          <button
            type="button"
            className="softChoiceButton"
            disabled={isSaving}
            onClick={clearAmounts}
          >
            清空金額
          </button>
        </div>

        <label className="fieldGroup">
          <span>付款方式</span>
          <select
            value={form.pay}
            disabled={isSaving}
            onChange={(event) =>
              setForm({ ...form, pay: event.target.value })
            }
          >
            <option value="現金">現金</option>
            <option value="信用卡">信用卡</option>
            <option value="電子支付">電子支付</option>
            <option value="已預付">已預付</option>
          </select>
        </label>

        <label className="fieldGroup">
          <span>記帳人</span>
          <select
            value={form.createdBy}
            disabled={isSaving}
            onChange={(event) =>
              setForm({
                ...form,
                createdBy: event.target.value as 'sacha' | 'yang'
              })
            }
          >
            <option value="sacha">sacha</option>
            <option value="yang">yang</option>
          </select>
        </label>

        <div className="calcPreview fieldWide">
          <strong>{form.item || '尚未選擇項目'}</strong>
          <span>¥{form.jpy.toLocaleString()} ≈ NT${form.twd.toLocaleString()}</span>
          <span>{form.category}・{form.pay}・{form.createdBy}</span>
        </div>

        <button className="fieldSubmit" type="submit" disabled={isSaving}>
          {isSaving ? '新增中...' : '新增這筆消費'}
        </button>
      </form>

      {message ? <div className={`inlineToast ${messageType(message)}`}>{message}</div> : null}
    </section>
  )
}