# Post-Deploy Measurement Verification

Run this only after production deployment. Do not enter contact information or
send a form, email, LINE WORKS message, screenshot, password, or document.

## Before Deployment

1. Confirm the recorded numeric GA4 Property ID is `428662579` for
   `peakheadz - GA4`.
2. Open **Admin > Data streams** and confirm the existing Web stream uses
   `G-QW5ZR7QCTE` for `https://peakheadz.com`.
3. Confirm Enhanced Measurement is off for the manual safe page-view policy.
4. Confirm the registered event-scoped custom dimensions: `project_id`,
   `surface`, `tracker_version`, and `route_id`.
5. Confirm the existing Market Observer collector retains GA4 Viewer access;
   do not create a key file.
6. Confirm the collector remains a **Full user** for
   `https://peakheadz.com/`.
7. Confirm the registered PEAKHEADZ collection and daily-report target remain
   enabled in the shared Market Observer engine.

## Production Verification

1. Open a private browser window. With consent unknown, confirm no Google tag
   request and no `g/collect` request.
2. Choose deny, reload, and confirm the same zero-request result.
3. Choose allow, reload, then use GA4 DebugView or Realtime to confirm the
   following page views:
   - `/it-support/` -> `it_support_home`
   - `/it-support/areas/sakura/` -> `it_support_area_sakura`
   - `/it-support/areas/inzai/` -> `it_support_area_inzai`
   - `/it-support/areas/narita/` -> `it_support_area_narita`
4. Scroll the home page to pricing and confirm `section_view` with
   `section_id=pricing`.
5. Click LINE WORKS and confirm `cta_click` with
   `contact_method=line_works`.
6. Click email and confirm `cta_click` with `contact_method=email`.
7. Open the GBP URL with the approved UTM parameters and confirm the GA4
   campaign values plus `referrer_type=google_business_profile`.
8. In a browser with Global Privacy Control enabled, confirm no Google tag or
   `g/collect` request.
9. Confirm the next daily collector/report includes `peakheadz_it_support`.
10. Record the operator, date, DebugView/Realtime evidence, and daily-report
    evidence. Then, and only then, set `measurement_status: active`.

## Failure State

Keep `integration_blocked` when the numeric Property ID, collector access,
Search Console access, or collection target is absent. Use
`configured_pending_deploy` only after those settings are complete and before
production receipt is proven.
