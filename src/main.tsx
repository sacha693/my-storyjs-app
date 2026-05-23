import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles.css'
import { AppRouter } from './router'

const redirectPath = sessionStorage.getItem('spa-redirect-path')

if (redirectPath) {
  sessionStorage.removeItem('spa-redirect-path')
  window.history.replaceState(null, '', `/my-storyjs-app${redirectPath}`)
}

const root = document.getElementById('root')

if (!root) {
  document.body.innerHTML = '<p style="padding:16px;font-family:sans-serif">App 載入失敗：找不到 root 容器。</p>'
  throw new Error('Root element not found')
}

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
)
