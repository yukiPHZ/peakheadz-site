# 菊田幸彦 SERP CONQUEST

この文書は `docs/serp-conquest/README.md` に従属する、人物名検索の横断実装仕様です。

目的は「菊田幸彦」という名前を不自然に大量掲載して検索結果を操作することではありません。

菊田幸彦が実際に作成・運営・関与している各サイトについて、そのサイトと本人の関係をユーザーにも検索エンジンにも正しく分かる形で残し、結果として「菊田幸彦」で検索したときに本人の活動・制作物・サイト群が自然に認識される状態を目指します。

---

# 1. 基本思想

## 名前を撒かない

- 全ページの title に「菊田幸彦」を付けない。
- 全ページへ同じプロフィール文を貼らない。
- 検索だけのための人物ページを大量生成しない。
- 各サイトから個人サイトへ強制的に送客しない。

## 関係を明示する

各サイトには、そのサイト固有の文脈で「誰が、なぜ、どのように関わっているか」が分かる About / Information / Profile / Colophon 相当のページまたはセクションを置く。

そこでは自然な範囲で以下を明示する。

- 菊田 幸彦
- Yukihiko Kikuta
- そのサイトでの役割（運営、制作、企画、開発、執筆など）
- PEAKHEADZ / DAKE との関係（該当する場合のみ）
- `https://yukihikokikuta.com/` への静かなリンク

## サイトごとの意味を残す

同じ人物説明をコピーしない。

例：

- DAKE Web Toolsでは「不動産実務で人が止まる場所を見てきたことから、小さなWeb道具を作っている人」
- Japan Memory Laneでは「写真と言葉の記憶を残す人」
- NICE KIPでは「自分の家と暮らしを記録してきた人」
- PEAKHEADZでは「屋号・活動全体を運営する人」

同じ人物でも、各サイトが映す面を変える。

---

# 2. 現在の検索観測（2026-08-13）

外部検索で `菊田幸彦`、`菊田 幸彦`、`Yukihiko Kikuta` と関連サイトを確認した。

現時点では、自サイト群の中では主に次が検索上で認識されている。

- `yukihikokikuta.com` 本体
- `peakheadz.com` の Information / 運営情報
- `tools.dakeapp.com`（英字の creator credit を含む）
- `shimarisu-fudosan.com` の人物・プロフィール導線
- 旧独自ドメイン時代の NICE KIP / NICE SKILL / YUKIZ BLOG 等の一部ページ

重要なのは、検索結果に表示されるURLと、現在の運用正本URLは必ずしも一致しないことである。

移転前URLや契約終了予定・保全対象ドメインが検索結果に残っていても、それを理由に旧ドメインへ新しいAboutや人物名施策を追加しない。

検索結果は端末、地域、履歴、クロール時期で変わるため、順位や表示件数そのものを固定目標にはしない。

---

# 3. 人物エンティティの正本

## 正本URL

`https://yukihikokikuta.com/`

## 表記

- 日本語表示：`菊田 幸彦`
- 検索・metadataで必要に応じて：`菊田幸彦`
- 英語：`Yukihiko Kikuta`

表記ゆれを乱立させない。

## 個人サイトで持つ情報

`yukihikokikuta.com` は人物エンティティの中心とする。

最低限、以下を整える。

- 日本語トップの title / description / visible text に `菊田幸彦` または `菊田 幸彦` を自然に含める
- `/about/` を人物の基礎情報ページとする
- `/dake/` をDAKEを作る理由の正本とする
- `/peakheadz/` をPEAKHEADZとの関係の正本とする
- `/work/` を不動産実務とWeb制作・道具づくりの接点として扱う
- `ProfilePage` + `Person` の構造化データを検討する
- `sameAs` は本人の公式SNS・GitHub・必要な公式プロフィールだけに絞る

---

# 4. ドメイン・ライフサイクルゲート

人物名SERP施策は、ドメインが存在するという理由だけでは実行しない。

各サイトへ変更を入れる前に、必ず次の順で確認する。

1. `peakheadz-project-index/PEAKHEADZ_PROJECT_INDEX.md` の最新状態
2. 対象repoの `ORIGINAL.md`（存在する場合）
3. 対象repoの `README.md`
4. 現在の公開URL / redirect / noindex 状態
5. 必要に応じてドメイン契約・Cloudflare Pages側の現行状態

## 状態区分

### ACTIVE

現在の正本URLとして運用中。About / Information / Profile の強化対象にできる。

### MIGRATED

新URLへ移転済み。人物名施策は新URLだけに実装する。

旧URLはredirect・移転案内・既存検索結果の保全対象であり、新規コンテンツを追加しない。

### FROZEN / PRESERVE

凍結・保全対象。検索順位や人物名SERPのために再編集しない。

### RETIRED / VERIFY-FIRST

契約終了、公開停止、正本外、状態不明の可能性がある。確認できるまで変更しない。

## 衝突時のルール

- Google検索結果よりプロジェクト索引の現在状態を優先する。
- 古いREADMEより最新の `ORIGINAL.md` / プロジェクト索引を優先する。
- GitHub repoが存在していても、公開ドメインが現役とは限らない。
- 検索結果に旧URLが残っていても、その旧URLへSEO目的の新規ページを追加しない。
- 状態が曖昧なら `VERIFY-FIRST` とし、実装対象から外す。

---

# 5. 各サイト共通の実装パターン

## A. 既存About / Informationがある

新しい人物ページを増やさず、既存ページを強化する。

追加候補：

- title に自然な範囲で人物名を含める
- 見出しまたは本文に `菊田 幸彦（Yukihiko Kikuta）`
- このサイトでの本人の役割
- 個人サイトへのリンク
- 必要に応じて creator / author / publisher の構造化データ

## B. Aboutがない独立サイト

`/about/` または既存世界観に合う `information` / `profile` / `colophon` を1ページだけ追加する。

検索用の薄いページにせず、以下を固有情報として入れる。

1. このサイトは何か
2. なぜ作ったか
3. 菊田幸彦が何をしているか
4. 関連する母体・プロジェクト
5. 個人サイトへの静かな導線

## C. DAKE系サブドメイン

DAKEの共通ネットワークは保ちながら、各サブドメインの役割を優先する。

個別ツール全ページに人物紹介を追加しない。

各サブドメインの About / Information 相当で、実際の関係に沿って、企画・制作・開発等の本人の役割を短く明示する。

DAKE共通フッターの `by PEAKHEADZ` は維持し、人物名を無理に共通フッターへ追加しない。

---

# 6. 現行対象サイト・ドメインマトリクス

基準：2026-08-13時点の最新プロジェクト索引、DAKE Network正本、GitHub構成、公開確認。

## ACTIVE / 現行URL

| サイト | 現行ドメイン | 人物名SERP方針 |
|---|---|---|
| PEAKHEADZ | `peakheadz.com` | 既存 About / Information を強化。運営者として菊田幸彦を明確化 |
| DAKE | `dakeapp.com` | 既存 About にDAKEの原点と制作者を短く明示 |
| DAKE Web Tools | `tools.dakeapp.com` | `/about/` を追加。個別ツール上部には人物説明を足さない |
| DAKE GIS | `gis.dakeapp.com` | About相当で役割と制作関係を明示 |
| DAKE AI | `ai.dakeapp.com` | About相当でAI利用方針と制作関係を明示 |
| DAKE Labs | `labs.dakeapp.com` | 実験場としての説明と制作者を静かに明示 |
| DAKE Store | `store.dakeapp.com` | 法務・販売情報と衝突しないAbout / colophonで制作関係を明示 |
| DAKE Games | `games.dakeapp.com` | 既存Aboutでゲーム・試作の作者として自然に明示 |
| DAKE Samples | `samples.dakeapp.com` | 素材ライブラリとしてAbout / colophonを短く整備 |
| PDF Merge LP | `pdfmerge.dakeapp.com` | 単機能LPの世界観を壊さず、About / creditで制作者を明示 |
| holiday sky | `sky.niceskill.com` | 現行URL側のみ。空を見る静かな体験を壊さず作者を短く明示 |
| Japan Memory Lane | `japanmemorylane.com` | 写真・言葉・記憶の作者として固有プロフィール |
| Yukihiko Kikuta | `yukihikokikuta.com` | 人物正本。日本語名、英字名、構造化データを一貫させる |
| しまりす不動産 | `shimarisu-fudosan.com` | 既存プロフィールの「菊田」をフルネーム中心へ強化 |
| NICE KIP | `nicekip.yukihikokikuta.com` | 現行URLのAbout / Profileで日本語名と過去記事authorを接続 |
| NICE SKILL | `niceskill.com` | 既存Aboutの「ユキズ」を菊田幸彦と自然に接続 |
| WLZPHZ | `wlzphz.peakheadz.com` | signals / archiveの世界観を壊さず作者クレジットを整理 |
| YUKIZ BLOG | `yukizblog.yukihikokikuta.com` | 現行About / Profileで過去記事と人物正本を接続 |

## DISCOVERED ACTIVE / 索引追記確認

| サイト | ドメイン | 方針 |
|---|---|---|
| しまりすくん | `shimarisu.dakeapp.com` | 現在公開を確認。DAKEの特殊レイヤーとしてAbout/credit方針を別途決める。プロジェクト索引への登録要否を確認する |

## MIGRATED / 旧URLへ新規施策を入れない

| 旧URL | 現行URL | 扱い |
|---|---|---|
| `soredake.com` | `pdfmerge.dakeapp.com` | 旧URLはredirect前提。人物名施策は現行URLのみ |
| `sky.holiday-jinja.com` | `sky.niceskill.com` | 旧URLへ新規コンテンツを追加しない |
| `nicekip.com` | `nicekip.yukihikokikuta.com` | 検索に旧URLが残っていても現行URLを育てる |
| `wlzphz.com` | `wlzphz.peakheadz.com` | 旧独自ドメインへ新規人物ページを作らない |
| `yukizblog.com` | `yukizblog.yukihikokikuta.com` | 旧独自ドメインへ新規人物ページを作らない |

## FROZEN / PRESERVE

| サイト | ドメイン | 扱い |
|---|---|---|
| holiday-jinja | `holiday-jinja.com` | 凍結対象。SERP施策のために再編集しない |
| holiday side | `side.holiday-jinja.com` | 移行しない保全対象。新規人物名施策を入れない |
| holiday blue | `blue.holiday-jinja.com` | 移行しない保全対象。新規人物名施策を入れない |

## VERIFY-FIRST

- BORINEFその他、最新プロジェクト索引に現行公開URLとして載っていない独自ドメイン
- GitHub repoだけが存在するサイト
- Google検索には出るが、移転・解約・保全状態が不明な旧URL

これらは契約・公開状態が確認できるまでSERP実装対象にしない。

---

# 7. 優先順位

## Priority 0: 人物正本と母体

1. `yukihikokikuta.com/`
2. `yukihikokikuta.com/about/`
3. `peakheadz.com/about.html`
4. `peakheadz.com/information.html`

ここで `菊田 幸彦` / `Yukihiko Kikuta` / PEAKHEADZ / DAKE の関係を一貫させる。

## Priority 1: 検索・活動の中核

5. `dakeapp.com/about/`
6. `tools.dakeapp.com/about/`
7. `shimarisu-fudosan.com` の既存プロフィール
8. `japanmemorylane.com` About相当
9. `nicekip.yukihikokikuta.com` About/Profile
10. `niceskill.com` About/Profile

## Priority 2: DAKEネットワーク

- `gis.dakeapp.com`
- `ai.dakeapp.com`
- `labs.dakeapp.com`
- `store.dakeapp.com`
- `games.dakeapp.com`
- `samples.dakeapp.com`
- `pdfmerge.dakeapp.com`
- `shimarisu.dakeapp.com`

## Priority 3: 現行の静かな枝・アーカイブ

- `sky.niceskill.com`
- `wlzphz.peakheadz.com`
- `yukizblog.yukihikokikuta.com`
- その他 ACTIVE と確認できたサイト

FROZEN / MIGRATED旧URL / VERIFY-FIRST は優先順位に入れない。

---

# 8. 構造化データ方針

## yukihikokikuta.com

人物ページを主役として `ProfilePage` / `Person` を検討する。

Personの識別は、同じ canonical URL と同じ name を使う。

## PEAKHEADZ

`Organization` を中心にし、運営者・創設者等の関係は実態に合う範囲で Person と接続する。

## 制作サイト

構造化データを入れる場合も、ページ本文に存在しない関係をschemaだけで作らない。

- `creator`
- `author`
- `publisher`

は、そのサイト・ページの実態に応じて使い分ける。

全サイトに同じschemaを機械的に貼らない。

---

# 9. 内部・外部リンク方針

## 各サイト → 菊田幸彦

About / Information 等から1本の静かなリンクで十分。

アンカーテキスト例：

- 菊田 幸彦
- Yukihiko Kikuta
- つくっている人
- 運営者について

全ページの本文から毎回リンクしない。

## 菊田幸彦 → 各サイト

`yukihikokikuta.com` は全サイト一覧ページにはしない。

代表的な活動だけを本文で扱い、全量はPEAKHEADZ ORBIT等へ任せる。

移転済みサイトへのリンクは必ず現行URLへ向ける。

## PEAKHEADZ

全活動を束ねるハブとして、Projects / ORBIT / Information から関係を整理する。

FROZEN / RETIRED は現行活動一覧へ混ぜず、必要ならarchive文脈で扱う。

---

# 10. やらないこと

- `菊田幸彦` を不自然に何十回も書く
- 各ツールタイトルに氏名を付ける
- 全サイトへ同じ人物紹介文をコピペする
- `菊田幸彦とは` のような検索専用ページを複数ドメインで作る
- 名前検索だけを目的とした doorway page を作る
- 実際には本人が作成・運営していないページまで creator として主張する
- SNSや外部プロフィールを `sameAs` に無制限に列挙する
- MIGRATED旧URLへ新しいAboutや記事を追加する
- FROZEN / PRESERVEサイトを人物名SERPのために再稼働する
- repoがあるだけでドメイン契約が続いていると判断する

---

# 11. 計測

Search Consoleで、少なくとも以下を定期観測する。

- `菊田幸彦`
- `菊田 幸彦`
- `Yukihiko Kikuta`
- `菊田幸彦 DAKE`
- `菊田幸彦 PEAKHEADZ`
- `Yukihiko Kikuta DAKE`

記録項目：

- 表示ドメイン
- 表示URL
- そのURLの lifecycle state
- 表示回数
- クリック数
- 平均掲載順位
- 新しく出現した現行自サイト
- 検索に残っている旧URL
- 消えた自サイト

30日・90日単位で確認し、「検索結果を全部自サイトで埋める」こと自体をKPIにはしない。

旧URLが検索に残っている場合は、検索順位を守るために旧URLへコンテンツを足すのではなく、redirect / canonical / 現行URLの認識状況を確認する。

目標は、検索者が本人の現在の活動を正しく理解できる複数の入口を持つこと。

---

# 12. 実装完了の定義

各 ACTIVE 公開サイトについて、次のどれかを満たす。

1. 既存About / Information / Profileに菊田幸彦との固有の関係が明示されている
2. 固有の価値を持つAbout相当ページが追加されている
3. 世界観上人物名を前面に出すべきでないサイトは、静かなcreditと母体への関係だけを正しく持つ

MIGRATED旧URL、FROZEN / PRESERVE、VERIFY-FIRSTは実装完了対象に数えない。

そして、`yukihikokikuta.com` を人物正本として、PEAKHEADZと現在の各制作物が検索エンジン上でも人間にも同じ人物へ自然につながる状態を作る。
