import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'

import { AppLayout } from './components/AppLayout'
import { HomePage } from './pages/HomePage'
import { DaysPage } from './pages/DaysPage'
import { ExpensePage } from './pages/ExpensePage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'days',
        element: <DaysPage />
      },
      {
        path: 'expense',
        element: <ExpensePage />
      }
    ]
  }
], {
  basename: '/my-storyjs-app'
})

export function AppRouter() {
  return <RouterProvider router={router} />
}
