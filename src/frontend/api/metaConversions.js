import { createHash, randomUUID } from 'node:crypto';

const META_GRAPH_API_VERSION = 'v25.0';
const META_EVENT_NAME = 'Lead';
const MAX_EVENT_ID_LENGTH = 100;
const MAX_BROWSER_ID_LENGTH = 255;

const getHeader = (request, name) => {
  const value = request?.headers?.[name];

  if (Array.isArray(value)) {
    return value[0] || '';
  }

  return typeof value === 'string' ? value.trim() : '';
};

const getClientIp = (request) => {
  const forwardedFor = getHeader(request, 'x-forwarded-for');

  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }

  return getHeader(request, 'x-real-ip') || request?.socket?.remoteAddress || '';
};

const sanitizeEventId = (value) => {
  if (typeof value !== 'string') {
    return '';
  }

  const eventId = value.trim();

  if (!eventId || eventId.length > MAX_EVENT_ID_LENGTH || !/^[A-Za-z0-9._:-]+$/.test(eventId)) {
    return '';
  }

  return eventId;
};

const sanitizeBrowserId = (value) => {
  if (typeof value !== 'string') {
    return '';
  }

  const browserId = value.trim();

  if (!browserId.startsWith('fb.') || browserId.length > MAX_BROWSER_ID_LENGTH || /\s/.test(browserId)) {
    return '';
  }

  return browserId;
};

const sanitizeEventSourceUrl = (value) => {
  if (typeof value !== 'string' || !value.trim()) {
    return '';
  }

  try {
    const url = new URL(value.trim());
    return url.protocol === 'https:' || url.protocol === 'http:' ? url.toString() : '';
  } catch {
    return '';
  }
};

const getEventSourceUrl = (lead, request) => {
  const referer = sanitizeEventSourceUrl(getHeader(request, 'referer'));

  if (referer) {
    return referer;
  }

  const suppliedUrl = sanitizeEventSourceUrl(lead.event_source_url);

  if (suppliedUrl) {
    return suppliedUrl;
  }

  const host = getHeader(request, 'x-forwarded-host') || getHeader(request, 'host');
  const protocol = getHeader(request, 'x-forwarded-proto') || 'https';

  if (!host || !/^https?$/.test(protocol)) {
    return '';
  }

  return sanitizeEventSourceUrl(`${protocol}://${host}/`);
};

export const normalizePhoneForMeta = (phone) => {
  const digits = String(phone || '').replace(/\D/g, '');

  if (!digits) {
    return '';
  }

  if (digits.startsWith('82')) {
    return digits;
  }

  if (digits.startsWith('0')) {
    return `82${digits.slice(1)}`;
  }

  return digits;
};

export const hashMetaUserData = (value) =>
  createHash('sha256').update(String(value).trim().toLowerCase()).digest('hex');

export const buildMetaLeadEvent = ({ lead, request, now = Date.now() }) => {
  const normalizedPhone = normalizePhoneForMeta(lead.phoneDigits || lead.phone);
  const eventId = sanitizeEventId(lead.event_id) || randomUUID();
  const userData = {};
  const clientIpAddress = getClientIp(request);
  const clientUserAgent = getHeader(request, 'user-agent') || lead.user_agent;
  const fbp = sanitizeBrowserId(lead.fbp);
  const fbc = sanitizeBrowserId(lead.fbc);

  if (normalizedPhone) {
    userData.ph = [hashMetaUserData(normalizedPhone)];
  }

  if (clientIpAddress) {
    userData.client_ip_address = clientIpAddress;
  }

  if (clientUserAgent) {
    userData.client_user_agent = clientUserAgent;
  }

  if (fbp) {
    userData.fbp = fbp;
  }

  if (fbc) {
    userData.fbc = fbc;
  }

  const event = {
    event_name: META_EVENT_NAME,
    event_time: Math.floor(now / 1000),
    event_id: eventId,
    action_source: 'website',
    user_data: userData
  };
  const eventSourceUrl = getEventSourceUrl(lead, request);

  if (eventSourceUrl) {
    event.event_source_url = eventSourceUrl;
  }

  return event;
};

const parseMetaResponse = (text) => {
  if (!text) {
    return {};
  }

  try {
    return JSON.parse(text);
  } catch {
    return {};
  }
};

export const sendMetaLeadEvent = async ({
  lead,
  request,
  env = process.env,
  fetchImpl = globalThis.fetch,
  now = Date.now()
}) => {
  if (lead.metaCapiConsent !== true) {
    return { sent: false, reason: 'consent_not_granted' };
  }

  const pixelId = env.META_PIXEL_ID?.trim();
  const accessToken = env.META_CAPI_ACCESS_TOKEN?.trim();

  if (!pixelId || !accessToken) {
    return { sent: false, reason: 'not_configured' };
  }

  if (typeof fetchImpl !== 'function') {
    throw new Error('Meta CAPI fetch is unavailable');
  }

  const event = buildMetaLeadEvent({ lead, request, now });
  const payload = { data: [event] };
  const testEventCode = env.META_TEST_EVENT_CODE?.trim();
  const signal = typeof AbortSignal.timeout === 'function' ? AbortSignal.timeout(3000) : undefined;

  if (testEventCode) {
    payload.test_event_code = testEventCode;
  }

  const response = await fetchImpl(
    `https://graph.facebook.com/${META_GRAPH_API_VERSION}/${encodeURIComponent(pixelId)}/events`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
      signal
    }
  );
  const responseBody = parseMetaResponse(await response.text());

  if (!response.ok || responseBody.error || responseBody.events_received === 0) {
    const errorCode = responseBody.error?.code ? ` (${responseBody.error.code})` : '';
    throw new Error(`Meta CAPI request failed${errorCode}`);
  }

  return {
    sent: true,
    eventId: event.event_id,
    eventsReceived: responseBody.events_received,
    traceId: responseBody.fbtrace_id
  };
};
