# 生活4分野の「知識が必要か」再監査

2026-09-07。対象は `artifacts/before-knowledge.json` の現行ID。前回の `-r3` 改訂と直近追加の身近な道具・園芸問題も含め、household 332、health 247、safety 162、world 197、合計938問を再確認した。改訂は21問（household 15、health 3、safety 2、world 1）。差分は `src/data/knowledge-revisions-life.json` に記録した。

## 今回の基準

設問でルール・操作・用途の説明が完結しており、選択肢へ転記するだけで解ける形式を修正する。前回は「個別の条件を残す」範囲が広く、説明を読んで時刻や共通条件を計算する形式にも置き換えていた。今回は、用語の意味、機能の違い、傷みや不具合の原因、用途に合う場面など、設問外の知識が必要な形へ変えた。

製品の安全条件を削って「この条件なら使える」と一般化していない。元の可否問題を別の知識へ差し替え、必要に応じて解説に衣類・機器・製品ごとの表示確認を残した。難しさを長い計算に求めず、上級は耐熱温度差と使用温度、電力と電力量、希釈倍率と加水倍率、部品や下処理の違いといった混同を中心にした。

## 代表的な変更

| 現行ID                                       | Before                                | After                                        |
| -------------------------------------------- | ------------------------------------- | -------------------------------------------- |
| `v2-household-easy-008-r2`                   | 「裏返しにして洗う」→裏面を外側にする | プリント入り衣類を裏返す目的                 |
| `v2-household-normal-002`                    | 洗濯可・タンブル不可→自然乾燥         | タンブル乾燥と浴室乾燥・自然乾燥・脱水の区別 |
| `v2-household-hard-001`                      | 30℃弱と40℃通常→共通の30℃弱            | ウールを強くもむと縮む理由                   |
| `v2-household-hard-010`                      | 合計1500Wと1200＋700W→上限超え        | タップの定格が示す範囲                       |
| `v2-household-hard-017`                      | 最終2Lと説明→全体を2Lにする           | 10倍希釈の意味                               |
| `v2-household-scene-bedding-hard-003`        | 対応20cmまで、厚さ23cm→別商品         | マチと裾ゴムの役割の違い                     |
| `v2-household-scene-appliance-normal-001`    | 3時間後に停止と説明→停止時刻を足す    | 図の切タイマーが合う生活場面                 |
| `v2-household-scene-appliance-normal-002-r3` | 8時間後に終了と説明→終了時刻を足す    | 標準とおしゃれ着コースの違い                 |
| `v2-household-scene-appliance-normal-003`    | 洗濯6kg・乾燥3kg→4kgを分ける          | 詰め込みすぎで乾きむらが出る理由             |
| `v2-household-scene-appliance-hard-003`      | 霜取り後は自動再開と説明→待つ         | 霜取りの場所と暖房への働き                   |
| `v2-household-familiar-gardening-hard-001`   | 株間30cmで4株→間隔を掛け算            | 摘芯と苗の間引きの違い                       |
| `v2-health-living-label-normal-005-r3`       | 保存料不使用→保存料を使っていない     | 保存料と酸化防止剤の違い                     |
| `v2-safety-expanded-easy-017`                | 遊泳禁止→泳がない                     | 海上保安庁への緊急通報番号                   |
| `v2-world-hard-007-r3`                       | 月間雨量と日最大雨量の掛け算          | 降水確率で比べられるもの                     |

ほかに、耐熱ガラスの性質・耐熱温度差、平干しの目的、裾上げテープの接着、こんにゃくと油揚げの下処理、砂糖不使用でも含まれる糖類、脚立の部品の役割を改訂した。初稿の不自然な誤答（「袖だけ」「背中だけ」、空気を閉じ込める、衣類が冷気を作る等）は削除し、同種の手入れ・設定・寸法・成分分類の混同に差し替えた。

## 維持した形式と条件

- 食間・自然解凍・米の産年と精米時期などは、設問中に意味を説明していない。用語と用途を知って判断するため維持した。
- 洗濯記号や道具の形、株間の図など、名称・形・記号の知識を必要とする画像問題は維持した。上記の家電画像3問は画像・代替テキストを変更せず、画像中にある操作説明や数値をそのまま答えにする問いをやめた。
- 数値、機種、規約、禁止文が登場するだけでは機械的に削除していない。価格比較の計算問題、単位・尺度そのものの知識を問う問題は今回の転記問題と区別した。
- 通報対象を海の事故に限定すること、タンブル乾燥の種類、園芸での「苗」の文脈など、答えを一つにする前提は残した。安全な使い方の個別条件を省略した可否問題へは変えていない。

## 確認した一次資料

- [花王：スポーツウエアの洗い方](https://www.kao.com/jp/qa/detail/28103/) — プリント面の摩擦と裏返し。
- [ライオン：おしゃれ着の干し方](https://acron.lion.co.jp/basic/dry/)、[洗い方](https://acron.lion.co.jp/basic/wash/)、[ウールが縮む理由](https://qa.lion.co.jp/faq/show/584?category_id=385&site_domain=default) — 重さの分散、弱い水流、繊維の絡み。
- [HARIO：ガラスの説明](https://www.hario.cc/PDF/13hario_all.pdf)、[FAQ](https://shop.hariocorp.co.jp/pages/faq) — 耐熱と強化の違い、耐熱温度差。
- [Panasonic：タンブラー乾燥](https://jpn.faq.panasonic.com/app/answers/detail/a_id/122/p/1860/related/1)、[乾燥時の衣類量](https://jpn.faq.panasonic.com/app/answers/detail/a_id/31526)、[乾燥方式と乾きむら](https://jpn.faq.panasonic.com/app/answers/detail/a_id/96/) — 回転式乾燥、詰め込みと衣類の固まり、温風。切タイマーは既存の[公式FAQ](https://jpn.faq.panasonic.com/app/answers/detail/a_id/26925)を継承。
- [ダイキン：霜取りの説明](https://www.ac.daikin.co.jp/-/media/Project/Daikin/ac_daikin_co_jp/sumai/yukadan/guide/pdf/t_c22ntcxv-pdf.pdf) — 室外熱交換器の霜と暖房能力。
- [NITE：電源タップの最大消費電力](https://www.nite.go.jp/data/000084304.pdf) — 接続する機器の合計。
- [ケミコート：希釈](https://www.chemicoat.co.jp/glossary/glossary-163/) — 10倍は原液1と溶媒9の関係。一般用語として使用し、特定製品の使用濃度は指示していない。
- [クロバー：裾上げテープ](https://clover.co.jp/products/26506)、[西川：ボックスシーツ](https://www.nishikawa1566.com/shop/g/g0577033511/) — アイロン接着、マチ・対応厚さ・全周ゴム。
- [サカタのタネ：摘芯](https://sakata-tsushin.com/words/detail_60/)、[間引き](https://faq.sakataseed.co.jp/faq/show/1101?site_domain=default) — 茎の先端と株数を減らす作業の区別。
- [キッコーマン：こんにゃくのアク抜き](https://www.kikkoman.co.jp/homecook/tsushin/tips0050/)、[油揚げの油抜き](https://www.kikkoman.co.jp/homecook/washoku/104/) — くさみ・えぐみと余分な油。
- [消費者庁：栄養成分表示](https://www.caa.go.jp/policies/policy/food_labeling/nutrient_declearation/consumers/assets/food_labeling_cms206_20210519_02.pdf)、[日本食品添加物協会：種類と用途](https://www.jafaa.or.jp/tenkabutsu01/siryou) — 原材料由来の糖類、保存料と酸化防止剤。
- [NITE：脚立の事故](https://www.nite.go.jp/jiko/chuikanki/mailmagazin/2022fy/vol414_221011.html)、[長谷川工業：脚立の部品](https://www.hasegawa-kogyo.co.jp/product/RM) — 開き止めと脚先の横ずれ防止。
- [海上保安庁：118番](https://www.kaiho.mlit.go.jp/03kanku/information/118.html)、[気象庁：降水確率](https://www.jma.go.jp/jma/kishou/know/faq/faq4.html)。

## 検証

21キーすべてが現行スナップショットに一致し、全設問のprompt変更、4択・重複選択肢なし、answer 0〜3、対象4カテゴリ内を検査した。category・difficulty・imageはパッチに含めず継承する。旧公表ファイル・テスト・診断プールは変更していない。`-r4` の付与、記録移行、統合後の全体検査は親タスクが担当する。
