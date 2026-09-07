import { expect, test } from "@playwright/test";
import { sceneQuestions } from "../../src/data/questions";

test("all eight scene topics are searchable with difficulty counts and source explanations", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByRole("button", { name: "問題ライブラリ", exact: true })
    .click();
  for (const [category, topic, counts] of [
    ["public", "道路に描かれた表示", [0, 15, 0]],
    ["public", "施設の案内マーク", [0, 15, 0]],
    ["household", "間取り図の読み方", [6, 6, 3]],
    ["culture", "親族の呼び方", [6, 6, 3]],
    ["household", "衣類・寝具の形と用途", [6, 6, 3]],
    ["household", "家電の運転機能", [6, 6, 3]],
    ["money", "立替・割り勘・精算", [6, 6, 3]],
    ["consumer", "お店の在庫と受け取り", [6, 6, 3]],
  ] as const) {
    await page.getByLabel("ライブラリのジャンル").selectOption(category);
    await page.getByLabel("ライブラリの題材").selectOption(topic);
    await expect(page.locator(".library-count b")).toHaveText("15");
    for (const [i, difficulty] of ["easy", "normal", "hard"].entries()) {
      await page.getByLabel("ライブラリの難易度").selectOption(difficulty);
      await expect(page.locator(".library-count b")).toHaveText(
        String(counts[i]),
      );
    }
    await page.getByLabel("ライブラリの難易度").selectOption("all");
    const q = sceneQuestions.find((q) => q.topic === topic)!;
    await page.getByLabel("問題を検索").fill(q.prompt);
    await expect(page.locator(".library-count b")).toHaveText("1");
    await page.locator(".library-question summary").first().click();
    await expect(page.locator(".library-answer")).toContainText(q.explanation);
    await expect(page.locator(".source-link")).toHaveAttribute(
      "href",
      q.source!.url,
    );
    await page.getByLabel("問題を検索").fill("");
  }
});

test("floor plans, family diagrams and settlements stay readable on mobile and restore submitted answers", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const errors: string[] = [];
  page.on("pageerror", (err) => errors.push(err.message));
  const selected = [
    sceneQuestions
      .filter((q) => q.topic === "立替・割り勘・精算")
      .sort((a, b) => b.prompt.length - a.prompt.length)[0],
    sceneQuestions.find(
      (q) => q.id === "v2-household-scene-floorplan-normal-003",
    )!,
    sceneQuestions.find((q) => q.id === "v2-culture-scene-family-normal-005")!,
  ];
  const items = selected.map((q) => ({
    questionId: q.id,
    order: [2, 0, 3, 1],
  }));
  await page.goto("/");
  await page.evaluate(
    (session) =>
      localStorage.setItem(
        "monosashi-v1",
        JSON.stringify({ session, history: [] }),
      ),
    {
      id: "scene-mobile-resume",
      config: {
        mode: "quiz",
        count: 3,
        difficulty: "mix",
        categories: ["money", "household", "culture"],
      },
      items,
      answers: [null, null, null],
      index: 0,
      startedAt: Date.now(),
    },
  );
  await page.reload();
  await page.getByRole("button", { name: "クイズを再開" }).click();
  for (const [i, q] of selected.entries()) {
    await expect(page.locator(".question-panel h1")).toHaveText(q.prompt);
    if (q.image) {
      const img = page.locator(".question-visual img");
      await expect
        .poll(() =>
          img.evaluate(
            (el: HTMLImageElement) =>
              el.complete &&
              el.naturalWidth === 480 &&
              el.naturalHeight === 280,
          ),
        )
        .toBe(true);
      await expect(img).toHaveAttribute("alt", q.image.alt);
      await page.locator(".image-description summary").click();
      await expect(page.locator(".image-description p")).toHaveText(
        q.image.alt,
      );
    }
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(390);
    await page.screenshot({
      path: `artifacts/scene-quiz-${["settlement", "floorplan", "family"][i]}-mobile.png`,
      fullPage: true,
    });
    await page
      .locator(".answer-option")
      .nth(items[i].order.indexOf(q.answer))
      .click();
    await page.getByRole("button", { name: "回答を確定する" }).click();
    await expect(page.locator(".answer-feedback")).toContainText(q.explanation);
    await page.reload();
    await expect(page.locator(".resume-banner")).toContainText(
      `${i + 1} / 3問`,
    );
    await page.getByRole("button", { name: "クイズを再開" }).click();
    await expect(page.locator(".question-panel h1")).toHaveText(q.prompt);
    await expect(page.locator(".answer-feedback")).toContainText(q.explanation);
    await expect(
      page.getByRole("button", { name: "回答を確定する" }),
    ).toHaveCount(0);
    await page
      .getByRole("button", { name: i < 2 ? "次の問題へ" : "結果を見る" })
      .click();
  }
  await expect(page.locator(".score-number")).toHaveText("100/ 100");
  await expect(page.locator(".score-details")).toContainText("3 / 3問");
  expect(errors).toEqual([]);
});
