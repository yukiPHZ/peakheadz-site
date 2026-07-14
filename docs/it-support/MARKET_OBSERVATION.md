# Market Observation Status

Current status: `configured_pending_deploy`

## Status Definitions

| Status | Meaning |
| --- | --- |
| `integration_blocked` | Existing-property access, a numeric Property ID, collector target, or Search Console access is still missing. |
| `configured_pending_deploy` | The existing-property settings, shared registry, collector target, consent-safe code, and report target are complete; production receipt is not yet confirmed. |
| `active` | Production receipt and the daily-report target have been verified. |

Production not being deployed is never, by itself, a reason for
`integration_blocked`.

## Confirmed Configuration

- GA4 property name: `peakheadz - GA4`
- Existing Measurement ID: `G-QW5ZR7QCTE`
- Project ID: `peakheadz_it_support`
- Launch group: `sakura_inzai_narita_initial`
- Consent storage key: `market_observer_analytics_consent`
- The DAKE Measurement ID is not used by PEAKHEADZ.
- No new GA4 property or Web stream is required or should be created.

## Implemented Locally

- The seven registered IT Support routes load the shared Market Observer
  runtime with `G-QW5ZR7QCTE` only after explicit analytics consent.
- Unknown, denied, storage-error, and Global Privacy Control states fail
  closed: no Google tag and no analytics event.
- Page views, pricing-section visibility, LINE WORKS clicks, and email clicks
  are mapped to shared `page_view`, `section_view`, and `cta_click` events.
- Only fixed aliases are sent. Names, company names, contact contents, email
  addresses, phone numbers, raw URL queries, and screenshots are excluded.

## Current Gate

- GA4 Data API and Search Console API receipt for `peakheadz_it_support` are
  verified through the shared GitHub Actions OIDC/WIF collector.
- The required event-scoped dimensions `project_id`, `surface`,
  `tracker_version`, and `route_id` are registered.
- Only the production procedure in `POST_DEPLOY_MEASUREMENT_VERIFICATION.md`
  may change the status to `active`.
