# IT Support Release-Preparation Gate

Reviewed: 2026-07-14
Deployment status: not deployed
Measurement status: `configured_pending_deploy`

## Public Index Candidates

- `/it-support/`
- `/it-support/areas/sakura/`
- `/it-support/areas/inzai/`
- `/it-support/areas/narita/`
- `/it-support/services/printer-scanner/`
- `/it-support/services/pdf-electronic-contract/`
- `/it-support/services/workflow-improvement/`

The case page plus `/it-support/services/`, `/it-support/cases/`, and
`/it-support/guides/` remain `noindex,follow` and are excluded from the
sitemap.

## Measurement State

- Existing GA4 property: `peakheadz - GA4`
- Existing Measurement ID: `G-QW5ZR7QCTE`
- New GA4 property/stream: not required and must not be created
- Shared consent-safe runtime: installed for the seven registered routes
- Shared project registration: `peakheadz_it_support`
- Shared route registration: complete for the seven routes above

The GA4 Property ID, custom dimensions, Viewer access, and Search Console
`Full user` access are confirmed. The shared daily target is enabled and the
normal GitHub Actions OIDC/WIF route has verified GA4 and Search Console API
receipt. Production event receipt remains pending until this site is deployed.

## Approved Prices

| Service | Price |
| --- | --- |
| Onsite check and initial triage | 8,800 JPY tax included |
| Setup and resolution | 15,400 JPY tax included; onsite base included |
| Complex onsite work | from 22,000 JPY tax included; onsite base included |
| Additional work | 4,400 JPY per 30 minutes, tax included |
| Remote support | 6,600 JPY per 45 minutes, tax included |

Parking, tolls, and parts are actual cost. Work outside the priority area is
estimated in advance. Cancellation: free until the previous day, 4,400 JPY on
the day before visiting, and 8,800 JPY after arrival or for an absence.

## Required Checks

### Before Release

- Keep numeric GA4 Property ID `428662579` and shared collector GA4 Viewer
  access unchanged.
- Preserve the confirmed Search Console `Full user` access and enabled target.
- Keep `measurement_status: configured_pending_deploy` until production
  consent-state and event-receipt checks are complete.
- Owner-device check: QR account display, icon, and message-sendability.

### Immediately After Release

- Run every step in `POST_DEPLOY_MEASUREMENT_VERIFICATION.md`.
- Verify the canonical URLs and sitemap on the production origin.
- Set `measurement_status: active` only after DebugView/Realtime and the
  daily-report target both show evidence.

### Before GBP Reflection

- Confirm the QR account presentation and the GBP UTM entry URL.
- Apply site-aligned prices only in the GBP interface after owner review.

### Before Case Publication

- Obtain publication consent for company name, work description, and photos.
- Keep the case page noindex and its images non-public while consent is
  pending.

## Blockers

### Critical

- None. The owner confirmed the QR code, account, display name, icon, and
  message send/receive flow on 2026-07-14.

### Major

- Case publication consent remains pending.

### Minor

- Production visual, link, and consent-state checks await deployment.

No commit, push, deployment, GBP change, or Search Console submission was
performed in this review.
