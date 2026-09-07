# 観戦と既存の身近な分野の追加調査

確認日：2026-09-07。対象スナップショットは artifacts/proposal-bank.json の 2,597 問。

新分野「スポーツ観戦の基本」38問、既存分野の補強54問、合計92問を追加する。狭い分野は件数合わせで水増しせず、遊び18・図書館14・宿泊15・食事の慣習7問とした。既存のカテゴリーと topic を再利用した。

| 題材                 | 初級 | 中級 | 上級 | 合計 |
| -------------------- | ---: | ---: | ---: | ---: |
| スポーツ観戦の基本   |   17 |   18 |    3 |   38 |
| 身近な遊びの基本     |    6 |    9 |    3 |   18 |
| 図書館で借りる・返す |    5 |    7 |    2 |   14 |
| 宿泊の部屋選び       |    6 |    8 |    1 |   15 |
| 食事の慣習           |    2 |    5 |    0 |    7 |

## 出題方針と重複確認

- 相撲・ラグビー・ゴルフ・陸上の観戦に必要な基本を採用。選手名、歴代記録、競技施設の細かい寸法、専門的な反則細則は出題しない。走幅跳の同記録時の順位付けは除き、スタート位置がずれる理由へ変更した。
- 8勝7敗の勝ち越しは初級へ。単なる定義の理解だけで解ける所蔵情報・デポジットの問題は中級にした。上級枠を埋めるための専門化はしない。
- 既存の将棋盤・持ち駒・王手、囲碁、オセロの先手・終局・盤面・ボウリング採点、既存の図書館手続き15問、宿泊のベッドタイプ15問と照合。オセロは片側だけ置けないときのパス、図書館は本の版・形態・書誌情報、宿泊は利用サービスなど、別の知識へ展開した。
- 一つの事実の単なる数字替えは避ける。フルハウス対ツーペア、二歩とと金、全訳と大活字は基礎知識を組み合わせる応用として採用。
- 施設独自の貸出日数・休館日・部屋定員を先に説明して答えをコピーする出題は追加していない。宿泊条件の例外は解説に置き、基本の言葉を問う。
- 根拠の弱い断定的なマナー、家庭での宗教・習慣の違いを優劣として扱う出題、細かい作法名の大量追加を避けた。四択を自然にそろえにくかった「フォークでライス」は削除した。
- 親の独立レビューを受け、番付・物言い・優勝決定戦、オセロ、ビンゴ、点字、ISBN、全集と選集、ホテルのオートロック等の誤答を、同じ分野の現実的な取り違えに変更した。

## 画像と独立確認

6枚は自作 SVG、480×280、外部参照・script・foreignObject・url() なし。すべて中級。Playwright で横幅390pxに実レンダリングし、6枚の全体と文字・位置を目視確認した。確認画像：artifacts/depth-culture-contact.png。

| ID                                     | 図の事実と独立確認                                                                 |
| -------------------------------------- | ---------------------------------------------------------------------------------- |
| v2-culture-depth-spectating-normal-001 | Aの白丸2・黒丸1、Bの白丸1・黒丸2。白丸=勝、黒丸=敗。                               |
| v2-culture-depth-spectating-normal-005 | Aは静止。上向きを前方とし、Bは同じ縦位置、Cは後方、Dは前方。許可方向B/C。          |
| v2-culture-depth-spectating-normal-011 | PAR4に対しA=3は-1、B=5は+1。バーディ/ボギー。                                      |
| v2-culture-depth-spectating-normal-013 | 球・ワイヤー・握りの三部品。World Athleticsの用具構成と照合。                      |
| v2-culture-depth-playmore-normal-001   | 2・5・8・J・Kが全てハート。同じマーク5枚、連番でも同数組でもない。                 |
| v2-culture-depth-playmore-normal-002   | 歩の位置を(0,0)、前をy=-1としてA=(0,-1)、B=(0,1)、C=(1,-1)、D=(1,0)。合法候補はA。 |

得点の検算：ラグビー 5+2=7、3×2=6。ゴルフのパー3を4打・パー5を3打は (4+3)-(3+5)=-1、通常のストロークプレーの5打と4打+2罰打は5対6。ポーカーは9が3枚・2が2枚でフルハウス、Kが2枚・4が2枚・Aが1枚でツーペア。二歩では成っていない歩のあるA列は不可、と金だけのB列は二歩に該当しない。

## 検証

- TypeScript型検査 `npx tsc --noEmit` 成功。
- エクスポートを独立に読み込み、IDの新旧衝突なし・全問4択・選択肢重複なし・正答範囲・全問出典/解説・画像の実在とSVG禁止参照なしを確認。
- 難易度を変更したのは今回の未公開追加内のみ。既存公開データ・履歴・テスト・統合コードは編集していない。

## 一次資料

競技団体・メーカー・施設運営者・図書館の資料をWebで確認。語義は小学館が提供する辞書本文（コトバンク）を使用し、検索サイトの解説や個人ブログは根拠にしていない。R&AのJavaScriptページは本文取得が不安定だったため、JGAが公開する公式2023年規則PDFの規則3（冊子22〜23ページ、PDF28〜29ページ）へ差し替え、罰打加算とホール単位の勝敗を確認した。World Rugbyは現行のノックフォワードという名称をJRFUと照合した。

補足の確認：寄り切りは [日本相撲協会の個別解説](https://sumo.or.jp/Kimarite/detail/5/)、駅伝のたすきは [宮城陸上競技協会の競技注意事項](https://www.jaaf-miyagi.com/track-and-field/wp-content/uploads/2024/11/0b75aea2b03ab57ad74f4bb060eec048.pdf) でも照合した。全訳の意味と大活字の形態は各単独問題の出典を合わせて応用問題を検証した。

- [日本相撲協会：協会の使命・組織](https://www.sumo.or.jp/IrohaKyokai/organization/)：v2-culture-depth-spectating-easy-001、v2-culture-depth-spectating-easy-005
- [日本相撲協会：千秋楽](https://sumo.or.jp/Entertainment/quiz/1259)：v2-culture-depth-spectating-easy-002
- [日本相撲協会：番付](https://sumo.or.jp/Entertainment/quiz/12)：v2-culture-depth-spectating-easy-003
- [日本相撲協会：番付札の並び](https://www.sumo.or.jp/Entertainment/quiz/605)：v2-culture-depth-spectating-easy-004
- [日本相撲協会：星取表の記号](https://sumo.or.jp/ResultData/hoshitori/3/2/)：v2-culture-depth-spectating-normal-001
- [日本相撲協会：物言い](https://www.sumo.or.jp/Entertainment/quiz/1412)：v2-culture-depth-spectating-normal-002
- [日本相撲協会：押し出し](https://sumo.or.jp/Kimarite/detail/3/)：v2-culture-depth-spectating-normal-003
- [日本相撲協会：勝ち越し](https://www.sumo.or.jp/Entertainment/quiz/895)：v2-culture-depth-spectating-easy-006
- [日本相撲協会：優勝決定戦](https://sumo.or.jp/Entertainment/quiz/1121)：v2-culture-depth-spectating-normal-004
- [World Rugby：得点](https://passport.world.rugby/laws-of-the-game/laws-by-number/8-scoring/)：v2-culture-depth-spectating-easy-007、v2-culture-depth-spectating-easy-010、v2-culture-depth-spectating-hard-001
- [日本ラグビーフットボール協会：ラグビー基本情報](https://www.rugby-japan.jp/guide/rugby/)：v2-culture-depth-spectating-easy-008、v2-culture-depth-spectating-easy-009、v2-culture-depth-spectating-normal-005、v2-culture-depth-spectating-normal-008、v2-culture-depth-spectating-normal-009
- [World Rugby：スクラム](https://passport.world.rugby/laws-of-the-game/laws-by-number/19-scrum/)：v2-culture-depth-spectating-normal-006
- [World Rugby：ラインアウト](https://passport.world.rugby/laws-of-the-game/laws-by-number/18-touch-quick-throw-and-lineout/)：v2-culture-depth-spectating-normal-007
- [小学館デジタル大辞泉：バンカー](https://kotobank.jp/word/%E3%81%B0%E3%82%93%E3%81%8B%E3%83%BC-3192135)：v2-culture-depth-spectating-easy-011
- [ダンロップ：ゴルフクラブの取扱説明](https://sports.dunlop.co.jp/golf/contents/function/warranty.html)：v2-culture-depth-spectating-easy-012
- [小学館デジタル大辞泉：ホールインワン](https://kotobank.jp/word/%E3%81%BB%E3%83%BC%E3%82%8B%E3%81%84%E3%82%93%E3%82%8F%E3%82%93-3192139)：v2-culture-depth-spectating-easy-013
- [小学館デジタル大辞泉：グリーン](https://kotobank.jp/word/%E3%81%90%E3%82%8A%E3%83%BC%E3%82%93-1529360)：v2-culture-depth-spectating-normal-010
- [日本ゴルフ協会：スコアカードの項目](https://www.jga.or.jp/jga/html/description/score_card.html)：v2-culture-depth-spectating-normal-011、v2-culture-depth-spectating-hard-002
- [日本ゴルフ協会：2023年ゴルフ規則・規則3](https://www.jga.or.jp/jga/html/rules/image/Rules_2023.pdf)：v2-culture-depth-spectating-normal-012、v2-culture-depth-spectating-hard-003
- [日本陸上競技連盟：初めての観戦ガイド](https://www.jaaf.or.jp/news/article/23460/?competition=2026)：v2-culture-depth-spectating-easy-014
- [日本陸上競技連盟：陸上競技ガイド](https://www.jaaf.or.jp/guide/rule/)：v2-culture-depth-spectating-easy-015、v2-culture-depth-spectating-easy-017、v2-culture-depth-spectating-normal-014、v2-culture-depth-spectating-normal-015、v2-culture-depth-spectating-normal-016、v2-culture-depth-spectating-normal-017
- [World Athletics：十種競技](https://worldathletics.org/disciplines/combined/decathlon)：v2-culture-depth-spectating-easy-016
- [World Athletics：ハンマー投](https://worldathletics.org/disciplines/throwing/hammer-throw)：v2-culture-depth-spectating-normal-013
- [World Athletics：400mハードルの基本](https://worldathletics.org/disciplines/sprints/400-metres-hurdles)：v2-culture-depth-spectating-normal-018
- [小学館デジタル大辞泉：神経衰弱](https://kotobank.jp/word/%E7%A5%9E%E7%B5%8C%E8%A1%B0%E5%BC%B1-81606)：v2-culture-depth-playmore-easy-001
- [小学館デジタル大辞泉：七並べ](https://kotobank.jp/word/%E4%B8%83%E4%B8%A6%E3%81%B9-520885)：v2-culture-depth-playmore-easy-002
- [小学館デジタル大辞泉：シャッフル](https://kotobank.jp/word/%E3%81%97%E3%82%84%E3%81%A4%E3%81%B5%E3%82%8B-3212061)：v2-culture-depth-playmore-easy-003
- [小学館デジタル大辞泉：五目並べ](https://kotobank.jp/word/%E4%BA%94%E7%9B%AE%E4%B8%A6%E3%81%B9-66291)：v2-culture-depth-playmore-easy-004
- [小学館デジタル大辞泉：ビンゴ](https://kotobank.jp/word/%E3%81%B3%E3%82%93%E3%81%94-3166056)：v2-culture-depth-playmore-easy-005
- [小学館デジタル大辞泉：じゃんけん](https://kotobank.jp/word/%E3%81%98%E3%82%84%E3%82%93%E6%8B%B3-3181766)：v2-culture-depth-playmore-easy-006
- [任天堂：ポーカーの遊びかた](https://www.nintendo.com/jp/others/playing_cards/howtoplay/poker/index.html)：v2-culture-depth-playmore-normal-001、v2-culture-depth-playmore-normal-009、v2-culture-depth-playmore-hard-002
- [日本将棋連盟：駒の動かし方](https://www.shogi.or.jp/knowledge/shogi/03.php)：v2-culture-depth-playmore-normal-002、v2-culture-depth-playmore-normal-003、v2-culture-depth-playmore-normal-004、v2-culture-depth-playmore-normal-005
- [日本オセロ連盟：オセロのルール](https://www.othello.gr.jp/rule)：v2-culture-depth-playmore-normal-006
- [任天堂：ダウトの遊びかた](https://www.nintendo.com/jp/others/playing_cards/howtoplay/doubt/index.html)：v2-culture-depth-playmore-normal-007、v2-culture-depth-playmore-hard-003
- [任天堂：スピードの遊びかた](https://www.nintendo.com/jp/others/playing_cards/howtoplay/speed/index.html)：v2-culture-depth-playmore-normal-008
- [日本将棋連盟：反則について](https://www.shogi.or.jp/knowledge/shogi/05.php)：v2-culture-depth-playmore-hard-001
- [東京都立図書館：りんごの棚・資料紹介](https://www.library.metro.tokyo.lg.jp/support_school/special_education/apple_shelves/)：v2-public-depth-librarymore-easy-001、v2-public-depth-librarymore-easy-002、v2-public-depth-librarymore-hard-001
- [小学館デジタル大辞泉：バックナンバー](https://kotobank.jp/word/%E3%81%B0%E3%81%A4%E3%81%8F%E3%81%AA%E3%82%93%E3%81%B0%E3%83%BC-3164199)：v2-public-depth-librarymore-easy-003
- [小学館デジタル大辞泉：合本](https://kotobank.jp/word/%E5%90%88%E6%9C%AC-464579)：v2-public-depth-librarymore-easy-004
- [小学館デジタル大辞泉：絶版](https://kotobank.jp/word/%E7%B5%B6%E7%89%88-548453)：v2-public-depth-librarymore-easy-005
- [小学館デジタル大辞泉：全訳](https://kotobank.jp/word/%E5%85%A8%E8%A8%B3-551400)：v2-public-depth-librarymore-normal-001
- [小学館デジタル大辞泉：選集](https://kotobank.jp/word/%E9%81%B8%E9%9B%86-550121)：v2-public-depth-librarymore-normal-002
- [日本図書コード管理センター：ISBNの役割](https://isbn.jpo.or.jp/index.php/fix__faq__answer/?FAQ_ID=1002)：v2-public-depth-librarymore-normal-003
- [国立国会図書館：NDLサーチ検索結果一覧](https://ndlsearch.ndl.go.jp/help/search-list)：v2-public-depth-librarymore-normal-004、v2-public-depth-librarymore-normal-005、v2-public-depth-librarymore-normal-007
- [小学館デジタル大辞泉：別冊](https://kotobank.jp/word/%E5%88%A5%E5%86%8A-625046)：v2-public-depth-librarymore-normal-006
- [小学館デジタル大辞泉：増刷](https://kotobank.jp/word/%E5%A2%97%E5%88%B7-552350)：v2-public-depth-librarymore-hard-002
- [小学館デジタル大辞泉：チェックイン](https://kotobank.jp/word/%E3%81%A1%E3%81%88%E3%81%A4%E3%81%8F%E3%81%84%E3%82%93-3213884)：v2-public-depth-hotelmore-easy-001
- [小学館デジタル大辞泉：モーニングコール](https://kotobank.jp/word/%E3%82%82%E3%83%BC%E3%81%AB%E3%82%93%E3%81%90%E3%81%93%E3%83%BC%E3%82%8B-3219747)：v2-public-depth-hotelmore-easy-002
- [小学館デジタル大辞泉：アメニティーグッズ](https://kotobank.jp/word/%E3%81%82%E3%82%81%E3%81%AB%E3%81%A6%E3%81%84%E3%83%BC%E3%81%90%E3%81%A4%E3%81%9A-198854)：v2-public-depth-hotelmore-easy-003
- [ホテルオークラ福岡：ルームサービス](https://www.fuk.hotelokura.co.jp/stay/roomservice/)：v2-public-depth-hotelmore-easy-004
- [小学館デジタル大辞泉：コンシェルジュ](https://kotobank.jp/word/%E3%81%93%E3%82%93%E3%81%97%E3%81%88%E3%82%8B%E3%81%98%E3%82%86-3211000)：v2-public-depth-hotelmore-easy-005
- [小学館デジタル大辞泉：デイユース](https://kotobank.jp/word/%E3%81%A7%E3%81%84%E3%82%86%E3%83%BC%E3%82%B9-2879467)：v2-public-depth-hotelmore-easy-006
- [東横イン：アーリーチェックイン・レイトチェックアウト](https://www.toyoko-inn.com/campaign/extended_stay/)：v2-public-depth-hotelmore-normal-001
- [品川プリンスホテル：館内のご案内](https://www.princehotels.co.jp/shinagawa/files/info_hotelinfo_japanese.pdf)：v2-public-depth-hotelmore-normal-002
- [小学館デジタル大辞泉：オートロック](https://kotobank.jp/word/%E3%81%8A%E3%83%BC%E3%81%A8%E3%82%8D%E3%81%A4%E3%81%8F-3208650)：v2-public-depth-hotelmore-normal-003
- [ホテルオークラ福岡：宿泊FAQ・ランドリー](https://www.fuk.hotelokura.co.jp/faq/stay/)：v2-public-depth-hotelmore-normal-004
- [ホテルロイヤルクラシック大阪：客室設備・ミニバー](https://hotel-royalclassic.jp/stay/premium)：v2-public-depth-hotelmore-normal-005
- [JTB：デポジットについて](https://faq.jtb.co.jp/faqs/f4839/)：v2-public-depth-hotelmore-normal-006、v2-public-depth-hotelmore-normal-008
- [小学館デジタル大辞泉：前泊](https://kotobank.jp/word/%E5%89%8D%E6%B3%8A-1825454)：v2-public-depth-hotelmore-normal-007
- [小学館デジタル大辞泉：延泊](https://kotobank.jp/word/%E5%BB%B6%E6%B3%8A-448107)：v2-public-depth-hotelmore-hard-001
- [プリンスホテル：食事の基本マナー・ナプキン](https://www.princehotels.co.jp/nippon/article/007.html)：v2-manners-depth-mannersmore-easy-001、v2-manners-depth-mannersmore-normal-001
- [小学館日本大百科全書：箸の用途](https://kotobank.jp/word/%E7%AE%B8-114119)：v2-manners-depth-mannersmore-easy-002
- [トータルマナー：テーブルマナー講習・パン](https://www.manner.co.jp/blog/sahou070/)：v2-manners-depth-mannersmore-normal-002
- [トータルマナー：洋食マナー](https://www.manner.co.jp/blog/tips-practice-10/)：v2-manners-depth-mannersmore-normal-003
- [兵左衛門：箸のマナーと文化](https://www.hyozaemon.co.jp/culture/manners/)：v2-manners-depth-mannersmore-normal-004、v2-manners-depth-mannersmore-normal-005
