# ユキズ　稼働中 YouTubeリンクハブ

候補canonical: `https://peakheadz.com/youtube/`。既存 `peakheadz-site` の静的ページ。
対象branchは `feat/youtube-link-hub`、開始時mainは `cf66005`。
Preview確認用であり、mainへのmerge、本番公開、YouTubeプロフィール変更は別承認。
実Preview URL・commit・最終検証結果はこの変更のGitHub PR本文に記録する。

## 正本と更新

- URL・正式名称・出典は既存 `data/profile-catalog.json` に一度だけ保存。
  既存項目のURL・CONNECTメタデータを保全し、YouTube用の公開状態/説明/CTA/確認証跡を
  `youtube` に追加。チャンネル名はOAuth確認済みの全角空白を含む正式表記へ整合。
- `data/youtube.json` は参照IDと表示順だけを選ぶ。紹介アプリは `featuredRefs` の配列順。
  URLをこの表示設定へ転記しない。
- `templates/youtube.html` と `scripts/generate-youtube.mjs` から
  `public/youtube/index.html`、`public/youtube/destinations.json` を生成する。
  HTML/manifestは読み取り用の生成物で、リンク正本ではない。
- 掲載/並び替えはデータ編集後に `node scripts/generate-youtube.mjs` を実行し、生成物もcommit。
  新しいCMS・依存・build設定は不要。既存Pages buildは空欄、出力は `public` のまま。
- `active` は正式名称・HTTPS URL・出典・確認日・証跡が必須。名称/URLと検証hashを束縛し、
  変更時は再確認が必要。`hidden` は本文・hero導線・製品manifestから完全除外。
  不明/未検証/予定のURLを生成・公開しない。検証hashは確認の真正性の署名ではなく、
  確認後の意図しない名称/URL変更を検出するためのもの。

## 画面と導線

正式ロゴ `public/assets/phzlogo1.png`、既存の黒/青/白を使う。
上部にチャンネル登録入口と、最初の紹介アプリへの直接リンクを置く。
紹介アプリ → 正式製品ページ → 配布先は2タップ。ハブからの重要なリンクは
外部サイトも同じタブで開き、登録/フォロー/購入の完了をクリックだけから推測しない。

DAKEアプリ一覧・Store、Web Tools・NICE SKILL、個人/PEAKHEADZ別SNS、
BOOTHの公開済み商品、`by Yukihiko Kikuta` を配置。
BOOTHの支援は実在する商品の購入導線であり、架空の寄付商品や任意チップを新設しない。
価格・最新version・無料配布の区分を推測してコピーへ加えない。
PDFイラストは抽象的な装飾であり、アプリの実画面や操作結果を装っていない。

単一CSS・システムフォント・画像1点。JavaScript/iframe/外部フォントは使わず、
すべてのリンクをHTMLのみで利用可能にする。skip link、見出し構造、キーボードfocus、
44px以上のタップ領域、reduced-motion、320px〜desktopの折り返しを確認する。
実機iPhone/Safariでの確認と、支払/フォロー/チャンネル登録の完了確認は別。

## Analytics・Preview境界

`/youtube/` は既存中央Market Observerの承認済みrouteではない。
既存 `/connect` の同意済み計測を流用せず、このページにはタグ/SDK/Storage操作を追加しない。
Cookie同意・GPC・保存済み選択・中央生成物・IT Support・他ページは変更しない。
`/youtube/*` だけに `script-src 'none'` / `connect-src 'none'` のCSPを追加し、
既存Pages host限定ポリシーはそのまま保持する。

Preview中はHTMLとレスポンスにnoindex。sitemapや既存navへ公開候補を追加しない。
新設 `/youtube` → `/youtube/` だけを301正規化する。
後日の本番承認では、releaseStage・noindex・sitemapの公開方針も明示的に整合する。
プロフィールへのリンク設置とPublisherのroute登録は本ページのPreview公開とは別工程。

## 確認コマンド

```powershell
node scripts/generate-youtube.mjs --check
node scripts/generate-connect.mjs --check
node scripts/generate-profile-pages.cjs --check
node --test tests/connect.test.mjs tests/youtube.test.mjs
node scripts/preview-connect.mjs
# 既存localhost Previewサーバーの /youtube/ を閲覧
node scripts/verify-youtube-hub.mjs https://<actual-preview>.peakheadz-site.pages.dev/youtube/
```

最後の検証器はHTMLとmanifestのGETのみ。実際のa要素、正式製品URL、製品ID、
チャンネルID、canonicalを照合し、証跡hashを出す。
成功しても `validation=preview_only` / `publisherRouteReady=false` / `providerWrites=0`。
PublisherのD1・承認・投稿・HOLD・PAUSEは一切変更しない。
運用上の連携設計は [PUBLISHER_ROUTE_DESIGN.md](PUBLISHER_ROUTE_DESIGN.md) を参照。

## 公開・切り戻し

既存Pagesのfeature branch Previewのみを使い、Project・DB・Worker・DNS・Secretを作成/変更しない。
本番変更はPreviewに対する本人承認後だけ。現在のmain・本番deploymentを維持する。
修正する場合はこのfeatureのデータ/生成物/CSSだけを修正して再Previewする。
公開後の切り戻しも該当変更だけをrevertし、既存履歴や他ページを巻き戻さない。
