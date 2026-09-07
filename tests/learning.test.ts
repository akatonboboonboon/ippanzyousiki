import { describe, expect, it } from "vitest";
import type { Question } from "../src/data/types";
import type { QuizItem, Result, Session } from "../src/lib/quiz";
import {
  recordAnswer,
  recordExposure,
  restoreLearning,
  type LearningProgress,
} from "../src/lib/learning";

const questions: Question[] = Array.from({ length: 70 }, (_, index) => ({
  id: `v2-household-learning-${index}`,
  category: "household",
  difficulty: "easy",
  prompt: `Question ${index}`,
  choices: ["A", "B", "C", "D"],
  answer: index % 4,
  explanation: "Explanation",
}));
const bank = new Map(questions.map((question) => [question.id, question]));
const item = (index = 0): QuizItem => ({
  questionId: questions[index].id,
  order: [2, 0, 3, 1],
});
const correctChoice = (index = 0) =>
  item(index).order.indexOf(questions[index].answer);
function result(index: number, finishedAt: number, correct = true): Result {
  return {
    id: `result-${index}-${finishedAt}`,
    config: {
      categories: ["household"],
      difficulty: "easy",
      count: 1,
      mode: "quiz",
    },
    items: [item(index)],
    answers: [correct ? correctChoice(index) : (correctChoice(index) + 1) % 4],
    startedAt: finishedAt - 1,
    finishedAt,
  };
}
function session(index = 0): Session {
  return {
    id: "current-session",
    config: {
      categories: ["household"],
      difficulty: "easy",
      count: 4,
      mode: "quiz",
    },
    items: [item(0), item(1), item(2), item(3)],
    answers: [null, null, null, null],
    startedAt: 500,
    index,
  };
}

describe("persistent per-question learning", () => {
  it("marks exposure once per session without mutating or clearing the previous answer", () => {
    const empty: LearningProgress = {};
    const seen = recordExposure(empty, item(), "first", 100);
    expect(empty).toEqual({});
    expect(seen[questions[0].id]).toEqual({
      lastSeenAt: 100,
      lastSessionId: "first",
    });
    expect(recordExposure(seen, item(), "first", 200)).toBe(seen);
    const answered = recordAnswer(seen, item(), 0, bank, "first", 150);
    const next = recordExposure(answered, item(), "second", 300);
    expect(next[questions[0].id]).toEqual({
      lastSeenAt: 300,
      lastSessionId: "second",
      lastAnsweredAt: 150,
      correct: false,
    });
    expect(answered[questions[0].id].lastSeenAt).toBe(100);
    expect(recordExposure(next, item(), "old-session", 99)).toBe(next);
    expect(recordExposure(next, item(), "second", 999)).toBe(next);
  });

  it("grades shuffled choices and lets only a newer answer replace the last result", () => {
    const wrong = recordAnswer({}, item(), 0, bank, "first", 100);
    expect(wrong[questions[0].id].correct).toBe(false);
    const correct = recordAnswer(wrong, item(), 1, bank, "second", 200);
    expect(correct[questions[0].id]).toEqual({
      lastSeenAt: 200,
      lastSessionId: "second",
      lastAnsweredAt: 200,
      correct: true,
    });
    expect(recordAnswer(correct, item(), 0, bank, "old", 150)).toBe(correct);
    expect(recordAnswer(correct, item(), 0, bank, "second", 200)).toBe(correct);
    const wrongAgain = recordAnswer(correct, item(), 3, bank, "third", 300);
    expect(wrongAgain[questions[0].id].correct).toBe(false);
    expect(correct[questions[0].id].correct).toBe(true);
  });

  it("retains learning after its completed result has fallen out of the 50-result history", () => {
    let progress: LearningProgress = {};
    const history: Result[] = [];
    for (let index = 0; index < 70; index++) {
      const completed = result(index, 100 + index, index % 2 === 0);
      history.unshift(completed);
      progress = recordAnswer(
        progress,
        completed.items[0],
        completed.answers[0],
        bank,
        completed.id,
        completed.finishedAt,
      );
    }
    const restored = restoreLearning(
      JSON.parse(JSON.stringify(progress)),
      history.slice(0, 50),
      null,
      bank,
    );
    expect(Object.keys(restored)).toHaveLength(70);
    expect(restored).toEqual(progress);
    expect(restored[questions[0].id].correct).toBe(true);
    expect(restored[questions[1].id].correct).toBe(false);
  });

  it("migrates unsorted old history chronologically and ignores archived or unknown IDs", () => {
    const archived = {
      ...result(2, 350),
      items: [{ ...item(2), questionId: "old-revised-question" }],
    };
    const oldHistory = [
      result(0, 300, true),
      result(1, 200, false),
      result(0, 100, false),
      archived,
    ];
    const restored = restoreLearning(undefined, oldHistory, null, bank);
    expect(Object.keys(restored)).toHaveLength(2);
    expect(restored[questions[0].id]).toEqual({
      lastSeenAt: 300,
      lastSessionId: "result-0-300",
      lastAnsweredAt: 300,
      correct: true,
    });
    expect(restored[questions[1].id].correct).toBe(false);
    expect(oldHistory[0].finishedAt).toBe(300);
  });

  it("migrates only the displayed part of an unfinished queue and preserves unanswered prior mistakes", () => {
    const running = session(1);
    running.answers[0] = correctChoice(0);
    // Even malformed later answers must not mark questions ahead of the displayed index.
    running.answers[3] = correctChoice(3);
    const restored = restoreLearning(
      undefined,
      [result(1, 100, false)],
      running,
      bank,
    );
    expect(Object.keys(restored).sort()).toEqual([
      questions[0].id,
      questions[1].id,
    ]);
    expect(restored[questions[0].id]).toEqual({
      lastSeenAt: 500,
      lastSessionId: running.id,
      lastAnsweredAt: 500,
      correct: true,
    });
    expect(restored[questions[1].id]).toEqual({
      lastSeenAt: 500,
      lastSessionId: running.id,
      lastAnsweredAt: 100,
      correct: false,
    });
    expect(restoreLearning(undefined, [], session(), bank)).toEqual({
      [questions[0].id]: { lastSeenAt: 500, lastSessionId: running.id },
    });
    expect(
      restoreLearning(restored, [result(1, 100, false)], running, bank),
    ).toEqual(restored);
  });

  it("does not replace a saved recent answer with older history or an older session start time", () => {
    const running = session();
    running.answers[0] = 0;
    let progress = recordExposure({}, item(), running.id, 550);
    progress = recordAnswer(
      progress,
      item(),
      correctChoice(),
      bank,
      running.id,
      650,
    );
    const restored = restoreLearning(
      progress,
      [result(0, 600, false)],
      running,
      bank,
    );
    expect(restored[questions[0].id].correct).toBe(true);
    expect(restored[questions[0].id].lastAnsweredAt).toBe(650);
    expect(
      restoreLearning(restored, [result(0, 600, false)], running, bank),
    ).toEqual(restored);
  });

  it("keeps an explicitly cleared ledger empty despite retained history or an unfinished session", () => {
    const running = session(1);
    running.answers[0] = correctChoice(0);
    expect(restoreLearning({}, [result(1, 100, false)], running, bank)).toEqual(
      {},
    );
    expect(restoreLearning({}, [], running, bank)).toEqual({});
    const resumed = recordExposure(
      {},
      running.items[running.index],
      running.id,
      800,
    );
    expect(Object.keys(resumed)).toEqual([questions[1].id]);
    expect(
      restoreLearning(resumed, [result(1, 100, false)], running, bank),
    ).toEqual(resumed);
  });

  it("rejects malformed stored entries and keeps validated active entries only", () => {
    const good = {
      lastSeenAt: 0,
      lastSessionId: "seen",
      lastAnsweredAt: 10,
      correct: false,
    };
    const invalid = [
      null,
      [],
      1,
      { ...good, lastSeenAt: "0" },
      { ...good, lastSeenAt: Infinity },
      { ...good, lastSeenAt: -1 },
      { ...good, lastSeenAt: 1e20 },
      { ...good, lastSessionId: "" },
      { ...good, correct: 0 },
      { ...good, lastAnsweredAt: undefined },
      { ...good, correct: undefined },
      { ...good, lastAnsweredAt: NaN },
    ];
    const stored: Record<string, unknown> = Object.fromEntries(
      invalid.map((value, index) => [questions[index].id, value]),
    );
    stored[questions[20].id] = { ...good, ignoredField: "not retained" };
    stored["old-revised-question"] = good;
    expect(restoreLearning(stored, [], null, bank)).toEqual({
      [questions[20].id]: good,
    });
    for (const raw of [null, [], 42, "bad storage"])
      expect(restoreLearning(raw, [], null, bank)).toEqual({});
    expect(
      restoreLearning("bad storage", [result(0, 100)], null, bank)[
        questions[0].id
      ].correct,
    ).toBe(true);
  });

  it("ignores invalid answer events without recording a false exposure", () => {
    const progress: LearningProgress = {};
    for (const choice of [-1, 4, NaN, 0.5])
      expect(recordAnswer(progress, item(), choice, bank, "s", 10)).toBe(
        progress,
      );
    for (const order of [
      [0, 0, 1, 2],
      [0, 1, 2],
      [0, 1, 2, 4],
    ])
      expect(
        recordAnswer(progress, { ...item(), order }, 0, bank, "s", 10),
      ).toBe(progress);
    expect(
      recordAnswer(
        progress,
        { ...item(), questionId: "retired" },
        0,
        bank,
        "s",
        10,
      ),
    ).toBe(progress);
    expect(recordAnswer(progress, item(), 0, bank, "", 10)).toBe(progress);
    expect(recordAnswer(progress, item(), 0, bank, "s", Infinity)).toBe(
      progress,
    );
    expect(recordExposure(progress, item(), "s", NaN)).toBe(progress);
  });
});
