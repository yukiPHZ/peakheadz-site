# Market Observer release plan

## Dependency

The shared Market Observer must be released first. Its daily collector reads
the PEAKHEADZ target definition and is the only normal OIDC/WIF path that can
prove GA4 Data API and Search Console API receipt.

## Recommended order

1. Commit only the reviewed Market Observer registry, collector, pipeline, and
   test changes. Push `main`.
2. Run the existing `workflow_dispatch` daily collector. Confirm OIDC/WIF,
   GA4 `properties/428662579`, `https://peakheadz.com/`, the seven routes,
   and a privacy-safe empty result if no data exists.
3. Commit and push the reviewed PEAKHEADZ site changes. Cloudflare Pages then
   publishes the static site from `public/`.
4. Verify consent states and event receipt with GA4 Realtime and DebugView.
5. Confirm the next daily Market Observer report contains
   `peakheadz_it_support`, then change `measurement_status` to `active` in a
   separate, reviewed update.
6. Only after that, apply the prepared GBP changes and check the GBP UTM URL.
7. Check Search Console properties and sitemap after production is stable.

## Rollback

- Market Observer: revert the PEAKHEADZ target enablement and collector change
  in a dedicated commit, then rerun the daily workflow. Do not alter DAKE
  properties or credentials.
- PEAKHEADZ site: revert the site commit or redeploy the previous Cloudflare
  Pages production deployment. Keep the GA4 property and Search Console user
  access unchanged unless the owner explicitly requests removal.

## Current boundary

The shared Market Observer release and daily collector verification completed
on 2026-07-14. The remaining work is the PEAKHEADZ site preview, production
consent-state verification, and production event receipt. GBP changes and
Search Console sitemap submission remain separate steps.
