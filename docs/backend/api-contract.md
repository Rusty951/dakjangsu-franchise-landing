# Lead API Contract

## Endpoint

`POST /api/leads`

## Required Fields

- `name`
- `phone`
- `region`
- `privacyConsent`

## Optional Fields

- `timeline`
- `currentBusiness`
- `preferredContactTime`
- `message`

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

## Request Example

```json
{
  "name": "홍길동",
  "phone": "010-0000-0000",
  "region": "천안",
  "privacyConsent": true,
  "timeline": "3개월 이내",
  "currentBusiness": "직접 운영 예정",
  "message": "기존 매장 전환 가능 여부가 궁금합니다.",
  "utm_source": "instagram",
  "utm_medium": "profile",
  "utm_campaign": "franchise_landing"
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
- Malformed JSON or a non-object body: `400`.
- Invalid phone format: `400`.
- Review-only deployment: `403`, without provider access.
- Rate limit: `429`.
- Internal failure: `500`, with safe user-facing message only.
- Email provider failure: `502`, with the same safe message.

## Implementation Notes

- Normalize phone server-side.
- Send the first notification through Resend email.
- `LEAD_TO_EMAIL` can be changed from the test recipient to the client recipient without code changes.
- Store leads in Google Sheets, Airtable, or a later CRM adapter if persistent lead history is required.
- Keep all credentials in `.env.local`.
- Separate storage failure from notification failure in logs.
- The current rate limit is in-memory per server instance, not a distributed quota.
- Run `npm test` for offline request/validation/provider-success/provider-failure checks. Provider calls are mocked; this is not an email-delivery test.

## Environment

- `RESEND_API_KEY`: Resend API key.
- `LEAD_TO_EMAIL`: comma-separated recipient list.
- `LEAD_FROM_EMAIL`: required sender identity.
- `LEAD_EMAIL_SUBJECT_PREFIX`: optional subject prefix.
- `VITE_REVIEW_ONLY=true`: required in both the build and function runtime of the client sample. The build opens the rebrand view by default, skips analytics, disables form submission and emits noindex HTML. The runtime rejects lead requests before reading or sending their contents. Deploy the sample with both `--build-env VITE_REVIEW_ONLY=true` and `--env VITE_REVIEW_ONLY=true`. Leave it unset or false for normal operation.
