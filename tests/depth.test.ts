import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import {
  questions,
  depthQuestions,
  knowledgeEditionQuestions,
  archivedQuestions,
  questionMap,
} from "../src/data/questions";
import manifest from "../src/data/diagnostic-depth.json" with { type: "json" };
import { CATEGORY_IDS, type Question } from "../src/data/types";
import {
  createDiagnosticConfig,
  createSession,
  finishSession,
  selectQuestions,
  validRecord,
  categoryScores,
} from "../src/lib/quiz";

const seeded = (n: number) => () =>
  ((n = (Math.imul(n, 1664525) + 1013904223) | 0) >>> 0) / 4294967296;
const hash = (value: unknown) =>
  createHash("sha256").update(JSON.stringify(value)).digest("hex");
const oldLearning = Object.fromEntries(
  knowledgeEditionQuestions.map((q) => [
    q.id,
    { lastSeenAt: 1, lastSessionId: "old", lastAnsweredAt: 1, correct: true },
  ]),
);

describe("broader everyday question bank", () => {
  it("preserves the published standard 10 bank byte for byte and freezes the new eligible metadata", () => {
    expect(knowledgeEditionQuestions).toHaveLength(2597);
    expect(hash(knowledgeEditionQuestions)).toBe(
      "21b4a4c32bceedb14cad3da7783274ba19514a490cf5f58589ead284c7a45eda",
    );
    expect(manifest).toEqual(
      depthQuestions.map((q) => ({
        id: q.id,
        category: q.category,
        difficulty: q.difficulty,
        image: !!q.image,
      })),
    );
    expect(questions).toEqual([
      ...knowledgeEditionQuestions,
      ...depthQuestions,
    ]);
    for (const q of knowledgeEditionQuestions)
      expect(questionMap.get(q.id)).toEqual(q);
  });

  it("adds seven new subjects and expands the existing library subjects with sourced, distinct questions", () => {
    expect(depthQuestions).toHaveLength(316);
    const beforeIds = new Set(knowledgeEditionQuestions.map((q) => q.id));
    const beforePrompts = new Set(
      knowledgeEditionQuestions.map((q) =>
        q.prompt.normalize("NFKC").replace(/\s/g, ""),
      ),
    );
    expect(new Set(depthQuestions.map((q) => q.id)).size).toBe(
      depthQuestions.length,
    );
    for (const q of depthQuestions) {
      expect(beforeIds.has(q.id), q.id).toBe(false);
      expect(
        beforePrompts.has(q.prompt.normalize("NFKC").replace(/\s/g, "")),
        q.id,
      ).toBe(false);
      expect(q.id).toMatch(/^v2-[a-z]+-depth-[a-z]+-(easy|normal|hard)-\d{3}$/);
      expect(q.choices).toHaveLength(4);
      expect(new Set(q.choices).size, q.id).toBe(4);
      expect(
        Number.isInteger(q.answer) && q.answer >= 0 && q.answer <= 3,
        q.id,
      ).toBe(true);
      expect(q.source?.label.trim().length, q.id).toBeGreaterThan(0);
      expect(new URL(q.source!.url).protocol, q.id).toBe("https:");
      if (q.image) {
        expect(q.difficulty, q.id).toBe("normal");
        expect(q.image.alt.length, q.id).toBeGreaterThan(10);
        expect(existsSync(`public/${q.image.src}`), q.id).toBe(true);
        expect(readFileSync(`public/${q.image.src}`, "utf8"), q.id).toContain(
          "<svg",
        );
      }
    }
    for (const key of [
      "connectors",
      "codes",
      "timekeeping",
      "grooming",
      "measurement",
      "handtools",
      "spectating",
    ])
      expect(
        depthQuestions.filter((q) => q.id.includes(`-depth-${key}-`)).length,
        key,
      ).toBeGreaterThanOrEqual(10);
    for (const key of [
      "photomore",
      "stationerymore",
      "cookingmore",
      "gardenmore",
      "playmore",
      "librarymore",
      "hotelmore",
      "dealsmore",
      "signsmore",
    ]) {
      const additions = depthQuestions.filter((q) =>
        q.id.includes(`-depth-${key}-`),
      );
      expect(additions.length, key).toBeGreaterThanOrEqual(10);
      for (const q of additions)
        expect(
          knowledgeEditionQuestions.some(
            (old) => old.category === q.category && old.topic === q.topic,
          ),
          q.id,
        ).toBe(true);
    }
  });

  it("keeps standard 10 draws fixed and excludes additions, future IDs and malformed formats from frozen pools", () => {
    const config = createDiagnosticConfig("standard-v10");
    const full = [...archivedQuestions, ...questions];
    for (const n of [7, 19, 42])
      expect(selectQuestions(full, config, seeded(n), oldLearning)).toEqual(
        selectQuestions(
          knowledgeEditionQuestions,
          config,
          seeded(n),
          oldLearning,
        ),
      );
    const next = createDiagnosticConfig();
    expect(next.diagnosticVersion).toBe("standard-v11");
    const image = depthQuestions.find((q) => q.image)!;
    const extras: Question[] = [
      { ...image, id: image.id.replace(/\d{3}$/, "999") },
      { ...image, id: `${image.id}-future` },
    ];
    expect(
      selectQuestions([...questions, ...extras], next, seeded(43)),
    ).toEqual(selectQuestions(questions, next, seeded(43)));
    const session = createSession(questions, next);
    const imageSlot = session.items.findIndex(
      (item) =>
        questionMap.get(item.questionId)!.category === image.category &&
        questionMap.get(item.questionId)!.image,
    );
    session.items[imageSlot] = { questionId: image.id, order: [1, 3, 0, 2] };
    expect(validRecord(session, questionMap, true)).toBe(true);
    const malformed = new Map(questionMap);
    malformed.set(image.id, { ...image, image: undefined });
    expect(validRecord(session, malformed, true)).toBe(false);
  });

  it("uses additions as unseen questions while preserving the diagnostic quotas and occasional wrong-answer repeats", () => {
    const config = createDiagnosticConfig();
    const selected = selectQuestions(
      questions,
      config,
      seeded(17),
      oldLearning,
    );
    expect(new Set(selected.map((q) => q.id)).size).toBe(60);
    for (const category of CATEGORY_IDS) {
      const axis = selected.filter((q) => q.category === category);
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
      selected.filter((q) => q.id.includes("-depth-")).length,
    ).toBeGreaterThan(15);
    const unseen = new Set(
      selectQuestions(questions, config, seeded(25)).map((q) => q.id),
    );
    const learning = Object.fromEntries(
      questions
        .filter((q) => !unseen.has(q.id))
        .map((q, i) => [
          q.id,
          {
            lastSeenAt: 1,
            lastSessionId: "answered",
            lastAnsweredAt: 1,
            correct: i % 3 !== 0,
          },
        ]),
    );
    const mixed = selectQuestions(questions, config, seeded(29), learning);
    expect(
      mixed.filter((q) => learning[q.id]?.correct === false).length,
    ).toBeLessThanOrEqual(12);
    expect(mixed.some((q) => learning[q.id]?.correct === true)).toBe(false);
  });

  it("restores and scores both editions and every additional question with shuffled answer positions", () => {
    for (const version of ["standard-v10", "standard-v11"] as const) {
      const session = createSession(questions, createDiagnosticConfig(version));
      expect(
        validRecord(JSON.parse(JSON.stringify(session)), questionMap, true),
      ).toBe(true);
      session.answers = session.items.map((item) =>
        item.order.indexOf(questionMap.get(item.questionId)!.answer),
      );
      const result = finishSession(session);
      expect(validRecord(result, questionMap)).toBe(true);
      expect(
        categoryScores(result, questionMap).reduce(
          (sum, axis) => sum + axis.correct,
          0,
        ),
      ).toBe(60);
    }
    const session = createSession(depthQuestions, {
      mode: "quiz",
      count: depthQuestions.length,
      difficulty: "mix",
      categories: [...CATEGORY_IDS],
    });
    expect(session.items).toHaveLength(depthQuestions.length);
    session.answers = session.items.map((item) =>
      item.order.indexOf(questionMap.get(item.questionId)!.answer),
    );
    session.index = session.items.length - 1;
    expect(validRecord(session, questionMap, true)).toBe(true);
    const result = finishSession(session);
    expect(
      categoryScores(result, questionMap).reduce(
        (sum, axis) => sum + axis.correct,
        0,
      ),
    ).toBe(depthQuestions.length);
  });
});
