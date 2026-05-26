import { Link, Outlet, useLocation } from 'react-router-dom'

export function AppLayout() {
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  return (
    <>
      <header className="topbar" id="top">
        <div className="topbarInner">
          <Link className="brand" to="/">
            <span className="brandIcon">⛵</span>
            金童家關西旅程
          </Link>

          <nav className="topnav" aria-label="桌面主要導覽">
            <Link to="/">首頁</Link>
            <Link to="/days">每日行程</Link>
            <Link to="/expense">旅費記帳</Link>
          </nav>
        </div>
      </header>

      <Outlet />

      {!isHomePage ? (
        <>
          <nav className="bottomNav" aria-label="手機主要導覽">
            <Link to="/">🏠<span>首頁</span></Link>
            <Link to="/days">🗓️<span>行程</span></Link>
            <Link to="/expense">💰<span>記帳</span></Link>
            <Link to="/days/day-4">🎢<span>USJ</span></Link>
          </nav>

          <a className="floatingTop" href="#top" aria-label="回到頁面頂端">
            ↑
          </a>
        </>
      ) : null}
    </>
  )
}