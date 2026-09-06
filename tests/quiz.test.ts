import { describe, expect, it } from "vitest";
import { CATEGORIES, type Question } from "../src/data/types";
import {
  questions,
  questionMap,
  archivedQuestions,
  activeQuestionIds,
} from "../src/data/questions";
import {
  categoryScores,
  createSession,
  finishSession,
  getGrade,
  selectQuestions,
  validRecord,
  type QuizConfig,
} from "../src/lib/quiz";

const config: QuizConfig = {
  categories: CATEGORIES.map((c) => c.id),
  difficulty: "mix",
  count: 20,
  mode: "quiz",
};
function seeded(seed: number) {
  return () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) | 0;
    return (seed >>> 0) / 4294967296;
  };
}

describe("question bank quality", () => {
  it("keeps historical IDs immutable and archived questions out of the active bank", () => {
    expect(archivedQuestions).toHaveLength(600);
    expect(questionMap.size).toBe(questions.length + archivedQuestions.length);
    for (const original of archivedQuestions) {
      expect(activeQuestionIds.has(original.id)).toBe(false);
      expect(questionMap.get(original.id)).toEqual(original);
    }
  });
  it("has 1284 unique questions with the original 1200, 24 visual questions and 60 new life questions", () => {
    expect(questions).toHaveLength(1284);
    expect(new Set(questions.map((q) => q.id)).size).toBe(1284);
    expect(
      new Set(
        questions.map((q) => q.prompt.normalize("NFKC").replace(/\s/g, "")),
      ).size,
    ).toBe(1284);
    for (const category of CATEGORIES)
      for (const difficulty of ["easy", "normal", "hard"]) {
        expect(
          questions.filter(
            (q) =>
              q.category === category.id &&
              q.difficulty === difficulty &&
              /^v2-[a-z]+-(easy|normal|hard)-\d{3}$/.test(q.id),
          ),
          `${category.id}/${difficulty}`,
        ).toHaveLength(
          { easy: 40, normal: 35, hard: 25 }[
            difficulty as "easy" | "normal" | "hard"
          ],
        );
      }
    expect(questions.filter((q) => q.image)).toHaveLength(24);
    expect(questions.filter((q) => q.id.includes("-extra-"))).toHaveLength(60);
    for (const category of CATEGORIES) {
      expect(
        questions.filter((q) => q.category === category.id && q.image),
      ).toHaveLength(2);
    }
    for (const category of CATEGORIES) {
      expect(
        new Set(
          questions
            .filter((q) => q.category === category.id)
            .map((q) => q.topic),
        ).size,
        category.id,
      ).toBeGreaterThanOrEqual(10);
    }
    for (const q of questions) {
      expect(q.id.startsWith("v2-"), q.id).toBe(true);
      expect(q.topic?.trim().length, q.id).toBeGreaterThan(0);
      expect(q.prompt.length, q.id).toBeGreaterThan(5);
      expect(q.explanation.length, q.id).toBeGreaterThan(10);
      expect(q.choices, q.id).toHaveLength(4);
      expect(new Set(q.choices).size, q.id).toBe(4);
      expect(
        q.choices.every(
          (choice) => typeof choice === "string" && choice.trim(),
        ),
        q.id,
      ).toBe(true);
      expect(
        Number.isInteger(q.answer) && q.answer >= 0 && q.answer <= 3,
        q.id,
      ).toBe(true);
      if (q.source) expect(new URL(q.source.url).protocol, q.id).toBe("https:");
    }
  });
});

describe("balanced selection", () => {
  it("samples equal numbers from all twelve axes for each limited practice preset", () => {
    for (const count of [12, 24, 48, 96]) {
      const sample = selectQuestions(
        questions,
        { ...config, count },
        seeded(count),
      );
      expect(sample).toHaveLength(count);
      for (const category of CATEGORIES) {
        expect(sample.filter((q) => q.category === category.id)).toHaveLength(
          count / 12,
        );
      }
    }
  });
  it("balances all twelve categories, includes every difficulty and never repeats an item across varied seeds", () => {
    for (let seed = 1; seed <= 50; seed++) {
      const sample = selectQuestions(questions, config, seeded(seed));
      expect(sample).toHaveLength(20);
      expect(new Set(sample.map((q) => q.id)).size).toBe(20);
      const counts = CATEGORIES.map(
        (c) => sample.filter((q) => q.category === c.id).length,
      );
      expect(Math.min(...counts)).toBe(1);
      expect(Math.max(...counts)).toBe(2);
      expect(new Set(sample.map((q) => q.difficulty)).size).toBe(3);
    }
  });
  it("respects a specific difficulty/category and caps a request at the available pool", () => {
    const sample = selectQuestions(questions, {
      ...config,
      difficulty: "hard",
      categories: ["world"],
      count: 80,
    });
    expect(sample).toHaveLength(25);
    expect(
      sample.every((q) => q.category === "world" && q.difficulty === "hard"),
    ).toBe(true);
    expect(selectQuestions(questions, { ...config, categories: [] })).toEqual(
      [],
    );
  });
  it("can exhaust all 1284 questions and select from a small review pool without repeats", () => {
    expect(
      new Set(
        selectQuestions(questions, { ...config, count: 1284 }).map((q) => q.id),
      ).size,
    ).toBe(1284);
    const pool = [questions[0], questions[2], questions[4]];
    expect(
      selectQuestions(pool, config)
        .map((q) => q.id)
        .sort(),
    ).toEqual(pool.map((q) => q.id).sort());
  });
});

describe("scoring and persistence", () => {
  it("does not accept a record mixing incompatible editions and chart categories", () => {
    const session = createSession(questions, config);
    const legacy = archivedQuestions.find((q) => q.category === "culture")!;
    session.items[0].questionId = legacy.id;
    expect(validRecord(session, questionMap, true)).toBe(false);
  });
  it("scores against shuffled answer order and keeps untested categories null", () => {
    const pool = questions.filter((q) => q.category === "world").slice(0, 4);
    const result = {
      items: pool.map((q) => ({ questionId: q.id, order: [3, 2, 1, 0] })),
      answers: pool.map((q, i) => (i < 3 ? 3 - q.answer : (4 - q.answer) % 4)),
    };
    const scores = categoryScores(result, questionMap);
    expect(scores.find((s) => s.category === "world")).toEqual({
      category: "world",
      correct: 3,
      total: 4,
      percent: 75,
    });
    expect(
      scores
        .filter((s) => s.category !== "world")
        .every((s) => s.percent === null && s.total === 0),
    ).toBe(true);
  });
  it("requires every answer before finalizing and resumes an answered current question", () => {
    const session = createSession(questions, config);
    expect(() => finishSession(session)).toThrow("未回答");
    session.answers[0] = 2;
    expect(
      validRecord(JSON.parse(JSON.stringify(session)), questionMap, true),
    ).toBe(true);
    session.answers = session.items.map((item) =>
      item.order.indexOf(questionMap.get(item.questionId)!.answer),
    );
    session.index = session.items.length - 1;
    const result = finishSession(session);
    expect(validRecord(result, questionMap)).toBe(true);
    expect(
      categoryScores(result, questionMap).reduce(
        (sum, s) => sum + s.correct,
        0,
      ),
    ).toBe(20);
  });
  it("rejects malformed or stale storage including fake permutations and out-of-sequence answers", () => {
    const session = createSession(questions, config);
    const malformed: unknown[] = [
      null,
      {},
      { ...session, index: -1 },
      { ...session, answers: [] },
      { ...session, config: { ...config, categories: ["unknown"] } },
      { ...session, items: [null, ...session.items.slice(1)] },
      {
        ...session,
        items: [
          { questionId: "removed", order: [0, 1, 2, 3] },
          ...session.items.slice(1),
        ],
      },
      {
        ...session,
        items: [
          { ...session.items[0], order: ["0", "1", "2", "3"] },
          ...session.items.slice(1),
        ],
      },
      { ...session, answers: session.answers.map((a, i) => (i === 2 ? 0 : a)) },
    ];
    for (const item of malformed)
      expect(validRecord(item, questionMap, true)).toBe(false);
  });
  it("handles each documented grade boundary", () => {
    expect(
      [0, 39, 40, 59, 60, 74, 75, 89, 90, 100].map((n) => getGrade(n).rank),
    ).toEqual(["D", "D", "C", "C", "B", "B", "A", "A", "S", "S"]);
  });
  it("rejects impossible dates and a configuration inconsistent with its questions", () => {
    const session = createSession(questions, {
      ...config,
      categories: ["world"],
      difficulty: "easy",
    });
    expect(
      validRecord({ ...session, startedAt: 1e100 }, questionMap, true),
    ).toBe(false);
    expect(
      validRecord(
        { ...session, config: { ...session.config, categories: ["language"] } },
        questionMap,
        true,
      ),
    ).toBe(false);
    expect(
      validRecord(
        { ...session, config: { ...session.config, difficulty: "hard" } },
        questionMap,
        true,
      ),
    ).toBe(false);
  });
});
