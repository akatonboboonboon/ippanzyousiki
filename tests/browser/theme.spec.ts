import { expect, test, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { questions, questionMap } from "../../src/data/questions";
import {
  createDiagnosticConfig,
  createSession,
  finishSession,
} from "../../src/lib/quiz";

const themeControl = (page: Page) =>
  page.getByRole("combobox", { name: "表示テーマ" });
const expectTheme = async (page: Page, theme: "light" | "dark") => {
  await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
  await expect(page.locator("html")).toHaveCSS("color-scheme", theme);
};
const expectNoOverflow = async (page: Page) => {
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
};

test("system appearance follows live changes and explicit choices persist independently of quiz data", async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/");
  await expect(themeControl(page)).toHaveValue("system");
  await expectTheme(page, "dark");
  await page.emulateMedia({ colorScheme: "light" });
  await expectTheme(page, "light");

  await page.getByRole("button", { name: "知識診断をはじめる" }).click();
  await page.locator(".answer-option").first().click();
  await page.getByRole("button", { name: "回答を確定する" }).click();
  await expect(page.getByRole("status")).toBeVisible();
  const quizData = await page.evaluate(() =>
    localStorage.getItem("monosashi-v1"),
  );
  await themeControl(page).selectOption("dark");
  await expectTheme(page, "dark");
  expect(await page.evaluate(() => localStorage.getItem("joshiki-theme"))).toBe(
    "dark",
  );
  expect(await page.evaluate(() => localStorage.getItem("monosashi-v1"))).toBe(
    quizData,
  );
  await page.reload();
  await expect(themeControl(page)).toHaveValue("dark");
  await expectTheme(page, "dark");
  await page.emulateMedia({ colorScheme: "dark" });
  await page.emulateMedia({ colorScheme: "light" });
  await expectTheme(page, "dark");
  await page.getByRole("button", { name: "クイズを再開" }).click();
  await expect(page.getByRole("status")).toBeVisible();

  await themeControl(page).selectOption("light");
  await page.emulateMedia({ colorScheme: "dark" });
  await expectTheme(page, "light");
  await themeControl(page).selectOption("system");
  await expectTheme(page, "dark");
  await page.emulateMedia({ colorScheme: "light" });
  await expectTheme(page, "light");
  await page.reload();
  await expect(themeControl(page)).toHaveValue("system");
  await expectTheme(page, "light");
});

test("saved dark appearance is applied before the application module starts", async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.addInitScript(() => localStorage.setItem("joshiki-theme", "dark"));
  await page.route("**/src/main.tsx*", (route) =>
    route.fulfill({ status: 200, contentType: "text/javascript", body: "" }),
  );
  await page.goto("/");
  await expect(page.locator("#root")).toBeEmpty();
  await expectTheme(page, "dark");
  await expect(page.locator("html")).toHaveCSS(
    "background-color",
    "rgb(11, 16, 13)",
  );
});

test("theme switching and answering remain usable when browser storage is unavailable", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.emulateMedia({ colorScheme: "dark" });
  await page.addInitScript(() => {
    Object.defineProperty(window, "localStorage", {
      configurable: true,
      get() {
        throw new DOMException("Storage disabled", "SecurityError");
      },
    });
  });
  await page.goto("/");
  await expectTheme(page, "dark");
  await themeControl(page).selectOption("light");
  await expectTheme(page, "light");
  await themeControl(page).selectOption("dark");
  await expectTheme(page, "dark");
  await page.getByRole("button", { name: "知識診断をはじめる" }).click();
  await page.locator(".answer-option").first().click();
  await page.getByRole("button", { name: "回答を確定する" }).click();
  await expect(page.locator(".diagnostic-saved")).toBeVisible();
  expect(errors).toEqual([]);
});

test("the appearance control works with the keyboard and fits a narrow screen", async ({
  page,
}) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/");
  const control = themeControl(page);
  await control.focus();
  await expect(control).toBeFocused();
  await page.keyboard.press("End");
  await page.keyboard.press("Enter");
  await expect(control).toHaveValue("dark");
  await expectTheme(page, "dark");
  await expectNoOverflow(page);
  await page.screenshot({
    path: "artifacts/theme/home-mobile.png",
    fullPage: true,
  });
  await page.getByRole("button", { name: "知識診断をはじめる" }).click();
  await expect(control).toBeVisible();
  await expectNoOverflow(page);
  await page.screenshot({
    path: "artifacts/theme/quiz-mobile.png",
    fullPage: true,
  });
  await control.focus();
  await page.keyboard.press("Home");
  await page.keyboard.press("Enter");
  await expect(control).toHaveValue("system");
  await expectTheme(page, "light");
});

test("dark home, correct and incorrect feedback, dialog, library, history and radar result pass automated WCAG AA checks", async ({
  page,
}) => {
  const session = createSession(questions, createDiagnosticConfig());
  session.answers = session.items.map((item, index) => {
    const correct = item.order.indexOf(
      questionMap.get(item.questionId)!.answer,
    );
    return index < 45 ? correct : (correct + 1) % 4;
  });
  const result = finishSession(session);
  await page.addInitScript((savedResult) => {
    localStorage.setItem("joshiki-theme", "dark");
    localStorage.setItem(
      "monosashi-v1",
      JSON.stringify({ history: [savedResult], session: null }),
    );
  }, result);
  await page.goto("/");
  const check = async () => {
    await expectTheme(page, "dark");
    expect(
      (
        await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
          .analyze()
      ).violations,
    ).toEqual([]);
  };
  await check();
  await page.screenshot({
    path: "artifacts/theme/home-desktop.png",
    fullPage: true,
  });
  await page.getByRole("button", { name: "自由練習", exact: false }).click();
  await page.getByRole("button", { name: "クイズをはじめる" }).click();
  const answerPractice = async (correct: boolean) => {
    const prompt = await page.locator(".question-panel h1").innerText();
    const question = questions.find((q) => q.prompt === prompt)!;
    const answer = correct ? question.answer : (question.answer + 1) % 4;
    await page
      .locator(".answer-option")
      .filter({
        has: page
          .locator("span:not(.answer-letter)")
          .and(page.getByText(question.choices[answer], { exact: true })),
      })
      .click();
    await page.getByRole("button", { name: "回答を確定する" }).click();
    await expect(
      page.locator(`.answer-feedback.${correct ? "positive" : "negative"}`),
    ).toBeVisible();
    await check();
    await page.screenshot({
      path: `artifacts/theme/feedback-${correct ? "correct" : "incorrect"}.png`,
      fullPage: true,
    });
  };
  await answerPractice(true);
  await page.getByRole("button", { name: "次の問題へ" }).click();
  await answerPractice(false);
  await page.getByRole("button", { name: "中断して戻る" }).click();
  await page.getByRole("button", { name: "クイズをはじめる" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await check();
  await page.screenshot({ path: "artifacts/theme/dialog.png" });
  await page.getByRole("button", { name: "キャンセル", exact: true }).click();
  await page
    .getByRole("button", { name: "問題ライブラリ", exact: true })
    .click();
  await page.getByLabel("ライブラリの出題形式").selectOption("image");
  await page
    .locator(".library-question")
    .first()
    .locator(":scope > summary")
    .click();
  const artwork = page
    .locator(".library-question")
    .first()
    .locator(".question-visual img");
  await expect(artwork).toBeVisible();
  await expect
    .poll(() =>
      artwork.evaluate(
        (image: HTMLImageElement) => image.complete && image.naturalWidth > 0,
      ),
    )
    .toBe(true);
  await expect(artwork).toHaveCSS("filter", "none");
  await check();
  await page.screenshot({
    path: "artifacts/theme/library-image.png",
    fullPage: true,
  });
  await page.getByRole("button", { name: "学習の記録", exact: true }).click();
  await check();
  await page.locator(".history-row").click();
  await expect(page.locator(".result-radar")).toBeVisible();
  await expect(page.locator(".score-number")).toHaveText("75%");
  await check();
  await page.screenshot({
    path: "artifacts/theme/result-desktop.png",
    fullPage: true,
  });
  await page.setViewportSize({ width: 360, height: 800 });
  await expectNoOverflow(page);
  await check();
  await page.screenshot({
    path: "artifacts/theme/result-mobile.png",
    fullPage: true,
  });
});
