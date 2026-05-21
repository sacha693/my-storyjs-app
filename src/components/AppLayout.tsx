import { Link, Outlet } from 'react-router-dom'

export function AppLayout() {
  return (
    <>
      <header className="topbar">
        <div className="topbarInner">
          <Link className="brand" to="/">
            金童家關西旅程
          </Link>

          <nav className="topnav">
            <Link to="/">首頁</Link>
            <Link to="/days">每日行程</Link>
            <Link to="/expense">旅費記帳</Link>
          </nav>
        </div>
      </header>

      <Outlet />
    </>
  )
}
