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
          <div className="dailyExpenseTable" role="table" aria-label={`${selectedDay.date} 消費明細`}>
            <div className="dailyExpenseRow dailyExpenseHead" role="row">
              <span role="columnheader">類別</span>
              <span role="columnheader">項目</span>
              <span role="columnheader">日圓</span>
              <span role="columnheader">台幣</span>
            </div>
            {selectedDay.items.map((expense) => (
              <div className="dailyExpenseRow" role="row" key={`${expense.id}-${expense.item}`}>
                <span role="cell">{expense.category}</span>
                <strong role="cell">{expense.item}</strong>
                <span role="cell">{yen(expense.jpy)}</span>
                <span role="cell">{twd(expense.twd)}</span>
              </div>
            ))}
          </div>
        )}
      </article>
    </section>
  )
}