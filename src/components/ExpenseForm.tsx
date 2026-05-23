import { useEffect, useState } from 'react'
import { useExpenses } from '../context/ExpenseContext'

const JPY_TO_TWD = 0.22

function autoCategory(item: string) {
  const text = item.toLowerCase()

  if (/飯店|住宿|hotel|apa|liber|oasis/.test(text)) return '住宿'
  if (/機票|航空|長榮|br134|br177|flight|airport/.test(text)) return '機票'
  if (/餐|飯|拉麵|咖啡|牛|燒|市場|food|cafe|restaurant/.test(text)) return '餐食'
  if (/票|門票|usj|teamlab|海遊館|klook|express/.test(text)) return '票券'
  if (/車|電車|jr|metro|rapi|交通|巴士|taxi|計程車/.test(text)) return '交通'
  if (/藥妝|伴手禮|購物|玩具|joshin|黑門|退稅/.test(text)) return '購物'

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

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    if (isSaving) return
    setMessage('')

    if (!form.item.trim()) {
      setMessage('請先輸入消費項目。')
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

      setMessage('已新增消費。')
    } catch {
      setMessage('新增失敗，請稍後再試。')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <section className="card expensePanel expenseFormPanel">
      <span className="badge">新增一筆旅費</span>
      <h2>➕ 新增消費</h2>
      <p className="miniHint">先填項目，再輸入日幣或台幣其中一種，系統會自動分類與換算。</p>

      <form className="expenseForm" onSubmit={handleSubmit}>
        <label className="fieldGroup">
          <span>日期</span>
          <input
            value={form.date}
            disabled={isSaving}
            onChange={(event) =>
              setForm({ ...form, date: event.target.value })
            }
            placeholder="日期"
          />
        </label>

        <label className="fieldGroup fieldWide">
          <span>消費項目</span>
          <input
            value={form.item}
            disabled={isSaving}
            onChange={(event) => {
              const item = event.target.value
              setForm({ ...form, item, category: autoCategory(item) })
            }}
            placeholder="項目，例如：拉麵、USJ門票、Rapi:t"
          />
        </label>

        <label className="fieldGroup">
          <span>類別</span>
          <input
            value={form.category}
            disabled={isSaving}
            onChange={(event) =>
              setForm({ ...form, category: event.target.value })
            }
            placeholder="自動分類"
          />
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

        <button className="fieldSubmit" type="submit" disabled={isSaving}>
          {isSaving ? '新增中...' : '新增'}
        </button>
      </form>

      <div className="calcPreview">
        <strong>即時換算</strong>
        <span>¥{form.jpy.toLocaleString()} ≈ NT${form.twd.toLocaleString()}</span>
        <span>自動分類：{form.category}</span>
      </div>

      {message ? <div className={`inlineToast ${messageType(message)}`}>{message}</div> : null}
    </section>
  )
}
