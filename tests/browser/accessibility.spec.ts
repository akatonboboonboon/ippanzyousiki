import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("home, quiz, library and empty history have no automated WCAG AA violations", async ({
  page,
}) => {
  await page.goto("/");
  const check = async () =>
    expect(
      (
        await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
          .analyze()
      ).violations,
    ).toEqual([]);
  await check();
  await page.getByRole("button", { name: "クイズをはじめる" }).click();
  await check();
  await page
    .getByRole("button", { name: "問題ライブラリ", exact: true })
    .click();
  await page.locator(".library-question").first().locator("summary").click();
  await check();
  await page.getByRole("button", { name: "学習の記録", exact: true }).click();
  await check();
});

test("blocked local storage shows a warning while the quiz remains usable", async ({
  page,
}) => {
  await page.addInitScript(() => {
    Storage.prototype.setItem = () => {
      throw new DOMException("Storage disabled", "QuotaExceededError");
    };
  });
  await page.goto("/");
  await expect(page.getByRole("alert")).toContainText("記録を保存できません");
  await page.getByRole("button", { name: "クイズをはじめる" }).click();
  await page.locator(".answer-option").first().click();
  await page.getByRole("button", { name: "回答を確定する" }).click();
  await expect(page.getByRole("status")).toBeVisible();
  await expect(page.locator(".save-note")).toHaveText("保存できません");
});
