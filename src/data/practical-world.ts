import type { Question } from "./types";

// Curated everyday knowledge, with a small selection of foundational world knowledge.
export const practicalWorldQuestions: Question[] = [
  {
    id: "v2-public-easy-001",
    category: "public",
    difficulty: "easy",
    topic: "歩行と横断",
    prompt: "歩道と車道が区別されている道路を歩くとき、原則として通る場所は？",
    choices: ["歩道", "車道の中央", "車道の左端", "自転車専用通行帯"],
    answer: 0,
    explanation:
      "歩行者は原則として歩道を通ります。工事など特別な状況では現地の案内にも従います。",
    source: {
      label: "警察庁｜交通の方法に関する教則",
      url: "https://www.npa.go.jp/bureau/traffic/20241101kyousoku.pdf",
    },
  },
  {
    id: "v2-public-easy-002",
    category: "public",
    difficulty: "easy",
    topic: "歩行と横断",
    prompt:
      "歩道も十分な路側帯もない道路を歩くとき、日本では原則どちら側を通る？",
    choices: [
      "車と同じ車線の中央",
      "道路の右側端",
      "道路の左側端",
      "道路の中央",
    ],
    answer: 1,
    explanation:
      "歩行者は原則右側通行です。ただし右側が危険な場合などには例外があります。",
    source: {
      label: "警察庁｜交通の方法に関する教則",
      url: "https://www.npa.go.jp/bureau/traffic/20241101kyousoku.pdf",
    },
  },
  {
    id: "v2-public-easy-003",
    category: "public",
    difficulty: "easy",
    topic: "自転車",
    prompt: "日本で自転車が車道を走るとき、原則として通る側は？",
    choices: [
      "進行方向にかかわらず中央",
      "見通しのよい側を自由に選ぶ",
      "左側",
      "右側",
    ],
    answer: 2,
    explanation: "自転車は車両の仲間で、車道では左側を通行します。",
    source: {
      label: "警察庁｜自転車の交通ルール",
      url: "https://www.npa.go.jp/bureau/traffic/bicycle/portal/rule.html",
    },
  },
  {
    id: "v2-public-easy-004",
    category: "public",
    difficulty: "easy",
    topic: "自転車",
    prompt: "夜に自転車で走るとき、必要な装備の使い方は？",
    choices: [
      "反射材だけ付けて前照灯は消す",
      "街灯があれば前照灯は消す",
      "対向車がいる間だけ点灯する",
      "前照灯を点灯する",
    ],
    answer: 3,
    explanation:
      "夜間はライトを点灯します。反射材は役立ちますが前照灯の代わりにはなりません。",
    source: {
      label: "警察庁｜自転車の交通ルール",
      url: "https://www.npa.go.jp/bureau/traffic/bicycle/portal/rule.html",
    },
  },
  {
    id: "v2-public-easy-005",
    category: "public",
    difficulty: "easy",
    topic: "自転車",
    prompt: "自転車で飲酒運転をすることについて、正しいのは？",
    choices: [
      "自動車と同様に禁止されている",
      "歩道だけなら認められる",
      "近所までなら認められる",
      "免許を持たない人には禁止されない",
    ],
    answer: 0,
    explanation:
      "自転車も車両なので飲酒運転は禁止です。距離や免許の有無では変わりません。",
    source: {
      label: "警察庁｜自転車の交通ルール",
      url: "https://www.npa.go.jp/bureau/traffic/bicycle/portal/rule.html",
    },
  },
  {
    id: "v2-public-easy-006",
    category: "public",
    difficulty: "easy",
    topic: "自転車",
    prompt: "自転車のヘルメットを選ぶ主な目的は？",
    choices: [
      "自転車保険の加入を不要にする",
      "転倒時などの頭のけがを減らす",
      "夜間のライトを省略する",
      "歩道を通行できるようにする",
    ],
    answer: 1,
    explanation:
      "頭部を守るための装備です。着用しても交通ルールや必要なライトは変わりません。",
    source: {
      label: "警察庁｜自転車の交通ルール",
      url: "https://www.npa.go.jp/bureau/traffic/bicycle/portal/rule.html",
    },
  },
  {
    id: "v2-public-easy-007",
    category: "public",
    difficulty: "easy",
    topic: "信号と踏切",
    prompt: "歩行者用信号が赤のとき、原則としてどうする？",
    choices: [
      "手を上げれば渡れる",
      "自転車と一緒なら渡れる",
      "横断を始めず待つ",
      "車が来なければ渡る",
    ],
    answer: 2,
    explanation:
      "歩行者は赤信号で横断を始めてはいけません。警察官の指示がある場合は指示に従います。",
    source: {
      label: "警察庁｜交通の方法に関する教則",
      url: "https://www.npa.go.jp/bureau/traffic/20241101kyousoku.pdf",
    },
  },
  {
    id: "v2-public-easy-008",
    category: "public",
    difficulty: "easy",
    topic: "信号と踏切",
    prompt:
      "踏切の警報機が鳴り始め、まだ遮断機が上がっている。歩行者の対応は？",
    choices: [
      "遮断機が下がるまで入れる",
      "列車が見えなければ入れる",
      "走って渡れる距離なら入る",
      "踏切へ入らず待つ",
    ],
    answer: 3,
    explanation:
      "警報が鳴ったら踏切に入ってはいけません。遮断機が下がり切る前でも同じです。",
    source: {
      label: "警察庁｜交通の方法に関する教則",
      url: "https://www.npa.go.jp/bureau/traffic/20241101kyousoku.pdf",
    },
  },
  {
    id: "v2-public-easy-009",
    category: "public",
    difficulty: "easy",
    topic: "車の同乗",
    prompt: "一般の乗用車でシートベルトを着ける座席は、原則どこ？",
    choices: [
      "運転席・助手席・後部座席のすべて",
      "運転席と助手席だけ",
      "運転席だけ",
      "高速道路以外では助手席だけ",
    ],
    answer: 0,
    explanation:
      "後部座席も着用が必要です。法令上の免除に該当する場合などを除きます。",
    source: {
      label: "警察庁｜交通の方法に関する教則",
      url: "https://www.npa.go.jp/bureau/traffic/20241101kyousoku.pdf",
    },
  },
  {
    id: "v2-public-easy-010",
    category: "public",
    difficulty: "easy",
    topic: "車の同乗",
    prompt: "小さな子を車に乗せるとき、チャイルドシートは何に合わせて選ぶ？",
    choices: [
      "移動先の駐車時間",
      "子どもの体格と製品の適合条件",
      "保護者の身長",
      "車体の色",
    ],
    answer: 1,
    explanation:
      "年齢だけでなく身長や体重、車への適合も確認し、説明書に従って使います。",
    source: {
      label: "警察庁｜子供を守るチャイルドシート",
      url: "https://www.npa.go.jp/bureau/traffic/anzen/childseat.html",
    },
  },
  {
    id: "v2-public-easy-011",
    category: "public",
    difficulty: "easy",
    topic: "駅の安全",
    prompt: "駅のホームから線路に物を落とした。まず取るべき対応は？",
    choices: [
      "傘などを線路へ伸ばす",
      "友人に見張ってもらって降りる",
      "係員へ知らせる",
      "列車が見えなければ降りて拾う",
    ],
    answer: 2,
    explanation:
      "線路内に入らず係員へ知らせます。列車の接近や感電などの危険があります。",
    source: {
      label: "JR東日本｜安全に関するお願い",
      url: "https://www.jreast.co.jp/company/csr/safe-cx/safety-efforts/safety-request/",
    },
  },
  {
    id: "v2-public-easy-012",
    category: "public",
    difficulty: "easy",
    topic: "駅の安全",
    prompt: "電車のドアが閉まり始めたときの、安全な乗り方は？",
    choices: [
      "荷物を挟んでドアを止める",
      "片足だけ先に入れる",
      "閉まりかけなら走って入る",
      "無理に入らず次の電車を待つ",
    ],
    answer: 3,
    explanation:
      "駆け込み乗車や物を挟む行為は、転倒や挟まれ事故につながります。",
    source: {
      label: "JR東日本｜安全に関するお願い",
      url: "https://www.jreast.co.jp/company/csr/safe-cx/safety-efforts/safety-request/",
    },
  },
  {
    id: "v2-public-easy-013",
    category: "public",
    difficulty: "easy",
    topic: "駅の安全",
    prompt: "JR東日本などが呼びかけるエスカレーターの使い方は？",
    choices: [
      "歩かず立ち止まって利用する",
      "急ぐ人のため必ず片側を歩行用にする",
      "上りは歩き下りだけ止まる",
      "空いていれば二段ずつ上る",
    ],
    answer: 0,
    explanation:
      "歩行は転倒や衝突の原因になります。手すりにつかまり立ち止まる利用が呼びかけられています。",
    source: {
      label: "JR東日本｜安全に関するお願い",
      url: "https://www.jreast.co.jp/company/csr/safe-cx/safety-efforts/safety-request/",
    },
  },
  {
    id: "v2-public-easy-014",
    category: "public",
    difficulty: "easy",
    topic: "乗車マナー",
    prompt: "電車の乗り降りが同じドアで行われるとき、基本となる順序は？",
    choices: [
      "定期券を持つ人が先",
      "降りる人が先",
      "乗る人が先",
      "荷物の多い人が先",
    ],
    answer: 1,
    explanation:
      "降りる人の通り道を空け、降車後に乗ると乗り降りが円滑になります。",
    source: {
      label: "JR東日本｜マナーの取組み",
      url: "https://www.jreast.co.jp/saferelief/operationguide/manners.html/",
    },
  },
  {
    id: "v2-public-easy-015",
    category: "public",
    difficulty: "easy",
    topic: "乗車マナー",
    prompt: "優先席の「優先」は、どのような意味？",
    choices: [
      "空いていても必ず無人にする",
      "先に並んだ人の専用席である",
      "その席を必要とする人が優先して使える",
      "高齢者だけが使える",
    ],
    answer: 2,
    explanation:
      "高齢者のほか、障害のある人、妊娠中の人など、席を必要とする人への配慮のための席です。",
    source: {
      label: "JR東日本｜マナーの取組み",
      url: "https://www.jreast.co.jp/saferelief/operationguide/manners.html/",
    },
  },
  {
    id: "v2-public-easy-016",
    category: "public",
    difficulty: "easy",
    topic: "乗車マナー",
    prompt: "混雑した電車で大きな荷物を持つとき、基本的な配慮は？",
    choices: [
      "隣の空席に必ず置く",
      "ドアの開く場所へ先に置く",
      "自分の前の通路を荷物で確保する",
      "通路やドアをふさがない持ち方・置き方にする",
    ],
    answer: 3,
    explanation: "乗降や通行を妨げないよう、混雑状況に合わせて荷物を扱います。",
    source: {
      label: "JR東日本｜マナーの取組み",
      url: "https://www.jreast.co.jp/saferelief/operationguide/manners.html/",
    },
  },
  {
    id: "v2-public-easy-017",
    category: "public",
    difficulty: "easy",
    topic: "きっぷと運行",
    prompt: "列車の「指定席」とは、通常どのような席？",
    choices: [
      "利用する列車や座席が指定された席",
      "乗る順番だけを指定する席",
      "立つ場所を指定する区画",
      "指定のない車両の空席",
    ],
    answer: 0,
    explanation:
      "指定席券などに列車・日付・座席が示されます。きっぷの利用条件を確認します。",
    source: {
      label: "JR東日本｜きっぷの組合せ",
      url: "https://www.jreast.co.jp/kippu/03.html",
    },
  },
  {
    id: "v2-public-easy-018",
    category: "public",
    difficulty: "easy",
    topic: "きっぷと運行",
    prompt: "時刻表にある「終電」とは？",
    choices: [
      "始発駅だけで乗れる電車",
      "その日の運行で最後となる電車",
      "各駅に止まる電車",
      "終点の一つ前までの電車",
    ],
    answer: 1,
    explanation:
      "終電は、その路線や区間・行き先について、その日の最後の電車を指します。",
  },
  {
    id: "v2-public-easy-019",
    category: "public",
    difficulty: "easy",
    topic: "きっぷと運行",
    prompt: "電車が「運休」と案内された。意味は？",
    choices: [
      "途中の駅を一つ通過する",
      "運賃が無料になる",
      "予定していた運転を取りやめる",
      "必ず遅れて運転する",
    ],
    answer: 2,
    explanation: "運休は運転の取りやめです。時刻が遅れる「遅延」と区別します。",
  },
  {
    id: "v2-public-easy-020",
    category: "public",
    difficulty: "easy",
    topic: "きっぷと運行",
    prompt: "バスの「○○行き」という表示から主に分かることは？",
    choices: [
      "乗客の出発地",
      "車庫へ戻る時刻",
      "運賃の支払方法",
      "その便の行き先",
    ],
    answer: 3,
    explanation:
      "行き先を表します。同じ道路の停留所でも方向や経由地が異なることがあります。",
  },
  {
    id: "v2-public-easy-021",
    category: "public",
    difficulty: "easy",
    topic: "バリアフリー",
    prompt:
      "赤い地に白い十字とハートが描かれた「ヘルプマーク」が伝えることは？",
    choices: [
      "外見から分かりにくくても援助や配慮が必要な場合がある",
      "医療従事者である",
      "荷物検査を免除される",
      "必ず車いすを利用している",
    ],
    answer: 0,
    explanation:
      "義足・内部障害・妊娠初期など、外見では分からなくても配慮を必要とする人が用います。",
    source: {
      label: "東京都福祉局｜ヘルプマーク",
      url: "https://www.fukushi.metro.tokyo.lg.jp/shougai/shougai_shisaku/helpmark",
    },
  },
  {
    id: "v2-public-easy-022",
    category: "public",
    difficulty: "easy",
    topic: "バリアフリー",
    prompt: "歩道の点字ブロックの上に荷物を置かない理由は？",
    choices: [
      "荷物を回収する目印だから",
      "視覚障害のある人の移動を妨げるため",
      "自転車の駐輪枠だから",
      "雨水を集める場所だから",
    ],
    answer: 1,
    explanation:
      "点字ブロックは足裏や白杖で分かる案内です。進路をふさがないようにします。",
    source: {
      label: "警察庁｜交通の方法に関する教則",
      url: "https://www.npa.go.jp/bureau/traffic/20241101kyousoku.pdf",
    },
  },
  {
    id: "v2-public-easy-023",
    category: "public",
    difficulty: "easy",
    topic: "バリアフリー",
    prompt: "盲導犬・介助犬・聴導犬をまとめて何という？",
    choices: ["災害救助犬", "セラピー犬", "身体障害者補助犬", "警察犬"],
    answer: 2,
    explanation:
      "身体障害者補助犬は、この三種類を指します。それぞれ異なる働きで利用者を支えます。",
    source: {
      label: "厚生労働省｜身体障害者補助犬の概要",
      url: "https://www.mhlw.go.jp/bunya/shougaihoken/hojoken/gaiyo.html",
    },
  },
  {
    id: "v2-public-easy-024",
    category: "public",
    difficulty: "easy",
    topic: "バリアフリー",
    prompt: "仕事中の補助犬に対する基本的な接し方は？",
    choices: [
      "注意を引くため名前を呼ぶ",
      "休ませるためリードを持つ",
      "通路で先におやつを与える",
      "勝手に触ったり食べ物を与えたりしない",
    ],
    answer: 3,
    explanation:
      "利用者を支える仕事を妨げないようにします。援助が必要そうなら、まず利用者本人に声をかけます。",
    source: {
      label: "厚生労働省｜補助犬・皆さまへのお願い",
      url: "https://www.mhlw.go.jp/content/000489424.pdf",
    },
  },
  {
    id: "v2-public-easy-025",
    category: "public",
    difficulty: "easy",
    topic: "郵便と配送",
    prompt: "郵便物の宛先として書く「〒」の後の数字は？",
    choices: ["郵便番号", "電話の市外局番", "住民票の番号", "配達員の担当番号"],
    answer: 0,
    explanation:
      "日本の郵便番号は住所の地域などを表す7桁の番号です。住所と氏名も正確に書きます。",
    source: {
      label: "日本郵便｜郵便番号検索",
      url: "https://www.post.japanpost.jp/zipcode/",
    },
  },
  {
    id: "v2-public-easy-026",
    category: "public",
    difficulty: "easy",
    topic: "郵便と配送",
    prompt: "国内の郵便で日本円の現金を送るとき、使う方法は？",
    choices: [
      "特定記録を付ければ普通封筒でよい",
      "現金書留",
      "普通郵便に現金を入れる",
      "レターパックに現金を入れる",
    ],
    answer: 1,
    explanation:
      "現金を送る場合は現金書留にします。追跡できるサービスならどれでもよい、とはなりません。",
    source: {
      label: "日本郵便｜書留",
      url: "https://www.post.japanpost.jp/service/send/domestic/option/kakitome/",
    },
  },
  {
    id: "v2-public-easy-027",
    category: "public",
    difficulty: "easy",
    topic: "郵便と配送",
    prompt: "荷物の「着払い」とは、主に何を受取人が支払う方法？",
    choices: [
      "差出人の会費",
      "商品の保険料だけ",
      "荷物の送料",
      "商品の代金だけ",
    ],
    answer: 2,
    explanation:
      "着払いは送料を受取人が負担する方法です。商品代金を回収する代金引換とは区別します。",
    source: {
      label: "日本郵便｜着払",
      url: "https://www.post.japanpost.jp/send/domestic/charge/useful/cash-on-delivery/",
    },
  },
  {
    id: "v2-public-easy-028",
    category: "public",
    difficulty: "easy",
    topic: "郵便と配送",
    prompt: "荷物と引き換えに商品代金などを支払う配送方法は？",
    choices: ["郵便局留", "転送", "速達", "代金引換"],
    answer: 3,
    explanation:
      "代金引換は、配達の際に差出人が指定した代金を受取人から受け取るサービスです。",
    source: {
      label: "日本郵便｜代金引換とは",
      url: "https://www.post.japanpost.jp/question/58.html",
    },
  },
  {
    id: "v2-public-easy-029",
    category: "public",
    difficulty: "easy",
    topic: "施設の表示",
    prompt: "施設の「休館日」とは？",
    choices: [
      "通常の利用ができない日",
      "入場料が安くなる日",
      "予約だけで入れる日",
      "閉館時刻が延びる日",
    ],
    answer: 0,
    explanation:
      "休館日は通常の利用を休む日です。臨時開館などがあれば施設の案内を確認します。",
  },
  {
    id: "v2-public-easy-030",
    category: "public",
    difficulty: "easy",
    topic: "施設の表示",
    prompt: "入口の「関係者以外立入禁止」の意味は？",
    choices: [
      "短時間なら見学できる",
      "許可された関係者以外は入れない",
      "予約のある観光客は自由に入れる",
      "空いている時間なら誰でも入れる",
    ],
    answer: 1,
    explanation:
      "業務や安全管理のため立入りを制限する表示です。必要があれば係員に確認します。",
  },
  {
    id: "v2-public-easy-031",
    category: "public",
    difficulty: "easy",
    topic: "施設の表示",
    prompt: "「最終入館16時30分・閉館17時」とある施設で、入館できる締切は？",
    choices: ["17時", "17時30分", "16時30分", "16時45分"],
    answer: 2,
    explanation:
      "入館の締切と、施設が閉まる時刻は別です。滞在できる残り時間にも注意します。",
  },
  {
    id: "v2-public-easy-032",
    category: "public",
    difficulty: "easy",
    topic: "施設の表示",
    prompt: "「土足厳禁」と書かれた部屋に入るときは？",
    choices: [
      "靴底を拭けば必ず入れる",
      "雨の日だけ靴を脱ぐ",
      "つま先だけ靴を脱ぐ",
      "屋外で履いた靴を脱ぐ",
    ],
    answer: 3,
    explanation:
      "外履きのままでの入室を禁止する表示です。用意された履物があれば案内に従います。",
  },
  {
    id: "v2-public-easy-033",
    category: "public",
    difficulty: "easy",
    topic: "旅行の準備",
    prompt: "海外で国籍や氏名などを証明する日本政府発行の公文書は？",
    choices: ["パスポート", "搭乗券", "ホテル予約票", "国際学生証"],
    answer: 0,
    explanation:
      "パスポートは海外で身分を証明する重要な公文書です。適切に保管します。",
    source: {
      label: "外務省｜パスポートQ&A",
      url: "https://www.mofa.go.jp/mofaj/toko/passport/pass_4.html",
    },
  },
  {
    id: "v2-public-easy-034",
    category: "public",
    difficulty: "easy",
    topic: "旅行の準備",
    prompt: "空港でいう「搭乗口」とは？",
    choices: [
      "航空券を印刷する番号",
      "飛行機に乗るための入口・ゲート",
      "手荷物を受け取る場所",
      "到着客専用の出口",
    ],
    answer: 1,
    explanation:
      "搭乗口は乗る飛行機へ向かうゲートです。搭乗券と空港の案内表示で確認します。",
  },
  {
    id: "v2-public-easy-035",
    category: "public",
    difficulty: "easy",
    topic: "旅行の準備",
    prompt: "ホテルでいう「チェックアウト」とは？",
    choices: [
      "荷物を空港へ送る手続き",
      "部屋の掃除予約",
      "出発に伴う退室・精算などの手続き",
      "到着時の入室手続き",
    ],
    answer: 2,
    explanation:
      "チェックインは到着時、チェックアウトは出発時の手続きです。宿泊施設の指定時刻を確認します。",
  },
  {
    id: "v2-public-easy-036",
    category: "public",
    difficulty: "easy",
    topic: "旅行の準備",
    prompt: "旅程表に「現地時間」とある場合、どこの時計を基準にする？",
    choices: [
      "常に日本の時刻",
      "飛行機が出発した国の時刻",
      "予約した端末の表示時刻",
      "その場所で使われる時刻",
    ],
    answer: 3,
    explanation:
      "時差のある旅行では現地の時刻で確認します。日付が日本と異なることもあります。",
  },
  {
    id: "v2-public-easy-037",
    category: "public",
    difficulty: "easy",
    topic: "公共の案内語",
    prompt: "駅の「乗り換え」の案内が示すのは？",
    choices: [
      "別の路線や列車などへ移ること",
      "きっぷの名義を変更すること",
      "車両を清掃すること",
      "忘れ物を受け取ること",
    ],
    answer: 0,
    explanation: "目的地へ行く途中で、別の路線や便へ移ることを指します。",
  },
  {
    id: "v2-public-easy-038",
    category: "public",
    difficulty: "easy",
    topic: "公共の案内語",
    prompt: "公共施設の「受付番号」が主に役立つ場面は？",
    choices: [
      "利用者の年齢の証明",
      "呼出しや手続きの順番の確認",
      "郵便番号の変更",
      "施設の建築年の確認",
    ],
    answer: 1,
    explanation:
      "番号は呼出しや申込みの識別に使われます。必ず番号順とは限らないので案内も確認します。",
  },
  {
    id: "v2-public-easy-039",
    category: "public",
    difficulty: "easy",
    topic: "公共の案内語",
    prompt: "会場案内の「車いす使用者用駐車施設」は、主にどんな場所？",
    choices: [
      "車いすを預ける倉庫",
      "すべての車が短時間だけ停める場所",
      "乗降等に広い区画を必要とする人のための場所",
      "小型車だけを停める場所",
    ],
    answer: 2,
    explanation:
      "幅の広い区画などが必要な人のための場所です。利用対象は現地の案内に従います。",
  },
  {
    id: "v2-public-easy-040",
    category: "public",
    difficulty: "easy",
    topic: "公共の案内語",
    prompt: "道案内でいう「交差点」は？",
    choices: [
      "道路が川を越えるところ",
      "トンネルの出口",
      "坂が終わるところ",
      "複数の道路が交わるところ",
    ],
    answer: 3,
    explanation:
      "道路が交わる場所です。進行方向ごとの信号や横断する人にも注意します。",
  },
  {
    id: "v2-public-normal-001",
    category: "public",
    difficulty: "normal",
    topic: "歩行と横断",
    prompt: "横断を始める前に歩行者用青信号が点滅した。どうする？",
    choices: [
      "横断を始めず次の青を待つ",
      "走れば渡り始めてよい",
      "車の信号が赤なら始めてよい",
      "手を上げれば始めてよい",
    ],
    answer: 0,
    explanation:
      "青の点滅では横断を始めません。横断中なら速やかに渡り終えるか、引き返します。",
    source: {
      label: "警察庁｜交通の方法に関する教則",
      url: "https://www.npa.go.jp/bureau/traffic/20241101kyousoku.pdf",
    },
  },
  {
    id: "v2-public-normal-002",
    category: "public",
    difficulty: "normal",
    topic: "歩行と横断",
    prompt: "信号機のない横断歩道で歩行者が渡ろうとしている。車の運転者は？",
    choices: [
      "歩行者が手を上げた場合だけ止まる",
      "手前で一時停止して道を譲る",
      "速度を保ち先に通る",
      "警音器で知らせて通る",
    ],
    answer: 1,
    explanation:
      "横断しようとする歩行者がいる場合も停止して譲ります。挙手が条件ではありません。",
    source: {
      label: "警察庁｜横断歩道は歩行者優先",
      url: "https://www.npa.go.jp/bureau/traffic/oudanhodou/info.html",
    },
  },
  {
    id: "v2-public-normal-003",
    category: "public",
    difficulty: "normal",
    topic: "自転車",
    prompt: "自転車が例外的に歩道を通行できる場面でも、優先するのは？",
    choices: ["速度の速い人", "ベルを鳴らした人", "歩行者", "自転車"],
    answer: 2,
    explanation:
      "歩道は歩行者優先です。歩行者の通行を妨げる場合は一時停止します。",
    source: {
      label: "警察庁｜自転車の交通ルール",
      url: "https://www.npa.go.jp/bureau/traffic/bicycle/portal/rule.html",
    },
  },
  {
    id: "v2-public-normal-004",
    category: "public",
    difficulty: "normal",
    topic: "自転車",
    prompt: "普通の自転車で一時停止の標識がある交差点に来た。必要な対応は？",
    choices: [
      "自動車が見えたときだけ止まる",
      "徐行するだけでよい",
      "自転車の専用標識がある場合だけ止まる",
      "停止して安全を確認する",
    ],
    answer: 3,
    explanation:
      "一時停止は自転車にも適用されます。停止線の手前など所定の位置で止まります。",
    source: {
      label: "警察庁｜自転車の交通ルール",
      url: "https://www.npa.go.jp/bureau/traffic/bicycle/portal/rule.html",
    },
  },
  {
    id: "v2-public-normal-005",
    category: "public",
    difficulty: "normal",
    topic: "車の同乗",
    prompt:
      "6歳になった子が大人用シートベルトを適切に着用できない体格の場合は？",
    choices: [
      "体格に合うチャイルドシート等を使う",
      "6歳になれば必ず不要",
      "後部座席なら膝の上でよい",
      "肩ベルトを背中へ回せばよい",
    ],
    answer: 0,
    explanation:
      "6歳以上でも適切にベルトを着けられない場合は、体格に合うチャイルドシート等を使います。",
    source: {
      label: "警察庁｜子供を守るチャイルドシート",
      url: "https://www.npa.go.jp/bureau/traffic/anzen/childseat.html",
    },
  },
  {
    id: "v2-public-normal-006",
    category: "public",
    difficulty: "normal",
    topic: "信号と踏切",
    prompt: "道路の信号と交通整理をする警察官の指示が異なる場合、従うのは？",
    choices: [
      "自分が先に見た方",
      "警察官の指示",
      "必ず信号機だけ",
      "周囲の車の進み方",
    ],
    answer: 1,
    explanation:
      "警察官などの手信号や指示が信号機と異なる場合は、その指示に従います。",
    source: {
      label: "警察庁｜交通の方法に関する教則",
      url: "https://www.npa.go.jp/bureau/traffic/20241101kyousoku.pdf",
    },
  },
  {
    id: "v2-public-normal-007",
    category: "public",
    difficulty: "normal",
    topic: "歩行と横断",
    prompt: "夜に道路を歩くとき、反射材が役立つ主な理由は？",
    choices: [
      "車を自動で停止させる",
      "暗い服を昼間と同じ明るさにする",
      "車のライトを反射して存在を知らせる",
      "自分の周囲を常に照明で照らす",
    ],
    answer: 2,
    explanation:
      "反射材はライトを反射して運転者から見えやすくします。安全確認自体も必要です。",
    source: {
      label: "警察庁｜交通の方法に関する教則",
      url: "https://www.npa.go.jp/bureau/traffic/20241101kyousoku.pdf",
    },
  },
  {
    id: "v2-public-normal-008",
    category: "public",
    difficulty: "normal",
    topic: "車の同乗",
    prompt: "走行中のバスで立って乗る場合、急な揺れへの備えとして適切なのは？",
    choices: [
      "降車ボタンにつかまる",
      "ドアへ体重をかける",
      "荷物を足で押さえるだけにする",
      "手すりやつり革につかまる",
    ],
    answer: 3,
    explanation:
      "揺れや急停止による転倒を防ぐため、手すりなどをしっかり利用します。",
    source: {
      label: "警察庁｜交通の方法に関する教則",
      url: "https://www.npa.go.jp/bureau/traffic/20241101kyousoku.pdf",
    },
  },
  {
    id: "v2-public-normal-009",
    category: "public",
    difficulty: "normal",
    topic: "駅の安全",
    prompt:
      "ホームで人が線路に転落し、列車を止める必要がある。近くに非常停止ボタンがあれば？",
    choices: [
      "押して係員にも知らせる",
      "時刻表を確認してから押す",
      "本人の許可が出るまで押さない",
      "落とし物窓口の営業時間を調べる",
    ],
    answer: 0,
    explanation:
      "人命に関わる危険では非常停止ボタン等で知らせます。自分が線路へ降りてはいけません。",
    source: {
      label: "JR東日本｜安全に関するお願い",
      url: "https://www.jreast.co.jp/company/csr/safe-cx/safety-efforts/safety-request/",
    },
  },
  {
    id: "v2-public-normal-010",
    category: "public",
    difficulty: "normal",
    topic: "きっぷと運行",
    prompt:
      "JRで通常のきっぷを使って新幹線に乗るとき、基本的に必要な組合せは？",
    choices: [
      "特急券だけで全区間を利用できる",
      "乗車券と新幹線特急券",
      "乗車券と入場券",
      "入場券と定期券",
    ],
    answer: 1,
    explanation:
      "基本運賃の乗車券と特急料金の特急券が必要です。一体型の商品や電子きっぷもあります。",
    source: {
      label: "JR東日本｜きっぷの組合せ",
      url: "https://www.jreast.co.jp/kippu/03.html",
    },
  },
  {
    id: "v2-public-normal-011",
    category: "public",
    difficulty: "normal",
    topic: "きっぷと運行",
    prompt: "列車の「自由席」について、正しい理解は？",
    choices: [
      "指定席車両でも全席自由に使える",
      "乗車券を持たず無料で座れる",
      "対象の自由席車両の空席を利用し、座れる保証はない",
      "購入すれば必ず一席確保される",
    ],
    answer: 2,
    explanation:
      "座席の指定がないため、混雑時には座れない場合があります。対象列車・車両も確認します。",
    source: {
      label: "JR東日本｜きっぷの組合せ",
      url: "https://www.jreast.co.jp/kippu/03.html",
    },
  },
  {
    id: "v2-public-normal-012",
    category: "public",
    difficulty: "normal",
    topic: "きっぷと運行",
    prompt:
      "「平日」と「土休日」の二種類のバス時刻表がある。祝日の月曜は通常どちらを見る？",
    choices: ["必ず平日の表", "便数の多い方", "前日の表", "土休日の表"],
    answer: 3,
    explanation:
      "祝日は通常「土休日」の扱いです。特別ダイヤなどの掲示があればそちらを確認します。",
  },
  {
    id: "v2-public-normal-013",
    category: "public",
    difficulty: "normal",
    topic: "きっぷと運行",
    prompt:
      "案内板に「快速はB駅を通過、普通はB駅に停車」とある。B駅へ直接行けるのは？",
    choices: ["普通列車", "快速列車", "どちらも同じ条件", "始発の列車に限る"],
    answer: 0,
    explanation:
      "列車名だけでなく停車駅を確認します。快速はこの条件ではB駅に停まりません。",
  },
  {
    id: "v2-public-normal-014",
    category: "public",
    difficulty: "normal",
    topic: "きっぷと運行",
    prompt:
      "乗換案内でA駅到着10時15分、次の列車の発車10時23分。乗換えに使える時間は？",
    choices: ["38分", "8分", "6分", "12分"],
    answer: 1,
    explanation:
      "23分から15分を引いて8分です。別ホームへの移動や混雑も考慮します。",
  },
  {
    id: "v2-public-normal-015",
    category: "public",
    difficulty: "normal",
    topic: "きっぷと運行",
    prompt: "「この電車は途中のC駅止まり」と放送された。C駅より先へ行く人は？",
    choices: [
      "運賃を払えば同じ車両が先へ行く",
      "車内の後方へ移動すればよい",
      "先へ進む別の便への乗換えを確認する",
      "そのまま待てば必ず目的地へ行く",
    ],
    answer: 2,
    explanation:
      "その便の終点がC駅という意味です。先の区間の接続を確認します。",
  },
  {
    id: "v2-public-normal-016",
    category: "public",
    difficulty: "normal",
    topic: "バリアフリー",
    prompt:
      "視覚障害のある人へ案内する際、「あちらです」より分かりやすい伝え方は？",
    choices: [
      "遠くを指さすだけにする",
      "案内板の色だけを言う",
      "声を大きくして同じ言葉を繰り返す",
      "本人から見た方向と距離を具体的に伝える",
    ],
    answer: 3,
    explanation:
      "方向や距離、段差の位置などを具体的に伝えます。まず必要な手助けを本人に確かめます。",
    source: {
      label: "警察庁｜交通の方法に関する教則",
      url: "https://www.npa.go.jp/bureau/traffic/20241101kyousoku.pdf",
    },
  },
  {
    id: "v2-public-normal-017",
    category: "public",
    difficulty: "normal",
    topic: "バリアフリー",
    prompt: "段差の前で困っている車いす利用者を見かけた。最初の対応は？",
    choices: [
      "必要な手伝いを本人に尋ねる",
      "断りなく背後から押す",
      "車いすだけを先に持ち上げる",
      "同行者が来るまで必ず話しかけない",
    ],
    answer: 0,
    explanation:
      "望む介助方法は人や状況で異なります。本人に確認してから行います。",
    source: {
      label: "東京都福祉局｜ヘルプマーク",
      url: "https://www.fukushi.metro.tokyo.lg.jp/shougai/shougai_shisaku/helpmark",
    },
  },
  {
    id: "v2-public-normal-018",
    category: "public",
    difficulty: "normal",
    topic: "バリアフリー",
    prompt: "補助犬のうち、呼出し音や警報などの音を知らせる役割を担うのは？",
    choices: ["災害救助犬", "聴導犬", "盲導犬", "警察犬"],
    answer: 1,
    explanation:
      "聴導犬は、音が聞こえない・聞こえにくい人に生活上必要な音を知らせます。",
    source: {
      label: "厚生労働省｜身体障害者補助犬の概要",
      url: "https://www.mhlw.go.jp/bunya/shougaihoken/hojoken/gaiyo.html",
    },
  },
  {
    id: "v2-public-normal-019",
    category: "public",
    difficulty: "normal",
    topic: "バリアフリー",
    prompt: "点字ブロックの「線状」と「点状」の主な役割の組合せは？",
    choices: [
      "線状は警告、点状は進む方向の誘導",
      "線状は自転車用、点状は歩行者用",
      "線状は夜間用、点状は昼間用",
      "線状は進む方向の誘導、点状は注意や停止の位置の案内",
    ],
    answer: 3,
    explanation:
      "線の並びは進む方向を、点の並びは段差や分岐など注意が必要な位置を伝えます。どちらも物を置いてふさがないようにします。",
    source: {
      label: "国土交通省中部運輸局｜点字ブロックの役割",
      url: "https://wwwtb.mlit.go.jp/chubu/barrierfree/qa/qa_barrierfree.pdf",
    },
  },
  {
    id: "v2-public-normal-020",
    category: "public",
    difficulty: "normal",
    topic: "郵便と配送",
    prompt:
      "日本郵便に転居届を出した場合、旧住所あての郵便物等が無料転送される期間は原則？",
    choices: [
      "転居日から1か月間",
      "新居入居から3年間",
      "住所変更するまで無期限",
      "届出日から1年間",
    ],
    answer: 3,
    explanation:
      "転送期間は届出日から1年間です。登録には日数がかかるため余裕をもって届け出ます。",
    source: {
      label: "日本郵便｜転居・転送サービス",
      url: "https://www.post.japanpost.jp/service/receive/relocation/",
    },
  },
  {
    id: "v2-public-normal-021",
    category: "public",
    difficulty: "normal",
    topic: "郵便と配送",
    prompt:
      "日本郵便の「特定記録」と「書留」で、特定記録には原則付かないものは？",
    choices: [
      "損害賠償の補償",
      "引受けの記録",
      "追跡による配達状況確認",
      "受領証",
    ],
    answer: 0,
    explanation:
      "特定記録は引受けを記録するサービスで、損害賠償はありません。目的に合う方法を選びます。",
    source: {
      label: "日本郵便｜特定記録",
      url: "https://www.post.japanpost.jp/service/send/domestic/option/tokutei-kiroku/",
    },
  },
  {
    id: "v2-public-normal-022",
    category: "public",
    difficulty: "normal",
    topic: "郵便と配送",
    prompt: "宅配便の送り状に「ワレモノ」と書く主な目的は？",
    choices: [
      "必ず手渡しに変更する",
      "壊れやすい内容物だと取り扱う人へ知らせる",
      "送料を無料にする",
      "中身の価格を確定する",
    ],
    answer: 1,
    explanation:
      "取り扱い上の注意を知らせるものです。表示だけに頼らず適切な梱包も必要です。",
  },
  {
    id: "v2-public-normal-023",
    category: "public",
    difficulty: "normal",
    topic: "郵便と配送",
    prompt: "配達状況をオンラインで調べるため、通常使う番号は？",
    choices: [
      "差出人の口座番号",
      "最寄り駅の番号",
      "荷物のお問い合わせ番号・追跡番号",
      "受取人の暗証番号",
    ],
    answer: 2,
    explanation:
      "追跡に対応した荷物の番号を使います。普通郵便など、追跡できないサービスもあります。",
    source: {
      label: "日本郵便｜郵便追跡サービス",
      url: "https://trackings.post.japanpost.jp/services/srv/search",
    },
  },
  {
    id: "v2-public-normal-024",
    category: "public",
    difficulty: "normal",
    topic: "郵便と配送",
    prompt: "日本郵便の「転送不要」と記された郵便物が旧住所に届いた場合は？",
    choices: [
      "転居届があれば通常どおり転送される",
      "旧住所の新しい住人が保管する",
      "追加料金を払えば自動転送される",
      "転居届があっても新住所へ転送されない",
    ],
    answer: 3,
    explanation:
      "転送不要の郵便物は新住所へ転送されません。差出元で住所変更が必要です。",
    source: {
      label: "日本郵便｜転送されない郵便",
      url: "https://www.post.japanpost.jp/question/129.html",
    },
  },
  {
    id: "v2-public-normal-025",
    category: "public",
    difficulty: "normal",
    topic: "郵便と配送",
    prompt:
      "ポストの最終取集が17時、投函したのは17時20分。通常どのように考える？",
    choices: [
      "その日の取集に間に合ったとはいえない",
      "日付が変わるまでは当日取集になる",
      "投函時刻と同時に消印が押される",
      "速達と書けば必ずその場で回収される",
    ],
    answer: 0,
    explanation:
      "投函と取集は別です。締切がある郵便は取集時刻や窓口の扱いを確認します。",
  },
  {
    id: "v2-public-normal-026",
    category: "public",
    difficulty: "normal",
    topic: "施設の表示",
    prompt:
      "「18歳未満は保護者同伴」とある施設で、18歳の人は年齢条件に含まれる？",
    choices: [
      "年度末まで含まれる",
      "含まれない",
      "含まれる",
      "19歳になるまで含まれる",
    ],
    answer: 1,
    explanation:
      "「未満」は基準の数を含みません。「以下」は含みます。ほかの入場条件は別に確認します。",
  },
  {
    id: "v2-public-normal-027",
    category: "public",
    difficulty: "normal",
    topic: "施設の表示",
    prompt: "「再入場不可」の会場で、一度外に出る前に確認すべきことは？",
    choices: [
      "入場時の天気",
      "来場者の平均年齢",
      "退場すると同じ券で戻れない扱いかどうか",
      "出口の色",
    ],
    answer: 2,
    explanation:
      "再入場不可は退出後に戻れないという条件です。必要な事情があれば退出前に係員へ相談します。",
  },
  {
    id: "v2-public-normal-028",
    category: "public",
    difficulty: "normal",
    topic: "施設の表示",
    prompt: "図書館で資料を撮影したい。適切な確認は？",
    choices: [
      "入館が無料なら全資料を自由に撮影する",
      "フラッシュを消せば必ず許可される",
      "自分のスマホなら許可は不要と判断する",
      "その図書館の撮影・複写ルールを確認する",
    ],
    answer: 3,
    explanation:
      "撮影や複写には施設ごとの手続きや著作権上の条件があります。東京都立図書館も申出等を案内しています。",
    source: {
      label: "東京都立図書館｜撮影規程",
      url: "https://www.library.metro.tokyo.lg.jp/guide/photographing/",
    },
  },
  {
    id: "v2-public-normal-029",
    category: "public",
    difficulty: "normal",
    topic: "施設の表示",
    prompt: "「予約優先」と「予約必須」の違いとして適切なのは？",
    choices: [
      "予約必須は利用前の予約が必要",
      "どちらも予約なしで必ず入れる",
      "予約優先は必ず予約者以外を断る",
      "予約必須は料金が無料になる",
    ],
    answer: 0,
    explanation:
      "優先と必須は違います。予約優先でも空きがなければ利用できないので事前確認が役立ちます。",
  },
  {
    id: "v2-public-normal-030",
    category: "public",
    difficulty: "normal",
    topic: "旅行の準備",
    prompt: "海外旅行のビザの必要性を確認するとき、組合せとして適切なのは？",
    choices: [
      "予約サイトの表示言語だけ",
      "渡航先・国籍・目的・滞在期間",
      "航空会社のロゴと座席の色",
      "出発空港の広さと曜日",
    ],
    answer: 1,
    explanation:
      "ビザの要否は渡航先や目的、期間などで変わります。渡航先の大使館等で最新情報を確認します。",
    source: {
      label: "外務省｜ビザ",
      url: "https://www.mofa.go.jp/mofaj/comment/faq/toko/visa.html",
    },
  },
  {
    id: "v2-public-normal-031",
    category: "public",
    difficulty: "normal",
    topic: "旅行の準備",
    prompt: "パスポートの有効期限が旅行終了後なら、どの国にも必ず入国できる？",
    choices: [
      "往復航空券があれば期限切れでもよい",
      "国内の身分証明書で常に代用できる",
      "国によって必要な残存有効期間が違うため確認が必要",
      "有効期限内ならどこでも必ず入国できる",
    ],
    answer: 2,
    explanation:
      "入国には残存有効期間などの条件があります。旅券が有効というだけでは十分とは限りません。",
    source: {
      label: "外務省｜パスポートQ&A",
      url: "https://www.mofa.go.jp/mofaj/toko/passport/pass_4.html",
    },
  },
  {
    id: "v2-public-normal-032",
    category: "public",
    difficulty: "normal",
    topic: "旅行の準備",
    prompt: "航空会社の「預け入れ手荷物」とは？",
    choices: [
      "機内の座席上の棚に自分で置く荷物",
      "空港へ持参しない荷物",
      "必ず別の便で送られる荷物",
      "カウンター等で預け、通常は到着後に受け取る荷物",
    ],
    answer: 3,
    explanation:
      "客室へ持ち込む手荷物と区別します。禁止品やサイズなどの条件はそれぞれ異なります。",
    source: {
      label: "ANA｜手荷物について",
      url: "https://www.ana.co.jp/ja/jp/guide/boarding-procedures/baggage/domestic/",
    },
  },
  {
    id: "v2-public-normal-033",
    category: "public",
    difficulty: "normal",
    topic: "旅行の準備",
    prompt: "飛行機の出発時刻と搭乗口の締切時刻について、正しい理解は？",
    choices: [
      "搭乗口の締切は出発時刻より前に設定される",
      "出発時刻までに空港の入口へ着けばよい",
      "出発時刻が搭乗開始時刻と同じ",
      "荷物を預ければ締切後でも必ず乗れる",
    ],
    answer: 0,
    explanation:
      "保安検査や搭乗に必要な時間があるため、航空会社が指定する各締切を確認します。",
    source: {
      label: "ANA｜空港でのチェックイン方法",
      url: "https://www.ana.co.jp/ja/jp/guide/boarding-procedures/checkin/domestic/flow_airport/",
    },
  },
  {
    id: "v2-public-normal-034",
    category: "public",
    difficulty: "normal",
    topic: "公共の案内語",
    prompt: "駐車場の「満車」という表示の意味は？",
    choices: [
      "大型車だけを受け付ける状態",
      "利用できる空き区画がない状態",
      "その日の営業が終了している",
      "すべての区画が無料",
    ],
    answer: 1,
    explanation:
      "満車は空き区画がない状態です。営業終了を意味するとは限りません。",
  },
  {
    id: "v2-public-normal-035",
    category: "public",
    difficulty: "normal",
    topic: "公共の案内語",
    prompt: "公園の「リードを離さないでください」という案内は何を求めている？",
    choices: [
      "飼い主が見える範囲なら放す",
      "人が少なければ放す",
      "犬などを引き綱でつないだ状態にする",
      "首輪だけを付ければ自由にする",
    ],
    answer: 2,
    explanation:
      "リードは引き綱のことです。指定区域の案内や自治体のルールに従います。",
  },
  {
    id: "v2-public-hard-001",
    category: "public",
    difficulty: "hard",
    topic: "歩行と横断",
    prompt:
      "横断歩道の手前に止まった車がある。その横を通って前へ出る運転者の対応は？",
    choices: [
      "前へ出る前に一時停止して確認する",
      "人が見えなければ徐行だけで前へ出る",
      "停止車が発進した直後なら確認せず続く",
      "対向車線が空いていれば速度を変えず進む",
    ],
    answer: 0,
    explanation:
      "停止車の陰に歩行者がいる可能性があります。横を通って前へ出る前にも一時停止が必要です。",
    source: {
      label: "警察庁｜横断歩道は歩行者優先",
      url: "https://www.npa.go.jp/bureau/traffic/oudanhodou/info.html",
    },
  },
  {
    id: "v2-public-hard-002",
    category: "public",
    difficulty: "hard",
    topic: "歩行と横断",
    prompt: "大型車が左折しようとしているとき、左側の歩行者が注意する理由は？",
    choices: [
      "前輪と後輪が同じ軌跡を通るため",
      "後輪が前輪より内側を通り巻き込まれることがある",
      "後輪が前輪より常に外側を通るため",
      "後輪の軌跡は車体の長さに関係しないため",
    ],
    answer: 1,
    explanation:
      "内輪差や運転者から見えにくい場所があります。車が止まったか確かめ、車体の近くへ寄らないことが大切です。",
    source: {
      label: "警察庁｜交通の方法に関する教則",
      url: "https://www.npa.go.jp/bureau/traffic/20241101kyousoku.pdf",
    },
  },
  {
    id: "v2-public-hard-003",
    category: "public",
    difficulty: "hard",
    topic: "自転車",
    prompt: "自転車を押して歩道を歩く人は、通常は交通ルール上どう扱われる？",
    choices: [
      "降りても軽車両として扱われる",
      "歩道に限り軽車両として扱われる",
      "歩行者として扱われる",
      "横断歩道に限り歩行者として扱われる",
    ],
    answer: 2,
    explanation:
      "通常の二輪自転車を押して歩く場合は歩行者です。特殊な構造やけん引などは別の扱いがあります。",
    source: {
      label: "警察庁｜交通の方法に関する教則",
      url: "https://www.npa.go.jp/bureau/traffic/20241101kyousoku.pdf",
    },
  },
  {
    id: "v2-public-hard-004",
    category: "public",
    difficulty: "hard",
    topic: "自転車",
    prompt: "普通の自転車で信号のある大きな交差点を右折する基本的な方法は？",
    choices: [
      "自動車の右折車線から一度に曲がる",
      "対向車がなければ斜めに横切る",
      "歩行者信号に関係なく横断歩道を走る",
      "二段階で直進し向きを変えて進む",
    ],
    answer: 3,
    explanation:
      "自転車は原則二段階右折です。交差点の形や信号・標示に従います。",
    source: {
      label: "警察庁｜自転車の交通ルール",
      url: "https://www.npa.go.jp/bureau/traffic/bicycle/portal/rule.html",
    },
  },
  {
    id: "v2-public-hard-005",
    category: "public",
    difficulty: "hard",
    topic: "自転車",
    prompt:
      "普通自転車で歩道を通行できる条件でも、歩行者の通行を妨げそうなときは？",
    choices: [
      "一時停止する",
      "ベルを鳴らし、歩行者がよけるのを待たず進む",
      "歩く速さまで落とせば、止まらずすり抜けてよい",
      "車道寄りなら、歩行者との距離に関係なく進んでよい",
    ],
    answer: 0,
    explanation:
      "歩道では歩行者が優先です。徐行していても妨げになる場合は止まります。",
    source: {
      label: "警察庁｜自転車の交通ルール",
      url: "https://www.npa.go.jp/bureau/traffic/bicycle/portal/rule.html",
    },
  },
  {
    id: "v2-public-hard-006",
    category: "public",
    difficulty: "hard",
    topic: "信号と踏切",
    prompt: "車で進む交差点の信号が「赤色の点滅」になっている。必要な対応は？",
    choices: [
      "徐行すれば一時停止せず進める",
      "停止位置で一時停止し、安全を確認して進む",
      "赤色が点灯し続ける信号と同じく、変わるまで進めない",
      "優先道路なら点滅信号に従う必要はない",
    ],
    answer: 1,
    explanation:
      "赤色の点滅では、車は停止位置で一時停止します。黄色の点滅は、ほかの交通に注意して進めるという意味です。",
    source: {
      label: "警察庁｜交通の方法に関する教則",
      url: "https://www.npa.go.jp/bureau/traffic/20241101kyousoku.pdf",
    },
  },
  {
    id: "v2-public-hard-007",
    category: "public",
    difficulty: "hard",
    topic: "車の同乗",
    prompt:
      "後部座席のシートベルトについて、衝突時の危険を正しく説明しているのは？",
    choices: [
      "前席に背もたれがあれば後席の人は投げ出されない",
      "低速の一般道なら体を手で支えれば十分",
      "後席の人が前方へ投げ出され、前席の人も傷つけることがある",
      "エアバッグがあれば後席のベルトは不要になる",
    ],
    answer: 2,
    explanation:
      "後席でも衝突時に投げ出され、前席の人を傷つけることがあります。",
    source: {
      label: "警察庁｜交通の方法に関する教則",
      url: "https://www.npa.go.jp/bureau/traffic/20241101kyousoku.pdf",
    },
  },
  {
    id: "v2-public-hard-008",
    category: "public",
    difficulty: "hard",
    topic: "きっぷと運行",
    prompt: "A駅を23時50分に出て35分乗る。日付をまたいだ到着時刻は？",
    choices: ["同日23時25分", "翌日0時35分", "翌日1時25分", "翌日0時25分"],
    answer: 3,
    explanation: "24時まで10分、残り25分なので翌日の0時25分です。",
  },
  {
    id: "v2-public-hard-009",
    category: "public",
    difficulty: "hard",
    topic: "きっぷと運行",
    prompt:
      "A駅に8時42分到着、乗換えに最低10分必要。8時48分・8時55分・9時発の便で最も早く間に合うのは？",
    choices: ["8時55分", "8時48分", "9時", "どれも間に合わない"],
    answer: 0,
    explanation:
      "乗換え完了は最速でも8時52分なので、次の8時55分の便が該当します。",
  },
  {
    id: "v2-public-hard-010",
    category: "public",
    difficulty: "hard",
    topic: "きっぷと運行",
    prompt: "JR東日本のウェブで発行する遅延証明書だけで証明される内容は？",
    choices: [
      "自分が乗った列車の実際の遅れ",
      "対象の路線・時間帯で発生した最大の遅れ",
      "その人が当該路線に乗車したこと",
      "その人の職場への到着時刻",
    ],
    answer: 1,
    explanation:
      "この遅延証明書は路線・時間帯の最大の遅れを示します。個々の列車の遅れや、本人が乗車した事実までを証明するものではありません。",
    source: {
      label: "JR東日本｜遅延証明書のご利用にあたって",
      url: "https://traininfo.jreast.co.jp/delay_certificate/index.aspx",
    },
  },
  {
    id: "v2-public-hard-011",
    category: "public",
    difficulty: "hard",
    topic: "きっぷと運行",
    prompt:
      "普段のバス時刻表と「本日は祭りのため臨時ダイヤ」という掲示がある。確認すべきものは？",
    choices: [
      "前年の祭りの日の時刻表",
      "通常の時刻表に一律10分を加えた時刻",
      "本日の臨時ダイヤと迂回・停留所変更",
      "普段の土休日ダイヤだけ",
    ],
    answer: 2,
    explanation:
      "イベント時には時刻や経路が変わることがあります。当日に適用される案内を確認します。",
  },
  {
    id: "v2-public-hard-012",
    category: "public",
    difficulty: "hard",
    topic: "バリアフリー",
    prompt:
      "車いす用の表示があるトイレを、内部障害のある人が必要とすることは？",
    choices: [
      "車いすから立って歩ける人には必要ない",
      "障害が外見で分かる人だけが対象になる",
      "車いすの表示があれば内部障害は対象外になる",
      "設備によってはあるため外見だけで決めつけない",
    ],
    answer: 3,
    explanation:
      "広いスペースやオストメイト設備などを必要とする人もいます。利用の必要性は外見だけでは分かりません。",
    source: {
      label: "日本オストミー協会｜オストメイト対応トイレ",
      url: "https://joa-net.org/toilet/",
    },
  },
  {
    id: "v2-public-hard-013",
    category: "public",
    difficulty: "hard",
    topic: "バリアフリー",
    prompt:
      "補助犬を連れた利用者に手伝いを申し出たい。伝える相手として適切なのは？",
    choices: [
      "補助犬の利用者本人",
      "犬に声をかけて進路を変えてもらう",
      "利用者に声をかける前に犬のリードを持つ",
      "利用者に同行者がいれば、本人には聞かず同行者だけに伝える",
    ],
    answer: 0,
    explanation:
      "本人へ声をかけて必要な援助を確かめます。犬の注意をそらさないようにします。",
    source: {
      label: "厚生労働省｜補助犬・皆さまへのお願い",
      url: "https://www.mhlw.go.jp/content/000489424.pdf",
    },
  },
  {
    id: "v2-public-hard-014",
    category: "public",
    difficulty: "hard",
    topic: "郵便と配送",
    prompt: "日本郵便へ転居届を出した。銀行や通販サイトに登録した住所は？",
    choices: [
      "郵便を一通受け取ると変更される",
      "それぞれで変更手続きが必要",
      "郵便局から自動ですべて変更される",
      "1年後に自動で変更される",
    ],
    answer: 1,
    explanation: "郵便の転送と、契約先が持つ登録住所の変更は別の手続きです。",
    source: {
      label: "日本郵便｜転居・転送サービス",
      url: "https://www.post.japanpost.jp/service/receive/relocation/",
    },
  },
  {
    id: "v2-public-hard-015",
    category: "public",
    difficulty: "hard",
    topic: "郵便と配送",
    prompt:
      "募集要項が「9月10日必着」。9月10日にポストへ入れれば条件を満たす？",
    choices: [
      "郵便局の窓口で当日差し出せば、到着日に関係なく満たす",
      "速達で当日差し出せば、到着日に関係なく満たす",
      "その日までの到着が必要なので投函だけでは満たさない",
      "当日の消印が付けば、到着日に関係なく満たす",
    ],
    answer: 2,
    explanation:
      "必着は到着期限です。「消印有効」とは違い、配送にかかる日数を考えます。",
  },
  {
    id: "v2-public-hard-016",
    category: "public",
    difficulty: "hard",
    topic: "郵便と配送",
    prompt:
      "「9月10日の消印有効」とある応募書類を、10日の最終取集後に投函した。注意点は？",
    choices: [
      "ポストへ入れた日付が、取集時刻に関係なく消印になる",
      "速達の表示を付ければ、取集後でも必ず当日の消印になる",
      "当日中に切手を購入していれば、その日の消印になる",
      "消印が翌日になる可能性がある",
    ],
    answer: 3,
    explanation:
      "ポストへの投函時刻と消印の日付は同じとは限りません。窓口や取集時刻を確認します。",
  },
  {
    id: "v2-public-hard-017",
    category: "public",
    difficulty: "hard",
    topic: "郵便と配送",
    prompt: "追跡画面が「引受」になった。これだけで確実に分かるのは？",
    choices: [
      "配送業者が荷物を受け付けたこと",
      "宛先を担当する配達拠点まで到着したこと",
      "配達員が受取人へ届けるために持ち出したこと",
      "受取人への配達が完了したこと",
    ],
    answer: 0,
    explanation:
      "配送状況の表示には段階があります。「引受」は受付であり、配達完了ではありません。",
    source: {
      label: "日本郵便｜郵便追跡サービス",
      url: "https://trackings.post.japanpost.jp/services/srv/search",
    },
  },
  {
    id: "v2-public-hard-018",
    category: "public",
    difficulty: "hard",
    topic: "施設の表示",
    prompt:
      "駐車料金が「最初の1時間300円、以後30分ごとに150円、端数は切上げ」。1時間10分停めると？",
    choices: ["600円", "450円", "350円", "400円"],
    answer: 1,
    explanation: "最初の300円に、追加の10分を30分枠として150円加えます。",
  },
  {
    id: "v2-public-hard-019",
    category: "public",
    difficulty: "hard",
    topic: "施設の表示",
    prompt:
      "駐車場に「最大料金は当日24時まで適用」とある。翌朝まで停めるとき、特に必要な確認は？",
    choices: [
      "当日とは入庫から24時間を意味するかを確認せず決める",
      "一度最大料金になれば翌朝も加算されないと判断する",
      "日付が変わった後の料金と最大料金の繰返し条件",
      "平日と休日で最大料金は同じと判断する",
    ],
    answer: 2,
    explanation:
      "最大料金には適用期間や繰返し条件があります。料金表の条件を読み合わせます。",
  },
  {
    id: "v2-public-hard-020",
    category: "public",
    difficulty: "hard",
    topic: "施設の表示",
    prompt:
      "施設案内が「月曜休館、月曜が祝日なら翌平日休館」。祝日の月曜の翌日が平日の火曜なら？",
    choices: [
      "月曜だけが休館",
      "月曜も火曜も必ず開館",
      "その週は休館なし",
      "火曜が休館",
    ],
    answer: 3,
    explanation: "この案内では祝日の月曜に代えて、翌平日の火曜を休館にします。",
  },
  {
    id: "v2-public-hard-021",
    category: "public",
    difficulty: "hard",
    topic: "旅行の準備",
    prompt:
      "日本出発の国際線で通常の化粧水を機内持込みする。200mL容器に50mLだけ入っている場合は？",
    choices: [
      "容器容量が100mLを超えるため通常の液体ルールでは不可",
      "中身が100mL以下なので可",
      "透明容器なら容量にかかわらず可",
      "未開封なら容量にかかわらず可",
    ],
    answer: 0,
    explanation:
      "通常の液体物は容器容量も100mL以下などの条件があります。医薬品等の例外や乗継条件は別途確認します。",
    source: {
      label: "ANA｜国際線の液体物持込み",
      url: "https://www.ana.co.jp/ja/jp/guide/boarding-procedures/baggage/international/baggage-limit/",
    },
  },
  {
    id: "v2-public-hard-022",
    category: "public",
    difficulty: "hard",
    topic: "旅行の準備",
    prompt:
      "海外便を予約したあと姓が変わった。出発前に優先して確かめることは？",
    choices: [
      "航空券だけ新姓なら、旅券は旧姓でも照合不要と考える",
      "航空券の氏名と渡航に使う旅券の氏名の扱い",
      "ホテルの予約名が新姓なら、航空券の氏名も自動で変わると考える",
      "戸籍で改姓したなら、予約済みの航空券も自動更新されると考える",
    ],
    answer: 1,
    explanation:
      "航空券とパスポートの氏名が合わないと搭乗できない場合があります。航空会社・旅券窓口へ事前確認します。",
    source: {
      label: "外務省｜旅券と航空券の氏名照合",
      url: "https://www.mofa.go.jp/mofaj/ca/pss/page3_002789.html",
    },
  },
  {
    id: "v2-public-hard-023",
    category: "public",
    difficulty: "hard",
    topic: "旅行の準備",
    prompt: "渡航先への乗継ぎで別の国を通る。ビザや通過条件の確認は？",
    choices: [
      "空港内ならすべての国で確認不要",
      "航空券が一枚なら必ず不要",
      "乗継ぎ国の条件も確認する",
      "最終目的地だけを確認する",
    ],
    answer: 2,
    explanation:
      "乗継ぎにも査証や入国条件が関わる場合があります。経路ごとの最新条件を確認します。",
    source: {
      label: "外務省｜ビザ",
      url: "https://www.mofa.go.jp/mofaj/comment/faq/toko/visa.html",
    },
  },
  {
    id: "v2-public-hard-024",
    category: "public",
    difficulty: "hard",
    topic: "旅行の準備",
    prompt:
      "旅程表の到着時刻に「翌日」とある。宿泊予約と合わせる際に確認するのは？",
    choices: [
      "日本の出発日と同じ日付",
      "日本にいる家族の時計で、到着の連絡を受ける日",
      "航空券の購入日の時差",
      "到着地の現地日付",
    ],
    answer: 3,
    explanation:
      "時差や日付変更線の影響を考え、到着地の現地日付で宿泊日を確認します。",
  },
  {
    id: "v2-public-hard-025",
    category: "public",
    difficulty: "hard",
    topic: "公共の案内語",
    prompt:
      "日本の「通行止め」と「車両通行止め」の標識について、基本的な対象の違いは？",
    choices: [
      "通行止めは歩行者も対象、車両通行止めは車両が対象",
      "どちらも自動車だけが対象",
      "車両通行止めは自転車を対象に含まない",
      "通行止めは車両だけ、車両通行止めは歩行者も対象",
    ],
    answer: 0,
    explanation:
      "通行止めは歩行者や車両などが対象です。車両通行止めの車両には自転車も含まれます。現地では補助標識や係員の指示も確認します。",
    source: {
      label: "警察庁｜交通の方法に関する教則",
      url: "https://www.npa.go.jp/bureau/traffic/20241101kyousoku.pdf",
    },
  },
  {
    id: "v2-digital-easy-001",
    category: "digital",
    difficulty: "easy",
    prompt: "スマートフォンの「保存容量」が主に表すものは？",
    choices: [
      "写真やアプリなどを保存できるデータの量",
      "画面の明るさ",
      "電池が満充電になるまでの時間",
      "本体の重さ",
    ],
    answer: 0,
    explanation:
      "保存容量が大きいほど、写真・動画・アプリなどを多く保存できます。",
    topic: "端末とアプリ",
  },
  {
    id: "v2-digital-easy-002",
    category: "digital",
    difficulty: "easy",
    prompt:
      "Windows や macOS など、パソコンの基本動作を管理するソフトウェアは？",
    choices: ["写真編集ソフト", "OS", "ブラウザー", "表計算ソフト"],
    answer: 1,
    explanation:
      "OS はパソコンの基本的な動作や、ほかのアプリの利用を支えるソフトウェアです。",
    topic: "端末とアプリ",
  },
  {
    id: "v2-digital-easy-003",
    category: "digital",
    difficulty: "easy",
    prompt: "ウェブページを見るためのソフトウェアを何という？",
    choices: ["表計算ソフト", "圧縮ソフト", "ブラウザー", "画像編集ソフト"],
    answer: 2,
    explanation:
      "ブラウザーはウェブページを取得して表示します。検索エンジンは情報を探すサービスです。",
    topic: "ブラウザー",
  },
  {
    id: "v2-digital-easy-004",
    category: "digital",
    difficulty: "easy",
    prompt: "ウェブ上のページの場所を表す「https://...」という文字列は？",
    choices: ["ファイルの容量", "メールの件名", "パスワード", "URL"],
    answer: 3,
    explanation: "URL はウェブページなどの場所を表すアドレスです。",
    topic: "ブラウザー",
  },
  {
    id: "v2-digital-easy-005",
    category: "digital",
    difficulty: "easy",
    prompt: "検索エンジンを使う主な目的は？",
    choices: [
      "言葉を手がかりに関連する情報を探す",
      "自分の端末の電池残量を調べる",
      "写真の色を塗り替える",
      "紙の資料を自動で製本する",
    ],
    answer: 0,
    explanation:
      "調べたいことを表す言葉を入れると、関連するページなどを探せます。",
    topic: "検索と情報",
  },
  {
    id: "v2-digital-easy-006",
    category: "digital",
    difficulty: "easy",
    prompt: "手元の写真をインターネット上のサービスへ送る操作は？",
    choices: ["印刷", "アップロード", "ダウンロード", "トリミング"],
    answer: 1,
    explanation:
      "端末からサーバーなどへデータを送ることを、アップロードといいます。",
    topic: "写真とファイル",
  },
  {
    id: "v2-digital-easy-007",
    category: "digital",
    difficulty: "easy",
    prompt: "インターネット上のファイルを手元の端末へ受け取る操作は？",
    choices: ["アップロード", "初期化", "ダウンロード", "圧縮"],
    answer: 2,
    explanation:
      "サーバーなどから端末へデータを受け取ることを、ダウンロードといいます。",
    topic: "写真とファイル",
  },
  {
    id: "v2-digital-easy-008",
    category: "digital",
    difficulty: "easy",
    prompt: "クラウドストレージは、どのようなデータの保存場所？",
    choices: [
      "紙の書類専用の保存場所",
      "電源を切るとすべて消える保存場所",
      "必ず端末内だけにある保存場所",
      "ネットワーク経由で利用する保存場所",
    ],
    answer: 3,
    explanation: "提供者のサーバーなどへ保存し、対応する端末から利用できます。",
    topic: "端末とアプリ",
  },
  {
    id: "v2-digital-easy-009",
    category: "digital",
    difficulty: "easy",
    prompt: "データの紛失に備えて、別の場所にも複製を保存しておくことは？",
    choices: ["バックアップ", "ログアウト", "トリミング", "スクロール"],
    answer: 0,
    explanation:
      "バックアップは、故障や誤削除などで失ったデータを復元するための備えです。",
    topic: "端末とアプリ",
  },
  {
    id: "v2-digital-easy-010",
    category: "digital",
    difficulty: "easy",
    prompt: "ほかの人に推測されにくいパスワードの作り方は？",
    choices: [
      "同じ数字を 4 桁並べる",
      "十分に長く、名前や誕生日などから推測しにくくする",
      "自分の氏名だけにする",
      "自分の誕生日だけにする",
    ],
    answer: 1,
    explanation:
      "長さと推測されにくさが大切です。管理機能で生成したものを使う方法もあります。",
    source: {
      label: "IPA｜不正ログインの対策",
      url: "https://www.ipa.go.jp/security/anshin/attention/2025/mgdayori20250828.html",
    },
    topic: "アカウント",
  },
  {
    id: "v2-digital-easy-011",
    category: "digital",
    difficulty: "easy",
    prompt: "実在する会社を装い、偽サイトでパスワードなどを入力させる手口は？",
    choices: ["バックアップ", "ストリーミング", "フィッシング", "ファイル圧縮"],
    answer: 2,
    explanation:
      "偽のメールやメッセージから誘導し、ログイン情報などを盗む手口です。",
    topic: "アカウント",
  },
  {
    id: "v2-digital-easy-012",
    category: "digital",
    difficulty: "easy",
    prompt: "不正な動作をするように作られたソフトウェアの総称は？",
    choices: ["表計算ソフト", "写真ビューアー", "ブラウザー", "マルウェア"],
    answer: 3,
    explanation:
      "ウイルスなどの悪意あるソフトウェアを、まとめてマルウェアと呼びます。",
    topic: "端末とアプリ",
  },
  {
    id: "v2-digital-easy-013",
    category: "digital",
    difficulty: "easy",
    prompt:
      "ファイルを使えなくするなどして、身代金を要求する不正なソフトウェアは？",
    choices: [
      "ランサムウェア",
      "迷惑メールの振り分け機能",
      "通常の画面ロック",
      "バックアップソフト",
    ],
    answer: 0,
    explanation:
      "ランサムウェアは、データを暗号化するなどして金銭を要求する攻撃に使われます。",
    topic: "写真とファイル",
  },
  {
    id: "v2-digital-easy-014",
    category: "digital",
    difficulty: "easy",
    prompt:
      "写真を SNS へ投稿する前に、住所が知られる手がかりとして確認したいものは？",
    choices: [
      "画面の明るさの設定",
      "背景に写った郵便物の宛名",
      "写真の縦横の比率",
      "写真を撮った回数",
    ],
    answer: 1,
    explanation: "郵便物や表札などから、意図せず住所が伝わることがあります。",
    topic: "通知と公開",
  },
  {
    id: "v2-digital-easy-015",
    category: "digital",
    difficulty: "easy",
    prompt: "Wi-Fi が主に使う通信方法は？",
    choices: [
      "USB ケーブルによる通信",
      "紙への印刷",
      "電波による無線通信",
      "画面の光だけを使う通信",
    ],
    answer: 2,
    explanation:
      "Wi-Fi は無線で機器をつなぎます。Wi-Fi への接続と、インターネットへの接続は同じ意味ではありません。",
    topic: "通信と接続",
  },
  {
    id: "v2-digital-easy-016",
    category: "digital",
    difficulty: "easy",
    prompt: "スマートフォンと近くの無線イヤホンの接続などによく使う技術は？",
    choices: ["表計算", "画像のトリミング", "PDF", "Bluetooth"],
    answer: 3,
    explanation:
      "Bluetooth は、イヤホンなどの周辺機器と近い距離で無線通信するために使われます。",
    topic: "端末とアプリ",
  },
  {
    id: "v2-digital-easy-017",
    category: "digital",
    difficulty: "easy",
    prompt: "USB ケーブルを使う用途として一般的なのは？",
    choices: [
      "対応する機器の接続や充電",
      "紙への印刷そのもの",
      "画面の傷の修復",
      "インクの補充",
    ],
    answer: 0,
    explanation:
      "USB は機器の接続やデータのやり取り、充電などに使います。対応する機能は機器やケーブルで異なります。",
    topic: "通信と接続",
  },
  {
    id: "v2-digital-easy-018",
    category: "digital",
    difficulty: "easy",
    prompt: "画面に表示されている内容を画像として記録する操作は？",
    choices: ["ログイン", "スクリーンショット", "再起動", "解凍"],
    answer: 1,
    explanation:
      "スクリーンショットは画面の静止画像です。画面を動画で記録する操作とは異なります。",
    topic: "表示と音声",
  },
  {
    id: "v2-digital-easy-019",
    category: "digital",
    difficulty: "easy",
    prompt: "文書のレイアウトを保って配布するためによく使うファイル形式は？",
    choices: ["MP3", "WAV", "PDF", "JPEG の動画"],
    answer: 2,
    explanation:
      "PDF は文書形式です。契約書や説明書など、見た目を保って共有したい文書によく使われます。",
    topic: "写真とファイル",
  },
  {
    id: "v2-digital-easy-020",
    category: "digital",
    difficulty: "easy",
    prompt: "表計算ソフトで、行と列が交わる一つのマスを何という？",
    choices: ["フォルダー", "ファイル", "シート", "セル"],
    answer: 3,
    explanation: "セルには文字・数値・数式などを入力できます。",
    topic: "表と数値",
  },
  {
    id: "v2-digital-easy-021",
    category: "digital",
    difficulty: "easy",
    prompt: "パソコンでいう「ハードウェア」に当たるものは？",
    choices: ["キーボード", "OS", "ブラウザーのプログラム", "表計算アプリ"],
    answer: 0,
    explanation:
      "ハードウェアは物理的な機器です。プログラムなどはソフトウェアと呼びます。",
    topic: "端末とアプリ",
  },
  {
    id: "v2-digital-easy-022",
    category: "digital",
    difficulty: "easy",
    prompt: "文字をパソコンへ入力するための装置は？",
    choices: ["プロジェクター", "キーボード", "プリンター", "スピーカー"],
    answer: 1,
    explanation:
      "キーボードは入力装置です。文字や記号を入力したり、操作の指示を出したりできます。",
    topic: "端末とアプリ",
  },
  {
    id: "v2-digital-easy-023",
    category: "digital",
    difficulty: "easy",
    prompt: "パソコンの処理結果を画面として表示する装置は？",
    choices: ["マイク", "マウス", "ディスプレイ", "スキャナー"],
    answer: 2,
    explanation:
      "ディスプレイは画面を表示する装置です。タッチパネル付きなら入力の機能も持ちます。",
    topic: "表示と音声",
  },
  {
    id: "v2-digital-easy-024",
    category: "digital",
    difficulty: "easy",
    prompt: "ファイルを整理して入れておく、画面上の入れ物は？",
    choices: ["スクロールバー", "アイコンの大きさ", "カーソル", "フォルダー"],
    answer: 3,
    explanation:
      "フォルダーを使うと、用途や種類ごとにファイルをまとめられます。",
    topic: "写真とファイル",
  },
  {
    id: "v2-digital-easy-025",
    category: "digital",
    difficulty: "easy",
    prompt: "ソフトウェアの更新には、機能追加以外にどのような目的がある？",
    choices: [
      "不具合や安全性の問題を修正する",
      "本体の重さを軽くする",
      "画面の傷を直す",
      "印刷用紙を補充する",
    ],
    answer: 0,
    explanation:
      "更新には不具合の修正や、不正な攻撃に使われる弱点への対策も含まれます。",
    topic: "端末とアプリ",
  },
  {
    id: "v2-digital-normal-001",
    category: "digital",
    difficulty: "normal",
    prompt: "1 枚 5 MB の写真を 100 枚保存すると、写真の合計容量は？",
    choices: ["500 MB", "20 MB", "100 MB", "5,000 MB"],
    answer: 0,
    explanation: "1 枚の容量に枚数を掛け、5 × 100 = 500 MB です。",
    topic: "写真とファイル",
  },
  {
    id: "v2-digital-normal-002",
    category: "digital",
    difficulty: "normal",
    prompt:
      "ウェブページのスクリーンショットを保存した。その後ページが更新されると、保存した画像は？",
    choices: [
      "元ページのリンクを保存したものなので常に最新になる",
      "撮影した時点の表示のまま",
      "同じWi-Fiにつなぐたびに最新の表示へ置き換わる",
      "スクリーンショットを開くと元ページを再取得する",
    ],
    answer: 1,
    explanation:
      "スクリーンショットは、その時点の画面を記録した画像です。元のページと連動して変わりません。",
    topic: "ブラウザー",
  },
  {
    id: "v2-digital-normal-003",
    category: "digital",
    difficulty: "normal",
    prompt:
      "端末の保存容量がいっぱいになった。保存容量を空けることに直接つながる操作は？",
    choices: [
      "保存写真を同じ端末内の別フォルダーへ移す",
      "開いているアプリを閉じる",
      "不要な保存済み動画を削除する",
      "ブラウザーの表示を縮小する",
    ],
    answer: 2,
    explanation:
      "動画などの保存データを減らすと空き容量が増えます。必要なデータは保存先を確認してから整理します。",
    topic: "端末とアプリ",
  },
  {
    id: "v2-digital-normal-004",
    category: "digital",
    difficulty: "normal",
    prompt: "多くの表計算ソフトで、数式の先頭に付ける記号は？",
    choices: ["#", "@", "%", "="],
    answer: 3,
    explanation:
      "一般に「=」から始めることで、計算式として扱われます。例えば「=2+3」は計算結果を表示します。",
    topic: "表と数値",
  },
  {
    id: "v2-digital-normal-005",
    category: "digital",
    difficulty: "normal",
    prompt:
      "複数のファイルをまとめたり圧縮したりして送るときに使われる形式は？",
    choices: ["ZIP", "JPEG", "MP3", "PNG"],
    answer: 0,
    explanation:
      "ZIP はファイルをまとめる形式で、容量を圧縮することもできます。",
    topic: "写真とファイル",
  },
  {
    id: "v2-digital-normal-006",
    category: "digital",
    difficulty: "normal",
    prompt: "デジタル写真によく使われるファイル形式は？",
    choices: ["WAV", "JPEG", "TXT", "MP3"],
    answer: 1,
    explanation:
      "JPEG は画像の形式です。MP3 や WAV は音声、TXT は主に文字を保存します。",
    topic: "写真とファイル",
  },
  {
    id: "v2-digital-normal-007",
    category: "digital",
    difficulty: "normal",
    prompt: "写真を「トリミングする」とは？",
    choices: [
      "写真を左右に反転する",
      "画像全体を白黒にする",
      "必要な範囲を残して周囲を切り取る",
      "写真の全体を同じ比率で縮小する",
    ],
    answer: 2,
    explanation:
      "不要な周囲を切り取ったり、見せたい部分に範囲を絞ったりする編集です。",
    topic: "写真とファイル",
  },
  {
    id: "v2-digital-normal-008",
    category: "digital",
    difficulty: "normal",
    prompt:
      "ブラウザーの文字が小さく読みにくいとき、表示を大きくする一般的な機能は？",
    choices: [
      "閲覧履歴の消去",
      "再読み込み",
      "ブックマークへの登録",
      "ページの拡大表示",
    ],
    answer: 3,
    explanation: "拡大表示を使うと、ページの文字や画像を大きく表示できます。",
    topic: "ブラウザー",
  },
  {
    id: "v2-digital-normal-009",
    category: "digital",
    difficulty: "normal",
    prompt: "検索結果に「広告」「スポンサー」などと表示されている意味は？",
    choices: [
      "広告として掲載されている",
      "内容の正確さが保証されている",
      "公的機関が書いた記事だけである",
      "閲覧がすべて有料である",
    ],
    answer: 0,
    explanation:
      "広告であることを示す表示です。掲載順や見た目だけで、情報の正確さを判断することはできません。",
    topic: "検索と情報",
  },
  {
    id: "v2-digital-normal-010",
    category: "digital",
    difficulty: "normal",
    prompt: "メールの「添付ファイル」とは？",
    choices: [
      "送信者の表示名",
      "本文と一緒に送る文書や写真などのファイル",
      "受信日時だけ",
      "メールの件名",
    ],
    answer: 1,
    explanation: "本文とは別に、写真や文書などのデータを付けて送ったものです。",
    topic: "メール",
  },
  {
    id: "v2-digital-normal-011",
    category: "digital",
    difficulty: "normal",
    prompt:
      "共有ファイルの設定を「リンクを知っている全員が閲覧可」にした。誰が見られる？",
    choices: [
      "同じ家にいる人だけ",
      "最初に送った相手だけ",
      "そのリンクを受け取った第三者も見られる",
      "自分の連絡先に登録した人だけ",
    ],
    answer: 2,
    explanation:
      "リンクが転送されれば、想定していなかった人も見られる可能性があります。",
    topic: "通知と公開",
  },
  {
    id: "v2-digital-normal-012",
    category: "digital",
    difficulty: "normal",
    prompt: "パソコンから席を離れるときの「画面ロック」の役割は？",
    choices: [
      "保存済みファイルをすべて消す",
      "ほかの人へ画面を共有する",
      "使用中の文書を自動で公開する",
      "他人に操作されにくくする",
    ],
    answer: 3,
    explanation: "画面ロックを解除するには、設定した認証などが必要になります。",
    topic: "表示と音声",
  },
  {
    id: "v2-digital-normal-013",
    category: "digital",
    difficulty: "normal",
    prompt:
      "予期しない添付ファイルが知人のメールから届いた。開く前の確認として適切なのは？",
    choices: [
      "いつもの連絡手段で送ったか本人に確かめる",
      "ファイル名が短ければ開く",
      "件名が自分宛てなら開く",
      "受信時刻が昼なら開く",
    ],
    answer: 0,
    explanation:
      "知人のアカウントが乗っ取られたり、送信者が偽装されたりする場合もあります。",
    topic: "ネットの安全",
  },
  {
    id: "v2-digital-normal-014",
    category: "digital",
    difficulty: "normal",
    prompt:
      "スマートフォンで Wi-Fi を切っても、携帯電話会社のデータ通信が使える状態なら？",
    choices: [
      "写真を見ることもできなくなる",
      "携帯回線でインターネットを利用できる",
      "メールのアカウントが消える",
      "インターネットは一切使えなくなる",
    ],
    answer: 1,
    explanation:
      "Wi-Fi と携帯回線は別の接続方法です。携帯回線を使うと、契約のデータ使用量に数えられます。",
    topic: "通信と接続",
  },
  {
    id: "v2-digital-normal-015",
    category: "digital",
    difficulty: "normal",
    prompt: "アドレスが「https://」で始まるサイトについて、正しい理解は？",
    choices: [
      "運営者の評判が必ず良い",
      "内容は公的機関が確認済みである",
      "通信は保護されるが、内容が正しいとは限らない",
      "商品が届くことまで保証される",
    ],
    answer: 2,
    explanation:
      "HTTPS は通信途中の盗み見や改ざんを防ぐ仕組みです。偽サイトでも使われることがあります。",
    topic: "端末とアプリ",
  },
  {
    id: "v2-digital-normal-016",
    category: "digital",
    difficulty: "normal",
    prompt: "アプリを「インストールする」とは？",
    choices: [
      "アプリの画面を写真に撮る",
      "アプリの名前を変更するだけ",
      "端末を充電する",
      "端末で使えるようにソフトウェアを組み込む",
    ],
    answer: 3,
    explanation:
      "ダウンロードしただけでは使える状態にならない場合があり、インストールで利用の準備をします。",
    topic: "端末とアプリ",
  },
  {
    id: "v2-digital-normal-017",
    category: "digital",
    difficulty: "normal",
    prompt: "ブラウザーの「閲覧履歴」を消すだけでは、通常残るものは？",
    choices: [
      "すでにダウンロードして保存した文書ファイル",
      "消去対象に選んだ閲覧履歴",
      "履歴一覧にある訪問日時",
      "履歴一覧にあるページ名",
    ],
    answer: 0,
    explanation:
      "閲覧履歴と、端末へ保存したファイルは別です。履歴を消してもファイル自体が削除されるわけではありません。",
    topic: "ブラウザー",
  },
  {
    id: "v2-digital-normal-018",
    category: "digital",
    difficulty: "normal",
    prompt: "ブラウザーのブックマークが主に保存するものは？",
    choices: [
      "相手のパスワード",
      "ページの場所を示すリンク",
      "端末の電池残量",
      "ページにある全動画の複製",
    ],
    answer: 1,
    explanation:
      "ブックマークはあとから訪問するためのリンクです。ページの全内容を保存する機能とは異なります。",
    topic: "ブラウザー",
  },
  {
    id: "v2-digital-normal-019",
    category: "digital",
    difficulty: "normal",
    prompt: "メールで、他の受信者に宛先アドレスを表示させずに送る欄は？",
    choices: ["本文", "Cc", "Bcc", "件名"],
    answer: 2,
    explanation:
      "Bcc の宛先は、ほかの受信者には通常表示されません。送信者には確認できます。",
    topic: "メール",
  },
  {
    id: "v2-digital-normal-020",
    category: "digital",
    difficulty: "normal",
    prompt:
      "届くはずのメールが見つからないとき、迷惑メール欄も確認する理由は？",
    choices: [
      "迷惑メール欄だけが新着を保存するから",
      "送信済みメールはすべてそこへ移るから",
      "添付ファイル付きメールは必ず消えるから",
      "必要なメールが誤って振り分けられることがあるから",
    ],
    answer: 3,
    explanation:
      "迷惑メールの判定には誤りがあり、必要なメールが入ってしまうこともあります。",
    topic: "メール",
  },
  {
    id: "v2-digital-normal-021",
    category: "digital",
    difficulty: "normal",
    prompt:
      "写真加工アプリが位置情報へのアクセスを求めた。許可の判断に役立つ確認は？",
    choices: [
      "使いたい機能に位置情報が必要か",
      "アプリのアイコンが好みの色か",
      "名前が英語か日本語か",
      "保存した写真が横向きか",
    ],
    answer: 0,
    explanation:
      "権限は情報や機能へのアクセスを認めるものです。必要な用途に応じて設定します。",
    topic: "通知と公開",
  },
  {
    id: "v2-digital-normal-022",
    category: "digital",
    difficulty: "normal",
    prompt: "パスワードに加えて、自分の端末での確認も必要にする主な目的は？",
    choices: [
      "通信料金を一定にする",
      "パスワードだけが漏れても侵入されにくくする",
      "画面の解像度を上げる",
      "端末の保存容量を増やす",
    ],
    answer: 1,
    explanation:
      "別の確認を組み合わせることで、不正ログインへの対策を強められます。",
    source: {
      label: "IPA｜不正ログインの対策",
      url: "https://www.ipa.go.jp/security/anshin/attention/2025/mgdayori20250828.html",
    },
    topic: "アカウント",
  },
  {
    id: "v2-digital-normal-023",
    category: "digital",
    difficulty: "normal",
    prompt:
      "複数のサービスで同じパスワードを使うと、どのようなリスクが増える？",
    choices: [
      "通信速度が一定になる",
      "すべての画面が同じ色になる",
      "一つの漏えいが他のサービスへの侵入につながる",
      "ファイルが自動で小さくなる",
    ],
    answer: 2,
    explanation:
      "漏れたパスワードを別のサービスでも試す攻撃があるため、使い回しは避けることが大切です。",
    source: {
      label: "IPA｜不正ログインの対策",
      url: "https://www.ipa.go.jp/security/anshin/attention/2025/mgdayori20250828.html",
    },
    topic: "アカウント",
  },
  {
    id: "v2-digital-normal-024",
    category: "digital",
    difficulty: "normal",
    prompt: "生成 AI の回答を読むときの基本的な注意点は？",
    choices: [
      "丁寧な言葉なら内容も正しい",
      "長い回答ほど間違いがない",
      "数字があれば確認は不要である",
      "自然な文章でも誤った内容が含まれることがある",
    ],
    answer: 3,
    explanation:
      "生成 AI は、もっともらしい誤情報を出す場合があります。重要な事実は元の資料などで確認します。",
    topic: "検索と情報",
  },
  {
    id: "v2-digital-normal-025",
    category: "digital",
    difficulty: "normal",
    prompt:
      "SNS のニュースを広める前に、古い情報の再拡散を避けるため確認したいものは？",
    choices: [
      "最初に発表された日付と元の記事",
      "文字の大きさ",
      "コメント欄の色",
      "共有ボタンの形",
    ],
    answer: 0,
    explanation:
      "過去のニュースが新しい出来事のように広がる場合があります。日付と元の情報を確認します。",
    topic: "通知と公開",
  },
  {
    id: "v2-digital-hard-001",
    category: "digital",
    difficulty: "hard",
    prompt:
      "共同作業用の文書を、内容確認だけしてもらう相手へ共有する。変更を防ぐのに合う権限は？",
    choices: [
      "閲覧のみ",
      "編集を許可する",
      "文書の所有者として登録する",
      "リンクを知る人全員に編集を許可する",
    ],
    answer: 0,
    explanation:
      "内容を読むだけなら閲覧権限で足ります。編集権限を付けると、相手が本文を書き換えられる場合があります。",
    topic: "通知と公開",
  },
  {
    id: "v2-digital-hard-002",
    category: "digital",
    difficulty: "hard",
    prompt:
      "写真を「同期」するサービスで、1 台から削除すると他の端末でも消えることがあるのはなぜ？",
    choices: [
      "最初の保存内容を一度だけ複製するため",
      "各保存先の状態をそろえるため",
      "撮影日が同じ画像をすべて不要と判断するため",
      "一定期間を過ぎた写真を自動で削除する設定だから",
    ],
    answer: 1,
    explanation:
      "同期は変更や削除も反映することがあります。削除前の状態を残すバックアップとは役割が異なります。",
    topic: "写真とファイル",
  },
  {
    id: "v2-digital-hard-003",
    category: "digital",
    difficulty: "hard",
    prompt:
      "店の Wi-Fi と似た名前の接続先が二つ表示された。店のものを確かめる方法として適切なのは？",
    choices: [
      "名前が短い方を店のものと決める",
      "鍵のマークがない方を店のものと決める",
      "店の案内やスタッフに接続先名を確認する",
      "電波が強い方を店のものと決める",
    ],
    answer: 2,
    explanation:
      "接続先名は似せることができます。強さや名前の見た目だけでは、提供者を確かめられません。",
    topic: "通信と接続",
  },
  {
    id: "v2-digital-hard-004",
    category: "digital",
    difficulty: "hard",
    prompt:
      "「アカウント停止直前」と書かれたメールにログイン用リンクがある。確認する方法として適切なのは？",
    choices: [
      "メールのリンクから直ちにパスワードを入力する",
      "メールにパスワードを返信して確認する",
      "表示名が企業名ならリンクを信用する",
      "普段使う公式アプリなどから通知を確認する",
    ],
    answer: 3,
    explanation:
      "急がせるメールは偽装の可能性があります。いつもの公式の入口から、実際の状態を確認します。",
    topic: "アカウント",
  },
  {
    id: "v2-digital-hard-005",
    category: "digital",
    difficulty: "hard",
    prompt:
      "使っていたスマートフォンを人へ譲る。個人データについて適切な準備は？",
    choices: [
      "必要なデータを保存し、メーカーの手順で消去・初期化する",
      "ログアウトだけして写真は残す",
      "SIMカードを抜くだけにする",
      "ホーム画面のアイコンだけを消す",
    ],
    answer: 0,
    explanation:
      "連絡先や写真などが残らないように消去します。必要なデータの保存やアカウント解除など、端末の手順を確認します。",
    source: {
      label: "IPA｜ネット接続製品の安全な利用",
      url: "https://www.ipa.go.jp/security/guide/vuln/forconsumer.html",
    },
    topic: "端末とアプリ",
  },
  {
    id: "v2-digital-hard-006",
    category: "digital",
    difficulty: "hard",
    prompt: "同じ長さの動画なら、一般に高画質の設定ほどどうなる？",
    choices: [
      "画質の違いは再生画面だけに関係し容量は変わらない",
      "通信量や保存容量が増えやすい",
      "高画質ほど常に強く圧縮され容量が減る",
      "通信量は音声の長さだけで決まる",
    ],
    answer: 1,
    explanation:
      "高画質ではより多くの情報を扱うため、通信量やファイルサイズが大きくなりやすくなります。",
    topic: "写真とファイル",
  },
  {
    id: "v2-digital-hard-007",
    category: "digital",
    difficulty: "hard",
    prompt:
      "データ残量が 1,200 MB ある。1 本 350 MB の動画を 3 本受信すると、ほかの通信がなければ残りは？",
    choices: ["350 MB", "1,050 MB", "150 MB", "850 MB"],
    answer: 2,
    explanation: "350 × 3 = 1,050 MB を使うので、1,200 − 1,050 = 150 MB です。",
    topic: "通信と接続",
  },
  {
    id: "v2-digital-hard-008",
    category: "digital",
    difficulty: "hard",
    prompt:
      "通信回線が混み、動画が何度も止まる。通信量を減らして再生しやすくする設定は？",
    choices: [
      "画面を全画面表示にする",
      "再生する画面の明るさを下げる",
      "音量を小さくする",
      "画質を下げる",
    ],
    answer: 3,
    explanation:
      "画質を下げると送受信するデータが少なくなり、回線が遅いときでも再生しやすくなります。",
    topic: "通信と接続",
  },
  {
    id: "v2-digital-hard-009",
    category: "digital",
    difficulty: "hard",
    prompt:
      "写真ファイルの名前の末尾を「.jpg」から「.pdf」へ書き換えただけでは？",
    choices: [
      "内容が PDF に変換されたことにはならない",
      "拡張子を変更すれば内容もPDFへ変換される",
      "拡張子は表示名なので開くアプリにも影響しない",
      "変更と同時に画像が文字として認識される",
    ],
    answer: 0,
    explanation:
      "名前の末尾は形式の手がかりです。形式を変えるには、対応する変換や保存の操作が必要です。",
    topic: "写真とファイル",
  },
  {
    id: "v2-digital-hard-010",
    category: "digital",
    difficulty: "hard",
    prompt: "ブラウザーのシークレットモードでも、できるとは限らないことは？",
    choices: [
      "通常の閲覧履歴を端末に残さず終了すること",
      "勤務先や通信事業者から閲覧先を完全に隠すこと",
      "通常とは別の閲覧状態でページを開くこと",
      "ウェブページを表示すること",
    ],
    answer: 1,
    explanation:
      "端末に残す履歴などを制限する機能です。接続先やネットワーク側からも完全に匿名になるわけではありません。",
    source: {
      label: "Google｜シークレットモード",
      url: "https://support.google.com/chrome/answer/95464?hl=ja",
    },
    topic: "ブラウザー",
  },
  {
    id: "v2-digital-hard-011",
    category: "digital",
    difficulty: "hard",
    prompt:
      "「本人確認のため、届いた認証コードを教えて」と第三者から頼まれた。コードを渡すと起こり得ることは？",
    choices: [
      "コードは届いた端末でしか入力できない",
      "自分が声で許可しない限り、コードは有効にならない",
      "相手が自分のアカウントへのログインなどに使う",
      "短時間で期限切れになるので、その間も相手は使えない",
    ],
    answer: 2,
    explanation:
      "認証コードはログインなどの本人確認に使います。有効な間に相手が入力する可能性があるため、第三者へ渡さない情報です。",
    topic: "アカウント",
  },
  {
    id: "v2-digital-hard-012",
    category: "digital",
    difficulty: "hard",
    prompt:
      "誤送信したメールを自分の「送信済み」から削除した。それだけで相手側のメールは？",
    choices: [
      "相手が未読なら自動で消える",
      "同じメールサービスの相手だけは自動で消える",
      "次に自分がログインした時点で相手側も消える",
      "通常は消えない",
    ],
    answer: 3,
    explanation:
      "自分の保存分と相手が受信した分は別です。サービス固有の取り消し機能とは区別します。",
    topic: "メール",
  },
  {
    id: "v2-digital-hard-013",
    category: "digital",
    difficulty: "hard",
    prompt:
      "公開した写真を後から非公開にした。すでに他人が保存したコピーについて正しいものは？",
    choices: [
      "非公開にしただけでは、相手のコピーは消せない",
      "公開範囲の変更がダウンロード済みのファイルにも反映される",
      "元の投稿を削除すれば保存済みファイルも削除できる",
      "投稿を非公開にすれば保存済みファイルは開けなくなる",
    ],
    answer: 0,
    explanation:
      "公開範囲の変更が届くのはサービス上の公開状態です。すでに複製されたデータには及ばない場合があります。",
    topic: "通知と公開",
  },
  {
    id: "v2-digital-hard-014",
    category: "digital",
    difficulty: "hard",
    prompt:
      "災害の写真として投稿された画像が、昔の別の出来事の写真か確かめたい。役立つ調べ方は？",
    choices: [
      "投稿が最近の日時なら画像も最近の撮影と判断する",
      "画像検索で過去の掲載先や掲載日を探す",
      "共有数が多い方の説明を事実と判断する",
      "投稿者のプロフィール画像だけで撮影時期を判断する",
    ],
    answer: 1,
    explanation:
      "同じ画像の過去の掲載例を探すと、別の時期の写真が使われていないか確認する手がかりになります。",
    topic: "通知と公開",
  },
  {
    id: "v2-digital-hard-015",
    category: "digital",
    difficulty: "hard",
    prompt:
      "記事の一文だけが引用され、元の記事と逆の意味に見える。まず確認すべきものは？",
    choices: [
      "引用した人への賛同コメントだけ",
      "同じ引用を載せた別の投稿の数",
      "引用の前後を含めた元の文章",
      "元の文章を読んでいない人の多数意見",
    ],
    answer: 2,
    explanation:
      "条件や否定の部分が省かれると、意味が変わることがあります。元の文脈を確認します。",
    topic: "検索と情報",
  },
  {
    id: "v2-digital-hard-016",
    category: "digital",
    difficulty: "hard",
    prompt: "小さく縮小して細部を失った画像を、後で単純に大きく拡大すると？",
    choices: [
      "元の画素情報が自動的に復元される",
      "拡大した分だけ元の細部の情報も増える",
      "保存形式を変えなくても必ず輪郭が元に戻る",
      "元の細部がそのまま戻るわけではない",
    ],
    answer: 3,
    explanation:
      "拡大表示だけでは、失われた情報は復元しません。編集前の画像を残しておくとやり直しやすくなります。",
    topic: "端末とアプリ",
  },
  {
    id: "v2-digital-hard-017",
    category: "digital",
    difficulty: "hard",
    prompt:
      "表計算で 3.14159 を、小数第 2 位まで表示する書式にした。通常、計算に使う元の数値は？",
    choices: [
      "3.14159 のまま",
      "文字列の「3.14」になる",
      "必ず 3.14 に置き換わる",
      "必ず 3 に置き換わる",
    ],
    answer: 0,
    explanation:
      "表示する桁数の設定と、数値自体を丸める計算は別です。通常は表示されていない桁も計算に使います。",
    topic: "表と数値",
  },
  {
    id: "v2-digital-hard-018",
    category: "digital",
    difficulty: "hard",
    prompt:
      "名簿の氏名列と得点列を、対応を保って得点順に並べたい。適切な操作は？",
    choices: [
      "得点列だけを単独で並べ替える",
      "氏名と得点を含む表全体を並べ替える",
      "氏名列だけを五十音順にする",
      "氏名列と得点列を別々に並べ替える",
    ],
    answer: 1,
    explanation:
      "一列だけを動かすと、名前と得点の組み合わせが崩れます。行全体を一緒に並べ替えます。",
    topic: "表と数値",
  },
  {
    id: "v2-digital-hard-019",
    category: "digital",
    difficulty: "hard",
    prompt:
      "表計算で数値「0.25」に、百分率の表示形式を設定すると一般にどう表示される？",
    choices: ["2.5％", "250％", "25％", "0.25％"],
    answer: 2,
    explanation:
      "百分率は数値を 100 倍した値に％を付けて表します。0.25 は全体の 4 分の 1、つまり 25％です。",
    topic: "表と数値",
  },
  {
    id: "v2-digital-hard-020",
    category: "digital",
    difficulty: "hard",
    prompt:
      "スマホで「アプリを閉じる」ことと「アカウントからログアウトする」ことの違いは？",
    choices: [
      "アプリを閉じれば常にログアウトと同じ状態になる",
      "ログアウトは画面を閉じるだけで認証状態には関係しない",
      "どちらの操作でもサービスへの再登録が必要になる",
      "アプリを閉じただけではログイン状態が残ることがある",
    ],
    answer: 3,
    explanation:
      "アプリの画面を閉じても、次に開くとログイン状態のままの場合があります。",
    topic: "アカウント",
  },
  {
    id: "v2-digital-hard-021",
    category: "digital",
    difficulty: "hard",
    prompt:
      "ウェブ閲覧中に「感染したので、この電話番号へ連絡」と警告が出た。安全な確認につながる対応は？",
    choices: [
      "表示番号へ電話せず画面を閉じ、必要なら公式窓口で確認する",
      "警告に書かれた料金を払ってから調べる",
      "大きな警告音がしたので表示番号へ電話する",
      "警告画面が案内する遠隔操作をまず許可する",
    ],
    answer: 0,
    explanation:
      "偽の警告から電話や遠隔操作へ誘導するサポート詐欺があります。表示された連絡先をそのまま信用しないことが大切です。",
    source: {
      label: "IPA｜偽セキュリティ警告への対策",
      url: "https://www.ipa.go.jp/security/anshin/measures/fakealert.html",
    },
    topic: "ネットの安全",
  },
  {
    id: "v2-digital-hard-022",
    category: "digital",
    difficulty: "hard",
    prompt:
      "オフライン表示に対応した地図アプリで、旅行先の地図を事前に保存した。圏外でも利用できるのは？",
    choices: [
      "リアルタイムの最新渋滞情報",
      "保存した範囲の地図の表示",
      "保存していない地域の地図の新規受信",
      "店に投稿されたばかりの口コミの取得",
    ],
    answer: 1,
    explanation:
      "保存済みの情報は通信せず表示できます。最新情報の取得などには、通常インターネット接続が必要です。",
    topic: "通信と接続",
  },
  {
    id: "v2-digital-hard-023",
    category: "digital",
    difficulty: "hard",
    prompt:
      "説明動画を、音を出せない場所でも内容が分かるようにしたい。最も直接役立つ追加は？",
    choices: [
      "説明の音量を大きくする",
      "音声の再生速度を遅くする",
      "内容を伝える字幕",
      "音声のノイズを減らす",
    ],
    answer: 2,
    explanation:
      "字幕は音を出せない場面や、音声を聞き取りにくい人にも役立ちます。",
    topic: "写真とファイル",
  },
  {
    id: "v2-digital-hard-024",
    category: "digital",
    difficulty: "hard",
    prompt: "オンライン会議で自分のマイクだけをミュートした。通常どうなる？",
    choices: [
      "自分の声は届くが相手の声は聞けない",
      "参加者全員の音声が止まる",
      "自分のカメラだけが止まる",
      "自分の声は送られず、相手の声は聞ける",
    ],
    answer: 3,
    explanation:
      "マイクのミュートは自分から送る音を止める操作です。スピーカーやカメラの設定とは別です。",
    topic: "表示と音声",
  },
  {
    id: "v2-digital-hard-025",
    category: "digital",
    difficulty: "hard",
    prompt:
      "大事な写真を別の保存先へコピーした。コピーが使える状態か最も直接確かめる方法は？",
    choices: [
      "コピー先で必要な写真が開けるか",
      "コピー先のフォルダー名を元とそろえる",
      "ファイル名の並び順だけ確認する",
      "保存先に空き容量があるかだけ確認する",
    ],
    answer: 0,
    explanation:
      "コピーが途中で失敗したり、一部のデータが抜けたりする可能性があります。開いて内容を確認すると確実です。",
    topic: "写真とファイル",
  },
  {
    id: "v2-digital-easy-026",
    category: "digital",
    difficulty: "easy",
    topic: "アカウント",
    prompt: "ネットサービスの「ログイン」は、通常何をする操作？",
    choices: [
      "通信契約を解約する",
      "自分の利用者として認証して入る",
      "端末の電源を切る",
      "画面を印刷する",
    ],
    answer: 1,
    explanation:
      "登録した利用者としてサービスに入る操作です。アプリを開くことと必ずしも同じではありません。",
  },
  {
    id: "v2-digital-easy-027",
    category: "digital",
    difficulty: "easy",
    topic: "アカウント",
    prompt: "ネット上で使う「ニックネーム」と本人確認のための氏名は？",
    choices: [
      "どちらも暗証番号を意味する",
      "ニックネームだけで必ず本人確認が完了する",
      "用途が違い、ニックネームが正式な氏名とは限らない",
      "必ず戸籍の氏名と一致する",
    ],
    answer: 2,
    explanation: "画面上の呼び名と、手続き上の本人確認情報を区別します。",
  },
  {
    id: "v2-digital-easy-028",
    category: "digital",
    difficulty: "easy",
    topic: "スマホの操作",
    prompt: "スマホ画面を指で軽く1回触れる操作は？",
    choices: ["スワイプ", "ピンチアウト", "ドラッグ", "タップ"],
    answer: 3,
    explanation:
      "タップは軽く触れる操作です。スワイプは指を滑らせる操作を指します。",
  },
  {
    id: "v2-digital-easy-029",
    category: "digital",
    difficulty: "easy",
    topic: "スマホの操作",
    prompt: "スマホ画面を2本の指で広げて、写真などを拡大する操作は？",
    choices: ["ピンチアウト", "ダブルクリック", "スクロール", "ミュート"],
    answer: 0,
    explanation:
      "対応した画面では、2本指を広げると拡大、縮めると縮小できます。",
  },
  {
    id: "v2-digital-easy-030",
    category: "digital",
    difficulty: "easy",
    topic: "スマホの操作",
    prompt: "画面に一部しか出ていない長い記事を、上下に移動させて読む操作は？",
    choices: ["初期化", "スクロール", "ダウンロード", "ログアウト"],
    answer: 1,
    explanation:
      "スクロールは表示範囲を移動する操作です。記事自体を削除する操作ではありません。",
  },
  {
    id: "v2-digital-easy-031",
    category: "digital",
    difficulty: "easy",
    topic: "通信と接続",
    prompt: "スマホの携帯回線を、パソコンなどのネット接続にも使う機能は？",
    choices: ["スキャン", "画面ロック", "テザリング", "トリミング"],
    answer: 2,
    explanation:
      "スマートフォンが回線を共有します。料金プランやデータ使用量も確認します。",
    source: {
      label: "Google｜Androidでテザリングする",
      url: "https://support.google.com/android/answer/9059108?hl=ja",
    },
  },
  {
    id: "v2-digital-easy-032",
    category: "digital",
    difficulty: "easy",
    topic: "通信と接続",
    prompt: "スマホに表示される「圏外」の意味として基本的なのは？",
    choices: [
      "保存写真がすべて消えた状態",
      "電池残量が必ず0の状態",
      "画面がロックされた状態",
      "その携帯回線の電波を利用できない状態",
    ],
    answer: 3,
    explanation:
      "携帯回線が使えない状態を示します。保存済みデータや別のWi-Fi接続が使える場合はあります。",
  },
  {
    id: "v2-digital-easy-033",
    category: "digital",
    difficulty: "easy",
    topic: "通知と公開",
    prompt: "SNSの「公開範囲」を設定するとき、主に決めることは？",
    choices: [
      "投稿を見られる相手の範囲",
      "画面の明るさ",
      "投稿写真の縦横比",
      "スマホの保存容量",
    ],
    answer: 0,
    explanation:
      "公開範囲は閲覧できる相手に関わります。サービスの設定内容を確認します。",
    source: {
      label: "個人情報保護委員会｜個人情報の取扱い事例",
      url: "https://www.ppc.go.jp/campaign/paw/",
    },
  },
  {
    id: "v2-digital-easy-034",
    category: "digital",
    difficulty: "easy",
    topic: "通知と公開",
    prompt: "スマホのアプリ通知をオフにする主な目的は？",
    choices: [
      "アプリ内のデータを初期化する",
      "そのアプリからの表示や音による知らせを抑える",
      "アカウントの登録情報を削除する",
      "有料契約を自動で解約する",
    ],
    answer: 1,
    explanation: "通知を止めることと、アプリの削除や契約の解約は別です。",
  },
  {
    id: "v2-digital-easy-035",
    category: "digital",
    difficulty: "easy",
    topic: "検索と情報",
    prompt: "検索で知りたいことが見つからないとき、検索語を工夫する方法は？",
    choices: [
      "常に一文字だけで探す",
      "上から一件目だけを見る",
      "地名や具体的な品名など条件を加える",
      "無関係な単語を多く追加する",
    ],
    answer: 2,
    explanation:
      "対象を絞る言葉を加えると、求める情報へ近づけることがあります。",
  },
  {
    id: "v2-digital-easy-036",
    category: "digital",
    difficulty: "easy",
    topic: "検索と情報",
    prompt: "ウェブ記事の「更新日」を確かめる主な理由は？",
    choices: [
      "著者の年齢を計算するため",
      "表示される文字数を知るため",
      "端末の購入日を確認するため",
      "どの時点の情報か判断するため",
    ],
    answer: 3,
    explanation:
      "更新日や公表日は情報の新しさを考える手掛かりです。内容の正確さも別途確認します。",
  },
  {
    id: "v2-digital-easy-037",
    category: "digital",
    difficulty: "easy",
    topic: "写真とファイル",
    prompt: "デジタル文書を紙へ出力する操作は？",
    choices: ["印刷", "スキャン", "圧縮", "同期"],
    answer: 0,
    explanation:
      "印刷は紙への出力です。紙の文書をデータ化するスキャンと区別します。",
  },
  {
    id: "v2-digital-easy-038",
    category: "digital",
    difficulty: "easy",
    topic: "写真とファイル",
    prompt: "紙の書類を読み取って画像やPDFにする操作は？",
    choices: ["ペアリング", "スキャン", "印刷", "ログイン"],
    answer: 1,
    explanation: "スキャナーや対応アプリで紙面をデータ化する操作です。",
  },
  {
    id: "v2-digital-easy-039",
    category: "digital",
    difficulty: "easy",
    topic: "著作権",
    prompt:
      "ネットに掲載されている他人のイラストを使いたい。最初に確認するのは？",
    choices: [
      "画像が小さいか",
      "作者が遠くに住んでいるか",
      "利用条件や許可が必要か",
      "検索順位が高いか",
    ],
    answer: 2,
    explanation:
      "公開されていても自由利用できるとは限りません。許諾条件や法令上の例外を確認します。",
    source: {
      label: "文化庁｜ここが知りたい著作権",
      url: "https://www.bunka.go.jp/seisaku/chosakuken/taisetsu/point/index.html",
    },
  },
  {
    id: "v2-digital-easy-040",
    category: "digital",
    difficulty: "easy",
    topic: "アクセシビリティ",
    prompt: "画像の内容を文章で伝える「代替テキスト」が役立つのは？",
    choices: [
      "画像の保存容量を必ずゼロにする場合",
      "インターネット接続を不要にする場合",
      "画面の指紋を消す場合",
      "画像を見られない場合や読み上げで利用する場合",
    ],
    answer: 3,
    explanation:
      "代替テキストは画像が伝える内容を文字で補い、読み上げなどでも理解できるようにします。",
    source: {
      label: "W3C｜画像の代替テキスト",
      url: "https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html",
    },
  },
  {
    id: "v2-digital-normal-026",
    category: "digital",
    difficulty: "normal",
    topic: "アカウント",
    prompt:
      "偽サイトへパスワードを入力してしまった。最初の対処として適切なのは？",
    choices: [
      "友人のパスワードに変更する",
      "正規サービスで変更し、利用状況や公式案内を確認する",
      "偽サイトの問い合わせ欄へ同じパスワードを送る",
      "通知だけ消して使い続ける",
    ],
    answer: 1,
    explanation:
      "正規窓口の対処手順を確認し、使い回しているサービスにも対応します。",
    source: {
      label: "IPA｜不正ログインの対策",
      url: "https://www.ipa.go.jp/security/anshin/attention/2025/mgdayori20250828.html",
    },
  },
  {
    id: "v2-digital-normal-027",
    category: "digital",
    difficulty: "normal",
    topic: "通信と接続",
    prompt: "機内モード中にWi-Fiを使える端末について、正しい説明は？",
    choices: [
      "Wi-Fiを使うと保存写真が消える",
      "機内モードは画面の明るさだけを変える",
      "Wi-Fiを個別に有効にできる場合がある",
      "機内モードならどの無線も絶対に使えない",
    ],
    answer: 2,
    explanation:
      "機内モード中でもWi-Fi等を個別に使える端末があります。機内では航空会社の案内に従います。",
    source: {
      label: "Google｜機内モードとワイヤレス接続",
      url: "https://support.google.com/pixelphone/answer/12639358?hl=ja",
    },
  },
  {
    id: "v2-digital-normal-028",
    category: "digital",
    difficulty: "normal",
    topic: "通信と接続",
    prompt: "Wi-Fiに接続済みと出てもウェブページが開かないことがあるのは？",
    choices: [
      "Wi-Fiは文字を送れないため",
      "充電が100％だと通信が止まるため",
      "URLはWi-Fiでは使えないため",
      "Wi-Fi機器の先のインターネット接続に問題がある場合がある",
    ],
    answer: 3,
    explanation:
      "Wi-Fiへの接続と、その先のインターネットへ到達できることは別です。",
  },
  {
    id: "v2-digital-normal-029",
    category: "digital",
    difficulty: "normal",
    topic: "検索と情報",
    prompt:
      "同じ話題を伝える複数サイトが、すべて一つの投稿を引用していた。根拠の数について言えるのは？",
    choices: [
      "独立した複数の裏付けがあるとは限らない",
      "サイト数だけ独立した証拠がある",
      "引用があれば必ず真実である",
      "同じ文章なら必ず公的発表である",
    ],
    answer: 0,
    explanation:
      "出所が一つなら情報源も実質一つかもしれません。元の発表や独立した確認を探します。",
  },
  {
    id: "v2-digital-normal-030",
    category: "digital",
    difficulty: "normal",
    topic: "検索と情報",
    prompt:
      "グラフの縦軸が0ではなく90から始まっている。値の差を読むときの注意は？",
    choices: [
      "横軸を無視すれば正しく読める",
      "見た目の差だけでなく軸の目盛りも確認する",
      "棒が高いほど必ず差は10倍ある",
      "0開始でないグラフは必ず虚偽である",
    ],
    answer: 1,
    explanation:
      "軸の取り方で差の見え方が変わります。数値と目盛りを読むことが大切です。",
  },
  {
    id: "v2-digital-normal-031",
    category: "digital",
    difficulty: "normal",
    topic: "著作権",
    prompt:
      "「出典を書けば、他人の文章を何ページでも丸ごと転載できる」という説明は？",
    choices: [
      "無料のサイトなら常に正しい",
      "作者名を略せば常に正しい",
      "出典表示だけで無制限に転載できるわけではない",
      "出典があれば常に正しい",
    ],
    answer: 2,
    explanation:
      "引用には条件があります。出典表示は必要な配慮の一つで、あらゆる転載を許すものではありません。",
    source: {
      label: "文化庁｜ここが知りたい著作権",
      url: "https://www.bunka.go.jp/seisaku/chosakuken/taisetsu/point/index.html",
    },
  },
  {
    id: "v2-digital-normal-032",
    category: "digital",
    difficulty: "normal",
    topic: "写真とファイル",
    prompt:
      "USBケーブルで充電はできるが、写真を転送できない。考えられる理由は？",
    choices: [
      "充電できるケーブルは必ず写真転送もできる",
      "写真は無線でしか送れない",
      "USB接続では文書しか送れない",
      "充電専用など、データ転送に対応しないケーブルの場合がある",
    ],
    answer: 3,
    explanation:
      "ケーブルや機器の対応、端末側の許可設定を確認します。形状が同じでも機能が同じとは限りません。",
  },
  {
    id: "v2-digital-normal-033",
    category: "digital",
    difficulty: "normal",
    topic: "通知と公開",
    prompt: "スマホのロック画面にメッセージ本文を出したくない。見直す設定は？",
    choices: [
      "通知内容のプレビュー表示",
      "写真の撮影比率",
      "画面の自動回転",
      "文字入力の予測変換",
    ],
    answer: 0,
    explanation:
      "アプリや端末の通知設定で、ロック画面に内容を表示するか調整できる場合があります。",
  },
  {
    id: "v2-digital-normal-034",
    category: "digital",
    difficulty: "normal",
    topic: "アカウント",
    prompt:
      "共同利用のパソコンでサービスを使った後、次の人が自分のアカウントを使えないようにするには？",
    choices: [
      "タブの順番を入れ替える",
      "ログアウトし、保存された認証情報にも注意する",
      "ウィンドウを小さくするだけにする",
      "画面の明るさを下げる",
    ],
    answer: 1,
    explanation:
      "ログイン状態や保存パスワードが残らないよう確認します。画面を隠すだけでは不十分です。",
    source: {
      label: "IPA｜不正ログインの対策",
      url: "https://www.ipa.go.jp/security/anshin/attention/2025/mgdayori20250828.html",
    },
  },
  {
    id: "v2-digital-normal-035",
    category: "digital",
    difficulty: "normal",
    topic: "アクセシビリティ",
    prompt:
      "図の赤と緑だけで正解・不正解を示している。色の区別が難しい人にも伝える改善は？",
    choices: [
      "同じ色の面積だけ大きくする",
      "説明を消す",
      "文字や形も併用する",
      "色を少し薄くするだけ",
    ],
    answer: 2,
    explanation:
      "文字や記号などを組み合わせると、色の見え方に左右されず情報を伝えられます。",
    source: {
      label: "W3C｜色だけに頼らない情報伝達",
      url: "https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html",
    },
  },
  {
    id: "v2-world-easy-001",
    category: "world",
    difficulty: "easy",
    prompt: "日本で最も面積が大きい都道府県は？",
    choices: ["北海道", "岩手県", "長野県", "新潟県"],
    answer: 0,
    explanation: "北海道は日本の都道府県の中で最も面積が大きい地域です。",
    topic: "日本の地理",
  },
  {
    id: "v2-world-easy-002",
    category: "world",
    difficulty: "easy",
    prompt: "日本で最も高い山は？",
    choices: ["槍ヶ岳", "富士山", "筑波山", "北岳"],
    answer: 1,
    explanation:
      "富士山の標高は約三七七六メートルです。山梨県と静岡県にまたがります。",
    topic: "日本の地理",
  },
  {
    id: "v2-world-easy-003",
    category: "world",
    difficulty: "easy",
    prompt: "日本で面積が最大の湖は？",
    choices: ["浜名湖", "霞ヶ浦", "琵琶湖", "諏訪湖"],
    answer: 2,
    explanation: "滋賀県にある琵琶湖が、日本で面積最大の湖です。",
    topic: "地形と水辺",
  },
  {
    id: "v2-world-easy-004",
    category: "world",
    difficulty: "easy",
    prompt: "沖縄県の県庁所在地は？",
    choices: ["名護市", "石垣市", "宮古島市", "那覇市"],
    answer: 3,
    explanation: "沖縄県の県庁は沖縄本島南部の那覇市にあります。",
    topic: "日本の地理",
  },
  {
    id: "v2-world-easy-005",
    category: "world",
    difficulty: "easy",
    prompt: "北海道の道庁所在地は？",
    choices: ["札幌市", "函館市", "旭川市", "釧路市"],
    answer: 0,
    explanation:
      "北海道庁は札幌市にあります。函館市は北海道の南部にある都市です。",
    topic: "地形と水辺",
  },
  {
    id: "v2-world-easy-006",
    category: "world",
    difficulty: "easy",
    prompt: "神奈川県の県庁所在地は？",
    choices: ["鎌倉市", "横浜市", "小田原市", "川崎市"],
    answer: 1,
    explanation:
      "神奈川県の県庁所在地は横浜市です。横浜港は東京湾に面しています。",
    topic: "地形と水辺",
  },
  {
    id: "v2-world-easy-007",
    category: "world",
    difficulty: "easy",
    prompt: "次のうち、四国にある県は？",
    choices: ["広島県", "愛知県", "愛媛県", "宮崎県"],
    answer: 2,
    explanation: "四国は徳島県・香川県・愛媛県・高知県からなります。",
    topic: "日本の地理",
  },
  {
    id: "v2-world-easy-008",
    category: "world",
    difficulty: "easy",
    prompt: "次のうち、九州にある県は？",
    choices: ["岡山県", "福井県", "三重県", "熊本県"],
    answer: 3,
    explanation: "熊本県は九州の中央部に位置し、阿蘇山などで知られます。",
    topic: "日本の地理",
  },
  {
    id: "v2-world-easy-009",
    category: "world",
    difficulty: "easy",
    prompt: "日本の東側に広がる大洋は？",
    choices: ["太平洋", "大西洋", "インド洋", "北極海"],
    answer: 0,
    explanation:
      "日本列島の東側には太平洋が広がり、西側には日本海などがあります。",
    topic: "日本の地理",
  },
  {
    id: "v2-world-easy-010",
    category: "world",
    difficulty: "easy",
    prompt: "日本の都道府県の数は？",
    choices: ["五十", "四十七", "五十二", "四十五"],
    answer: 1,
    explanation:
      "日本は一都一道二府四十三県、合計四十七都道府県で構成されています。",
    topic: "日本の地理",
  },
  {
    id: "v2-world-easy-011",
    category: "world",
    difficulty: "easy",
    prompt: "フランスの首都は？",
    choices: ["ベルリン", "ローマ", "パリ", "マドリード"],
    answer: 2,
    explanation: "パリはフランスの首都で、セーヌ川が流れています。",
    topic: "世界の国と地域",
  },
  {
    id: "v2-world-easy-012",
    category: "world",
    difficulty: "easy",
    prompt: "イギリスの首都は？",
    choices: ["パリ", "ダブリン", "アムステルダム", "ロンドン"],
    answer: 3,
    explanation: "ロンドンはイギリスの首都で、テムズ川沿いに発展した都市です。",
    topic: "世界の国と地域",
  },
  {
    id: "v2-world-easy-013",
    category: "world",
    difficulty: "easy",
    prompt: "イタリアの首都は？",
    choices: ["ローマ", "ミラノ", "ベネチア", "フィレンツェ"],
    answer: 0,
    explanation:
      "イタリアの首都はローマです。ミラノやフィレンツェもイタリアの主要都市です。",
    topic: "世界の国と地域",
  },
  {
    id: "v2-world-easy-014",
    category: "world",
    difficulty: "easy",
    prompt: "アメリカ合衆国の首都は？",
    choices: ["ロサンゼルス", "ワシントンD.C.", "シカゴ", "ニューヨーク"],
    answer: 1,
    explanation:
      "首都はワシントンD.C.です。ニューヨークは最大級の都市ですが、首都ではありません。",
    topic: "世界の国と地域",
  },
  {
    id: "v2-world-easy-015",
    category: "world",
    difficulty: "easy",
    prompt: "中国の首都は？",
    choices: ["西安", "上海", "北京", "広州"],
    answer: 2,
    explanation: "中国の首都は北京です。上海は長江河口近くの大都市です。",
    topic: "世界の国と地域",
  },
  {
    id: "v2-world-easy-016",
    category: "world",
    difficulty: "easy",
    prompt: "韓国の首都は？",
    choices: ["釜山", "仁川", "大邱", "ソウル"],
    answer: 3,
    explanation: "韓国の首都はソウルです。漢江が市内を流れています。",
    topic: "世界の国と地域",
  },
  {
    id: "v2-world-easy-017",
    category: "world",
    difficulty: "easy",
    prompt: "サハラ砂漠がある大陸は？",
    choices: [
      "アフリカ大陸",
      "オーストラリア大陸",
      "北アメリカ大陸",
      "南アメリカ大陸",
    ],
    answer: 0,
    explanation: "サハラ砂漠はアフリカ大陸の北部に広がっています。",
    topic: "世界の国と地域",
  },
  {
    id: "v2-world-easy-018",
    category: "world",
    difficulty: "easy",
    prompt: "世界で面積が最も大きい大洋は？",
    choices: ["北極海", "太平洋", "大西洋", "インド洋"],
    answer: 1,
    explanation:
      "太平洋は世界最大の大洋で、アジア・オセアニアと南北アメリカの間に広がります。",
    topic: "世界の国と地域",
  },
  {
    id: "v2-world-easy-019",
    category: "world",
    difficulty: "easy",
    prompt: "地図で、ふつう上を北にしたとき右はどの方角？",
    choices: ["西", "南", "東", "北西"],
    answer: 2,
    explanation:
      "北を上に置く地図では右が東、下が南、左が西です。方位記号も確認しましょう。",
    topic: "地図の読み方",
  },
  {
    id: "v2-world-easy-020",
    category: "world",
    difficulty: "easy",
    prompt: "オーストラリアは赤道から見てどちら側にある？",
    choices: ["全土が赤道上", "北極側だけ", "北側", "南側"],
    answer: 3,
    explanation:
      "オーストラリアは南半球にあり、日本とは夏と冬の時期が逆になります。",
    topic: "世界の国と地域",
  },
  {
    id: "v2-world-easy-021",
    category: "world",
    difficulty: "easy",
    prompt: "氷は、水のどの状態？",
    choices: ["固体", "気体", "プラズマ", "液体"],
    answer: 0,
    explanation: "水は固体では氷、液体では水、気体では水蒸気と呼ばれます。",
    topic: "身近な現象",
  },
  {
    id: "v2-world-easy-022",
    category: "world",
    difficulty: "easy",
    prompt: "1 気圧で純粋な水が沸騰する温度は、およそ何度？",
    choices: ["200 ℃", "100 ℃", "0 ℃", "50 ℃"],
    answer: 1,
    explanation:
      "水の沸点は圧力によって変わります。標準的な 1 気圧では約 100 ℃です。",
    topic: "身近な現象",
  },
  {
    id: "v2-world-easy-023",
    category: "world",
    difficulty: "easy",
    prompt: "次のうち、電気をよく通す物質は？",
    choices: ["ガラス", "プラスチック", "銅", "乾いたゴム"],
    answer: 2,
    explanation: "銅は電気をよく通す金属で、電線などに利用されます。",
    topic: "物質とエネルギー",
  },
  {
    id: "v2-world-easy-024",
    category: "world",
    difficulty: "easy",
    prompt: "2 本の棒磁石で N 極どうしを近づけると、どうなる？",
    choices: ["必ず発熱する", "必ずくっつく", "両方の磁力が消える", "反発する"],
    answer: 3,
    explanation:
      "同じ極どうしは反発し、N 極と S 極のように異なる極どうしは引き合います。",
    topic: "身近な現象",
  },
  {
    id: "v2-world-easy-025",
    category: "world",
    difficulty: "easy",
    prompt: "地球が公転している中心の天体は？",
    choices: ["太陽", "北極星", "木星", "月"],
    answer: 0,
    explanation:
      "地球は太陽のまわりを回る惑星です。月は地球のまわりを回る衛星です。",
    topic: "宇宙と暦",
  },
  {
    id: "v2-world-easy-026",
    category: "world",
    difficulty: "easy",
    prompt: "地球の自然衛星は？",
    choices: ["太陽", "月", "金星", "火星"],
    answer: 1,
    explanation:
      "月は地球のまわりを公転する自然の天体です。人工衛星とは区別されます。",
    topic: "宇宙と暦",
  },
  {
    id: "v2-world-easy-027",
    category: "world",
    difficulty: "easy",
    prompt: "音は、空気中を主に何として伝わる？",
    choices: ["光の反射", "電子の流れ", "空気の振動", "水滴の移動"],
    answer: 2,
    explanation: "音は空気などの物質の振動が、周囲へ伝わる現象です。",
    topic: "身近な現象",
  },
  {
    id: "v2-world-easy-028",
    category: "world",
    difficulty: "easy",
    prompt: "植物が土の中から水を吸収する主な部分は？",
    choices: ["種子の皮", "花びら", "果実", "根"],
    answer: 3,
    explanation: "根は植物を支えるほか、水や無機養分を吸収する役割を担います。",
    topic: "生き物",
  },
  {
    id: "v2-world-easy-029",
    category: "world",
    difficulty: "easy",
    prompt: "成虫の昆虫の脚は、基本的に何本？",
    choices: ["6 本", "8 本", "10 本", "4 本"],
    answer: 0,
    explanation:
      "昆虫は胸に 3 対、合計 6 本の脚を持ちます。クモは昆虫ではありません。",
    topic: "生き物",
  },
  {
    id: "v2-world-easy-030",
    category: "world",
    difficulty: "easy",
    prompt: "多くの魚が、水中の酸素を取り込む器官は？",
    choices: ["触角", "えら", "羽", "角"],
    answer: 1,
    explanation: "えらは水に溶けた酸素を取り込むための器官です。",
    topic: "生き物",
  },
  {
    id: "v2-world-easy-031",
    category: "world",
    difficulty: "easy",
    prompt: "クジラは、動物のどの仲間？",
    choices: ["両生類", "爬虫類", "哺乳類", "魚類"],
    answer: 2,
    explanation: "クジラは肺で呼吸し、子に乳を与えて育てる哺乳類です。",
    topic: "生き物",
  },
  {
    id: "v2-world-easy-032",
    category: "world",
    difficulty: "easy",
    prompt: "オタマジャクシが成長すると、一般に何になる？",
    choices: ["メダカ", "カメ", "トカゲ", "カエル"],
    answer: 3,
    explanation:
      "カエルは両生類です。幼生のオタマジャクシから、姿を変えて成体になります。",
    topic: "生き物",
  },
  {
    id: "v2-world-easy-033",
    category: "world",
    difficulty: "easy",
    prompt: "チョウの成長の順序として正しいものは？",
    choices: [
      "卵 → 幼虫 → さなぎ → 成虫",
      "幼虫 → 卵 → 成虫 → さなぎ",
      "卵 → 成虫 → 幼虫 → さなぎ",
      "卵 → さなぎ → 幼虫 → 成虫",
    ],
    answer: 0,
    explanation:
      "幼虫と成虫の間にさなぎの段階がある成長を、完全変態といいます。",
    topic: "生き物",
  },
  {
    id: "v2-world-easy-034",
    category: "world",
    difficulty: "easy",
    prompt: "雲から液体の水滴が地上へ落ちてくる現象は？",
    choices: ["露", "雨", "霜", "霧"],
    answer: 1,
    explanation:
      "雨は雲の中で成長した水滴が落下する現象です。霜は氷の結晶です。",
    topic: "天気",
  },
  {
    id: "v2-world-easy-035",
    category: "world",
    difficulty: "easy",
    prompt: "虹が見えるとき、太陽の光を屈折・反射させている主なものは？",
    choices: ["月の表面", "地球の内部", "空中の水滴", "地面の砂"],
    answer: 2,
    explanation:
      "太陽光が水滴の中で屈折・反射し、色ごとに分かれることで虹が見えます。",
    topic: "天気",
  },
  {
    id: "v2-world-easy-036",
    category: "world",
    difficulty: "easy",
    prompt: "手を離した物が地面へ落ちる主な原因は？",
    choices: ["空気の色", "地球の磁力だけ", "月の光", "地球の重力"],
    answer: 3,
    explanation:
      "地球は重力で物体を引き付けます。磁石に付かない物にも重力は働きます。",
    topic: "身近な現象",
  },
  {
    id: "v2-world-easy-037",
    category: "world",
    difficulty: "easy",
    prompt: "古墳とは、主に何のために造られたもの？",
    choices: [
      "有力者の墓",
      "税を集める市場",
      "米を水田へ送る水路",
      "船を修理する港",
    ],
    answer: 0,
    explanation:
      "古墳は支配者や有力者の墓です。前方後円墳などさまざまな形があります。",
    topic: "歴史と暮らし",
  },
  {
    id: "v2-world-easy-038",
    category: "world",
    difficulty: "easy",
    prompt: "平安京が置かれた場所は現在のどこ？",
    choices: ["宮城県", "京都府", "神奈川県", "広島県"],
    answer: 1,
    explanation:
      "平安京は現在の京都市に置かれた都です。七九四年に桓武天皇が都を移しました。",
    topic: "歴史と暮らし",
  },
  {
    id: "v2-world-easy-039",
    category: "world",
    difficulty: "easy",
    prompt: "日本の元号を古い順に並べたものは？",
    choices: [
      "大正→明治→平成→昭和",
      "昭和→大正→明治→平成",
      "明治→大正→昭和→平成",
      "平成→昭和→大正→明治",
    ],
    answer: 2,
    explanation: "近代以降は明治、大正、昭和、平成、令和の順です。",
    topic: "歴史と暮らし",
  },
  {
    id: "v2-world-easy-040",
    category: "world",
    difficulty: "easy",
    prompt: "第二次世界大戦が終結した年は？",
    choices: ["一九一四年", "一九二九年", "一九六四年", "一九四五年"],
    answer: 3,
    explanation:
      "第二次世界大戦は一九三九年に始まり、一九四五年に終結しました。",
    topic: "歴史と暮らし",
  },
  {
    id: "v2-world-normal-001",
    category: "world",
    difficulty: "normal",
    prompt: "川の「上流」と「下流」は、何を基準に区別する？",
    choices: [
      "水の流れる向き",
      "地図の上と下",
      "流域に住む人の多さ",
      "橋の数の多さ",
    ],
    answer: 0,
    explanation:
      "水が流れてくる側が上流、流れていく側が下流です。地図の北側が必ず上流とは限りません。",
    topic: "地形と水辺",
  },
  {
    id: "v2-world-normal-002",
    category: "world",
    difficulty: "normal",
    prompt: "川が海や湖に流れ込む出口を何という？",
    choices: ["山頂", "河口", "峠", "水源"],
    answer: 1,
    explanation:
      "河口は川が海や湖に注ぐ場所です。川が流れ始めるもとになる場所は水源といいます。",
    topic: "地形と水辺",
  },
  {
    id: "v2-world-normal-003",
    category: "world",
    difficulty: "normal",
    prompt: "次の県のうち、海に面していないのは？",
    choices: ["和歌山県", "山口県", "長野県", "富山県"],
    answer: 2,
    explanation:
      "長野県は内陸県です。富山県は日本海、和歌山県は太平洋側、山口県は日本海と瀬戸内海に面します。",
    topic: "地形と水辺",
  },
  {
    id: "v2-world-normal-004",
    category: "world",
    difficulty: "normal",
    prompt:
      "東京から沖縄へ移動した場合、日本の標準時に合わせた時計はどうする？",
    choices: [
      "一時間進める",
      "二時間戻す",
      "一時間戻す",
      "時差による変更は不要",
    ],
    answer: 3,
    explanation:
      "日本国内では同じ標準時を使います。実際の日の出や日の入りの時刻には地域差があります。",
    topic: "時差",
  },
  {
    id: "v2-world-normal-005",
    category: "world",
    difficulty: "normal",
    prompt: "本州と四国の間に広がる海は？",
    choices: ["瀬戸内海", "日本海", "オホーツク海", "有明海"],
    answer: 0,
    explanation:
      "瀬戸内海は本州・四国・九州に囲まれ、多くの島が点在する海域です。",
    topic: "地形と水辺",
  },
  {
    id: "v2-world-normal-006",
    category: "world",
    difficulty: "normal",
    prompt: "津軽海峡は主にどの二つの島を隔てる？",
    choices: ["四国と九州", "本州と北海道", "九州と沖縄本島", "本州と四国"],
    answer: 1,
    explanation: "津軽海峡は本州の北端と北海道の南端の間にあります。",
    topic: "地形と水辺",
  },
  {
    id: "v2-world-normal-007",
    category: "world",
    difficulty: "normal",
    prompt: "カナダがある大陸は？",
    choices: [
      "オーストラリア大陸",
      "南アメリカ大陸",
      "北アメリカ大陸",
      "アフリカ大陸",
    ],
    answer: 2,
    explanation:
      "カナダは北アメリカ大陸の北部にあり、アメリカ合衆国と国境を接しています。",
    topic: "世界の国と地域",
  },
  {
    id: "v2-world-normal-008",
    category: "world",
    difficulty: "normal",
    prompt: "オーストラリアで広く使われている言語は？",
    choices: ["スペイン語", "ポルトガル語", "アラビア語", "英語"],
    answer: 3,
    explanation:
      "オーストラリアでは英語が広く使われます。先住民の言語や移民が使う言語もあります。",
    topic: "世界の国と地域",
  },
  {
    id: "v2-world-normal-009",
    category: "world",
    difficulty: "normal",
    prompt: "ブラジルがある大陸は？",
    choices: [
      "南アメリカ大陸",
      "北アメリカ大陸",
      "アフリカ大陸",
      "ユーラシア大陸",
    ],
    answer: 0,
    explanation:
      "ブラジルは南アメリカ大陸の東側に広がり、大西洋に面しています。",
    topic: "世界の国と地域",
  },
  {
    id: "v2-world-normal-010",
    category: "world",
    difficulty: "normal",
    prompt: "インドが属する地域は？",
    choices: ["南アメリカ", "アジア", "オセアニア", "ヨーロッパ"],
    answer: 1,
    explanation:
      "インドはアジアにあり、インド洋に面しています。日本もアジアに属しますが、離れた場所にあります。",
    topic: "世界の国と地域",
  },
  {
    id: "v2-world-normal-011",
    category: "world",
    difficulty: "normal",
    prompt: "地中海は、主にどの二つの地域の間に広がる海？",
    choices: [
      "日本と北アメリカ",
      "オーストラリアと南極",
      "ヨーロッパとアフリカ",
      "北アメリカと南アメリカ",
    ],
    answer: 2,
    explanation:
      "地中海の北側にはヨーロッパ、南側にはアフリカがあります。東側ではアジアにも接しています。",
    topic: "地形と水辺",
  },
  {
    id: "v2-world-normal-012",
    category: "world",
    difficulty: "normal",
    prompt:
      "ヨーロッパの西岸からアメリカ合衆国の東岸へ、主にどの大洋を横断する？",
    choices: ["北極海", "太平洋", "インド洋", "大西洋"],
    answer: 3,
    explanation:
      "大西洋はヨーロッパ・アフリカと、南北アメリカの間に広がっています。",
    topic: "世界の国と地域",
  },
  {
    id: "v2-world-normal-013",
    category: "world",
    difficulty: "normal",
    prompt: "緯度に付く「北緯」「南緯」は、何の北側・南側を表す？",
    choices: ["赤道", "海岸線", "国境線", "日付変更線"],
    answer: 0,
    explanation:
      "緯度は赤道からの南北の位置を示し、赤道の北側を北緯、南側を南緯で表します。",
    topic: "世界の国と地域",
  },
  {
    id: "v2-world-normal-014",
    category: "world",
    difficulty: "normal",
    prompt: "日本の多くの地域で、春から夏へ移る頃に雨の日が多くなる時期は？",
    choices: ["残暑", "梅雨", "秋雨", "木枯らし"],
    answer: 1,
    explanation:
      "梅雨は主に春から夏へ移る頃の雨の多い時期です。時期や現れ方には地域差があります。",
    topic: "日本の地理",
  },
  {
    id: "v2-world-normal-015",
    category: "world",
    difficulty: "normal",
    prompt:
      "同じ高さの地点を結ぶ「等高線」が、同じ間隔の高さで描かれた地図で密集している場所は？",
    choices: [
      "高さが変わらない場所",
      "必ず海面より低い場所",
      "傾斜が急な場所",
      "傾斜が緩い場所",
    ],
    answer: 2,
    explanation:
      "短い距離で高さが大きく変わるため、等高線が密集する場所は急な斜面です。",
    topic: "地図の読み方",
  },
  {
    id: "v2-world-normal-016",
    category: "world",
    difficulty: "normal",
    prompt: "陸地から海へ大きく突き出し、三方を海に囲まれた地形は？",
    choices: ["島", "盆地", "平野", "半島"],
    answer: 3,
    explanation:
      "半島は、陸地につながったまま海へ突き出した地形です。周囲全体を水域に囲まれた島とは区別します。",
    topic: "地形と水辺",
  },
  {
    id: "v2-world-normal-017",
    category: "world",
    difficulty: "normal",
    prompt: "ハチが花から花へ移動することで、植物の受粉を助けるのはなぜ？",
    choices: [
      "体に付いた花粉を運ぶから",
      "土に水をまくから",
      "花の根を伸ばすから",
      "葉に日光を集めるから",
    ],
    answer: 0,
    explanation:
      "花に来たハチなどの体に花粉が付き、別の花へ運ばれることで受粉につながります。",
    topic: "生き物",
  },
  {
    id: "v2-world-normal-018",
    category: "world",
    difficulty: "normal",
    prompt: "ペンギンが、魚類ではなく鳥類に分類される特徴は？",
    choices: [
      "水の中を泳げる",
      "体が羽毛で覆われている",
      "魚を食べる",
      "卵を産む",
    ],
    answer: 1,
    explanation:
      "鳥類に特有の羽毛を持ちます。泳ぐことや卵を産むことは、鳥類以外にも見られます。",
    topic: "生き物",
  },
  {
    id: "v2-world-normal-019",
    category: "world",
    difficulty: "normal",
    prompt: "森に積もった落ち葉が、時間をかけて分解されるのを助けるものは？",
    choices: [
      "地球の磁力だけ",
      "空気中の窒素だけ",
      "菌や土の中の小さな生物",
      "月の光だけ",
    ],
    answer: 2,
    explanation:
      "菌や土の中の生物などが落ち葉を分解し、栄養分が土などへ戻ることを助けます。",
    topic: "生き物",
  },
  {
    id: "v2-world-normal-020",
    category: "world",
    difficulty: "normal",
    prompt:
      "てこの原理を使う栓抜きでは、同じ栓を開けるとき、どこを持つと小さい力で済みやすい？",
    choices: [
      "栓に触れる部分そのもの",
      "支点のすぐ近く",
      "持つ場所で力は変わらない",
      "支点から遠い持ち手の端",
    ],
    answer: 3,
    explanation:
      "支点から力を加える場所までの距離が長いほど、小さな力で動かしやすくなります。",
    topic: "身近な現象",
  },
  {
    id: "v2-world-normal-021",
    category: "world",
    difficulty: "normal",
    prompt: "空気などの物質がない真空中で、伝わらないものは？",
    choices: ["音", "可視光", "電波", "赤外線"],
    answer: 0,
    explanation:
      "音は空気などの振動が伝わる現象です。光や電波は、空気がなくても進めます。",
    topic: "身近な現象",
  },
  {
    id: "v2-world-normal-022",
    category: "world",
    difficulty: "normal",
    prompt: "遠くの雷で、光が見えてから音が聞こえるのはなぜ？",
    choices: [
      "雷は音を出してから光るから",
      "光の方が音より速く伝わるから",
      "空気が明るい間は音を通さないから",
      "音の方が光より速いから",
    ],
    answer: 1,
    explanation:
      "雷の光と音はほぼ同時に発生しますが、光の方がはるかに速く届きます。",
    topic: "天気",
  },
  {
    id: "v2-world-normal-023",
    category: "world",
    difficulty: "normal",
    prompt: "炭酸水に溶けていて、開栓すると泡として出てくる主な気体は？",
    choices: ["水素", "酸素", "二酸化炭素", "窒素"],
    answer: 2,
    explanation:
      "炭酸水には二酸化炭素が溶けています。栓を開けて圧力が下がると、気体として出やすくなります。",
    topic: "物質とエネルギー",
  },
  {
    id: "v2-world-normal-024",
    category: "world",
    difficulty: "normal",
    prompt: "物が燃えるのを助ける性質がある気体は？",
    choices: ["窒素", "二酸化炭素", "ヘリウム", "酸素"],
    answer: 3,
    explanation:
      "酸素は燃焼を支えます。酸素そのものを可燃性の燃料と呼ぶわけではありません。",
    topic: "物質とエネルギー",
  },
  {
    id: "v2-world-normal-025",
    category: "world",
    difficulty: "normal",
    prompt: "鉄がさびるとき、主に関わるものの組み合わせは？",
    choices: ["水と酸素", "日光と砂糖", "窒素とガラス", "食塩と暗さだけ"],
    answer: 0,
    explanation:
      "鉄は水や酸素に触れるとさびやすくなります。表面の塗装などは、それらとの接触を減らします。",
    topic: "身近な現象",
  },
  {
    id: "v2-world-normal-026",
    category: "world",
    difficulty: "normal",
    prompt: "次のうち、地球温暖化に関わる温室効果ガスは？",
    choices: ["窒素", "二酸化炭素", "酸素", "アルゴン"],
    answer: 1,
    explanation:
      "二酸化炭素は地球から出る赤外線を吸収する性質があります。メタンなども温室効果ガスです。",
    topic: "宇宙と暦",
  },
  {
    id: "v2-world-normal-027",
    category: "world",
    difficulty: "normal",
    prompt: "オゾン層が地上の生物を守る働きとして知られているのは？",
    choices: [
      "地球の重力を強くする",
      "雨水から塩分を取り除く",
      "太陽から来る紫外線の一部を吸収する",
      "太陽から来る光をすべて遮る",
    ],
    answer: 2,
    explanation: "上空のオゾン層は、生物に有害な紫外線の一部を吸収します。",
    topic: "生き物",
  },
  {
    id: "v2-world-normal-028",
    category: "world",
    difficulty: "normal",
    prompt: "月の満ち欠けが起こる主な理由は？",
    choices: [
      "月が自分で発光する量を変えるため",
      "月そのものが毎月大きくなるため",
      "毎晩地球の影が月を覆うため",
      "太陽に照らされた部分の見え方が変わるため",
    ],
    answer: 3,
    explanation:
      "太陽・地球・月の位置関係で、月の明るい半面のうち地球から見える割合が変わります。",
    topic: "宇宙と暦",
  },
  {
    id: "v2-world-normal-029",
    category: "world",
    difficulty: "normal",
    prompt: "雨のあとの水たまりが、晴れた日に少しずつ小さくなる主な理由は？",
    choices: [
      "水の一部が蒸発して空気中へ移るため",
      "水が日光を受けて砂に変わるため",
      "水の重さだけがなくなるため",
      "水が酸素だけになるため",
    ],
    answer: 0,
    explanation:
      "水は沸騰していなくても、表面から少しずつ蒸発します。地面にしみ込む分もあります。",
    topic: "天気",
  },
  {
    id: "v2-world-normal-030",
    category: "world",
    difficulty: "normal",
    prompt: "地層の中に残された、過去の生物の体や生活の跡は？",
    choices: ["断層面", "化石", "鉱脈", "マグマ"],
    answer: 1,
    explanation: "骨や貝殻だけでなく、足跡などの生痕も化石に含まれます。",
    topic: "生き物",
  },
  {
    id: "v2-world-normal-031",
    category: "world",
    difficulty: "normal",
    prompt: "冷たいコップの外側に水滴が付く主な理由は？",
    choices: [
      "ガラスから新しく水ができるため",
      "中の水がガラスを通り抜けるため",
      "空気中の水蒸気が冷えて水になるため",
      "空気中の酸素が水になるため",
    ],
    answer: 2,
    explanation:
      "周りの空気が冷やされ、含まれていた水蒸気の一部が液体になります。",
    topic: "身近な現象",
  },
  {
    id: "v2-world-normal-032",
    category: "world",
    difficulty: "normal",
    prompt: "鉄道や自動車が普及する前の江戸時代、陸上の旅で主に使われたのは？",
    choices: [
      "電車や路面電車",
      "自動車やオートバイ",
      "飛行機やヘリコプター",
      "徒歩や馬、かご",
    ],
    answer: 3,
    explanation:
      "江戸時代の陸上移動は徒歩が中心で、馬やかごなども使われました。川や海では船も利用されました。",
    topic: "歴史と暮らし",
  },
  {
    id: "v2-world-normal-033",
    category: "world",
    difficulty: "normal",
    prompt: "日本各地を測量し、精密な日本地図づくりを進めた人物は？",
    choices: ["伊能忠敬", "井原西鶴", "徳川光圀", "近松門左衛門"],
    answer: 0,
    explanation:
      "伊能忠敬は全国の測量を進めました。測量成果をもとに、死後に『大日本沿海輿地全図』が完成しました。",
    topic: "歴史と暮らし",
  },
  {
    id: "v2-world-normal-034",
    category: "world",
    difficulty: "normal",
    prompt: "一九二九年に始まった世界的な経済危機は？",
    choices: ["ルネサンス", "世界恐慌", "冷戦", "産業革命"],
    answer: 1,
    explanation:
      "アメリカの株価暴落を契機に金融や生産・雇用の危機が世界へ広がりました。",
    topic: "歴史と暮らし",
  },
  {
    id: "v2-world-normal-035",
    category: "world",
    difficulty: "normal",
    prompt: "ヨーロッパの「ルネサンス」の説明として合うのは？",
    choices: [
      "アメリカ合衆国の独立運動だけを指す言葉",
      "蒸気機関による工場生産だけを指す言葉",
      "古代ギリシャ・ローマの文化を見直し、芸術や学問が発展した動き",
      "二十世紀の宇宙開発競争",
    ],
    answer: 2,
    explanation:
      "ルネサンスは文芸復興とも呼ばれ、古代の文化を学び直す動きとともに芸術や学問が発展しました。",
    topic: "歴史と暮らし",
  },
  {
    id: "v2-world-hard-001",
    category: "world",
    difficulty: "hard",
    prompt:
      "同じ季節に、ふもとの町から標高の高い山へ行く。気温について、一般的に予想されるのは？",
    choices: [
      "山の方が低い傾向がある",
      "山の方が高い傾向がある",
      "標高に関係なく必ず同じ",
      "山では季節による変化がなくなる",
    ],
    answer: 0,
    explanation:
      "地上付近では、一般に標高が上がるほど気温は下がります。実際の気温には天気や地形なども影響します。",
    topic: "気候",
  },
  {
    id: "v2-world-hard-002",
    category: "world",
    difficulty: "hard",
    prompt:
      "北へ二百メートル進み、左に曲がって百メートル進んだ。出発地点から見ると、どちら側にいる？",
    choices: ["北東側", "北西側", "南西側", "南東側"],
    answer: 1,
    explanation:
      "北を向いて左は西です。出発地点より北へ二百メートル、西へ百メートルの位置にいます。",
    topic: "地図の読み方",
  },
  {
    id: "v2-world-hard-003",
    category: "world",
    difficulty: "hard",
    prompt:
      "地図の目盛りで二センチメートルが一キロメートルを表す。道に沿って測ると合計五センチメートルだった。実際の道のりは？",
    choices: [
      "五キロメートル",
      "十キロメートル",
      "二・五キロメートル",
      "一キロメートル",
    ],
    answer: 2,
    explanation:
      "一センチメートルが〇・五キロメートルなので、五センチメートルは二・五キロメートルです。",
    topic: "地図の読み方",
  },
  {
    id: "v2-world-hard-004",
    category: "world",
    difficulty: "hard",
    prompt: "東京から本州を西へ進むとき、次の都市が東から西へ並ぶ順番は？",
    choices: [
      "大阪→名古屋→広島",
      "広島→名古屋→大阪",
      "名古屋→広島→大阪",
      "名古屋→大阪→広島",
    ],
    answer: 3,
    explanation:
      "名古屋は中部地方、大阪は近畿地方、広島は中国地方にあり、この順に西へ位置します。",
    topic: "日本の地理",
  },
  {
    id: "v2-world-hard-005",
    category: "world",
    difficulty: "hard",
    prompt:
      "日本の方が相手の国より九時間進んでいる。日本で月曜の午前三時なら、相手側は？",
    choices: [
      "日曜の午後六時",
      "月曜の午前六時",
      "月曜の正午",
      "日曜の午後九時",
    ],
    answer: 0,
    explanation:
      "日本の時刻から九時間戻します。午前三時から三時間戻して午前零時、さらに六時間戻すと前日の午後六時です。",
    topic: "時差",
  },
  {
    id: "v2-world-hard-006",
    category: "world",
    difficulty: "hard",
    prompt:
      "日本が夏の八月、南半球のオーストラリアへ行く。現地の季節を考えるときに基本となるのは？",
    choices: [
      "海を渡ると季節が一か月だけ遅れる",
      "南半球では日本と夏・冬の時期が逆",
      "南半球でも八月はすべて夏",
      "同じ日付なら気温も日本と同じ",
    ],
    answer: 1,
    explanation:
      "南半球と北半球では夏と冬の時期が逆です。ただし、実際の気温は都市や標高などでも異なります。",
    topic: "気候",
  },
  {
    id: "v2-world-hard-007",
    category: "world",
    difficulty: "hard",
    prompt:
      "A市もB市も、ある月の降水量は合計百ミリメートルだった。この情報だけで分かるのは？",
    choices: [
      "雨が降った日数が等しい",
      "一度に降った最大量が等しい",
      "その月の降水量の合計が等しい",
      "雨が降った時刻が等しい",
    ],
    answer: 2,
    explanation:
      "同じ合計でも、少量ずつ何日も降った場合と、一日に多く降った場合があります。合計から降り方までは分かりません。",
    topic: "天気",
  },
  {
    id: "v2-world-hard-008",
    category: "world",
    difficulty: "hard",
    prompt:
      "二つの都市の年平均気温が同じだった。冬の寒さについて判断するには、さらに何を見るとよい？",
    choices: [
      "年間の降水量だけ",
      "各都市で最も暑かった日の気温だけ",
      "年間の気温の合計だけ",
      "月ごとの気温",
    ],
    answer: 3,
    explanation:
      "年平均が同じでも、夏は暑く冬は寒い都市と、一年中穏やかな都市があります。季節ごとの値を見る必要があります。",
    topic: "気候",
  },
  {
    id: "v2-world-hard-009",
    category: "world",
    difficulty: "hard",
    prompt:
      "北が上の地図で、駅の二センチ右に学校がある。一センチが百メートルなら、学校は駅からどの位置？",
    choices: [
      "東へ二百メートル",
      "西へ二百メートル",
      "東へ五十メートル",
      "北へ二百メートル",
    ],
    answer: 0,
    explanation:
      "北が上なら右は東です。二センチメートルは、目盛りの二倍の二百メートルに当たります。",
    topic: "地図の読み方",
  },
  {
    id: "v2-world-hard-010",
    category: "world",
    difficulty: "hard",
    prompt:
      "目的地は川の向こう側で、直線では近い。歩いて行く道のりを確認するときに必要なのは？",
    choices: [
      "目的地までの直線を歩けるものとした距離",
      "通行できる橋などを含めた経路",
      "車で通れる最短経路だけ",
      "川沿いの道の幅だけ",
    ],
    answer: 1,
    explanation:
      "徒歩の道のりは、実際に通れる道をたどって調べます。川を越える場所によっては、直線距離より大きく遠回りになります。",
    topic: "地形と水辺",
  },
  {
    id: "v2-world-hard-011",
    category: "world",
    difficulty: "hard",
    prompt:
      "地図の北向きの矢印が、紙の下側を向いている。この地図で東は紙のどちら側？",
    choices: ["下側", "右側", "左側", "上側"],
    answer: 2,
    explanation:
      "北が下なら南は上です。通常の北が上の地図を半回転した状態なので、東は左になります。",
    topic: "地図の読み方",
  },
  {
    id: "v2-world-hard-012",
    category: "world",
    difficulty: "hard",
    prompt:
      "晴れた日に同じ棒の影を比べると、太陽が最も高く上がったころの影は？",
    choices: [
      "北半球では必ずなくなる",
      "朝や夕方より長い",
      "時刻によらず同じ長さ",
      "朝や夕方より短い",
    ],
    answer: 3,
    explanation:
      "太陽が高いほど光が上から当たり、影は短くなります。日本では正午前後に短くなります。",
    topic: "身近な現象",
  },
  {
    id: "v2-world-hard-013",
    category: "world",
    difficulty: "hard",
    prompt: "高い山の上では、水は平地より低い温度で沸騰する。主な理由は？",
    choices: [
      "気圧が低いため",
      "空気が冷たいほど沸点も同じだけ下がるため",
      "加熱器具の火力が弱くなると沸点が下がるため",
      "水の量が少ないほど沸点が下がるため",
    ],
    answer: 0,
    explanation:
      "水の沸点は周囲の圧力で変わります。気圧が低い山では、100 ℃より低い温度でも沸騰します。",
    topic: "身近な現象",
  },
  {
    id: "v2-world-hard-014",
    category: "world",
    difficulty: "hard",
    prompt:
      "よく晴れた海岸の昼、陸の方が海より早く温まると、地表付近には吹きやすい風は？",
    choices: [
      "風向きは昼夜で変わらない",
      "海から陸へ吹く風",
      "陸から海へ吹く風",
      "海岸に沿って北へだけ吹く風",
    ],
    answer: 1,
    explanation:
      "陸上で温まった空気が上昇し、海側から空気が入りやすくなります。大きな天気の流れにも左右されます。",
    topic: "天気",
  },
  {
    id: "v2-world-hard-015",
    category: "world",
    difficulty: "hard",
    prompt: "暖房中の部屋で、足元より天井近くが暖かくなりやすいのはなぜ？",
    choices: [
      "天井から床へ向かってだけ熱が伝わるから",
      "冷たい空気の方が軽く、上に集まるから",
      "暖まった空気が上へ移動しやすいから",
      "空気の温度差は高さだけで決まり、循環では変わらないから",
    ],
    answer: 2,
    explanation:
      "暖かい空気は同じ体積で比べると軽くなり、上昇しやすくなります。空気を循環させると温度差を減らせます。",
    topic: "身近な現象",
  },
  {
    id: "v2-world-hard-016",
    category: "world",
    difficulty: "hard",
    prompt:
      "熱いスープに金属のスプーンを入れておくと、持ち手まで熱くなるのはなぜ？",
    choices: [
      "スープの水分が金属の中を通って持ち手へ移動するから",
      "スプーン全体が最初から同時に同じ熱量を受け取るから",
      "金属は周囲の温度に関係なく自ら熱を作るから",
      "金属の中を熱が伝わるから",
    ],
    answer: 3,
    explanation:
      "金属は熱を伝えやすい材料です。熱い側から冷たい側へ熱が伝わります。",
    topic: "物質とエネルギー",
  },
  {
    id: "v2-world-hard-017",
    category: "world",
    difficulty: "hard",
    prompt:
      "1 気圧で沸騰している水の火力を強くすると、水が残っている間は主にどうなる？",
    choices: [
      "温度は約100℃のまま、蒸発が盛んになる",
      "火力に比例して水温が上がり続ける",
      "水温は約100℃のまま、蒸発量も変わらない",
      "水蒸気になる分だけ水温が下がり続ける",
    ],
    answer: 0,
    explanation:
      "沸騰中に加えた熱は主に、水を水蒸気へ変えるために使われます。火力を強くしても水温は大きく上がりません。",
    topic: "身近な現象",
  },
  {
    id: "v2-world-hard-018",
    category: "world",
    difficulty: "hard",
    prompt:
      "素材や厚さが同じ黒い布と白い布を日なたに置く。黒い布が熱くなりやすい理由は？",
    choices: [
      "黒い色の方が光を多く反射するから",
      "太陽の光を吸収しやすいから",
      "黒い色では光が透過するだけで熱にならないから",
      "布の色で太陽から届く光の強さ自体が変わるから",
    ],
    answer: 1,
    explanation:
      "一般に黒い表面は光を吸収しやすく、白い表面は光を反射しやすい性質があります。",
    topic: "物質とエネルギー",
  },
  {
    id: "v2-world-hard-019",
    category: "world",
    difficulty: "hard",
    prompt:
      "同じ振動の大きさで、音を出すものが 1 秒間に振動する回数だけ増えると？",
    choices: [
      "音の高さは変わらず大きさだけ増す",
      "音が伝わる速さだけ増す",
      "音が高くなる",
      "音が低くなる",
    ],
    answer: 2,
    explanation:
      "振動の回数が多いほど高い音になります。音の大きさとは別の性質です。",
    topic: "身近な現象",
  },
  {
    id: "v2-world-hard-020",
    category: "world",
    difficulty: "hard",
    prompt:
      "空気中の水蒸気量を変えずに気温だけを上げると、相対湿度は一般にどうなる？",
    choices: ["必ず 100％になる", "必ず変わらない", "上がる", "下がる"],
    answer: 3,
    explanation:
      "暖かい空気ほど、飽和に達するまでに多くの水蒸気を含めます。その割合を表す相対湿度は下がります。",
    source: {
      label: "気象庁｜気温、湿度",
      url: "https://www.jma.go.jp/jma/kishou/know/yougo_hp/kion.html",
    },
    topic: "天気",
  },
  {
    id: "v2-world-hard-021",
    category: "world",
    difficulty: "hard",
    prompt: "日食では、太陽と地球の間に何が入って太陽を隠す？",
    choices: ["月", "火星", "地球の影", "金星の影だけ"],
    answer: 0,
    explanation:
      "月が太陽と地球の間に入り、太陽の一部または全部を隠す現象が日食です。",
    topic: "宇宙と暦",
  },
  {
    id: "v2-world-hard-022",
    category: "world",
    difficulty: "hard",
    prompt: "博物館の説明に「一八九九年」とある。これは何世紀の出来事？",
    choices: ["二十一世紀", "十九世紀", "十八世紀", "二十世紀"],
    answer: 1,
    explanation:
      "十九世紀は一八〇一年から一九〇〇年までです。西暦の百年ごとの区切りと、世紀の呼び方を確認しましょう。",
    topic: "歴史と暮らし",
  },
  {
    id: "v2-world-hard-023",
    category: "world",
    difficulty: "hard",
    prompt: "「紀元前三〇〇年」と「紀元前一〇〇年」では、どちらが古い？",
    choices: [
      "紀元前一〇〇年",
      "同じ時期",
      "紀元前三〇〇年",
      "紀元前の数字だけでは前後を比べられない",
    ],
    answer: 2,
    explanation:
      "紀元前は西暦の始まりより前の年代です。数字が大きい方が、より古い時期を表します。",
    topic: "歴史と暮らし",
  },
  {
    id: "v2-world-hard-024",
    category: "world",
    difficulty: "hard",
    prompt: "ベルリンの壁の開放後、東ドイツと西ドイツはどうなった？",
    choices: [
      "東西の国境を残したまま、共通通貨だけを導入した",
      "東ドイツがソ連の領土になった",
      "西ドイツが周辺国に分割された",
      "再統一して一つのドイツになった",
    ],
    answer: 3,
    explanation:
      "一九八九年にベルリンの壁が開放され、一九九〇年に東西ドイツが再統一されました。",
    topic: "歴史と暮らし",
  },
  {
    id: "v2-world-hard-025",
    category: "world",
    difficulty: "hard",
    prompt: "第二次世界大戦後の「冷戦」の説明として最も近いのは？",
    choices: [
      "アメリカとソ連を中心とする陣営の厳しい対立",
      "米ソ両国が直接全面戦争を続けた時代",
      "第一次世界大戦後、ドイツとフランスだけが対立した時代",
      "第二次世界大戦中の連合国と枢軸国の戦争",
    ],
    answer: 0,
    explanation:
      "冷戦は、アメリカとソ連を中心とする陣営が対立した時代を指します。両国の直接の全面戦争には至りませんでしたが、各地の紛争にも関わりました。",
    topic: "歴史と暮らし",
  },
];
