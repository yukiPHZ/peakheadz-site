# Legacy Revival — PEAKHEADZ側Checkpoint

2026-10-09。全体正本: kokuchijiko-astra-game/PROJECT_STATE.md。

- 実施内容: Projectsへの告知事項1項目、専用ローカルレビュー生成、SERPの役割分担と公開順記録。
- 判断: TOP・既存活動・ORBITの全量一覧を変えず、Projectsに最小入口を置く。候補domainと接続確認済みURLを混同せず、今はlocalhostへのレビュー導線だけ。
- 検証: 実ブラウザで390px横はみ出しなし。Projectsの確認用リンクから新作トップへ遷移し、タイトルとURL一致。public/差分なし。
- 残課題: Officialの完成と公開URL確認後に、リンク・制作中表記を実状態へ更新。Productionへの反映なし。
- repo / branch / commit: peakheadz-site / codex/legacy-revival-20261009。基点ee4e5b2ebd9db4d0c9ca06ef7df89b79eb2735b8。成果commitは git log -1 -- data/legacy-revival.json。
- Production / Preview: public/変更0。push/merge/deployなし。node scripts/legacy-review.cjs → node scripts/legacy-review.cjs --serve でlocalhost:4192/projects/。
- 次工程: 確認後commit。全体のr033以降の画像制作と横断QAへ。
