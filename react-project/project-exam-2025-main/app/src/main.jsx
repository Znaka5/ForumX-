import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'

import './index.css'
import App from './App.jsx'
import { MyProvider } from './Components/Context/Context.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StrictMode>
      <MyProvider>
        <App />
      </MyProvider>
    </StrictMode>
  </BrowserRouter>
)
