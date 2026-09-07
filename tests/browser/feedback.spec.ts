import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { questions, questionMap } from "../../src/data/questions";
import { questionKind } from "../../src/data/question-review";
import {
  createDiagnosticConfig,
  createSession,
  finishSession,
} from "../../src/lib/quiz";

test("43 of 50 is shown as 86 percent in the result and history without a fabricated grade", async ({
  page,
}) => {
  const session = createSession(questions, createDiagnosticConfig());
  session.answers = session.items.map((item, i) => {
    const correct = item.order.indexOf(
      questionMap.get(item.questionId)!.answer,
    );
    return i < 43 ? correct : (correct + 1) % 4;
  });
  const result = finishSession(session);
  await page.goto("/");
  await page.evaluate(
    (r) =>
      localStorage.setItem(
        "monosashi-v1",
        JSON.stringify({ history: [r], session: null }),
      ),
    result,
  );
  await page.reload();
  await page.getByRole("button", { name: "学習の記録", exact: true }).click();
  await expect(page.locator(".history-row")).toContainText("86%");
  await expect(page.locator(".history-row")).toContainText("50問中 43問正解");
  await page.locator(".history-row").click();
  await expect(page.locator(".score-number")).toHaveText("86%");
  await expect(page.locator(".score-correct")).toHaveText("50問中 43問正解");
  await expect(page.locator(".grade-title,.history-grade")).toHaveCount(0);
  await expect(page.locator(".score-panel")).not.toContainText("/ 100");
  await expect(page.locator(".result-radar")).toBeVisible();
  await page.screenshot({
    path: "artifacts/feedback-audit/result-desktop.png",
  });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({
    path: "artifacts/feedback-audit/result-mobile.png",
    fullPage: true,
  });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
});

test("calculation practice is explicit, survives reload, and remains searchable apart from knowledge", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator(".hero-visual")).toHaveCount(0);
  await expect(
    page.getByRole("button", { name: "知識診断をはじめる" }),
  ).toBeVisible();
  await page.screenshot({ path: "artifacts/feedback-audit/home-desktop.png" });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: "artifacts/feedback-audit/home-mobile.png" });
  await page.getByRole("button", { name: "自由練習", exact: false }).click();
  await page
    .getByRole("button", { name: "計算・読み取り", exact: true })
    .click();
  await page.getByRole("button", { name: "12問", exact: true }).click();
  await page
    .getByRole("button", { name: "クイズをはじめる", exact: true })
    .click();
  const saved = await page.evaluate(() =>
    JSON.parse(localStorage.getItem("monosashi-v1")!),
  );
  expect(saved.session.config.questionScope).toBe("reasoning");
  expect(
    saved.session.items.every(
      (item: { questionId: string }) =>
        questionKind(questionMap.get(item.questionId)!) === "reasoning",
    ),
  ).toBe(true);
  await expect(page.locator(".question-meta")).toContainText("計算・読み取り");
  const prompt = await page.locator(".question-panel h1").innerText();
  await page.reload();
  await page.getByRole("button", { name: "クイズを再開" }).click();
  await expect(page.locator(".question-panel h1")).toHaveText(prompt);
  await page
    .getByRole("button", { name: "問題ライブラリ", exact: true })
    .click();
  await page.getByLabel("ライブラリの問題の種類").selectOption("reasoning");
  await expect(page.locator(".library-count b")).toHaveText(
    String(questions.filter((q) => questionKind(q) === "reasoning").length),
  );
  await page.getByLabel("ライブラリの問題の種類").selectOption("knowledge");
  await expect(page.locator(".library-count b")).toHaveText(
    String(questions.filter((q) => questionKind(q) === "knowledge").length),
  );
  await page.screenshot({
    path: "artifacts/feedback-audit/library-mobile.png",
  });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});
