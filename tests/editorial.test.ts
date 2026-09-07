import { createHash } from "node:crypto";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  familiarEditionQuestions as questions,
  familiarQuestions,
  sceneEditionQuestions,
  editorialQuestions,
  dailyEditionQuestions,
  revisedQuestions,
  publishedQuestions,
  questionMap,
  depthArchivedQuestions as allArchivedQuestions,
} from "../src/data/questions";
import {
  editorialRevisions,
  editorialOriginalIds,
  currentEditorialId,
  originalEditorialId,
} from "../src/data/editorial-revisions";
import { knowledgeOriginalIds } from "../src/data/knowledge-revisions";
const activeQuestionIds = new Set(questions.map((q) => q.id));
const archivedQuestions = allArchivedQuestions.filter(
  (q) => !knowledgeOriginalIds.has(q.id),
);
import life from "../src/data/editorial-revisions-life.json" with { type: "json" };
import society from "../src/data/editorial-revisions-society.json" with { type: "json" };
import knowledge from "../src/data/editorial-revisions-knowledge.json" with { type: "json" };
import { CATEGORY_IDS, type Question } from "../src/data/types";
import {
  createDiagnosticConfig,
  createSession,
  finishSession,
  selectQuestions,
  validRecord,
  readSaved,
  categoryScores,
} from "../src/lib/quiz";
import {
  recordAnswer,
  recordExposure,
  type LearningProgress,
} from "../src/lib/learning";

const topics = [
  ["household", "smallitems", "日用小物の形と用途", 6],
  ["work", "stationery", "文具の選び方", 3],
  ["culture", "games", "身近な遊びの基本", 6],
  ["household", "gardening", "花や野菜を育てる基礎", 3],
  ["public", "library", "図書館で借りる・返す", 3],
  ["digital", "photo", "スマホの写真・撮影", 6],
  ["public", "hotel", "宿泊の部屋選び", 3],
] as const;
const versions = [
  "standard-v1",
  "standard-v2",
  "standard-v3",
  "standard-v4",
  "standard-v5",
  "standard-v6",
  "standard-v7",
  "standard-v8",
] as const;
const oldPool = (version: (typeof versions)[number]) =>
  version === "standard-v8"
    ? sceneEditionQuestions
    : version === "standard-v6" || version === "standard-v7"
      ? dailyEditionQuestions
      : version === "standard-v5"
        ? revisedQuestions
        : publishedQuestions;
function seeded(seed: number) {
  return () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) | 0;
    return (seed >>> 0) / 4294967296;
  };
}
const progress = (correct = true) => ({
  lastSeenAt: 1,
  lastSessionId: "previous",
  lastAnsweredAt: 1,
  correct,
});
afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("familiar knowledge and wording revisions", () => {
  it("independently checks Othello moves so a distractor cannot also be a legal move", () => {
    type Color = "black" | "white";
    const board = new Map<string, Color>([
      ["D4", "white"],
      ["E5", "white"],
      ["E4", "black"],
      ["D5", "black"],
    ]);
    const flipped = (position: string, color: Color): string[] => {
      if (board.has(position)) return [];
      const x = position.charCodeAt(0) - 65,
        y = Number(position[1]) - 1;
      const result: string[] = [];
      for (let dx = -1; dx <= 1; dx++)
        for (let dy = -1; dy <= 1; dy++) {
          if (!dx && !dy) continue;
          const line: string[] = [];
          for (
            let cx = x + dx, cy = y + dy;
            cx >= 0 && cx < 8 && cy >= 0 && cy < 8;
            cx += dx, cy += dy
          ) {
            const key = `${String.fromCharCode(65 + cx)}${cy + 1}`;
            const cell = board.get(key);
            if (!cell) break;
            if (cell === color) {
              result.push(...line);
              break;
            }
            line.push(key);
          }
        }
      return result;
    };
    const cells = Array.from(
      { length: 64 },
      (_, i) => `${String.fromCharCode(65 + Math.floor(i / 8))}${(i % 8) + 1}`,
    );
    expect(cells.filter((cell) => flipped(cell, "black").length)).toEqual([
      "C4",
      "D3",
      "E6",
      "F5",
    ]);
    const q = questionMap.get("v2-culture-familiar-games-normal-003")!;
    expect(
      q.choices.filter((choice) => flipped(choice, "black").length),
    ).toEqual([q.choices[q.answer]]);
    const flips = flipped("C4", "black");
    const count = questionMap.get("v2-culture-familiar-games-normal-004")!;
    expect(count.choices[count.answer]).toBe(`${flips.length}個`);
    board.set("C4", "black");
    flips.forEach((cell) => board.set(cell, "black"));
    const reply = questionMap.get("v2-culture-familiar-games-normal-005")!;
    expect(flipped("C3", "white")).toEqual([reply.choices[reply.answer]]);
  });

  it("checks score bonuses, elapsed time, available sizes and spacing from independent calculations", () => {
    for (const [id, expected] of [
      ["v2-culture-familiar-games-hard-001", `${10 + 7 + 2}点`],
      ["v2-culture-familiar-games-hard-002", `${8 + 2 + 5}点`],
      ["v2-household-familiar-gardening-hard-001", `${(4 - 1) * 30}cm`],
      ["v2-public-familiar-library-normal-004", `${Math.max(0, 8 + 3 - 10)}冊`],
      ["v2-digital-familiar-photo-hard-002", `${6 / (1 / 5)}秒`],
      [
        "v2-digital-familiar-photo-hard-003",
        `${Math.min(4000, 3000).toLocaleString("en-US")}×${Math.min(4000, 3000).toLocaleString("en-US")}ピクセル`,
      ],
      ["v2-public-familiar-hotel-normal-002", `${4 - 2}組`],
    ]) {
      const q = questionMap.get(id)!;
      expect(q.choices[q.answer], id).toBe(expected);
    }
    const widths = [4, 5.5, 7, 8].filter((n) => n >= 5 && n < 6);
    const tape = questionMap.get("v2-work-familiar-stationery-normal-002")!;
    expect(widths.map((n) => `${n}mm`)).toEqual([tape.choices[tape.answer]]);
    // Start after Friday; Monday is closed. The seventh open day is the next Saturday.
    let days = 0,
      weekday = 5;
    while (days < 7) {
      weekday = (weekday + 1) % 7;
      if (weekday !== 1) days++;
    }
    expect(weekday).toBe(6);
    const date = questionMap.get("v2-public-familiar-library-hard-001")!;
    expect(date.choices[date.answer]).toBe("翌週の土曜");
  });

  it("preserves the exact published 2,492 questions and archives each edited ID without overwriting earlier revisions", () => {
    expect(sceneEditionQuestions).toHaveLength(2492);
    expect(
      createHash("sha256")
        .update(JSON.stringify(sceneEditionQuestions))
        .digest("hex"),
    ).toBe("14ab14df7d5e939ce9717cf66ba4fbc5a62350014288a82e0bcb8a3f4f59c111");
    expect(editorialQuestions).toHaveLength(2492);
    expect(editorialOriginalIds.size).toBeGreaterThan(0);
    expect(archivedQuestions).toHaveLength(1760 + editorialOriginalIds.size);
    const keys = [life, society, knowledge].flatMap(Object.keys);
    expect(new Set(keys).size).toBe(keys.length);
    const before = new Map(sceneEditionQuestions.map((q) => [q.id, q]));
    for (const [id, patch] of Object.entries(editorialRevisions)) {
      const original = before.get(id)!;
      expect(original, id).toBeDefined();
      expect(
        Object.keys(patch).every((key) =>
          ["prompt", "choices", "answer", "explanation", "source"].includes(
            key,
          ),
        ),
        id,
      ).toBe(true);
      expect(patch.prompt, id).not.toBe(original.prompt);
      const edited = questionMap.get(currentEditorialId(id))!;
      expect(edited, id).toMatchObject({
        category: original.category,
        difficulty: original.difficulty,
        topic: original.topic,
      });
      expect(edited.image, id).toEqual(original.image);
      expect(edited.id).toBe(`${id}-r3`);
      expect(originalEditorialId(edited.id)).toBe(id);
      expect(questionMap.get(id)).toEqual(original);
      expect(activeQuestionIds.has(id), id).toBe(false);
      expect(activeQuestionIds.has(edited.id), id).toBe(true);
    }
    for (const original of sceneEditionQuestions.filter(
      (q) => !editorialOriginalIds.has(q.id),
    ))
      expect(questions.find((q) => q.id === original.id)).toEqual(original);
  });

  it("adds all 105 new questions in seven topics and keeps the declared difficulty and image distributions", () => {
    expect(familiarQuestions).toHaveLength(105);
    expect(familiarQuestions.filter((q) => q.image)).toHaveLength(30);
    expect(questions).toHaveLength(2597);
    expect(
      ["easy", "normal", "hard"].map(
        (d) => questions.filter((q) => q.difficulty === d).length,
      ),
    ).toEqual([1010, 1022, 565]);
    for (const [category, key, topic, normalImages] of topics) {
      expect(familiarQuestions.filter((q) => q.topic === topic)).toHaveLength(
        15,
      );
      for (const [difficulty, count] of [
        ["easy", 6],
        ["normal", 6],
        ["hard", 3],
      ] as const) {
        for (let n = 1; n <= count; n++) {
          const id = `v2-${category}-familiar-${key}-${difficulty}-${String(n).padStart(3, "0")}`;
          const q = questionMap.get(id)!;
          expect(q, id).toMatchObject({ category, difficulty, topic });
          expect(Boolean(q.image), id).toBe(
            difficulty === "normal" && n <= normalImages,
          );
          expect(q.source?.url, id).toMatch(/^https:\/\//);
        }
      }
    }
  });

  it("leaves standards 1–8 unchanged with the complete archive and with the new bank appended", () => {
    const learning = Object.fromEntries(
      sceneEditionQuestions.map((q, i) => [
        q.id,
        { ...progress(i % 2 === 0), lastSeenAt: i + 1 },
      ]),
    );
    for (const version of versions) {
      const config = createDiagnosticConfig(version);
      const old = oldPool(version);
      for (const seed of [2, 11, 35]) {
        const expected = selectQuestions(old, config, seeded(seed), learning);
        expect(
          selectQuestions(
            [...old, ...questions, ...archivedQuestions],
            config,
            seeded(seed),
            learning,
          ),
        ).toEqual(expected);
      }
    }
  });

  it("uses edited IDs and all seven additions in standard 9 with unchanged quotas and excludes future IDs", () => {
    const config = createDiagnosticConfig("standard-v9");
    expect(config.diagnosticVersion).toBe("standard-v9");
    const seenTopics = new Set<string>();
    let sawRevision = false;
    for (let seed = 1; seed <= 80; seed++) {
      const sample = selectQuestions(questions, config, seeded(seed));
      expect(new Set(sample.map((q) => q.id)).size).toBe(60);
      expect(sample.every((q) => activeQuestionIds.has(q.id))).toBe(true);
      sawRevision ||= sample.some((q) => q.id.endsWith("-r3"));
      sample
        .filter((q) => /^v2-[a-z]+-familiar-/.test(q.id))
        .forEach((q) => seenTopics.add(q.topic!));
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
    expect(sawRevision).toBe(true);
    expect([...seenTopics].sort()).toEqual(
      topics.map(([, , topic]) => topic).sort(),
    );
    const future: Question[] = topics.map(([category, key, topic]) => ({
      ...familiarQuestions.find((q) => q.topic === topic)!,
      difficulty: "normal",
      id: `v2-${category}-familiar-${key}-normal-007`,
    }));
    expect(
      selectQuestions(
        [...questions, ...archivedQuestions, ...future],
        config,
        seeded(22),
      ),
    ).toEqual(selectQuestions(questions, config, seeded(22)));
  });

  it("preserves unseen priority and the optional mistake quota in standard 9, and rejects a retired substitution", () => {
    const learning: LearningProgress = {};
    const unseen = new Set<string>();
    for (const category of CATEGORY_IDS) {
      for (const [difficulty, image, count] of [
        ["easy", false, 2],
        ["normal", false, 1],
        ["normal", true, 1],
        ["hard", false, 1],
      ] as const) {
        const bucket = questions.filter(
          (q) =>
            q.category === category &&
            q.difficulty === difficulty &&
            Boolean(q.image) === image,
        );
        // Prefer recent additions for this fixture so every expanded axis gets exercised.
        const pool = [...bucket].reverse();
        pool.slice(0, count).forEach((q) => unseen.add(q.id));
        pool.slice(count).forEach((q) => (learning[q.id] = progress()));
      }
    }
    const config = createDiagnosticConfig("standard-v9");
    const sample = selectQuestions(questions, config, seeded(13), learning);
    expect(new Set(sample.map((q) => q.id))).toEqual(unseen);
    for (const q of questions
      .filter((q) => learning[q.id])
      .filter((_, i) => i % 3 === 0))
      learning[q.id] = progress(false);
    const repeated = selectQuestions(questions, config, seeded(13), learning);
    expect(
      repeated.filter((q) => learning[q.id]?.correct === false).length,
    ).toBeLessThanOrEqual(12);
    expect(repeated.some((q) => learning[q.id]?.correct === true)).toBe(false);
    const session = createSession(questions, config);
    const edited = questions.find((q) => q.id.endsWith("-r3"))!;
    const present = session.items.findIndex(
      (item) => item.questionId === edited.id,
    );
    const index =
      present >= 0
        ? present
        : session.items.findIndex((item) => {
            const q = questionMap.get(item.questionId)!;
            return (
              q.category === edited.category &&
              q.difficulty === edited.difficulty &&
              Boolean(q.image) === Boolean(edited.image)
            );
          });
    session.items[index] = { questionId: edited.id, order: [0, 1, 2, 3] };
    expect(validRecord(session, questionMap, true)).toBe(true);
    session.items[index].questionId = originalEditorialId(edited.id);
    expect(validRecord(session, questionMap, true)).toBe(false);
  });

  it("restores old and new histories with their original scores while excluding retired IDs from the learning ledger", () => {
    const history = versions.map((version) => {
      const session = createSession(
        oldPool(version),
        createDiagnosticConfig(version),
      );
      session.answers = session.items.map((item) =>
        item.order.indexOf(questionMap.get(item.questionId)!.answer),
      );
      return finishSession(session);
    });
    const current = createSession(
      questions,
      createDiagnosticConfig("standard-v9"),
    );
    current.answers = current.items.map((item) =>
      item.order.indexOf(questionMap.get(item.questionId)!.answer),
    );
    history.push(finishSession(current));
    const old = sceneEditionQuestions.find((q) =>
      editorialOriginalIds.has(q.id),
    )!;
    const unchanged = sceneEditionQuestions.find(
      (q) => !editorialOriginalIds.has(q.id) && !knowledgeOriginalIds.has(q.id),
    )!;
    const learning = { [old.id]: progress(false), [unchanged.id]: progress() };
    const session = createSession([old], {
      mode: "quiz",
      count: 1,
      difficulty: old.difficulty,
      categories: [old.category],
    });
    vi.stubGlobal("localStorage", {
      getItem: () => JSON.stringify({ history, session, learning }),
    });
    const saved = readSaved(questionMap);
    expect(saved.history).toEqual(history);
    expect(saved.session).toEqual(session);
    expect(saved.learning).toEqual({ [unchanged.id]: progress() });
    expect(saved.learning[currentEditorialId(old.id)]).toBeUndefined();
    for (const record of saved.history)
      expect(
        categoryScores(record, questionMap).reduce(
          (n, axis) => n + axis.correct,
          0,
        ),
      ).toBe(60);
    const edited = questionMap.get(currentEditorialId(old.id))!;
    const item = { questionId: edited.id, order: [2, 0, 3, 1] };
    const exposed = recordExposure(saved.learning, item, "new", 10);
    const answered = recordAnswer(
      exposed,
      item,
      item.order.indexOf(edited.answer),
      questionMap,
      "new",
      11,
    );
    expect(answered[edited.id]).toMatchObject({
      lastSeenAt: 10,
      lastAnsweredAt: 11,
      correct: true,
    });
    expect(answered[old.id]).toBeUndefined();
  });
});
