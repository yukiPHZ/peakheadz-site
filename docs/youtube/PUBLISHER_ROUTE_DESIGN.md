# Publisher commercial CTAとの整合案（変更・登録なし）

既存Publisher main `5525dc9` の `src/youtube-commercial.ts` を読み取り確認した。
v2原稿には正式製品URLとCTAが必要で、profile routeは `direct` / `verified_hub` を区別する。
`direct` のURLは製品URLと一致必須。`verified_hub` は別の入口URLを保持できるが、
同一channel、product ID/revision、実リンク名、確認証跡、有効期限、未失効が必要。
現在のPublisherは記録された証跡を検証する実装で、ハブやYouTubeプロフィールを
毎回ライブ巡回しているわけではない。このサイトの生成・Previewだけでは承認条件を満たさない。

## 検証する経路

1. 本人が選んだ正しいchannelの、**実際の公開プロフィールリンク**。
2. そのリンクから本番 `https://peakheadz.com/youtube/` への到達。
3. ハブ内の対象product IDに紐づくa要素から、製品正本の正式URLへの到達。

説明文内のURLは製品の直接URLを維持し、プロフィール誘導の文だけでハブを案内する。
ハブが存在しても、正式製品URLを説明文から除外しない。

## 今回作った読み取り材料

- `public/youtube/destinations.json`: 製品ID/正式名称/正式URL/anchor/channel IDを
  catalogから生成した公開view。runtimeの正本や投稿状態DBにはしない。
- 各実製品リンクの `data-youtube-product`、安定anchor `#dake_pdf_merge`。
- `scripts/verify-youtube-hub.mjs`: PreviewのHTML/manifestをGETし、実a要素と
  product/channel/canonicalの一致を検査。HTML/manifestのSHA-256を証跡にする。
- この検証器はPreview用で、必ず `publisherRouteReady=false` を返す。
  成功ログを本番routeのverified証跡として転用しない。

## 本番公開承認後の最短手順案

1. 本人のPreview確認後、別承認でmain反映・本番公開。releaseStage/robots/sitemapを整合する。
2. 実本番のHTTP・表示・製品リンク・manifest・リダイレクト先を確認し、時刻とhashを記録。
   Preview専用検査を本番readyとして偽装せず、本番対象の読み取り検証として実装/レビューする。
3. 本人がYouTube Studioでプロフィールに本番ハブを設置。表示名は本人が確定する。
4. 公開チャンネルの実表示名・URLを確認し、同じchannel IDで1→2→3の経路を実測する。
5. 本人の承認後、既存Access保護APIで新しいroute IDを `route_kind=verified_hub` として登録。
   `status=verified` は実測後だけ。product ID/revision、表示名、ハブURL、観測日時、
   最大30日の運用有効期限、証跡参照とhashを保持する。
6. **新規投稿**のcommercial snapshotがこのroute IDを参照し、exact承認に束縛される。
   プロフィール誘導文には実際のリンク表示名を含める。通常の承認・gate・PAUSEを維持する。

商品を消す/リンクを変更する場合は、ハブの再生成・再確認に加え、既存のroute証跡を
明示的に失効させ、新routeと必要な再承認を行う。catalog更新で既存原稿を自動改稿しない。
既にProvider受付済みの予約は別の状態照合を行い、再登録・再送しない。
公開サイトのリンククリックを購入・フォロー・収益化・Provider公開成功と解釈しない。

## 今回の非対象

Publisher側のコード・D1・migration・Secret・route書き込み、MCP write権限拡張、
OAuth、YouTube動画操作、既存Fの本文/承認hash/HOLD/PAUSE、Meta/X/Cronは全て変更なし。
既存FへこのハブのCTAを後付けしない。新しいプロフィール案もまだ本人設定していない。
