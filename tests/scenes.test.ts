import { createHash } from "node:crypto";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  dailyEditionQuestions,
  sceneQuestions,
  sceneEditionQuestions as questions,
  publishedQuestions,
  revisedQuestions,
  questionMap,
} from "../src/data/questions";
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
import type { LearningProgress } from "../src/lib/learning";
import { editorialOriginalIds } from "../src/data/editorial-revisions";
import { knowledgeOriginalIds } from "../src/data/knowledge-revisions";
import {
  reviewOriginalIds,
  retiredReviewIds,
} from "../src/data/question-review";

const topics = [
  ["public", "road", "道路に描かれた表示", [0, 15, 0], 15],
  ["public", "facility", "施設の案内マーク", [0, 15, 0], 15],
  ["household", "floorplan", "間取り図の読み方", [6, 6, 3], 6],
  ["culture", "family", "親族の呼び方", [6, 6, 3], 6],
  ["household", "bedding", "衣類・寝具の形と用途", [6, 6, 3], 3],
  ["household", "appliance", "家電の運転機能", [6, 6, 3], 3],
  ["money", "settlement", "立替・割り勘・精算", [6, 6, 3], 0],
  ["consumer", "shopping", "お店の在庫と受け取り", [6, 6, 3], 0],
] as const;
const oldVersions = [
  "standard-v1",
  "standard-v2",
  "standard-v3",
  "standard-v4",
  "standard-v5",
  "standard-v6",
  "standard-v7",
] as const;
function seeded(seed: number) {
  return () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) | 0;
    return (seed >>> 0) / 4294967296;
  };
}
const learned = (at: number) => ({
  lastSeenAt: at,
  lastSessionId: `old-${at}`,
  lastAnsweredAt: at,
  correct: true,
});
afterEach(() => vi.unstubAllGlobals());

describe("everyday scenes expansion", () => {
  it("preserves the exact 2,372 released questions and adds 15 sourced questions in each of eight topics", () => {
    expect(dailyEditionQuestions).toHaveLength(2372);
    expect(
      createHash("sha256")
        .update(JSON.stringify(dailyEditionQuestions))
        .digest("hex"),
    ).toBe("06fd6dcbac1b52433844fe41b1c5b4c482e82879aef19dc862049bdfbbba679b");
    expect(sceneQuestions).toHaveLength(120);
    expect(sceneQuestions.filter((q) => q.image)).toHaveLength(48);
    expect(questions).toHaveLength(2492);
    expect(
      ["easy", "normal", "hard"].map(
        (d) => questions.filter((q) => q.difficulty === d).length,
      ),
    ).toEqual([968, 980, 544]);
    for (const [category, key, topic, counts, images] of topics) {
      expect(sceneQuestions.filter((q) => q.topic === topic)).toHaveLength(15);
      for (const [i, difficulty] of (
        ["easy", "normal", "hard"] as const
      ).entries()) {
        for (let n = 1; n <= counts[i]; n++) {
          const id = `v2-${category}-scene-${key}-${difficulty}-${String(n).padStart(3, "0")}`;
          const q = questionMap.get(id)!;
          expect(q, id).toMatchObject({ category, difficulty, topic });
          expect(Boolean(q.image), id).toBe(
            difficulty === "normal" && n <= images,
          );
          expect(q.source?.url, id).toMatch(/^https:\/\//);
        }
      }
    }
  });

  it("keeps the seven earlier diagnostic banks and learning-based draws fixed when scenes are appended", () => {
    const learning = Object.fromEntries(
      dailyEditionQuestions.map((q, i) => [q.id, learned(i + 1)]),
    );
    for (const version of oldVersions) {
      const bank =
        version === "standard-v6" || version === "standard-v7"
          ? dailyEditionQuestions
          : version === "standard-v5"
            ? revisedQuestions
            : publishedQuestions;
      for (const seed of [1, 4, 23, 52]) {
        const config = createDiagnosticConfig(version);
        expect(
          selectQuestions(
            [...bank, ...sceneQuestions],
            config,
            seeded(seed),
            learning,
          ),
        ).toEqual(selectQuestions(bank, config, seeded(seed), learning));
      }
    }
  });

  it("includes the eight topics in standard 8 while retaining all category, difficulty and image quotas", () => {
    const seen = new Set<string>();
    const config = createDiagnosticConfig("standard-v8");
    expect(config.diagnosticVersion).toBe("standard-v8");
    for (let seed = 1; seed <= 100; seed++) {
      const sample = selectQuestions(questions, config, seeded(seed));
      expect(new Set(sample.map((q) => q.id)).size).toBe(60);
      sample
        .filter((q) => q.id.includes("-scene-"))
        .forEach((q) => seen.add(q.topic!));
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
    expect([...seen].sort()).toEqual(topics.map(([, , topic]) => topic).sort());
  });

  it("prioritizes unseen scenes, restores standard 8 and rejects changed formats or unpublished IDs", () => {
    const learning: LearningProgress = Object.fromEntries(
      dailyEditionQuestions.map((q, i) => [q.id, learned(i + 1)]),
    );
    const config = createDiagnosticConfig("standard-v8");
    const sample = selectQuestions(questions, config, seeded(7), learning);
    for (const q of sample) {
      const hasUnseenInBucket = sceneQuestions.some(
        (n) =>
          n.category === q.category &&
          n.difficulty === q.difficulty &&
          Boolean(n.image) === Boolean(q.image),
      );
      if (hasUnseenInBucket) expect(learning[q.id], q.id).toBeUndefined();
    }
    const session = createSession(questions, config, learning);
    expect(validRecord(session, questionMap, true)).toBe(true);
    expect(
      validRecord(
        { ...session, config: createDiagnosticConfig("standard-v7") },
        questionMap,
        true,
      ),
    ).toBe(false);
    session.answers = session.items.map((item) =>
      item.order.indexOf(questionMap.get(item.questionId)!.answer),
    );
    const result = finishSession(session);
    vi.stubGlobal("localStorage", {
      getItem: () => JSON.stringify({ history: [result], learning }),
    });
    const saved = readSaved(questionMap);
    expect(saved.history).toEqual([result]);
    expect(saved.learning).toEqual(
      Object.fromEntries(
        Object.entries(learning).filter(
          ([id]) =>
            !editorialOriginalIds.has(id) &&
            !knowledgeOriginalIds.has(id) &&
            !reviewOriginalIds.has(id) &&
            !retiredReviewIds.has(id),
        ),
      ),
    );
    expect(
      categoryScores(result, questionMap).reduce(
        (sum, axis) => sum + axis.correct,
        0,
      ),
    ).toBe(60);
    const image = session.items
      .map((item) => questionMap.get(item.questionId)!)
      .find((q) => q.id.includes("-scene-") && q.image)!;
    for (const bad of [
      { ...image, image: undefined },
      { ...image, difficulty: "easy" as const },
      { ...image, category: "world" as const },
    ])
      expect(
        validRecord(result, new Map([...questionMap, [bad.id, bad]])),
      ).toBe(false);
    for (const [category, key, topic, counts] of topics) {
      const template = sceneQuestions.find((q) => q.topic === topic)!;
      const future: Question = {
        ...template,
        difficulty: "normal",
        id: `v2-${category}-scene-${key}-normal-${String(counts[1] + 1).padStart(3, "0")}`,
      };
      expect(
        selectQuestions([...questions, future], config, seeded(20), learning),
      ).toEqual(selectQuestions(questions, config, seeded(20), learning));
    }
  });

  it("independently calculates all 15 settlements and balances the three-party transfers", () => {
    const yen = (n: number) => `${n.toLocaleString("ja-JP")}円`;
    const expected = {
      easy: [
        yen(7200 / 4),
        yen(6300 - 6300 / 3),
        yen(600 + 200 / 2),
        yen(8000 - 2000),
        yen((5400 - 2000) / 2),
        yen((4 * 2000 - 7200) / 4),
      ],
      normal: [
        `BさんからAさんへ${yen(4800 - (4800 + 3200) / 2)}`,
        yen(9000 - (9000 + 6000) / 3),
        yen(6000 / 3 + 2400 / 2),
        yen((9600 - 1600) / 4),
        `BさんからAさんへ${yen(2700 - 1000 - 600)}`,
        `それぞれ${yen(1500 / 3)}`,
      ],
      hard: [
        `Aさんへ${yen(3600 - 6000 / 3)}、Bさんへ${yen(2400 - 6000 / 3)}`,
        `Bさんが${yen(6000 / 3 + 3000 / 2 - 3000)}、Cさんが${yen(6000 / 3 + 3000 / 2)}`,
        `Bさんが${yen((10000 / 5) * 2 - 3000)}、Cさんが${yen(10000 / 5)}`,
      ],
    };
    for (const difficulty of ["easy", "normal", "hard"] as const) {
      expected[difficulty].forEach((answer, i) => {
        const q = questionMap.get(
          `v2-money-scene-settlement-${difficulty}-${String(i + 1).padStart(3, "0")}`,
        )!;
        expect(q.choices[q.answer], q.id).toBe(answer);
      });
    }
    expect([3600 - 1600, 2400 - 400, 0 + 1600 + 400]).toEqual([
      2000, 2000, 2000,
    ]);
    expect([6000 - 500 - 3500, 3000 + 500, 0 + 3500]).toEqual([
      2000, 3500, 3500,
    ]);
    expect([7000 - 1000 - 2000, 3000 + 1000, 0 + 2000]).toEqual([
      4000, 4000, 2000,
    ]);
  });
});
