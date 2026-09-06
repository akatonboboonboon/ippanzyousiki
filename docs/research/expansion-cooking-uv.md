# 料理の基本・紫外線と外出の追加資料

確認日：2026年9月6日。新規40問。両テーマとも初級8・中級8・上級4で、categoryはhealth。IDは`v2-health-everyday-{cooking|uv}-{easy|normal|hard}-{連番}`。既存2004問は変更しない。

## 重複確認と範囲

`artifacts/current-2004-bank.json`、統合開始後は`artifacts/bank-before-2124.json`を照合。既存の計量スプーン、湯せん、落としぶた、面取り、粗熱、あく取り、ひと煮立ち、野菜の茎と葉の加熱順、にんにくの火加減は除外した。料理の「煮詰める」は既存の比喩表現「議論が煮詰まる」と別の生活上の判断。紫外線に関連する既存のオゾン層の問題も再利用していない。

料理は中火、片栗粉の用途、だしの目的、和える、ふるう、蒸す、水加減、予熱、野菜炒めの味付け、油抜き、昆布だしの仕上げ、みそ汁、ダマの防止、切るように混ぜる、オーブンの差、霜降り、煮詰めると塩味、淡口しょうゆ、フライの衣、かきたま汁を各1論点とした。

紫外線は曇天、体感温度との違い、帽子、衣服、塗るタイミング、春の紫外線、SPF、PA、時間帯、新雪の反射、塗り直し、使用量、サングラスの性能、UVインデックス、遅れて現れる赤み、標高、日陰の散乱光、SPFと時間の混同、サングラスの形、耐水性を扱う。SPFの対象と使用可能時間、サングラスの表示と側面の隙間は別の判断として区別した。反射率・高度差による増加率などの数値暗記問題は作らない。

## 一次資料

| 資料 | 確認した内容 |
| --- | --- |
| [味の素：火加減](https://park.ajinomoto.co.jp/contents/basic/heating/) | 中火の炎と鍋底の関係 |
| [味の素：料理ビギナー研究・野菜炒め](https://story.ajinomoto.co.jp/series/beginner/002.html) | 油をなじませて炒め、調味は仕上げ。塩分を早く加えると水分が出やすい |
| [キッコーマン：かきたま汁](https://www.kikkoman.co.jp/homecook/washoku/071/) | だし、とろみ、昆布を取り出す時点、溶き卵を回し入れて待つ理由 |
| [キッコーマン：ほうれん草の白和え](https://www.kikkoman.co.jp/homecook/washoku/080/) | 食材と和え衣を混ぜる作業 |
| [辻調理師専門学校：ふるう](https://www.tsuji.ac.jp/hp/gihou/seika/maeni/furuu.htm) | 粉ふるい・ざるで粉をほぐし、複数の粉を均一にする。旧クックパッドのリンクが404だったため差し替え |
| [日本惣菜協会：調理の科学](https://www.nsouzai-kyoukai.or.jp/homemealmeister/03-chori/1-shoku31.html) | 蒸す調理は水蒸気の熱を利用 |
| [福井県：家事チャレンジ・料理解答](https://www.pref.fukui.lg.jp/doc/joseikatuyaku/danjyo/kaji-challkakomondai_d/fil/01ryouri_kaitou.pdf) | 「ひたひた」は材料が水から少し出る水加減。出題文・誤答は独自に作成 |
| [日清製粉ウェルナ：トライフル](https://www.nisshin-seifun-welna.com/index/recipe/detail/s-047.html) | 予熱、へらで底から返す混ぜ方、機器による焼け方の差 |
| [キッコーマン：たけのこご飯](https://www.kikkoman.co.jp/homecook/washoku/104/) | 油揚げに熱湯をかける油抜き |
| [マルコメ：おみそ汁豆知識](https://www.marukome.co.jp/recipe/misosoup/trivia/) | みそ汁の香りを生かす仕上げ。温度の細かな数値は出題しない |
| [キッコーマン：みたらし団子](https://www.kikkoman.co.jp/homecook/washoku/097/) | 強いとろみのたれは火を止めて水溶き片栗粉を混ぜ入れ、再加熱する |
| [キッコーマン：煮物上手の基本](https://www.kikkoman.co.jp/enjoys/kcc/recipe/ogino1016.html) | 魚を湯にくぐらせ、水に取り、うろこやぬめりを除く下処理 |
| [キッコーマン：ふきの青煮](https://www.kikkoman.co.jp/homecook/washoku/106/) | 煮汁を煮詰めると味が濃くなる |
| [ヒガシマル醤油：淡口しょうゆQ&A](https://www.higashimaru.co.jp/enjoy/oshiete/index.html) | 淡口の色と塩分の関係。淡口という名称を減塩表示と混同しない |
| [日清オイリオ：カキフライ](https://www.nisshin-oillio.com/kitchen/recipe/vol3.html) | 通常の小麦粉・卵・パン粉を使う衣の順番 |
| [環境省：紫外線環境保健マニュアル2020](https://www.env.go.jp/chemi/matsigaisen2020/matsigaisen2020.pdf) | 本文p.3〜6の赤み・反射・標高、p.30〜36の服装・日陰・サングラス・SPF/PA・耐水性・使用量・塗り直し。環境省の現行健康パンフレット一覧に掲載されている版を確認 |
| [気象庁：雲と紫外線](https://www.jma.go.jp/jma/kishou/know/env/uvhp/3-73uvindex_mini.html) | 曇天でも紫外線が到達 |
| [気象庁：太陽高度と紫外線](https://www.jma.go.jp/jma/kishou/know/env/uvhp/3-71uvindex_mini.html) | 冬から夏へ向かう紫外線の変化、夏前にも強まる |
| [気象庁：紫外線の性質](https://www.jma.go.jp/jma/kishou/know/env/uvhp/3-70uvindex_mini.html) | 昼頃の紫外線、太陽高度・標高と大気の通過距離 |
| [気象庁：紫外線情報の解説](https://www.jma.go.jp/jma/kishou/know/env/uvhp/3-55uvindex_info.html) | UVインデックスが示すものと、天気を考慮した情報 |

## 表現上の条件と確認

日焼け止めの効果は使用量・摩擦・汗などで変わるため、SPFを安全に過ごせる時間として扱わない。耐水性を塗り直し不要とはしない。衣服は暑さも考慮し、季節・時刻・標高の説明は一般的な傾向とする。医学上の診断や個別の治療指示は出題しない。

全40問に異なる4択、説明、出典を設定。正解位置は各テーマで4位置に各5問。単独TypeScript型検査が成功し、40件・難易度配分・ID一意・旧2004問との同一問題文なしを確認。20種類の出典URLをHTTP取得確認し、差し替えた辻調のページも本文まで確認した。
