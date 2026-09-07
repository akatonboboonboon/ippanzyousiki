import { test, expect } from "@playwright/test";
import { questionMap } from "../../src/data/questions";
import { currentKnowledgeId } from "../../src/data/knowledge-revisions";

test("the reported closure question is replaced in the library while a saved answer keeps its original score", async ({
  page,
}) => {
  const old = questionMap.get("v2-public-hard-020")!;
  const revised = questionMap.get(currentKnowledgeId(old.id))!;
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page
    .getByRole("button", { name: "問題ライブラリ", exact: true })
    .click();
  await page.getByLabel("問題を検索").fill("月曜休館");
  await expect(page.locator(".library-count b")).toHaveText("0");
  await page.getByLabel("問題を検索").fill(revised.prompt);
  await expect(page.locator(".library-count b")).toHaveText("1");
  await page.locator(".library-question summary").click();
  await expect(page.locator(".library-answer")).toContainText(
    revised.explanation,
  );
  await expect(page.locator(".source-link")).toHaveAttribute(
    "href",
    revised.source!.url,
  );
  const order = [1, 3, 2, 0];
  await page.evaluate(
    ({ old, order }) =>
      localStorage.setItem(
        "monosashi-v1",
        JSON.stringify({
          history: [],
          learning: {},
          session: {
            id: "reported-closure-old",
            config: {
              mode: "quiz",
              count: 1,
              categories: ["public"],
              difficulty: "hard",
            },
            items: [{ questionId: old.id, order }],
            answers: [order.indexOf(old.answer)],
            index: 0,
            startedAt: Date.now(),
          },
        }),
      ),
    { old, order },
  );
  await page.reload();
  await expect(page.locator(".resume-banner")).toContainText(
    "開始時の問題・選択肢で再開",
  );
  await page.getByRole("button", { name: "クイズを再開" }).click();
  await expect(page.locator(".question-panel h1")).toHaveText(old.prompt);
  await expect(page.locator(".answer-feedback")).toContainText(old.explanation);
  await page.getByRole("button", { name: "結果を見る" }).click();
  await expect(page.locator(".score-details")).toContainText("1 / 1問");
  await page.evaluate(
    ({ q, order }) =>
      localStorage.setItem(
        "monosashi-v1",
        JSON.stringify({
          history: [],
          learning: {},
          session: {
            id: "reported-closure-new",
            config: {
              mode: "quiz",
              count: 1,
              categories: ["public"],
              difficulty: "hard",
            },
            items: [{ questionId: q.id, order }],
            answers: [null],
            index: 0,
            startedAt: Date.now(),
          },
        }),
      ),
    { q: revised, order },
  );
  await page.reload();
  await page.getByRole("button", { name: "クイズを再開" }).click();
  await expect(page.locator(".question-panel h1")).toHaveText(revised.prompt);
  await expect(
    page.locator(".answer-feedback, .question-panel .source-link"),
  ).toHaveCount(0);
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth),
  ).toBeLessThanOrEqual(390);
  await page.screenshot({
    path: "artifacts/knowledge-replacement-mobile.png",
    fullPage: true,
  });
  await page
    .locator(".answer-option")
    .nth(order.indexOf(revised.answer))
    .click();
  await page.getByRole("button", { name: "回答を確定する" }).click();
  await expect(page.locator(".answer-feedback")).toContainText(
    revised.explanation,
  );
  await page.reload();
  await page.getByRole("button", { name: "クイズを再開" }).click();
  await expect(page.locator(".answer-feedback")).toContainText(
    revised.explanation,
  );
  await page.getByRole("button", { name: "結果を見る" }).click();
  await expect(page.locator(".score-details")).toContainText("1 / 1問");
});
