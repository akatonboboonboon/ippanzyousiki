import { expect, test } from "@playwright/test";
import { questions } from "../../src/data/questions";

test("daily-life topics are discoverable, filterable and reset when the genre changes", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator(".hero-facts")).toContainText("1200");
  await expect(page.locator(".category-card")).toHaveCount(12);
  await page
    .getByRole("button", { name: "問題ライブラリ", exact: true })
    .click();
  await page.getByLabel("ライブラリのジャンル").selectOption("household");
  await expect(page.locator(".library-count")).toContainText("100");
  const topic = questions.find((q) => q.category === "household")!.topic!;
  await page.getByLabel("ライブラリの題材").selectOption(topic);
  const count = questions.filter(
    (q) => q.category === "household" && q.topic === topic,
  ).length;
  await expect(page.locator(".library-count b")).toHaveText(String(count));
  await expect(page.locator(".topic-label").first()).toHaveText(topic);
  await page.getByLabel("ライブラリのジャンル").selectOption("manners");
  await expect(page.getByLabel("ライブラリの題材")).toHaveValue("all");
  await expect(page.locator(".library-count b")).toHaveText("100");
  await page.getByLabel("問題を検索").fill("水引");
  await expect(page.locator(".library-question").first()).toBeVisible();
  await page.setViewportSize({ width: 390, height: 844 });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});
