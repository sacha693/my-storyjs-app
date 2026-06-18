import { FormEvent, type ReactNode, useState } from 'react'
import { useDayPlans } from '../context/DayPlansContext'

type TripDataGateProps = {
  children: ReactNode
}

export function TripDataGate({ children }: TripDataGateProps) {
  const { loading, locked, error, unlock, reload } = useDayPlans()
  const [passphrase, setPassphrase] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (submitting) {
      return
    }

    setSubmitting(true)

    try {
      await unlock(passphrase)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <section className="card hero">
        <span className="badge">安全後台</span>
        <h1>旅遊資料解密載入中...</h1>
        <p>正在讀取加密行程資料，請稍候。</p>
      </section>
    )
  }

  if (locked) {
    return (
      <section className="card hero secureGate">
        <span className="badge">安全後台</span>
        <h1>旅遊資料已加密</h1>
        <p>請輸入 4 位數旅遊 PIN。完整交通路線、訂單與住宿資訊只會在解密成功後顯示。</p>

        <form className="secureGateForm" onSubmit={handleSubmit}>
          <label htmlFor="trip-passphrase">旅遊 PIN</label>
          <input
            id="trip-passphrase"
            type="password"
            value={passphrase}
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={4}
            autoComplete="current-password"
            enterKeyHint="done"
            placeholder="4 位數 PIN"
            aria-describedby="trip-passphrase-help trip-passphrase-error"
            onChange={(event) => setPassphrase(event.target.value.replace(/\D/g, '').slice(0, 4))}
          />
          <p className="secureGateHelp" id="trip-passphrase-help">
            PIN 不會寫入程式碼，只會暫存在本次瀏覽器分頁中用來解密資料。
          </p>
          <button className="quickButton" type="submit" disabled={submitting || passphrase.length !== 4}>
            {submitting ? '解鎖中...' : '解鎖行程'}
          </button>
        </form>

        {error ? (
          <p className="secureGateError" id="trip-passphrase-error" role="alert">
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
