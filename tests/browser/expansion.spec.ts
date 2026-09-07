import { test, expect } from "@playwright/test";
import {
  questions,
  dailyEditionQuestions,
  sceneEditionQuestions,
  familiarEditionQuestions,
  knowledgeEditionQuestions,
  publishedQuestions,
  revisedQuestions,
  questionMap,
} from "../../src/data/questions";
import { CATEGORY_IDS } from "../../src/data/types";
import {
  createDiagnosticConfig,
  createSession,
  finishSession,
} from "../../src/lib/quiz";

for (const version of [
  "standard-v1",
  "standard-v2",
  "standard-v3",
  "standard-v4",
  "standard-v5",
  "standard-v6",
  "standard-v7",
  "standard-v8",
  "standard-v9",
  "standard-v10",
] as const) {
  test(`a ${version} session survives the expansion and keeps its own label and comparison`, async ({
    page,
  }) => {
    const label = `標準診断 ${version.replace("standard-v", "")}`;
    const old = createSession(
      version === "standard-v10"
        ? knowledgeEditionQuestions
        : version === "standard-v9"
          ? familiarEditionQuestions
          : version === "standard-v8"
            ? sceneEditionQuestions
            : version === "standard-v6" || version === "standard-v7"
              ? dailyEditionQuestions
              : version === "standard-v5"
                ? revisedQuestions
                : publishedQuestions,
      createDiagnosticConfig(version),
    );
    old.startedAt = Date.now() - 10000;
    old.answers = old.items.map(
      (item) =>
        (item.order.indexOf(questionMap.get(item.questionId)!.answer) + 1) % 4,
    );
    const previous = { ...finishSession(old), finishedAt: Date.now() - 5000 };
    const resumed = createSession(
      version === "standard-v9"
        ? familiarEditionQuestions
        : version === "standard-v8"
          ? sceneEditionQuestions
          : version === "standard-v6" || version === "standard-v7"
            ? dailyEditionQuestions
            : version === "standard-v5"
              ? revisedQuestions
              : publishedQuestions,
      createDiagnosticConfig(version),
    );
    resumed.index = 59;
    resumed.answers = resumed.items.map((item, i) =>
      i === 59
        ? null
        : item.order.indexOf(questionMap.get(item.questionId)!.answer),
    );
    await page.goto("/");
    await page.evaluate(
      (saved) => localStorage.setItem("monosashi-v1", JSON.stringify(saved)),
      { history: [previous], session: resumed },
    );
    await page.reload();
    await expect(page.locator(".diagnostic-heading")).toContainText(
      "標準診断 11",
    );
    await expect(page.locator(".last-diagnostic")).toHaveCount(0);
    await expect(page.locator(".resume-banner")).toContainText(label);
    await page.getByRole("button", { name: "クイズを再開" }).click();
    await expect(page.locator(".quiz-toolbar")).toContainText(label);
    const item = resumed.items[59];
    const q = questionMap.get(item.questionId)!;
    await page
      .locator(".answer-option")
      .nth(item.order.indexOf(q.answer))
      .click();
    await page.getByRole("button", { name: "回答を確定する" }).click();
    await page.getByRole("button", { name: "結果を見る" }).click();
    await expect(page.locator(".score-note")).toContainText(label);
    await expect(page.locator(".score-number")).toHaveText("100/ 100");
    await expect(page.locator(".diagnostic-comparison")).toContainText(
      "+100点",
    );
    await expect(page.locator(".diagnostic-comparison")).toContainText(label);
    await page.getByRole("button", { name: "次のチャレンジを選ぶ" }).click();
    await expect(page.locator(".diagnostic-heading")).toContainText(
      "標準診断 11",
    );
    await page.getByRole("button", { name: "学習の記録", exact: true }).click();
    await expect(page.locator(".history-row")).toHaveCount(2);
    await expect(
      page.locator(".history-stats .panel").last().locator("strong"),
    ).toHaveText("—");
  });
}

test("new questions are searchable across all 12 genres", async ({ page }) => {
  await page.goto("/");
  await page
    .getByRole("button", { name: "問題ライブラリ", exact: true })
    .click();
  const additions = questions.filter((q) => q.id.includes("-expanded-"));
  for (const category of CATEGORY_IDS) {
    const q = additions.find((q) => q.category === category)!;
    await page.getByLabel("問題を検索").fill(q.prompt);
    await expect(page.locator(".library-count b")).toHaveText("1");
    await page.locator(".library-question summary").first().click();
    await expect(page.locator(".library-answer")).toContainText(q.explanation);
    await expect(page.locator(".source-link")).toHaveAttribute(
      "href",
      q.source!.url,
    );
  }
});
