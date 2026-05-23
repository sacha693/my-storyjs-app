import { useState } from 'react'
import type { Expense } from '../types'
import { type ExpenseInput, useExpenses } from '../context/ExpenseContext'

function yen(value: number) {
  return `¥${value.toLocaleString()}`
}

function twd(value: number) {
  return `NT$${value.toLocaleString()}`
}

function sanitizeAmount(value: string) {
  const amount = Number(value)
  return Number.isFinite(amount) && amount > 0 ? amount : 0
}

function toInput(expense: Expense): ExpenseInput {
  return {
    date: expense.date,
    category: expense.category,
    item: expense.item,
    jpy: expense.jpy,
    twd: expense.twd,
    pay: expense.pay,
    createdBy: expense.createdBy === 'yang' ? 'yang' : 'sacha'
  }
}

export function ExpenseTable() {
  const { expenses, deleteExpense, updateExpense } = useExpenses()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [draft, setDraft] = useState<ExpenseInput | null>(null)
  const [message, setMessage] = useState('')

  function startEdit(expense: Expense) {
    if (!expense.id || expense.fixed) return
    setMessage('')
    setEditingId(expense.id)
    setDraft(toInput(expense))
  }

  async function saveEdit() {
    if (!editingId || !draft) return

    if (!draft.item.trim()) {
      setMessage('請輸入消費項目後再儲存。')
      return
    }

    if (draft.jpy <= 0 && draft.twd <= 0) {
      setMessage('請至少保留一種有效金額。')
      return
    }

    await updateExpense(editingId, draft)
    setEditingId(null)
    setDraft(null)
    setMessage('已儲存修改。')
  }

  async function handleDelete(expense: Expense) {
    if (!expense.id || expense.fixed) return

    const confirmed = window.confirm(`確定要刪除「${expense.item}」嗎？`)
    if (!confirmed) return

    await deleteExpense(expense.id)
    setMessage('已刪除消費。')
  }

  return (
    <section className="card expensePanel">
      <span className="badge">家庭旅費明細</span>
      <h2>📋 消費明細</h2>
      {message ? <p className="miniHint">{message}</p> : null}

      <table className="expenseTable">
        <thead>
          <tr>
            <th>日期</th>
            <th>類別</th>
            <th>項目</th>
            <th>JPY</th>
            <th>TWD</th>
            <th>記帳人</th>
            <th>操作</th>
          </tr>
        </thead>

        <tbody>
          {expenses.map((expense) => {
            const isEditing = editingId === expense.id && draft

            return (
              <tr key={`${expense.id}-${expense.item}`}>
                <td>
                  {isEditing ? (
                    <input
                      value={draft.date}
                      onChange={(event) =>
                        setDraft({ ...draft, date: event.target.value })
                      }
                    />
                  ) : (
                    expense.date
                  )}
                </td>
                <td>
                  {isEditing ? (
                    <input
                      value={draft.category}
                      onChange={(event) =>
                        setDraft({ ...draft, category: event.target.value })
                      }
                    />
                  ) : (
                    expense.category
                  )}
                </td>
                <td>
                  {isEditing ? (
                    <input
                      value={draft.item}
                      onChange={(event) =>
                        setDraft({ ...draft, item: event.target.value })
                      }
                    />
                  ) : (
                    expense.item
                  )}
                </td>
                <td>
                  {isEditing ? (
                    <input
                      inputMode="numeric"
                      type="number"
                      min="0"
                      value={draft.jpy || ''}
                      onChange={(event) =>
                        setDraft({ ...draft, jpy: sanitizeAmount(event.target.value) })
                      }
                    />
                  ) : (
                    yen(expense.jpy)
                  )}
                </td>
                <td>
                  {isEditing ? (
                    <input
                      inputMode="numeric"
                      type="number"
                      min="0"
                      value={draft.twd || ''}
                      onChange={(event) =>
                        setDraft({ ...draft, twd: sanitizeAmount(event.target.value) })
                      }
                    />
                  ) : (
                    twd(expense.twd)
                  )}
                </td>
                <td>
                  {isEditing ? (
                    <select
                      value={draft.createdBy}
                      onChange={(event) =>
                        setDraft({
                          ...draft,
                          createdBy: event.target.value as 'sacha' | 'yang'
                        })
                      }
                    >
                      <option value="sacha">sacha</option>
                      <option value="yang">yang</option>
                    </select>
                  ) : (
                    expense.createdBy
                  )}
                </td>
                <td>
                  {expense.fixed ? (
                    '固定費'
                  ) : isEditing ? (
                    <div className="buttonRow">
                      <button onClick={saveEdit}>儲存</button>
                      <button
                        type="button"
                        onClick={() => {
                          setEditingId(null)
                          setDraft(null)
                          setMessage('')
                        }}
                      >
                        取消
                      </button>
                    </div>
                  ) : (
                    <div className="buttonRow">
                      <button onClick={() => startEdit(expense)}>修改</button>
                      <button
                        className="dangerButton"
                        onClick={() => handleDelete(expense)}
                      >
                        刪除
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </section>
  )
}
