import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { initGoogleAnalytics } from './utils/analytics.js'
import { initMetaPixel } from './utils/metaPixel.js'
import { trackEvent } from './utils/tracking.js'
import { getLandingAttribution } from './utils/attribution.js'

const getPageViewEventData = () => {
  if (typeof window === 'undefined') {
    return { section: 'landing_page' };
  }

  return {
    section: 'landing_page',
    ...getLandingAttribution(),
    page_location: window.location.href,
    page_path: `${window.location.pathname}${window.location.search}`,
    page_title: document.title,
  };
}

initGoogleAnalytics()
initMetaPixel()
trackEvent('page_view', getPageViewEventData())

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
