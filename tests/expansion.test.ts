import { afterEach, describe, expect, it, vi } from "vitest";
import { questions, questionMap } from "../src/data/questions";
import { CATEGORY_IDS } from "../src/data/types";
import {
  createDiagnosticConfig,
  createSession,
  finishSession,
  isStandardDiagnostic,
  readSaved,
  selectQuestions,
  validRecord,
  type Result,
} from "../src/lib/quiz";

const additions = questions.filter((q) => q.id.includes("-expanded-"));
const previousBank = questions.filter(
  (q) => !q.id.includes("-expanded-") && !q.id.includes("-everyday-"),
);
function seeded(seed: number) {
  return () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) | 0;
    return (seed >>> 0) / 4294967296;
  };
}
afterEach(() => vi.unstubAllGlobals());

describe("720-question expansion", () => {
  it("adds 60 sourced text questions per genre with 24 easy, 24 normal and 12 hard", () => {
    expect(previousBank).toHaveLength(1284);
    expect(additions).toHaveLength(720);
    for (const category of CATEGORY_IDS) {
      const genre = additions.filter((q) => q.category === category);
      expect(genre, category).toHaveLength(60);
      for (const [difficulty, count] of [
        ["easy", 24],
        ["normal", 24],
        ["hard", 12],
      ] as const) {
        expect(genre.filter((q) => q.difficulty === difficulty)).toHaveLength(
          count,
        );
        for (let n = 1; n <= count; n++) {
          const q = genre.find(
            (q) =>
              q.id ===
              `v2-${category}-expanded-${difficulty}-${String(n).padStart(3, "0")}`,
          )!;
          expect(q).toBeDefined();
          expect(q.difficulty).toBe(difficulty);
          expect(q.image).toBeUndefined();
          expect(q.source?.url).toMatch(/^https:\/\//);
          expect(q.source?.label.length).toBeGreaterThan(2);
        }
      }
    }
  });

  it("keeps standard 1 selections identical and includes the new bank only in standard 2", () => {
    const seenNew = new Set<string>();
    for (let seed = 1; seed <= 30; seed++) {
      const oldConfig = createDiagnosticConfig("standard-v1");
      expect(selectQuestions(questions, oldConfig, seeded(seed))).toEqual(
        selectQuestions(previousBank, oldConfig, seeded(seed)),
      );
      const current = selectQuestions(
        questions,
        createDiagnosticConfig("standard-v2"),
        seeded(seed),
      );
      expect(current).toHaveLength(60);
      expect(current.filter((q) => q.image)).toHaveLength(12);
      expect(new Set(current.map((q) => q.id)).size).toBe(60);
      current
        .filter((q) => q.id.includes("-expanded-"))
        .forEach((q) => seenNew.add(q.category));
      for (const category of CATEGORY_IDS) {
        const axis = current.filter((q) => q.category === category);
        expect(axis.filter((q) => q.difficulty === "easy")).toHaveLength(2);
        expect(
          axis.filter((q) => q.difficulty === "normal" && !q.image),
        ).toHaveLength(1);
        expect(axis.filter((q) => q.image)).toHaveLength(1);
        expect(axis.filter((q) => q.difficulty === "hard")).toHaveLength(1);
      }
    }
    expect([...seenNew].sort()).toEqual([...CATEGORY_IDS].sort());
  });

  it("restores old unfinished diagnostics and both generations of history without relabeling", () => {
    const old = createSession(questions, createDiagnosticConfig("standard-v1"));
    old.index = 8;
    old.answers = old.answers.map((_, i) => (i < 8 ? i % 4 : null));
    const history: Result[] = ["standard-v2", "standard-v1"].map((version) => {
      const session = createSession(
        questions,
        createDiagnosticConfig(version as "standard-v1" | "standard-v2"),
      );
      session.answers = session.items.map((item) =>
        item.order.indexOf(questionMap.get(item.questionId)!.answer),
      );
      return finishSession(session);
    });
    vi.stubGlobal("localStorage", {
      getItem: () => JSON.stringify({ session: old, history }),
    });
    expect(readSaved(questionMap)).toEqual({ session: old, history });
    expect(history.every((r) => isStandardDiagnostic(r))).toBe(true);
    expect(validRecord(old, questionMap, true)).toBe(true);
  });

  it("enforces each version's allowed ID ranges, category, difficulty and image requirements", () => {
    const config = createDiagnosticConfig("standard-v2");
    const session = createSession(questions, config);
    const extra = additions.find(
      (q) =>
        q.category === "household" &&
        q.difficulty === "easy" &&
        !session.items.some((item) => item.questionId === q.id),
    )!;
    const index = session.items.findIndex((item) => {
      const q = questionMap.get(item.questionId)!;
      return q.category === "household" && q.difficulty === "easy";
    });
    session.items[index] = { questionId: extra.id, order: [0, 1, 2, 3] };
    expect(validRecord(session, questionMap, true)).toBe(true);
    expect(
      validRecord(
        { ...session, config: createDiagnosticConfig("standard-v1") },
        questionMap,
        true,
      ),
    ).toBe(false);
    for (const bad of [
      { ...extra, category: "health" as const },
      { ...extra, difficulty: "hard" as const },
      { ...extra, image: { src: "quiz/extra.svg", alt: "追加図" } },
    ]) {
      expect(
        validRecord(session, new Map([...questionMap, [extra.id, bad]]), true),
      ).toBe(false);
    }
    for (const difficulty of ["easy", "normal", "hard"] as const) {
      const future = {
        ...extra,
        id: `v2-household-expanded-${difficulty}-${difficulty === "hard" ? "013" : "025"}`,
        difficulty,
      };
      expect(
        selectQuestions([...questions, future], config, seeded(9)),
      ).toEqual(selectQuestions(questions, config, seeded(9)));
    }
  });
});
