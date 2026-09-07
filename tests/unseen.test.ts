import { describe, expect, it } from "vitest";
import {
  questions,
  publishedQuestions,
  revisedQuestions,
  questionMap,
} from "../src/data/questions";
import { CATEGORY_IDS, type Question } from "../src/data/types";
import {
  createDiagnosticConfig,
  createSession,
  selectQuestions,
  validRecord,
  type QuizConfig,
} from "../src/lib/quiz";
import type { LearningProgress } from "../src/lib/learning";

function seeded(seed: number) {
  return () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) | 0;
    return (seed >>> 0) / 4294967296;
  };
}
const bank: Question[] = Array.from({ length: 100 }, (_, i) => ({
  ...questions[0],
  id: `v2-unseen-${i}`,
  category: "household",
  difficulty: "easy",
}));
const config: QuizConfig = {
  mode: "quiz",
  categories: ["household"],
  difficulty: "easy",
  count: 24,
};
const progress = (correct: boolean, at = 1) => ({
  lastSeenAt: at,
  lastSessionId: `past-${at}`,
  lastAnsweredAt: at,
  correct,
});

describe("unseen-first selection", () => {
  it("leaves correct answers out while unseen questions suffice, and continues across sessions", () => {
    const learning: LearningProgress = {};
    const seen = new Set<string>();
    for (let round = 0; round < 4; round++) {
      const selected = selectQuestions(bank, config, seeded(round), learning);
      expect(selected).toHaveLength(24);
      for (const q of selected) {
        expect(seen.has(q.id)).toBe(false);
        seen.add(q.id);
        learning[q.id] = progress(true, round + 1);
      }
    }
    expect(seen.size).toBe(96);
  });

  it("randomly mixes at most one fifth wrong answers when unseen items suffice, choosing older mistakes first", () => {
    const learning: LearningProgress = Object.fromEntries(
      bank.slice(0, 50).map((q, i) => [q.id, progress(i >= 25, i + 1)]),
    );
    const positions = new Set<string>();
    for (let seed = 1; seed <= 40; seed++) {
      const selected = selectQuestions(bank, config, seeded(seed), learning);
      expect(selected).toHaveLength(24);
      expect(new Set(selected.map((q) => q.id)).size).toBe(24);
      const wrong = selected.filter((q) => learning[q.id]?.correct === false);
      expect(wrong).toHaveLength(4);
      expect(new Set(wrong.map((q) => q.id))).toEqual(
        new Set(bank.slice(0, 4).map((q) => q.id)),
      );
      expect(selected.filter((q) => !learning[q.id])).toHaveLength(20);
      expect(selected.some((q) => learning[q.id]?.correct === true)).toBe(
        false,
      );
      positions.add(
        selected
          .map((q, i) => (learning[q.id] ? i : -1))
          .filter((i) => i >= 0)
          .join(","),
      );
    }
    expect(positions.size).toBeGreaterThan(10);
  });

  it("fills shortages with mistakes then the least recently seen answers and can exhaust the pool", () => {
    const learning = Object.fromEntries(
      bank.map((q, i) => [q.id, progress(i !== 5 && i !== 8, i + 1)]),
    );
    const selected = selectQuestions(
      bank,
      { ...config, count: 4 },
      seeded(12),
      learning,
    );
    expect(selected.map((q) => q.id)).toEqual([
      bank[5].id,
      bank[8].id,
      bank[0].id,
      bank[1].id,
    ]);
    const exhaustive = selectQuestions(
      [...bank, bank[0]],
      { ...config, count: 200 },
      seeded(20),
      learning,
    );
    expect(exhaustive).toHaveLength(100);
    expect(new Set(exhaustive.map((q) => q.id)).size).toBe(100);
    learning[bank[5].id] = progress(true, 101);
    expect(
      selectQuestions(bank, { ...config, count: 1 }, seeded(5), learning)[0].id,
    ).toBe(bank[8].id);
  });

  it("preserves practice category/difficulty allocation and leaves explicit review unchanged", () => {
    const learning = Object.fromEntries(
      questions
        .filter((_, i) => i % 3)
        .map((q, i) => [q.id, progress(i % 2 === 0, i + 1)]),
    );
    const practice: QuizConfig = {
      ...config,
      categories: [...CATEGORY_IDS],
      difficulty: "mix",
      count: 96,
    };
    const counts = (sample: Question[]) =>
      Object.fromEntries(
        CATEGORY_IDS.flatMap((category) =>
          ["easy", "normal", "hard"].map((difficulty) => [
            `${category}/${difficulty}`,
            sample.filter(
              (q) => q.category === category && q.difficulty === difficulty,
            ).length,
          ]),
        ),
      );
    expect(
      counts(selectQuestions(questions, practice, seeded(23), learning)),
    ).toEqual(counts(selectQuestions(questions, practice, seeded(23))));
    const review: QuizConfig = { ...practice, mode: "review", count: 20 };
    expect(
      selectQuestions(questions.slice(0, 20), review, seeded(41), learning),
    ).toEqual(selectQuestions(questions.slice(0, 20), review, seeded(41)));
    expect(
      selectQuestions(
        questions,
        { ...config, categories: [] },
        seeded(2),
        learning,
      ),
    ).toEqual([]);
  });

  it("keeps all six old diagnostic draws identical regardless of learning state", () => {
    const learning = Object.fromEntries(
      questions.map((q, i) => [q.id, progress(false, i + 1)]),
    );
    for (const version of [
      "standard-v1",
      "standard-v2",
      "standard-v3",
      "standard-v4",
      "standard-v5",
      "standard-v6",
    ] as const) {
      const pool =
        version === "standard-v6"
          ? questions
          : version === "standard-v5"
            ? revisedQuestions
            : publishedQuestions;
      for (const seed of [1, 4, 23, 52]) {
        const settings = createDiagnosticConfig(version);
        expect(selectQuestions(pool, settings, seeded(seed), learning)).toEqual(
          selectQuestions(pool, settings, seeded(seed)),
        );
      }
    }
  });

  it("gives standard 7 the same fixed bank and quotas while preferring unseen items, and restores it", () => {
    const learning: LearningProgress = {};
    const unseen = new Set<string>();
    for (const category of CATEGORY_IDS) {
      for (const [difficulty, image, needed] of [
        ["easy", false, 2],
        ["normal", false, 1],
        ["normal", true, 1],
        ["hard", false, 1],
      ] as const) {
        const pool = questions.filter(
          (q) =>
            q.category === category &&
            q.difficulty === difficulty &&
            Boolean(q.image) === image,
        );
        pool.slice(0, needed).forEach((q) => unseen.add(q.id));
        pool.slice(needed).forEach((q) => (learning[q.id] = progress(true)));
      }
    }
    const settings = createDiagnosticConfig();
    expect(settings.diagnosticVersion).toBe("standard-v7");
    for (let seed = 1; seed <= 10; seed++) {
      const sample = selectQuestions(
        questions,
        settings,
        seeded(seed),
        learning,
      );
      expect(new Set(sample.map((q) => q.id))).toEqual(unseen);
      expect(sample.filter((q) => q.image)).toHaveLength(12);
      expect(sample.filter((q) => q.difficulty === "easy")).toHaveLength(24);
      expect(sample.filter((q) => q.difficulty === "hard")).toHaveLength(12);
      for (const category of CATEGORY_IDS)
        expect(sample.filter((q) => q.category === category)).toHaveLength(5);
      expect(selectQuestions(questions, settings, seeded(seed))).toEqual(
        selectQuestions(
          questions,
          createDiagnosticConfig("standard-v6"),
          seeded(seed),
        ),
      );
    }
    const session = createSession(questions, settings, learning);
    expect(validRecord(session, questionMap, true)).toBe(true);
    expect(new Set(session.items.map((item) => item.questionId))).toEqual(
      unseen,
    );
  });
});
