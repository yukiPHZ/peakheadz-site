# PEAKHEADZ Site

## サイト役割

PEAKHEADZは、菊田幸彦がつくる実務道具、Webサービス、メディア、実験を束ねる活動母体。特定のサービス会社ではなく、現在動いている代表作と、実験・履歴を静かにつなぐ。

## SERP CONQUEST 正本

- `docs/serp-conquest/README.md` を、`tools.dakeapp.com`、`peakheadz.com`、`yukihikokikuta.com` を横断する大規模サープコンクエストの正本とする。
- DAKEの中心思想、三サイトの役割、公開予定ページ、実装順、重複禁止、計測方針を同文書で管理する。
- 三サイトの役割、URL、公開順、相互リンク方針を変更する場合は、同文書を先に更新する。

## 世界観

合言葉は "Stay motion."。TOPは作品一覧や販売ページにせず、PEAKHEADZという場所へ入る静かな玄関として保つ。

## 技術構成

- 静的 HTML / CSS
- 静的ファイル: `public/`
- 公開索引: `public/index.html`, `public/about.html`, `public/information.html`, `public/projects/index.html`, `public/orbit/index.html`
- 凍結保持: `public/quiet-workflow/index.html`, `public/it-support/`
- CSS: `public/assets/css/style.css`
- 画像: `public/assets/`
- Cloudflare Pages Build output directory: `public`
- Cloudflare 設定: `wrangler.toml`
- Cloudflare Pages で静的公開

## 触ってよい範囲

- 本文、リンク、活動情報、Signals の更新
- `public/assets/css/style.css` の軽微な表示調整
- `public/assets/` 内のロゴ・写真の差し替え
- README の運用ルール更新

## 触らない範囲

- PEAKHEADZ の屋号、基本トーン、"Stay motion." の軸
- 本番ドメイン `peakheadz.com`
- GitHub remote / Cloudflare Project 設定
- 外部リンクの削除や意味変更

## deploy手順

1. 変更前にこの README を読む。
2. `git status` で既存変更を確認する。
3. 変更後に表示確認を行う。
4. 変更ファイルを明示して `git add` する。
5. `git commit -m "Update peakheadz site"`
6. `git push origin main`
7. Cloudflare Pages のデプロイ完了を確認する。

## Cloudflare Pages 確認メモ

- Cloudflare Pages project name: `peakheadz-site`
- Build command: none / 空欄
- Build output directory: `public`
- Production branch: `main`
- favicon / manifest は `public/assets/favicon/` を公開元にする。
- Pages構成と favicon 構成は衝突していない。

## 次にやること

- `information.html` の Selected Works は、現在動いている代表作に絞って更新する。
- 関連サイトが増えたらリンクと README を同時に更新する。

## quiet workflow design

- `/quiet-workflow/` は凍結中。URLは200で保持するが、`noindex,follow` とし、sitemapと現在活動の内部導線から外す。
- ページ内容は将来再開できる状態で保管し、新規受付中には見せない。

## 小さい会社のIT係

- `/it-support/` と配下ページは凍結中。既存URLは200で保持するが、`noindex,follow` とし、sitemapと現在活動の内部導線から外す。
- 過去の料金・地域・連絡方法・計測記録は、再開判断に備えて削除せず保管する。
- Googleビジネスプロフィールの変更正本は `docs/google-business-profile/` に置く。実際のプロフィール変更や分析IDの設定は人間確認後に行う。

## favicon / app icon

- favicon assets: `/assets/favicon/`
- SVG, ICO, apple-touch-icon, 192px / 512px PNG, and `site.webmanifest` を配置する。
- HTML head には favicon / apple-touch-icon / manifest / theme-color を設定する。
- 仮アイコンは後から差し替え可能。小サイズでの識別性と静かな空気感を優先する。
## sitemap / robots

- 新しい公開HTMLページを追加したら `sitemap.xml` にURLを追加する。
- 検索に出したくないページは `sitemap.xml` に入れない。
- `robots.txt` の Sitemap URL が本番ドメインを指しているか確認する。
- GitHub push後、Cloudflare反映後に `/sitemap.xml` と `/robots.txt` を確認する。
- 生成する場合は `node scripts/generate-sitemap.js` を実行する。npm build化は不要。


## ORBIT

- URL: `/orbit/`
- PEAKHEADZの活動軌道を置くページ。
- リンク集、営業LP、実績紹介ではなく、運用中・実験中・保守中・凍結を同じ景色として扱う。
- トップからは強いCTAにせず、静かなnav導線として置く。
- サイト、DAKE、SHIMARISU、BRAINZ、OIKAWA、QPSC、Archivesを並べる。
- DAKE Series は `DAKE_series/01_apps/` の実フォルダを基準に全量表示する。省略してチップ化しない。
- 数字は更新時点の正本基準でよい。リアルタイム集計ではなく、確認できた実数を置く。
- 新しい活動を追加したら、必要に応じて `/orbit/` と `sitemap.xml` を更新する。

## DAKE GAMES

- URL: `https://games.dakeapp.com/`
- Treat as a quiet side path for DAKE games and playable experiments.
- Add it through ORBIT / Information rather than making it a top-page CTA.

## DAKE_WEB_META

```json
{
    "site_key":  "peakheadz-site",
    "display_name":  "PEAKHEADZ",
    "repo_name":  "peakheadz-site",
    "domain":  "peakheadz.com",
    "cloudflare_project":  "peakheadz-site",
    "site_type":  "static",
    "has_functions":  false,
    "has_openai_api":  false,
    "health_url":  "",
    "production_url":  "https://peakheadz.com",
    "status":  "active",
    "category":  "PEAKHEADZ",
    "show_on_dashboard":  true
}
```

## IT support archive record

- 佐倉市・印西市・成田市の地域ページと3つのサービスページは、過去の実装記録として保持する。
- 2026年の情報設計再編後はすべて凍結し、`noindex,follow` としてsitemapから除外する。
- 料金・連絡方法・実例・市場観測・GBPの正本は `docs/it-support/` と `docs/google-business-profile/` に分離している。
- 事例ページは会社名・写真・説明の掲載承諾がpendingのため、引き続き `noindex,follow` とする。
