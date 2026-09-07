import { test, expect } from "@playwright/test";
import { questions, publishedQuestions } from "../../src/data/questions";
import {
  currentChoiceId,
  revisedOriginalIds,
} from "../../src/data/choice-revisions";
import { currentEditorialId } from "../../src/data/editorial-revisions";
import { currentKnowledgeId } from "../../src/data/knowledge-revisions";

test("an older twelve-genre practice resumes with its original choices and chart while the library shows revised choices", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  const old = ["household", "culture"].map((category) =>
    publishedQuestions.find(
      (q) => q.category === category && revisedOriginalIds.has(q.id),
    )!,
  );
  expect(old.every(Boolean)).toBe(true);
  const items = old.map((q) => ({ questionId: q.id, order: [3, 2, 1, 0] }));
  const answers = [
    items[0].order.indexOf(old[0].answer),
    (items[1].order.indexOf(old[1].answer) + 1) % 4,
  ];
  const result = {
    id: "before-choice-revision",
    config: {
      mode: "quiz",
      difficulty: "mix",
      categories: old.map((q) => q.category),
      count: 2,
    },
    items,
    answers,
    startedAt: Date.now() - 2000,
    finishedAt: Date.now() - 1000,
  };
  await page.goto("/");
  await page.evaluate(
    (saved) => localStorage.setItem("monosashi-v1", JSON.stringify(saved)),
    {
      history: [result],
      session: {
        ...result,
        id: "old-practice",
        index: 1,
        answers: [answers[0], null],
      },
    },
  );
  await page.reload();
  await expect(page.getByRole("status")).toHaveCount(0);
  await expect(page.locator(".resume-banner")).toContainText("1 / 2問");
  await expect(page.locator(".resume-banner")).toContainText(
    "開始時の問題・選択肢で再開",
  );
  await page.getByRole("button", { name: "クイズを再開" }).click();
  await expect(page.locator(".question-panel h1")).toHaveText(old[1].prompt);
  for (const [index, position] of items[1].order.entries()) {
    await expect(page.locator(".answer-option").nth(index)).toContainText(
      old[1].choices[position],
    );
  }
  await page.locator(".answer-option").nth(answers[1]).click();
  await page.getByRole("button", { name: "回答を確定する" }).click();
  await page.getByRole("button", { name: "結果を見る" }).click();
  await expect(page.locator(".score-number")).toHaveText("50/ 100");
  await page.getByRole("button", { name: "学習の記録", exact: true }).click();
  await expect(page.locator(".history-row")).toHaveCount(2);
  await expect(page.locator(".history-row").first()).toContainText(
    "家事・暮らし・ことば・教養",
  );
  await expect(page.locator(".history-row").first()).toContainText("改訂前");
  await page.locator(".history-row").first().click();
  await expect(page.locator(".score-number")).toHaveText("50/ 100");
  await expect(page.locator(".breakdown-item")).toHaveCount(12);
  await expect(page.locator(".breakdown-item")).toContainText([
    "家事・暮らし",
    "食と健康",
    "お金・家計",
    "買い物・契約",
    "仕事・連絡",
    "マナー・慣習",
    "交通・公共",
    "防災・安全",
    "ネット・情報",
    "社会・手続き",
    "ことば・教養",
    "身近な科学・世界",
  ]);
  await expect(
    page.getByRole("img", { name: /ジャンル別正答率/ }),
  ).toHaveAttribute("aria-label", /ことば・教養/);
  await expect(
    page.getByRole("button", { name: "間違えた0問を復習" }),
  ).toBeDisabled();
  await page.locator(".review-item summary").click();
  await expect(page.locator(".review-body")).toContainText(
    old[1].choices[old[1].answer],
  );
  await expect(page.locator(".review-body")).toContainText(
    old[1].choices[items[1].order[answers[1]]],
  );
  const revised = questions.find(
    (q) =>
      q.id ===
      currentKnowledgeId(currentEditorialId(currentChoiceId(old[1].id))),
  )!;
  await page
    .getByRole("button", { name: "問題ライブラリ", exact: true })
    .click();
  await page.getByLabel("問題を検索").fill(revised.prompt);
  await expect(page.locator(".library-count b")).toHaveText("1");
  await page.locator(".library-question summary").click();
  for (const choice of revised.choices)
    await expect(page.locator(".library-answer")).toContainText(choice);
  expect(errors).toEqual([]);
});

test("revised choices resume, score and wrap on mobile without horizontal overflow", async ({
  page,
}) => {
  const q = questions
    .filter((q) => q.id.endsWith("-r2") && !q.image)
    .sort((a, b) => b.choices.join("").length - a.choices.join("").length)[0];
  expect(q).toBeDefined();
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const order = [2, 0, 3, 1];
  await page.evaluate(
    (session) =>
      localStorage.setItem(
        "monosashi-v1",
        JSON.stringify({ session, history: [] }),
      ),
    {
      id: "revised-mobile",
      config: {
        mode: "quiz",
        categories: [q.category],
        difficulty: q.difficulty,
        count: 1,
      },
      items: [{ questionId: q.id, order }],
      answers: [null],
      index: 0,
      startedAt: Date.now(),
    },
  );
  await page.reload();
  await page.getByRole("button", { name: "クイズを再開" }).click();
  await expect(page.locator(".question-panel h1")).toHaveText(q.prompt);
  await expect(page.locator(".answer-option")).toHaveCount(4);
  for (const [index, position] of order.entries())
    await expect(page.locator(".answer-option").nth(index)).toContainText(
      q.choices[position],
    );
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth),
  ).toBeLessThanOrEqual(390);
  await page.screenshot({
    path: "artifacts/revised-choices-mobile.png",
    fullPage: true,
  });
  await page.locator(".answer-option").nth(order.indexOf(q.answer)).click();
  await page.getByRole("button", { name: "回答を確定する" }).click();
  await page.getByRole("button", { name: "結果を見る" }).click();
  await expect(page.locator(".score-number")).toHaveText("100/ 100");
});
