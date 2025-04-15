import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

import { PopupProvider, usePopup } from './PopupContext'

const Root = () => {
  const { isPopupOpen } = usePopup()

  return (
    <div className={`${isPopupOpen ? 'backdrop-blur-lg bg-opacity-60' : ''}`}>
      <App />
    </div>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <PopupProvider>
        <Root />
      </PopupProvider>
    </BrowserRouter>
  </StrictMode>
)
