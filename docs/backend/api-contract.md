# Lead API Contract

## Endpoint

`POST /api/leads`

## Required Fields

- `name`
- `phone`
- `region`
- `privacyConsent`

## Optional Fields

- `budget`
- `timeline`
- `ownerOperated`
- `currentBusiness`
- `storeSize`
- `preferredContactTime`
- `message`
- `metaCapiConsent` (Meta Lead 전환 측정 선택 동의, 기본값 `false`)

## Tracking Fields

- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_content`
- `utm_term`
- `landing_path`
- `referrer`
- `user_agent`
- `submitted_at`
- `event_id`
- `event_source_url`
- `fbp`
- `fbc`

## Request Example

```json
{
  "name": "홍길동",
  "phone": "010-0000-0000",
  "region": "천안",
  "privacyConsent": true,
  "metaCapiConsent": true,
  "budget": "상담 후 결정",
  "timeline": "3개월 이내",
  "ownerOperated": "직접 운영 예정",
  "message": "기존 매장 전환 가능 여부가 궁금합니다.",
  "utm": {
    "source": "instagram",
    "medium": "profile",
    "campaign": "franchise_landing"
  }
}
```

## Success Response

```json
{
  "ok": true,
  "message": "문의가 접수되었습니다. 담당자가 희망 지역과 창업 조건을 확인한 뒤 연락드리겠습니다."
}
```

## Error Rules

- Missing required fields: `400`.
- Invalid phone format: `400`.
- Rate limit: `429`.
- Internal failure: `500`, with safe user-facing message only.

## Implementation Notes

- Normalize phone server-side.
- Send the first notification through Resend email.
- `LEAD_TO_EMAIL` can be changed from the test recipient to the client recipient without code changes.
- Store leads in Google Sheets, Airtable, or a later CRM adapter if persistent lead history is required.
- Keep all credentials in `.env.local`.
- Separate storage failure from notification failure in logs.
- Email notification success remains the lead API success boundary. Meta CAPI is best-effort and must not turn a successfully emailed inquiry into an API error.
- When `metaCapiConsent` is true, send browser Pixel `Lead` and server CAPI `Lead` with the same `event_id` for deduplication.
- Normalize the Korean phone number with country code `82`, hash it with SHA-256 on the server, and never send the raw phone number to Meta.
- Send `action_source=website` and include `event_source_url`, server-derived IP, request user agent, `_fbp`, and `_fbc` when available.
- Remove `META_TEST_EVENT_CODE` after Events Manager Test Events validation.

## Environment

- `RESEND_API_KEY`: Resend API key.
- `LEAD_TO_EMAIL`: comma-separated recipient list.
- `LEAD_FROM_EMAIL`: sender identity, defaults to `Dakjangsu Franchise <onboarding@resend.dev>` for testing.
- `LEAD_EMAIL_SUBJECT_PREFIX`: optional subject prefix.
- `META_PIXEL_ID`: server-side Meta Pixel/dataset ID.
- `META_CAPI_ACCESS_TOKEN`: server-only Conversions API access token.
- `META_TEST_EVENT_CODE`: temporary Events Manager test code; remove after verification.
