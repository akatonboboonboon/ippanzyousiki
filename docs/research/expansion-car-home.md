# 車の日常点検・住まいのトラブルの追加調査

確認日：2026-09-06。対象：`src/data/expansion-car-home.ts`。

| テーマ           | カテゴリ                  | 初級 | 中級 | 上級 |  計 |
| ---------------- | ------------------------- | ---: | ---: | ---: | --: |
| 車の日常点検     | 交通・公共（public）      |    8 |    8 |    4 |  20 |
| 住まいのトラブル | 家事・暮らし（household） |    8 |    8 |    4 |  20 |

既存の `src/data` の公開問題 2,004 問と照合して作成した独自の文章問題。元の問題文・選択肢・ID は変更しない。各問に説明と一次資料へのリンクを付けた。画像なし。車検・燃料・タイヤ・給油・視界・警告灯、停電の切り分け・分電盤・止水・トイレ詰まり・浄水器・リモコン・霜取り・凍結・扉・鍵などを対象とする。メーカーの細かな修理手順や整備工場の専門作業は出題しない。

## 確認内容と重複除外

- 国土交通省と JAF の点検案内で、車検と日常点検の違い、灯火、ウォッシャー、冷却水量、指定空気圧の表示、冷えた状態での空気圧測定、ワイパーの傷みを確認。溝の排水機能はブリヂストンの公式解説を参照した。
- ENEOS の給油案内でエンジン停止、静電気除去、給油自動停止後の継ぎ足し禁止を確認。誤給油は JAF の現行案内に合わせ、エンジン始動だけでなく車両の電源も ON にしないと説明した。
- タイヤの釘を抜かない、油圧警告時にエンジン停止、熱い冷却系統のキャップを開けないという初動を確認した。救援待ちに危険な場所で作業するよう促す内容は入れない。車種ごとに仕様が異なる操作や点検条件は説明書に従う。
- 東京電力パワーグリッドの案内で地域停電と宅内停電の確認、漏電検知と分岐回路保護の役割、過負荷時の機器使用の削減、コンセントが別でも同一回路となること、停電後の時計・予約設定を確認。配線工事や分電盤内部に触れる操作は入れない。
- TOTO のサポートで器具止水栓と元栓、固い止水栓を強引に回さないこと、詰まった状態で追加の洗浄をしないこと、固形物が残る詰まりの相談、型番の確認、陶器のひびの使用中止を確認。タンク内部は陶器表面とは部材が違い、洗剤により樹脂・ゴムを傷めることも確認した。
- LIXIL で原水と浄水の症状の切り分け、ダイキンでリモコン電池と正常な霜取り運転、東京都水道局で凍結時の自然解凍と急加熱の危険、パナソニックで冷蔵庫扉への袋の挟み込み、美和ロックで鍵穴への汎用油の不適合を確認した。会社固有の案内を扱う設問は必要に応じて会社名を明記した。
- 既存の漏水メーター、管理会社への連絡、排水トラップ、避難時のブレーカー、復電後の機器損傷確認、火災・ガスの一般問題とは別の論点とした。初稿の「水に浸かった機器は乾いても再通電しない」は既存の `v2-safety-expanded-normal-020` と重複したため、鍵穴の手入れに差し替えた。結露の発生原理も既存の冷たいコップの問題と同じため、タンク内部の洗剤適合性へ変更した。
- 冷蔵庫は既存の放熱用の壁との間隔、庫内の冷気循環、食品の保存温度とは別に、ドアへ袋が挟まることを扱う。誤答は同じ装置の原因・機能・対応の取り違えを中心に調整した。

40 問、各テーマ 8 / 8 / 4 問。既存・新規 ID と問題文の完全一致重複なし。各問の選択肢は 4 個で重複なし。正答位置は 0〜3 が各 10 問。全体の型検査とアプリの統合テストは親タスクで実施。

## 採用資料と対応問題

29 URL。説明は原文を転載せず、各場面に合わせて要約した。

1. [JAF：セルフスタンドでの給油の注意点](https://jaf.or.jp/common/kuruma-qa/category-drive/subcategory-knowledge/faq258)

   対応：`v2-public-everyday-car-easy-001`。

2. [国土交通省：日常点検の方法](https://www.mlit.go.jp/jidosha/anzen/02maintenance/daily_check.html)

   対応：`v2-public-everyday-car-easy-002`、`v2-public-everyday-car-easy-003`、`v2-public-everyday-car-normal-007`。

3. [JAF：マイカーハンドブック2025](https://jaf.or.jp/-/media/1/2590/2610/2627/2631/mycarhandbook2025.pdf)

   対応：`v2-public-everyday-car-easy-004`、`v2-public-everyday-car-normal-002`。

4. [ブリヂストン：タイヤの溝の役割](https://tire.bridgestone.co.jp/about/knowledge/tread/)

   対応：`v2-public-everyday-car-easy-005`。

5. [JAF：エンジン付近の異音と潤滑不良](https://jaf.or.jp/common/car-trouble-qa/engine-malfunction/noise/faq45)

   対応：`v2-public-everyday-car-easy-006`。

6. [国土交通省：日常点検と定期点検](https://www.mlit.go.jp/jidosha/carinf/rcl/carsafety_sub/carsafety008.html)

   対応：`v2-public-everyday-car-easy-007`。

7. [ENEOS：セルフサービスステーション給油方法](https://www.eneos.co.jp/consumer/ss/self/)

   対応：`v2-public-everyday-car-easy-008`、`v2-public-everyday-car-normal-005`、`v2-public-everyday-car-normal-006`。

8. [JAF：日常点検整備のチェック項目](https://jaf-training.jp/column/vehicle-management/daily-inspection-checklist/)

   対応：`v2-public-everyday-car-normal-001`。

9. [JAF：私にもできるマイカー点検](https://jaf.or.jp/common/safety-drive/car-learning/self-check)

   対応：`v2-public-everyday-car-normal-003`、`v2-public-everyday-car-hard-001`。

10. [トヨタ：寒冷時の運転](https://manual.toyota.jp/yaris/2207/cv/ja_JP/contents/vhch04se060401.php)

対応：`v2-public-everyday-car-normal-004`。

11. [JAF：フロントガラスが曇る原因と対処](https://jaf.or.jp/common/kuruma-qa/category-drive/subcategory-safety/faq276)

対応：`v2-public-everyday-car-normal-008`。

12. [JAF：燃料を入れ間違えた場合](https://jaf.or.jp/common/car-trouble-qa/gasoline/refueling/faq78)

対応：`v2-public-everyday-car-hard-002`。

13. [JAF：油圧警告灯の点灯・点滅](https://jaf.or.jp/common/car-trouble-qa/warning-lamp/red/faq3)

対応：`v2-public-everyday-car-hard-003`。

14. [トヨタ：オーバーヒート時の注意](https://manual.toyota.jp/vellfire/3083/cv/ja_JP/contents/vhch07se020411.php)

対応：`v2-public-everyday-car-hard-004`。

15. [TOTO：止水栓の閉め方と調整方法](https://jp.toto.com/support/repair/toilet/howtoclose_adjust_waterstopcock/)

対応：`v2-household-everyday-home-easy-001`、`v2-household-everyday-home-normal-004`。

16. [東京電力パワーグリッド：急に電気が消えたとき](https://www.tepco.co.jp/pg/consignment/for-general/trouble)

対応：`v2-household-everyday-home-easy-002`。

17. [東京電力パワーグリッド：ブレーカーの種類と停電時の対応](https://pgservice1.tepco.co.jp/2026/08/07/power-outage-breaker-guide/)

対応：`v2-household-everyday-home-easy-003`、`v2-household-everyday-home-easy-004`、`v2-household-everyday-home-easy-005`、`v2-household-everyday-home-hard-001`。

18. [TOTO：便器のつまりの対処方法](https://jp.toto.com/support/repair/toilet/tank/clogged/)

対応：`v2-household-everyday-home-easy-006`、`v2-household-everyday-home-hard-002`。

19. [TOTO：トイレのトラブル解決](https://jp.toto.com/support/repair/toilet/)

対応：`v2-household-everyday-home-easy-007`。

20. [ダイキン：リモコンが壊れていないか確認したい](https://www.daikincc.com/faq/customer/web/knowledge2936.html)

対応：`v2-household-everyday-home-easy-008`。

21. [東京電力パワーグリッド：電気が消える原因と解決](https://pgservice1.tepco.co.jp/2024/07/03/blackout/)

対応：`v2-household-everyday-home-normal-001`。

22. [東京電力パワーグリッド：停電時の注意点](https://www.tepco.co.jp/pg/planned-power-outage/about/attention.html)

対応：`v2-household-everyday-home-normal-002`。

23. [LIXIL：浄水器水栓の水の出が悪い](https://faq.lixil.co.jp/浄水器水栓の蛇口（吐水口）からの水の出が悪い-626cd6cbef1f820021bd4cdd)

対応：`v2-household-everyday-home-normal-003`。

24. [ダイキン：エアコンが運転中に止まる](https://www.daikincc.com/faq/customer/web/knowledge2707.html)

対応：`v2-household-everyday-home-normal-005`。

25. [TOTO：便器・タンクのお手入れ](https://jp.toto.com/support/maintenance/toilet/cleaningtool/tank/)

対応：`v2-household-everyday-home-normal-006`。

26. [東京都水道局：水道管の凍結について](https://www.waterworks.metro.tokyo.lg.jp/kurashi/trouble/touketsu)

対応：`v2-household-everyday-home-normal-007`。

27. [パナソニック：冷蔵庫の取扱説明書・扉の閉まり](https://panasonic.jp/manualdl/p-db/SR/SR-261M.pdf)

対応：`v2-household-everyday-home-normal-008`。

28. [美和ロック：製品のお手入れ方法](https://www.miwa-lock.co.jp/tec/support/safe.html)

対応：`v2-household-everyday-home-hard-003`。

29. [TOTO：修理・買替えが必要なトイレの症状](https://jp.toto.com/support/repair/toilet/tank/poor-tanktwaterflow/)

対応：`v2-household-everyday-home-hard-004`。
