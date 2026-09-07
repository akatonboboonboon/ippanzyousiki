import { createHash } from "node:crypto";
import { afterEach, describe, expect, it, vi } from "vitest";
import { questions, questionMap } from "../src/data/questions";
import { questionKind } from "../src/data/question-review";
import { CATEGORY_IDS, type Question } from "../src/data/types";
import type { LearningProgress } from "../src/lib/learning";
import {
  DIAGNOSTIC_COUNT,
  DIAGNOSTIC_VERSION,
  categoryScores,
  createDiagnosticConfig,
  diagnosticCount,
  diagnosticName,
  finishSession,
  isStandardDiagnostic,
  readSaved,
  selectQuestions,
  validRecord,
  type Session,
} from "../src/lib/quiz";

const seeded = (n: number) => () =>
  ((n = (Math.imul(n, 1664525) + 1013904223) | 0) >>> 0) / 4294967296;

function sessionFor(
  selected: Question[],
  version: Parameters<typeof createDiagnosticConfig>[0] = DIAGNOSTIC_VERSION,
): Session {
  return {
    id: `saved-${version}`,
    config: createDiagnosticConfig(version),
    items: selected.map((q) => ({ questionId: q.id, order: [2, 0, 3, 1] })),
    answers: selected.map(() => null),
    index: 0,
    startedAt: 1000,
  };
}

function completed(session: Session) {
  return finishSession({
    ...session,
    answers: session.items.map((item) =>
      item.order.indexOf(questionMap.get(item.questionId)!.answer),
    ),
  });
}

afterEach(() => vi.unstubAllGlobals());

describe("50-question knowledge diagnosis", () => {
  it("starts new diagnoses at 50 and keeps every published 60-question config valid", () => {
    expect(DIAGNOSTIC_VERSION).toBe("standard-v13");
    expect(DIAGNOSTIC_COUNT).toBe(50);
    expect(diagnosticCount()).toBe(50);
    expect(createDiagnosticConfig()).toMatchObject({
      diagnosticVersion: "standard-v13",
      count: 50,
      questionScope: "knowledge",
    });
    for (let version = 1; version <= 12; version++) {
      const config = createDiagnosticConfig(
        `standard-v${version}` as Parameters<typeof createDiagnosticConfig>[0],
      );
      expect(config.count).toBe(60);
      expect(diagnosticCount(config.diagnosticVersion)).toBe(60);
      expect(isStandardDiagnostic(config)).toBe(true);
      expect(isStandardDiagnostic({ ...config, count: 50 })).toBe(false);
    }
    expect(diagnosticName("standard-v12")).toBe("知識診断（60問）");
    expect(diagnosticName("standard-v13")).toBe("知識診断");
  });

  it("covers all 12 genres with 4–5 questions and retains 20 easy, 20 normal, 10 hard and 10 images", () => {
    const fifthQuestions = new Map<string, number>();
    const omittedHard = new Set<string>();
    for (let seed = 1; seed <= 50; seed++) {
      const selected = selectQuestions(
        questions,
        createDiagnosticConfig(),
        seeded(seed),
      );
      expect(selected).toHaveLength(50);
      expect(new Set(selected.map((q) => q.id)).size).toBe(50);
      expect(selected.every((q) => questionKind(q) === "knowledge")).toBe(true);
      expect(selected.filter((q) => q.image)).toHaveLength(10);
      for (const [difficulty, count] of [
        ["easy", 20],
        ["normal", 20],
        ["hard", 10],
      ] as const)
        expect(
          selected.filter((q) => q.difficulty === difficulty),
        ).toHaveLength(count);
      const patterns: string[] = [];
      for (const category of CATEGORY_IDS) {
        const group = selected.filter((q) => q.category === category);
        expect([4, 5]).toContain(group.length);
        expect(group.filter((q) => q.image)).toHaveLength(
          category === "money" || category === "consumer" ? 0 : 1,
        );
        const counts = ["easy", "normal", "hard"].map(
          (difficulty) =>
            group.filter((q) => q.difficulty === difficulty).length,
        );
        patterns.push(counts.join("/"));
        if (group.length === 5)
          fifthQuestions.set(category, (fifthQuestions.get(category) ?? 0) + 1);
        if (!counts[2]) omittedHard.add(category);
      }
      expect(patterns.filter((pattern) => pattern === "2/2/1")).toHaveLength(2);
      expect(patterns.filter((pattern) => pattern === "2/2/0")).toHaveLength(2);
      expect(patterns.filter((pattern) => pattern === "2/1/1")).toHaveLength(4);
      expect(patterns.filter((pattern) => pattern === "1/2/1")).toHaveLength(4);
      for (let round = 0; round < 4; round++)
        expect(
          new Set(
            selected.slice(round * 12, round * 12 + 12).map((q) => q.category),
          ).size,
        ).toBe(12);
      expect(new Set(selected.slice(48).map((q) => q.category)).size).toBe(2);
      expect(validRecord(sessionFor(selected), questionMap, true)).toBe(true);
    }
    expect([...fifthQuestions.keys()].sort()).toEqual([...CATEGORY_IDS].sort());
    expect([...omittedHard].sort()).toEqual([...CATEGORY_IDS].sort());
  });

  it("keeps the published standard 12 draws, resume data and scores intact", () => {
    const selections = [1, 7, 42].map((seed) =>
      selectQuestions(
        questions,
        createDiagnosticConfig("standard-v12"),
        seeded(seed),
      ).map((q) => q.id),
    );
    // Captured from the published 60-question implementation before adding standard 13.
    expect(
      createHash("sha256").update(JSON.stringify(selections)).digest("hex"),
    ).toBe("0e3e3d967928664adba93c62ba5163d4c4f8050bdf26f8a912ad0831ea9d26f4");
    const old = sessionFor(
      selections[0].map((id) => questionMap.get(id)!),
      "standard-v12",
    );
    const result = completed(old);
    old.answers[0] = result.answers[0];
    old.index = 1;
    vi.stubGlobal("localStorage", {
      getItem: () => JSON.stringify({ session: old, history: [result] }),
    });
    expect(readSaved(questionMap)).toMatchObject({
      session: old,
      history: [result],
    });
    expect(
      categoryScores(result, questionMap).every(
        (score) =>
          score.total === 5 && score.correct === 5 && score.percent === 100,
      ),
    ).toBe(true);
  });

  it("restores 50-question sessions and rejects changed versions, counts, quotas and image allocation", () => {
    const selected = selectQuestions(
      questions,
      createDiagnosticConfig(),
      seeded(7),
    );
    const session = sessionFor(selected);
    const result = completed(session);
    vi.stubGlobal("localStorage", {
      getItem: () => JSON.stringify({ session, history: [result] }),
    });
    expect(readSaved(questionMap)).toMatchObject({
      session,
      history: [result],
    });
    expect(
      categoryScores(result, questionMap).reduce(
        (total, score) => total + score.correct,
        0,
      ),
    ).toBe(50);
    for (const config of [
      { ...session.config, count: 60 },
      { ...session.config, diagnosticVersion: "standard-v12" },
      { ...session.config, diagnosticVersion: "standard-v14" },
      { ...session.config, questionScope: "all" },
    ])
      expect(validRecord({ ...session, config }, questionMap, true)).toBe(
        false,
      );
    expect(
      validRecord(
        {
          ...session,
          items: session.items.slice(1),
          answers: session.answers.slice(1),
          config: { ...session.config, count: 49 },
        },
        questionMap,
        true,
      ),
    ).toBe(false);

    const used = new Set(selected.map((q) => q.id));
    const fiveQuestionCategory = CATEGORY_IDS.find(
      (category) =>
        selected.filter((q) => q.category === category).length === 5,
    )!;
    const fourQuestionCategory = CATEGORY_IDS.find(
      (category) =>
        selected.filter((q) => q.category === category).length === 4,
    )!;
    const easy = selected.find((q) => q.difficulty === "easy")!;
    const image = selected.find((q) => q.image)!;
    const changes: [Question, (q: Question) => boolean][] = [
      [
        easy,
        (q) =>
          q.category === easy.category && q.difficulty === "hard" && !q.image,
      ],
      [
        image,
        (q) =>
          q.category === image.category &&
          q.difficulty === "normal" &&
          !q.image,
      ],
      [
        selected.find(
          (q) => q.category === fourQuestionCategory && q.difficulty === "easy",
        )!,
        (q) => q.category === fiveQuestionCategory && q.difficulty === "easy",
      ],
    ];
    for (const [original, accepts] of changes) {
      const replacement = questions.find(
        (q) => !used.has(q.id) && accepts(q) && questionKind(q) === "knowledge",
      )!;
      const forged = {
        ...session,
        items: session.items.map((item) =>
          item.questionId === original.id
            ? { ...item, questionId: replacement.id }
            : item,
        ),
      };
      expect(validRecord(forged, questionMap, true)).toBe(false);
      expect(validRecord(completed(forged), questionMap)).toBe(false);
    }
  });

  it("freezes eligibility and fails when required image questions are missing", () => {
    const extras = questions.map((q) => ({ ...q, id: `${q.id}-future` }));
    const config = createDiagnosticConfig();
    for (const seed of [1, 7, 42]) {
      const sample = selectQuestions(questions, config, seeded(seed));
      expect(
        selectQuestions(
          [...questions, ...extras, ...questions],
          config,
          seeded(seed),
        ),
      ).toEqual(sample);
      const session = sessionFor(sample);
      const future = { ...sample[0], id: `${sample[0].id}-future` };
      const forged = {
        ...session,
        items: [
          { ...session.items[0], questionId: future.id },
          ...session.items.slice(1),
        ],
      };
      expect(
        validRecord(
          forged,
          new Map([...questionMap, [future.id, future]]),
          true,
        ),
      ).toBe(false);
      const image = sample.find((q) => q.image)!;
      const broken = { ...image, image: { ...image.image!, src: "" } };
      expect(
        validRecord(
          session,
          new Map([...questionMap, [image.id, broken]]),
          true,
        ),
      ).toBe(false);
    }
    const incomplete = questions.filter(
      (q) => q.category !== "safety" || !q.image,
    );
    expect(() =>
      selectQuestions([...incomplete, ...incomplete], config, seeded(7)),
    ).toThrow("問題が不足");
  });

  it("prioritizes unseen questions and caps occasional mistakes at 10 without changing quotas", () => {
    const config = createDiagnosticConfig();
    // Some image buckets contain one question, so leave images unseen to keep
    // enough fresh candidates in every bucket for the 20% review cap to apply.
    const previous = selectQuestions(questions, config, seeded(1)).filter(
      (q) => !q.image,
    );
    const previousIds = new Set(previous.map((q) => q.id));
    for (const correct of [true, false]) {
      const learning: LearningProgress = Object.fromEntries(
        previous.map((q) => [
          q.id,
          {
            lastSeenAt: 100,
            lastSessionId: "previous",
            lastAnsweredAt: 100,
            correct,
          },
        ]),
      );
      let totalRepeated = 0;
      for (let seed = 2; seed <= 12; seed++) {
        const selected = selectQuestions(
          questions,
          config,
          seeded(seed),
          learning,
        );
        const repeated = selected.filter((q) => previousIds.has(q.id)).length;
        expect(repeated).toBeLessThanOrEqual(correct ? 0 : 10);
        expect(validRecord(sessionFor(selected), questionMap, true)).toBe(true);
        totalRepeated += repeated;
      }
      if (!correct) expect(totalRepeated).toBeGreaterThan(0);
    }
  });
});
