import { createHash } from "node:crypto";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  publishedQuestions as questions,
  questionMap,
} from "../src/data/questions";
import { CATEGORY_IDS } from "../src/data/types";
import {
  createDiagnosticConfig,
  createSession,
  finishSession,
  readSaved,
  selectQuestions,
  validRecord,
} from "../src/lib/quiz";

const additions = questions.filter((q) => q.id.includes("-everyday-"));
const published = questions.filter(
  (q) => !q.id.includes("-everyday-") && !q.id.includes("-living-"),
);
const topics = [
  ["public", "lost", "落とし物"],
  ["public", "parcel", "荷物の発送"],
  ["public", "car", "車の日常点検"],
  ["health", "cooking", "料理の基本"],
  ["health", "uv", "紫外線と外出"],
  ["household", "home", "住まいのトラブル"],
] as const;
function seeded(seed: number) {
  return () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) | 0;
    return (seed >>> 0) / 4294967296;
  };
}
afterEach(() => vi.unstubAllGlobals());

describe("120 everyday questions and standard diagnostic 3", () => {
  it("adds six sourced topics with 8/8/4 questions and preserves all 2,004 published questions", () => {
    expect(published).toHaveLength(2004);
    expect(
      createHash("sha256").update(JSON.stringify(published)).digest("hex"),
    ).toBe("c37f6dfd01814295d914f995ea2fd56bf604e9f0f86eac92ad5ceac20c054cef");
    expect(additions).toHaveLength(120);
    for (const [category, key, topic] of topics) {
      expect(
        additions.filter((q) => q.topic === topic),
        topic,
      ).toHaveLength(20);
      for (const [difficulty, count] of [
        ["easy", 8],
        ["normal", 8],
        ["hard", 4],
      ] as const) {
        for (let n = 1; n <= count; n++) {
          const id = `v2-${category}-everyday-${key}-${difficulty}-${String(n).padStart(3, "0")}`;
          const q = questionMap.get(id)!;
          expect(q, id).toBeDefined();
          expect(q).toMatchObject({ category, topic, difficulty });
          expect(q.image).toBeUndefined();
          expect(q.source?.url).toMatch(/^https:\/\//);
          expect(q.source?.label.length).toBeGreaterThan(2);
        }
      }
    }
  });

  it("keeps standards 1 and 2 unchanged while standard 3 draws all six new topics with the same quotas", () => {
    const seen = new Set<string>();
    for (let seed = 1; seed <= 60; seed++) {
      for (const version of ["standard-v1", "standard-v2"] as const) {
        const config = createDiagnosticConfig(version);
        expect(selectQuestions(questions, config, seeded(seed))).toEqual(
          selectQuestions(published, config, seeded(seed)),
        );
      }
      const current = selectQuestions(
        questions,
        createDiagnosticConfig("standard-v3"),
        seeded(seed),
      );
      expect(current).toHaveLength(60);
      expect(new Set(current.map((q) => q.id)).size).toBe(60);
      current
        .filter((q) => q.id.includes("-everyday-"))
        .forEach((q) => seen.add(q.topic!));
      for (const category of CATEGORY_IDS) {
        const axis = current.filter((q) => q.category === category);
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
    expect([...seen].sort()).toEqual(topics.map(([, , topic]) => topic).sort());
  });

  it("restores all three histories and validates new IDs only in their published standard 3 slots", () => {
    const session = createSession(
      questions,
      createDiagnosticConfig("standard-v3"),
    );
    const extra = additions.find(
      (q) =>
        q.category === "health" &&
        q.difficulty === "easy" &&
        !session.items.some((item) => item.questionId === q.id),
    )!;
    const index = session.items.findIndex((item) => {
      const q = questionMap.get(item.questionId)!;
      return q.category === "health" && q.difficulty === "easy";
    });
    session.items[index] = { questionId: extra.id, order: [0, 1, 2, 3] };
    expect(validRecord(session, questionMap, true)).toBe(true);
    for (const version of ["standard-v1", "standard-v2"] as const) {
      expect(
        validRecord(
          { ...session, config: createDiagnosticConfig(version) },
          questionMap,
          true,
        ),
      ).toBe(false);
    }
    for (const bad of [
      { ...extra, category: "public" as const },
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
        id: `v2-health-everyday-cooking-${difficulty}-${difficulty === "hard" ? "005" : "009"}`,
        difficulty,
      };
      expect(
        selectQuestions([...questions, future], session.config, seeded(9)),
      ).toEqual(selectQuestions(questions, session.config, seeded(9)));
    }
    const history = (
      ["standard-v3", "standard-v2", "standard-v1"] as const
    ).map((version) => {
      const completed = createSession(
        questions,
        createDiagnosticConfig(version),
      );
      completed.answers = completed.items.map((item) =>
        item.order.indexOf(questionMap.get(item.questionId)!.answer),
      );
      return finishSession(completed);
    });
    vi.stubGlobal("localStorage", {
      getItem: () => JSON.stringify({ session, history }),
    });
    expect(readSaved(questionMap)).toEqual({ session, history });
  });
});
