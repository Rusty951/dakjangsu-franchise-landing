import { Resend } from 'resend';

const SUCCESS_MESSAGE = '문의가 접수되었습니다. 담당자가 희망 지역과 창업 조건을 확인한 뒤 연락드리겠습니다.';
const SAFE_ERROR_MESSAGE = '문의 접수 연결을 확인 중입니다. 카카오톡 상담 또는 대표번호를 이용해 주세요.';
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX = 5;
const MAX_FIELD_LENGTH = 1000;

const rateLimitStore = globalThis.__dakjangsuLeadRateLimit || new Map();
globalThis.__dakjangsuLeadRateLimit = rateLimitStore;

const textFields = [
  'name',
  'phone',
  'region',
  'timeline',
  'currentBusiness',
  'preferredContactTime',
  'message',
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'landing_path',
  'referrer',
  'user_agent',
  'submitted_at'
];

const optionalLabels = [
  ['timeline', '창업 시기'],
  ['currentBusiness', '운영 형태'],
  ['preferredContactTime', '통화 가능 시간'],
  ['message', '남기실 말'],
  ['utm_source', 'UTM source'],
  ['utm_medium', 'UTM medium'],
  ['utm_campaign', 'UTM campaign'],
  ['utm_content', 'UTM content'],
  ['utm_term', 'UTM term'],
  ['landing_path', '랜딩 경로'],
  ['referrer', '이전 페이지'],
  ['submitted_at', '제출 시각']
];

const normalizePhone = (phone) => phone.replace(/[^\d]/g, '');

const escapeHtml = (value) =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');

const sanitizeText = (value) => {
  if (typeof value !== 'string') {
    return '';
  }

  return value.replace(/\s+/g, ' ').trim().slice(0, MAX_FIELD_LENGTH);
};

const parseEmails = (value) =>
  (value || '')
    .split(',')
    .map((email) => email.trim())
    .filter(Boolean);

const getClientIp = (request) => {
  const forwardedFor = request.headers['x-forwarded-for'];

  if (typeof forwardedFor === 'string' && forwardedFor.trim()) {
    return forwardedFor.split(',')[0].trim();
  }

  return request.socket?.remoteAddress || 'unknown';
};

const isRateLimited = (request) => {
  const now = Date.now();
  const ip = getClientIp(request);
  const current = rateLimitStore.get(ip) || [];
  const recent = current.filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS);

  if (recent.length >= RATE_LIMIT_MAX) {
    rateLimitStore.set(ip, recent);
    return true;
  }

  recent.push(now);
  rateLimitStore.set(ip, recent);
  return false;
};

const readJsonBody = async (request) => {
  if (request.body && typeof request.body === 'object' && !Buffer.isBuffer(request.body)) {
    return request.body;
  }

  if (typeof request.body === 'string') {
    return JSON.parse(request.body || '{}');
  }

  const chunks = [];

  for await (const chunk of request) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }

  if (chunks.length === 0) {
    return {};
  }

  return JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}');
};

const normalizeLead = (body) => {
  const lead = {};

  textFields.forEach((field) => {
    lead[field] = sanitizeText(body[field]);
  });

  lead.privacyConsent = body.privacyConsent === true;
  lead.phoneDigits = normalizePhone(lead.phone);

  return lead;
};

const validateLead = (lead) => {
  const errors = {};

  if (lead.name.length < 2) {
    errors.name = '성함을 2자 이상 입력해 주세요.';
  }

  if (lead.phoneDigits.length < 9 || lead.phoneDigits.length > 11) {
    errors.phone = '연락 가능한 번호를 입력해 주세요.';
  }

  if (lead.region.length < 2) {
    errors.region = '희망 지역을 입력해 주세요.';
  }

  if (!lead.privacyConsent) {
    errors.privacyConsent = '상담 연락을 위해 동의가 필요합니다.';
  }

  return errors;
};

const buildPlainTextEmail = (lead) => {
  const lines = [
    '[닭장수후라이드 창업 상담 신청]',
    '',
    `성함: ${lead.name}`,
    `연락처: ${lead.phone}`,
    `희망 지역: ${lead.region}`,
    ''
  ];

  optionalLabels.forEach(([key, label]) => {
    if (lead[key]) {
      lines.push(`${label}: ${lead[key]}`);
    }
  });

  if (lead.user_agent) {
    lines.push(`브라우저: ${lead.user_agent}`);
  }

  return lines.join('\n');
};

const buildHtmlEmail = (lead) => {
  const rows = [
    ['성함', lead.name],
    ['연락처', lead.phone],
    ['희망 지역', lead.region],
    ...optionalLabels.filter(([key]) => lead[key]).map(([key, label]) => [label, lead[key]])
  ];

  const tableRows = rows
    .map(
      ([label, value]) => `
        <tr>
          <th style="width: 150px; padding: 10px 12px; text-align: left; background: #f7f2e7; border: 1px solid #e5d9c5;">${escapeHtml(label)}</th>
          <td style="padding: 10px 12px; border: 1px solid #e5d9c5;">${escapeHtml(value).replaceAll('\n', '<br>')}</td>
        </tr>
      `
    )
    .join('');

  return `
    <div style="font-family: Arial, 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif; color: #142A4D; line-height: 1.6;">
      <h1 style="font-size: 22px; margin: 0 0 16px;">닭장수후라이드 창업 상담 신청</h1>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <tbody>${tableRows}</tbody>
      </table>
      <p style="margin-top: 16px; color: #6f665c; font-size: 12px;">
        이 메일은 랜딩페이지 상담 신청 폼에서 자동 발송되었습니다.
      </p>
    </div>
  `;
};

const sendLeadEmail = async (lead) => {
  const resendApiKey = process.env.RESEND_API_KEY;
  const to = parseEmails(process.env.LEAD_TO_EMAIL);
  const from = process.env.LEAD_FROM_EMAIL || 'Dakjangsu Franchise <onboarding@resend.dev>';
  const subjectPrefix = process.env.LEAD_EMAIL_SUBJECT_PREFIX || '[닭장수 창업상담]';

  if (!resendApiKey || to.length === 0) {
    const missing = [!resendApiKey && 'RESEND_API_KEY', to.length === 0 && 'LEAD_TO_EMAIL'].filter(Boolean);
    const error = new Error(`Missing lead email environment variables: ${missing.join(', ')}`);
    error.statusCode = 500;
    throw error;
  }

  const resend = new Resend(resendApiKey);
  const { error } = await resend.emails.send({
    from,
    to,
    subject: `${subjectPrefix} ${lead.name} / ${lead.region}`,
    text: buildPlainTextEmail(lead),
    html: buildHtmlEmail(lead)
  });

  if (error) {
    const sendError = new Error(error.message || 'Lead email send failed');
    sendError.statusCode = 502;
    throw sendError;
  }
};

const sendJson = (response, statusCode, body) => {
  response.status(statusCode).json(body);
};

export default async function handler(request, response) {
  response.setHeader('Cache-Control', 'no-store');

  if (request.method === 'OPTIONS') {
    response.status(204).end();
    return;
  }

  if (request.method !== 'POST') {
    sendJson(response, 405, { ok: false, message: 'POST 요청만 지원합니다.' });
    return;
  }

  if (isRateLimited(request)) {
    sendJson(response, 429, { ok: false, message: '잠시 후 다시 시도해 주세요.' });
    return;
  }

  try {
    const body = await readJsonBody(request);
    const lead = normalizeLead(body);
    const errors = validateLead(lead);

    if (Object.keys(errors).length > 0) {
      sendJson(response, 400, { ok: false, message: '필수 정보를 확인해 주세요.', errors });
      return;
    }

    await sendLeadEmail(lead);
    sendJson(response, 200, { ok: true, message: SUCCESS_MESSAGE });
  } catch (error) {
    const statusCode = error?.statusCode || (error instanceof SyntaxError ? 400 : 500);
    const message = error instanceof SyntaxError ? '요청 형식을 확인해 주세요.' : SAFE_ERROR_MESSAGE;

    console.error('[lead-api]', error?.message || error);
    sendJson(response, statusCode, { ok: false, message });
  }
}
