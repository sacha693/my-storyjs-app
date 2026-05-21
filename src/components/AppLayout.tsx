import { Link, Outlet } from 'react-router-dom'

export function AppLayout() {
  return (
    <>
      <header className="topbar">
        <div className="topbarInner">
          <Link className="brand" to="/">
            <span className="brandIcon">⛵</span>
            金童家關西旅程
          </Link>

          <nav className="topnav" aria-label="主要導覽">
            <Link to="/">首頁</Link>
            <Link to="/days">每日行程</Link>
            <Link to="/expense">旅費記帳</Link>
          </nav>
        </div>
      </header>

      <Outlet />

      <nav className="floatingActions" aria-label="快速操作">
        <Link to="/days">🗓️ 行程</Link>
        <Link to="/expense">💰 記帳</Link>
        <a href="#top">⬆️ TOP</a>
      </nav>
    </>
  )
}
