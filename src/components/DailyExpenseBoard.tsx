import { useMemo } from 'react'
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

  const groupedDays = useMemo(() => {
    return dayPlans.map((day) => {
      const items = expenses
        .filter((expense) => expense.date === day.date)
        .sort((a, b) => (a.createdAt ?? '').localeCompare(b.createdAt ?? ''))

      return {
        id: day.id,
        date: day.date,
        title: day.title.replace(/^Day\s*\d+｜/, ''),
        items,
        totalJpy: items.reduce((sum, item) => sum + safeAmount(item.jpy), 0),
        totalTwd: items.reduce((sum, item) => sum + safeAmount(item.twd), 0)
      }
    })
  }, [expenses])

  return (
    <section className="dailyExpenseBoard" aria-label="每日花費記錄">
      <div className="dailyExpenseHero card">
        <span className="badge">每日花費</span>
        <h2>依日期查看旅費</h2>
        <p>選擇日期展開後，可查看當日所有消費。</p>
      </div>

      <div className="dailyExpenseList">
        {groupedDays.map((day, index) => (
          <details className="dailyExpenseCard" key={day.id} open={index === 0}>
            <summary>
              <div>
                <span className="dailyExpenseDate">{day.date}</span>
                <strong>{day.title}</strong>
                <span>{day.items.length} 筆消費</span>
              </div>
              <div className="dailyExpenseTotal">
                <strong>{yen(day.totalJpy)}</strong>
                <span>{twd(day.totalTwd)}</span>
              </div>
            </summary>

            {day.items.length === 0 ? (
              <p className="dailyExpenseEmpty">這一天目前尚未新增消費。</p>
            ) : (
              <div className="dailyExpenseTable" role="table" aria-label={`${day.date} 消費明細`}>
                <div className="dailyExpenseRow dailyExpenseHead" role="row">
                  <span role="columnheader">類別</span>
                  <span role="columnheader">項目</span>
                  <span role="columnheader">日圓</span>
                  <span role="columnheader">台幣</span>
                </div>
                {day.items.map((expense) => (
                  <div className="dailyExpenseRow" role="row" key={`${expense.id}-${expense.item}`}>
                    <span role="cell">{expense.category}</span>
                    <strong role="cell">{expense.item}</strong>
                    <span role="cell">{yen(expense.jpy)}</span>
                    <span role="cell">{twd(expense.twd)}</span>
                  </div>
                ))}
              </div>
            )}
          </details>
        ))}
      </div>
    </section>
  )
}
