import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { initGoogleAnalytics } from './utils/analytics.js'
import { initKarrotPixel } from './utils/karrotPixel.js'
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
initKarrotPixel()
initMetaPixel()
trackEvent('page_view', getPageViewEventData())

const rootElement = document.getElementById('root')
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)
const hasPrerenderedMarkup = rootElement.hasChildNodes()
const shouldHydrate = hasPrerenderedMarkup && !new URLSearchParams(window.location.search).has('concept')

if (shouldHydrate) {
  hydrateRoot(rootElement, app)
} else {
  if (hasPrerenderedMarkup) {
    rootElement.textContent = ''
  }

  createRoot(rootElement).render(app)
}
