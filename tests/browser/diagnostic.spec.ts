import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { questions, questionMap } from "../../src/data/questions";
import {
  createSession,
  createDiagnosticConfig,
  finishSession,
} from "../../src/lib/quiz";

test("standard diagnostic keeps fixed conditions, defers feedback, resumes, and compares only standard results", async ({
  page,
}) => {
  test.setTimeout(150000);
  const prior = createSession(questions, createDiagnosticConfig());
  prior.startedAt = Date.now() - 20000;
  prior.answers = prior.items.map((item, index) => {
    const correct = item.order.indexOf(
      questionMap.get(item.questionId)!.answer,
    );
    return index < 30 ? correct : (correct + 1) % 4;
  });
  const previous = { ...finishSession(prior), finishedAt: Date.now() - 10000 };
  const practice = createSession(questions, {
    mode: "quiz",
    categories: ["household"],
    difficulty: "easy",
    count: 12,
  });
  practice.answers = practice.items.map((item) =>
    item.order.indexOf(questionMap.get(item.questionId)!.answer),
  );
  const practiceResult = finishSession(practice);
  const old = createSession(questions, createDiagnosticConfig("standard-v2"));
  old.answers = old.items.map((item) =>
    item.order.indexOf(questionMap.get(item.questionId)!.answer),
  );
  const oldResult = finishSession(old);
  await page.goto("/");
  await page.evaluate(
    (saved) => localStorage.setItem("monosashi-v1", JSON.stringify(saved)),
    { history: [oldResult, practiceResult, previous], session: null },
  );
  await page.reload();
  await expect(page.locator(".last-diagnostic")).toContainText("50点");
  await expect(page.locator(".count-options")).toHaveCount(0);
  await page.getByRole("button", { name: "標準診断をはじめる" }).click();
  let imageCount = 0;
  for (let i = 0; i < 60; i++) {
    const prompt = await page.locator(".question-panel h1").innerText();
    const question = questions.find((q) => q.prompt === prompt)!;
    if (question.image) {
      imageCount++;
      const img = page.locator(".question-visual img");
      await expect(img).toBeVisible();
      await expect
        .poll(() =>
          img.evaluate(
            (el: HTMLImageElement) => el.complete && el.naturalWidth > 0,
          ),
        )
        .toBe(true);
    }
    const choice = i < 45 ? question.answer : (question.answer + 1) % 4;
    await page
      .locator(".answer-option")
      .filter({
        has: page.getByText(question.choices[choice], { exact: true }),
      })
      .click();
    await page.getByRole("button", { name: "回答を確定する" }).click();
    await expect(page.locator(".diagnostic-saved")).toContainText("診断の最後");
    await expect(
      page.locator(
        ".answer-feedback, .answer-option.correct, .answer-option.incorrect, .question-panel .source-link",
      ),
    ).toHaveCount(0);
    if (i === 19) {
      await page.reload();
      await expect(page.locator(".resume-banner")).toContainText("20 / 60問");
      await page.getByRole("button", { name: "クイズを再開" }).click();
      await expect(page.locator(".question-panel h1")).toHaveText(prompt);
      await expect(page.locator(".diagnostic-saved")).toBeVisible();
      await expect(page.locator(".answer-feedback")).toHaveCount(0);
    }
    await page
      .getByRole("button", { name: i === 59 ? "結果を見る" : "次の問題へ" })
      .click();
  }
  expect(imageCount).toBe(12);
  await expect(page.locator(".score-panel h2")).toHaveText(
    "標準診断の一般常識度",
  );
  await expect(page.locator(".score-number")).toHaveText("75/ 100");
  await expect(page.locator(".score-details")).toContainText("45 / 60問");
  await expect(page.locator(".diagnostic-comparison")).toContainText("+25点");
  await expect(page.locator(".diagnostic-comparison")).toContainText(
    "標準診断 3",
  );
  await expect(page.locator(".breakdown-item")).toHaveCount(12);
  await expect(page.locator(".review-item")).toHaveCount(15);
  await page.screenshot({
    path: "artifacts/standard-result.png",
    fullPage: true,
  });
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
  await page.getByRole("button", { name: "次のチャレンジを選ぶ" }).click();
  await expect(
    page.getByRole("button", { name: "標準診断をはじめる" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "学習の記録", exact: true }).click();
  await expect(page.locator(".history-stats .panel").last()).toContainText(
    "最新の標準診断 3",
  );
  await expect(
    page.locator(".history-stats .panel").last().locator("strong"),
  ).toHaveText("75点");
  await expect(page.locator(".history-row")).toHaveCount(4);
  await expect(
    page.locator(".history-row").filter({ hasText: "標準診断 2" }),
  ).toHaveCount(1);
});

test("visual library loads all 24 diagrams, offers descriptions, and works on mobile", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.screenshot({
    path: "artifacts/standard-home-mobile.png",
    fullPage: true,
  });
  await page
    .getByRole("button", { name: "問題ライブラリ", exact: true })
    .click();
  await page.getByLabel("ライブラリの出題形式").selectOption("image");
  await expect(page.locator(".library-count b")).toHaveText("24");
  for (let p = 0; p < 2; p++) {
    const items = page.locator(".library-question");
    for (let i = 0; i < (await items.count()); i++) {
      const item = items.nth(i);
      await item.locator("summary").first().click();
      const img = item.locator(".question-visual img");
      await img.scrollIntoViewIfNeeded();
      await expect
        .poll(() =>
          img.evaluate(
            (el: HTMLImageElement) => el.complete && el.naturalWidth > 0,
          ),
        )
        .toBe(true);
      await expect(img).toHaveAttribute("alt", /.{10,}/);
      await item.locator(".image-description summary").click();
      await expect(item.locator(".image-description p")).toBeVisible();
    }
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    if (p === 0)
      await page.getByRole("button", { name: "次へ", exact: true }).click();
  }
  await page.screenshot({
    path: "artifacts/visual-library-mobile.png",
    fullPage: true,
  });
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
});

test("a failed diagram still exposes the full visual description", async ({
  page,
}) => {
  await page.route("**/quiz/*.svg", (route) => route.abort());
  await page.goto("/");
  await page
    .getByRole("button", { name: "問題ライブラリ", exact: true })
    .click();
  await page.getByLabel("ライブラリの出題形式").selectOption("image");
  await page.locator(".library-question summary").first().click();
  await expect(page.locator(".image-fallback")).toContainText("図の内容：");
});
