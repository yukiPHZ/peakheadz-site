# SERP CONQUEST Domain Audit — 2026-08-13

この文書は、菊田幸彦 SERP CONQUEST を実装する前のドメイン・ライフサイクル監査スナップショットです。

目的は、Google検索に残っている旧URL、GitHubに残っているrepo、現在の正本URLを混同しないことです。

## 判断優先順位

1. `peakheadz-project-index/PEAKHEADZ_PROJECT_INDEX.md` の最新状態
2. 対象repoの `ORIGINAL.md`
3. 対象repoの `README.md`
4. ドメイン移行ログ
5. 現在の公開・検索観測

検索結果に表示されることだけでは「現役ドメイン」と判断しません。

---

# 1. 現行の中核・実装候補

| Site | Current canonical / production target | Source-of-truth state | 2026-08-13 observation | SERP action |
|---|---|---|---|---|
| PEAKHEADZ | `peakheadz.com` | 運用中 | Web到達確認 | Priority 0。About / Information を強化 |
| DAKE | `dakeapp.com` | 運用中 | Web到達確認。既存 `/about/` あり | Priority 1。既存Aboutを強化 |
| DAKE Web Tools | `tools.dakeapp.com` | 運用中 | Web到達確認。creator creditあり | Priority 1。`/about/` 新設候補 |
| DAKE GIS | `gis.dakeapp.com` | 試作運用中 | Web到達確認 | Priority 2。About相当を整備 |
| DAKE AI | `ai.dakeapp.com` | 運用中 | Web到達確認 | Priority 2。About相当を整備 |
| DAKE Labs | `labs.dakeapp.com` | 試作運用中 / DAKE Network beta | DAKE本体の現行Networkから導線確認。Web検索単独確認は弱い | 実装前に公開到達を再確認 |
| DAKE Store | `store.dakeapp.com` | 運用中 / Network beta | Web到達確認 | Priority 2。販売法務ページと分離したAbout/colophon |
| DAKE Games | `games.dakeapp.com` | 運用中 | Web到達確認。既存About導線あり | Priority 2。既存Aboutを強化 |
| DAKE Samples | `samples.dakeapp.com` | 運用中 / Network public | GitHub正本でpublic。Web単独確認は未完 | 実装前に公開到達を再確認 |
| Japan Memory Lane | `japanmemorylane.com` | 運用中 | 個人サイト・PEAKHEADZから現行導線あり。単独Web確認は未完 | Priority 1。About相当を監査 |
| Yukihiko Kikuta | `yukihikokikuta.com` | 運用中 | Web到達確認 | Priority 0。人物エンティティ正本 |
| しまりす不動産 | `shimarisu-fudosan.com` | 運用中 | Web到達確認。現在は「菊田」表記中心 | Priority 1。フルネームと個人正本を接続 |
| NICE SKILL | `niceskill.com` | 運用中 | Search indexで既存About確認。「ユキズ」表記 | Priority 1。菊田幸彦との自然な接続 |

---

# 2. DAKE / SHIMARISUで索引差分があるもの

## `shimarisu.dakeapp.com`

- Web到達確認済み。
- repo `shimarisu-dakeapp-site` の `DAKE_WEB_META` は `status: active`。
- READMEでは、PEAKHEADZがumbrella、SHIMARISUが判断レイヤー、DAKEが処理ツール群と定義されている。
- DAKEとSHIMARISUは上下関係ではなく並列役割。
- 最新 `PEAKHEADZ_PROJECT_INDEX.md` の全サイト一覧には未掲載。

### 対応

- プロジェクト索引へ追加候補。
- DAKE Networkへの自動追加はしない。SHIMARISUはDAKEとは別役割のため、DAKE Network正本の判断を尊重する。
- 菊田幸彦SERPでは、ブランド世界観を壊さない短いAbout/credit対象とする。

---

# 3. MIGRATED — 新URLだけを育てる

| Legacy domain | Current target | Current source-of-truth | Search observation | Action |
|---|---|---|---|---|
| `soredake.com` | `pdfmerge.dakeapp.com` | 移行済み設計 | 新URLは検索で強く確認できず | 旧URLへ新規Aboutを作らない。新URL到達・redirect確認後に実装 |
| `sky.holiday-jinja.com` | `sky.niceskill.com` | 移行済み設計 | 新URL単独確認は未完 | 新URLのみ対象。旧URLはredirect/保全 |
| `nicekip.com` | `nicekip.yukihikokikuta.com` | 移行済み設計 | Google/Web indexでは旧 `nicekip.com` がまだ見える | 旧検索結果を理由に旧サイトを再編集しない。新URLだけを育てる |
| `wlzphz.com` | `wlzphz.peakheadz.com` | 移行済み設計 | 旧 `wlzphz.com` の検索残存あり | 新URLだけを育てる |
| `yukizblog.com` | `yukizblog.yukihikokikuta.com` | 移行済み設計 | 旧 `yukizblog.com` の検索残存あり | 新URLだけを育てる |

## 移行URLの実装ゲート

人物名施策を入れる前に、次を確認する。

- 現行custom domainがCloudflare Pagesに接続済み
- canonicalが現行URL
- sitemapが現行URL
- 旧URLのredirect状態
- Search Consoleで現行URLが認識されているか

未確認ならSEO本文を先に増やさない。

---

# 4. FROZEN / PRESERVE — 触らない

| Site | Domain | State | SERP rule |
|---|---|---|---|
| holiday-jinja | `holiday-jinja.com` | 凍結対象 | 菊田幸彦SERPのために再編集しない |
| holiday side | `side.holiday-jinja.com` | 移行しない保全対象 | 新規About・人物名追記をしない |
| holiday blue | `blue.holiday-jinja.com` | 移行しない保全対象 | 新規About・人物名追記をしない |

旧検索結果が残っていても、そのまま「過去の痕跡」として扱う。

---

# 5. VERIFY-FIRST

以下は、repoや過去導線が存在しても、最新の全サイト索引で現行公開URLとして確定していないため、人物名SERP実装を保留する。

- BORINEF / `borinef.com`
- その他、プロジェクト索引外の独自ドメイン
- 過去のrestore repoやarchive repo
- Google検索にだけ残っている旧URL

確認項目：

- ドメイン契約継続
- Cloudflare custom domain
- production deploy
- canonical / sitemap / robots
- 今後も育てる意思があるか

---

# 6. 検索上の重要な解釈

2026-08-13の外部観測では、旧 `nicekip.com`、旧 `wlzphz.com`、旧 `yukizblog.com` 等が検索・クロール情報として残っている。

これは「旧ドメインを再び育てるべき」という意味ではない。

サープコンクエストでは、検索結果の残響と現在の運用を分離する。

- 現在の活動 → 現行canonical URLを育てる
- 過去の検索資産 → redirect / canonical / Search Consoleで新URLへ収束させる
- 凍結サイト → 再稼働しない

---

# 7. 次の実装順

1. `yukihikokikuta.com` の日本語名・Person正本強化
2. `peakheadz.com` のOrganization / 運営者関係強化
3. `dakeapp.com/about/` のDAKE原点・制作者関係強化
4. `tools.dakeapp.com/about/` の新設
5. `shimarisu-fudosan.com` のプロフィール強化
6. 現行URL到達を確認したうえで Japan Memory Lane / NICE KIP / NICE SKILL
7. DAKE Networkの各現行サブドメイン
8. 移行済み新サブドメイン

FROZEN / 旧独自ドメインはこの実装列に含めない。
