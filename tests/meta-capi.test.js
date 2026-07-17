import assert from 'node:assert/strict';
import test from 'node:test';
import {
  buildMetaLeadEvent,
  hashMetaUserData,
  normalizePhoneForMeta,
  sendMetaLeadEvent
} from '../src/frontend/api/metaConversions.js';
import { deliverLead } from '../src/frontend/api/leads.js';
import { trackMetaPixelEvent } from '../src/frontend/src/utils/metaPixel.js';

const request = {
  headers: {
    'x-forwarded-for': '203.0.113.10, 10.0.0.1',
    'user-agent': 'Dakjangsu Test Browser',
    referer: 'https://dakjangsu.example/instagram?utm_source=instagram'
  },
  socket: {}
};

const lead = {
  phone: '010-1234-5678',
  phoneDigits: '01012345678',
  event_id: 'lead_shared-event-id',
  event_source_url: 'https://dakjangsu.example/instagram?fbclid=test-click',
  fbp: 'fb.1.1700000000000.123456789',
  fbc: 'fb.1.1700000000000.test-click',
  user_agent: 'Client supplied browser',
  metaCapiConsent: true
};

test('normalizes Korean phone numbers before SHA-256 hashing', () => {
  assert.equal(normalizePhoneForMeta('010-1234-5678'), '821012345678');
  assert.equal(normalizePhoneForMeta('+82 10-1234-5678'), '821012345678');
  assert.equal(hashMetaUserData('821012345678').length, 64);
  assert.notEqual(hashMetaUserData('821012345678'), '01012345678');
});

test('builds a website Lead event with matching and attribution data', () => {
  const event = buildMetaLeadEvent({ lead, request, now: 1_720_000_000_000 });

  assert.equal(event.event_name, 'Lead');
  assert.equal(event.event_id, lead.event_id);
  assert.equal(event.event_time, 1_720_000_000);
  assert.equal(event.action_source, 'website');
  assert.equal(event.event_source_url, request.headers.referer);
  assert.deepEqual(event.user_data.ph, [hashMetaUserData('821012345678')]);
  assert.equal(event.user_data.client_ip_address, '203.0.113.10');
  assert.equal(event.user_data.client_user_agent, 'Dakjangsu Test Browser');
  assert.equal(event.user_data.fbp, lead.fbp);
  assert.equal(event.user_data.fbc, lead.fbc);
  assert.equal(JSON.stringify(event).includes('01012345678'), false);
});

test('sends the CAPI token as the Graph API access_token and includes test_event_code temporarily', async () => {
  let capturedUrl = '';
  let capturedOptions;
  const fakeToken = 'test-token-not-a-secret';
  const result = await sendMetaLeadEvent({
    lead,
    request,
    env: {
      META_PIXEL_ID: '1976009553081377',
      META_CAPI_ACCESS_TOKEN: fakeToken,
      META_TEST_EVENT_CODE: 'TEST12345'
    },
    now: 1_720_000_000_000,
    fetchImpl: async (url, options) => {
      capturedUrl = url;
      capturedOptions = options;
      return {
        ok: true,
        text: async () => JSON.stringify({ events_received: 1, fbtrace_id: 'trace-id' })
      };
    }
  });
  const body = JSON.parse(capturedOptions.body);

  assert.equal(result.sent, true);
  assert.equal(result.eventId, lead.event_id);
  const requestUrl = new URL(capturedUrl);
  assert.match(requestUrl.pathname, /\/v25\.0\/1976009553081377\/events$/);
  assert.equal(requestUrl.searchParams.get('access_token'), fakeToken);
  assert.equal(capturedOptions.headers.Authorization, undefined);
  assert.equal(body.test_event_code, 'TEST12345');
  assert.equal(body.data[0].event_id, lead.event_id);
});

test('does not call Meta when optional consent is absent', async () => {
  let fetchCalled = false;
  const result = await sendMetaLeadEvent({
    lead: { ...lead, metaCapiConsent: false },
    request,
    env: {
      META_PIXEL_ID: '1976009553081377',
      META_CAPI_ACCESS_TOKEN: 'test-token-not-a-secret'
    },
    fetchImpl: async () => {
      fetchCalled = true;
    }
  });

  assert.deepEqual(result, { sent: false, reason: 'consent_not_granted' });
  assert.equal(fetchCalled, false);
});

test('passes the same event_id to the browser Pixel Lead event', () => {
  const calls = [];
  const previousWindow = globalThis.window;

  globalThis.window = {
    fbq: (...args) => calls.push(args)
  };

  try {
    trackMetaPixelEvent('submit_lead', {
      event_id: lead.event_id,
      section: 'lead_capture_form'
    });
  } finally {
    globalThis.window = previousWindow;
  }

  assert.deepEqual(calls, [
    [
      'track',
      'Lead',
      { content_category: 'franchise_landing', section: 'lead_capture_form' },
      { eventID: lead.event_id }
    ]
  ]);
});

test('keeps an emailed inquiry successful when Meta CAPI fails', async () => {
  const calls = [];

  await deliverLead(lead, request, {
    emailSender: async () => calls.push('email'),
    metaSender: async () => {
      calls.push('meta');
      throw new Error('simulated Meta outage');
    },
    logger: {
      warn: (...args) => calls.push(['warn', ...args]),
      error: (...args) => calls.push(['error', ...args])
    }
  });

  assert.equal(calls[0], 'email');
  assert.equal(calls[1], 'meta');
  assert.deepEqual(calls[2], ['error', '[meta-capi]', 'simulated Meta outage']);
});

test('does not send Meta when the email inquiry fails', async () => {
  let metaCalled = false;

  await assert.rejects(
    deliverLead(lead, request, {
      emailSender: async () => {
        throw new Error('simulated email outage');
      },
      metaSender: async () => {
        metaCalled = true;
      }
    }),
    /simulated email outage/
  );

  assert.equal(metaCalled, false);
});
