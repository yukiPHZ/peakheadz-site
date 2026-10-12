# Market Observer onboarding — Draft / Preview

2026-10-08。CONNECT PR #14 (`af28087`) 上の統合ブランチ。中央の対応コミット `35e7f49` から `peakheadz_site` だけをexport。正式な契約・監査・有効化条件は market-observer/docs/PEAKHEADZ_BRAND_ONBOARDING_20261008.md。

- 対象exact route: `/`, `/about`, `/information`, `/projects/`, `/orbit/`, `/connect`, `/instagram/`, `/threads/`, `/x/`。`peakheadz_brand` / Property 428662579 / Stream 7560298897 / G-QW5ZR7QCTE。
- 全ルートobservation_pending。Production/Preview/reporting=false。既存Consentと中央runtimeを共用し、unknown/denied/GPC/storage errorでは送信しない。grantedでも現在は送信しない。
- CONNECTの独立adapter/connect_*イベントを撤去。既存profile-observation.jsを再利用し、page_view / cta_click、固定route_id / cta_id / cta_group / content_typeのみ。CTA IDは既存profile-catalog.jsonを参照し、中央の固定destinationとgroupを検証する。ブランド名・SNS名・生URL・query/hash・自由入力は送らない。
- 同じ項目のfollow/featured/projectsは固定cta_groupで区別。外部SNSクリックはフォロー意図、作品クリックは訪問意図。完了・購入・個人行動の連鎖を推測しない。
- 本体ページは既存リンクへの固定属性と共通スクリプト・Consent導線を追加。作品、ナビゲーション、SEO、WLZPHZの隠された信号は維持。IT SupportとQuiet WorkflowのHTMLは変更しない。STARTの配布物・専用streamも変更しない。
- `_headers`のno-transformを追加exact routeへ拡張。GA4 Enhanced Measurementが現在ONであるため、別承認でOFF確認するまで有効化できない。HTTP登録URL、Cloudflare自動RUM設定も要確認。
- Liteは既存peakheadz_ga4 / peakheadz_gsc / latest.md / latest.json系列のみ。ルート別PVとCTA総数は承認後に既存eventCountから集計可能。cta_id/group未登録・未収集につきSNS別/注目作品別/個別CTA内訳は未取得。STARTはbaseline_pending・reporting=falseという正本状態だけを表示し、再収集しない。

## 検証

サイトNodeテスト6件、CONNECT生成一致、既存SNSプロフィール生成一致、中央runtime builder / target validator / export-check / installation check / Lite validator-secret scanを実施。中央Python233件・Node214件PASS。Windows TEMP権限エラーはrepo内TEMPで再実行して解消。既存プロフィールgeneratorはCRLF/LFの等価な内容を一致扱いするよう修正した。

ローカルChrome接続はERR_FAILEDで開けなかったため、最終画面はCloudflare Previewで確認する。旧IMPLEMENTATION.mdのadapter固有テスト・送信条件は本記録で置き換える。市場の測定開始・Googleへの実送信・Production公開は未実施。

Preview URL、幅別確認結果、Draft PRは完了時の追記を参照。


## Final Preview evidence

- Preview: https://79956c88.peakheadz-site.pages.dev/connect (deployed site commit 4d3e9c9). Alias: https://codex-peakheadz-observer-int.peakheadz-site.pages.dev/connect .
- Draft PRs: https://github.com/yukiPHZ/market-observer/pull/139 ; https://github.com/yukiPHZ/peakheadz-site/pull/15 . Site #15 is stacked on CONNECT #14; #14 remains draft/unmodified. All Production operations require separate approval.
- All nine Preview paths: HTTP 200, exact canonical, local HTML content parity, no-transform, one tracker script, no RUM injection. Preview platform X-Robots-Tag noindex retained; no Production SEO changes.
- Chrome viewport 320/375/390/768/1440px: document widths 305/360/375/753/1425px respectively (15px vertical scrollbar); no horizontal overflow, no displayed CONNECT controls below 44px, nine SNS/four featured links, no broken images. 390px visual inspection confirms the existing quiet brand layout.
- Eight existing page h1/canonical checks passed; browser error logs empty. Consent grant and withdrawal to 利用しない verified in Preview. No Google Analytics/tag or RUM scripts appeared, including granted Preview. Full production network trace/actual GA processing is not performed; fail-closed transport is covered by offline unit tests.
- Cloudflare Pages GitHub check succeeded. A separate existing Workers Builds: peakheadz-site check failed; it is not the Pages deployment result. No Workers/deployment configuration is changed to clear it.
- Workers buildログで `npx wrangler versions upload` が `Missing entry-point to Worker script or to assets directory` により失敗していることを読み取り確認。静的Pages repoに無関係なWorker entry/configは追加していない。

## Changed files

- `README.md`
- `data/connect.json`
- `docs/connect/OBSERVER_ONBOARDING.md`
- `public/_headers`
- `public/about.html`
- `public/assets/css/connect.css`
- `public/assets/js/connect.js`
- `public/assets/market-observer/generated/manifest.json`
- `public/assets/market-observer/generated/peakheadz_brand.profile.json`
- `public/assets/market-observer/generated/runtime-package.js`
- `public/assets/market-observer/generated/runtime_schema.json`
- `public/assets/market-observer/market-observer-package.lock.json`
- `public/assets/market-observer/market-observer.js`
- `public/connect.html`
- `public/index.html`
- `public/information.html`
- `public/orbit/index.html`
- `public/projects/index.html`
- `scripts/check-connect-browser.mjs`
- `scripts/generate-connect.mjs`
- `scripts/generate-profile-pages.cjs`
- `templates/connect.html`
- `tests/connect.test.mjs`


## Production Readiness follow-up (2026-10-08)

Central source is 29dc51a (existing #139); peakheadz_site alone was exported with the canonical exporter. Prior pin 35e7f49 to 31861a1 was docs/tests only, but this new runtime fix requires repinning. Profile/schema and all nine no-send/pending gates remain unchanged. Runtime rejects state overwrite by repeated init and stops after origin/exact-path changes; CTA requires fixed route/content/group context. Shared bootstrap now installs only once per document; regression executes it twice and verifies one initialization, listener and pageview.

Read-only GA4: existing property 428662579 / stream 7560298897 / G-QW5ZR7QCTE confirmed. Enhanced Measurement ON (pageviews only, history OFF); stream URL http://peakheadz.com/. Event dimensions 6/50; cta_id and cta_group absent. Separate approval: stream HTTPS URL, Enhanced Measurement master OFF after shared-stream impact review; property event-scoped CTA ID=cta_id and CTA Group=cta_group (8/50 afterward). START stream unchanged. Central offline checker can explicitly require these parameters; current inventory intentionally fails CTA readiness.

Cloudflare Web Analytics UI confirms peakheadz.com RUM Disable and no automatic injection; Pages API reports no web_analytics configuration. Existing API RUM permissions are insufficient (403), resolved for setting audit via UI without access expansion. No settings changed. Full browser network capture/real GA4 processing remain release validation gates; static HTML and mocked transport are not substitutes.

Central validation: Python 234 tests + 116 subtests and Node 215 tests pass; runtime builder --check, target validator, Lite secret scan, target-only export/check and installation validator pass. Site CONNECT tests 6 pass. No real GA4 event was sent. Lite has existing page/route/event counts once enabled; it does not request CTA dimensions, so social/work breakdown remains unavailable even after registration. Do not label follow intent as completion or uncollected metrics as zero.

Existing Pages Preview and independent Workers Builds checks must be distinguished. Workers build command npx wrangler versions upload fails Missing entry-point; dashboard/deploy settings are outside this authorization. Production merge/deploy/measurement/reporting activation remain separate approvals. See central docs/PEAKHEADZ_PRODUCTION_READINESS_20261008.md for evidence and exact remaining gates.


### Latest Preview review

https://00bbe7c5.peakheadz-site.pages.dev/connect (site 5131edd): nine literal routes return HTTP 200, match local HTML, use production canonical, carry no-transform and Preview noindex, contain one runtime loader and no injected Cloudflare RUM. Browser DOM inspection at all 9 × 5 requested widths completed. Orbit at 320px revealed a 5px text overflow (nowrap heading); scoped mobile wrapping fix follows. Other inspected widths/routes have no horizontal excess. Existing main navigation and headings render.

Important unresolved privacy boundary: the top page's pre-existing unconditional AdSense loader (pagead2.googlesyndication.com/pagead/js/adsbygoogle.js) also runs on Preview before a consent choice and loads its managed advertisement script. This is not a GA4 gtag or Cloudflare RUM request, but prevents claiming zero third-party Google communications. Ad/consent semantics and revenue behavior require a separate explicit decision; this observer PR does not silently remove or enable advertisements. Full browser network evidence and ad-consent handling remain release gates.

## Final blocker review — 2026-10-09

All nine privacy notices explicitly distinguish GA4 advertising-signal restrictions from advertising consent. The root notice discloses the independent pre-choice AdSense connection and possible cookies, with Google's advertising settings link. The original review snippet is unchanged: authenticated AdSense shows pending review with that snippet as the selected ownership method. A published European regulations message already exists; advertising Consent Mode integration is OFF. Regional CMP/TCF behavior remains unverified. A Preview hostname appears in AdSense reporting, so Preview-only ad exclusion requires separate approval; no ad suppression or CMP changes are included.

The independent Worker has Git builds for this same repository, production command npx wrangler deploy and branch-version command npx wrangler versions upload, but the repository is a static Pages application without a Worker entry point. It has no custom domains or zone routes. GitHub main has no branch protection/rulesets in the read-only audit, so its failing check is not required under observed settings. Recommended separate approval is disconnecting only that Worker's Git Builds connection; retain Pages, existing Worker, DNS and domains.

Central Lite now prepares CTA ID/group breakdown through its existing collector/pipeline. All three enable/verification gates remain false, so no extra CTA query is made. Missing dimensions, unverified mapping and absent data stay unavailable; click intent is never follow/purchase/use completion. Production measurement remains no-send/pending. GA4 write requests remain HTTPS stream URL, Enhanced Measurement OFF and two event-scoped dimensions CTA ID/cta_id and CTA Group/cta_group on the existing brand property/stream only. START and frozen IT Support remain unchanged.

Post-edit validation: site 7 tests and both generators pass. Central full suite: Python 256 plus 116 subtests; Node 215; focused post-edit Python 28. See the central production-readiness document's 2026-10-09 section for exact approval scope and release sequence. Real production communication/GA4 receipt are not marked PASS.

Final central source pin: 42ddb82 (target-only canonical export; runtime/profile/schema unchanged).

## Owner-approved Production — 2026-10-09

#139 -> #14 -> #15 merged; Production deployment530394f3 succeeded with collection stopped. Live nine-route HTTP/canonical/HTML/no-transform/loader/RUM checks passed. GA4 admin HTTPS/OFF/CTA event definitions saved and reloaded; existing six definitions and START retained. Worker Git only disconnected. Pages-host-only CSP verified in Preview81208d62 and 45 width combinations; original Production ownership snippet unchanged. Official Google CMP test displayed and rejection dismissed the existing European message; regional TCF/network behavior is not claimed verified.

Owner-approved activation pin d7efc37 is exported only for peakheadz_site. Production consented collection is allowed, Preview refused. Privacy text now describes that boundary. Central reporting/measurement evidence statuses remain pending, with validation quarantine and all Lite CTA gates OFF. Real browser wire/receipt and processed mapping require evidence; DOM/mock tests do not substitute for it. Rollback is the prior no-send Production deployment530394f3 if activation privacy/behavior fails.
