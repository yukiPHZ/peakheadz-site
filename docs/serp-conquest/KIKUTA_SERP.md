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

外部検索で `菊田幸彦`、`菊田 幸彦`、`Yukihiko Kikuta` を確認した。

現時点では、自サイト群の中では主に次が検索上で認識されている。

- `yukihikokikuta.com` 本体
- `peakheadz.com` の Information / 運営情報
- `tools.dakeapp.com`（英字の creator credit を含む）
- `shimarisu-fudosan.com/about` など一部の関連ページ
- `nicekip.com` の一部記事では `by yukihiko kikuta` が認識されている

一方、保有・運用しているサイト数に比べると、人物名との関連が検索結果上へ十分広がっているとは言いにくい。

検索結果は端末、地域、履歴、時期で変わるため、順位や表示件数そのものを固定目標にはしない。

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

# 4. 各サイト共通の実装パターン

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

各サブドメインの About / Information 相当で、

`DAKE / PEAKHEADZ によるプロジェクト。企画・制作：菊田 幸彦（Yukihiko Kikuta）`

のように、実際の関係に沿った短い説明を置く。

---

# 5. 対象サイト初期マトリクス

最終実装前にプロジェクト索引とGitHubを再監査し、現存する全公開ドメイン・サブドメインを確定する。

| サイト | ドメイン | 初期方針 |
|---|---|---|
| PEAKHEADZ | `peakheadz.com` | 既存 About / Information を強化。運営者として菊田幸彦を明確化 |
| DAKE | `dakeapp.com` | DAKE全体のAboutで原点と制作者を短く明示 |
| DAKE Web Tools | `tools.dakeapp.com` | `/about/` を追加。個別ツール上部には人物説明を足さない |
| DAKE GIS | `gis.dakeapp.com` | `/about/` または既存説明ページに制作・役割を明示 |
| DAKE AI | `ai.dakeapp.com` | `/about/` または既存説明ページに制作・AI利用方針と本人関係を明示 |
| DAKE Labs | `labs.dakeapp.com` | 実験場としての説明と制作者を明示 |
| DAKE Games | `games.dakeapp.com` | ゲーム・試作の作者として自然に明示 |
| soredake | `soredake.com` | 単機能LPの世界観を壊さず、About/creditで明示 |
| holiday-jinja | `holiday-jinja.com` | 休日・神社・写真の文脈で作者を明示 |
| holiday side | `side.holiday-jinja.com` | 本体との関係と作者を短く明示 |
| holiday sky | `sky.holiday-jinja.com` | 本体との関係と作者を短く明示 |
| holiday blue | `blue.holiday-jinja.com` | 本体との関係と作者を短く明示 |
| Japan Memory Lane | `japanmemorylane.com` | 写真・言葉・記憶の作者として固有プロフィール |
| Yukihiko Kikuta | `yukihikokikuta.com` | 人物正本。日本語名をSEO/visible text/構造化データで明確化 |
| しまりす不動産 | `shimarisu-fudosan.com` | 既存 `/about` の「菊田」をフルネーム中心へ強化 |
| NICE KIP | `nicekip.com` | 既存記事authorとの整合を取り、About/Profileで日本語名を明示 |
| NICE SKILL | `niceskill.com` | レビュー・実用コンテンツの運営者としてAbout/Profileを整備 |
| WLZPHZ | `wlzphz.com` | archive / signals の意味を壊さず作者クレジットを整理 |
| YUKIZ BLOG | `yukizblog.com` | 過去記事と現在の人物エンティティをAbout/Profileで接続 |

BORINEFその他、プロジェクト索引外で現在公開中の本人運営サイトは監査で追加する。

---

# 6. 優先順位

## Priority 0: 人物正本

1. `yukihikokikuta.com/`
2. `yukihikokikuta.com/about/`
3. `peakheadz.com/about.html`
4. `peakheadz.com/information.html`

ここで `菊田 幸彦` / `Yukihiko Kikuta` / PEAKHEADZ / DAKE の関係を一貫させる。

## Priority 1: 検索・活動の中核

5. `dakeapp.com` About
6. `tools.dakeapp.com/about/`
7. `shimarisu-fudosan.com/about`
8. `japanmemorylane.com` About
9. `nicekip.com` About/Profile
10. `niceskill.com` About/Profile

## Priority 2: DAKEサブドメイン

- `gis.dakeapp.com`
- `ai.dakeapp.com`
- `labs.dakeapp.com`
- `games.dakeapp.com`

## Priority 3: 世界観・枝・アーカイブ

- holiday-jinja系
- soredake
- WLZPHZ
- YUKIZ BLOG
- その他公開サイト

---

# 7. 構造化データ方針

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

# 8. 内部・外部リンク方針

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

## PEAKHEADZ

全活動を束ねるハブとして、Projects / ORBIT / Information から関係を整理する。

---

# 9. やらないこと

- `菊田幸彦` を不自然に何十回も書く
- 各ツールタイトルに氏名を付ける
- 全サイトへ同じ人物紹介文をコピペする
- `菊田幸彦とは` のような検索専用ページを複数ドメインで作る
- 名前検索だけを目的とした doorway page を作る
- 実際には本人が作成・運営していないページまで creator として主張する
- SNSや外部プロフィールを `sameAs` に無制限に列挙する

---

# 10. 計測

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
- 表示回数
- クリック数
- 平均掲載順位
- 新しく出現した自サイト
- 消えた自サイト

30日・90日単位で確認し、「検索結果を全部自サイトで埋める」こと自体をKPIにはしない。

目標は、検索者が本人の活動を正しく理解できる複数の入口を持つこと。

---

# 11. 実装完了の定義

各公開サイトについて、次のどれかを満たす。

1. 既存About / Information / Profileに菊田幸彦との固有の関係が明示されている
2. 固有の価値を持つAbout相当ページが追加されている
3. 世界観上人物名を前面に出すべきでないサイトは、静かなcreditと母体への関係だけを正しく持つ

そして、`yukihikokikuta.com` を人物正本として、PEAKHEADZと各制作物が検索エンジン上でも人間にも同じ人物へ自然につながる状態を作る。
