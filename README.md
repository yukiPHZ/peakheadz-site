# PEAKHEADZ Site

## サイト役割

PEAKHEADZ の屋号・活動・関連プロジェクトを束ねる本部サイト。対外的な確認ページとして、DAKE、SHIMARISU、しまりす不動産、制作物、発信活動、地域向けサービスへの入口を置く。

PEAKHEADZ自体を「小さい会社のIT係」と同一視しない。IT支援はPEAKHEADZから派生する一活動として扱い、トップでは母体・プロジェクト・運営者の関係を先に理解できる状態を保つ。

## 世界観

合言葉は "Stay in motion."。ポートフォリオだけではなく、仕事・開発・制作・発信が動き続けている気配を静かに見せる。

`Builder of Calm. Build calm. Keep moving.` と「止まらないために、安心をつくる。」の軸を維持する。

## KIKUTA / SERP relationship

- PEAKHEADZはOrganization / umbrella側の正本。
- 人物正本は `https://yukihikokikuta.com/`。
- 運営者は `菊田 幸彦（Yukihiko Kikuta）` と自然に明示する。
- 氏名を全ページtitleへ付けたり、同じ人物紹介文を反復したりしない。
- トップはPEAKHEADZ自体を主役にし、人物名は母体との実際の関係を説明する範囲で使う。
- `/about.html`、`/information.html`、`/projects/` から人物正本へ静かにつながる状態を目指す。
- Organizationの構造化データを使う場合も、本文にない人物関係をschemaだけで作らない。

横断SERP CONQUESTの正本は `docs/serp-conquest/README.md` と `docs/serp-conquest/KIKUTA_SERP.md` を参照する。

## 技術構成

- 静的 HTML / CSS
- 静的ファイル: `public/`
- ルート: `public/index.html`, `public/about.html`, `public/information.html`, `public/projects/index.html`, `public/quiet-workflow/index.html`
- CSS: `public/assets/css/style.css`, `public/assets/css/serp-foundation.css`
- 画像: `public/assets/`
- Cloudflare Pages Build output directory: `public`
- Cloudflare 設定: `wrangler.toml`
- Cloudflare Pages で静的公開

## 触ってよい範囲

- 本文、リンク、活動情報、Signals の更新
- `public/assets/css/style.css` の軽微な表示調整
- `public/assets/css/serp-foundation.css` の母体・Projects表示調整
- `public/assets/` 内のロゴ・写真の差し替え
- README の運用ルール更新

## 触らない範囲

- PEAKHEADZ の屋号、基本トーン、"Stay in motion." の軸
- 本番ドメイン `peakheadz.com`
- GitHub remote / Cloudflare Project 設定
- 外部リンクの削除や意味変更
- PEAKHEADZ全体を地域ITサービスだけに寄せること
- SERP目的だけの人物名反復やdoorway page追加

## deploy手順

1. 変更前にこの README を読む。
2. `git status` で既存変更を確認する。
3. 変更後に表示確認を行う。
4. 構造化データを変更した場合はJSON構文を確認する。
5. 変更ファイルを明示して `git add` する。
6. `git commit -m "Update peakheadz site"`
7. `git push origin main`
8. Cloudflare Pages のデプロイ完了を確認する。

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
- `/projects/` は外部の人が主要活動を理解する入口として保守し、全量表示はORBITへ任せる。
- `yukihikokikuta.com/#person` とPEAKHEADZの可視関係を、About / Informationで自然に維持する。

## Projects

- URL: `/projects/`
- PEAKHEADZの主要プロジェクトを、外部の人が理解できる粒度で置く。
- ORBITの全量・状態記録とは役割を分ける。
- 掲載対象は現行ACTIVEの代表活動を中心とし、凍結サイトや旧移転ドメインを現役プロジェクトとして混ぜない。
- 現時点の主な掲載対象: DAKE、DAKE Web Tools、SHIMARISU、しまりす不動産、Japan Memory Lane、小さい会社のIT係。
- 運営者として菊田幸彦への静かな導線を置くが、人物プロフィールページにはしない。

## quiet workflow design

- `/quiet-workflow/` を追加。
- 静かな実務導線と、止まらない仕組みを整えるサービスページ。
- 営業LPではなく、PEAKHEADZ の稼働思想から派生した小さなサービスページとして置く。
- 千葉県印西市を拠点に、車で1時間圏内を中心にするサービス。
- `/quiet-workflow/` への内部導線をトップ / Information / About に追加。
- quiet workflow design は、PEAKHEADZ の稼働思想から派生した静かな実務導線サービスとして扱う。
- 導線は営業LP化せず、静かに認識できる程度に調整する。

## 小さい会社のIT係

- `/it-support/` は、印西市を拠点にした地域小規模事業者向けの訪問ITサポート・業務改善の入口。
- PEAKHEADZの一活動であり、PEAKHEADZ全体の定義ではない。
- トップでは何をしているか分かる短い地域サービス導線として残すが、母体説明より前へ出しすぎない。
- 公開対象は本体、佐倉市・印西市・成田市の地域ページ、3つのサービスページ。地域ごとの相談理由を分け、三市を同時にindex対象として扱う。
- 地域の優先順位と公開状態は `data/it-support-areas.yaml` を正本とし、地域固有の事実が未承認のページは公開indexしない。
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

## IT support second audit

- 佐倉市・印西市・成田市を同時にindex候補として整え、それぞれ固有の相談理由を持つ地域ページにした。
- `/it-support/services/printer-scanner/`、`/it-support/services/pdf-electronic-contract/`、`/it-support/services/workflow-improvement/` を追加した。
- 料金・連絡方法・実例・市場観測・GBPの正本は `docs/it-support/` と `docs/google-business-profile/` に分離している。
- 事例ページは会社名・写真・説明の掲載承諾がpendingのため `noindex,follow`。市場観測は `configured_pending_deploy` で、本番の同意状態と実イベント受信の確認後に `active` とする。
