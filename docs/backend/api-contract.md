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
- Store leads in Google Sheets, Airtable, or a later CRM adapter.
- Send notification through email or webhook.
- Keep all credentials in `.env.local`.
- Separate storage failure from notification failure in logs.
