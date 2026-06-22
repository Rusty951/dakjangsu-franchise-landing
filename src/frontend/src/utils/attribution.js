const ATTRIBUTION_PRESETS = {
  '/instagram': {
    utm_source: 'instagram',
    utm_medium: 'profile',
    utm_campaign: 'franchise_launch_2606',
    utm_content: 'bio_link',
  },
  '/ig': {
    utm_source: 'instagram',
    utm_medium: 'profile',
    utm_campaign: 'franchise_launch_2606',
    utm_content: 'bio_link',
  },
  '/youtube': {
    utm_source: 'youtube',
    utm_medium: 'social',
    utm_campaign: 'franchise_launch_2606',
    utm_content: 'video_description',
  },
  '/blog': {
    utm_source: 'naver_blog',
    utm_medium: 'blog',
    utm_campaign: 'franchise_launch_2606',
    utm_content: 'post_cta',
  },
  '/threads': {
    utm_source: 'threads',
    utm_medium: 'social',
    utm_campaign: 'franchise_launch_2606',
    utm_content: 'profile_link',
  },
};

const ATTRIBUTION_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'meta_campaign_id',
  'meta_adset_id',
  'meta_ad_id',
];

const normalizePathname = (pathname = '') => {
  const normalizedPath = pathname.replace(/\/+$/, '');

  return normalizedPath || '/';
};

export const getLandingAttribution = () => {
  if (typeof window === 'undefined') {
    return {};
  }

  const params = new URLSearchParams(window.location.search);
  const preset = ATTRIBUTION_PRESETS[normalizePathname(window.location.pathname)] || {};

  const attribution = ATTRIBUTION_KEYS.reduce((fields, key) => {
    fields[key] = params.get(key) || preset[key] || '';
    return fields;
  }, {});

  return {
    ...attribution,
    landing_path: `${window.location.pathname}${window.location.search}`,
    referrer: document.referrer || '',
  };
};
