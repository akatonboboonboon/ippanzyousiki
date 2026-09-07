# 日用小物・文具の追加問題

確認日：2026-09-07。既存2,492問のスナップショットと照合し、日用小物15問、文具15問を追加。各題材は初級6問・標準6問・上級3問。小物6枚、文具3枚の画像を用意した。

## 出題内容と一次資料

| 題材           | 主な内容                                           | 一次資料                                                                                                                                                          |
| -------------- | -------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 調理道具       | トング、お玉、スライサー、ざるとボウル             | [貝印 SELECT100](https://www.kai-group.com/products/brand/select100/)                                                                                             |
| 皮むき         | ピーラーと他の加工道具の使い分け                   | [貝印 T型ピーラー](https://www.kai-group.com/products/brand/select100/products/dh3000.html)                                                                       |
| 泡立て         | ホイップに用いる道具                               | [貝印 ウィスク](https://www.kai-group.com/products/brand/select100/products/dh3144.html)                                                                          |
| 生地の移し替え | ボウルの曲面へヘラを沿わせる                       | [貝印 シリコーンベラ](https://www.kai-group.com/products/brand/select100/products/dh3013.html)                                                                    |
| 鍋の下に敷く物 | 鍋敷きの用途                                       | [無印良品 鍋敷き・鍋つかみ](https://www.muji.com/jp/ja/store/cmdty/detail/4550512835837)                                                                          |
| 家具の工具     | 六角穴と六角棒レンチ                               | [KTC 工具の基礎](https://ktc.jp/kiso/lesson/hex_wrench.html)                                                                                                      |
| じょうご       | 形から液体の移し替え用途を判断                     | [貝印 ロート](https://b2bstore.kai-group.com/product.php?id=1096)                                                                                                 |
| 靴べら         | 正面図と側面図から使用場面を判断                   | [R&D 使用案内](https://www.randd.co.jp/wp-content/uploads/2022/08/b1bc99aa197f86697f3488ab19a56ec6.pdf)                                                           |
| ドアストッパー | くさび形とドア下の隙間                             | [テラモト 製品案内](https://www.teramoto.co.jp/products/22272/)                                                                                                   |
| S字フック      | 開いた両端を使ってつるす                           | [無印良品 フック](https://www.muji.com/jp/ja/store/cmdty/detail/4550583923563)                                                                                    |
| コルク抜き     | らせん形の道具を使う対象                           | [貝印 栓を開ける道具](https://store.kai-group.com/shop/c/c100625/)                                                                                                |
| こし網         | 液体を通して粒を残す                               | [貝印 茶こし](https://store.kai-group.com/shop/g/g14218/)                                                                                                         |
| シャープ芯     | 芯径と濃さを区別して選ぶ                           | [ぺんてる 替芯](https://www.pentel.co.jp/products/mechanicalpencil/lead_pentel_ain/)、[濃さの説明](https://www.pentel.co.jp/support/mechanicalpencil/369/)        |
| 筆記具の用途   | ボード専用品、フリクションの適用場面と熱による消去 | [コクヨ ボード用マーカー](https://www.kokuyo.com/stationery/category/writing/marker/4862/)、[PILOT FAQ](https://www.pilot.co.jp/support/frixion/)                 |
| メモ・整理     | 付箋、ダブルクリップ、厚さに応じた使い分け         | [3M 付箋](https://www.3mcompany.jp/3M/ja_JP/p/c/office-supplies/b/post-it/)、[コクヨ クリップ](https://www.kokuyo.com/stationery/category/clip-magnet/clip/5689/) |
| 修正           | テープの用途、文字と罫線に収まる幅                 | [コクヨ 修正テープ](https://www.kokuyo.com/stationery/series/campus/correction-tape/)                                                                             |
| ノート         | 同じ紙面での罫幅と行数の関係                       | [コクヨ 罫幅の違い](https://kokuyo.life/stationery/series/campus/campus-notebook/flat/)                                                                           |
| ホッチキス針   | No.10という規格と1,000本という入数の区別           | [マックス 製品一覧](https://www.max-ltd.co.jp/product/op/stapler/)                                                                                                |
| ルーズリーフ   | 用紙サイズと穴数・配置の適合                       | [マルマン 選び方](https://www.e-maruman.co.jp/yomubungu/detail/20210909165549.html)                                                                               |

## 問題文と選択肢

用途を先に説明してから、その説明をそのまま選ばせる形式を避けた。画像には道具名を書かず、形状・表示・寸法を読み取る。芯径の基本問題は数値の意味を問い、図の応用問題では芯径と濃さを組み合わせる。ホッチキス針の問題は「指定No.10だからNo.10」という転記ではなく、規格と入数を区別する。

テープ幅5.5mmの問題は、5mm以上かつ6mm未満という二条件の計算。クリップの収納枚数も架空の条件として明記し、商品の現行規格や価格であるとは扱わない。ボード用マーカーの一般知識と重なっていた追加問題は、バインダーの適合を確かめる問題へ置き換えた。

## 検査

- 30件のID、四択、正解範囲、出典と解説、既存ID・問題文との重複を確認。
- TypeScript単体型検査成功。
- SVGは480×280。外部参照・スクリプト・`url()`参照なし。網の線も座標へ展開。
- Chromiumで全9枚を描画し、1440pxと390pxで目視確認。横方向のはみ出しなし。
- 確認用画像：`artifacts/familiar-objects-desktop.png`、`artifacts/familiar-objects-mobile-1.png`〜`3.png`。検査スクリプトと画像はローカル検査用で配布対象外。
