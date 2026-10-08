# SNS profile LPs — Preview review / 2026-09-30

Status: implementation and local automated validation complete; Preview/source verification follows feature push. Human Review pending. NICE SKILL formal ring/wordmark remains a known incomplete asset requirement; the current brand text is provisional. No invented logo is used. Production publish, live analytics, processing/mapping activation and SNS writes are outside this gate.

## Central contract

The five exact canonical routes and route aliases are in [Phase 0](SNS_PROFILE_PHASE0.md). niceskill_site exports only niceskill. peakheadz_site exports peakheadz_brand and the unchanged peakheadz_it_support profile because the existing target contract permits one package per repository. The new project is pending; old /it-support/ prefix and existing parent/child evidence states are unchanged. No global v2 migration occurs; only these two site packages are exported.

New optional route_contracts are generated and checksummed from project_registry.yaml. They bind exact path, fixed route_id/content_type, page_view/cta_click and exact approved CTA destination URLs. Every new route has production_enabled=false, preview_enabled=false, reporting_enabled=false, first_observed_at=null. Preview query cannot bypass this. NICE SKILL’s approved Measurement ID now comes from the central profile; the site LP bridge never authors it. PEAKHEADZ’s existing Property/Measurement ID are candidate binding metadata only, with brand approval and enhanced-measurement confirmation pending. No Property, stream, scope or credential is created or changed.

Canonical runtime enforces route activation/context, consent/GPC and writable storage for these new routes, preserving the same consent key and exact saved value. Normal legacy routes retain their gates. CTA destination validation is in the small site bridge before a single handler sends the fixed alias. No href, DOM title, name, query or fragment is an event parameter. Child utilization and purchase events are rejected. The shared managed consent file is not edited by hand. Export updates PEAKHEADZ’s older managed consent artifact to the current canonical reference; archive HTML/config/profile and frozen lifecycle remain unchanged.

## Footer and content

Two templates / five media configurations generate static HTML. NICE SKILL descriptions come from the existing Parent Refresh approved source; its primary/Featured footer structure and copyright are rendered from the existing shared footer implementation, with no second hand-maintained set. The LP skips the older analytics listener and footer remount, leaving its static fallback intact. Utility explanation and settings are not market CTA. PEAKHEADZ uses one shared LP footer partial with about/Projects, an expandable explanation, settings and the common copyright proposal. The author signature/author information lives in main. Existing About/Projects/ORBIT/top/articles are unchanged.

The imported PEAKHEADZ catalog stores one approved item record with a source reference for each formal destination; media configurations only select reference IDs/order and introduction/label copy. START and child production evidence are in Phase 0. No prices, invented latest shipment, post/article correspondence or Publisher automation is added. All new routes are noindex,follow and omitted from sitemap. All links work without JavaScript. No new font, framework, DB, form, external embed or advertising tracker.

## Validation

- Central Node regression: 209/209 PASS.
- Central Python regression: 188/188 PASS at final safety pass; six focused LP mapping/pending tests PASS.
- Canonical runtime --check, target validator (25 targets), Lite report validation with secret scan: PASS.
- Five-route hermetic browser audit: 161 checks PASS, zero real analytics requests. See each site’s docs/evidence/sns-profile/browser-results.json and mobile/desktop PNGs. Covers unknown/denied/granted/GPC per route, corrupt/inaccessible/unwritable storage including saved grant, denial persistence, settings without choice mutation, withdrawal, Preview/query/localhost/foreign-origin rejection, unmatched/encoded paths and aliases, raw query/hash stripping, one manual view/one click with inert tag fixture, no child use_start, 320/375/390/430/1280 and landscape/effective-200%-width layouts, CSS 200% zoom, reduced motion, contrast >=4.5, 44px controls, focus, images, footer flow and no-JS links.
- NICE SKILL validate-phase1 (25 routes), validate-parent-refresh (15 exact article hashes / 25 sitemap URLs), both generator --check: PASS. Windows fresh worktree EOL conversion initially triggered six hash checks; restored the original clean main checkout’s exact bytes only. Git normalized content has no article diff.
- Existing main/about/works/way/article and PEAKHEADZ main/about/Projects/ORBIT/archives were locally rendered under unknown/no-send. Existing old IT Support profile and site files have no semantic diff. CIRCLE/SASHIIRE/other evidence remains untouched.
- Native browser zoom, physical devices and Instagram/Threads/X in-app browsers: manual_pending. CSS/effective-width simulation is not a physical-device or native-zoom PASS. Human appearance judgments are pending.

## Existing weekly report

No new collector/request/report path: pipeline/lite_weekly_report.py reads the same exact host/path/eventCount behavior rows and renders a CONNECT / OBSERVE LP-purpose breakdown into existing latest.md/latest.json on its next separately authorized run. Pending LP rows are excluded; claimed-project/exact-route conflicts are quarantined before aggregation, including disabled brand routes. Dedicated exclusion counters retain provenance. Parent totals are not added again to their LP subrows, totalUsers is not summed, and no social source is inferred from path. Missing route/event rows remain null/missing, not zero.

CTA-by-alias is unavailable because customEvent:cta_id is not collected or verified. There is no second acquisition request or collector to guess it. Binding/dimension/transport/processed/exact mapping/live reporting are pending gates. The current production latest reports are not regenerated, a workflow is not dispatched, and no test data is market demand.

## Reproduce / release boundary

From central: python tools/build_runtime_bundle.py --check; python tools/validate_tracker_targets.py; python -m unittest discover -s tests_py -p "test_*.py"; npm test; python tools/validate_lite_reports.py --secret-scan. The Python environment needs existing PyYAML and the repository’s existing dependencies.

From each site: node scripts/generate-profile-pages.cjs --check. Build-time regeneration is node scripts/generate-profile-pages.cjs. Browser fixture generation: python tests/browser/export-sns-fixture.py ../mock-fixtures; browser audit: node tests/browser/sns-profile.cjs .. ../mock-fixtures with PLAYWRIGHT_MODULE/NODE_PATH pointing to the existing Playwright installation. Test-only activated fixtures stay outside the site/public trees and are never committed or deployed.

Dependency order after any later human approval: merge reviewed central contract, then the matching site packages. Each package lock pins the central source commit and site-file checksums. Re-export/check only niceskill_site and peakheadz_site with --source-commit <reviewed central SHA>. Do not edit runtime, profile, Measurement ID, checksum or package lock manually. Do not export unrelated targets.

Rollback uses normal reviewed revert commits of this feature and its matching package export; no hard reset/force push/history rewrite. No DNS/Cloudflare project/Production branch/GA settings/SNS connection changes are required for this Preview. Before a later Production activation, resolve formal logo and brand binding, approve route activation and quarantined minimal live tests, then separately verify transport, processing, exact mapping and weekly reflection.
