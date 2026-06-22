import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { initGoogleAnalytics } from './utils/analytics.js'
import { initMetaPixel } from './utils/metaPixel.js'

initGoogleAnalytics()
initMetaPixel()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
