const gaMeasurementId = import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-GH9NP6WFVN';

export const initGoogleAnalytics = () => {
  if (typeof window === 'undefined' || !gaMeasurementId || window.__dakjangsuGaInitialized) {
    return;
  }

  window.__dakjangsuGaInitialized = true;
  window.__dakjangsuGaMeasurementId = gaMeasurementId;
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag() {
    window.dataLayer.push(arguments);
  };

  window.gtag('js', new Date());
  window.gtag('config', gaMeasurementId);

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaMeasurementId)}`;
  document.head.appendChild(script);
};
