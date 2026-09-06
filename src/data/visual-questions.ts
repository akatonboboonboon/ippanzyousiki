import type { Question } from "./types";

// Original local diagrams. Two medium questions per genre support the standard diagnostic.
export const visualQuestions: Question[] = [
  {
    id: "v2-household-visual-001",
    category: "household",
    difficulty: "normal",
    topic: "洗濯表示",
    prompt: "衣類のタグにある図の洗濯表示。この表示で禁止されていることは？",
    choices: [
      "家庭で水洗いすること",
      "タンブル乾燥機で乾燥すること",
      "アイロンをかけること",
      "漂白剤を使うこと",
    ],
    answer: 1,
    explanation:
      "四角の中の円はタンブル乾燥を表し、重ねた×印は禁止を表します。水洗い・漂白・アイロンの可否は、それぞれ別の記号で確かめます。",
    image: {
      src: "quiz/vq-01.svg",
      alt: "衣類タグの拡大図。黒い正方形の中に、その辺に接する円があり、正方形全体に対角線2本の×印が重なっている。",
      caption: "この問題のために作成した模式図です。",
    },
    source: {
      label: "消費者庁｜洗濯表示（令和6年8月20日以降）",
      url: "https://www.caa.go.jp/policies/policy/representation/household_goods/guide/wash_02.html",
    },
  },
  {
    id: "v2-household-visual-002",
    category: "household",
    difficulty: "normal",
    topic: "洗濯表示",
    prompt: "図の洗濯表示が付いた衣類に、表示上使える漂白剤は？",
    choices: [
      "塩素系だけ",
      "塩素系・酸素系の両方",
      "酸素系だけ",
      "どちらも使えない",
    ],
    answer: 2,
    explanation:
      "三角の中に斜線が2本ある表示は、酸素系漂白剤が使え、塩素系漂白剤は使えないことを示します。製品の使用方法や衣類の付記も確認します。",
    image: {
      src: "quiz/vq-02.svg",
      alt: "白いタグに黒い三角形。その内側に、左下から右上へ向かう平行な斜線が2本ある。",
      caption: "この問題のために作成した模式図です。",
    },
    source: {
      label: "消費者庁｜洗濯表示（令和6年8月20日以降）",
      url: "https://www.caa.go.jp/policies/policy/representation/household_goods/guide/wash_02.html",
    },
  },
  {
    id: "v2-health-visual-001",
    category: "health",
    difficulty: "normal",
    topic: "調理の計量",
    prompt: "図は水平な台に置いた計量カップを真横から見たもの。この水の量は？",
    choices: ["125 mL", "150 mL", "175 mL", "200 mL"],
    answer: 1,
    explanation:
      "100 mLと200 mLの間は4等分されており、1目盛りは25 mLです。水面はその中央なので150 mL。これは架空の計量図で、実物でも平らな場所に置き、目の高さを合わせて読みます。",
    image: {
      src: "quiz/vq-03.svg",
      alt: "計量カップの目盛りは下から0、100、200 mL。100と200の間には等間隔の短い目盛りが3本あり、水面はその中央の目盛りに合っている。",
      caption: "この問題のために作成した模式図です。",
    },
    source: {
      label: "味の素｜計量・計り方（図と数値は本アプリの例）",
      url: "https://park.ajinomoto.co.jp/contents/basic/chomiryo/",
    },
  },
  {
    id: "v2-health-visual-002",
    category: "health",
    difficulty: "normal",
    topic: "野菜の切り方",
    prompt: "図のように大根を切る方法を、一般に何という？",
    choices: ["輪切り", "いちょう切り", "短冊切り", "半月切り"],
    answer: 3,
    explanation:
      "丸い断面を半分にした形に切るのが半月切りです。図は輪切りを半分にする手順。さらに半分にするといちょう切りになります。",
    image: {
      src: "quiz/vq-04.svg",
      alt: "左に丸い大根の輪切りがあり、中央を縦に切る線。右には、切り口が半円になった2枚の薄い切片が離して置かれている。",
      caption: "この問題のために作成した模式図です。",
    },
    source: {
      label: "味の素｜半月切り",
      url: "https://park.ajinomoto.co.jp/contents/basic/vege_cutting/hangetugiri/",
    },
  },
  {
    id: "v2-money-visual-001",
    category: "money",
    difficulty: "normal",
    topic: "家計管理",
    prompt: "図の家計で、今月の収入から支出をすべて引いた残りはいくら？",
    choices: ["1万円", "2万円", "3万円", "4万円"],
    answer: 2,
    explanation:
      "架空の家計表です。支出は6＋3＋1＋2＝12万円。収入15万円から引くと3万円が残ります。図の「その他」も支出に含めて計算します。",
    image: {
      src: "quiz/vq-05.svg",
      alt: "今月の収入15万円。支出の横棒は家賃6万円、食費3万円、通信1万円、その他2万円。図にない支出はない。",
      caption: "この問題のために作成した模式図です。",
    },
    source: {
      label: "本アプリ｜架空の図解と計算条件",
      url: "https://github.com/akatonboboonboon/ippanzyousiki/blob/codex/build-quiz-app/docs/research/visual-questions.md",
    },
  },
  {
    id: "v2-money-visual-002",
    category: "money",
    difficulty: "normal",
    topic: "買い物の計算",
    prompt: "図の値引きを受けて2,000円を現金で渡した。おつりはいくら？",
    choices: ["350円", "500円", "650円", "850円"],
    answer: 2,
    explanation:
      "架空の価格表示です。1,500円の10％は150円なので、支払額は1,350円。2,000－1,350＝650円がおつりです。税込価格を基にした値引きと指定しています。",
    image: {
      src: "quiz/vq-06.svg",
      alt: "値札に税込1,500円、その横に「税込価格から10％引き」。下の現金支払い欄には「お預かり2,000円」。追加料金なし。",
      caption: "この問題のために作成した模式図です。",
    },
    source: {
      label: "本アプリ｜架空の図解と計算条件",
      url: "https://github.com/akatonboboonboon/ippanzyousiki/blob/codex/build-quiz-app/docs/research/visual-questions.md",
    },
  },
  {
    id: "v2-consumer-visual-001",
    category: "consumer",
    difficulty: "normal",
    topic: "価格の比較",
    prompt: "同じ中身の商品を価格だけで比べる。100 g当たりの単価が安いのは？",
    choices: [
      "A：100 g当たり79.6円",
      "B：100 g当たり76円",
      "A：100 g当たり39.8円",
      "B：100 g当たり57円",
    ],
    answer: 1,
    explanation:
      "架空の商品です。Aは398÷500×100＝79.6円、Bは570÷750×100＝76円。容量の違う商品は、同じ量にそろえると比較できます。",
    image: {
      src: "quiz/vq-07.svg",
      alt: "同じ商品の2袋。Aは500 g入り398円、Bは750 g入り570円。どちらも税込、品質は同じ。",
      caption: "この問題のために作成した模式図です。",
    },
    source: {
      label: "本アプリ｜架空の図解と計算条件",
      url: "https://github.com/akatonboboonboon/ippanzyousiki/blob/codex/build-quiz-app/docs/research/visual-questions.md",
    },
  },
  {
    id: "v2-consumer-visual-002",
    category: "consumer",
    difficulty: "normal",
    topic: "定期購入",
    prompt: "図の条件で契約し、必要な3回分だけ受け取ると、支払総額はいくら？",
    choices: ["980円", "3,460円", "5,940円", "7,440円"],
    answer: 2,
    explanation:
      "架空の定期購入条件です。980＋2,480＋2,480＝5,940円です。実際の注文でも、初回だけでなく回数・各回の代金・総額・解約条件を最終確認画面で確認します。",
    image: {
      src: "quiz/vq-08.svg",
      alt: "注文条件の図。最低3回の受け取り。1回目980円、2回目2,480円、3回目2,480円。税込・送料0円・その他の費用0円。",
      caption: "この問題のために作成した模式図です。",
    },
    source: {
      label: "消費者庁｜通信販売広告Q＆A（図の契約・数値は架空）",
      url: "https://www.no-trouble.caa.go.jp/qa/advertising.html",
    },
  },
  {
    id: "v2-work-visual-001",
    category: "work",
    difficulty: "normal",
    topic: "予定の調整",
    prompt:
      "図の2人が、予定を変えずに30分の打ち合わせを始められる最も早い時刻は？",
    choices: ["9時30分", "10時00分", "10時30分", "11時00分"],
    answer: 2,
    explanation:
      "架空の予定表です。Aさんは10時から空いていますが、Bさんの予定は10時30分まで続きます。2人とも空く最初の30分は10時30分～11時です。移動・準備時間は不要という条件です。",
    image: {
      src: "quiz/vq-09.svg",
      alt: "9時から12時までの予定表。Aさんは9時～10時が予定あり、Bさんは9時30分～10時30分が予定あり。それ以外は空き。移動・準備時間は不要。",
      caption: "この問題のために作成した模式図です。",
    },
    source: {
      label: "本アプリ｜架空の図解と計算条件",
      url: "https://github.com/akatonboboonboon/ippanzyousiki/blob/codex/build-quiz-app/docs/research/visual-questions.md",
    },
  },
  {
    id: "v2-work-visual-002",
    category: "work",
    difficulty: "normal",
    topic: "予定の調整",
    prompt: "会合の案内に「第2水曜日」とある。図の月では何日？",
    choices: ["8日", "10日", "14日", "15日"],
    answer: 0,
    explanation:
      "架空の月のカレンダーです。水曜日は1日・8日・15日・22日・29日。2回目の水曜日は8日です。「第2週の水曜日」と同じとは限らないため、曜日の回数で確かめます。",
    image: {
      src: "quiz/vq-10.svg",
      alt: "日曜始まりの月間カレンダー。1日は水曜日、2日は木曜日、3日は金曜日、4日は土曜日。その後1日ずつ増え、30日は木曜日。",
      caption: "この問題のために作成した模式図です。",
    },
    source: {
      label: "本アプリ｜架空の図解と計算条件",
      url: "https://github.com/akatonboboonboon/ippanzyousiki/blob/codex/build-quiz-app/docs/research/visual-questions.md",
    },
  },
  {
    id: "v2-manners-visual-001",
    category: "manners",
    difficulty: "normal",
    topic: "食事の慣習",
    prompt: "和食の基本的な配膳で、ご飯茶碗を置く位置は図のどこ？",
    choices: ["図のA", "図のB", "図のC", "図のD"],
    answer: 0,
    explanation:
      "基本の和食の配膳では、食べる人から見て手前左にご飯、手前右に汁物を置きます。図ではAです。食べやすさの調整や地域・店による配置の違いもあります。",
    image: {
      src: "quiz/vq-11.svg",
      alt: "食卓を真上から見た図。食べる人は図の下側に座る。手前左がA、手前右がB、奥左がC、奥右がD。手前の箸は横向き。",
      caption: "この問題のために作成した模式図です。",
    },
    source: {
      label: "農林水産省｜和食の「型」と献立づくり",
      url: "https://www.maff.go.jp/j/keikaku/syokubunka/oishiiwashoku/article/16/",
    },
  },
  {
    id: "v2-manners-visual-002",
    category: "manners",
    difficulty: "normal",
    topic: "贈答の慣習",
    prompt: "図のような紅白の水引の結び方を使う場面として、一般的なのは？",
    choices: ["結婚祝い", "快気祝い", "入学祝い", "葬儀の香典"],
    answer: 2,
    explanation:
      "図はほどいて結び直せる蝶結び（花結び）です。入学など繰り返し喜ばしいお祝いに用います。結婚や快気祝いでは一般に結び切りなどを選び、弔事では色や形式も異なります。",
    image: {
      src: "quiz/vq-12.svg",
      alt: "白いかけ紙に、左が白・右が赤の水引。中央の結び目の左右に輪が1つずつあり、両端は下へ垂れている。",
      caption: "この問題のために作成した模式図です。",
    },
    source: {
      label: "三越伊勢丹｜水引の種類と使い分け",
      url: "https://www.mistore.jp/gifts/knowledge/mizuhiki/",
    },
  },
  {
    id: "v2-public-visual-001",
    category: "public",
    difficulty: "normal",
    topic: "道路標識",
    prompt:
      "図の標識がある側から、自転車に乗ったままその道路へ入ってよい？ 補助標識はないものとする。",
    choices: [
      "自転車は入れない",
      "自転車ならいつでも入れる",
      "歩行者がいなければ入れる",
      "一度止まれば入れる",
    ],
    answer: 0,
    explanation:
      "赤い円の中に白い横棒があるのは「車両進入禁止」です。自転車も車両なので、除外する補助標識がないこの条件では、その側から乗ったまま進入できません。",
    image: {
      src: "quiz/vq-13.svg",
      alt: "支柱の上に赤い円形の道路標識。その中央を太い白い横棒が水平に横切っている。文字や補助標識はない。",
      caption: "この問題のために作成した模式図です。",
    },
    source: {
      label: "警察庁｜交通の方法に関する教則（標識）",
      url: "https://www.npa.go.jp/bureau/traffic/20241101kyousoku.pdf",
    },
  },
  {
    id: "v2-public-visual-002",
    category: "public",
    difficulty: "normal",
    topic: "道路標識",
    prompt: "自転車で図の標識に近づいた。停止線がある場合、どうする？",
    choices: [
      "左右が見えれば減速して通過する",
      "停止線を越えてから一時停止する",
      "停止線の直前で一時停止し、安全を確かめる",
      "車が来ているときだけ停止する",
    ],
    answer: 2,
    explanation:
      "「止まれ」の一時停止標識は自転車にも適用されます。停止線があれば、その直前でいったん完全に止まり、安全を確認して進みます。",
    image: {
      src: "quiz/vq-14.svg",
      alt: "白い縁のある赤い逆三角形の標識に「止まれ」「STOP」。その手前の道路に白い停止線がある。",
      caption: "この問題のために作成した模式図です。",
    },
    source: {
      label: "警察庁｜自転車の交通ルール",
      url: "https://www.npa.go.jp/bureau/traffic/bicycle/portal/rule.html",
    },
  },
  {
    id: "v2-safety-visual-001",
    category: "safety",
    difficulty: "normal",
    topic: "救命の備え",
    prompt: "図の「AED」が示す機器は、何をするためのもの？",
    choices: [
      "血圧を自動測定する",
      "心臓の電気的な状態を解析し、必要なら電気ショックを行う",
      "血液中の酸素の割合を測る",
      "胸を機械で押し続ける",
    ],
    answer: 1,
    explanation:
      "AEDは心電図を解析し、電気ショックが必要か判断する機器です。必要時には音声などの指示に従います。反応がない人を見つけたら119番通報とAEDの手配を頼み、普段どおりの呼吸がなければ胸骨圧迫を始めます。",
    image: {
      src: "quiz/vq-15.svg",
      alt: "赤いハートに白い稲妻が重なるマーク。その下に大きくAEDと記されている。",
      caption: "この問題のために作成した模式図です。",
    },
    source: {
      label: "消防庁｜応急手当WEB講習",
      url: "https://www.fdma.go.jp/relocation/kyukyukikaku/oukyu/01futsu/08test/01_08_01.html",
    },
  },
  {
    id: "v2-safety-visual-002",
    category: "safety",
    difficulty: "normal",
    topic: "消火器の使い方",
    prompt:
      "消火器を安全に使える位置まで運んだ。図の各部を扱う一般的な順序は？",
    choices: [
      "Cを握る → Aを抜く → Bを向ける",
      "Bを向ける → Cを握る → Aを抜く",
      "Aを抜く → Bを火元に向ける → Cを握る",
      "Aを抜く → Cを握る → Bを向ける",
    ],
    answer: 2,
    explanation:
      "一般的な消火器は、安全ピンを抜き、ホースの先を火元に向け、レバーを握ります。図ではA→B→Cです。119番通報・周囲への知らせ・退路の確保も必要で、炎や煙で危険を感じたら避難を優先します。",
    image: {
      src: "quiz/vq-16.svg",
      alt: "消火器の模式図。Aは上部の輪付きピン、Bは右へ伸びたホースの先端、Cは上部の握るレバーを指している。",
      caption: "この問題のために作成した模式図です。",
    },
    source: {
      label: "東京消防庁｜消火器の使い方",
      url: "https://www.tfd.metro.tokyo.lg.jp/content/000064133.pdf",
    },
  },
  {
    id: "v2-digital-visual-001",
    category: "digital",
    difficulty: "normal",
    topic: "スマホの表示",
    prompt: "一般的なスマートフォンで、機内モードを表す図形はどれ？",
    choices: ["図のA", "図のB", "図のC", "図のD"],
    answer: 2,
    explanation:
      "一般に飛行機の図形が機内モードを表し、この図ではCです。Wi-FiやBluetoothを別途使える機種もあるため、実際の通信状態は個別の設定で確認します。",
    image: {
      src: "quiz/vq-17.svg",
      alt: "4つのアイコン。Aは扇状の弧3本と下の点、Bは縦線と左右に交差した角のある線、Cは主翼と尾翼のある飛行機の上面形、Dは輪郭線で描かれた釣り鐘。各図の下にA～D。",
      caption: "この問題のために作成した模式図です。",
    },
    source: {
      label: "Apple｜機内モードを使う",
      url: "https://support.apple.com/ja-jp/108785",
    },
  },
  {
    id: "v2-digital-visual-002",
    category: "digital",
    difficulty: "normal",
    topic: "共有と公開範囲",
    prompt: "図の共有画面で「リンクを送った2人だけが見られる」と考えてよい？",
    choices: [
      "よい。送信した相手だけに権限が付く",
      "よい。閲覧者なら他の人には開けない",
      "よくない。リンクを入手した他の人も開ける設定",
      "よくない。所有者以外は誰も開けない設定",
    ],
    answer: 2,
    explanation:
      "この模式図は「リンクを知っている全員」を閲覧者にする設定です。リンクが別の人に渡れば、その人も開けます。特定の2人に限るには制限付きにして、その人たちを指定します。サービスや組織の設定にも従います。",
    image: {
      src: "quiz/vq-18.svg",
      alt: "ファイルの共有設定画面。一般的なアクセスは「リンクを知っている全員」、権限は「閲覧者」。下には「リンクをコピー」ボタン。",
      caption: "この問題のために作成した模式図です。",
    },
    source: {
      label: "Google｜ドライブのファイルを共有する（画面は模式図）",
      url: "https://support.google.com/drive/answer/2494822?co=GENIE.Platform%3DDesktop&hl=ja",
    },
  },
  {
    id: "v2-civic-visual-001",
    category: "civic",
    difficulty: "normal",
    topic: "選挙の基本",
    prompt: "衆議院選挙の図で、Bの投票用紙に記入するものは？",
    choices: [
      "候補者個人の氏名",
      "投票者自身の氏名",
      "支持する政党等の名称・略称",
      "支持する候補者の番号",
    ],
    answer: 2,
    explanation:
      "衆議院選挙の小選挙区は候補者名、比例代表は政党等の名称・略称を書きます。Bは比例代表の用紙です。参議院の比例代表とは記入方法が異なるため、現地の案内も確認します。図は実際の投票用紙の色や形式を再現したものではありません。",
    image: {
      src: "quiz/vq-19.svg",
      alt: "衆議院議員選挙の説明図。Aの紙には「小選挙区」、Bの紙には「比例代表」。どちらにも空白の記入欄がある。",
      caption: "この問題のために作成した模式図です。",
    },
    source: {
      label: "大阪市選挙管理委員会｜投票方法",
      url: "https://www.city.osaka.lg.jp/senkyo/page/0000001280.html",
    },
  },
  {
    id: "v2-civic-visual-002",
    category: "civic",
    difficulty: "normal",
    topic: "住民票と届出",
    prompt:
      "図の3人が同じ世帯で暮らしている。住民票で「はる」の世帯主との続柄は？",
    choices: ["母", "孫", "子", "世帯主"],
    answer: 2,
    explanation:
      "架空の家族関係図です。住民票の続柄は世帯主を中心に表します。はるは世帯主・あきの子なので「子」です。年齢の高いゆきが世帯主だと決めつけないようにします。",
    image: {
      src: "quiz/vq-20.svg",
      alt: "3人は同じ世帯。上から「ゆき」「あき（世帯主）」「はる」が線でつながる。ゆきはあきの母。あきははるの親。",
      caption: "この問題のために作成した模式図です。",
    },
    source: {
      label: "葛飾区｜住民票の続柄とは",
      url: "https://www.city.katsushika.lg.jp/faq/1030270/1007654/1007705/1007845.html",
    },
  },
  {
    id: "v2-culture-visual-001",
    category: "culture",
    difficulty: "normal",
    topic: "身近な音楽",
    prompt: "図の★が付いたピアノの白鍵の音は？",
    choices: ["ド", "レ", "ミ", "ファ"],
    answer: 0,
    explanation:
      "2つ並ぶ黒鍵のすぐ左にある白鍵が「ド」です。鍵盤は左から右へ音が高くなります。図では★の右上に2つの黒鍵が並んでいます。",
    image: {
      src: "quiz/vq-21.svg",
      alt: "白鍵が横に8つ並び、黒鍵は左から2つのまとまり、間を空けて3つのまとまり。★は2つ組の黒鍵のすぐ左側の白鍵に付いている。左が低い音、右が高い音。",
      caption: "この問題のために作成した模式図です。",
    },
    source: {
      label: "ヤマハ｜ピアノの弾き方・音を出してみよう",
      url: "https://www.yamaha.com/ja/musical_instrument_guide/piano/play/",
    },
  },
  {
    id: "v2-culture-visual-002",
    category: "culture",
    difficulty: "normal",
    topic: "スポーツ観戦",
    prompt:
      "サッカーを真上から見た図。ラインを越えたことでボールがアウトになるのは、A・B・Cのどれ？ 他にプレーを止める理由はないものとする。",
    choices: ["Aから", "Bから", "Cから", "BとCはどちらもまだインプレー"],
    answer: 2,
    explanation:
      "ボールの全体がタッチラインの外側を完全に越えるとアウトです。Aはライン内側、Bは一部がラインに重なり、Cだけが完全に外へ出ています。地上でも空中でも同じ判定です。",
    image: {
      src: "quiz/vq-22.svg",
      alt: "真上から見た図。左側はフィールド内、中央の白い縦帯がタッチライン、右側がフィールド外。Aのボールは白線の内側、Bは白線に一部重なり、Cは白線の外側と完全に離れている。",
      caption: "この問題のために作成した模式図です。",
    },
    source: {
      label: "IFAB｜競技規則 第9条（2026/27）",
      url: "https://www.theifab.com/laws/latest/the-ball-in-and-out-of-play/",
    },
  },
  {
    id: "v2-world-visual-001",
    category: "world",
    difficulty: "normal",
    topic: "地図の読み方",
    prompt: "図の方位記号に従うと、家から見た駅の方角は？",
    choices: ["北東", "南東", "南西", "北西"],
    answer: 1,
    explanation:
      "架空の地図です。北が上なので右が東、下が南。駅は家の右下にあるため、家から見て南東です。実際の地図では、画面が回転している場合もあるので方位記号を確認します。",
    image: {
      src: "quiz/vq-23.svg",
      alt: "北を示す矢印が真上を向く地図。家は左上、駅は右下。家と駅は同じ地図の方眼上に示されている。",
      caption: "この問題のために作成した模式図です。",
    },
    source: {
      label: "国土地理院｜地図の方位（地図は本アプリの架空図）",
      url: "https://www.gsi.go.jp/kohokocho/FAQ3.html",
    },
  },
  {
    id: "v2-world-visual-002",
    category: "world",
    difficulty: "normal",
    topic: "身近な天気",
    prompt:
      "図のように上空へ大きく発達し、雷や急な強い雨を伴うことがある雲は？",
    choices: [
      "巻雲（すじ雲）",
      "層雲（きり雲）",
      "積乱雲（入道雲）",
      "巻積雲（うろこ雲）",
    ],
    answer: 2,
    explanation:
      "積乱雲は縦方向に大きく発達し、雷や急な強い雨などをもたらすことがあります。図は特徴を強調した模式図です。実際には見た目だけで安全を判断せず、気象情報や雷鳴などにも注意します。",
    image: {
      src: "quiz/vq-24.svg",
      alt: "地面から見た雲の模式図。厚い雲が塔のように高く発達し、上部は横に広がっている。雲の下には雨の線と稲妻がある。",
      caption: "この問題のために作成した模式図です。",
    },
    source: {
      label: "気象庁｜積乱雲ってどんな雲？",
      url: "https://www.jma.go.jp/jma/kishou/know/tenki_chuui/tenki_chuui_p2.html",
    },
  },
];
