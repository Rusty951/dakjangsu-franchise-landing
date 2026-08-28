const karrotPixelId =
  import.meta.env?.VITE_KARROT_PIXEL_ID || '1785301238064995001';

const KARROT_EVENT_MAP = {
  page_view: 'ViewPage',
  lead_form_start: 'Lead',
  submit_lead: 'SubmitApplication',
};

export const initKarrotPixel = () => {
  if (
    typeof window === 'undefined' ||
    !karrotPixelId ||
    window.__dakjangsuKarrotPixelInitialized
  ) {
    return;
  }

  window.__dakjangsuKarrotPixelInitialized = true;
  window.__dakjangsuKarrotPixelId = karrotPixelId;

  if (!window.karrotPixel) {
    const karrotPixel = {
      stub: true,
      queue: [],
      init() {
        karrotPixel.queue.push(['init', arguments, Date.now()]);
      },
      track() {
        karrotPixel.queue.push(['track', arguments, Date.now()]);
      },
    };

    window.karrotPixel = karrotPixel;

    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://karrot-pixel.business.daangn.com/karrot-pixel.js';

    const firstScript = document.getElementsByTagName('script')[0];
    if (firstScript?.parentNode) {
      firstScript.parentNode.insertBefore(script, firstScript);
    } else {
      document.head.appendChild(script);
    }
  }

  window.karrotPixel.init(karrotPixelId);
};

export const trackKarrotPixelEvent = (eventName) => {
  if (typeof window === 'undefined' || typeof window.karrotPixel?.track !== 'function') {
    return;
  }

  const karrotEventName = KARROT_EVENT_MAP[eventName];
  if (karrotEventName) {
    window.karrotPixel.track(karrotEventName);
  }
};
