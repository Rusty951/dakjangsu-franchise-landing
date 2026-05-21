# Review Checklist

## Product

- The page follows the approved 7-step flow.
- The first screen clearly says this is a franchise landing page.
- KakaoTalk consultation is the primary CTA.
- Form and CTA copy do not overpromise results.
- Unconfirmed numbers are not public.

## Frontend

- Mobile 360px, 390px, 768px and desktop 1440px are checked.
- Text does not overlap or overflow.
- Buttons have clear accessible names.
- Form states cover idle, loading, success, validation error, and server error.
- Images have useful alt text.
- Logo usage follows the brand guide.

## Backend

- Server validates required fields.
- Server validates and normalizes phone.
- Privacy consent is required before submit.
- UTM/referrer/path/user agent are captured.
- Secrets are not exposed to the browser.
- API returns safe error messages.

## Tracking

- Track `cta_kakao_click`.
- Track `cta_phone_click`.
- Track `lead_form_start`.
- Track `lead_form_submit`.
- Track `lead_form_success`.
- Track `lead_form_error`.

## Final QA

- Build passes.
- Typecheck/lint/test pass if configured.
- Form submission tested with success and failure paths.
- Real KakaoTalk URL, phone number, recipient, and privacy URL are confirmed.
