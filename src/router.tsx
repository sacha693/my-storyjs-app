import { lazy, Suspense } from 'react'
import {
  createBrowserRouter,
  RouterProvider
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

function withSuspense(element: React.ReactNode) {
  return <Suspense fallback={<PageLoader />}>{element}</Suspense>
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
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
        path: 'expense',
        element: withSuspense(<ExpensePage />)
      }
    ]
  }
], {
  basename: '/my-storyjs-app'
})

export function AppRouter() {
  return <RouterProvider router={router} />
}
