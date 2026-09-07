import { createHash } from "node:crypto";
import { describe, it, expect, vi, afterEach } from "vitest";
import {
  questions,
  familiarEditionQuestions,
  archivedQuestions,
  activeQuestionIds,
  questionMap,
  publishedQuestions,
  revisedQuestions,
  dailyEditionQuestions,
  sceneEditionQuestions,
} from "../src/data/questions";
import {
  currentKnowledgeId,
  originalKnowledgeId,
  knowledgeRevisions,
  knowledgeOriginalIds,
} from "../src/data/knowledge-revisions";
import { CATEGORY_IDS } from "../src/data/types";
import {
  createDiagnosticConfig,
  createSession,
  finishSession,
  readSaved,
  selectQuestions,
  validRecord,
  categoryScores,
} from "../src/lib/quiz";
const seed = (n: number) => () =>
  ((n = (Math.imul(n, 1664525) + 1013904223) | 0) >>> 0) / 4294967296;
const correct = {
  lastSeenAt: 1,
  lastSessionId: "before",
  lastAnsweredAt: 1,
  correct: true,
};
const screenshotId = "v2-public-hard-020";
afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("knowledge required beyond the wording", () => {
  it("replaces the reported closure question and preserves all published wording, choices and answer indexes", () => {
    expect(
      createHash("sha256")
        .update(JSON.stringify(familiarEditionQuestions))
        .digest("hex"),
    ).toBe("9809e9f08c1f933b26658c4a07d6e0d3b23a4b1aa9efc9f1efc75442c682eeb4");
    expect(questions).toHaveLength(2597);
    expect(archivedQuestions).toHaveLength(1860 + knowledgeOriginalIds.size);
    expect(knowledgeOriginalIds.has(screenshotId)).toBe(true);
    const old = questionMap.get(screenshotId)!;
    expect(old.prompt).toContain("月曜休館、月曜が祝日なら翌平日休館");
    expect(old.choices[old.answer]).toBe("火曜が休館");
    const revised = questionMap.get(currentKnowledgeId(screenshotId))!;
    expect(revised.prompt).not.toMatch(/翌平日|最も近い|施設案内/);
    expect(revised.prompt).toContain("振替休日");
    expect(revised.choices[revised.answer]).toBe("水曜日");
    expect(revised.source?.url).toBe(
      "https://www8.cao.go.jp/chosei/shukujitsu/gaiyou.html",
    );
    expect(revised.explanation).toContain("最も近い");
    const before = new Map(familiarEditionQuestions.map((q) => [q.id, q]));
    for (const [id, patch] of Object.entries(knowledgeRevisions)) {
      const original = before.get(id)!;
      expect(original, id).toBeDefined();
      expect(patch.prompt, id).not.toBe(original.prompt);
      const next = questionMap.get(currentKnowledgeId(id))!;
      expect(next.id).toBe(`${id}-r4`);
      expect(originalKnowledgeId(next.id)).toBe(id);
      expect(next).toMatchObject({
        category: original.category,
        difficulty: original.difficulty,
      });
      expect(next.image).toEqual(original.image);
      expect(questionMap.get(id)).toEqual(original);
      expect(activeQuestionIds.has(id)).toBe(false);
      expect(activeQuestionIds.has(next.id)).toBe(true);
    }
    for (const q of familiarEditionQuestions.filter(
      (q) => !knowledgeOriginalIds.has(q.id),
    ))
      expect(questionMap.get(q.id)).toEqual(q);
  });

  it("keeps all nine earlier diagnostic pools and draws fixed while standard 10 uses only current IDs", () => {
    const versions = [
      "standard-v1",
      "standard-v2",
      "standard-v3",
      "standard-v4",
      "standard-v5",
      "standard-v6",
      "standard-v7",
      "standard-v8",
      "standard-v9",
    ] as const;
    const learning = Object.fromEntries(
      familiarEditionQuestions.map((q, i) => [
        q.id,
        { ...correct, correct: i % 3 !== 0 },
      ]),
    );
    for (const version of versions) {
      const pool =
        version === "standard-v9"
          ? familiarEditionQuestions
          : version === "standard-v8"
            ? sceneEditionQuestions
            : ["standard-v6", "standard-v7"].includes(version)
              ? dailyEditionQuestions
              : version === "standard-v5"
                ? revisedQuestions
                : publishedQuestions;
      for (const n of [4, 19])
        expect(
          selectQuestions(
            [...pool, ...questions, ...archivedQuestions],
            createDiagnosticConfig(version),
            seed(n),
            learning,
          ),
        ).toEqual(
          selectQuestions(
            pool,
            createDiagnosticConfig(version),
            seed(n),
            learning,
          ),
        );
    }
    const config = createDiagnosticConfig();
    expect(config.diagnosticVersion).toBe("standard-v10");
    for (let n = 1; n <= 20; n++) {
      const sample = selectQuestions(questions, config, seed(n));
      expect(new Set(sample.map((q) => q.id)).size).toBe(60);
      expect(sample.every((q) => activeQuestionIds.has(q.id))).toBe(true);
      for (const category of CATEGORY_IDS) {
        const axis = sample.filter((q) => q.category === category);
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
    }
    const unseen = new Set(
      selectQuestions(questions, config, seed(23)).map((q) => q.id),
    );
    const progress = Object.fromEntries(
      questions
        .filter((q) => !unseen.has(q.id))
        .map((q) => [q.id, { ...correct }]),
    );
    expect(
      new Set(
        selectQuestions(questions, config, seed(8), progress).map((q) => q.id),
      ),
    ).toEqual(unseen);
    Object.values(progress).forEach((entry, i) => {
      if (i % 3 === 0) entry.correct = false;
    });
    const withMistakes = selectQuestions(questions, config, seed(8), progress);
    expect(withMistakes).toHaveLength(60);
    expect(withMistakes.some((q) => progress[q.id]?.correct === true)).toBe(
      false,
    );
    expect(
      withMistakes.filter((q) => progress[q.id]?.correct === false).length,
    ).toBeLessThanOrEqual(12);
    expect(
      selectQuestions([...questions, ...archivedQuestions], config, seed(7)),
    ).toEqual(selectQuestions(questions, config, seed(7)));
    const session = createSession(questions, config);
    const currentId = currentKnowledgeId(screenshotId);
    const slot = session.items.findIndex(
      (item) =>
        questionMap.get(item.questionId)!.category === "public" &&
        questionMap.get(item.questionId)!.difficulty === "hard",
    );
    session.items[slot] = { questionId: currentId, order: [3, 1, 0, 2] };
    expect(validRecord(session, questionMap, true)).toBe(true);
    session.items[slot].questionId = screenshotId;
    expect(validRecord(session, questionMap, true)).toBe(false);
  });

  it("restores the old question and standard 9 scores without carrying its answer into the replacement", () => {
    const old = questionMap.get(screenshotId)!;
    const session = createSession([old], {
      mode: "quiz",
      count: 1,
      categories: ["public"],
      difficulty: "hard",
    });
    session.answers = [session.items[0].order.indexOf(old.answer)];
    const history = [finishSession(session)];
    const diagnostic = createSession(
      familiarEditionQuestions,
      createDiagnosticConfig("standard-v9"),
    );
    const slot = diagnostic.items.findIndex(
      (item) =>
        questionMap.get(item.questionId)!.category === "public" &&
        questionMap.get(item.questionId)!.difficulty === "hard",
    );
    diagnostic.items[slot] = { questionId: old.id, order: [2, 3, 0, 1] };
    diagnostic.answers = diagnostic.items.map((item) =>
      item.order.indexOf(questionMap.get(item.questionId)!.answer),
    );
    history.push(finishSession(diagnostic));
    const unchanged = questions.find(
      (q) =>
        q.category === "public" &&
        q.difficulty === "hard" &&
        !q.id.endsWith("-r4"),
    )!;
    vi.stubGlobal("localStorage", {
      getItem: () =>
        JSON.stringify({
          history,
          session,
          learning: { [old.id]: correct, [unchanged.id]: correct },
        }),
    });
    const saved = readSaved(questionMap);
    expect(saved.history).toEqual(history);
    expect(saved.session).toEqual(session);
    expect(saved.learning).toEqual({ [unchanged.id]: correct });
    expect(
      categoryScores(saved.history[0], questionMap).reduce(
        (n, q) => n + q.correct,
        0,
      ),
    ).toBe(1);
    expect(
      categoryScores(saved.history[1], questionMap).reduce(
        (n, q) => n + q.correct,
        0,
      ),
    ).toBe(60);
    const revised = questionMap.get(currentKnowledgeId(old.id))!;
    expect(
      selectQuestions(
        [unchanged, revised],
        { ...session.config, count: 1 },
        seed(3),
        saved.learning,
      ),
    ).toEqual([revised]);
  });
});
