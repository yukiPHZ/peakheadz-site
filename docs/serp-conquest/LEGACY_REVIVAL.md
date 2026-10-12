# 告知事項 Legacy Revival — 検索意図と導線

## Phase FINAL — 2026-10-12

告知事項公式 https://kokuchijiko.peakheadz.com/ は公開・Production検証済み。公開source31d24f2、Worker version4521c8b5-bf03-4827-a20e-37413a2d77b4。人物帳・ゲームは作品公式、本編は公開準備中。124人の個別SEOページを増やさず人物帳IDへ結ぶ。

最新maine52b5ebを取り込み、Projectsの既存gridへ1カード・通常リンク1本だけ追加。CONNECT/計測runtime・凍結ページ・他ブランドの責任は維持。新しい計測alias/eventなし。本人サイトは日英Legacyの一次証拠と実物。STARTの旧コード記事A/継承記事BはDraft PR #11で公開HOLD。公開拒否ゲートと32route観測窓を維持し、未公開URLへCTAを置かない。

QA: 公式リンク1件、localhost URLなし、既存8テスト、390px表示/overflowなし。検索成果baseline pending。PR17はmain cf66005f60a83eac88a65a0e39e5377e40c8d9f7へmerge。Pages deployment 0f3e3681-148f-4a99-88ef-3e4164c66305 はsuccess。2026-10-12 22:44:36 JSTに本番/projects/のHTTP200、作品カードと公式リンクを照合。390pxをDOMで実測し横はみ出しなし。証跡は制作母艦related-production.jsonとlaunch-qa/peakheadz-project-verified-mobile.jpg。以下は初期案の履歴。

2026-10-09、ローカルレビュー段階。検索順位・流入・インデックス効果は未測定。既存の四surfaceの責任を変更せず、作品本体を『告知事項』の独立した正本とする。

|Surface|役割・意図|今回の候補|状態|
|---|---|---|---|
|告知事項 Official|作品を知る、人物を探す、名前当てを遊ぶ|kokuchijiko.peakheadz.com /characters/ /quiz/|候補domain。ローカル43問、124人物台帳|
|START|古いコードを次の作品へ使う過程を読む|/making/lolquiz-to-kokuchijiko/|専用ローカルレビュー、通常public対象外|
|START|人物帳と4択で同じデータを使う設計を知る|/making/character-data-for-quiz/|実装から生まれた1記事。通常public対象外|
|人物サイト|菊田幸彦の以前からの実装を確かめる|/about/#legacy-title|固定commitの実物リンクを持つ節。ローカルレビュー|
|PEAKHEADZ|活動母体から作品へ静かに入る|/projects/の1項目|ローカルレビュー候補。TOPを作品一覧にしない|
|LoLQuiz|当時の実物を読む|yukiPHZ/LoLQuiz commit 25060dac…|外部の公開一次資料。変更しない|

## 重複しない接続

Officialは作品・人物・遊びが中心。Aboutの短い制作説明から、公開後のSTART制作記録へつなぐ。ゲームの終了や利用を記事閲覧の条件にしない。

STARTは手順と判断、人物サイトは原点と実績、PEAKHEADZは一つの作品紹介だけ。人物プロフィール・コード解説・人物名ページを別ドメインへ反復掲載しない。124人の個別SEOページは作らず、同一人物帳内のIDへ結ぶ。

## 公開順

1. Officialの124人とゲームを完成、第三者IP・私的正本の混入、例外、操作を確認。
2. Official専用Previewと権利・未確認事項を整理し、Production対象revisionとdomainを具体化。
3. 公開済みURLを確認してからSTARTの実物導線と時点情報を更新し、記事本文をレビュー。
4. 人物サイトの原点節とPEAKHEADZの1項目を同じ公開状態へ整合。

各Production公開、DNS、main mergeは対象を具体化した後の判断。commitやlocalhost確認はProduction公開ではない。通常のリンクのみで、新計測event/alias/GA4設定は追加しない。

## 根拠

- Official実装: kokuchijiko-astra-game commit 93bc9b9、画像checkpoint 0692547。
- START原稿: peakheadz-start-site commit 4da3548。
- 人物サイト: yukihikokikuta-site commit 933ca66（ignore保全修正5db37de）。
- 統合状態: kokuchijiko-astra-game/PROJECT_STATE.md。

公開記事の本数は制作上の独立した判断に合わせる。現時点は上記2原稿だけ。競合検索やキーワード量を理由に増やさない。
