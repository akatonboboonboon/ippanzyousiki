import { createHash } from "node:crypto";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  revisedQuestions as questions,
  publishedQuestions,
  questionMap,
  archivedQuestions as allArchivedQuestions,
} from "../src/data/questions";
import {
  choiceRevisions,
  currentChoiceId,
  revisedOriginalIds,
} from "../src/data/choice-revisions";
import { editorialOriginalIds } from "../src/data/editorial-revisions";
import { knowledgeOriginalIds } from "../src/data/knowledge-revisions";
// Check the edition as published, even when later wording revisions retire its IDs.
const activeQuestionIds = new Set(questions.map((q) => q.id));
const archivedQuestions = allArchivedQuestions.filter(
  (q) => !editorialOriginalIds.has(q.id) && !knowledgeOriginalIds.has(q.id),
);
import { CATEGORY_IDS, type Question } from "../src/data/types";
import {
  categoryScores,
  createDiagnosticConfig,
  createSession,
  finishSession,
  readSaved,
  selectQuestions,
  validRecord,
} from "../src/lib/quiz";
import life from "../src/data/choice-revisions-life.json";
import society from "../src/data/choice-revisions-society.json";
import knowledge from "../src/data/choice-revisions-knowledge.json";

function seeded(seed: number) {
  return () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) | 0;
    return (seed >>> 0) / 4294967296;
  };
}
afterEach(() => vi.unstubAllGlobals());

describe("choice revisions and diagnostic 5", () => {
  it("keeps the published 2,239 questions immutable and substitutes each edited item exactly once", () => {
    expect(
      createHash("sha256")
        .update(JSON.stringify(publishedQuestions))
        .digest("hex"),
    ).toBe("39a26082e60b5967fb706eef1e0f86c6e574f9d37c872aa87f626c305e83479a");
    expect(questions).toHaveLength(2239);
    expect(revisedOriginalIds.size).toBeGreaterThan(0);
    expect(archivedQuestions).toHaveLength(600 + revisedOriginalIds.size);
    const keys = [life, society, knowledge].flatMap(Object.keys);
    expect(new Set(keys).size).toBe(keys.length);
    const publishedById = new Map(publishedQuestions.map((q) => [q.id, q]));
    for (const [id, patch] of Object.entries(choiceRevisions)) {
      const original = publishedById.get(id)!;
      expect(original, id).toBeDefined();
      expect(
        Object.keys(patch).every((key) =>
          ["choices", "prompt", "explanation"].includes(key),
        ),
        id,
      ).toBe(true);
      expect(patch.choices, id).toHaveLength(4);
      expect(new Set(patch.choices).size, id).toBe(4);
      const current = questionMap.get(currentChoiceId(id))!;
      expect(current).toEqual({ ...original, ...patch, id: `${id}-r2` });
      expect({ ...current, id: original.id }, id).not.toEqual(original);
      expect(questionMap.get(id)).toEqual(original);
      expect(activeQuestionIds.has(id), id).toBe(false);
      expect(activeQuestionIds.has(current.id), id).toBe(true);
    }
    for (const original of publishedQuestions.filter(
      (q) => !revisedOriginalIds.has(q.id),
    )) {
      expect(questionMap.get(original.id)).toEqual(original);
      expect(activeQuestionIds.has(original.id)).toBe(true);
    }
  });

  it("uses the revised questions with fixed quotas in diagnostic 5 and excludes obsolete variants", () => {
    const config = createDiagnosticConfig("standard-v5");
    expect(config.diagnosticVersion).toBe("standard-v5");
    const seen = new Set<string>();
    for (let seed = 1; seed <= 50; seed++) {
      const sample = selectQuestions(questions, config, seeded(seed));
      expect(sample).toHaveLength(60);
      expect(new Set(sample.map((q) => q.id)).size).toBe(60);
      expect(sample.every((q) => activeQuestionIds.has(q.id))).toBe(true);
      sample
        .filter((q) => q.id.endsWith("-r2"))
        .forEach((q) => seen.add(q.category));
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
      expect(
        selectQuestions(
          [...questions, ...archivedQuestions],
          config,
          seeded(seed),
        ),
      ).toEqual(sample);
    }
    expect([...seen].sort()).toEqual(
      [
        ...new Set(
          publishedQuestions
            .filter((q) => revisedOriginalIds.has(q.id))
            .map((q) => q.category),
        ),
      ].sort(),
    );
  });

  it("retains all four historical diagnostic pools even when revised versions are present", () => {
    for (const version of [
      "standard-v1",
      "standard-v2",
      "standard-v3",
      "standard-v4",
    ] as const) {
      const config = createDiagnosticConfig(version);
      for (const seed of [1, 7, 21, 42, 99]) {
        const sample = selectQuestions(
          publishedQuestions,
          config,
          seeded(seed),
        );
        expect(
          selectQuestions(
            [...publishedQuestions, ...questions],
            config,
            seeded(seed),
          ),
        ).toEqual(sample);
        expect(sample.every((q) => !q.id.endsWith("-r2"))).toBe(true);
      }
    }
  });

  it("rejects mixing old and revised diagnostic variants or changing their category and format", () => {
    const session = createSession(
      questions,
      createDiagnosticConfig("standard-v5"),
    );
    const revised = questions.find(
      (q) =>
        q.id.endsWith("-r2") &&
        !session.items.some((item) => item.questionId === q.id),
    )!;
    const index = session.items.findIndex((item) => {
      const q = questionMap.get(item.questionId)!;
      return (
        q.category === revised.category &&
        q.difficulty === revised.difficulty &&
        Boolean(q.image) === Boolean(revised.image)
      );
    });
    expect(index).toBeGreaterThanOrEqual(0);
    session.items[index] = { questionId: revised.id, order: [3, 1, 0, 2] };
    expect(validRecord(session, questionMap, true)).toBe(true);
    const originalId = revised.id.slice(0, -3);
    const oldItems = session.items.map((item, i) =>
      i === index ? { ...item, questionId: originalId } : item,
    );
    expect(
      validRecord({ ...session, items: oldItems }, questionMap, true),
    ).toBe(false);
    for (const version of [
      "standard-v1",
      "standard-v2",
      "standard-v3",
      "standard-v4",
    ] as const) {
      expect(
        validRecord(
          { ...session, config: createDiagnosticConfig(version) },
          questionMap,
          true,
        ),
      ).toBe(false);
    }
    for (const bad of [
      {
        ...revised,
        category: (revised.category === "public"
          ? "health"
          : "public") as Question["category"],
      },
      {
        ...revised,
        difficulty: (revised.difficulty === "hard"
          ? "easy"
          : "hard") as Question["difficulty"],
      },
      {
        ...revised,
        image: revised.image
          ? undefined
          : { src: "quiz/extra.svg", alt: "追加図" },
      },
    ])
      expect(
        validRecord(session, new Map([...questionMap, [bad.id, bad]]), true),
      ).toBe(false);
    const unknown = { ...revised, id: `${originalId}-r3` };
    expect(
      selectQuestions([...questions, unknown], session.config, seeded(99)),
    ).toEqual(selectQuestions(questions, session.config, seeded(99)));
  });

  it("restores old answers without applying revised wording or scores and restores the new diagnostic", () => {
    const history = (
      [
        "standard-v1",
        "standard-v2",
        "standard-v3",
        "standard-v4",
        "standard-v5",
      ] as const
    ).map((version) => {
      const session = createSession(
        version === "standard-v5" ? questions : publishedQuestions,
        createDiagnosticConfig(version),
      );
      session.answers = session.items.map((item) =>
        item.order.indexOf(questionMap.get(item.questionId)!.answer),
      );
      return finishSession(session);
    });
    const session = createSession(
      publishedQuestions,
      createDiagnosticConfig("standard-v4"),
    );
    session.answers[0] = 1;
    vi.stubGlobal("localStorage", {
      getItem: () => JSON.stringify({ session, history }),
    });
    expect(readSaved(questionMap)).toMatchObject({ session, history });
    for (const result of history) {
      expect(validRecord(result, questionMap)).toBe(true);
      const scores = categoryScores(result, questionMap);
      expect(scores).toHaveLength(12);
      expect(scores.reduce((sum, s) => sum + s.correct, 0)).toBe(60);
    }
  });
});
