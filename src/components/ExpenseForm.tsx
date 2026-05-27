import { useMemo, useState } from 'react'
import { DATE_OPTIONS } from '../data/dateOptions'
import { useExpenses } from '../context/ExpenseContext'

export function ExpenseForm() {
  const { addExpense, saving } = useExpenses()

  const [form, setForm] = useState({
    date: DATE_OPTIONS[0],
    category: '餐食',
    item: '',
    jpy: '',
    twd: '',
    pay: '現金',
    createdBy: 'sacha'
  })

  const isSaving = saving === 'create'

  const canSubmit = useMemo(() => {
    return Boolean(form.item.trim()) && Number(form.jpy) > 0
  }, [form])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!canSubmit || isSaving) return

    await addExpense({
      date: form.date,
      category: form.category,
      item: form.item.trim(),
      jpy: Number(form.jpy) || 0,
      twd: Number(form.twd) || 0,
      pay: form.pay,
      createdBy: form.createdBy === 'yang' ? 'yang' : 'sacha'
    })

    setForm((current) => ({
      ...current,
      item: '',
      jpy: '',
      twd: ''
    }))
  }

  return (
    <form className="expenseForm" onSubmit={handleSubmit}>
      <label className="fieldGroup fieldWide">
        <span>日期</span>

        <div className="dateCapsuleRow">
          <span className="dateScrollSpacer" aria-hidden="true" />

          {DATE_OPTIONS.map((date) => (
            <button
              key={date}
              type="button"
              className={`dateCapsule ${form.date === date ? 'active' : ''}`}
              onClick={() => setForm({ ...form, date })}
              disabled={isSaving}
            >
              {date}
            </button>
          ))}

          <span className="dateScrollSpacer" aria-hidden="true" />
        </div>
      </label>

      <label className="fieldGroup">
        <span>類別</span>

        <select
          value={form.category}
          onChange={(event) => setForm({ ...form, category: event.target.value })}
        >
          <option value="餐食">餐食</option>
          <option value="交通">交通</option>
          <option value="住宿">住宿</option>
          <option value="票券">票券</option>
          <option value="購物">購物</option>
          <option value="便利商店">便利商店</option>
          <option value="伴手禮">伴手禮</option>
          <option value="其他">其他</option>
        </select>
      </label>

      <label className="fieldGroup fieldWide">
        <span>消費項目</span>

        <input
          type="text"
          placeholder="例如：一蘭拉麵、ICOCA 加值"
          value={form.item}
          onChange={(event) => setForm({ ...form, item: event.target.value })}
        />
      </label>

      <label className="fieldGroup">
        <span>日圓 ¥</span>

        <input
          type="number"
          inputMode="numeric"
          placeholder="0"
          value={form.jpy}
          onChange={(event) => setForm({ ...form, jpy: event.target.value })}
        />
      </label>

      <label className="fieldGroup">
        <span>台幣 NT$</span>

        <input
          type="number"
          inputMode="numeric"
          placeholder="0"
          value={form.twd}
          onChange={(event) => setForm({ ...form, twd: event.target.value })}
        />
      </label>

      <label className="fieldGroup">
        <span>付款方式</span>

        <select
          value={form.pay}
          onChange={(event) => setForm({ ...form, pay: event.target.value })}
        >
          <option value="現金">現金</option>
          <option value="信用卡">信用卡</option>
          <option value="LINE Pay">LINE Pay</option>
          <option value="Apple Pay">Apple Pay</option>
        </select>
      </label>

      <label className="fieldGroup">
        <span>記帳人</span>

        <select
          value={form.createdBy}
          onChange={(event) => setForm({ ...form, createdBy: event.target.value })}
        >
          <option value="sacha">Sacha</option>
          <option value="yang">Yang</option>
        </select>
      </label>

      <div className="calcPreview fieldWide">
        <strong>快速操作</strong>

        <button
          type="button"
          className="ghostButton"
          onClick={() => setForm((current) => ({ ...current, jpy: '', twd: '' }))}
        >
          清空金額
        </button>
      </div>

      <button type="submit" className="primaryButton fieldWide" disabled={!canSubmit || isSaving}>
        {isSaving ? '新增中...' : '新增消費'}
      </button>
    </form>
  )
}
