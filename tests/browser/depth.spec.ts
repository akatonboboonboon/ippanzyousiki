import { expect, test } from "@playwright/test";
import { depthQuestions, questions } from "../../src/data/questions";

test("all seven new subjects can be found with their complete category and difficulty counts", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByRole("button", { name: "問題ライブラリ", exact: true })
    .click();
  for (const key of [
    "connectors",
    "codes",
    "timekeeping",
    "grooming",
    "measurement",
    "handtools",
    "spectating",
  ]) {
    const question = depthQuestions.find((q) =>
      q.id.includes(`-depth-${key}-`),
    )!;
    const inTopic = questions.filter(
      (q) => q.category === question.category && q.topic === question.topic,
    );
    await page
      .getByLabel("ライブラリのジャンル")
      .selectOption(question.category);
    await page.getByLabel("ライブラリの題材").selectOption(question.topic!);
    await expect(page.locator(".library-count b")).toHaveText(
      String(inTopic.length),
    );
    for (const difficulty of ["easy", "normal", "hard"]) {
      await page.getByLabel("ライブラリの難易度").selectOption(difficulty);
      await expect(page.locator(".library-count b")).toHaveText(
        String(inTopic.filter((q) => q.difficulty === difficulty).length),
      );
    }
    await page.getByLabel("ライブラリの難易度").selectOption("all");
    await page.getByLabel("問題を検索").fill(question.prompt);
    await expect(page.locator(".library-count b")).toHaveText("1");
    await page.locator(".library-question summary").first().click();
    await expect(page.locator(".library-answer")).toContainText(
      question.explanation,
    );
    await expect(page.locator(".source-link")).toHaveAttribute(
      "href",
      question.source!.url,
    );
    await page.getByLabel("問題を検索").fill("");
  }
});

test("additional diagrams and comparisons answer, resume and score on a small screen", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const selected = [
    depthQuestions.find((q) => q.id.includes("-connectors-") && q.image)!,
    depthQuestions.find((q) => q.id.includes("-handtools-") && q.image)!,
    depthQuestions
      .filter((q) => q.id.includes("-dealsmore-"))
      .sort((a, b) => b.prompt.length - a.prompt.length)[0],
  ];
  expect(selected.every(Boolean)).toBe(true);
  const order = [1, 3, 0, 2];
  const session = {
    id: "depth-mobile",
    config: {
      mode: "quiz",
      count: selected.length,
      categories: [...new Set(selected.map((q) => q.category))],
      difficulty: "mix",
    },
    items: selected.map((q) => ({ questionId: q.id, order })),
    answers: selected.map(() => null),
    index: 0,
    startedAt: Date.now(),
  };
  await page.goto("/");
  await page.evaluate(
    (session) =>
      localStorage.setItem(
        "monosashi-v1",
        JSON.stringify({ session, history: [], learning: {} }),
      ),
    session,
  );
  await page.reload();
  await page.getByRole("button", { name: "クイズを再開" }).click();
  for (const [index, q] of selected.entries()) {
    await expect(page.locator(".question-panel h1")).toHaveText(q.prompt);
    if (q.image) {
      await expect(page.locator(".question-visual img")).toBeVisible();
      await expect(page.locator(".question-visual img")).toHaveAttribute(
        "alt",
        q.image.alt,
      );
    }
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(390);
    if (index === 0)
      await page.screenshot({
        path: "artifacts/depth-question-mobile.png",
        fullPage: true,
      });
    await page.locator(".answer-option").nth(order.indexOf(q.answer)).click();
    await page.getByRole("button", { name: "回答を確定する" }).click();
    await expect(page.locator(".answer-feedback")).toContainText(q.explanation);
    if (index === 0) {
      await page.reload();
      await page.getByRole("button", { name: "クイズを再開" }).click();
      await expect(page.locator(".answer-feedback")).toContainText(
        q.explanation,
      );
    }
    await page
      .getByRole("button", {
        name: index === selected.length - 1 ? "結果を見る" : "次の問題へ",
      })
      .click();
  }
  await expect(page.locator(".score-details")).toContainText("3 / 3問");
  await page.screenshot({
    path: "artifacts/depth-result-mobile.png",
    fullPage: true,
  });
});
