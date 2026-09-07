# 衣類・寝具と家電の運転機能の問題追加

調査・確認日：2026-09-07。`expansion-bedding-appliance.ts` に30問を追加する。2題材とも初級6問・中級6問・上級3問。中級001〜003は画像問題で、合計6枚の自作SVGを用意した。

## 題材と出題方針

衣類・寝具は、既存の洗濯表示、素材、衣類の採寸、マットレスの手入れから離れて、形と使う場所を扱う。服飾用語の細かい分類や流行の知識には広げない。掛けカバーとシーツ、枕パッドと袋型カバーなどを同じ領域の選択肢で比較する。

家電は日常の運転を選び、表示や説明を読み取る問題にする。機種差のある動作は設問に対象条件を明記する。洗濯の予約を運転開始時刻と決め付けない、洗濯容量と乾燥容量を混同しない、除湿方式の電気代を一律に比較しない。修理・分解の知識は扱わない。

誤答に「必ず」「絶対」「〜だけ」を付けて正解を見抜ける構成を避けた。正答位置は30問全体で7・8・8・7問。

## 衣類・寝具15問の根拠

IDの共通接頭辞は `v2-household-scene-bedding-`。

| ID末尾     | 内容                             | 一次資料                                                                                               |
| ---------- | -------------------------------- | ------------------------------------------------------------------------------------------------------ |
| easy-001   | リバーシブルの表裏               | [ユニクロ：リバーシブルパーカ](https://www.uniqlo.com/jp/ja/products/E413981-000/00)                   |
| easy-002   | 前開きのカーディガン             | [アニエスベー：カーディガンプレッション](https://www.agnesb.co.jp/feature/cardigan)                    |
| easy-003   | ポンチョの形                     | [モンベル：トレッキング レインポンチョ](https://webshop.montbell.jp/goods/disp.php?product_id=1128667) |
| easy-004   | ひざ掛けの用途                   | [西川：ひざ掛けの商品と用途](https://www.nishikawa1566.com/shop/e/ercd-rogh/)                          |
| easy-005   | 割烹着の袖                       | [無印良品：着脱しやすい割烹着](https://www.muji.com/jp/ja/store/cmdty/detail/4550584376177)            |
| easy-006   | 掛け布団カバー                   | [西川：掛けふとんカバー](https://www.nishikawa1566.com/shop/g/gPI04470008700/)                         |
| normal-001 | ボックスシーツの画像             | [西川：カバーについて](https://www.nishikawa1566.com/faq/cover/)                                       |
| normal-002 | ベストの画像                     | [玉川産業：制服なるほど百科・ベスト](https://www.tamagawa-sangyo.co.jp/information/203/)               |
| normal-003 | 枕パッドの画像                   | [西川：枕パッド](https://www.nishikawa1566.com/shop/c/cpillocpt/cpillocpt-pillopad/)                   |
| normal-004 | フラットシーツの使い方           | [西川：カバーについて](https://www.nishikawa1566.com/faq/cover/)                                       |
| normal-005 | レッグウォーマー                 | [グンゼ：2023年秋カタログ](https://www.gunze.co.jp/catalogue/pdf/2023autumn.pdf)                       |
| normal-006 | ラップタオル                     | [西松屋：ラップタオル・巻きタオル](https://www.24028-net.jp/category/SWIM_WRAPTOWEL/)                  |
| hard-001   | シーツと2種類のパッドの重ね方    | [ニトリ：寝具の重ねる順番](https://www.faq.nitori-net.jp/question/01j35yvs4vb115q5t76vh9n24v)          |
| hard-002   | カバーのひもと布団のループ       | [西川：ふとんとカバーの留め方](https://minlabo.nishikawa1566.com/article/tips/tips2/762/)              |
| hard-003   | シーツの高さと対応する厚さの区別 | [ニトリ：製品高さ25cm・対応厚さ20cmまでの表示例](https://www.nitori-net.jp/ec/product/4955872958125/)  |

ベストは日本での日常的な呼称を出題し、国ごとの英語・フランス語の意味の違いは問わない。ポンチョ・割烹着などは商品仕様と公式の形を確認し、ブランド特有の価格・サイズ・性能は問わない。シーツの上級問題では「製品の高さ＝使えるマットレスの厚さ」という誤読を扱い、特定の買い替え商品は推奨しない。

## 家電15問の根拠

IDの共通接頭辞は `v2-household-scene-appliance-`。

| ID末尾     | 内容                               | 一次資料                                                                                                                                                  |
| ---------- | ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| easy-001   | 冷房の主な目的                     | [ダイキン：冷房・除湿の違い](https://www.daikin.co.jp/air/life/electricbill)                                                                              |
| easy-002   | 送風の働き                         | [Panasonic：冷暖房と送風運転](https://jpn.faq.panasonic.com/app/answers/detail/a_id/9909)                                                                 |
| easy-003   | 洗濯のすすぎ行程                   | [Panasonic：すすぎの種類と運転内容](https://jpn.faq.panasonic.com/app/answers/detail/a_id/31520)                                                          |
| easy-004   | 炊飯器の保温                       | [Panasonic：炊飯器の保温機能](https://panasonic.jp/life/food/110131.html)                                                                                 |
| easy-005   | レンジの解凍                       | [Panasonic：肉や魚を解凍するときは](https://jpn.faq.panasonic.com/app/answers/detail/a_id/24286)                                                          |
| easy-006   | 循環式の追いだき                   | [ノーリツ：追いだき・たし湯の機能](https://www.noritz.co.jp/product/kyutou_bath/oil/mark.html)                                                            |
| normal-001 | 経過時間式の切タイマーの画像       | [Panasonic：タイマーの設定・取り消し方法](https://jpn.faq.panasonic.com/app/answers/detail/a_id/26925)                                                    |
| normal-002 | 終了までの時間を表す洗濯予約の画像 | [Panasonic：洗濯機の予約の使い方](https://jpn.faq.panasonic.com/app/answers/detail/a_id/17054)                                                            |
| normal-003 | 洗濯容量と乾燥容量の画像           | [Panasonic：コースに応じた容量以下にする](https://jpn.faq.panasonic.com/app/answers/detail/a_id/31526)                                                    |
| normal-004 | 食洗機の乾燥のみ運転               | [Panasonic：手洗いした食器の乾燥](https://jpn.faq.panasonic.com/app/answers/detail/a_id/84401)                                                            |
| normal-005 | カーテンが吸い付くときの掃除機設定 | [Panasonic：MC-SR21J取扱説明書](https://panasonic.jp/manualdl/p-db/p_/p_mcsr21j_t_201306060909_0.pdf)                                                     |
| normal-006 | ヘアスタイラーのクールショット     | [Panasonic：仕上げに冷風で髪を冷ます](https://panasonic.jp/hair/feature/KN-series/styling.html)                                                           |
| hard-001   | 再熱除湿の温め直し                 | [ダイキン：弱冷房除湿と再熱除湿](https://www.daikin.co.jp/air/life/electricbill)                                                                          |
| hard-002   | 炊飯器の再加熱の対象条件           | [Panasonic：再加熱の設定方法](https://jpn.faq.panasonic.com/app/answers/detail/a_id/15343)                                                                |
| hard-003   | 霜取りによる一時停止と自動再開     | [ダイキン：取扱説明書・故障かなと思ったら](https://www.ac.daikin.co.jp/-/media/Project/Daikin/ac_daikin_co_jp/sumai/yukadan/guide/pdf/t_c22ntcxv-pdf.pdf) |

追いだきには高温差し湯タイプもあるため、[ノーリツの注意書き](https://faq.noritz.co.jp/%E3%81%9F%E3%81%97%E6%B9%AF%E3%82%92%E3%81%97%E3%81%AA%E3%81%84%E3%81%A7%E6%AE%8B%E3%82%8A%E6%B9%AF%E3%82%92%E3%82%8F%E3%81%8B%E3%81%97%E3%81%AA%E3%81%8A%E3%81%99%E6%96%B9%E6%B3%95-64ba5c5dcbfec4001b1d8459)も確認し、設問を循環式に限定した。霜取りの時間は引用元の機種条件を示したもので、全製品共通の上限ではない。異常がなく説明の表示・時間に一致する場合を問う。

洗濯6kg・乾燥3kgなどの画像の数値と機器パネルは教材用に独自設定した。出典は容量制限や予約表示を読む原則の根拠であり、実在する型番のパネルを再現したものではない。23時から3時間後は翌日2時、4kgは2kgずつ2回なら洗濯・乾燥の両上限を満たすことを別途確認した。

## 画像・データの検証

- 自作SVG6枚は全て `480×280`、外部参照なし。名称当ての画像のtitle・desc・altには正解の名称を入れず、形・パネルの文字を記述した。
- Chromiumで6枚と設問・選択肢を描画し、1080px幅および390px幅のスクリーンショットを目視確認した。横方向のはみ出しなし、SVG文字の表示範囲外へのはみ出しなし。
- `artifacts/scene-household-desktop.png` と `artifacts/scene-household-mobile.png` に確認画像を保存した（検証用、Git管理外）。
- `tsc --noEmit --strict --target ES2022 --module ESNext --moduleResolution Bundler --skipLibCheck src/data/expansion-bedding-appliance.ts` が成功。
- 30問の一意ID、4択の重複なし、正答位置、全問の出典、画像6問を検査した。

アプリ全体への登録・既存バージョン保持・統合テストは親担当で実施する。
