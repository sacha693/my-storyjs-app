import { useState } from 'react'
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

export function ExpenseForm() {
  const { addExpense } = useExpenses()

  const [form, setForm] = useState({
    date: '7/24',
    category: '餐食',
    item: '',
    jpy: 0,
    twd: 0,
    pay: '現金',
    createdBy: 'sacha' as 'sacha' | 'yang'
  })

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()

    if (!form.item.trim()) {
      return
    }

    await addExpense(form)

    setForm({
      ...form,
      item: '',
      jpy: 0,
      twd: 0
    })
  }

  return (
    <section className="card expensePanel">
      <span className="badge">新增一筆旅費</span>
      <h2>➕ 新增消費</h2>
      <p className="miniHint">匯率暫以 1 JPY ≈ NT$0.22 估算，可手動覆蓋。</p>

      <form className="expenseForm" onSubmit={handleSubmit}>
        <input
          value={form.date}
          onChange={(event) =>
            setForm({ ...form, date: event.target.value })
          }
          placeholder="日期"
        />

        <input
          value={form.item}
          onChange={(event) => {
            const item = event.target.value
            setForm({ ...form, item, category: autoCategory(item) })
          }}
          placeholder="項目，例如：拉麵、USJ門票、Rapi:t"
        />

        <input
          value={form.category}
          onChange={(event) =>
            setForm({ ...form, category: event.target.value })
          }
          placeholder="自動分類"
        />

        <input
          type="number"
          value={form.jpy || ''}
          onChange={(event) => {
            const jpy = Number(event.target.value)
            setForm({ ...form, jpy, twd: round(jpy * JPY_TO_TWD) })
          }}
          placeholder="輸入日幣 JPY"
        />

        <input
          type="number"
          value={form.twd || ''}
          onChange={(event) => {
            const twd = Number(event.target.value)
            setForm({ ...form, twd, jpy: round(twd / JPY_TO_TWD) })
          }}
          placeholder="或輸入台幣 TWD"
        />

        <select
          value={form.pay}
          onChange={(event) =>
            setForm({ ...form, pay: event.target.value })
          }
        >
          <option value="現金">現金</option>
          <option value="信用卡">信用卡</option>
          <option value="電子支付">電子支付</option>
          <option value="已預付">已預付</option>
        </select>

        <select
          value={form.createdBy}
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

        <button type="submit">新增</button>
      </form>

      <div className="calcPreview">
        <strong>即時換算</strong>
        <span>¥{form.jpy.toLocaleString()} ≈ NT${form.twd.toLocaleString()}</span>
        <span>自動分類：{form.category}</span>
      </div>
    </section>
  )
}
