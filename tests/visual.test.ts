import { readFileSync, existsSync } from "node:fs";
import { resolve, relative } from "node:path";
import { describe, expect, it } from "vitest";
import { questions, depthQuestions } from "../src/data/questions";
import {
  createDiagnosticConfig,
  DIAGNOSTIC_IMAGE_COUNT,
  selectQuestions,
  validRecord,
  createSession,
} from "../src/lib/quiz";

describe("visual question delivery", () => {
  it("ships every local SVG with a valid canvas, complete descriptions and no external resource dependencies", () => {
    const visualQuestions = questions.filter((q) => q.image);
    expect(visualQuestions).toHaveLength(
      120 + depthQuestions.filter((q) => q.image).length,
    );
    expect(new Set(visualQuestions.map((q) => q.image!.src)).size).toBe(
      visualQuestions.length,
    );
    const publicDir = resolve("public");
    for (const question of visualQuestions) {
      expect(question.image, question.id).toBeDefined();
      const image = question.image!;
      expect(image.src, question.id).toMatch(/^quiz\/[a-z0-9-]+\.svg$/);
      const path = resolve(publicDir, image.src);
      expect(relative(publicDir, path).startsWith("..")).toBe(false);
      expect(existsSync(path), image.src).toBe(true);
      const svg = readFileSync(path, "utf8");
      expect(svg, image.src).toMatch(/<svg\b/);
      const canvas = svg.match(/viewBox="0 0 (\d+) (\d+)"/);
      expect(canvas, image.src).not.toBeNull();
      expect(Number(canvas![1]), image.src).toBeGreaterThan(0);
      expect(Number(canvas![2]), image.src).toBeGreaterThan(0);
      expect(svg, image.src).not.toMatch(
        /<script|<foreignObject|(?:xlink:)?href\s*=|@import/i,
      );
      for (const reference of svg.matchAll(/url\(([^)]+)\)/g))
        expect(reference[1].replace(/["']/g, "").trim(), image.src).toMatch(
          /^#[a-zA-Z][\w-]*$/,
        );
      expect(image.alt.trim().length, question.id).toBeGreaterThan(20);
      expect(question.source?.url, question.id).toMatch(/^https:\/\//);
    }
  });

  it("uses the shipped questions to create and restore a complete standard diagnostic", () => {
    const selected = selectQuestions(questions, createDiagnosticConfig());
    expect(selected).toHaveLength(50);
    expect(selected.filter((q) => q.image)).toHaveLength(DIAGNOSTIC_IMAGE_COUNT);
    const bank = new Map(questions.map((q) => [q.id, q]));
    const session = createSession(questions, createDiagnosticConfig());
    expect(validRecord(JSON.parse(JSON.stringify(session)), bank, true)).toBe(
      true,
    );
  });
});
