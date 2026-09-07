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

const additions = questions.filter((q) => q.id.includes("-living-"));
const published = questions.filter((q) => !q.id.includes("-living-"));
const topics = [
  ["consumer", "rent", "住まい探しの費用", [8, 8, 4]],
  ["health", "label", "食品表示の読み分け", [8, 8, 4]],
  ["household", "recycle", "家電の処分", [8, 8, 4]],
  ["household", "battery", "乾電池の使い方", [6, 6, 3]],
  ["public", "bicycle", "自転車の手入れ", [8, 8, 4]],
  ["world", "familiar", "身近なものの知識", [8, 8, 4]],
] as const;
function seeded(seed: number) {
  return () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) | 0;
    return (seed >>> 0) / 4294967296;
  };
}
afterEach(() => vi.unstubAllGlobals());

describe("115 living questions and standard diagnostic 4", () => {
  it("adds six sourced topics with their agreed difficulty counts and preserves all 2,124 published questions", () => {
    expect(published).toHaveLength(2124);
    expect(
      createHash("sha256").update(JSON.stringify(published)).digest("hex"),
    ).toBe("660cd9107296d290751a7051c132bec81426d5d72eb7b51707bdb07f9e7dd424");
    expect(additions).toHaveLength(115);
    for (const [category, key, topic, counts] of topics) {
      expect(
        additions.filter((q) => q.topic === topic),
        topic,
      ).toHaveLength(counts[0] + counts[1] + counts[2]);
      for (const [difficulty, count] of [
        ["easy", counts[0]],
        ["normal", counts[1]],
        ["hard", counts[2]],
      ] as const) {
        for (let n = 1; n <= count; n++) {
          const id = `v2-${category}-living-${key}-${difficulty}-${String(n).padStart(3, "0")}`;
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

  it("keeps standards 1, 2 and 3 unchanged while standard 4 draws all six new topics with the same quotas", () => {
    const seen = new Set<string>();
    for (let seed = 1; seed <= 60; seed++) {
      for (const version of [
        "standard-v1",
        "standard-v2",
        "standard-v3",
      ] as const) {
        const config = createDiagnosticConfig(version);
        expect(selectQuestions(questions, config, seeded(seed))).toEqual(
          selectQuestions(published, config, seeded(seed)),
        );
      }
      const current = selectQuestions(
        questions,
        createDiagnosticConfig("standard-v4"),
        seeded(seed),
      );
      expect(current).toHaveLength(60);
      expect(new Set(current.map((q) => q.id)).size).toBe(60);
      current
        .filter((q) => q.id.includes("-living-"))
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

  it("restores all four histories and validates new IDs only in their published standard 4 slots", () => {
    const session = createSession(
      questions,
      createDiagnosticConfig("standard-v4"),
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
    for (const version of [
      "standard-v1",
      "standard-v2",
      "standard-v3",
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
      { ...extra, category: "public" as const },
      { ...extra, difficulty: "hard" as const },
      { ...extra, image: { src: "quiz/extra.svg", alt: "追加図" } },
    ]) {
      expect(
        validRecord(session, new Map([...questionMap, [extra.id, bad]]), true),
      ).toBe(false);
    }
    for (const [category, key, topic, counts] of topics) {
      for (const [i, difficulty] of (
        ["easy", "normal", "hard"] as const
      ).entries()) {
        const template = additions.find((q) => q.topic === topic)!;
        const future = {
          ...template,
          id: `v2-${category}-living-${key}-${difficulty}-${String(counts[i] + 1).padStart(3, "0")}`,
          difficulty,
        };
        expect(
          selectQuestions([...questions, future], session.config, seeded(9)),
        ).toEqual(selectQuestions(questions, session.config, seeded(9)));
      }
    }
    const history = (
      ["standard-v4", "standard-v3", "standard-v2", "standard-v1"] as const
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
    expect(readSaved(questionMap)).toMatchObject({ session, history });
  });
});
