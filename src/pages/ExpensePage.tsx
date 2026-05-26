import { useEffect, useState } from 'react'
import { ExpenseCharts } from '../components/ExpenseCharts'
import { ExpenseExport } from '../components/ExpenseExport'
import { ExpenseForm } from '../components/ExpenseForm'
import { RecentExpenseList } from '../components/RecentExpenseList'
import { ExpenseBreakdownStats, ExpenseTotalStats } from '../components/ExpenseStats'
import { ExpenseTable } from '../components/ExpenseTable'
import { ExpenseSummary } from '../components/ExpenseSummary'
import { ExpenseProvider, useExpenses } from '../context/ExpenseContext'

const QUICK_SECTIONS = [
  { id: 'expense-summary', label: '總額' },
  { id: 'add-expense', label: '新增' },
  { id: 'expense-details', label: '明細' },
  { id: 'expense-export', label: '匯出' }
]

function ExpenseContent() {
  const { loading, error, reload } = useExpenses()
  const [activeSection, setActiveSection] = useState('expense-summary')

  useEffect(() => {
    function handleOnline() {
      reload()
    }

    window.addEventListener('online', handleOnline)

    return () => {
      window.removeEventListener('online', handleOnline)
    }
  }, [reload])

  useEffect(() => {
    function handleScroll() {
      const nextSection = QUICK_SECTIONS.reduce((current, section) => {
        const element = document.getElementById(section.id)
        if (!element) return current

        const top = element.getBoundingClientRect().top
        return top <= 160 ? section.id : current
      }, 'expense-summary')

      setActiveSection(nextSection)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <main className="wrap expenseWrap" id="expense-top">
      <section className="card expenseMiniHeader">
        <div>
          <span className="badge">關西旅程</span>
          <h1>旅費記錄</h1>
        </div>

        <button onClick={reload}>更新資料</button>
      </section>

      {loading ? <p className="miniHint">正在更新旅費資料...</p> : null}

      {error ? (
        <p className="errorHint" role="alert">
          資料更新失敗：{error}
        </p>
      ) : null}

      <div id="expense-summary">
        <ExpenseTotalStats />
      </div>

      <RecentExpenseList />

      <details id="expense-details" className="accordion" open>
        <summary>📋 消費明細</summary>
        <div className="accordionBody">
          <ExpenseTable />
        </div>
      </details>

      <details id="add-expense" className="accordion">
        <summary>➕ 新增消費</summary>
        <div className="accordionBody">
          <ExpenseForm />
        </div>
      </details>

      <details className="accordion">
        <summary>📊 花費分析</summary>
        <div className="accordionBody">
          <ExpenseCharts />
        </div>
      </details>

      <ExpenseSummary />

      <ExpenseBreakdownStats />

      <details id="expense-export" className="accordion">
        <summary>📤 匯出資料</summary>
        <div className="accordionBody">
          <ExpenseExport />
        </div>
      </details>

      <nav className="expenseQuickBar" aria-label="旅費快捷操作">
        {QUICK_SECTIONS.map((section) => (
          <a
            className={activeSection === section.id ? 'activeQuickLink' : ''}
            href={`#${section.id}`}
            key={section.id}
          >
            {section.label}
          </a>
        ))}
      </nav>
    </main>
  )
}

export function ExpensePage() {
  return (
    <ExpenseProvider>
      <ExpenseContent />
    </ExpenseProvider>
  )
}