import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './context/AuthContext'
import { DashboardProvider } from './context/DashboardContext'
import { ToastProvider } from './context/ToastContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <DashboardProvider>
        <ToastProvider>
          <App />
        </ToastProvider>
      </DashboardProvider>
    </AuthProvider>
  </StrictMode>,
)
