import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { PrintingProvider } from './context/PrintingContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PrintingProvider>
      <App />
    </PrintingProvider>
  </StrictMode>,
)
