import { useMemo, useState } from 'react'
import type { Expense } from '../types'
import { dayPlans } from '../data/days'
import { type ExpenseInput, useExpenses } from '../context/ExpenseContext'

function yen(value: number) {
  return `¥${Math.round(value).toLocaleString()}`
}

function twd(value: number) {
  return `NT$${Math.round(value).toLocaleString()}`
}

function safeAmount(value: number) {
  return Number.isFinite(value) ? value : 0
}

function toNumber(value: string, fallback: number) {
  const parsed = Number(value)
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : fallback
}

function categoryIcon(category: string) {
  if (category.includes('餐')) return '🍜'
  if (category.includes('交通')) return '🚃'
  if (category.includes('住宿')) return '🏨'
  if (category.includes('機票')) return '✈️'
  if (category.includes('票券')) return '🎟️'
  if (category.includes('購物')) return '🛍️'
  if (category.includes('便利')) return '🏪'
  if (category.includes('伴手')) return '🎁'
  return '✨'
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

export function DailyExpenseBoard() {
  const { expenses, deleteExpense, updateExpense } = useExpenses()
  const [selectedDayId, setSelectedDayId] = useState(dayPlans[0]?.id ?? '')
  const [busyId, setBusyId] = useState<string | null>(null)

  const groupedDays = useMemo(() => {
    return dayPlans.map((day) => {
      const items = expenses
        .filter((expense) => expense.date === day.date)
        .sort((a, b) => (a.createdAt ?? '').localeCompare(b.createdAt ?? ''))

      return {
        id: day.id,
        date: day.date,
        items,
        totalJpy: items.reduce((sum, item) => sum + safeAmount(item.jpy), 0),
        totalTwd: items.reduce((sum, item) => sum + safeAmount(item.twd), 0)
      }
    })
  }, [expenses])

  const selectedDay = groupedDays.find((day) => day.id === selectedDayId) ?? groupedDays[0]

  function selectDay(id: string) {
    setSelectedDayId(id)
    setTimeout(() => {
      const btn = document.getElementById(`date-btn-${id}`)
      const container = btn?.parentElement
      if (btn && container) {
        const containerWidth = container.clientWidth
        const btnWidth = btn.clientWidth
        const btnLeft = btn.offsetLeft
        const scrollLeft = btnLeft - (containerWidth / 2) + (btnWidth / 2)
        container.scrollTo({ left: scrollLeft, behavior: 'smooth' })
      }
    }, 50)
  }

  if (!selectedDay) return null

  async function handleEdit(expense: Expense) {
    if (!expense.id || expense.fixed || busyId) return

    const nextItem = window.prompt('修改消費項目', expense.item)
    if (nextItem === null) return

    const item = nextItem.trim()
    if (!item) return

    const nextJpy = window.prompt('修改日幣金額', String(expense.jpy))
    if (nextJpy === null) return

    const nextTwd = window.prompt('修改台幣金額', String(expense.twd))
    if (nextTwd === null) return

    const input = toInput(expense)

    const updatedInput: ExpenseInput = {
      ...input,
      item,
      jpy: toNumber(nextJpy, expense.jpy),
      twd: toNumber(nextTwd, expense.twd)
    }

    setBusyId(expense.id)

    try {
      await updateExpense(expense.id, updatedInput)
    } finally {
      setBusyId(null)
    }
  }

  async function handleDelete(expense: Expense) {
    if (!expense.id || expense.fixed || busyId) return

    const confirmed = window.confirm(`確定要刪除「${expense.item}」嗎？`)

    if (!confirmed) return

    setBusyId(expense.id)

    try {
      await deleteExpense(expense.id)
    } finally {
      setBusyId(null)
    }
  }

  return (
    <section className="dailyExpenseBoard" aria-label="每日花費記錄">
      <div className="dailyCalendarStrip" aria-label="選擇消費日期">
        <span className="dateScrollSpacer" aria-hidden="true" />
        {groupedDays.map((day) => (
          <button
            id={`date-btn-${day.id}`}
            key={day.id}
            type="button"
            className={`dailyCalendarButton ${day.id === selectedDay.id ? 'activeDailyCalendarButton' : ''}`}
            onClick={() => selectDay(day.id)}
          >
            <strong>{day.date}</strong>
            <small>{day.items.length} 筆</small>
          </button>
        ))}
        <span className="dateScrollSpacer" aria-hidden="true" />
      </div>

      <article className="dailyExpenseSelectedCard">
        <div className="dailyExpenseSelectedHeader">
          <div>
            <span className="dailyExpenseDate">{selectedDay.date}</span>
            <p>{selectedDay.items.length} 筆消費</p>
          </div>

          <div className="dailyExpenseTotal">
            <strong className="mainAmount">{yen(selectedDay.totalJpy)}</strong>
            <span className="subAmount">{twd(selectedDay.totalTwd)}</span>
          </div>
        </div>

        {selectedDay.items.length === 0 ? (
          <p className="dailyExpenseEmpty">這一天目前尚未新增消費。</p>
        ) : (
          <div className="dailyExpenseReceiptList" aria-label={`${selectedDay.date} 消費明細`}>
            {selectedDay.items.map((expense) => (
              <article
                key={`${expense.id}-${expense.item}`}
                className={`dailyExpenseReceipt ${expense.fixed ? 'fixedReceipt' : ''}`}
              >
                <div className={`expenseCategoryIcon cat-${expense.category}`} aria-hidden="true">
                  {categoryIcon(expense.category)}
                </div>

                <div className="expenseReceiptMain">
                  <div className="expenseCategoryRow">
                    <span className="expenseCategoryPill">{expense.category}</span>

                    {!expense.fixed ? (
                      <span className="expenseReceiptMeta">
                        {expense.pay}・{expense.createdBy}
                      </span>
                    ) : null}
                  </div>

                  <strong className="expenseItemName">{expense.item}</strong>
                </div>

                <div className="expenseReceiptAmount">
                  <strong className="mainAmount">{yen(expense.jpy)}</strong>
                  <span className="subAmount">{twd(expense.twd)}</span>

                  {!expense.fixed ? (
                    <div className="expenseReceiptActions">
                      <button
                        type="button"
                        disabled={Boolean(busyId)}
                        onClick={() => handleEdit(expense)}
                      >
                        修改
                      </button>

                      <button
                        type="button"
                        className="dangerButton"
                        disabled={Boolean(busyId)}
                        onClick={() => handleDelete(expense)}
                      >
                        {busyId === expense.id ? '處理中' : '刪除'}
                      </button>
                    </div>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        )}
      </article>
    </section>
  )
}
