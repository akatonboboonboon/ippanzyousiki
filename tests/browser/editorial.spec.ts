import { expect, test } from "@playwright/test";
import {
  questions,
  familiarQuestions,
  sceneEditionQuestions,
} from "../../src/data/questions";
import {
  currentEditorialId,
  editorialOriginalIds,
} from "../../src/data/editorial-revisions";
import { currentKnowledgeId } from "../../src/data/knowledge-revisions";

test("all seven familiar topics expose 15 sourced questions with the intended difficulty distribution", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByRole("button", { name: "問題ライブラリ", exact: true })
    .click();
  for (const topic of new Set(familiarQuestions.map((q) => q.topic!))) {
    const q = questions.find((q) => q.topic === topic)!;
    await page.getByLabel("ライブラリのジャンル").selectOption(q.category);
    await page.getByLabel("ライブラリの題材").selectOption(topic);
    await expect(page.locator(".library-count b")).toHaveText("15");
    for (const [difficulty, count] of [
      ["easy", 6],
      ["normal", 6],
      ["hard", 3],
    ] as const) {
      await page.getByLabel("ライブラリの難易度").selectOption(difficulty);
      await expect(page.locator(".library-count b")).toHaveText(String(count));
    }
    await page.getByLabel("ライブラリの難易度").selectOption("all");
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
});

test("an archived wording resumes and scores as published while the library shows its replacement", async ({
  page,
}) => {
  const original =
    sceneEditionQuestions.find(
      (q) =>
        editorialOriginalIds.has(q.id) &&
        q.answer !==
          questions.find(
            (newQ) => newQ.id === currentKnowledgeId(currentEditorialId(q.id)),
          )?.answer,
    ) ?? sceneEditionQuestions.find((q) => editorialOriginalIds.has(q.id))!;
  const edited = questions.find(
    (q) => q.id === currentKnowledgeId(currentEditorialId(original.id)),
  )!;
  const order = [2, 0, 3, 1];
  await page.goto("/");
  await page.evaluate(
    ({ original, order }) =>
      localStorage.setItem(
        "monosashi-v1",
        JSON.stringify({
          history: [],
          learning: {
            [original.id]: {
              lastSeenAt: 1,
              lastAnsweredAt: 1,
              lastSessionId: "old",
              correct: false,
            },
          },
          session: {
            id: "wording-before",
            config: {
              mode: "quiz",
              categories: [original.category],
              difficulty: original.difficulty,
              count: 1,
            },
            items: [{ questionId: original.id, order }],
            answers: [null],
            index: 0,
            startedAt: Date.now(),
          },
        }),
      ),
    { original, order },
  );
  await page.reload();
  await expect(page.locator(".resume-banner")).toContainText(
    "開始時の問題・選択肢で再開",
  );
  await page.getByRole("button", { name: "クイズを再開" }).click();
  await expect(page.locator(".question-panel h1")).toHaveText(original.prompt);
  for (const [i, answerIndex] of order.entries())
    await expect(page.locator(".answer-option").nth(i)).toContainText(
      original.choices[answerIndex],
    );
  await page
    .locator(".answer-option")
    .nth(order.indexOf(original.answer))
    .click();
  await page.getByRole("button", { name: "回答を確定する" }).click();
  await page.getByRole("button", { name: "結果を見る" }).click();
  await expect(page.locator(".score-details")).toContainText("1 / 1問");
  await expect(page.locator(".breakdown-item")).toHaveCount(12);
  const saved = await page.evaluate(() =>
    JSON.parse(localStorage.getItem("monosashi-v1")!),
  );
  expect(saved.history[0].items[0].questionId).toBe(original.id);
  expect(saved.learning[edited.id]).toBeUndefined();
  await page
    .getByRole("button", { name: "問題ライブラリ", exact: true })
    .click();
  await page.getByLabel("問題を検索").fill(edited.prompt);
  await expect(page.locator(".library-count b")).toHaveText("1");
  await page.locator(".library-question summary").click();
  for (const choice of edited.choices)
    await expect(page.locator(".library-answer")).toContainText(choice);
  await expect(page.locator(".library-prompt")).toHaveText(edited.prompt);
});

test("familiar diagrams and a rewritten question remain usable on mobile and save their own answers", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const errors: string[] = [];
  page.on("pageerror", (err) => errors.push(err.message));
  const selected = [
    ...["games", "photo", "hotel"].map((key) =>
      questions.find((q) => q.id.includes(`-familiar-${key}-normal-003`))!,
    ),
    questions
      .filter((q) => q.id.endsWith("-r3"))
      .sort(
        (a, b) =>
          (b.prompt + b.choices.join("")).length -
          (a.prompt + a.choices.join("")).length,
      )[0],
  ];
  const order = [2, 0, 3, 1];
  await page.goto("/");
  await page.evaluate(
    (session) =>
      localStorage.setItem(
        "monosashi-v1",
        JSON.stringify({ history: [], learning: {}, session }),
      ),
    {
      id: "familiar-mobile",
      config: {
        mode: "quiz",
        count: selected.length,
        difficulty: "mix",
        categories: [...new Set(selected.map((q) => q.category))],
      },
      items: selected.map((q) => ({ questionId: q.id, order })),
      answers: selected.map(() => null),
      index: 0,
      startedAt: Date.now(),
    },
  );
  await page.reload();
  await page.getByRole("button", { name: "クイズを再開" }).click();
  for (const [i, q] of selected.entries()) {
    await expect(page.locator(".question-panel h1")).toHaveText(q.prompt);
    if (q.image) {
      await expect
        .poll(() =>
          page
            .locator(".question-visual img")
            .evaluate(
              (el: HTMLImageElement) =>
                el.complete &&
                el.naturalWidth === 480 &&
                el.naturalHeight === 280,
            ),
        )
        .toBe(true);
      await page.locator(".image-description summary").click();
      await expect(page.locator(".image-description p")).toHaveText(
        q.image.alt,
      );
    }
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(390);
    await page.screenshot({
      path: `artifacts/familiar-${["games", "photo", "hotel", "rewritten"][i]}-mobile.png`,
      fullPage: true,
    });
    // The hotel answer is a diagram letter, which must not match the button's own letter.
    await page
      .locator(".answer-option")
      .filter({
        has: page
          .locator("span:not(.answer-letter)")
          .and(page.getByText(q.choices[q.answer], { exact: true })),
      })
      .click();
    await page.getByRole("button", { name: "回答を確定する" }).click();
    await expect(page.locator(".answer-feedback")).toContainText(q.explanation);
    await page.reload();
    await page.getByRole("button", { name: "クイズを再開" }).click();
    await expect(page.locator(".answer-feedback")).toContainText(q.explanation);
    const learning = await page.evaluate(
      () => JSON.parse(localStorage.getItem("monosashi-v1")!).learning,
    );
    expect(learning[q.id].correct).toBe(true);
    await page
      .getByRole("button", {
        name: i < selected.length - 1 ? "次の問題へ" : "結果を見る",
      })
      .click();
  }
  await expect(page.locator(".score-details")).toContainText("4 / 4問");
  expect(errors).toEqual([]);
});
