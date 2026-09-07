# 間取り図・親族の呼び方の追加調査

確認日：2026-09-07。

`src/data/expansion-floor-family.ts` に30問を追加する。間取り図の読み方（household/floorplan）と親族の呼び方（culture/family）は、それぞれ初級6問・中級6問・上級3問。中級12問には独自に描いた480×280のSVGを付ける。図の数値・人物・住戸は架空の設例であり、実在する家族や物件の図面を転載していない。

## 問題と根拠

| ID末尾（floorplan） | 内容                                 | 根拠                                                                                                           |
| ------------------- | ------------------------------------ | -------------------------------------------------------------------------------------------------------------- |
| easy-001〜002       | 1Rの一体空間と、1Kの仕切り           | [UR：1R・1Kの違い](https://www.ur-net.go.jp/chintai/college/202305/001058.html)                                |
| easy-003〜005       | DK・LDKの用途と、先頭の居室数        | [UR：賃貸の間取り](https://www.ur-net.go.jp/chintai/college/202405/000470.html)                                |
| easy-006            | CLの意味                             | [ホームメイト：間取図の見方](https://www.homemate.co.jp/chintai-article/how-to-search/005/)                    |
| normal-001          | Nの向きとバルコニーの方位            | 同上。方位記号を明記した独自図で東西南北を判断                                                                 |
| normal-002          | 出入口をたどる生活動線               | [UR：内見時チェックリスト](https://www.ur-net.go.jp/chintai/college/202107/000698.html)                        |
| normal-003〜004     | 開き戸の動く範囲、二つの外壁の窓     | [ホームメイト：建具・窓の表示記号](https://www.homemate.co.jp/chintai-article/how-to-search/005/)              |
| normal-005          | 寸法から家具と左右の余白を計算       | [UR：家具の寸法の確認](https://www.ur-net.go.jp/chintai/college/202107/000698.html)。200−（160＋10＋10）＝20cm |
| normal-006          | 浴室・トイレ・独立した洗面台の配置   | [ホームメイト：水まわりとUBの意味](https://www.homemate.co.jp/chintai-article/how-to-search/005/)              |
| hard-001            | Sはサービスルーム・納戸              | 同上。居室要件の数値・法令暗記は出題しない                                                                     |
| hard-002            | 募集図の見た目と実測・搬入経路の違い | [UR：内見時の室内・家具確認](https://www.ur-net.go.jp/chintai/college/202107/000698.html)                      |
| hard-003            | 洋室でも帖を広さの単位に使う         | [ホームメイト：洋6帖の表示](https://www.homemate.co.jp/chintai-article/how-to-search/005/)                     |

| ID末尾（family） | 内容                               | 根拠                                                                                                                                       |
| ---------------- | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| easy-001         | 姉の息子＝甥                       | [漢字ペディア：甥](https://www.kanjipedia.jp/kotoba/0003904500)                                                                            |
| easy-002         | 弟の娘＝姪                         | [漢字ペディア：姪](https://www.kanjipedia.jp/kotoba/0005019000)                                                                            |
| easy-003         | 母の母＝祖母                       | [漢字ペディア：祖母](https://www.kanjipedia.jp/kotoba/0004161000)                                                                          |
| easy-004         | 子の子＝孫                         | [漢字ペディア：孫](https://www.kanjipedia.jp/kotoba/0004383000)                                                                            |
| easy-005         | 配偶者が表す関係                   | [漢字ペディア：妻](https://www.kanjipedia.jp/kotoba/0002495400)                                                                            |
| easy-006         | 妻の父＝義父                       | [日本語検定委員会：義父の一言](https://www.nihongokentei.jp/grandprize/pdf/4rd/ippan_01.pdf)の冒頭で妻の父を義父と説明。辞書の語義とも照合 |
| normal-001〜002  | 父の兄＝伯父、母の弟＝叔父         | [漢字ペディア：叔父・伯父](https://www.kanjipedia.jp/kotoba/0003194600)                                                                    |
| normal-003〜004  | 母の姉＝伯母、父の妹＝叔母         | [漢字ペディア：叔母・伯母](https://www.kanjipedia.jp/kotoba/0003194700)                                                                    |
| normal-005       | 父の妹の子＝いとこ                 | [漢字ペディア：従兄弟](https://www.kanjipedia.jp/kotoba/0003181100)                                                                        |
| normal-006       | 祖母の母＝曽祖母                   | [漢字ペディア：曽祖母](https://www.kanjipedia.jp/kotoba/0004247100)                                                                        |
| hard-001         | 視点を姪側へ入れ替えて伯父を判断   | [漢字ペディア：叔父・伯父](https://www.kanjipedia.jp/kotoba/0003194600)                                                                    |
| hard-002         | 年上の男性のいとこ＝従兄           | [漢字ペディア：従兄弟の表記](https://www.kanjipedia.jp/kotoba/0003181100)                                                                  |
| hard-003         | 三段の親子関係をたどり、ひ孫を判断 | [漢字ペディア：曽孫](https://www.kanjipedia.jp/kotoba/0004247200)                                                                          |

漢字ペディアは日本漢字能力検定協会が提供する辞書。親族問題は日常の呼び方に絞り、親等の数え方、相続順位、養子縁組の例外、儀礼の正誤を対象にしていない。「自分」から見た関係と逆方向の関係を明記し、伯・叔の区別には該当する親の兄弟姉妹の年齢を与えた。

## 図と選択肢の品質

- 12枚すべて同梱SVG。外部画像・フォント・スクリプト参照なし。図の情報に対応した日本語altを付けた。
- 間取りは太線・切れ目・窓・扉の弧の凡例を表示。寸法問題では縮尺どおりでないことを図中に明記した。
- 家族図は二重線を夫婦、下向き線を親から子、同じ枝を兄弟姉妹として凡例を表示。「自分」の枠も区別した。配偶者を省略した親子線でも、誰の子かが一意に定まる。
- 同一分野の語や配置を選択肢に使い、誤答だけを「必ず」「絶対」などの断定語にしない。家具の確認問題の誤答も、間取り図・帖数・写真による判断という同じ場面で比較する。

## 担当範囲の検証

- 既存2,372問のスナップショットと同一設問を照合し、重複0。間取り・1R・1K・親族の呼称などの関連語でも既存の設問と照合した。
- 全30問のID・4択の重複・正答位置・出典・画像と難易度の対応を確認。各分野6/6/3、画像12、正答位置の配分8/7/8/7。
- 15件の出典URLをHTTP GETで再確認し、すべて200。上記内容をweb本文でも確認した。
- `npx tsc --noEmit --strict --target ES2022 --module ESNext --moduleResolution Bundler --skipLibCheck src/data/expansion-floor-family.ts` 成功。
- Playwright/Chromiumで12枚すべてを1040pxと390pxのブラウザに実描画。ページ横はみ出し・SVGテキスト領域のはみ出し0。画像を目視し、玄関ラベルと凡例の間隔を修正して再描画した。
- ローカル検証画像：`artifacts/scene-floorplan-desktop.png`、`artifacts/scene-family-desktop.png`、それぞれの`-mobile.png`および`-mobile-detail.png`。
- 統合後の `npx playwright test tests/browser/scenes.spec.ts` は2件成功（28.3秒）。全8題材の検索・難易度・出典、精算/間取り/家族図の390px表示、各問の回答確定後リロード復元、3問正解で100点を確認。実際のクイズ画面も `artifacts/scene-quiz-floorplan-mobile.png` と `artifacts/scene-quiz-family-mobile.png` で目視確認した。
