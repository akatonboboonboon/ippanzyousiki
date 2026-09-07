# 社会分野の知識問題への再改訂

確認日: 2026-09-07

`artifacts/before-knowledge.json` の現行 money 192、consumer 247、digital 192、civic 162、計 793 問を再監査。前回 r3 の問題と、新規「スマホの写真・撮影」15 問も含む。

`src/data/knowledge-revisions-society.json` に現行 ID をキーとする 24 問のパッチを作成した。内訳は money 2、consumer 13、digital 6、civic 3。category、difficulty、image、旧公表ファイルは変更しない。新旧 ID と診断の統合は親担当。

## 今回の判断基準

- 架空の規則や操作説明を先に示し、そのまま当てはめる設問も修正対象とした。前回の「必要条件」に含めていた在庫表・曜日条件などを見直した。
- 日付・在庫・対象年齢の転記を、用語の意味や機能、実際の仕組みの区別を問う内容へ変更した。
- 明示された価格・手数料・割引条件を使う比較、割り勘、使用量・速度・画素数などの計算は維持した。
- 形から記号・機能を識別する画像問題、機能を知って名称を答える初級は維持した。写真の回転・編集前後の比較も画像と操作の対応が必要なため維持した。
- 共有画面の画像は変更せず、「書いてある公開範囲を答える」から「二人に限定するため変更する設定を選ぶ」へ変更した。親フォルダーから権限を継承していない条件だけは、Google ドライブの実仕様上、正答を一意にするために残した。

## 改訂対象と知識の焦点

| 現行 ID の末尾・識別部分              | 改訂後に問うもの                                                                 |
| ------------------------------------- | -------------------------------------------------------------------------------- |
| money-expanded-easy-010-r2            | カードの期限表示が月・年の順であること。前置きの「月／年」を削除                 |
| money-daily-utilities-easy-002        | 電気明細の月と検針による算定期間の違い                                           |
| consumer-normal-008-r2                | 解約申出と次回発送の受付期限                                                     |
| consumer-hard-005                     | Google Play の年額定期購入を途中で解約した際の更新停止・残期間の利用・返金の区別 |
| consumer-hard-019-r2                  | 費用の目安期間と契約期間の区別                                                   |
| consumer-living-rent-easy-008         | 鍵交換の防犯上の目的                                                             |
| consumer-living-rent-hard-002         | フリーレントの短期解約に伴う費用                                                 |
| consumer-scene-shopping-normal-002    | 展示品と販売用在庫の違い                                                         |
| consumer-scene-shopping-normal-003-r3 | 注文の受け付けと受け取り準備完了の違い                                           |
| consumer-scene-shopping-normal-004-r3 | カートへ入れることと商品の確保の違い                                             |
| consumer-scene-shopping-normal-005    | 在庫表示と自分用の確保の違い                                                     |
| consumer-scene-shopping-normal-006    | 出荷予定日とお届け予定日の違い                                                   |
| consumer-scene-shopping-hard-001      | 注文番号と送り状番号の用途                                                       |
| consumer-scene-shopping-hard-002      | 販売店在庫品・メーカー直送品を一度に注文した際の、注文・決済・梱包の数の違い     |
| consumer-scene-shopping-hard-003      | 三つの店の取り置き・取り寄せ・受注生産と、入手までの工程の対応                   |
| digital-normal-011-r2-r3              | リンクの送信先とファイルのアクセス権の違い                                       |
| digital-normal-014-r2                 | 4G と Wi-Fi の通信方式の区別                                                     |
| digital-visual-002-r2                 | 一般的なアクセスの変更と閲覧・編集権限の違い                                     |
| digital-daily-news-easy-004           | 公表時点と回答時点の違い                                                         |
| digital-daily-news-easy-005           | 標本調査の意味                                                                   |
| digital-familiar-photo-normal-003     | グリッドの機能。水平線を合わせる指示を削除                                       |
| civic-hard-002-r2                     | 住民票で記載・省略を選べる事項                                                   |
| civic-hard-007-r2                     | 任意継続では事業主負担分も本人が負担する仕組み                                   |
| civic-expanded-normal-006-r2          | 公金受取口座登録と給付申請の違い。「申請が必要」の前置きを削除                   |

## 代表例

旧「白 M あり・白 L なし・青 M あり・青 L あり。同色の M と L は？」は、表に書かれた条件だけで解けた。新「ユニクロのカートへ商品を入れたまま翌日まで置いた。確保されている？」は、カートと注文・確保の違いを知る必要がある。

旧「在庫○＝在庫あり、展示○＝見本あり。在庫×・展示○は？」は、凡例の読み替えだった。新「展示品ありと販売用在庫ありの違いは？」は、見本と販売用商品の役割を区別する。

旧「リンクを知っている全員が閲覧可。転送先は見られる？」は、答えが設定の説明に含まれていた。新「リンクを一人へ送った。閲覧範囲は何で決まる？」は、送り先と共有設定を区別する。

## 一次資料の確認

既存の出典で意味が変わらないものは source を継承した。事実を置き換えた項目、前置きを削ると仕様を正確に知る必要がある項目は、次の一次資料を再確認した。

- [JCB：有効期限の表示順](https://www.jcb.co.jp/processing/pop/expirydate.html)
- [東北電力：料金算定期間](https://www.tohoku-epco.co.jp/dprivate/inquery/call/usage.html)
- [国民生活センター：解約方法の確認](https://www.kokusen.go.jp/mimamori/mj_mailmag/mj-shinsen504.html)
- [Google Play：解約後の更新停止と支払い済み期間の利用](https://support.google.com/googleplay/answer/7018481?co=GENIE.Platform%3DDesktop&hl=ja)
- [UR：フリーレント](https://www.ur-net.go.jp/chintai/whats/system/freerent/)
- [ニトリ：在庫・展示・取り置き・取り寄せ](https://www.faq.nitori-net.jp/question/01j2rwgse30e751ca31wa8dr01)
- [ユニクロ：カートに入れた商品の確保](https://faq.uniqlo.com/articles/Knowledge/100001988)
- [ニトリ：発送とお届けのメール連絡](https://www.faq.nitori-net.jp/question/01j63yehd5zrrkfddygjb5cvd6)
- [ヤマト運輸：送り状番号](https://faq.kuronekoyamato.co.jp/app/answers/detail/a_id/3068/)、同社受注・出荷管理資料における注文番号との別管理も確認
- [SBSネクサード：同梱と個別発送](https://www.sbs-nexthird.co.jp/sbsnexd/logistics/guide/combined-shipping/)
- [冨士ファニチア：受注生産](https://fuji-furniture.jp/factory/)。取り置き・取り寄せは上記ニトリの案内と併せて確認
- [Google：共有範囲と操作権限](https://support.google.com/drive/answer/2494822?co=GENIE.Platform%3DDesktop&hl=ja)
- [Google：Android の 4G 接続](https://www.android.com/intl/ja_jp/articles/303/)
- [総務省統計局：全数調査・標本調査](https://www.stat.go.jp/naruhodo/7_shurui/zensu.html)
- [Apple：グリッドと構図](https://support.apple.com/ja-jp/guide/iphone/-iph3dc593597/ios)
- [川崎市：住民票の記載事項](https://www.city.kawasaki.jp/templates/faq/250/0000125805.html)
- [協会けんぽ：任意継続の保険料](https://www.kyoukaikenpo.or.jp/benefit/voluntary_continuation/index.html)
- [デジタル庁：公金受取口座登録制度](https://www.digital.go.jp/policies/account_registration)

JSON の構造確認では、24 キーすべてがスナップショットの現行 ID と一致し、各パッチの prompt が変更済み、選択肢が重複のない 4 個、正答インデックスが 0〜3、許可外フィールドがないことを確認した。テストコード・画像・他担当のファイルは編集していない。
