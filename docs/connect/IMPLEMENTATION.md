# PEAKHEADZ CONNECT v1.0 実装・QA記録

検証日: 2026-10-08。対象: `peakheadz-site`、feature branch `codex/peakheadz-connect-v1`。最新 `origin/main` (`ee4e5b2`) を取り込み、既存の公開サイト資産を維持した。最初の作業チェックアウトは古い仕様ブランチだったため、保護コミット後に統合した。既存のSNS別入口・AdSense所有権確認・START導線・市場観測配布物は最新mainから保持する。

## 実装

- `/connect` は `public/connect.html` の静的ページ。既存正式ロゴ、黒背景、青アクセント、白文字。HERO、FOLLOW、FEATURED、折りたたみPROJECTS、COMING NEXT、プライバシー案内、フッターを実装。新しいframework、CMS、認証、Publisher操作なし。
- 既存リンク正本 `data/profile-catalog.json` を拡張。既存7項目の `name` / `url` / `source` を維持し、CONNECT用メタデータだけを `connect` に保存。新しいSNS・作品もこの正本に登録する。`data/connect.json` は表示対象IDを選ぶ設定で、URLを持たない。
- `templates/connect.html` → `scripts/generate-connect.mjs` → `public/connect.html`。生成時に公開状態、確認日、出典、URLを検査。JavaScriptがなくても利用できる。台帳と生成物を一緒にcommitする。Pages build設定は従来どおり空欄 / output `public`。
- `active` は公開確認済みのみ。`planned` は告知承認日必須・URL禁止・非リンク表示。`hidden` は本文・属性を含め公開HTMLへ出力しない。企画名や未公開URLの自動採取なし。現在COMING NEXTは空で案内文のみ。
- title / description / canonical / OGP / Xカード、sitemap、キーボードfocus、skip link、新しいタブの案内、44px以上の操作領域。OG画像は既存正式ロゴを再利用したsummaryカード。画像はロゴ1点のみで、HEROのため遅延読み込みせず寸法を指定する。

## 掲載SNSと公開確認

すべて匿名GETでHTTP 200・最終URL・アカウント名またはハンドル一致を確認。Instagram/ThreadsはプロフィールHTMLのタイトルで確認したもので、全投稿の閲覧性・フォロー操作完了を保証する検査ではない。TikTokはタイトルが汎用のため、公開プロフィールJSONの `uniqueId` 一致と `privateAccount=false` を追加確認した。秘密情報・トークン・本文全体は記録していない。

| ブランド | SNS | アカウント | 確認済みURL |
|---|---|---|---|
| 菊田幸彦 / ユキズ | X | @yukiz_PHZ | https://x.com/yukiz_PHZ |
| 菊田幸彦 / ユキズ | YouTube | ユキズ 稼働中 | https://www.youtube.com/@yukiz_PHZ |
| 菊田幸彦 / ユキズ | GitHub | yukiPHZ | https://github.com/yukiPHZ |
| PEAKHEADZ | Instagram | @peakheadz | https://www.instagram.com/peakheadz/ |
| PEAKHEADZ | Threads | @peakheadz | https://www.threads.com/@peakheadz |
| PEAKHEADZ | TikTok | @peakheadz | https://www.tiktok.com/@peakheadz |
| NICE SKILL | Instagram | @niceskillcom | https://www.instagram.com/niceskillcom/ |
| NICE SKILL | Threads | @niceskillcom | https://www.threads.com/@niceskillcom |
| NICE SKILL | TikTok | @niceskillcom | https://www.tiktok.com/@niceskillcom |

Xの現行タイトルは「ユキズ@レビュー好きブログ」。希望するプロフィール名・固定投稿・プロフィールURLの設定変更は実施していない。旧ブログの `@yuki_PHZ` は採用せず、既存Publisherのidentity確認記録と今回の実プロフィール `@yukiz_PHZ` を採用した。

既存個人サイトにあるInstagram `@kikutayukihiko` / 不動産 `@kikuta.shimarisu_fudosan` は今回は再検証・採用していない。未確認の告知専用アカウントは登録・表示していない。件数を満たすための追加なし。

## 公開作品

注目4件: [THANKS](https://thanks.niceskill.com/)（二人で使うWeb体験）、[DAKE Web Tools](https://tools.dakeapp.com/)（ブラウザの実務道具）、[DAKE Store](https://store.dakeapp.com/)（アプリ詳細・入手先）、[ユキズ 稼働中](https://www.youtube.com/@yukiz_PHZ)（レビュー・制作動画）。いずれも匿名HTTP 200とタイトル一致を確認。Storeでの実購入・ダウンロード・決済は行っていない。

PROJECTSではNICE SKILL、THANKS、DAKE Web Tools、DAKE Store、Yukihiko Kikuta、Japan Memory Laneをカテゴリー分けし、既存Projects / Orbitへ接続する。上記6件とNICE SKILL `/works/` は正式URL・匿名HTTP 200を確認。THANKSのコピーは既存公開タイトル「いつもありがとう」を使用し、未実測の効能を記載しない。WLZPHZの信号は追加・変更していない。

## GA4 / 市場観測

現時点は **未接続・送信なし**。最新配布物には `peakheadz_brand` があるが、対象は `/instagram/`、`/threads/`、`/x/` のみで、`production_enabled=false`、許可イベントは `page_view` / `cta_click`。CONNECTはルート・event・parameter辞書に未登録。既存GA4 IDやIT Support profileを流用せず、中央生成物を手編集しない。

`connect.js` は将来のアダプター接続口のみ。`PeakheadzConnectAnalytics` はどの公開ファイルにも定義していないため、SDK読み込み・fetch・storage・cookie・gtag送信は発生しない。接続する場合は中央正本でroute、event mapping、固定aliases、profile、transport / reporting、UTM taxonomyの整合を確認し、配布物を正規生成する必要がある。data/connect.jsonのenabled変更だけでは有効化できず、生成検査で拒否する。

接続口は `enabled=true` / `contractVersion=connect-v1` / 同意の都度確認 `hasConsent()===true` / 本番originの全条件を要求し、GPC・DNT・アダプター異常・Previewでは閉じる。イベント名は `connect_page_view` / `connect_social_click` / `connect_project_click` / `connect_featured_click` / `connect_coming_soon_click`。クリック時は固定 `link_id, brand, platform, category, destination_id, placement` のみ。生URL、query、referrer、入力、秘密情報は渡さない。将来のConsent UI・許可後page_view・同意撤回・再設定入口とprivacy文面の整合は実接続時に検証する。現在は実GA4到達PASSではなく、mockによるgate検証のみ。

X流入設定候補（未設定）:

- `https://peakheadz.com/connect?utm_source=x&utm_medium=social&utm_campaign=profile`
- `https://peakheadz.com/connect?utm_source=x&utm_medium=social&utm_campaign=pinned`

内部リンクにUTMは付けない。現行中央taxonomyはmediumが `organic_social`、campaignが3文字以上等の制約を持つため、上記依頼URLの `social` と将来の正規化は実接続時の判断事項。今回はURLでページが開くことだけを検証し、GA4で流入分類済みとは扱わない。SNSクリックは実際のフォロー完了とは別指標。ページビューを成功指標にはしない。

## テスト結果と境界

- `node scripts/generate-connect.mjs --check`: PASS。
- `node --test tests/connect.test.mjs`: 5/5 PASS。台帳変更反映、HTML escape、hidden非露出、planned承認必須・リンク禁止、不正URL・内部UTM拒否、確認日必須、mockによる同意/GPC/DNT/Preview/例外/撤回gate。
- `node scripts/generate-profile-pages.cjs --check`: PASS（Windows checkoutの改行差を通常の再生成で整合、既存ページの内容差分なし）。
- 既存sitemap生成: 8 URL、CONNECT追加のみ。noindexのSNS別入口・凍結ページは引き続き除外。
- Chromium headless: 320 / 375 / 390 / 768 / 1440pxすべて横スクロールなし、44px以上の操作領域、画像正常、外部リンク属性、canonical / index可を確認。SNSカード12件追加時も320pxで横スクロールなし。
- Tab → skip link → main、FOLLOWアンカー、details開閉、JavaScript無効時の9SNS表示: PASS。CONNECTに外部リクエスト・pageerrorなし。
- 最新mainのTOP / About / Information / Projects / Orbit / Instagram / Threads / X入口の直接アクセス: HTTP 200・h1・pageerrorなし。既存TOPのAdSense読み込みは維持され、CONNECTの通信ゼロとは区別する。
- 390px / 1440pxの全画面スクリーンショットを目視確認。結果JSONと指定5幅のPNGは `.cache/connect/`（Git対象外）。実機iOS/Android、各SNSアプリ内ブラウザ、スクリーンリーダーでの読み上げ、外部SNSのフォロー完了、購入は未実施。
- このrepoに既存npm build/lint設定はない。新規JSの `node --check` と `git diff --check` を検査する。新しいframework/build pipelineは追加しない。

## 公開状態

本番 `https://peakheadz.com/connect` は公開前。既存READMEの「Production変更が明示承認された工程だけに適用する」に従い、main merge / push / Production deployは実施しない。既存Pagesプロジェクトの別ブランチへPreviewを公開して確認する。実URLとHTTP検証結果は本記録へ追記する。
