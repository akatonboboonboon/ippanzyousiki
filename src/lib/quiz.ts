import {
  CATEGORY_IDS,
  LEGACY_CATEGORY_IDS,
  type CategoryId,
  type Difficulty,
  type Question,
} from "../data/types";

export interface QuizConfig {
  difficulty: Difficulty | "mix";
  categories: CategoryId[];
  count: number;
  mode: "quiz" | "review" | "diagnostic";
  diagnosticVersion?: string;
}

export const DIAGNOSTIC_VERSION = "standard-v1";
export const DIAGNOSTIC_COUNT = 60;

// Keep a version's axes and eligible IDs fixed when the practice bank grows.
const DIAGNOSTIC_CATEGORIES = [
  "household",
  "health",
  "money",
  "consumer",
  "work",
  "manners",
  "public",
  "safety",
  "digital",
  "civic",
  "culture",
  "world",
] as const satisfies readonly CategoryId[];
const DIAGNOSTIC_BUCKET_COUNTS = {
  easyText: 2,
  normalText: 1,
  normalImage: 1,
  hardText: 1,
} as const;
type DiagnosticBucket = keyof typeof DIAGNOSTIC_BUCKET_COUNTS;
const DIAGNOSTIC_BUCKETS = Object.keys(
  DIAGNOSTIC_BUCKET_COUNTS,
) as DiagnosticBucket[];
const diagnosticPool = new Map<
  string,
  {
    category: CategoryId;
    difficulty: Difficulty;
    bucket: DiagnosticBucket;
  }
>();
for (const category of DIAGNOSTIC_CATEGORIES) {
  for (const [difficulty, count, bucket] of [
    ["easy", 40, "easyText"],
    ["normal", 35, "normalText"],
    ["hard", 25, "hardText"],
    ["normal", 2, "normalImage"],
  ] as const) {
    for (let number = 1; number <= count; number++) {
      const kind = bucket === "normalImage" ? "visual" : difficulty;
      diagnosticPool.set(
        `v2-${category}-${kind}-${String(number).padStart(3, "0")}`,
        {
          category,
          difficulty,
          bucket,
        },
      );
    }
  }
}
// These household additions shipped with standard-v1; later additions need a new version.
const diagnosticExtraPool = new Map<string, CategoryId>();
for (const [category, count] of [
  ["household", 40],
  ["health", 10],
  ["consumer", 10],
] as const) {
  for (let number = 1; number <= count; number++)
    diagnosticExtraPool.set(
      `v2-${category}-extra-${String(number).padStart(3, "0")}`,
      category,
    );
}

export function createDiagnosticConfig(): QuizConfig {
  return {
    mode: "diagnostic",
    diagnosticVersion: DIAGNOSTIC_VERSION,
    difficulty: "mix",
    categories: [...DIAGNOSTIC_CATEGORIES],
    count: DIAGNOSTIC_COUNT,
  };
}

/** Accept either a config or a record containing one; item quotas are checked by validRecord. */
export function isStandardDiagnostic(value: unknown): boolean {
  if (!value || typeof value !== "object") return false;
  const config = (
    "config" in value ? value.config : value
  ) as Partial<QuizConfig> | null;
  return (
    !!config &&
    typeof config === "object" &&
    config.mode === "diagnostic" &&
    config.diagnosticVersion === DIAGNOSTIC_VERSION &&
    config.count === DIAGNOSTIC_COUNT &&
    config.difficulty === "mix" &&
    Array.isArray(config.categories) &&
    config.categories.length === DIAGNOSTIC_CATEGORIES.length &&
    new Set(config.categories).size === DIAGNOSTIC_CATEGORIES.length &&
    DIAGNOSTIC_CATEGORIES.every((category) =>
      config.categories!.includes(category),
    )
  );
}

function diagnosticBucket(question: Question): DiagnosticBucket | null {
  const expected = diagnosticPool.get(question.id);
  if (!expected) {
    if (
      diagnosticExtraPool.get(question.id) !== question.category ||
      question.image !== undefined
    )
      return null;
    return (
      ({ easy: "easyText", normal: "normalText", hard: "hardText" } as const)[
        question.difficulty
      ] ?? null
    );
  }
  if (
    question.category !== expected.category ||
    question.difficulty !== expected.difficulty
  )
    return null;
  if (expected.bucket === "normalImage") {
    if (
      !question.image ||
      !question.image.src?.trim() ||
      !question.image.alt?.trim()
    )
      return null;
  } else if (question.image !== undefined) return null;
  return expected.bucket;
}

function selectDiagnosticQuestions(
  bank: Question[],
  random: () => number,
): Question[] {
  const unique = [
    ...new Map(bank.map((question) => [question.id, question])).values(),
  ];
  const queues = shuffle(DIAGNOSTIC_CATEGORIES, random).map((category) => {
    const selected = DIAGNOSTIC_BUCKETS.flatMap((bucket) => {
      const candidates = unique.filter(
        (question) =>
          question.category === category &&
          diagnosticBucket(question) === bucket,
      );
      const needed = DIAGNOSTIC_BUCKET_COUNTS[bucket];
      if (candidates.length < needed)
        throw new Error(
          "標準診断の問題が不足しています。問題データを更新してから、もう一度お試しください。",
        );
      return shuffle(candidates, random).slice(0, needed);
    });
    return shuffle(selected, random);
  });
  // Five rounds of twelve keep every category represented throughout the run.
  return Array.from({ length: 5 }, (_, round) =>
    queues.map((queue) => queue[round]),
  ).flat();
}

function hasDiagnosticDistribution(
  items: QuizItem[],
  bank: Map<string, Question>,
): boolean {
  if (items.length !== DIAGNOSTIC_COUNT) return false;
  const counts = new Map<string, number>();
  for (const item of items) {
    const question = bank.get(item.questionId);
    if (!question) return false;
    const bucket = diagnosticBucket(question);
    if (!bucket) return false;
    const key = `${question.category}/${bucket}`;
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  return DIAGNOSTIC_CATEGORIES.every((category) =>
    DIAGNOSTIC_BUCKETS.every(
      (bucket) =>
        counts.get(`${category}/${bucket}`) ===
        DIAGNOSTIC_BUCKET_COUNTS[bucket],
    ),
  );
}
export interface QuizItem {
  questionId: string;
  order: number[];
}
export interface Session {
  id: string;
  config: QuizConfig;
  items: QuizItem[];
  answers: (number | null)[];
  index: number;
  startedAt: number;
}
export interface Result {
  id: string;
  config: QuizConfig;
  items: QuizItem[];
  answers: number[];
  startedAt: number;
  finishedAt: number;
}
export interface CategoryScore {
  category: CategoryId;
  correct: number;
  total: number;
  percent: number | null;
}

export function shuffle<T>(items: readonly T[], random = Math.random): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function selectQuestions(
  bank: Question[],
  config: QuizConfig,
  random = Math.random,
): Question[] {
  if (config.mode === "diagnostic") {
    if (!isStandardDiagnostic(config))
      throw new Error(
        "標準診断の設定が正しくありません。ホームから診断を開始し直してください。",
      );
    return selectDiagnosticQuestions(bank, random);
  }
  if (Object.prototype.hasOwnProperty.call(config, "diagnosticVersion"))
    throw new Error(
      "診断バージョンは標準診断でのみ指定できます。ホームから開始し直してください。",
    );
  const eligible = bank.filter(
    (q) =>
      config.categories.includes(q.category) &&
      (config.difficulty === "mix" || config.difficulty === q.difficulty),
  );
  const categories = shuffle(config.categories, random);
  const difficulties = shuffle(["easy", "normal", "hard"] as const, random);
  const queues = categories.map((category, categoryIndex) => {
    const pools = difficulties.map((difficulty) =>
      shuffle(
        eligible.filter(
          (q) => q.category === category && q.difficulty === difficulty,
        ),
        random,
      ),
    );
    const queue: Question[] = [];
    let round = categoryIndex;
    while (pools.some((pool) => pool.length)) {
      const pool = pools[round++ % pools.length];
      const question = pool.pop();
      if (question) queue.push(question);
    }
    return queue;
  });
  const selected: Question[] = [];
  while (
    selected.length < Math.min(config.count, eligible.length) &&
    queues.some((q) => q.length)
  ) {
    for (const queue of queues) {
      const next = queue.shift();
      if (next && selected.length < config.count) selected.push(next);
    }
  }
  return selected;
}

export function createSession(bank: Question[], config: QuizConfig): Session {
  const selected = selectQuestions(bank, config);
  if (!selected.length)
    throw new Error("出題できる問題がありません。条件を変更してください。");
  return {
    id: crypto.randomUUID(),
    config: {
      ...config,
      categories: [...config.categories],
      count: selected.length,
    },
    items: selected.map((q) => ({
      questionId: q.id,
      order: shuffle([0, 1, 2, 3]),
    })),
    answers: Array(selected.length).fill(null),
    index: 0,
    startedAt: Date.now(),
  };
}

export function categoryScores(
  result: Pick<Result, "items" | "answers">,
  bank: Map<string, Question>,
): CategoryScore[] {
  const legacy = result.items.some(
    (item) => !item.questionId.startsWith("v2-"),
  );
  return (legacy ? LEGACY_CATEGORY_IDS : CATEGORY_IDS).map((category) => {
    let total = 0;
    let correct = 0;
    result.items.forEach((item, index) => {
      const question = bank.get(item.questionId);
      if (
        !question ||
        question.category !== category ||
        result.answers[index] === undefined
      )
        return;
      total++;
      if (item.order[result.answers[index]] === question.answer) correct++;
    });
    return {
      category,
      total,
      correct,
      percent: total ? Math.round((correct / total) * 100) : null,
    };
  });
}

export function getGrade(percent: number) {
  if (percent >= 90)
    return {
      rank: "S",
      name: "知識の達人",
      message:
        "幅広い知識が、しっかりあなたの力になっています。次は違う難易度にも挑戦してみましょう。",
    };
  if (percent >= 75)
    return {
      rank: "A",
      name: "ものしり上手",
      message:
        "頼もしい知識の持ち主。少し苦手な分野を知れば、もっと世界が広がります。",
    };
  if (percent >= 60)
    return {
      rank: "B",
      name: "常識の実力派",
      message:
        "基本の知識が身についています。解説から、新しい「知ってる」を増やしていきましょう。",
    };
  if (percent >= 40)
    return {
      rank: "C",
      name: "伸びしろ発見家",
      message:
        "これから知る楽しみがたくさん。気になるジャンルから、一歩ずつ進んでみましょう。",
    };
  return {
    rank: "D",
    name: "知識の冒険者",
    message:
      "今日が新しい知識との出会い。正解できなかった問題こそ、次の一歩につながります。",
  };
}

export function finishSession(session: Session): Result {
  if (session.answers.some((answer) => answer === null))
    throw new Error("未回答の問題があります。");
  return {
    id: session.id,
    config: session.config,
    items: session.items,
    answers: session.answers as number[],
    startedAt: session.startedAt,
    finishedAt: Date.now(),
  };
}

// Local storage is untrusted input: validate it against the current question bank.
export function validRecord(
  value: unknown,
  bank: Map<string, Question>,
  session = false,
): value is Session & Result {
  if (!value || typeof value !== "object") return false;
  const r = value as Session & Result;
  if (
    typeof r.id !== "string" ||
    !Number.isFinite(r.startedAt) ||
    !Number.isFinite(new Date(r.startedAt).getTime()) ||
    !r.config ||
    !["quiz", "review", "diagnostic"].includes(r.config.mode)
  )
    return false;
  if (
    r.config.mode === "diagnostic"
      ? !isStandardDiagnostic(r.config)
      : Object.prototype.hasOwnProperty.call(r.config, "diagnosticVersion")
  )
    return false;
  if (
    !["mix", "easy", "normal", "hard"].includes(r.config.difficulty) ||
    !Array.isArray(r.config.categories) ||
    !r.config.categories.length
  )
    return false;
  if (
    new Set(r.config.categories).size !== r.config.categories.length ||
    !r.config.categories.every((c) =>
      [...CATEGORY_IDS, ...LEGACY_CATEGORY_IDS].includes(c),
    )
  )
    return false;
  if (
    !Array.isArray(r.items) ||
    !r.items.length ||
    r.items.length > bank.size ||
    !Array.isArray(r.answers) ||
    r.answers.length !== r.items.length ||
    r.config.count !== r.items.length
  )
    return false;
  if (new Set(r.items.map((item) => item?.questionId)).size !== r.items.length)
    return false;
  if (
    !r.items.every(
      (item) =>
        item &&
        bank.has(item.questionId) &&
        r.config.categories.includes(bank.get(item.questionId)!.category) &&
        (r.config.difficulty === "mix" ||
          bank.get(item.questionId)!.difficulty === r.config.difficulty) &&
        Array.isArray(item.order) &&
        item.order.length === 4 &&
        item.order.every(Number.isInteger) &&
        [...item.order].sort().join("") === "0123",
    )
  )
    return false;
  if (
    r.config.mode === "diagnostic" &&
    !hasDiagnosticDistribution(r.items, bank)
  )
    return false;
  const currentEdition = r.items[0].questionId.startsWith("v2-");
  if (
    !r.items.every(
      (item) => item.questionId.startsWith("v2-") === currentEdition,
    )
  )
    return false;
  const allowedCategories: readonly CategoryId[] = currentEdition
    ? CATEGORY_IDS
    : LEGACY_CATEGORY_IDS;
  if (
    !r.config.categories.every((category) =>
      allowedCategories.includes(category),
    )
  )
    return false;
  if (
    !r.answers.every(
      (answer) =>
        (session && answer === null) ||
        (typeof answer === "number" &&
          Number.isInteger(answer) &&
          answer >= 0 &&
          answer <= 3),
    )
  )
    return false;
  if (session) {
    if (!Number.isInteger(r.index) || r.index < 0 || r.index >= r.items.length)
      return false;
    if (
      r.answers.some((answer, i) =>
        i < r.index ? answer === null : i > r.index && answer !== null,
      )
    )
      return false;
  } else if (
    !Number.isFinite(r.finishedAt) ||
    !Number.isFinite(new Date(r.finishedAt).getTime()) ||
    r.finishedAt < r.startedAt
  )
    return false;
  return true;
}

export const STORAGE_KEY = "monosashi-v1";
export interface SavedData {
  history: Result[];
  session: Session | null;
}
export function readSaved(bank: Map<string, Question>): SavedData {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
    return {
      history: Array.isArray(saved.history)
        ? saved.history
            .filter((r: unknown) => validRecord(r, bank))
            .slice(0, 50)
        : [],
      session: validRecord(saved.session, bank, true) ? saved.session : null,
    };
  } catch {
    return { history: [], session: null };
  }
}
