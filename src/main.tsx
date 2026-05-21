import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles.css'

function App() {
  return (
    <main className="wrap">
      <section className="card hero">
        <span className="badge">Vite + React + TypeScript</span>
        <h1>金童家關西旅程</h1>
        <p>正式框架化版本已建立。</p>
      </section>

      <section className="grid">
        <article className="card">
          <h2>🗓️ 行程系統</h2>
          <p>下一步將拆分成 data 與 component。</p>
        </article>

        <article className="card">
          <h2>💰 Supabase 記帳</h2>
          <p>將重構成 React 狀態管理。</p>
        </article>

        <article className="card">
          <h2>🚃 交通模組</h2>
          <p>去回程交通與出口資訊將 component 化。</p>
        </article>
      </section>
    </main>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
