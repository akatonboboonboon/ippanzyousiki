# 身支度・家庭測定・工具と既存分野の追加

確認日：2026-09-07。追加94問。新規分野62問（身支度24・家庭測定17・工具21）、既存分野32問（調理16・園芸16）。初級34・中級57・上級3、画像6問は全て中級。

調理は既存の「料理の基本」、園芸は「花や野菜を育てる基礎」を再利用する。新規分野は「眼鏡・髪・身支度」「家庭での測定」「身近な工具の使い方」。公開済み問題・既存IDは変更していない。

## 出題と重複の確認

- 既存2597問の proposal-bank.json を、設問・正答・解説のキーワードと意味で照合した。UV性能、落としぶた、湯むき、水やり時期、肥料の希釈、摘心、支柱の結び方など既存と重なる候補は採用しなかった。
- 工具の文章によるラジオペンチ比較は、今回の画像問題と同じ知識だったため削除し、96問から95問にした。さらにコーティング剥がれの1問は、現実的な誤答が十分にそろわないため除外し、94問にした。設問と正答の文字列類似検索も行い、同じ問いの言い換えが残っていないか確認した。
- 全94問を再読。誤答が極端になる例を、粉の成分、包丁の角度、園芸の手入れ、工具の機能など同じ種類の候補へ修正した。あさりの設問では暗さを先に説明せず、その働きを答える形へ変更した。
- 健康は測定手順と比較条件までとし、測定値による病名・治療・受診判定は扱わない。上級は測定方式と比較、容器を含む計量上限、質量と体積の組合せを問う。調光レンズは仕組みを設問で説明せず現象から種類を選ぶ問題へ改め、名称選択に合わせて中級へ変更した。
- 機種や素材による必要条件（わき用・手首式・足裏電極・水用換算・通常の右ねじ等）は残した。製品の個別の数値や操作規約の転記は出題していない。

## 画像と構造検証

自作SVG6枚は480×280、外部参照・スクリプト・url()参照なし。全画像のデコードを Chromium で確認し、390px幅カード内の358px表示で実レンダリング・目視した。コンビネーションレンチの開口部と輪の穴の位置を修正して再確認した。六角棒レンチは上から見た図とし、力の向きを回転に合う向きへそろえた。代替説明に答えとなる名称を含めない。

単独TypeScript型検査、Vite SSRロード、ID一意性、既存IDとの非衝突、4択の重複なし、正答位置の範囲、全問の出典・解説・画像ファイル存在を確認した。統合テストと旧診断の互換性は親担当が実施する。

## 相互レビュー後の修正

調光眼鏡で答えの仕組みを先に説明する条件を除き、中級の知識問題へ変更。最小表示の誤答を最小測定量・誤差・最大計量に統一した。髪のもつれは実際の手順の取り違え、ねじ方向は見る側との対応、一年草は二年草・多年草・球根の一生との比較へ修正した。コーティング剥がれは水増しを避けて削除。最終94問（身支度24・測定17・工具21・調理16・園芸16）、新規62＋既存32。修正後に型検査と構造検証を再実行した。

## 根拠

全問に一次資料を付与し、メーカー・種苗会社の説明本文をWebで確認した。クランプは巨大な総合カタログから、仮止め・穴あけ・接着固定を明記する公式4ページ資料へ置換。油の体積換算は計量器の換算機能に加え、日清オイリオの比重FAQで裏付けた。種苗用語の花がら摘みは資料にある病気予防を問う。医療機器の測定は各メーカーの一般案内・取扱説明書を参照した。

- [JINS｜メガネ・レンズの取扱説明書](https://www.jins.com/jp/guide/product/manual.html)（6問）
- [JINS｜偏光レンズ](https://www.jins.com/jp/lens/polarization/)（1問）
- [JINS｜調光レンズと可視光調光レンズの違い](https://weekly.jins.com/item/item106-colorcontrol-comparison.html)（1問）
- [花王｜髪と頭皮にやさしい洗髪方法](https://www.kao.com/jp/haircare/scalp-care/8-1/)（8問）
- [パナソニック｜ヘアアイロンの基本とコツ](https://panasonic.jp/hair/contents/hair-iron/basic-howto.html)（2問）
- [貝印｜ツメキリの正しい使い方](https://www.kai-group.com/products/tsumekiri/use/howto/)（4問）
- [花王｜上手なメイクの落とし方](https://www.kao.com/jp/skincare/care/basic-03/)（1問）
- [花王｜上手な保湿ケア](https://www.kao.com/jp/skincare/care/basic-05/)（1問）
- [テルモ｜正しい体温の測り方](https://www.terumo-taion.jp/activity/knowledge/article02.html)（5問）
- [オムロン｜手首式血圧計の高さ](https://www.faq.healthcare.omron.co.jp/faq/show/4224?category_id=871&site_domain=jp)（1問）
- [オムロン｜血圧を測定するタイミング](https://www.faq.healthcare.omron.co.jp/faq/show/4218?site_domain=jp)（1問）
- [オムロン｜手首式血圧計の取扱説明書](https://store.healthcare.omron.co.jp/support/download/manual/pdf/HEM-6324T_B_m.pdf)（1問）
- [タニタ｜体組成計の正しい使い方](https://www.tanita.co.jp/magazine/column/4788/)（3問）
- [タニタ｜体組成計の原理](https://www.tanita.co.jp/magazine/column/4789/)（1問）
- [タニタ｜温湿度計の基礎知識と活用法](https://www.tanita.co.jp/magazine/column/24412/)（1問）
- [タニタ｜クッキングスケールの機能一覧](https://www.tanita.co.jp/magazine/special-feature/24373/)（2問）
- [タニタ｜クッキングスケール KD-321 取扱説明書](https://www.tanita.co.jp/support/manual/KD-321/)（1問）
- [日清オイリオ｜油の比重](https://www.nisshin-oillio.com/customer/faq_detail.html?category=867&id=4000009)（1問）
- [KTC｜ドライバ類の基礎](https://ktc.jp/kiso/lesson/screwdriver.html)（6問）
- [KTC｜ニッパ類の基礎](https://ktc.jp/kiso/lesson/cutting_pliers.html)（2問）
- [KTC｜ペンチ・ラジオペンチ類の基礎](https://ktc.jp/kiso/lesson/linemans_pliers.html)（2問）
- [KTC｜プライヤの基礎](https://ktc.jp/kiso/lesson/pliers.html)（1問）
- [KTC｜スパナ類の基礎](https://ktc.jp/kiso/lesson/spanner.html)（2問）
- [KTC｜ねじの基礎知識](https://ktc.jp/kiso/lesson/screw.html)（1問）
- [KTC｜六角棒レンチの使い分け](https://ktc.jp/kiso/lesson/hex_wrench.html)（1問）
- [ムラテックKDS｜ラチェットミニクランプの使用例](https://muratec-kds.jp/wp-content/uploads/QN314_A4.pdf)（1問）
- [TONE｜ネイルハンマー](https://www.tonetool.co.jp/topics/detail_product.php?bk=tl&s=15)（1問）
- [三共理化学｜研磨材の目的と粒度](https://www.sankyorikagaku.co.jp/blog/diy-plasticmodel/)（1問）
- [TONE｜ハンマー・打撃工具](https://www.tonetool.co.jp/product/result.php?c=14)（1問）
- [オルファ｜はさみ](https://www.olfa.co.jp/products/productcategory/11)（1問）
- [KTC｜工具のメンテナンス](https://ktc.jp/kiso/maintenance/)（1問）
- [キッコーマン｜せん切り](https://www.kikkoman.co.jp/homecook/basic/vege_cut/shredded.html)（1問）
- [キッコーマン｜いちょう切り](https://www.kikkoman.co.jp/homecook/basic/vege_cut/ginkgo.html)（1問）
- [キッコーマン｜乱切り](https://www.kikkoman.co.jp/homecook/basic/vege_cut/chopped.html)（1問）
- [キッコーマン｜くし形切り](https://www.kikkoman.co.jp/homecook/basic/vege_cut/comb.html)（1問）
- [キッコーマン｜アスパラガスの下処理](https://www.kikkoman.co.jp/homecook/basic/vege_prepare/asparagus.html)（1問）
- [キッコーマン｜セロリの筋の取り方](https://www.kikkoman.co.jp/homecook/basic/vege_prepare/celery.html)（1問）
- [キッコーマン｜玉ねぎの辛み抜き](https://www.kikkoman.co.jp/homecook/basic/vege_prepare/onion.html)（1問）
- [キッコーマン｜しいたけの下処理](https://www.kikkoman.co.jp/homecook/basic/vege_prepare/shiitake.html)（1問）
- [キッコーマン｜豚肉の筋切り](https://www.kikkoman.co.jp/homecook/basic/meat/pork.html)（1問）
- [キッコーマン｜鶏肉のそぎ切り](https://www.kikkoman.co.jp/homecook/basic/meat/chiken.html)（1問）
- [キッコーマン｜えびの下処理](https://www.kikkoman.co.jp/homecook/basic/seafood/prawn.html)（2問）
- [キッコーマン｜あさりの砂抜き](https://www.kikkoman.co.jp/homecook/basic/seafood/shellfish.html)（1問）
- [キッコーマン｜切り干し大根の戻し方](https://www.kikkoman.co.jp/homecook/basic/etc/kiriboshi.html)（1問）
- [日清製粉ウェルナ｜小麦粉の違い](https://www.nisshin-seifun-welna.com/index/customer/faq/product01.html)（1問）
- [日清製粉グループ｜小麦の種類とつくり](https://www.nisshin.com/welnavi/knowledge/detail_001.html)（1問）
- [サカタのタネ｜一年草](https://www.sakataseed.co.jp/glossary/term001607/)（1問）
- [サカタのタネ｜宿根草](https://www.sakataseed.co.jp/glossary/term000983/)（1問）
- [サカタのタネ｜ウォータースペース](https://www.sakataseed.co.jp/glossary/term001619/)（1問）
- [サカタのタネ｜株分け](https://www.sakataseed.co.jp/glossary/term000017/)（1問）
- [サカタのタネ｜花がら](https://www.sakataseed.co.jp/glossary/term000108/)（1問）
- [サカタのタネ｜摘果](https://www.sakataseed.co.jp/glossary/term000089/)（1問）
- [サカタのタネ｜腐葉土](https://www.sakataseed.co.jp/glossary/term000124/)（1問）
- [サカタのタネ｜培養土](https://www.sakataseed.co.jp/glossary/term000113/)（1問）
- [サカタのタネ｜剪定](https://www.sakataseed.co.jp/glossary/term000989/)（1問）
- [サカタのタネ｜マルチング](https://www.sakataseed.co.jp/glossary/term000137/)（1問）
- [サカタのタネ｜緩効性肥料](https://www.sakataseed.co.jp/glossary/term000020/)（1問）
- [サカタのタネ｜連作障害](https://www.sakataseed.co.jp/glossary/term001030/)（1問）
- [サカタのタネ｜高うね](https://www.sakataseed.co.jp/glossary/term000067/)（1問）
- [サカタのタネ｜早生](https://www.sakataseed.co.jp/glossary/term000157/)（1問）
- [サカタのタネ｜ランナー](https://www.sakataseed.co.jp/glossary/term000150/)（1問）
- [サカタのタネ｜人工授粉](https://www.sakataseed.co.jp/glossary/term000052/)（1問）
