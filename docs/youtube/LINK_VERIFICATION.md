# 掲載先の確認記録 / 2026-10-19

URLは `data/profile-catalog.json` を正本とする。この文書は検証結果であり、別のURL台帳ではない。
公開HTMLと製品manifestは同じ正本から生成する。

匿名HTTP GETで、最終URLとタイトル/identityを確認した。取得時刻は21:36〜21:37 JST。
レスポンス本文、cookie、認証情報、他ユーザーの情報は保存対象にしない。
TikTokは一般HTTPタイトルが汎用だったため、通常ブラウザの実プロフィールで
`PEAKHEADZ (@peakheadz)`、見出しPEAKHEADZ、handle peakheadzを追加確認した。
フォローや投稿、アカウント切替、パスキー作成はしていない。

| catalog ID | HTTP | identity / 公開確認 |
| --- | --- | --- |
| yukiz_youtube | 200 | ユキズ 稼働中 / @yukiz_PHZ。正式表記・channel IDは既存OAuth実測も参照 |
| dake_pdf_merge | 200 | DakePDF結合 / DAKE。正式製品ページ・ローカル製品ORIGINAL・サイトcanonical一致 |
| dake_apps | 200 | APPS / DAKE |
| dake_store | 200 | DAKE Store |
| dake_tools | 200 | DAKE Web Tools |
| niceskill | 200 | NICE SKILL / 今日のちょっと |
| yukiz_x | 200 | 菊田幸彦 / @yukiz_PHZ |
| yukiz_instagram | 200 | 菊田幸彦 / @kikutayukihiko。写真側のアカウントとして区別 |
| peakheadz_instagram | 200 | PEAKHEADZ / @peakheadz |
| peakheadz_threads | 200 | PEAKHEADZ / @peakheadz |
| peakheadz_tiktok | 200 | 汎用HTTPタイトルと区別し、実ブラウザで上記identityを確認 |
| yuki_github | 200 | yukiPHZ / Yukihiko Kikuta |
| dake_pdf_merge_booth | 200 | DakePDF結合 / PEAKHEADZ / BOOTH。購入ボタンとInStockを確認 |

掲載13 URLはすべて200。SNSについて、全投稿の公開状態、ログアウト状態での全閲覧性、
実フォロー完了を保証するものではない。リンク確認はXのアカウント復旧や投稿許可でもない。
BOOTHについて価格や購入完了を保証せず、商品ページでの本人判断とする。

BOOTHショップのトップも確認したが、取得制限（403 / challenge）だったため、
今回の新ハブではトップを使わず、公開購入導線を確認できた上記の個別商品を採用した。
架空の応援商品、未公開の販売先、別アプリの商品番号は生成していない。

HTTPとレスポンシブ検証の機械可読ログ、画面画像、Preview結果はローカル
`.cache/youtube/`（Git管理外）へ保存。Previewの実URL・最終テスト結果はPR本文へ記録する。
現時点でYouTubeプロフィール自体に本ハブを設定したとは扱わない。
