import { expect, test } from "@playwright/test";
import { archivedQuestions } from "../../src/data/questions";

test("a revised bank preserves historical answers and scores, excludes retired questions from review, and retires an outdated session", async ({
  page,
}) => {
  expect(archivedQuestions.length).toBeGreaterThan(1);
  const old = [
    archivedQuestions.find((q) => q.category === "culture")!,
    archivedQuestions.find((q) => q.category === "information")!,
  ];
  const items = old.map((q) => ({ questionId: q.id, order: [3, 2, 1, 0] }));
  const answers = [
    items[0].order.indexOf(old[0].answer),
    (items[1].order.indexOf(old[1].answer) + 1) % 4,
  ];
  const startedAt = Date.now() - 1000;
  const config = {
    mode: "quiz",
    difficulty: "mix",
    categories: [...new Set(old.map((q) => q.category))],
    count: 2,
  };
  const result = {
    id: "before-revision",
    config,
    items,
    answers,
    startedAt,
    finishedAt: Date.now(),
  };
  const session = {
    ...result,
    id: "unfinished-before-revision",
    answers: [answers[0], null],
    index: 1,
  };
  await page.goto("/");
  await page.evaluate(
    (saved) => localStorage.setItem("monosashi-v1", JSON.stringify(saved)),
    { version: 1, history: [result], session },
  );
  await page.reload();
  await expect(page.getByRole("status")).toContainText(
    "古い形式のクイズは再開できなくなりました",
  );
  await expect(page.locator(".resume-banner")).toHaveCount(0);
  await page.getByRole("button", { name: "学習の記録", exact: true }).click();
  await expect(page.locator(".history-row")).toHaveCount(1);
  await expect(page.locator(".history-row")).toContainText("改訂前");
  await expect(
    page.locator(".history-stats").locator("strong").first(),
  ).toHaveText("0回");
  await expect(page.locator(".review-banner")).toContainText("0問");
  await page.locator(".history-row").click();
  await expect(page.locator(".score-panel h2")).toHaveText("改訂前のスコア");
  await expect(page.locator(".score-number")).toHaveText("50/ 100");
  await expect(page.locator(".breakdown-item")).toHaveCount(8);
  await expect(
    page.getByRole("img", { name: /ジャンル別正答率/ }),
  ).toHaveAttribute("aria-label", /文化・スポーツ/);
  await expect(
    page.getByRole("button", { name: "間違えた0問を復習" }),
  ).toBeDisabled();
  await page.locator(".review-item summary").click();
  await expect(page.locator(".review-item")).toContainText(old[1].prompt);
  await expect(page.locator(".review-body")).toContainText(
    old[1].choices[old[1].answer],
  );
  await page.getByRole("button", { name: "次のクイズを選ぶ" }).click();
  await expect(
    page.getByRole("button", { name: "24問", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator(".all-genres")).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await page.reload();
  await expect(page.getByRole("status")).toHaveCount(0);
  await page.getByRole("button", { name: "学習の記録", exact: true }).click();
  await expect(page.locator(".history-row")).toHaveCount(1);
});
