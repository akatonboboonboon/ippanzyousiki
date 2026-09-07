import { createHash } from "node:crypto";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  dailyQuestions,
  questions,
  revisedQuestions,
  publishedQuestions,
  archivedQuestions,
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

const topics = [
  ["world", "tools", "身近な道具の仕組み", [6, 6, 3]],
  ["health", "packaging", "食品の包装の役割", [6, 6, 3]],
  ["money", "utilities", "光熱費の明細", [6, 6, 3]],
  ["digital", "news", "ニュースの数字", [6, 6, 3]],
  ["manners", "dining", "外食で見かける言葉", [6, 6, 3]],
  ["consumer", "deals", "どちらがお得？", [16, 16, 8]],
  ["public", "signs", "道路標識の見分け方", [0, 18, 0]],
] as const;
const oldVersions = [
  "standard-v1",
  "standard-v2",
  "standard-v3",
  "standard-v4",
  "standard-v5",
] as const;
function seeded(seed: number) {
  return () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) | 0;
    return (seed >>> 0) / 4294967296;
  };
}
afterEach(() => vi.unstubAllGlobals());

describe("daily knowledge, deal comparisons and road signs", () => {
  it("adds 133 distinct sourced questions while preserving all 2,239 revised questions exactly", () => {
    expect(revisedQuestions).toHaveLength(2239);
    expect(
      createHash("sha256")
        .update(JSON.stringify(revisedQuestions))
        .digest("hex"),
    ).toBe("77799aa582c8b54a0cec24f552f5870d77ad8198c8e898e90ea5cdd6ce742076");
    expect(dailyQuestions).toHaveLength(133);
    expect(questions).toHaveLength(2372);
    expect(dailyQuestions.filter((q) => q.image)).toHaveLength(18);
    for (const [category, key, topic, counts] of topics) {
      expect(dailyQuestions.filter((q) => q.topic === topic)).toHaveLength(
        counts.reduce((sum: number, n) => sum + n, 0),
      );
      for (const [i, difficulty] of (
        ["easy", "normal", "hard"] as const
      ).entries()) {
        for (let n = 1; n <= counts[i]; n++) {
          const id = `v2-${category}-daily-${key}-${difficulty}-${String(n).padStart(3, "0")}`;
          const q = questionMap.get(id)!;
          expect(q, id).toMatchObject({ category, difficulty, topic });
          expect(Boolean(q.image), id).toBe(key === "signs");
          expect(q.source?.url, id).toMatch(/^https:\/\//);
        }
      }
    }
  });

  it("keeps standards 1–5 unchanged and includes all seven additions in standard 6 with the same quotas", () => {
    for (const version of oldVersions) {
      const bank =
        version === "standard-v5" ? revisedQuestions : publishedQuestions;
      for (const seed of [1, 7, 21, 42, 99]) {
        const config = createDiagnosticConfig(version);
        expect(
          selectQuestions([...bank, ...dailyQuestions], config, seeded(seed)),
        ).toEqual(selectQuestions(bank, config, seeded(seed)));
      }
    }
    const seen = new Set<string>();
    const config = createDiagnosticConfig();
    expect(config.diagnosticVersion).toBe("standard-v6");
    for (let seed = 1; seed <= 60; seed++) {
      const sample = selectQuestions(questions, config, seeded(seed));
      expect(new Set(sample.map((q) => q.id)).size).toBe(60);
      sample
        .filter((q) => q.id.includes("-daily-"))
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
      expect(
        selectQuestions(
          [...questions, ...archivedQuestions],
          config,
          seeded(seed),
        ),
      ).toEqual(sample);
    }
    expect([...seen].sort()).toEqual(topics.map(([, , topic]) => topic).sort());
  });

  it("restores all six diagnostic editions and validates the category, format and exact published ID ranges", () => {
    const history = [...oldVersions, "standard-v6" as const].map((version) => {
      const bank =
        version === "standard-v6"
          ? questions
          : version === "standard-v5"
            ? revisedQuestions
            : publishedQuestions;
      const session = createSession(bank, createDiagnosticConfig(version));
      session.answers = session.items.map((item) =>
        item.order.indexOf(questionMap.get(item.questionId)!.answer),
      );
      return finishSession(session);
    });
    const session = createSession(
      revisedQuestions,
      createDiagnosticConfig("standard-v5"),
    );
    session.answers[0] = 1;
    vi.stubGlobal("localStorage", {
      getItem: () => JSON.stringify({ session, history }),
    });
    expect(readSaved(questionMap)).toEqual({ session, history });
    for (const record of history) {
      expect(validRecord(record, questionMap)).toBe(true);
      expect(
        categoryScores(record, questionMap).reduce(
          (sum, axis) => sum + axis.correct,
          0,
        ),
      ).toBe(60);
    }
    const current = createSession(questions, createDiagnosticConfig());
    const sign = dailyQuestions.find((q) => q.image)!;
    const index = current.items.findIndex((item) => {
      const q = questionMap.get(item.questionId)!;
      return q.category === "public" && !!q.image;
    });
    current.items[index] = { questionId: sign.id, order: [0, 1, 2, 3] };
    expect(validRecord(current, questionMap, true)).toBe(true);
    for (const version of oldVersions)
      expect(
        validRecord(
          { ...current, config: createDiagnosticConfig(version) },
          questionMap,
          true,
        ),
      ).toBe(false);
    for (const bad of [
      { ...sign, image: undefined },
      { ...sign, difficulty: "easy" as const },
      { ...sign, category: "world" as const },
    ])
      expect(
        validRecord(current, new Map([...questionMap, [bad.id, bad]]), true),
      ).toBe(false);
    for (const [category, key, topic, counts] of topics) {
      const template = dailyQuestions.find((q) => q.topic === topic)!;
      const future: Question = {
        ...template,
        id: `v2-${category}-daily-${key}-normal-${String(counts[1] + 1).padStart(3, "0")}`,
        difficulty: "normal",
      };
      expect(
        selectQuestions([...questions, future], current.config, seeded(1)),
      ).toEqual(selectQuestions(questions, current.config, seeded(1)));
    }
  });

  it("independently recalculates the costs and point conditions of all 40 deal answers", () => {
    function cheaper(a: number, b: number, ending = "円安い") {
      return `${a < b ? "A" : "B"}が${Math.round(Math.abs(a - b) * 100) / 100}${ending}`;
    }
    const expected = {
      easy: [
        cheaper((300 / (200 * 5)) * 100, (240 / (150 * 5)) * 100),
        `AもBも${360 / (25 * 12)}円`,
        cheaper(300 / (600 / 20), 280 / (400 / 10)),
        cheaper(240, Math.ceil(4 / 2) * 200),
        cheaper(20 * 10, (20 / 2) * 15),
        cheaper(Math.ceil(8 / 6) * 180, Math.ceil(8 / 10) * 280),
        cheaper(300, 240),
        cheaper(300 / 2 + 700, 900),
        cheaper(1800 + 500, 2000),
        cheaper(1000 + 300, 1200),
        `AもBも${(500 * 2 + 400).toLocaleString("ja-JP")}円`,
        cheaper(1000 * 1.1, 1080),
        cheaper(1200 + 800 * 0.8, 1200 + 800 - 100),
        cheaper(1000, 920, "円少ない"),
        cheaper(500 + (1200 - 500), 1250),
        cheaper(900 + 250, 1100),
      ],
      normal: [
        cheaper((3000 - 300) * 0.9, 3000 * 0.9 - 300),
        cheaper(
          4000 - Math.min(4000 * 0.2, 500),
          4000 - Math.min(4000 * 0.15, 1000),
        ),
        `Aが${Math.floor(398 / 100) - 2 * Math.floor(199 / 100)}ポイント多い`,
        cheaper(3000 + 2000 - 300, 2850 + 2000, "円少ない"),
        cheaper(3000, 2900, "円少ない"),
        cheaper(5000 - 500 + (5000 - 500 < 5000 ? 600 : 0), 4800),
        cheaper(350 * 7, 3000),
        `${Math.floor(1800 / 300) + 1}回`,
        cheaper(500 + 100 * 6, 250 * 6),
        cheaper(1000 * 2 + 500, 3000),
        cheaper(2000 * 1.1 + 200, 2200 + 100),
        cheaper(100 * 2 + 150 * 3, 135 * 5),
        `Bが${12000 * 0.05 - (12000 * 0.01 + Math.min(12000 * 0.04, 400))}ポイント多い`,
        cheaper(700 * 2, 700 + 500),
        cheaper(250 * 2 + 300, 700 + 300),
        cheaper(800 * 9, 8800).replace("1600", "1,600"),
      ],
      hard: [
        cheaper((6000 - 1000) * 1.02, 6000 * 0.95 + 300),
        cheaper(
          Math.ceil(130 / 30) * 200,
          500 + Math.ceil((130 - 60) / 30) * 150,
        ),
        cheaper(
          8000 + Math.ceil((1000 - 200) / 200) * 1500,
          11000 + Math.ceil((1000 - 200) / 400) * 1000,
        ).replace("1000", "1,000"),
        cheaper((900 / 900) * 100, (810 / 900) * 100),
        cheaper(2000 + 500 + 200 - 500, 2250, "円少ない"),
        cheaper(Math.min(4000 * 0.8, 4000 - 500), (4000 - 500) * 0.9),
        cheaper(Math.ceil(600 / (800 * 0.75)) * 600, 570),
        cheaper(
          Math.min(10000 - 1000 + 300, 6000 - 1000 + 300 + 4000 - 800 + 300),
          8600,
        ),
      ],
    };
    expect(Object.values(expected).flat()).toHaveLength(40);
    for (const difficulty of ["easy", "normal", "hard"] as const) {
      expected[difficulty].forEach((answer, i) => {
        const id = `v2-consumer-daily-deals-${difficulty}-${String(i + 1).padStart(3, "0")}`;
        const q = questionMap.get(id)!;
        expect(q.choices[q.answer], id).toBe(answer);
      });
    }
  });
});
