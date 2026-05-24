import { lazy, Suspense, type ReactNode } from 'react'
import {
  createBrowserRouter,
  RouterProvider,
  useRouteError
} from 'react-router-dom'

import { AppLayout } from './components/AppLayout'

const HomePage = lazy(() =>
  import('./pages/HomePage').then((module) => ({
    default: module.HomePage
  }))
)

const DaysPage = lazy(() =>
  import('./pages/DaysPage').then((module) => ({
    default: module.DaysPage
  }))
)

const DayDetailPage = lazy(() =>
  import('./pages/DayDetailPage').then((module) => ({
    default: module.DayDetailPage
  }))
)

const ExpensePage = lazy(() =>
  import('./pages/ExpensePage').then((module) => ({
    default: module.ExpensePage
  }))
)

function PageLoader() {
  return (
    <section className="card hero">
      <span className="badge">Loading</span>
      <h1>頁面載入中...</h1>
    </section>
  )
}

function AppErrorBoundary() {
  const error = useRouteError()
  const message = error instanceof Error ? error.message : '頁面載入時發生錯誤。'

  return (
    <main className="wrap">
      <section className="card hero">
        <span className="badge">系統提醒</span>
        <h1>頁面暫時無法載入</h1>
        <p>{message}</p>
        <a className="quickButton" href="/my-storyjs-app/">
          回首頁
        </a>
      </section>
    </main>
  )
}

function withSuspense(element: ReactNode) {
  return <Suspense fallback={<PageLoader />}>{element}</Suspense>
}

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <AppLayout />,
      errorElement: <AppErrorBoundary />,
      children: [
        {
          index: true,
          element: withSuspense(<HomePage />)
        },
        {
          path: 'days',
          element: withSuspense(<DaysPage />)
        },
        {
          path: 'days/:dayId',
          element: withSuspense(<DayDetailPage />)
        },
        {
          path: 'expense',
          element: withSuspense(<ExpensePage />)
        }
      ]
    }
  ],
  {
    basename: '/my-storyjs-app'
  }
)

export function AppRouter() {
  return <RouterProvider router={router} />
}
