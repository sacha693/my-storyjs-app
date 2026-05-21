import { useState } from 'react'
import { useExpenses } from '../context/ExpenseContext'

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
    <section className="card">
      <h2>➕ 新增消費</h2>

      <form className="expenseForm" onSubmit={handleSubmit}>
        <input
          value={form.date}
          onChange={(event) =>
            setForm({ ...form, date: event.target.value })
          }
          placeholder="日期"
        />

        <input
          value={form.category}
          onChange={(event) =>
            setForm({ ...form, category: event.target.value })
          }
          placeholder="類別"
        />

        <input
          value={form.item}
          onChange={(event) =>
            setForm({ ...form, item: event.target.value })
          }
          placeholder="項目"
        />

        <input
          type="number"
          value={form.jpy}
          onChange={(event) =>
            setForm({ ...form, jpy: Number(event.target.value) })
          }
          placeholder="JPY"
        />

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
    </section>
  )
}
