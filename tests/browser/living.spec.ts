import { test, expect } from "@playwright/test";
import { questions } from "../../src/data/questions";

test("all six living topics expose the expected questions, difficulty filters, explanations and sources", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByRole("button", { name: "問題ライブラリ", exact: true })
    .click();
  for (const [category, topic, counts] of [
    ["consumer", "住まい探しの費用", [8, 8, 4]],
    ["health", "食品表示の読み分け", [8, 8, 4]],
    ["household", "家電の処分", [8, 8, 4]],
    ["household", "乾電池の使い方", [6, 6, 3]],
    ["public", "自転車の手入れ", [8, 8, 4]],
    ["world", "身近なものの知識", [8, 8, 4]],
  ] as const) {
    await page.getByLabel("ライブラリのジャンル").selectOption(category);
    await page.getByLabel("ライブラリの題材").selectOption(topic);
    await expect(page.locator(".library-count b")).toHaveText(
      String(counts[0] + counts[1] + counts[2]),
    );
    for (const [difficulty, count] of [
      ["easy", String(counts[0])],
      ["normal", String(counts[1])],
      ["hard", String(counts[2])],
    ]) {
      await page.getByLabel("ライブラリの難易度").selectOption(difficulty);
      await expect(page.locator(".library-count b")).toHaveText(count);
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
  await page.screenshot({ path: "artifacts/living-library-mobile.png" });
});
