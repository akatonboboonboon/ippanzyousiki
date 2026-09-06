# 文章問題の追加調査記録：仕事・マナー・公共・文化

確認日：2026-09-06
対象：`src/data/expansion-communication.ts`

## 追加範囲

既存 1,284 問のうち担当する 4 カテゴリの問題文・題材・正答を、既存の `src/data/practical-*.ts`、`src/data/visual-questions.ts`、`src/data/life-expansion.ts` で先に照合した。学校の試験範囲や専門職の知識に広げるのではなく、連絡、施設の利用、日常の行事、一般の観戦・鑑賞、身近なことばを補った。外部のクイズ問題文や選択肢は転記せず、資料から確認した事実を基に独自に執筆した。

| カテゴリ     | 初級 | 中級 | 上級 |  計 |
| ------------ | ---: | ---: | ---: | --: |
| 仕事・連絡   |   24 |   24 |   12 |  60 |
| マナー・慣習 |   24 |   24 |   12 |  60 |
| 交通・公共   |   24 |   24 |   12 |  60 |
| ことば・教養 |   24 |   24 |   12 |  60 |
| 合計         |   96 |   96 |   48 | 240 |

ID は `v2-{category}-expanded-{difficulty}-{連番}`。既存の ID・問題を変更しない追加配列として公開し、画像や画面機能はこのファイルでは追加していない。各問題に 4 つの選択肢、正答、説明、題材、出典を持たせた。正答位置は 0〜3 が各 60 問になるよう回している。

初級は見聞きする言葉・道具・行為、中級は似た言葉や使い方の区別、上級は状況や複数条件を踏まえる判断を中心とした。難度はこの問題集内での編集上の区分である。慣習には地域・宗教・施設による違いがあるため、全国一律の作法として断定しない。旅館の料金比較、文書例、試合の得点例は独自の場面であり、資料に載っている例の引用ではない。

## 題材の分布

各題材を 5 問（初級 2・中級 2・上級 1）に抑え、各カテゴリ 12 題材とした。

| カテゴリ     | 題材                   | 初級 | 中級 | 上級 |
| ------------ | ---------------------- | ---: | ---: | ---: |
| 仕事・連絡   | 相手の動作を表す敬語   |    2 |    2 |    1 |
| 仕事・連絡   | 自分の動作を表す敬語   |    2 |    2 |    1 |
| 仕事・連絡   | 授受の言い方           |    2 |    2 |    1 |
| 仕事・連絡   | 手紙の構成             |    2 |    2 |    1 |
| 仕事・連絡   | 手紙の始めと結び       |    2 |    2 |    1 |
| 仕事・連絡   | 伝わる言い換え         |    2 |    2 |    1 |
| 仕事・連絡   | 会話での説明           |    2 |    2 |    1 |
| 仕事・連絡   | 誤解の少ない文         |    2 |    2 |    1 |
| 仕事・連絡   | 読みやすい資料         |    2 |    2 |    1 |
| 仕事・連絡   | 注記と表示の読み方     |    2 |    2 |    1 |
| 仕事・連絡   | 職場の電話機能         |    2 |    2 |    1 |
| 仕事・連絡   | 書類をまとめる道具     |    2 |    2 |    1 |
| マナー・慣習 | 正月の飾り             |    2 |    2 |    1 |
| マナー・慣習 | 節句の飾りと願い       |    2 |    2 |    1 |
| マナー・慣習 | 季節の区切り           |    2 |    2 |    1 |
| マナー・慣習 | お盆と供養の食         |    2 |    2 |    1 |
| マナー・慣習 | 赤ちゃんの節目         |    2 |    2 |    1 |
| マナー・慣習 | 神社で見かける場所     |    2 |    2 |    1 |
| マナー・慣習 | おみくじの読み方       |    2 |    2 |    1 |
| マナー・慣習 | 共同浴場の使い方       |    2 |    2 |    1 |
| マナー・慣習 | 旅館の滞在プラン       |    2 |    2 |    1 |
| マナー・慣習 | 和室で見かけるもの     |    2 |    2 |    1 |
| マナー・慣習 | 和の衣服と小物         |    2 |    2 |    1 |
| マナー・慣習 | 弔事での案内と返礼     |    2 |    2 |    1 |
| 交通・公共   | 図書館で資料を探す     |    2 |    2 |    1 |
| 交通・公共   | 図書館の調べもの支援   |    2 |    2 |    1 |
| 交通・公共   | 博物館での鑑賞         |    2 |    2 |    1 |
| 交通・公共   | 郵便の付加サービス     |    2 |    2 |    1 |
| 交通・公共   | 郵便物を受け取る       |    2 |    2 |    1 |
| 交通・公共   | 電車が止まったとき     |    2 |    2 |    1 |
| 交通・公共   | 駅と乗車券の区別       |    2 |    2 |    1 |
| 交通・公共   | 空港で搭乗するまで     |    2 |    2 |    1 |
| 交通・公共   | 飛行機の手荷物         |    2 |    2 |    1 |
| 交通・公共   | 公共交通の利用支援     |    2 |    2 |    1 |
| 交通・公共   | 自然公園の利用         |    2 |    2 |    1 |
| 交通・公共   | 身近なバスの種類       |    2 |    2 |    1 |
| ことば・教養 | 映画の年齢区分         |    2 |    2 |    1 |
| ことば・教養 | 身近な伝統芸能         |    2 |    2 |    1 |
| ことば・教養 | 歌と劇の舞台           |    2 |    2 |    1 |
| ことば・教養 | よく見かける楽器       |    2 |    2 |    1 |
| ことば・教養 | 曲を聴くときの言葉     |    2 |    2 |    1 |
| ことば・教養 | バスケットボール観戦   |    2 |    2 |    1 |
| ことば・教養 | 卓球の基本             |    2 |    2 |    1 |
| ことば・教養 | バドミントンの基本     |    2 |    2 |    1 |
| ことば・教養 | 水泳の観戦             |    2 |    2 |    1 |
| ことば・教養 | 日常の気持ちを表す言葉 |    2 |    2 |    1 |
| ことば・教養 | 会話で誤解しやすい表現 |    2 |    2 |    1 |
| ことば・教養 | 囲碁を楽しむ基本       |    2 |    2 |    1 |

## 確認した内容

- **敬語と連絡**：文化庁の尊敬語・謙譲語・授受表現、日本郵便の手紙の構成と頭語・結語を参照した。「いらっしゃる」等は動作の主体を明示し、文脈によって複数の敬語が成立する曖昧な設問を避けた。文化庁の「公用文作成の考え方」の本文 PDF で概数・見出し・箇条書・注記、やさしい日本語の資料で短い文・二重否定・伝わる言い換えを確認した。場面・文章例は独自作成。
- **電話と文具**：NTT 東日本の案内と取扱説明書で短縮ダイヤル、保留・転送、ミュートを確認した。回線やチャネル数を問う設問は専門寄りのため不採用とし、通話中の自分の声を止める場面に変更した。文具はメーカーの製品案内にある一般的なステープラー、針外し、パンチを対象にした。
- **年中行事と神社**：神社本庁、福島県神社庁、農林水産省の紹介で、門松・鏡餅・しめ縄・すす払い・どんど焼き、五節句、彼岸・土用・節分、お盆、赤ちゃんの祝い、境内・おみくじを確認した。日付・飾り方・祈願内容の地域差を説明に残した。お食い初めは食べるまねの儀礼とし、大人の食事を実際に与える設問にしない。
- **宿泊と入浴**：観光庁、日本政府観光局、日本旅館協会の利用案内を参照。入浴前に洗い、泡を流し、髪・タオルを共同の湯につけないこと、一泊二食・朝食付き・素泊まり、旅館の一人単位と一室単位の価格を区別した。価格は架空の例。和室と浴衣は生活・旅行で見かける基本だけを対象にし、襟の重ね方は着付けを提供するアトリエはるかの公式案内で確認した。
- **弔事**：三越伊勢丹の実務案内で会葬御礼と香典返し、会費制のお別れ会、香典・供花辞退の案内を確認した。金額の相場や宗派別の細則は追加せず、案内に明記された条件の読み分けを出題した。
- **図書館・博物館**：東京都立図書館の検索ヘルプ、調べもの相談、利用 Q&A、東京国立博物館の来館者向け案内を参照した。利用条件のある事項は施設名を明示。図書館のレファレンスは調査を支えるサービスとして扱い、課題の代筆などと区別した。撮影可であってもフラッシュや他者のプライバシーの扱いは別である。
- **郵便**：日本郵便の公式案内で内容証明と配達証明の役割、局留・本人確認・署名による受取、不在届の世帯全員という範囲、往復はがきの返信、未使用の書き損じはがきの交換条件を確認した。交換の出典は転送先の現行ページを使用した。手数料など変わりやすい具体額は問わない。
- **鉄道**：JR 東日本の運行障害案内、途中下車 Q&A、旅客営業規則の入場券条項を確認した。振替輸送での IC チャージ利用と定期券対象区間を区別し、タッチによる通常運賃の差引きを説明した。入場券では発車前でも列車内へ入れないことを規則で確認した。
- **空港・手荷物**：ANA の空港手続き・オンラインチェックイン・手荷物制限・収納方法の現行公式案内を参照した。チェックイン後も荷物の預入れと保安検査があること、運航会社、手荷物引換証の保管、予備電池の端子保護、損傷電池、前席のない席の収納を確認。個数や容量上限等の細かな最新値は出題しない。引換証の出典は取得に失敗した別ホストから公開正規 URL に変更した。
- **公共交通と自然公園**：国土交通省の耳マーク等の案内、ベビーカーマーク、バス車内でのベビーカー固定・ストッパー・保護者の支え、ノンステップバス等の解説、日本バス協会の分類、環境省の国立公園利用案内を確認した。筆談の言い換えを三問並べないよう、ベビーカー利用へ差し替えた。
- **鑑賞と音楽**：映倫の年齢区分、国立劇場の演芸解説、松竹の歌舞伎案内、新国立劇場のオペラ案内と遅刻時 Q&A、ヤマハの楽器・音楽用語解説を参照。アカペラはヤマハの無伴奏コーラス楽譜の公式説明で確認した。細かな電子楽器のトランスポーズ操作は削り、日常の音楽用語へ置き換えた。
- **スポーツと囲碁**：B.LEAGUE、日本卓球協会、日本バドミントン協会の 2026 年競技規則、日本水泳連盟、日本棋院の公式入門を参照した。記録・選手名・例外的な細則は追加せず、基本の用具・人数・得点・打ち方・泳法・陣取りを対象にした。囲碁は単独の石の上下左右が全てふさがった場面を独自に記述し、取られる判断を問う。
- **ことば**：文化庁の国語に関する世論調査・ことば食堂・広報記事を主に参照した。「従来の辞書的な意味」と範囲を明示し、使用実態の多様性と区別した。「あいにく」「口が堅い」「水に流す」は小学館『デジタル大辞泉』のコトバンク掲載本文を参照している。この 3 件は辞典の掲載媒体であり、公的機関の一次資料とは区別する。

## 重複・品質確認

既存設問との同じ事実の言い換えを避けるため、担当カテゴリ一覧と照合し、レビューで見つかった「会場だけ変更・開始時刻は同じ」を「概数の読み方」に差し替えた。新規内でも、モバイルバッテリーの預入れ可否の繰返し、筆談の三重出題、電子楽器のキー変更の重複、囲碁の勝ち幅の同義反復を解消した。細かな「再啓」も往復はがきの使い方に変更した。最終照合で「本文の役割」の重複を見つけたため、追加側の easy-008 を「追伸の目的」に差し替え、日本郵便の英文レター案内の追伸欄で意味を確認した。

宿泊の単位は実際の料金比較へ、共同浴場は泡・髪・タオルの複数条件へ、舞台は開演後の入場時機へ変更した。問題文中に人数の答えを含む箇所は B.LEAGUE の試合を指定する形に直した。誤答は同じ場面で起こる混同へ改め、関係のない道具・機能や極端な行為だけで除外できる候補を減らした。

確認結果：全 240 問、各カテゴリ 60 問、各難度 24 / 24 / 12 問。ID と問題文の完全一致重複なし、各問の選択肢は 4 個で重複なし、全問に正答・説明・題材・出典あり、画像なし。単体 TypeScript 型検査を通過。全体の統合テストは親タスク側で実施する。

## 問題に紐付けた出典一覧

81 個の URL を採用した。以下は最終配列から抽出した出典と対応 ID の一覧。長い案内ページは、上の確認内容に対応する節を参照した。

1. [文化庁：敬語の基本（場面は独自作成）](https://www.bunka.go.jp/seisaku/kokugo_nihongo/kokugo_shisaku/keigo/chapter2/detail.html)

   題材：相手の動作を表す敬語、自分の動作を表す敬語、授受の言い方。対象：`v2-work-expanded-easy-001`、`v2-work-expanded-easy-002`、`v2-work-expanded-normal-001`、`v2-work-expanded-normal-002`、`v2-work-expanded-hard-001`、`v2-work-expanded-easy-003`、`v2-work-expanded-easy-004`、`v2-work-expanded-normal-003`、`v2-work-expanded-normal-004`、`v2-work-expanded-hard-002`、`v2-work-expanded-easy-005`、`v2-work-expanded-easy-006`、`v2-work-expanded-normal-005`、`v2-work-expanded-normal-006`、`v2-work-expanded-hard-003`。

2. [日本郵便：手紙の基本形式](https://www.post.japanpost.jp/enjoy/culture/howto/navi/mame_knowledge.html)

   題材：手紙の構成。対象：`v2-work-expanded-easy-007`、`v2-work-expanded-normal-007`、`v2-work-expanded-normal-008`、`v2-work-expanded-hard-004`。

3. [日本郵便：頭語と結語](https://www.post.japanpost.jp/enjoy/culture/howto/navi/mame_dear.html)

   題材：手紙の始めと結び。対象：`v2-work-expanded-easy-009`、`v2-work-expanded-easy-010`、`v2-work-expanded-normal-009`、`v2-work-expanded-hard-005`。

4. [日本郵便：往復はがきの使い方](https://www.post.japanpost.jp/service/send/domestic/mail/postcard/)

   題材：手紙の始めと結び。対象：`v2-work-expanded-normal-010`。

5. [文化庁・出入国在留管理庁：やさしい日本語ガイドライン（例文は独自作成）](https://www.bunka.go.jp/seisaku/kokugo_nihongo/kyoiku/pdf/92484001_01.pdf)

   題材：伝わる言い換え。対象：`v2-work-expanded-easy-011`、`v2-work-expanded-easy-012`、`v2-work-expanded-normal-011`、`v2-work-expanded-normal-012`、`v2-work-expanded-hard-006`。

6. [文化庁・出入国在留管理庁：話し言葉のポイント（場面は独自作成）](https://www.bunka.go.jp/seisaku/kokugo_nihongo/kyoiku/pdf/93832501_01.pdf)

   題材：会話での説明。対象：`v2-work-expanded-easy-013`、`v2-work-expanded-easy-014`、`v2-work-expanded-normal-013`、`v2-work-expanded-normal-014`、`v2-work-expanded-hard-007`。

7. [文化庁：公用文作成の考え方（文書例は独自作成）](https://www.bunka.go.jp/seisaku/bunkashingikai/kokugo/hokoku/pdf/93731901_01.pdf)

   題材：誤解の少ない文、読みやすい資料、注記と表示の読み方。対象：`v2-work-expanded-easy-015`、`v2-work-expanded-easy-016`、`v2-work-expanded-normal-015`、`v2-work-expanded-normal-016`、`v2-work-expanded-hard-008`、`v2-work-expanded-easy-017`、`v2-work-expanded-easy-018`、`v2-work-expanded-normal-017`、`v2-work-expanded-normal-018`、`v2-work-expanded-hard-009`、`v2-work-expanded-easy-019`、`v2-work-expanded-easy-020`、`v2-work-expanded-normal-019`、`v2-work-expanded-normal-020`、`v2-work-expanded-hard-010`。

8. [NTT東日本：ビジネスフォンの機能](https://business.ntt-east.co.jp/content/denwa/service_multi/index.html)

   題材：職場の電話機能。対象：`v2-work-expanded-easy-021`、`v2-work-expanded-easy-022`、`v2-work-expanded-normal-021`。

9. [NTT東日本：短縮ダイヤルの使い方](https://business.ntt-east.co.jp/support/version/meeting/mbox/download/mbox_documents.pdf)

   題材：職場の電話機能。対象：`v2-work-expanded-normal-022`、`v2-work-expanded-hard-011`。

10. [コクヨ：ステープラー・パンチ](https://www.kokuyo-shop.jp/sc/CategoryList.aspx?ccd=F3000005)

題材：書類をまとめる道具。対象：`v2-work-expanded-easy-023`、`v2-work-expanded-easy-024`、`v2-work-expanded-normal-023`、`v2-work-expanded-normal-024`、`v2-work-expanded-hard-012`。

11. [福島県神社庁：お正月の準備](https://fukushima-jinjacho.or.jp/monoshiri/pc/section10.html)

題材：正月の飾り。対象：`v2-manners-expanded-easy-001`、`v2-manners-expanded-easy-002`、`v2-manners-expanded-normal-001`、`v2-manners-expanded-normal-002`、`v2-manners-expanded-hard-001`。

12. [神社本庁：節供](https://www.jinjahoncho.or.jp/omairi/sekku/)

題材：節句の飾りと願い。対象：`v2-manners-expanded-easy-003`、`v2-manners-expanded-easy-004`、`v2-manners-expanded-normal-003`、`v2-manners-expanded-normal-004`、`v2-manners-expanded-hard-002`。

13. [農林水産省：日本の行事と行事食](https://www.maff.go.jp/j/pr/aff/1712/pdf/1712_03.pdf)

題材：季節の区切り。対象：`v2-manners-expanded-easy-005`、`v2-manners-expanded-easy-006`、`v2-manners-expanded-normal-005`、`v2-manners-expanded-normal-006`、`v2-manners-expanded-hard-003`。

14. [農林水産省：お盆と精進料理](https://www.maff.go.jp/j/pr/aff/2508/event02.html)

題材：お盆と供養の食。対象：`v2-manners-expanded-easy-007`、`v2-manners-expanded-easy-008`、`v2-manners-expanded-normal-007`、`v2-manners-expanded-normal-008`、`v2-manners-expanded-hard-004`。

15. [神社本庁：出産と育児](https://www.jinjahoncho.or.jp/omairi/shussan/)

題材：赤ちゃんの節目。対象：`v2-manners-expanded-easy-009`、`v2-manners-expanded-easy-010`、`v2-manners-expanded-normal-009`、`v2-manners-expanded-normal-010`、`v2-manners-expanded-hard-005`。

16. [神社本庁：境内について](https://www.jinjahoncho.or.jp/omairi/keidai/)

題材：神社で見かける場所。対象：`v2-manners-expanded-easy-011`、`v2-manners-expanded-easy-012`、`v2-manners-expanded-normal-011`、`v2-manners-expanded-normal-012`、`v2-manners-expanded-hard-006`。

17. [神社本庁：おみくじ](https://www.jinjahoncho.or.jp/omairi/omikuji/)

題材：おみくじの読み方。対象：`v2-manners-expanded-easy-013`、`v2-manners-expanded-easy-014`、`v2-manners-expanded-normal-013`、`v2-manners-expanded-normal-014`、`v2-manners-expanded-hard-007`。

18. [観光庁：温泉のマナー](https://www.mlit.go.jp/tagengo-db/en/H30-00618.html)

題材：共同浴場の使い方。対象：`v2-manners-expanded-easy-015`、`v2-manners-expanded-easy-016`、`v2-manners-expanded-normal-015`、`v2-manners-expanded-normal-016`。

19. [日本政府観光局：温泉を楽しむためのマナー](https://www.japan.travel/ko/guide/how-to-best-enjoy-onsen/)

題材：共同浴場の使い方。対象：`v2-manners-expanded-hard-008`。

20. [観光庁：旅館の疑問に答えます](https://www.mlit.go.jp/kankocho/ryokan/list_en.html)

題材：旅館の滞在プラン。対象：`v2-manners-expanded-easy-017`、`v2-manners-expanded-easy-018`、`v2-manners-expanded-normal-017`、`v2-manners-expanded-normal-018`、`v2-manners-expanded-hard-009`。

21. [日本旅館協会：旅館の用語案内](https://www.ryokan.or.jp/past/english/pdf/glossary_of_terms.pdf)

題材：和室で見かけるもの。対象：`v2-manners-expanded-easy-019`、`v2-manners-expanded-easy-020`、`v2-manners-expanded-normal-019`、`v2-manners-expanded-normal-020`、`v2-manners-expanded-hard-010`。

22. [日本政府観光局：旅館ガイド・浴衣](https://www.japan.travel/en/guide/japanese-ryokan/)

題材：和の衣服と小物。対象：`v2-manners-expanded-easy-021`、`v2-manners-expanded-easy-022`、`v2-manners-expanded-normal-021`、`v2-manners-expanded-normal-022`。

23. [アトリエはるか：浴衣の襟の重ね方](https://www.haruka.co.jp/special/yukata-front/)

題材：和の衣服と小物。対象：`v2-manners-expanded-hard-011`。

24. [三越伊勢丹：弔事のしきたり](https://www.mistore.jp/gifts/choji/about)

題材：弔事での案内と返礼。対象：`v2-manners-expanded-easy-023`、`v2-manners-expanded-easy-024`、`v2-manners-expanded-normal-024`。

25. [三越伊勢丹：偲ぶ会・無宗教式の案内](https://www.mistore.jp/miguide/manner/chouji/index04.html)

題材：弔事での案内と返礼。対象：`v2-manners-expanded-normal-023`、`v2-manners-expanded-hard-012`。

26. [東京都立図書館：蔵書検索の使い方](https://catalog.library.metro.tokyo.lg.jp/winj/help.html)

題材：図書館で資料を探す。対象：`v2-public-expanded-easy-001`、`v2-public-expanded-easy-002`、`v2-public-expanded-normal-002`、`v2-public-expanded-hard-001`。

27. [東京都立図書館：やさしい日本語の利用案内](https://www.library.metro.tokyo.lg.jp/guide/top_page/)

題材：図書館で資料を探す。対象：`v2-public-expanded-normal-001`。

28. [東京都立図書館：調べもの相談](https://www.library.metro.tokyo.lg.jp/search/service/reference/)

題材：図書館の調べもの支援。対象：`v2-public-expanded-easy-003`、`v2-public-expanded-easy-004`、`v2-public-expanded-normal-003`、`v2-public-expanded-normal-004`。

29. [東京都立図書館：よくある質問](https://www.library.metro.tokyo.lg.jp/guide/qa/index.html)

題材：図書館の調べもの支援。対象：`v2-public-expanded-hard-002`。

30. [東京国立博物館：お客様へのお願い](https://www.tnm.jp/modules/r_free_page/?id=127&lang=ja)

題材：博物館での鑑賞。対象：`v2-public-expanded-easy-005`、`v2-public-expanded-easy-006`、`v2-public-expanded-normal-005`、`v2-public-expanded-normal-006`、`v2-public-expanded-hard-003`。

31. [日本郵便：サービス案内](https://www.post.japanpost.jp/service/)

題材：郵便の付加サービス。対象：`v2-public-expanded-easy-007`、`v2-public-expanded-easy-008`。

32. [日本郵便：内容証明](https://www.post.japanpost.jp/service/send/domestic/option/syomei/)

題材：郵便の付加サービス。対象：`v2-public-expanded-normal-007`。

33. [日本郵便：内容証明と配達の証明](https://www.post.japanpost.jp/question/664.html)

題材：郵便の付加サービス。対象：`v2-public-expanded-normal-008`。

34. [日本郵便：書き損じはがき・切手の交換](https://www.post.japanpost.jp/service/send/domestic/mail/postcard/exchange.html)

題材：郵便の付加サービス。対象：`v2-public-expanded-hard-004`。

35. [日本郵便：郵便局の窓口での受取](https://www.post.japanpost.jp/question/690.html)

題材：郵便物を受け取る。対象：`v2-public-expanded-easy-009`、`v2-public-expanded-easy-010`、`v2-public-expanded-normal-009`。

36. [日本郵便：長期間不在の場合](https://www.post.japanpost.jp/question/115.html)

題材：郵便物を受け取る。対象：`v2-public-expanded-normal-010`、`v2-public-expanded-hard-005`。

37. [JR東日本：振替輸送の案内](https://www.jreast.co.jp/saferelief/operationguide/transport_disorder.html)

題材：電車が止まったとき。対象：`v2-public-expanded-easy-011`、`v2-public-expanded-easy-012`、`v2-public-expanded-normal-011`、`v2-public-expanded-normal-012`、`v2-public-expanded-hard-006`。

38. [JR東日本：途中下車](https://jreastfaq.jreast.co.jp/faq/show/1111?site_domain=default)

題材：駅と乗車券の区別。対象：`v2-public-expanded-easy-013`、`v2-public-expanded-normal-014`、`v2-public-expanded-hard-007`。

39. [JR東日本：入場券の効力](https://www.jreast.co.jp/ryokaku/02_hen/08_syo/01_setsu/02.html)

題材：駅と乗車券の区別。対象：`v2-public-expanded-easy-014`、`v2-public-expanded-normal-013`。

40. [ANA：空港での搭乗手続き](https://www.ana.co.jp/ja/jp/guide/boarding-procedures/checkin/domestic/flow_airport/)

題材：空港で搭乗するまで。対象：`v2-public-expanded-easy-015`、`v2-public-expanded-easy-016`、`v2-public-expanded-normal-015`、`v2-public-expanded-hard-008`。

41. [ANA：コードシェア便のオンラインチェックイン](https://www.ana.co.jp/ja/jp/guide/boarding-procedures/checkin/online-checkin/)

題材：空港で搭乗するまで。対象：`v2-public-expanded-normal-016`。

42. [ANA：電池・モバイルバッテリーの持込み](https://www.ana.co.jp/ja/jp/guide/boarding-procedures/baggage/domestic/caution-restriction03/)

題材：飛行機の手荷物。対象：`v2-public-expanded-easy-017`、`v2-public-expanded-normal-017`、`v2-public-expanded-normal-018`。

43. [ANA：手荷物タグ発行機の利用手順](https://www.ana.co.jp/ja/jp/guide/boarding-procedures/baggage/domestic/baggagetagkiosk/)

題材：飛行機の手荷物。対象：`v2-public-expanded-easy-018`。

44. [ANA：機内持込み手荷物の収納](https://www.ana.co.jp/ja/jp/guide/boarding-procedures/baggage/domestic/carry-rule/)

題材：飛行機の手荷物。対象：`v2-public-expanded-hard-009`。

45. [国土交通省：バリアフリーのサイン](https://www.mlit.go.jp/tetudo/content/001333220.pdf)

題材：公共交通の利用支援。対象：`v2-public-expanded-easy-019`、`v2-public-expanded-easy-020`、`v2-public-expanded-normal-020`。

46. [国土交通省：ベビーカーマーク](https://www.mlit.go.jp/sogoseisaku/barrierfree/sosei_barrierfree_tk_000091.html)

題材：公共交通の利用支援。対象：`v2-public-expanded-normal-019`。

47. [国土交通省：ベビーカー利用の案内](https://www.mlit.go.jp/common/001032829.pdf)

題材：公共交通の利用支援。対象：`v2-public-expanded-hard-010`。

48. [環境省：国立公園の利用上のマナー](https://www.env.go.jp/nature/nationalparks/about/manner/)

題材：自然公園の利用。対象：`v2-public-expanded-easy-021`、`v2-public-expanded-easy-022`、`v2-public-expanded-normal-021`、`v2-public-expanded-normal-022`、`v2-public-expanded-hard-011`。

49. [日本バス協会：バスの種類](https://www.bus.or.jp/search/)

題材：身近なバスの種類。対象：`v2-public-expanded-easy-023`、`v2-public-expanded-easy-024`、`v2-public-expanded-hard-012`。

50. [国土交通省：ノンステップバス](https://www.mlit.go.jp/jidosha/anzen/01transit/nonstepbus.html)

題材：身近なバスの種類。対象：`v2-public-expanded-normal-023`。

51. [国土交通省関東運輸局：バリアフリー用語集](https://wwwtb.mlit.go.jp/kanto/koutuu_seisaku/barrier_free/yougokaisetu.html)

題材：身近なバスの種類。対象：`v2-public-expanded-normal-024`。

52. [映倫：映画審査規程](https://www.eirin.jp/img/classification.pdf)

題材：映画の年齢区分。対象：`v2-culture-expanded-easy-001`、`v2-culture-expanded-easy-002`、`v2-culture-expanded-normal-001`、`v2-culture-expanded-normal-002`、`v2-culture-expanded-hard-001`。

53. [日本芸術文化振興会：落語の表現](https://www2.ntj.jac.go.jp/dglib/contents/learn/edc20/geino/rakugo/tokucyo4.html)

題材：身近な伝統芸能。対象：`v2-culture-expanded-easy-003`、`v2-culture-expanded-hard-002`。

54. [松竹・歌舞伎美人：花道](https://www.kabuki-bito.jp/special/knowledge/todaysword/post-todaysword-post-139/)

題材：身近な伝統芸能。対象：`v2-culture-expanded-easy-004`。

55. [松竹・歌舞伎美人：衣裳と化粧](https://www.kabuki-bito.jp/lets-kabuki/costume/)

題材：身近な伝統芸能。対象：`v2-culture-expanded-normal-003`。

56. [日本芸術文化振興会：狂言はやわかり](https://www2.ntj.jac.go.jp/dglib/contents/learn/edc12/hayawakari/index.html)

題材：身近な伝統芸能。対象：`v2-culture-expanded-normal-004`。

57. [新国立劇場：オペラってなに？](https://www.nntt.jac.go.jp/opera/h24highschool/whatsopera.html)

題材：歌と劇の舞台。対象：`v2-culture-expanded-easy-005`、`v2-culture-expanded-easy-006`、`v2-culture-expanded-normal-005`、`v2-culture-expanded-normal-006`。

58. [新国立劇場：開演に遅れた場合の案内](https://www.nntt.jac.go.jp/faq/index.html)

題材：歌と劇の舞台。対象：`v2-culture-expanded-hard-003`。

59. [ヤマハ：楽器のパーツを知ろう](https://www.yamaha.com/ja/musical_instrument_guide/feature/parts/)

題材：よく見かける楽器。対象：`v2-culture-expanded-easy-007`、`v2-culture-expanded-easy-008`、`v2-culture-expanded-normal-008`、`v2-culture-expanded-hard-004`。

60. [ヤマハ：トランペット](https://www.yamaha.com/ja/musical_instrument_guide/trumpet/)

題材：よく見かける楽器。対象：`v2-culture-expanded-normal-007`。

61. [ヤマハ：エレクトーン用語辞典](https://jp.yamaha.com/products/contents/keyboards/electone_station/oyakudachi/dictionary/index.html)

題材：曲を聴くときの言葉。対象：`v2-culture-expanded-easy-009`、`v2-culture-expanded-easy-010`、`v2-culture-expanded-normal-009`、`v2-culture-expanded-hard-005`。

62. [ヤマハ：無伴奏（アカペラ）コーラス・セレクション](https://www.ymm.co.jp/p/detail.php?code=GTC01084738)

題材：曲を聴くときの言葉。対象：`v2-culture-expanded-normal-010`。

63. [B.LEAGUE：ゲームルール解説](https://www.bleague.jp/basketball_rule/)

題材：バスケットボール観戦。対象：`v2-culture-expanded-easy-011`、`v2-culture-expanded-easy-012`、`v2-culture-expanded-normal-011`、`v2-culture-expanded-normal-012`、`v2-culture-expanded-hard-006`。

64. [日本卓球協会：卓球用語集](https://jtta.or.jp/glossary-category)

題材：卓球の基本。対象：`v2-culture-expanded-easy-013`、`v2-culture-expanded-easy-014`、`v2-culture-expanded-normal-013`、`v2-culture-expanded-normal-014`、`v2-culture-expanded-hard-007`。

65. [日本バドミントン協会：競技規則2026](https://www.badminton.or.jp/asset/pdf/corporate/concerned/referee/baj_rulebook_2026_rules.pdf)

題材：バドミントンの基本。対象：`v2-culture-expanded-easy-015`、`v2-culture-expanded-easy-016`、`v2-culture-expanded-normal-015`、`v2-culture-expanded-normal-016`、`v2-culture-expanded-hard-008`。

66. [日本水泳連盟：競泳](https://aquatics.or.jp/swim/)

題材：水泳の観戦。対象：`v2-culture-expanded-easy-017`、`v2-culture-expanded-easy-018`、`v2-culture-expanded-normal-017`、`v2-culture-expanded-normal-018`、`v2-culture-expanded-hard-009`。

67. [小学館・デジタル大辞泉：生憎（コトバンク掲載）](https://kotobank.jp/word/生憎-421700)

題材：日常の気持ちを表す言葉。対象：`v2-culture-expanded-easy-019`。

68. [小学館・デジタル大辞泉：口が堅い（コトバンク掲載）](https://kotobank.jp/word/口が堅い-483908)

題材：日常の気持ちを表す言葉。対象：`v2-culture-expanded-easy-020`。

69. [文化庁：おもむろに動く様子は急か](https://www.bunka.go.jp/prmagazine/rensai/kotoba/kotoba_014.html)

題材：日常の気持ちを表す言葉。対象：`v2-culture-expanded-normal-019`。

70. [文化庁：やぶさかでない](https://www.bunka.go.jp/prmagazine/rensai/kotoba/kotoba_007.html)

題材：日常の気持ちを表す言葉。対象：`v2-culture-expanded-normal-020`。

71. [文化庁：他山の石の意味](https://www.bunka.go.jp/tokei_hakusho_shuppan/tokeichosa/kokugo_yoronchosa/pdf/92701201_06.pdf)

題材：日常の気持ちを表す言葉。対象：`v2-culture-expanded-hard-010`。

72. [小学館・デジタル大辞泉：水に流す（コトバンク掲載）](https://kotobank.jp/word/水に流す-637742)

題材：会話で誤解しやすい表現。対象：`v2-culture-expanded-easy-021`。

73. [文化庁：ことば食堂・気が置けない](https://www.bunka.go.jp/seisaku/kokugo_nihongo/kokugo_shisaku/kotoba_shokudo/pdf/kotoba_5.pdf)

題材：会話で誤解しやすい表現。対象：`v2-culture-expanded-easy-022`。

74. [文化庁：ことば食堂・御の字](https://www.bunka.go.jp/seisaku/kokugo_nihongo/kokugo_shisaku/kotoba_shokudo/pdf/kotoba_13.pdf)

題材：会話で誤解しやすい表現。対象：`v2-culture-expanded-normal-021`。

75. [文化庁：割愛するの意味](https://www.bunka.go.jp/tokei_hakusho_shuppan/tokeichosa/kokugo_yoronchosa/pdf/93872201_01.pdf)

題材：会話で誤解しやすい表現。対象：`v2-culture-expanded-normal-022`。

76. [文化庁：失笑するの意味](https://www.bunka.go.jp/tokei_hakusho_shuppan/tokeichosa/kokugo_yoronchosa/pdf/92701201_08.pdf)

題材：会話で誤解しやすい表現。対象：`v2-culture-expanded-hard-011`。

77. [日本棋院：囲碁の入門](https://archive.nihonkiin.or.jp/howto/htm/this1.htm)

題材：囲碁を楽しむ基本。対象：`v2-culture-expanded-easy-023`、`v2-culture-expanded-easy-024`。

78. [日本棋院：対局のルール・流れ](https://www.nihonkiin.or.jp/teach/lesson/school/start.html)

題材：囲碁を楽しむ基本。対象：`v2-culture-expanded-normal-023`。

79. [日本棋院：囲碁の勝負の付け方](https://www.nihonkiin.or.jp/teach/lesson/school/syoubu.html)

題材：囲碁を楽しむ基本。対象：`v2-culture-expanded-normal-024`。

80. [日本棋院：石を囲んで取る](https://archive.nihonkiin.or.jp/lesson/school/kakomu.htm)

題材：囲碁を楽しむ基本。対象：`v2-culture-expanded-hard-012`。

81. [日本郵便：英文レターの書き方・追伸](https://www.post.japanpost.jp/enjoy/culture/howto/navi/e-letter/contents.html)

題材：手紙の構成。対象：`v2-work-expanded-easy-008`。
