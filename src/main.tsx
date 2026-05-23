import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles.css'
import { AppRouter } from './router'

const redirectPath = sessionStorage.getItem('spa-redirect-path')

if (redirectPath) {
  sessionStorage.removeItem('spa-redirect-path')

  const target = `/my-storyjs-app${redirectPath}`

  window.history.replaceState(null, '', target)
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
)
