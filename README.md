# PEAKHEADZ Site

## サイト役割

PEAKHEADZ の屋号・活動・関連プロジェクトを束ねる本部サイト。対外的な確認ページとして、DAKE、しまりす不動産、制作物、発信活動への入口を置く。

## 世界観

合言葉は "Stay in motion."。ポートフォリオだけではなく、仕事・開発・制作・発信が動き続けている気配を静かに見せる。

## 技術構成

- 静的 HTML / CSS
- 静的ファイル: `public/`
- ルート: `public/index.html`, `public/about.html`, `public/information.html`, `public/quiet-workflow/index.html`
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

- PEAKHEADZ の屋号、基本トーン、"Stay in motion." の軸
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

- `information.html` の Links / Signals を定期更新する。
- 関連サイトが増えたらリンクと README を同時に更新する。

## quiet workflow design

- `/quiet-workflow/` を追加。
- 静かな実務導線と、止まらない仕組みを整えるサービスページ。
- 営業LPではなく、PEAKHEADZ の稼働思想から派生した小さなサービスページとして置く。
- 千葉県印西市を拠点に、車で1時間圏内を中心にするサービス。
- `/quiet-workflow/` への内部導線をトップ / Information / About に追加。
- quiet workflow design は、PEAKHEADZ の稼働思想から派生した静かな実務導線サービスとして扱う。
- 導線は営業LP化せず、静かに認識できる程度に調整する。

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
