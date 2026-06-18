import { FormEvent, type ReactNode, useState } from 'react'
import { useDayPlans } from '../context/DayPlansContext'

type TripDataGateProps = {
  children: ReactNode
}

export function TripDataGate({ children }: TripDataGateProps) {
  const { loading, locked, error, unlock, reload } = useDayPlans()
  const [accessCode, setAccessCode] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (submitting || accessCode.length !== 4) {
      return
    }

    setSubmitting(true)

    try {
      await unlock(accessCode)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <section className="card hero secureGate">
        <span className="badge">安全後台</span>
        <h1>旅遊資料載入中...</h1>
        <p>正在從後台讀取行程、交通與住宿資料。</p>
      </section>
    )
  }

  if (locked) {
    return (
      <section className="card hero secureGate">
        <span className="badge">安全入口</span>
        <h1>輸入一次即可使用</h1>
        <p>第一次在這台手機輸入旅遊密碼後，之後打開 App 會自動進入。</p>

        <form className="secureGateForm" onSubmit={handleSubmit}>
          <label htmlFor="trip-access-code">旅遊密碼</label>
          <input
            id="trip-access-code"
            type="password"
            value={accessCode}
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={4}
            autoComplete="current-password"
            enterKeyHint="done"
            placeholder="4 位數密碼"
            aria-describedby="trip-access-code-help trip-access-code-error"
            onChange={(event) => setAccessCode(event.target.value.replace(/\D/g, '').slice(0, 4))}
          />
          <p className="secureGateHelp" id="trip-access-code-help">
            這台手機會記住解鎖狀態；清除網站資料後才需要重新輸入。
          </p>
          <button className="quickButton" type="submit" disabled={submitting || accessCode.length !== 4}>
            {submitting ? '確認中...' : '進入 App'}
          </button>
        </form>

        {error ? (
          <p className="secureGateError" id="trip-access-code-error" role="alert">
            {error}
          </p>
        ) : null}
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
