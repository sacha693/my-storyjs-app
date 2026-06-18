import { type ReactNode } from 'react'
import { useDayPlans } from '../context/DayPlansContext'

type TripDataGateProps = {
  children: ReactNode
}

export function TripDataGate({ children }: TripDataGateProps) {
  const { loading, error, reload } = useDayPlans()

  if (loading) {
    return (
      <section className="card hero secureGate">
        <span className="badge">安全後台</span>
        <h1>旅遊資料載入中...</h1>
        <p>正在從後台讀取行程、交通與住宿資料。</p>
      </section>
    )
  }

  if (error) {
    return (
      <section className="card hero secureGate">
        <span className="badge">系統提醒</span>
        <h1>旅遊資料暫時無法載入</h1>
        <p>{error}</p>
        <button className="quickButton" type="button" onClick={reload}>
          重新讀取
        </button>
      </section>
    )
  }

  return <>{children}</>
}
