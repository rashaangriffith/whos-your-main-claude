import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { MainsProvider } from './context/FavoritesContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MainsProvider>
      <App />
    </MainsProvider>
  </StrictMode>,
)
