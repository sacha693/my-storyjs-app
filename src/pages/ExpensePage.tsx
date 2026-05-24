import { useEffect, useState } from 'react'
import { ExpenseCharts } from '../components/ExpenseCharts'
import { ExpenseExport } from '../components/ExpenseExport'
import { ExpenseForm } from '../components/ExpenseForm'
import { RecentExpenseList } from '../components/RecentExpenseList'
import { ExpenseStats } from '../components/ExpenseStats'
import { ExpenseTable } from '../components/ExpenseTable'
import { ExpenseProvider, useExpenses } from '../context/ExpenseContext'

const QUICK_SECTIONS = [
  { id: 'expense-summary', label: '總額' },
  { id: 'add-expense', label: '＋新增' },
  { id: 'expense-details', label: '明細' },
  { id: 'expense-export', label: '匯出' }
]

function ExpenseContent() {
  const { loading, error, reload, realtimeStatus } = useExpenses()
  const [isOnline, setIsOnline] = useState(() => navigator.onLine)
  const [activeSection, setActiveSection] = useState('expense-summary')

  useEffect(() => {
    function handleOnline() {
      setIsOnline(true)
      reload()
    }

    function handleOffline() {
      setIsOnline(false)
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
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
      <section className="card hero expenseHero compactHero">
        <div className="expenseHeroText">
          <span className="badge">旅費儀表板</span>
          <h1>旅費記帳系統</h1>
          <p>先看總額，需要時再展開新增、圖表、匯出與完整明細。</p>

          <div className="buttonRow">
            <button onClick={reload}>重新同步</button>

            <span className="statusPill">
              即時同步：{realtimeStatus}
            </span>

            <span className={`statusPill ${isOnline ? 'onlinePill' : 'offlinePill'}`}>
              網路狀態：{isOnline ? 'online' : 'offline'}
            </span>
          </div>

          {!isOnline ? (
            <div className="inlineToast toastError" role="alert">
              目前離線，新增或同步可能會失敗；恢復網路後會自動重新同步。
            </div>
          ) : null}

          {loading ? <p className="miniHint">同步中，正在取得最新旅費資料...</p> : null}

          {error ? (
            <p className="errorHint" role="alert">
              同步錯誤：{error}
            </p>
          ) : null}
        </div>
      </section>

      <div id="expense-summary">
        <ExpenseStats />
      </div>

      <RecentExpenseList />

      <details id="add-expense" className="accordion">
        <summary>➕ 新增消費</summary>
        <div className="accordionBody">
          <ExpenseForm />
        </div>
      </details>

      <details className="accordion">
        <summary>📊 圖表分析</summary>
        <div className="accordionBody">
          <ExpenseCharts />
        </div>
      </details>

      <details id="expense-export" className="accordion">
        <summary>📤 匯出資料</summary>
        <div className="accordionBody">
          <ExpenseExport />
        </div>
      </details>

      <details id="expense-details" className="accordion">
        <summary>📋 完整消費明細</summary>
        <div className="accordionBody">
          <ExpenseTable />
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
