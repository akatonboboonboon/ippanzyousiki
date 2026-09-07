# 身近な道具・食品包装の追加

確認日: 2026-09-07

`expansion-tools-packaging.ts` に30問。`world / 身近な道具の仕組み` と `health / 食品の包装の役割` を各15問（初級6・中級6・上級3）追加した。IDは `v2-{category}-daily-{key}-{difficulty}-{連番}`。既存ファイルや選択肢改訂データは変更していない。

## 重複の照合

既存2,239問の `artifacts/current-2239-bank.json` と現行の `artifacts/before-daily.json`、関連する `src/data` の問題文・正解・解説を検索して比較した。完全一致するID・問題文はない。題材が近い次の既存問題は追加候補から除いた。

- ボールペン先端の球、消しゴム、コルク・繊維・皮革の素材、針通し・リッパーなどの裁縫道具。
- 栓抜きのてこ、風袋引き、耐熱ガラスの使用区分、プラスチック容器の容量・耐冷温度。
- 家庭冷凍での密着包装による乾燥・酸化予防、冷凍食品の表示、解凍・再冷凍。
- レトルト袋がレンジ対応かを表示で確認する問題。今回の追加は、自動蒸気口がある設計を条件にその働きを問う。
- 発泡スチロール箱による外からの冷気の遮断。魔法びんは真空断熱で熱の移動を抑える仕組みを対象にした。

道具は15種類に分散した。食品包装も、気体を減らす包装だけに偏らず、液体の保持、吸水、衝撃、開封の痕跡、内圧、注ぎ口などに広げた。

## 道具の一次資料

各資料はWebで本文または公式検索掲載本文を確認し、資料の説明をそのまま転載せず独自の問題文・解説にした。以下の番号は各難易度内の末尾連番。

| 問題    | 題材と確認した根拠                                       | 一次資料                                                              |
| ------- | -------------------------------------------------------- | --------------------------------------------------------------------- |
| 初級001 | 魔法びんは真空の層などで熱の移動を抑え、保温・保冷する   | [サーモス](https://www.thermos.jp/craftmanships/)                     |
| 初級002 | フックとループによる面ファスナーの係合                   | [クラレ](https://www.kuraray.com/jp-ja/products/question/magic-tape/) |
| 初級003 | スライダーが左右の歯をかみ合わせたり離したりする         | [YKK](https://www.ykk.com/ykk/tech/01.html)                           |
| 初級004 | 折り筋で切っ先を更新できる折る刃式カッター               | [オルファ](https://www.olfa.co.jp/birth_of_olfa_cutter.html)          |
| 初級005 | 紙をはがして使うローラーが粘着面でごみを取る             | [ニトムズ](https://colocolo.nitoms.com/about/quality/)                |
| 初級006 | 手動の球式ブロワーは空気を押し出す                       | [ホーザン](https://www.hozan.co.jp/download/manual/Z-268.pdf)         |
| 中級001 | 吸盤は内外の空気の圧力差によって面へ押し付けられる       | [Adams Manufacturing](https://suctioncups.com/pages/suction-cups-101) |
| 中級002 | 鉄粉式の使い捨てカイロは鉄の酸化の発熱を利用する         | [日本カイロ工業会](https://www.kairo.jp/mamechishiki/kairo/)          |
| 中級003 | 調整式レンチはナットの平行な二面に口幅を合わせる         | [京都機械工具](https://ktc.jp/kiso/lesson/adjustable_wrench.html)     |
| 中級004 | 2本線の水平用気泡管では気泡の中央位置を読む              | [エビス](https://www.ebisu-level.co.jp/eng/level/bubble.html)         |
| 中級005 | 非接触体温計は体から放射される赤外線を検出する           | [タニタ](https://www.tanita.co.jp/magazine/special-feature/4866/)     |
| 中級006 | ライトの反射板は光を反射させ、集めて照射する             | [ジェントス](https://www.gentos.jp/ufaq/リフレクタータイプ/)          |
| 上級001 | 巻尺の移動爪は押し当て・引っ掛け時の金具の厚みを補正する | [タジマ](https://jpn.tajimatool.co.jp/page/convex_introduction_01)    |
| 上級002 | テープの背面のはくり剤が引き出しを助ける                 | [ニチバン](https://www.nichiban-cellotape.com/difference/)            |
| 上級003 | ラチェットは一方で力を伝え、反対では空回りする           | [京都機械工具](https://ktc.jp/kiso/lesson/ratchet_megane.html)        |

道具の種類を設問に明示した。すべての面ファスナー、すべてのローラー、すべての巻尺が同じ構造とはしない。体温計は治療判断や細かな換算値を出題せず、検出の仕組みにとどめた。

## 食品包装の一次資料

| 問題    | 題材と確認した根拠                                     | 一次資料                                                                                            |
| ------- | ------------------------------------------------------ | --------------------------------------------------------------------------------------------------- |
| 初級001 | シリカゲルが水分を吸着する                             | [鳥繁産業](https://www.torishige.co.jp/goods/silicagel/)                                            |
| 初級002 | 脱酸素剤による酸素吸収と食品の品質保持                 | [三菱ガス化学](https://www.mgc.co.jp/special/ageless/)                                              |
| 初級003 | 窒素で膨らませた袋がチップスの割れを抑える             | [カルビー](https://faq.calbee.co.jp/faq_detail.html?category=2041&id=69&page=1)                     |
| 初級004 | トレーマットが食品から出たドリップを吸収する           | [エフピコ商事](https://www.fp-trading.jp/brand/brand-list/w-ph-mat/)                                |
| 初級005 | キャップリングは開栓の有無を分かるようにする           | [全国清涼飲料連合会](https://www.j-sda.or.jp/learning/qa/qa06/qa06.php)                             |
| 初級006 | 牛乳パックのポリエチレン層が液体の漏れ・しみ込みを防ぐ | [森永乳業](https://www.morinagamilk.co.jp/learn_enjoy/knowledge/)                                   |
| 中級001 | レトルト食品の気密包装と加圧加熱殺菌                   | [日本缶詰びん詰レトルト食品協会](https://www.jca-can.or.jp/useful/about/howto)                      |
| 中級002 | 内袋のある密封しょうゆボトルが空気との接触を抑える     | [キッコーマン](https://www.kikkoman.co.jp/kikkoman/soysauce/taste/container/)                       |
| 中級003 | 微孔による気体の透過を青果物の呼吸に合わせる           | [住友ベークライト](https://www.sumibe.co.jp/product/p-plus/fresh/index.html)                        |
| 中級004 | 炭酸用ボトルの底部は内圧への強さと自立性を両立する     | [キリン](https://qa.kirin.co.jp/fa/FAQ/web/knowledge17341.html)                                     |
| 中級005 | 未開封ジャム瓶の減圧状態によりふた中央がへこむ         | [アヲハタ](https://www.aohata.co.jp/inquiry/q_a_product.html)                                       |
| 中級006 | ドレッシングの粘度等に合わせて出し口を設計する         | [キユーピー](https://www.kewpie.co.jp/customer/faq/package/)                                        |
| 上級001 | 低酸素でも増える菌があり、要冷蔵の真空包装は冷蔵が必要 | [厚生労働省](https://www.mhlw.go.jp/seisakunitsuite/bunya/kenkou_iryou/shokuhin/syokuchu/03-4.html) |
| 上級002 | コーヒー袋の弁は外気の侵入を抑え、内部のガスを逃がす   | [味の素AGF](https://agf.ajinomoto.co.jp/support/faq_detail.html?category=9&id=72&page=1)            |
| 上級003 | レンジ対応の自動蒸気口が加熱中に開いて蒸気を逃がす     | [ハウス食品](https://housefoods.jp/data/factory/retort/process03.html)                              |

袋や容器の構造を設問の条件に置いた。要冷蔵の真空食品と常温用のレトルト食品を区別し、真空・脱酸素を殺菌や冷蔵の代わりとはしない。ふたのへこみは密封の目安として扱い、食品の安全性全般の保証とはしていない。シリカゲルなどの誤飲時の処置は今回の範囲に含めていない。

## 検証

- TypeScript単体検査成功: `npx tsc --noEmit --target ES2022 --module ESNext --moduleResolution bundler --skipLibCheck src/data/expansion-tools-packaging.ts`
- 実際に配列を評価して30問、各分野6/6/3、全30出典、四択の重複なしを確認した。
- 正解位置は0〜3の順に8・8・8・6問。IDと問題文の完全一致による既存重複なし。
- 最終巡回で、設問に答えの語がそのまま含まれるもの、正解だけが長いもの、誤答の話題が飛ぶものを調整した。

未解決の事実確認事項なし。全体統合・標準診断6・アプリテストは根担当で実施する。
