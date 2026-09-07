import {
  CATEGORY_IDS,
  LEGACY_CATEGORY_IDS,
  type CategoryId,
  type Difficulty,
  type Question,
} from "../data/types";
import { currentChoiceId, originalChoiceId } from "../data/choice-revisions";
import {
  currentEditorialId,
  originalEditorialId,
} from "../data/editorial-revisions";
import {
  currentKnowledgeId,
  originalKnowledgeId,
} from "../data/knowledge-revisions";
import { restoreLearning, type LearningProgress } from "./learning";
import depthDiagnosticManifest from "../data/diagnostic-depth.json" with { type: "json" };

export interface QuizConfig {
  difficulty: Difficulty | "mix";
  categories: CategoryId[];
  count: number;
  mode: "quiz" | "review" | "diagnostic";
  diagnosticVersion?: string;
}

export const DIAGNOSTIC_VERSION = "standard-v11";
export const DIAGNOSTIC_COUNT = 60;
const DIAGNOSTIC_NAMES = {
  "standard-v1": "標準診断 1",
  "standard-v2": "標準診断 2",
  "standard-v3": "標準診断 3",
  "standard-v4": "標準診断 4",
  "standard-v5": "標準診断 5",
  "standard-v6": "標準診断 6",
  "standard-v7": "標準診断 7",
  "standard-v8": "標準診断 8",
  "standard-v9": "標準診断 9",
  "standard-v10": "標準診断 10",
  "standard-v11": "標準診断 11",
} as const;
type DiagnosticVersion = keyof typeof DIAGNOSTIC_NAMES;

export function diagnosticName(version?: string): string {
  return DIAGNOSTIC_NAMES[version as DiagnosticVersion] ?? "標準診断";
}

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
// Published metadata is frozen separately so future additions cannot enter standard 11.
const depthDiagnosticPool = new Map(
  depthDiagnosticManifest.map((entry) => [entry.id, entry]),
);
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

// Standard 2 adds exactly the 720 published text questions; standard 1 stays unchanged.
const expandedDiagnosticPool = new Map<
  string,
  {
    category: CategoryId;
    difficulty: Difficulty;
    bucket: DiagnosticBucket;
  }
>();
for (const category of DIAGNOSTIC_CATEGORIES) {
  for (const [difficulty, count, bucket] of [
    ["easy", 24, "easyText"],
    ["normal", 24, "normalText"],
    ["hard", 12, "hardText"],
  ] as const) {
    for (let number = 1; number <= count; number++) {
      expandedDiagnosticPool.set(
        `v2-${category}-expanded-${difficulty}-${String(number).padStart(3, "0")}`,
        { category, difficulty, bucket },
      );
    }
  }
}

// Standard 3 includes these six topics without changing either earlier pool.
const everydayDiagnosticPool = new Map<
  string,
  { category: CategoryId; difficulty: Difficulty; bucket: DiagnosticBucket }
>();
for (const [category, topic] of [
  ["public", "lost"],
  ["public", "parcel"],
  ["public", "car"],
  ["health", "cooking"],
  ["health", "uv"],
  ["household", "home"],
] as const) {
  for (const [difficulty, count, bucket] of [
    ["easy", 8, "easyText"],
    ["normal", 8, "normalText"],
    ["hard", 4, "hardText"],
  ] as const) {
    for (let n = 1; n <= count; n++) {
      everydayDiagnosticPool.set(
        `v2-${category}-everyday-${topic}-${difficulty}-${String(n).padStart(3, "0")}`,
        { category, difficulty, bucket },
      );
    }
  }
}

// Standard 4 adds the published living topics; older diagnostics retain their pools.
const livingDiagnosticPool = new Map<
  string,
  { category: CategoryId; difficulty: Difficulty; bucket: DiagnosticBucket }
>();
for (const [category, topic] of [
  ["consumer", "rent"],
  ["health", "label"],
  ["household", "recycle"],
  ["household", "battery"],
  ["public", "bicycle"],
  ["world", "familiar"],
] as const) {
  const counts = topic === "battery" ? [6, 6, 3] : [8, 8, 4];
  for (const [difficulty, count, bucket] of [
    ["easy", counts[0], "easyText"],
    ["normal", counts[1], "normalText"],
    ["hard", counts[2], "hardText"],
  ] as const) {
    for (let n = 1; n <= count; n++) {
      livingDiagnosticPool.set(
        `v2-${category}-living-${topic}-${difficulty}-${String(n).padStart(3, "0")}`,
        { category, difficulty, bucket },
      );
    }
  }
}

// The new topics and sign images belong to standard 6; published pools remain fixed.
const dailyDiagnosticPool = new Map<
  string,
  { category: CategoryId; difficulty: Difficulty; bucket: DiagnosticBucket }
>();
for (const [category, topic, counts, images] of [
  ["world", "tools", [6, 6, 3], false],
  ["health", "packaging", [6, 6, 3], false],
  ["money", "utilities", [6, 6, 3], false],
  ["digital", "news", [6, 6, 3], false],
  ["manners", "dining", [6, 6, 3], false],
  ["consumer", "deals", [16, 16, 8], false],
  ["public", "signs", [0, 18, 0], true],
] as const) {
  for (const [i, difficulty] of (
    ["easy", "normal", "hard"] as const
  ).entries()) {
    for (let n = 1; n <= counts[i]; n++) {
      dailyDiagnosticPool.set(
        `v2-${category}-daily-${topic}-${difficulty}-${String(n).padStart(3, "0")}`,
        {
          category,
          difficulty,
          bucket: images
            ? "normalImage"
            : (
                {
                  easy: "easyText",
                  normal: "normalText",
                  hard: "hardText",
                } as const
              )[difficulty],
        },
      );
    }
  }
}

// Standard 8 adds these exact everyday scenes; standards 1–7 retain their banks.
const sceneDiagnosticPool = new Map<
  string,
  { category: CategoryId; difficulty: Difficulty; bucket: DiagnosticBucket }
>();
for (const [category, topic, counts, normalImages] of [
  ["public", "road", [0, 15, 0], 15],
  ["public", "facility", [0, 15, 0], 15],
  ["household", "floorplan", [6, 6, 3], 6],
  ["culture", "family", [6, 6, 3], 6],
  ["household", "bedding", [6, 6, 3], 3],
  ["household", "appliance", [6, 6, 3], 3],
  ["money", "settlement", [6, 6, 3], 0],
  ["consumer", "shopping", [6, 6, 3], 0],
] as const) {
  for (const [i, difficulty] of (
    ["easy", "normal", "hard"] as const
  ).entries()) {
    for (let n = 1; n <= counts[i]; n++) {
      sceneDiagnosticPool.set(
        `v2-${category}-scene-${topic}-${difficulty}-${String(n).padStart(3, "0")}`,
        {
          category,
          difficulty,
          bucket:
            difficulty === "normal" && n <= normalImages
              ? "normalImage"
              : (
                  {
                    easy: "easyText",
                    normal: "normalText",
                    hard: "hardText",
                  } as const
                )[difficulty],
        },
      );
    }
  }
}

// Standard 9 includes the edited wording and these seven fixed topic ranges.
const familiarDiagnosticPool = new Map<
  string,
  { category: CategoryId; difficulty: Difficulty; bucket: DiagnosticBucket }
>();
for (const [category, topic, normalImages] of [
  ["household", "smallitems", 6],
  ["work", "stationery", 3],
  ["culture", "games", 6],
  ["household", "gardening", 3],
  ["public", "library", 3],
  ["digital", "photo", 6],
  ["public", "hotel", 3],
] as const) {
  for (const [difficulty, count] of [
    ["easy", 6],
    ["normal", 6],
    ["hard", 3],
  ] as const) {
    for (let n = 1; n <= count; n++) {
      familiarDiagnosticPool.set(
        `v2-${category}-familiar-${topic}-${difficulty}-${String(n).padStart(3, "0")}`,
        {
          category,
          difficulty,
          bucket:
            difficulty === "normal" && n <= normalImages
              ? "normalImage"
              : (
                  {
                    easy: "easyText",
                    normal: "normalText",
                    hard: "hardText",
                  } as const
                )[difficulty],
        },
      );
    }
  }
}

export function createDiagnosticConfig(
  version: DiagnosticVersion = DIAGNOSTIC_VERSION,
): QuizConfig {
  return {
    mode: "diagnostic",
    diagnosticVersion: version,
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
    typeof config.diagnosticVersion === "string" &&
    Object.prototype.hasOwnProperty.call(
      DIAGNOSTIC_NAMES,
      config.diagnosticVersion,
    ) &&
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

function diagnosticBucket(
  question: Question,
  version: string,
): DiagnosticBucket | null {
  if (version === "standard-v11") {
    const expected = depthDiagnosticPool.get(question.id);
    if (!expected) return diagnosticBucket(question, "standard-v10");
    if (
      question.category !== expected.category ||
      question.difficulty !== expected.difficulty
    )
      return null;
    if (expected.image) {
      if (
        question.difficulty !== "normal" ||
        !question.image?.src?.trim() ||
        !question.image.alt?.trim()
      )
        return null;
      return "normalImage";
    }
    if (question.image !== undefined) return null;
    return (
      { easy: "easyText", normal: "normalText", hard: "hardText" } as const
    )[question.difficulty];
  }
  if (version === "standard-v10") {
    const originalId = originalKnowledgeId(question.id);
    if (currentKnowledgeId(originalId) !== question.id) return null;
    return diagnosticBucket({ ...question, id: originalId }, "standard-v9");
  }
  if (version === "standard-v9") {
    const expected = familiarDiagnosticPool.get(question.id);
    if (expected) {
      if (
        question.category !== expected.category ||
        question.difficulty !== expected.difficulty
      )
        return null;
      if (expected.bucket === "normalImage") {
        if (!question.image?.src?.trim() || !question.image.alt?.trim())
          return null;
      } else if (question.image !== undefined) return null;
      return expected.bucket;
    }
    const originalId = originalEditorialId(question.id);
    if (currentEditorialId(originalId) !== question.id) return null;
    return diagnosticBucket({ ...question, id: originalId }, "standard-v8");
  }
  if (version === "standard-v8") {
    const expected = sceneDiagnosticPool.get(question.id);
    if (!expected) return diagnosticBucket(question, "standard-v7");
    if (
      question.category !== expected.category ||
      question.difficulty !== expected.difficulty
    )
      return null;
    if (expected.bucket === "normalImage") {
      if (!question.image?.src?.trim() || !question.image.alt?.trim())
        return null;
    } else if (question.image !== undefined) return null;
    return expected.bucket;
  }
  // Standard 7 changes selection priority, retaining standard 6's bank and quotas.
  if (version === "standard-v7")
    return diagnosticBucket(question, "standard-v6");
  if (version === "standard-v6") {
    const expected = dailyDiagnosticPool.get(question.id);
    if (!expected) return diagnosticBucket(question, "standard-v5");
    if (
      question.category !== expected.category ||
      question.difficulty !== expected.difficulty
    )
      return null;
    if (expected.bucket === "normalImage") {
      if (!question.image?.src?.trim() || !question.image.alt?.trim())
        return null;
    } else if (question.image !== undefined) return null;
    return expected.bucket;
  }
  if (version === "standard-v5") {
    const originalId = originalChoiceId(question.id);
    if (currentChoiceId(originalId) !== question.id) return null;
    return diagnosticBucket({ ...question, id: originalId }, "standard-v4");
  }
  const expected =
    diagnosticPool.get(question.id) ??
    (["standard-v2", "standard-v3", "standard-v4"].includes(version)
      ? expandedDiagnosticPool.get(question.id)
      : undefined) ??
    (version === "standard-v3" || version === "standard-v4"
      ? everydayDiagnosticPool.get(question.id)
      : undefined) ??
    (version === "standard-v4"
      ? livingDiagnosticPool.get(question.id)
      : undefined);
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
  version: string,
): Question[] {
  const unique = [
    ...new Map(bank.map((question) => [question.id, question])).values(),
  ];
  const queues = shuffle(DIAGNOSTIC_CATEGORIES, random).map((category) => {
    const selected = DIAGNOSTIC_BUCKETS.flatMap((bucket) => {
      const candidates = unique.filter(
        (question) =>
          question.category === category &&
          diagnosticBucket(question, version) === bucket,
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
  version: string,
): boolean {
  if (items.length !== DIAGNOSTIC_COUNT) return false;
  const counts = new Map<string, number>();
  for (const item of items) {
    const question = bank.get(item.questionId);
    if (!question) return false;
    const bucket = diagnosticBucket(question, version);
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
  learning: LearningProgress = {},
): Question[] {
  if (config.mode === "diagnostic") {
    if (!isStandardDiagnostic(config))
      throw new Error(
        "標準診断の設定が正しくありません。ホームから診断を開始し直してください。",
      );
    const version = config.diagnosticVersion!;
    const sample = selectDiagnosticQuestions(bank, random, version);
    return version === "standard-v7" ||
      version === "standard-v8" ||
      version === "standard-v9" ||
      version === "standard-v10" ||
      version === "standard-v11"
      ? prioritizeQuestions(
          sample,
          bank.filter((q) => diagnosticBucket(q, version) !== null),
          learning,
          random,
          (q) => `${q.category}/${diagnosticBucket(q, version)}`,
        )
      : sample;
  }
  if (Object.prototype.hasOwnProperty.call(config, "diagnosticVersion"))
    throw new Error(
      "診断バージョンは標準診断でのみ指定できます。ホームから開始し直してください。",
    );
  const eligible = [...new Map(bank.map((q) => [q.id, q])).values()].filter(
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
  return config.mode === "quiz"
    ? prioritizeQuestions(
        selected,
        eligible,
        learning,
        random,
        (q) => `${q.category}/${q.difficulty}`,
      )
    : selected;
}

// Replace within each allocated slot so learning priority cannot change the quotas.
function prioritizeQuestions(
  sample: Question[],
  bank: Question[],
  learning: LearningProgress,
  random: () => number,
  group: (question: Question) => string,
): Question[] {
  if (!Object.keys(learning).length) return sample;
  const reviewSlots = new Set(
    shuffle(
      sample.map((_, i) => i),
      random,
    ).slice(0, Math.floor(sample.length * 0.2)),
  );
  const pools = new Map<
    string,
    { unseen: Question[]; wrong: Question[]; seen: Question[] }
  >();
  const unique = [...new Map(bank.map((q) => [q.id, q])).values()];
  // Shuffle before sorting to break ties fairly, including migrated histories.
  for (const q of shuffle(unique, random)) {
    const key = group(q);
    const pool = pools.get(key) ?? { unseen: [], wrong: [], seen: [] };
    const progress = learning[q.id];
    if (!progress) pool.unseen.push(q);
    else if (progress.correct === false) pool.wrong.push(q);
    else pool.seen.push(q);
    pools.set(key, pool);
  }
  for (const pool of pools.values()) {
    const oldest = (a: Question, b: Question) =>
      learning[a.id].lastSeenAt - learning[b.id].lastSeenAt;
    pool.wrong.sort(oldest);
    pool.seen.sort(oldest);
  }
  return sample.map((slot, i) => {
    const pool = pools.get(group(slot))!;
    if (pool.unseen.length) {
      return (
        reviewSlots.has(i) && pool.wrong.length ? pool.wrong : pool.unseen
      ).shift()!;
    }
    return (pool.wrong.length ? pool.wrong : pool.seen).shift()!;
  });
}

export function createSession(
  bank: Question[],
  config: QuizConfig,
  learning: LearningProgress = {},
): Session {
  const selected = selectQuestions(bank, config, Math.random, learning);
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
      name: "正答率90%以上",
      message: "ほとんどの問題に正解しました。回答一覧で解説を確認できます。",
    };
  if (percent >= 75)
    return {
      rank: "A",
      name: "正答率75%以上",
      message: "多くの問題に正解しました。間違えた問題の解説も確認できます。",
    };
  if (percent >= 60)
    return {
      rank: "B",
      name: "正答率60%以上",
      message:
        "半分以上の問題に正解しました。ジャンルごとの正答率も確認できます。",
    };
  if (percent >= 40)
    return {
      rank: "C",
      name: "正答率40%以上",
      message: "回答一覧で、正解と解説を確認できます。",
    };
  return {
    rank: "D",
    name: "正答率40%未満",
    message: "回答一覧から、一問ずつ正解と解説を確認できます。",
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
    !hasDiagnosticDistribution(r.items, bank, r.config.diagnosticVersion!)
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
  learning: LearningProgress;
}
export function readSaved(bank: Map<string, Question>): SavedData {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
    const history: Result[] = Array.isArray(saved?.history)
      ? saved.history.filter((r: unknown) => validRecord(r, bank)).slice(0, 50)
      : [];
    const session = validRecord(saved?.session, bank, true)
      ? (saved.session as Session)
      : null;
    const activeBank = new Map(
      [...bank].filter(
        ([id]) =>
          id.startsWith("v2-") &&
          currentChoiceId(originalChoiceId(id)) === id &&
          currentEditorialId(originalEditorialId(id)) === id &&
          currentKnowledgeId(originalKnowledgeId(id)) === id,
      ),
    );
    return {
      history,
      session,
      learning: restoreLearning(saved?.learning, history, session, activeBank),
    };
  } catch {
    return { history: [], session: null, learning: {} };
  }
}
