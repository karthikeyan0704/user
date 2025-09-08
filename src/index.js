import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.js'
import { BrowserRouter } from 'react-router-dom'
import PlayerContextProvider from './context/PlayerContext.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <BrowserRouter>
   <PlayerContextProvider>
     <App />
   </PlayerContextProvider>
   
    </BrowserRouter>
  </StrictMode>,
)
