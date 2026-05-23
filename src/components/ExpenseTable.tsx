import { useState } from 'react'
import type { Expense } from '../types'
import { type ExpenseInput, useExpenses } from '../context/ExpenseContext'

const JPY_TO_TWD = 0.22

function yen(value: number) {
  return `¥${value.toLocaleString()}`
}

function twd(value: number) {
  return `NT$${value.toLocaleString()}`
}

function round(value: number) {
  return Math.round(value)
}

function sanitizeAmount(value: string) {
  const amount = Number(value)
  return Number.isFinite(amount) && amount > 0 ? amount : 0
}

function messageType(message: string) {
  if (!message) return ''
  return message.includes('失敗') || message.includes('請') ? 'toastError' : 'toastSuccess'
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
  const [busyId, setBusyId] = useState<string | null>(null)

  function startEdit(expense: Expense) {
    if (!expense.id || expense.fixed || busyId) return
    setMessage('')
    setEditingId(expense.id)
    setDraft(toInput(expense))
  }

  async function saveEdit() {
    if (!editingId || !draft || busyId) return

    if (!draft.item.trim()) {
      setMessage('請輸入消費項目後再儲存。')
      return
    }

    if (draft.jpy <= 0 && draft.twd <= 0) {
      setMessage('請至少保留一種有效金額。')
      return
    }

    try {
      setBusyId(editingId)
      await updateExpense(editingId, draft)
      setEditingId(null)
      setDraft(null)
      setMessage('已儲存修改。')
    } catch {
      setMessage('儲存失敗，請稍後再試。')
    } finally {
      setBusyId(null)
    }
  }

  async function handleDelete(expense: Expense) {
    if (!expense.id || expense.fixed || busyId) return

    const confirmed = window.confirm(`確定要刪除「${expense.item}」嗎？`)
    if (!confirmed) return

    try {
      setBusyId(expense.id)
      await deleteExpense(expense.id)
      setMessage('已刪除消費。')
    } catch {
      setMessage('刪除失敗，請稍後再試。')
    } finally {
      setBusyId(null)
    }
  }

  return (
    <section className="card expensePanel">
      <span className="badge">家庭旅費明細</span>
      <h2>📋 消費明細</h2>
      {message ? <div className={`inlineToast ${messageType(message)}`}>{message}</div> : null}

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
            const isBusy = busyId === expense.id

            return (
              <tr key={`${expense.id}-${expense.item}`}>
                <td>
                  {isEditing ? (
                    <input
                      value={draft.date}
                      disabled={isBusy}
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
                      disabled={isBusy}
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
                      disabled={isBusy}
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
                      disabled={isBusy}
                      onChange={(event) => {
                        const jpy = sanitizeAmount(event.target.value)
                        setDraft({
                          ...draft,
                          jpy,
                          twd: jpy > 0 ? round(jpy * JPY_TO_TWD) : 0
                        })
                      }}
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
                      disabled={isBusy}
                      onChange={(event) => {
                        const twdAmount = sanitizeAmount(event.target.value)
                        setDraft({
                          ...draft,
                          twd: twdAmount,
                          jpy: twdAmount > 0 ? round(twdAmount / JPY_TO_TWD) : 0
                        })
                      }}
                    />
                  ) : (
                    twd(expense.twd)
                  )}
                </td>
                <td>
                  {isEditing ? (
                    <select
                      value={draft.createdBy}
                      disabled={isBusy}
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
                      <button onClick={saveEdit} disabled={isBusy}>
                        {isBusy ? '儲存中...' : '儲存'}
                      </button>
                      <button
                        type="button"
                        disabled={isBusy}
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
                      <button disabled={Boolean(busyId)} onClick={() => startEdit(expense)}>
                        修改
                      </button>
                      <button
                        className="dangerButton"
                        disabled={Boolean(busyId)}
                        onClick={() => handleDelete(expense)}
                      >
                        {isBusy ? '刪除中...' : '刪除'}
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
