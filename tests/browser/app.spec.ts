import { expect, test, type Page } from "@playwright/test";
import { questions } from "../../src/data/questions";
import AxeBuilder from "@axe-core/playwright";

async function completeQuiz(page: Page, correctCount: number, count = 12) {
  for (let i = 0; i < count; i++) {
    const prompt = await page.locator(".question-panel h1").innerText();
    const question = questions.find((q) => q.prompt === prompt)!;
    const choice =
      i < correctCount ? question.answer : (question.answer + 1) % 4;
    await page
      .locator(".answer-option")
      .filter({
        has: page
          .locator("span:not(.answer-letter)")
          .and(page.getByText(question.choices[choice], { exact: true })),
      })
      .click();
    await page.getByRole("button", { name: "回答を確定する" }).click();
    await expect(page.getByRole("status")).toBeVisible();
    await page
      .getByRole("button", {
        name: i === count - 1 ? "結果を見る" : "次の問題へ",
      })
      .click();
  }
}

test("completes and scores a quiz, explains mistakes, saves history and allows targeted review", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await page.getByRole("button", { name: "自由練習", exact: false }).click();
  await page.getByRole("button", { name: "12問", exact: true }).click();
  await page.getByRole("button", { name: "クイズをはじめる" }).click();
  await expect(
    page.getByRole("button", { name: "回答を確定する" }),
  ).toBeDisabled();
  await completeQuiz(page, 9);
  await expect(page.locator(".score-number")).toHaveText("75/ 100");
  await expect(page.locator(".score-details")).toContainText("9 / 12問");
  await expect(
    page.getByRole("img", { name: /ジャンル別正答率/ }),
  ).toBeVisible();
  await expect(page.locator(".breakdown-content")).toHaveCount(12);
  await expect(
    page.locator(".breakdown-content b").filter({ hasText: "未測定" }),
  ).toHaveCount(0);
  await expect(page.locator(".review-item")).toHaveCount(3);
  await page.screenshot({
    path: "artifacts/results-desktop.png",
    fullPage: true,
  });
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
  await page.getByRole("button", { name: "間違えた3問を復習" }).click();
  await expect(page.locator(".quiz-toolbar")).toContainText("復習チャレンジ");
  await completeQuiz(page, 3, 3);
  await expect(page.locator(".score-number")).toHaveText("100/ 100");
  await page.getByRole("button", { name: "次のチャレンジを選ぶ" }).click();
  await expect(
    page.getByRole("button", { name: "24問", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "学習の記録", exact: true }).click();
  await expect(page.locator(".history-row")).toHaveCount(2);
  await expect(page.locator(".review-banner")).toContainText("0問");
  await page.reload();
  await page.getByRole("button", { name: "学習の記録", exact: true }).click();
  await expect(page.locator(".history-row")).toHaveCount(2);
  expect(errors).toEqual([]);
});

test("resumes an answered question with the same shuffled options and score after reload", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "自由練習", exact: false }).click();
  await page.getByRole("button", { name: "クイズをはじめる" }).click();
  const prompt = await page.locator(".question-panel h1").innerText();
  const options = await page.locator(".answer-option").allTextContents();
  await page.locator(".answer-option").nth(2).click();
  await page.getByRole("button", { name: "回答を確定する" }).click();
  await page.reload();
  await expect(page.locator(".resume-banner")).toContainText("1 / 24問");
  await page.getByRole("button", { name: "クイズを再開" }).click();
  await expect(page.locator(".question-panel h1")).toHaveText(prompt);
  expect(await page.locator(".answer-option").allTextContents()).toEqual(
    options,
  );
  await expect(page.locator(".answer-option").nth(2)).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await expect(page.getByRole("status")).toBeVisible();
  await page.getByRole("button", { name: "次の問題へ" }).click();
  await expect(page.locator(".quiz-progress-label")).toContainText("02");
});

test("mobile stays in the viewport and single-genre result leaves other axes unmeasured", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "自由練習", exact: false }).click();
  await page.screenshot({ path: "artifacts/home-mobile.png", fullPage: true });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.getByRole("button", { name: /家事・暮らし.*洗濯/ }).click();
  await page.getByRole("button", { name: "12問", exact: true }).click();
  await page.getByRole("button", { name: "クイズをはじめる" }).click();
  await page.locator(".answer-option").first().click();
  await page.screenshot({ path: "artifacts/quiz-mobile.png", fullPage: true });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await completeQuiz(page, 6);
  await expect(page.locator(".score-panel h2")).toHaveText(
    "選択ジャンルの理解度",
  );
  await expect(
    page.locator(".breakdown-content b").filter({ hasText: "未測定" }),
  ).toHaveCount(11);
  await page.screenshot({
    path: "artifacts/results-mobile.png",
    fullPage: true,
  });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});

test("searches and filters the complete library, clears empty results and changes pages", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "自由練習", exact: false }).click();
  await page
    .getByRole("button", { name: "問題ライブラリ", exact: true })
    .click();
  await expect(page.locator(".library-count b")).toHaveText(
    String(questions.length),
  );
  await page.getByLabel("ライブラリのジャンル").selectOption("digital");
  await page.getByLabel("ライブラリの難易度").selectOption("hard");
  const filteredCount = questions.filter(
    (q) => q.category === "digital" && q.difficulty === "hard",
  ).length;
  await expect(page.locator(".library-count b")).toHaveText(
    String(filteredCount),
  );
  await page.getByRole("button", { name: "次へ", exact: true }).click();
  await expect(page.locator(".pagination > span")).toHaveText(
    `2 / ${Math.ceil(filteredCount / 20)}`,
  );
  await expect(page.locator(".library-question")).toHaveCount(20);
  await page.getByLabel("問題を検索").fill("there-is-no-such-question-zzz");
  await expect(
    page.getByRole("heading", { name: "一致する問題が見つかりませんでした。" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "条件をリセット" }).click();
  await expect(page.locator(".library-count b")).toHaveText(
    String(questions.length),
  );
  await page.getByLabel("問題を検索").fill("スクリーンショット");
  await page.locator(".library-question").first().locator("summary").click();
  await expect(page.locator(".library-answer").first()).toBeVisible();
});

test("protects an unfinished session and recovers safely from corrupted storage", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "自由練習", exact: false }).click();
  await page.evaluate(() =>
    localStorage.setItem("monosashi-v1", "{broken-json"),
  );
  await page.reload();
  await page.getByRole("button", { name: "自由練習", exact: false }).click();
  await expect(
    page.getByRole("button", { name: "クイズをはじめる" }),
  ).toBeEnabled();
  await page.getByRole("button", { name: "クイズをはじめる" }).click();
  const prompt = await page.locator(".question-panel h1").innerText();
  await page.getByRole("button", { name: "中断して戻る" }).click();
  await page.getByRole("button", { name: "クイズをはじめる" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.getByRole("button", { name: "キャンセル", exact: true }).click();
  await page.getByRole("button", { name: "クイズを再開" }).click();
  await expect(page.locator(".question-panel h1")).toHaveText(prompt);
});

test("desktop homepage has no overflow and a stable screenshot", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "自由練習", exact: false }).click();
  await page
    .getByRole("button", { name: "標準診断", exact: false })
    .first()
    .click();
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: "artifacts/home-desktop.png", fullPage: true });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});
