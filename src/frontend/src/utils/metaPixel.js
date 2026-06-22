const metaPixelId = import.meta.env.VITE_META_PIXEL_ID || '';

const META_STANDARD_EVENT_MAP = {
  page_view: 'PageView',
  click_kakao: 'Contact',
  click_phone: 'Contact',
  click_email: 'Contact',
  submit_lead: 'Lead',
};

const META_CUSTOM_EVENT_MAP = {
  click_instagram: 'ClickInstagram',
  click_youtube: 'ClickYoutube',
  click_blog: 'ClickBlog',
  floating_top_click: 'FloatingTopClick',
  floating_guide_click: 'FloatingGuideClick',
  lead_form_start: 'LeadFormStart',
  lead_form_submit: 'LeadFormSubmit',
  lead_form_error: 'LeadFormError',
  privacy_policy_open: 'PrivacyPolicyOpen',
};

const sanitizeMetaParam = (value) => {
  if (value === undefined || value === null) {
    return undefined;
  }

  if (Array.isArray(value)) {
    return value.join(',');
  }

  if (typeof value === 'object') {
    return JSON.stringify(value);
  }

  return value;
};

const getMetaParams = (eventData = {}) =>
  Object.entries(eventData).reduce((params, [key, value]) => {
    const sanitizedValue = sanitizeMetaParam(value);

    if (sanitizedValue !== undefined) {
      params[key] = sanitizedValue;
    }

    return params;
  }, { content_category: 'franchise_landing' });

export const initMetaPixel = () => {
  if (typeof window === 'undefined' || !metaPixelId || window.__dakjangsuMetaPixelInitialized) {
    return;
  }

  window.__dakjangsuMetaPixelInitialized = true;
  window.__dakjangsuMetaPixelId = metaPixelId;

  window.fbq = window.fbq || function fbq() {
    if (window.fbq.callMethod) {
      window.fbq.callMethod.apply(window.fbq, arguments);
      return;
    }

    window.fbq.queue.push(arguments);
  };

  if (!window._fbq) {
    window._fbq = window.fbq;
  }

  window.fbq.push = window.fbq;
  window.fbq.loaded = true;
  window.fbq.version = '2.0';
  window.fbq.queue = window.fbq.queue || [];

  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://connect.facebook.net/en_US/fbevents.js';
  document.head.appendChild(script);

  window.fbq('init', metaPixelId);
};

export const trackMetaPixelEvent = (eventName, eventData = {}) => {
  if (typeof window === 'undefined' || typeof window.fbq !== 'function') {
    return;
  }

  const metaParams = getMetaParams(eventData);
  const standardEventName = META_STANDARD_EVENT_MAP[eventName];

  if (standardEventName) {
    window.fbq('track', standardEventName, metaParams);
    return;
  }

  const customEventName = META_CUSTOM_EVENT_MAP[eventName];

  if (customEventName) {
    window.fbq('trackCustom', customEventName, metaParams);
  }
};
