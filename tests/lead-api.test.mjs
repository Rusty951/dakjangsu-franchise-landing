import assert from 'node:assert/strict';
import { beforeEach, test } from 'node:test';
import handler from '../src/frontend/api/leads.js';

let requestId = 0;
const validLead = { name: '검수용', phone: '010-0000-0000', region: '테스트지역', privacyConsent: true };

beforeEach(t => {
  const names = ['VITE_REVIEW_ONLY', 'RESEND_API_KEY', 'LEAD_TO_EMAIL', 'LEAD_FROM_EMAIL'];
  const previous = Object.fromEntries(names.map(name => [name, process.env[name]]));
  names.forEach(name => delete process.env[name]);
  t.after(() => names.forEach(name => {
    if (previous[name] === undefined) delete process.env[name];
    else process.env[name] = previous[name];
  }));
  // Every test is offline, including unexpected provider calls.
  t.mock.method(globalThis, 'fetch', async () => { throw new Error('Unexpected network request'); });
  t.mock.method(console, 'error', () => {});
});

async function request(body, { method = 'POST', ip = `local-test-${++requestId}` } = {}) {
  const response = {
    headers: {},
    setHeader(key, value) { this.headers[key] = value; },
    status(code) { this.statusCode = code; return this; },
    json(payload) { this.body = payload; },
    end() {},
  };
  await handler({ method, headers: { 'x-forwarded-for': ip }, body }, response);
  return response;
}

function configureFakeProvider() {
  process.env.RESEND_API_KEY = 're_test_local_only';
  process.env.LEAD_TO_EMAIL = 'qa@example.invalid';
  process.env.LEAD_FROM_EMAIL = 'Sample <qa@example.invalid>';
}

test('review deployment refuses even a valid lead before contacting the provider', async () => {
  process.env.VITE_REVIEW_ONLY = 'true';
  configureFakeProvider();
  const response = await request(validLead);
  assert.equal(response.statusCode, 403);
  assert.equal(response.body.ok, false);
  assert.equal(globalThis.fetch.mock.calls.length, 0);
});

test('required fields and consent fail with actionable errors', async () => {
  const response = await request({ name: ' ', phone: '123', region: '', privacyConsent: 'true' });
  assert.equal(response.statusCode, 400);
  assert.deepEqual(Object.keys(response.body.errors).sort(), ['name', 'phone', 'privacyConsent', 'region']);
  assert.equal(globalThis.fetch.mock.calls.length, 0);
});

test('malformed or non-object JSON is a client error, never an internal error', async () => {
  for (const body of ['{', 'null', '[]', '42', '"text"']) {
    const response = await request(body);
    assert.equal(response.statusCode, 400, body);
    assert.equal(response.body.ok, false);
  }
});

test('method, preflight and rate limit contracts hold', async () => {
  assert.equal((await request({}, { method: 'GET' })).statusCode, 405);
  assert.equal((await request({}, { method: 'OPTIONS' })).statusCode, 204);
  for (let i = 0; i < 5; i++) assert.equal((await request({}, { ip: 'rate-limit-test' })).statusCode, 400);
  const limited = await request({}, { ip: 'rate-limit-test' });
  assert.equal(limited.statusCode, 429);
  assert.equal(limited.headers['Cache-Control'], 'no-store');
});

test('missing provider configuration returns only the safe user message', async () => {
  const response = await request(validLead);
  assert.equal(response.statusCode, 500);
  assert.doesNotMatch(response.body.message, /RESEND|LEAD_TO|environment/);
  assert.equal(globalThis.fetch.mock.calls.length, 0);
});

test('valid production lead preserves attribution and escapes email markup', async () => {
  configureFakeProvider();
  let outbound;
  globalThis.fetch.mock.mockImplementation(async (url, options) => {
    assert.equal(String(url), 'https://api.resend.com/emails');
    outbound = JSON.parse(options.body);
    return new Response(JSON.stringify({ id: 'offline-test-id' }), { status: 200 });
  });
  const response = await request({ ...validLead, name: '<검수>', message: '<script>sample</script>', utm_source: 'test' });
  assert.equal(response.statusCode, 200);
  assert.equal(response.body.ok, true);
  assert.deepEqual(outbound.to, ['qa@example.invalid']);
  assert.match(outbound.html, /&lt;script&gt;sample&lt;\/script&gt;/);
  assert.doesNotMatch(outbound.html, /<script>/);
  assert.match(outbound.text, /UTM source: test/);
});

test('provider failure never claims success or exposes provider details', async () => {
  configureFakeProvider();
  globalThis.fetch.mock.mockImplementation(async () => new Response(
    JSON.stringify({ message: 'private provider detail', name: 'application_error' }), { status: 503 },
  ));
  const response = await request(validLead);
  assert.equal(response.statusCode, 502);
  assert.equal(response.body.ok, false);
  assert.doesNotMatch(response.body.message, /private provider detail/);
});
