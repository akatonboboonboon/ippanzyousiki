import { expect, test } from "@playwright/test";
import { questions } from "../../src/data/questions";
const dailyQuestions = questions.filter((q) => q.id.includes("-daily-"));

test("the seven new topics expose their questions, difficulties and sources", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByRole("button", { name: "問題ライブラリ", exact: true })
    .click();
  for (const [category, topic, counts] of [
    ["world", "身近な道具の仕組み", [6, 6, 3]],
    ["health", "食品の包装の役割", [6, 6, 3]],
    ["money", "光熱費の明細", [6, 6, 3]],
    ["digital", "ニュースの数字", [6, 6, 3]],
    ["manners", "外食で見かける言葉", [6, 6, 3]],
    ["consumer", "どちらがお得？", [16, 16, 8]],
    ["public", "道路標識の見分け方", [0, 18, 0]],
  ] as const) {
    await page.getByLabel("ライブラリのジャンル").selectOption(category);
    await page.getByLabel("ライブラリの題材").selectOption(topic);
    await expect(page.locator(".library-count b")).toHaveText(
      String(counts.reduce((sum: number, n) => sum + n, 0)),
    );
    for (const [i, difficulty] of ["easy", "normal", "hard"].entries()) {
      await page.getByLabel("ライブラリの難易度").selectOption(difficulty);
      await expect(page.locator(".library-count b")).toHaveText(
        String(counts[i]),
      );
    }
    await page.getByLabel("ライブラリの難易度").selectOption("all");
    const q = dailyQuestions.find((q) => q.topic === topic)!;
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

test("deal comparison and sign image answers survive reload, score correctly and stay readable on mobile", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const errors: string[] = [];
  page.on("pageerror", (err) => errors.push(err.message));
  const deal = dailyQuestions
    .filter((q) => q.topic === "どちらがお得？")
    .sort((a, b) => b.prompt.length - a.prompt.length)[0];
  const sign = dailyQuestions.find(
    (q) => q.id === "v2-public-daily-signs-normal-002",
  )!;
  const items = [deal, sign].map((q) => ({
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
      id: "new-daily-mobile",
      config: {
        mode: "quiz",
        count: 2,
        difficulty: "mix",
        categories: ["consumer", "public"],
      },
      items,
      answers: [null, null],
      index: 0,
      startedAt: Date.now(),
    },
  );
  await page.reload();
  await page.getByRole("button", { name: "クイズを再開" }).click();
  for (const [i, q] of [deal, sign].entries()) {
    await expect(page.locator(".question-panel h1")).toHaveText(q.prompt);
    if (q.image) {
      const img = page.locator(".question-visual img");
      await expect
        .poll(() =>
          img.evaluate(
            (el: HTMLImageElement) => el.complete && el.naturalWidth > 0,
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
      path: `artifacts/daily-${i === 0 ? "deals" : "signs"}-mobile.png`,
      fullPage: true,
    });
    await page
      .locator(".answer-option")
      .nth(items[i].order.indexOf(q.answer))
      .click();
    await page.getByRole("button", { name: "回答を確定する" }).click();
    await expect(page.locator(".answer-feedback")).toContainText(q.explanation);
    if (i === 0) {
      await page.reload();
      await expect(page.locator(".resume-banner")).toContainText("1 / 2問");
      await page.getByRole("button", { name: "クイズを再開" }).click();
      await expect(page.locator(".answer-feedback")).toContainText(
        q.explanation,
      );
    }
    await page
      .getByRole("button", { name: i === 0 ? "次の問題へ" : "結果を見る" })
      .click();
  }
  await expect(page.locator(".score-number")).toHaveText("100/ 100");
  await expect(page.locator(".score-details")).toContainText("2 / 2問");
  expect(errors).toEqual([]);
});
