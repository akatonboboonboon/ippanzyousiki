# 路面表示・施設案内マークの追加調査

確認日：2026年9月7日。追加は30問、全問 `public / normal / image`。既存の道路標識18問、停止線での一時停止、点字ブロックや各種バリアフリーマークの文字問題と照合し、路面の図形を読む問題と施設で目的の場所を見つける問題を追加した。

## 問題と一次資料の対応

道路15問のIDは `v2-public-scene-road-normal-001` ～ `015`、施設15問は `v2-public-scene-facility-normal-001` ～ `015`。

| 道路の番号 | 題材・確認したこと                                                             | 一次資料                                                                                                                                        |
| ---------- | ------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| 001        | ◇は横断歩道又は自転車横断帯の予告                                              | [警視庁：ダイヤマーク](https://www.keishicho.metro.tokyo.lg.jp/kotsu/mark/daiyamark.html)                                                       |
| 002～003   | 自転車の通行位置・方向の案内であり、新たな優先権の指定ではない                 | [警視庁：自転車ナビマーク・自転車ナビライン](https://www.keishicho.metro.tokyo.lg.jp/kotsu/jikoboshi/bicycle/menu/navimark.html)                |
| 004        | 路面の横断歩道の図形                                                           | [国土交通省：道路標識・道路標示一覧](https://www.mlit.go.jp/road/sign/sign/douro/ichiran.pdf)                                                   |
| 005        | 横断歩道に隣接する自転車横断帯                                                 | [大阪府警察：自転車の通行方法](https://www.police.pref.osaka.lg.jp/kotsu/taisakushitsu/bicycletopics/10748.html)                                |
| 006～010   | 車線別進行方向、同方向車線間の黄色い実線、導流帯、立入り禁止部分、停止禁止部分 | [福島県警察：交通規制基準](https://www.police.pref.fukushima.jp/03.tetuduki/-jyouhoukoukai/reiki_int/reiki_honbun/u244RG00002609.html) 第24～29 |
| 011        | 道路端の歩行空間を目立たせるグリーンベルト                                     | [加古川市：グリーンベルト](https://www.city.kakogawa.lg.jp/soshikikarasagasu/kyouiku/kakuka/kyoikusomubu/gakumuka/tuugakuro/32856.html)         |
| 012        | カーブ等の手前で減速を促す表示                                                 | [倉吉河川国道事務所：減速路面標示](https://www.cgr.mlit.go.jp/kurayoshi/road/koutuujiko/08page_top.htm)                                         |
| 013        | 最高速度30km/hの区域規制とハンプ等を組み合わせる                               | [国土交通省：ゾーン30プラス](https://www.mlit.go.jp/road/road/traffic/sesaku/syokai.html)                                                       |
| 014        | 交差点を見落としにくくする交差点明示マーク                                     | [国土交通省：札幌市美園地区の対策事例](https://www.mlit.go.jp/road/road/traffic/sesaku/pdf/kokajirei/01_a.pdf)                                  |
| 015        | 黄色い矢羽根は先の進路変更禁止区間の予告                                       | [警視庁：進路変更禁止の注意喚起表示](https://www.keishicho.metro.tokyo.lg.jp/kotsu/doro/houteigai_hyouji.html)                                  |

施設の全15問は[国土交通省：案内用図記号JIS Z8210（公共・一般施設）](https://www.mlit.go.jp/sogoseisaku/barrierfree/content/001727469.pdf) の図柄・名称を確認した。順に、コインロッカー、手荷物一時預かり所、飲料水、忘れ物取扱所、休憩所・待合室、ミーティングポイント、クローク、更衣室、エレベーター、上り・下りエスカレーター、キャッシュサービス、銀行・両替、チェックイン・受付、ホテル・宿泊施設、カート。

## 作図と出典表記

- 道路図 `public/quiz/scene-road-01.svg` ～ `15.svg` は一次資料の意味と図形を確認して当アプリが作図した模式図。道路の寸法・距離は再現しない。警視庁のナビマーク・ナビライン、進路変更予告の画像も実際にブラウザーで表示して照合し、矢羽根の形を修正した。
- 施設図 `public/quiz/scene-facility-01.svg` ～ `15.svg` は上記国土交通省PDFの該当図記号のベクトルだけを取り出し、SVG化して背景・余白・比較用A/Bを当アプリが加工・配置した。PDF全体や隠れた図柄、外部画像、フォント、スクリプトは含めない。
- [国土交通省の利用条件](https://www.mlit.go.jp/link.html) で、公共データ利用規約に準拠した利用、出典の記載、加工の明示を確認した。問題の `source` に資料名とURLを設定し、施設画像のキャプションを「国土交通省の案内用図記号を当アプリが学習用に加工・配置」とした。省の監修・作成したクイズと受け取られる表現は使わない。
- 図記号自体の利用について、[交通エコロジー・モビリティ財団の2021年ガイドライン説明](https://www.ecomo.or.jp/english/picto_about2021.html) で自由な利用の案内を確認し、[2025年版の説明](https://www.ecomo.or.jp/barrierfree/pictogram/picto_about2025.html) とも照合した。規格文書の本文全体を転載するものではない。
- すべて480×280、ローカルのインラインベクトル。altは図の位置・形・文字を説明し、マーク名や正解の意味を追加しない。

## 問題品質と検証

- 図の意味を問う設問では、ナビマーク・導流帯・停止禁止部分・クロークなどの名称を設問内で先に教えない。名称は解説で学べる。
- 罰金額や免許区分の細則、規制の寸法などの専門暗記は出題しない。黄色い実線は「同方向車線間」と明示し、道路中央線の別の意味が混ざらないようにした。
- 一つの正答が他の選択肢を包含する組合せを避けた。立入り禁止部分は、駐車禁止や積み下ろし禁止という部分的な内容との比較にせず、区画の用途を四つ並べている。
- 正答位置は道路4/4/4/3、施設3/4/4/4で、合計7/8/8/7。すべて異なる4択、出典・解説・画像を持つ。
- PlaywrightのChromiumで全30SVGを実レンダリング。各画像の480×280の自然寸法とdecode成功を確認した。390px幅でも代表6画像を表示し、横方向のはみ出しや描画エラーなし。
- 画像確認：`artifacts/scene-road-contact.png`、`artifacts/scene-facility-contact.png`、`artifacts/scene-symbols-mobile.png`。一次資料との目視照合用には `artifacts/scene-jis-page-0.png`、`scene-jis-page-1.png`、`scene-navi-source.png`、`scene-warning-source.png` を使用した。
- `npx tsc --noEmit --strict --target ES2022 --module ESNext --moduleResolution bundler --skipLibCheck src/data/expansion-street-symbols.ts` による担当モジュールの型検査に成功。全体の問題数・診断・履歴・ブラウザー回帰テストは統合担当で検証する。
