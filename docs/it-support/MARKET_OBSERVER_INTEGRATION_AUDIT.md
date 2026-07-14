# Market Observer Integration Audit

Reviewed: 2026-07-14

## Result

`measurement_status: configured_pending_deploy`

The block is specific and does not mean a new GA4 property or Web stream is
needed. `peakheadz - GA4` already exists and its Measurement ID is
`G-QW5ZR7QCTE`.

| Item | Status | Evidence / next action |
| --- | --- | --- |
| PEAKHEADZ Measurement ID | Confirmed | `G-QW5ZR7QCTE` in the shared runtime config. |
| Numeric GA4 Property ID | Confirmed | `428662579` for `peakheadz - GA4`. |
| Shared consent | Implemented | Explicit opt-in, GPC fail-closed behavior, shared storage key. |
| Project registry | Implemented | `peakheadz_it_support` registered in `market-observer`. |
| Route registry | Implemented | Seven release routes are registered. |
| Event taxonomy | Implemented | Uses shared `page_view`, `section_view`, and `cta_click` events. |
| PEAKHEADZ client tag | Implemented | Seven IT Support routes use the PEAKHEADZ Measurement ID only. |
| GA4 collector target | Registered | Shared target uses `properties/428662579`; the collector service account has GA4 Viewer access. |
| Search Console target | API verified | The collector is a Full user for `https://peakheadz.com/` and the shared daily collection succeeded. |
| Daily report target | API verified | The seven routes and launch group are enabled; the normal OIDC/WIF daily collection succeeded. |
| Production receipt | Pending | No deployment was performed in this task. |

## Access Requirements

The shared collector needs read-only access only:

- GA4: `Viewer` at the `peakheadz - GA4` property is granted to the existing
  collector identity.
- Search Console: the same collector identity is a `Full user` for
  `https://peakheadz.com/`. The collector continues to request only the
  `webmasters.readonly` API scope.

## API Test State

The local shared-collector credential is not used as the production path. The
normal GitHub Actions OIDC/WIF workflow has verified GA4 Data API and Search
Console API read access without exposing or changing credentials.

Do not commit a service-account JSON key, OAuth refresh token, browser cookie,
or any owner credential.
