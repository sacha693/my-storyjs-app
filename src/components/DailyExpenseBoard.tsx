import { useMemo, useState } from 'react'
import { dayPlans } from '../data/days'
import { useExpenses } from '../context/ExpenseContext'

function yen(value: number) {
  return `¥${Math.round(value).toLocaleString()}`
}

function twd(value: number) {
  return `NT$${Math.round(value).toLocaleString()}`
}

function safeAmount(value: number) {
  return Number.isFinite(value) ? value : 0
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

export function DailyExpenseBoard() {
  const { expenses } = useExpenses()
  const [selectedDayId, setSelectedDayId] = useState(dayPlans[0]?.id ?? '')

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

  if (!selectedDay) return null

  return (
    <section className="dailyExpenseBoard" aria-label="每日花費記錄">
      <div className="dailyExpenseHero card">
        <span className="badge">每日花費</span>
        <h2>依日期查看旅費</h2>
        <p>左右滑動日期，查看當日所有消費。</p>
      </div>

      <div className="dailyCalendarStrip" aria-label="選擇消費日期">
        {groupedDays.map((day) => (
          <button
            className={`dailyCalendarButton ${day.id === selectedDay.id ? 'activeDailyCalendarButton' : ''}`}
            key={day.id}
            type="button"
            onClick={() => setSelectedDayId(day.id)}
          >
            <strong>{day.date}</strong>
            <small>{day.items.length} 筆</small>
          </button>
        ))}
      </div>

      <article className="dailyExpenseSelectedCard">
        <div className="dailyExpenseSelectedHeader">
          <div>
            <span className="dailyExpenseDate">{selectedDay.date}</span>
            <p>{selectedDay.items.length} 筆消費</p>
          </div>
          <div className="dailyExpenseTotal">
            <strong>{yen(selectedDay.totalJpy)}</strong>
            <span>{twd(selectedDay.totalTwd)}</span>
          </div>
        </div>

        {selectedDay.items.length === 0 ? (
          <p className="dailyExpenseEmpty">這一天目前尚未新增消費。</p>
        ) : (
          <div className="dailyExpenseReceiptList" aria-label={`${selectedDay.date} 消費明細`}>
            {selectedDay.items.map((expense) => (
              <article className="dailyExpenseReceipt" key={`${expense.id}-${expense.item}`}>
                <div className="expenseCategoryIcon" aria-hidden="true">
                  {categoryIcon(expense.category)}
                </div>
                <div className="expenseReceiptMain">
                  <span className="expenseCategoryPill">{expense.category}</span>
                  <strong>{expense.item}</strong>
                  <span className="expenseReceiptMeta">{expense.pay}・{expense.createdBy}</span>
                </div>
                <div className="expenseReceiptAmount">
                  <strong>{yen(expense.jpy)}</strong>
                  <span>{twd(expense.twd)}</span>
                </div>
              </article>
            ))}
          </div>
        )}
      </article>
    </section>
  )
}
