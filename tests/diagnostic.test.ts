import { afterEach, describe, expect, it, vi } from "vitest";
import {
  CATEGORY_IDS,
  LEGACY_CATEGORY_IDS,
  type Difficulty,
  type Question,
} from "../src/data/types";
import archive from "../src/data/archive-v1.json" with { type: "json" };
import {
  DIAGNOSTIC_COUNT,
  DIAGNOSTIC_VERSION,
  STORAGE_KEY,
  createDiagnosticConfig,
  createSession,
  finishSession,
  isStandardDiagnostic,
  readSaved,
  selectQuestions,
  validRecord,
  type QuizConfig,
  type Session,
} from "../src/lib/quiz";

const archivedQuestions = archive as Question[];

function seeded(seed: number) {
  return () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) | 0;
    return (seed >>> 0) / 4294967296;
  };
}

// A full-sized versioned fixture makes these tests independent of later practice additions.
const standardBank: Question[] = CATEGORY_IDS.flatMap((category) =>
  (
    [
      ["easy", 40],
      ["normal", 35],
      ["hard", 25],
      ["visual", 2],
    ] as const
  ).flatMap(([kind, count]) =>
    Array.from({ length: count }, (_, i) => ({
      id: `v2-${category}-${kind}-${String(i + 1).padStart(3, "0")}`,
      category,
      difficulty: kind === "visual" ? "normal" : kind,
      prompt: `${category} ${kind} ${i + 1} の問題`,
      choices: ["正答", "誤答A", "誤答B", "誤答C"] as Question["choices"],
      answer: 0,
      explanation: "検証用の四択問題です。",
      ...(kind === "visual"
        ? {
            image: {
              src: `/images/${category}-${i + 1}.svg`,
              alt: `${category}の図`,
            },
          }
        : {}),
    })),
  ),
);
const standardMap = new Map(
  standardBank.map((question) => [question.id, question]),
);
const futureExtras: Question[] = CATEGORY_IDS.flatMap((category) => {
  const template = standardBank.find(
    (question) => question.category === category,
  )!;
  return (["easy", "normal", "hard"] as Difficulty[]).map((difficulty, i) => ({
    ...template,
    id: `v2-${category}-extra-${999 - i}`,
    difficulty,
  }));
});
const launchExtras: Question[] = (
  [
    ["household", 40],
    ["health", 10],
    ["consumer", 10],
  ] as const
).flatMap(([category, count]) => {
  const template = standardBank.find(
    (question) => question.category === category,
  )!;
  return Array.from({ length: count }, (_, i) => ({
    ...template,
    id: `v2-${category}-extra-${String(i + 1).padStart(3, "0")}`,
    difficulty: (["easy", "normal", "hard"] as const)[i % 3],
  }));
});
const launchBank = [...standardBank, ...launchExtras];
const launchMap = new Map(
  launchBank.map((question) => [question.id, question]),
);

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

function answered(session: Session) {
  const completed = clone(session);
  completed.answers = completed.items.map((item) => item.order.indexOf(0));
  completed.index = completed.items.length - 1;
  return finishSession(completed);
}

afterEach(() => vi.unstubAllGlobals());

describe("versioned standard diagnostic selection", () => {
  it("creates the fixed 60-question config without sharing mutable category arrays", () => {
    const config = createDiagnosticConfig();
    expect(config).toEqual({
      mode: "diagnostic",
      diagnosticVersion: "standard-v3",
      difficulty: "mix",
      count: 60,
      categories: [...CATEGORY_IDS],
    });
    expect(DIAGNOSTIC_COUNT).toBe(60);
    expect(DIAGNOSTIC_VERSION).toBe("standard-v3");
    expect(isStandardDiagnostic(config)).toBe(true);
    expect(isStandardDiagnostic({ config })).toBe(true);
    expect(
      isStandardDiagnostic({
        ...config,
        categories: [...config.categories].reverse(),
      }),
    ).toBe(true);
    config.categories.pop();
    expect(createDiagnosticConfig().categories).toEqual(CATEGORY_IDS);
    expect(isStandardDiagnostic(config)).toBe(false);
  });

  it("preserves every category's text/image/difficulty quotas across 50 seeds and interleaves all axes", () => {
    const samples = new Set<string>();
    const seenImages = new Set<string>();
    for (let seed = 1; seed <= 50; seed++) {
      const selected = selectQuestions(
        launchBank,
        createDiagnosticConfig(),
        seeded(seed),
      );
      expect(selected).toHaveLength(60);
      expect(new Set(selected.map((question) => question.id)).size).toBe(60);
      expect(selected.filter((question) => question.image)).toHaveLength(12);
      for (const category of CATEGORY_IDS) {
        const axis = selected.filter(
          (question) => question.category === category,
        );
        expect(axis).toHaveLength(5);
        expect(
          axis.filter((q) => q.difficulty === "easy" && !q.image),
        ).toHaveLength(2);
        expect(
          axis.filter((q) => q.difficulty === "normal" && !q.image),
        ).toHaveLength(1);
        expect(
          axis.filter((q) => q.difficulty === "normal" && q.image),
        ).toHaveLength(1);
        expect(
          axis.filter((q) => q.difficulty === "hard" && !q.image),
        ).toHaveLength(1);
      }
      for (let round = 0; round < 5; round++)
        expect(
          new Set(
            selected.slice(round * 12, (round + 1) * 12).map((q) => q.category),
          ).size,
        ).toBe(12);
      samples.add(selected.map((q) => q.id).join(","));
      selected.filter((q) => q.image).forEach((q) => seenImages.add(q.id));
    }
    expect(samples.size).toBe(50);
    expect(seenImages.size).toBe(24);
  });

  it("does not change the version's sample when extra, archived, or out-of-range questions are appended", () => {
    const outsideRanges = CATEGORY_IDS.flatMap((category) => {
      const template = standardBank.find((q) => q.category === category)!;
      return (
        [
          ["easy", "041"],
          ["normal", "036"],
          ["hard", "026"],
          ["visual", "003"],
        ] as const
      ).map(([kind, number]) => ({
        ...template,
        id: `v2-${category}-${kind}-${number}`,
        difficulty: kind === "visual" ? ("normal" as const) : kind,
        ...(kind === "visual"
          ? { image: { src: "/outside.svg", alt: "追加の図" } }
          : {}),
      }));
    });
    const extended = [
      ...launchBank,
      ...futureExtras,
      ...outsideRanges,
      ...archivedQuestions,
    ];
    for (const seed of [1, 7, 42]) {
      expect(
        selectQuestions(extended, createDiagnosticConfig(), seeded(seed)),
      ).toEqual(
        selectQuestions(launchBank, createDiagnosticConfig(), seeded(seed)),
      );
    }
  });

  it("includes all 60 launch additions but freezes their category and numeric ID boundaries", () => {
    expect(launchBank).toHaveLength(1284);
    const session = createSession(standardBank, createDiagnosticConfig());
    for (const extra of launchExtras) {
      const revised = clone(session);
      const item = revised.items.find((entry) => {
        const q = standardMap.get(entry.questionId)!;
        return (
          q.category === extra.category &&
          q.difficulty === extra.difficulty &&
          !q.image
        );
      })!;
      item.questionId = extra.id;
      expect(validRecord(revised, launchMap, true), extra.id).toBe(true);
      expect(validRecord(answered(revised), launchMap), extra.id).toBe(true);
    }
    const seen = new Set<string>();
    for (let seed = 1; seed <= 25; seed++)
      selectQuestions(launchBank, createDiagnosticConfig(), seeded(seed))
        .filter((q) => q.id.includes("-extra-"))
        .forEach((q) => seen.add(q.category));
    expect([...seen].sort()).toEqual(["consumer", "health", "household"]);
    for (const [category, number] of [
      ["household", "041"],
      ["health", "011"],
      ["consumer", "011"],
      ["work", "001"],
    ] as const) {
      const outside = {
        ...standardBank.find((q) => q.category === category)!,
        id: `v2-${category}-extra-${number}`,
      };
      const withOutside = [...launchBank, outside];
      expect(
        selectQuestions(withOutside, createDiagnosticConfig(), seeded(42)),
      ).toEqual(
        selectQuestions(launchBank, createDiagnosticConfig(), seeded(42)),
      );
      const revised = clone(session);
      revised.items.find((entry) => {
        const q = standardMap.get(entry.questionId)!;
        return q.category === category && q.difficulty === "easy";
      })!.questionId = outside.id;
      expect(
        validRecord(
          revised,
          new Map([...launchMap, [outside.id, outside]]),
          true,
        ),
      ).toBe(false);
    }
  });

  it("never lets duplicate bank entries satisfy a required quota or repeat an ID", () => {
    const doubled = [...standardBank, ...standardBank];
    expect(
      new Set(
        selectQuestions(doubled, createDiagnosticConfig(), seeded(1)).map(
          (q) => q.id,
        ),
      ).size,
    ).toBe(60);
    const onlyOneEasy = standardBank.filter(
      (q) =>
        q.category !== "health" ||
        q.difficulty !== "easy" ||
        q.id.endsWith("001"),
    );
    const duplicate = onlyOneEasy.find((q) => q.id === "v2-health-easy-001")!;
    expect(() =>
      selectQuestions([...onlyOneEasy, duplicate], createDiagnosticConfig()),
    ).toThrow("問題が不足");
  });

  it("fails instead of shortening the diagnostic when any axis lacks a required bucket", () => {
    for (const category of CATEGORY_IDS) {
      for (const kind of ["easy", "normal", "hard", "visual"] as const) {
        const incomplete = standardBank.filter(
          (q) => !q.id.startsWith(`v2-${category}-${kind}-`),
        );
        expect(
          () => selectQuestions(incomplete, createDiagnosticConfig()),
          `${category}/${kind}`,
        ).toThrow("問題が不足");
        expect(() =>
          createSession(incomplete, createDiagnosticConfig()),
        ).toThrow("問題が不足");
      }
    }
  });

  it("rejects a missing/unknown version or a changed diagnostic configuration", () => {
    const config = createDiagnosticConfig();
    const invalid = [
      { ...config, diagnosticVersion: undefined },
      { ...config, diagnosticVersion: "standard-v4" },
      { ...config, count: 59 },
      { ...config, count: 61 },
      { ...config, difficulty: "easy" },
      { ...config, categories: config.categories.slice(1) },
      {
        ...config,
        categories: [...config.categories.slice(1), config.categories[1]],
      },
      { ...config, categories: [...config.categories.slice(1), "science"] },
      { ...config, categories: null },
    ];
    for (const value of invalid) {
      expect(isStandardDiagnostic(value)).toBe(false);
      expect(() => selectQuestions(standardBank, value as QuizConfig)).toThrow(
        "設定が正しくありません",
      );
    }
    for (const value of [null, undefined, {}, { config: null }, "standard-v1"])
      expect(isStandardDiagnostic(value)).toBe(false);
  });

  it("requires the frozen ID's category, difficulty and actual image format to match", () => {
    for (const alter of [
      (q: Question) => ({ ...q, image: undefined }),
      (q: Question) => ({ ...q, image: { src: "", alt: "図" } }),
      (q: Question) => ({ ...q, category: "world" as const }),
      (q: Question) => ({ ...q, difficulty: "easy" as const }),
    ]) {
      const malformed = standardBank.map((q) =>
        q.id.startsWith("v2-household-visual-") ? alter(q) : q,
      );
      expect(() =>
        selectQuestions(malformed, createDiagnosticConfig()),
      ).toThrow("問題が不足");
    }
  });
});

describe("diagnostic persistence and compatibility", () => {
  it("recovers an unfinished standard diagnostic and a finished result with the same version and item order", () => {
    const session = createSession(standardBank, createDiagnosticConfig());
    session.index = 12;
    session.answers = session.answers.map((answer, i) =>
      i < 12 ? i % 4 : answer,
    );
    const result = answered(session);
    const serialized = JSON.stringify({ session, history: [result] });
    const getItem = vi.fn(() => serialized);
    vi.stubGlobal("localStorage", { getItem });
    expect(validRecord(clone(session), standardMap, true)).toBe(true);
    expect(validRecord(clone(result), standardMap)).toBe(true);
    const restored = readSaved(standardMap);
    expect(getItem).toHaveBeenCalledWith(STORAGE_KEY);
    expect(restored).toEqual({ session, history: [result] });
    expect(isStandardDiagnostic(restored.session)).toBe(true);
    expect(isStandardDiagnostic(restored.history[0])).toBe(true);
  });

  it("rejects forged diagnostic configs and same-length records that violate per-axis quotas", () => {
    const session = createSession(standardBank, createDiagnosticConfig());
    const used = new Set(session.items.map((item) => item.questionId));
    const replacements = [
      {
        from: "v2-household-easy-",
        to: (q: Question) =>
          q.category === "household" && q.difficulty === "hard",
      },
      {
        from: "v2-household-normal-",
        to: (q: Question) => q.category === "household" && !!q.image,
      },
      {
        from: "v2-household-visual-",
        to: (q: Question) =>
          q.category === "household" && q.difficulty === "normal" && !q.image,
      },
      {
        from: "v2-household-hard-",
        to: (q: Question) => q.category === "world" && q.difficulty === "hard",
      },
    ];
    for (const replacement of replacements) {
      const forged = clone(session);
      const item = forged.items.find((entry) =>
        entry.questionId.startsWith(replacement.from),
      )!;
      item.questionId = standardBank.find(
        (q) => !used.has(q.id) && replacement.to(q),
      )!.id;
      expect(validRecord(forged, standardMap, true)).toBe(false);
      expect(validRecord(answered(forged), standardMap)).toBe(false);
    }
    for (const config of [
      { ...session.config, diagnosticVersion: undefined },
      { ...session.config, diagnosticVersion: "other" },
      { ...session.config, categories: session.config.categories.slice(1) },
      { ...session.config, difficulty: "normal" },
      { ...session.config, count: 59 },
    ])
      expect(validRecord({ ...session, config }, standardMap, true)).toBe(
        false,
      );
  });

  it("rejects an added practice question substituted for an otherwise identical standard item", () => {
    const session = createSession(standardBank, createDiagnosticConfig());
    const original = standardMap.get(session.items[0].questionId)!;
    const extra = { ...original, id: `v2-${original.category}-extra-999` };
    const mapWithExtra = new Map([...standardMap, [extra.id, extra]]);
    session.items[0].questionId = extra.id;
    expect(validRecord(session, mapWithExtra, true)).toBe(false);
    expect(validRecord(answered(session), mapWithExtra)).toBe(false);
    vi.stubGlobal("localStorage", {
      getItem: () => JSON.stringify({ session, history: [answered(session)] }),
    });
    expect(readSaved(mapWithExtra)).toEqual({ history: [], session: null });
  });

  it("rejects malformed diagnostic answers, item permutations, timestamps and incomplete completion", () => {
    const session = createSession(standardBank, createDiagnosticConfig());
    expect(() => finishSession(session)).toThrow("未回答");
    for (const malformed of [
      { ...session, items: [session.items[0], ...session.items.slice(0, -1)] },
      {
        ...session,
        items: [
          { ...session.items[0], order: [0, 1, 1, 3] },
          ...session.items.slice(1),
        ],
      },
      {
        ...session,
        items: session.items.slice(1),
        answers: session.answers.slice(1),
        config: { ...session.config, count: 59 },
      },
      { ...session, answers: [4, ...session.answers.slice(1)] },
      {
        ...session,
        answers: session.answers.map((answer, i) => (i === 5 ? 1 : answer)),
      },
      { ...session, startedAt: 1e100 },
      { ...session, index: 60 },
    ])
      expect(validRecord(malformed, standardMap, true)).toBe(false);
    const result = answered(session);
    expect(
      validRecord({ ...result, finishedAt: result.startedAt - 1 }, standardMap),
    ).toBe(false);
  });

  it("disallows diagnostic metadata on quiz/review while retaining both current and archive-v1 records without it", () => {
    const legacyMap = new Map(archivedQuestions.map((q) => [q.id, q]));
    for (const mode of ["quiz", "review"] as const) {
      const config: QuizConfig = {
        mode,
        categories: [...CATEGORY_IDS],
        difficulty: "mix",
        count: 20,
      };
      const current = createSession(standardBank, config);
      const legacy = createSession(archivedQuestions, {
        ...config,
        categories: [...LEGACY_CATEGORY_IDS],
      });
      expect(validRecord(current, standardMap, true)).toBe(true);
      expect(validRecord(answered(current), standardMap)).toBe(true);
      expect(validRecord(legacy, legacyMap, true)).toBe(true);
      expect(validRecord(answered(legacy), legacyMap)).toBe(true);
      expect(isStandardDiagnostic(current)).toBe(false);
      expect(isStandardDiagnostic(legacy)).toBe(false);
      for (const diagnosticVersion of [DIAGNOSTIC_VERSION, undefined]) {
        const invalid = { ...config, diagnosticVersion };
        expect(() => createSession(standardBank, invalid)).toThrow(
          "診断バージョン",
        );
        expect(
          validRecord({ ...current, config: invalid }, standardMap, true),
        ).toBe(false);
      }
    }
  });
});
