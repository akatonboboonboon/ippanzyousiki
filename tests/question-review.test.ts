import { createHash } from "node:crypto";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  questions,
  depthEditionQuestions,
  questionMap,
  archivedQuestions,
  activeQuestionIds,
} from "../src/data/questions";
import {
  questionKind,
  questionRevisions,
  reviewOriginalIds,
  currentReviewId,
  matchesScope,
  retiredReviewIds,
} from "../src/data/question-review";
import { CATEGORY_IDS, type Question } from "../src/data/types";
import {
  createDiagnosticConfig,
  selectQuestions,
  createSession,
  finishSession,
  validRecord,
  readSaved,
  isStandardDiagnostic,
} from "../src/lib/quiz";
import manifest from "../src/data/diagnostic-reviewed.json" with { type: "json" };
import life from "../src/data/review-life.json" with { type: "json" };
import society from "../src/data/review-society.json" with { type: "json" };
import knowledge from "../src/data/review-knowledge.json" with { type: "json" };
const seeded = (n: number) => () =>
  ((n = (Math.imul(n, 1664525) + 1013904223) | 0) >>> 0) / 4294967296;
afterEach(() => vi.unstubAllGlobals());

describe("reviewed questions and separate knowledge diagnosis", () => {
  it("applies each editorial decision only to an existing question in the reviewed edition", () => {
    const ids = new Set(depthEditionQuestions.map((q) => q.id));
    const reviews = [life, society, knowledge];
    for (const key of ["reasoningIds", "retiredIds"] as const) {
      const list = reviews.flatMap((r) => r[key]);
      expect(new Set(list).size).toBe(list.length);
      for (const id of list) expect(ids.has(id), id).toBe(true);
    }
    const revised = reviews.flatMap((r) => Object.keys(r.revisions));
    expect(new Set(revised).size).toBe(revised.length);
    for (const id of revised) {
      expect(ids.has(id), id).toBe(true);
      expect(retiredReviewIds.has(id), id).toBe(false);
    }
  });
  it("keeps all published questions intact and gives edited questions new identities", () => {
    expect(depthEditionQuestions).toHaveLength(2913);
    expect(
      createHash("sha256")
        .update(JSON.stringify(depthEditionQuestions))
        .digest("hex"),
    ).toBe("c2df22ceaa207ae39626c3aa29ee16d3201c0e737ccdb0cbc1b44a63bb0df9b0");
    for (const q of depthEditionQuestions)
      expect(questionMap.get(q.id)).toEqual(q);
    expect(reviewOriginalIds.size).toBeGreaterThan(0);
    for (const id of reviewOriginalIds) {
      expect(activeQuestionIds.has(id)).toBe(false);
      expect(questionMap.get(currentReviewId(id))).toMatchObject(
        questionRevisions[id],
      );
    }
    for (const id of retiredReviewIds)
      expect(activeQuestionIds.has(id)).toBe(false);
    expect(manifest).toEqual(
      questions
        .filter((q) => questionKind(q) === "knowledge")
        .map((q) => ({
          id: q.id,
          category: q.category,
          difficulty: q.difficulty,
          image: !!q.image,
        })),
    );
  });

  it("preserves standard 12 knowledge-only selection, 5 per genre and difficulty quotas, and excludes future additions", () => {
    const config = createDiagnosticConfig("standard-v12");
    const extras = questions.map((q) => ({ ...q, id: q.id + "-future" }));
    for (let seed = 1; seed <= 20; seed++) {
      const selected = selectQuestions(questions, config, seeded(seed));
      expect(selected).toHaveLength(60);
      expect(selected.every((q) => questionKind(q) === "knowledge")).toBe(true);
      expect(selected.filter((q) => q.image)).toHaveLength(10);
      for (const category of CATEGORY_IDS) {
        const group = selected.filter((q) => q.category === category);
        expect(group).toHaveLength(5);
        for (const [difficulty, count] of [
          ["easy", 2],
          ["normal", 2],
          ["hard", 1],
        ] as const)
          expect(group.filter((q) => q.difficulty === difficulty)).toHaveLength(
            count,
          );
      }
      expect(
        selectQuestions([...questions, ...extras], config, seeded(seed)),
      ).toEqual(selected);
    }
    expect(isStandardDiagnostic({ ...config, questionScope: "all" })).toBe(
      false,
    );
  });

  it("separates practice scopes and validates them when resuming without discarding older mixed practice", () => {
    for (const scope of ["knowledge", "reasoning", "all"] as const) {
      const session = createSession(questions, {
        mode: "quiz",
        categories: [...CATEGORY_IDS],
        difficulty: "mix",
        count: 48,
        questionScope: scope,
      });
      expect(
        session.items.every((item) =>
          matchesScope(questionMap.get(item.questionId)!, scope),
        ),
      ).toBe(true);
      expect(validRecord(session, questionMap, true)).toBe(true);
      if (scope === "reasoning") {
        expect(
          validRecord(
            {
              ...session,
              config: { ...session.config, questionScope: "knowledge" },
            },
            questionMap,
            true,
          ),
        ).toBe(false);
        const old = { ...session, config: { ...session.config } };
        delete old.config.questionScope;
        expect(validRecord(old, questionMap, true)).toBe(true);
      }
      expect(
        validRecord(
          {
            ...session,
            config: { ...session.config, questionScope: "invalid" },
          },
          questionMap,
          true,
        ),
      ).toBe(false);
    }
  });

  it("retains standard 11 sessions and scores while omitting retired question progress from new draws", () => {
    const config = createDiagnosticConfig("standard-v11");
    const full = [...depthEditionQuestions, ...archivedQuestions, ...questions];
    for (const seed of [7, 19, 42])
      expect(selectQuestions(full, config, seeded(seed))).toEqual(
        selectQuestions(depthEditionQuestions, config, seeded(seed)),
      );
    const old = createSession(depthEditionQuestions, config);
    old.answers = old.items.map((item) =>
      item.order.indexOf(questionMap.get(item.questionId)!.answer),
    );
    const result = finishSession(old);
    old.index = old.items.length - 1;
    const editedId = [...reviewOriginalIds][0];
    const revisedId = currentReviewId(editedId);
    const entry = {
      lastSeenAt: 1,
      lastSessionId: "old",
      lastAnsweredAt: 1,
      correct: false,
    };
    vi.stubGlobal("localStorage", {
      getItem: () =>
        JSON.stringify({
          history: [result],
          session: old,
          learning: { [editedId]: entry, [revisedId]: entry },
        }),
    });
    const saved = readSaved(questionMap);
    expect(saved.history).toEqual([result]);
    expect(saved.session).toEqual(old);
    expect(saved.learning[editedId]).toBeUndefined();
    expect(saved.learning[revisedId]).toEqual(entry);
  });

  it("keeps unseen priority and occasional mistakes inside each requested practice scope", () => {
    for (const scope of ["knowledge", "reasoning"] as const) {
      const bank = questions.filter((q) => matchesScope(q, scope));
      const fresh = new Set(
        selectQuestions(
          bank,
          {
            mode: "quiz",
            questionScope: scope,
            categories: [...CATEGORY_IDS],
            difficulty: "mix",
            count: 48,
          },
          seeded(7),
        ).map((q) => q.id),
      );
      const learning = Object.fromEntries(
        bank
          .filter((q) => !fresh.has(q.id))
          .map((q) => [
            q.id,
            {
              lastSeenAt: 1,
              lastSessionId: "old",
              lastAnsweredAt: 1,
              correct: false,
            },
          ]),
      );
      const selected = selectQuestions(
        bank,
        {
          mode: "quiz",
          questionScope: scope,
          categories: [...CATEGORY_IDS],
          difficulty: "mix",
          count: 48,
        },
        seeded(8),
        learning,
      );
      expect(selected.every((q) => matchesScope(q, scope))).toBe(true);
      expect(new Set(selected.map((q) => q.id)).size).toBe(selected.length);
      expect(selected.some((q) => fresh.has(q.id))).toBe(true);
    }
  });
});
