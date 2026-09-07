import { test, expect } from "@playwright/test";
import { questions } from "../../src/data/questions";

test("all six everyday topics expose their current questions, difficulty filters, explanations and sources", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByRole("button", { name: "問題ライブラリ", exact: true })
    .click();
  for (const [category, topic] of [
    ["public", "落とし物"],
    ["public", "荷物の発送"],
    ["public", "車の日常点検"],
    ["health", "料理の基本"],
    ["health", "紫外線と外出"],
    ["household", "住まいのトラブル"],
  ]) {
    await page.getByLabel("ライブラリのジャンル").selectOption(category);
    await page.getByLabel("ライブラリの題材").selectOption(topic);
    const topicQuestions = questions.filter(
      (q) => q.category === category && q.topic === topic,
    );
    await expect(page.locator(".library-count b")).toHaveText(
      String(topicQuestions.length),
    );
    for (const difficulty of ["easy", "normal", "hard"]) {
      await page.getByLabel("ライブラリの難易度").selectOption(difficulty);
      await expect(page.locator(".library-count b")).toHaveText(
        String(
          topicQuestions.filter((q) => q.difficulty === difficulty).length,
        ),
      );
    }
    await page.getByLabel("ライブラリの難易度").selectOption("all");
    const q = questions.find((q) => q.topic === topic)!;
    await page.getByLabel("問題を検索").fill(q.prompt);
    await expect(page.locator(".library-count b")).toHaveText("1");
    await page.locator(".library-question summary").click();
    await expect(page.locator(".library-answer")).toContainText(q.explanation);
    await expect(page.locator(".source-link")).toHaveAttribute(
      "href",
      q.source!.url,
    );
    await page.getByLabel("問題を検索").fill("");
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.locator(".library-count b")).toHaveText("20");
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth),
  ).toBeLessThanOrEqual(390);
  await page.screenshot({ path: "artifacts/everyday-library-mobile.png" });
});
