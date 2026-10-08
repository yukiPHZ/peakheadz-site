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
