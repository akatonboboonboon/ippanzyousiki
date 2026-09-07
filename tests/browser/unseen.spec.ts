import { expect, test, type Page } from "@playwright/test";
import { questions, questionMap } from "../../src/data/questions";
import { CATEGORIES } from "../../src/data/types";
import type { Result, Session } from "../../src/lib/quiz";

type Learning = Record<
  string,
  {
    lastSeenAt: number;
    lastSessionId: string;
    lastAnsweredAt?: number;
    correct?: boolean;
  }
>;
interface Stored {
  history: Result[];
  session: Session | null;
  learning: Learning;
}

async function stored(page: Page): Promise<Stored> {
  return page.evaluate(() =>
    JSON.parse(localStorage.getItem("monosashi-v1") ?? "{}"),
  );
}

async function seed(page: Page, value: Stored) {
  await page.goto("/");
  await page.evaluate(
    (value) => localStorage.setItem("monosashi-v1", JSON.stringify(value)),
    value,
  );
  await page.reload();
  await expect(page.locator(".challenge-modes")).toBeVisible();
}

async function chooseHouseholdEasy(page: Page) {
  await page.getByRole("button", { name: "自由練習", exact: false }).click();
  await page.getByRole("button", { name: /^初級/ }).click();
  await page
    .getByRole("button", { name: "すべてのジャンル", exact: true })
    .click();
  for (const category of CATEGORIES.filter((c) => c.id !== "household")) {
    await page
      .locator(".genre-options")
      .getByRole("button", { name: category.name, exact: true })
      .click();
  }
  await page.getByRole("button", { name: "12問", exact: true }).click();
}

function oneQuestionSession(id: string): Session {
  const question = questionMap.get(id)!;
  return {
    id: "unseen-browser-session",
    config: {
      mode: "quiz",
      categories: [question.category],
      difficulty: question.difficulty,
      count: 1,
    },
    items: [{ questionId: id, order: [2, 0, 3, 1] }],
    answers: [null],
    index: 0,
    startedAt: Date.now() - 1000,
  };
}

test("practice selects all remaining unseen questions and records only displayed items through resume and replacement", async ({
  page,
}) => {
  const unseen = questions
    .filter((q) => q.category === "household" && q.difficulty === "easy")
    .slice(0, 12);
  const unseenIds = new Set(unseen.map((q) => q.id));
  const previousTime = Date.now() - 86400000;
  const learning: Learning = Object.fromEntries(
    questions
      .filter((q) => !unseenIds.has(q.id))
      .map((q) => [
        q.id,
        {
          lastSeenAt: previousTime,
          lastSessionId: "previous-completed-session",
          lastAnsweredAt: previousTime,
          correct: true,
        },
      ]),
  );
  await seed(page, { history: [], session: null, learning });
  await chooseHouseholdEasy(page);
  await page.getByRole("button", { name: "クイズをはじめる" }).click();
  await expect(page.locator(".question-panel h1")).toBeVisible();
  await expect
    .poll(async () => Object.keys((await stored(page)).learning).length)
    .toBe(Object.keys(learning).length + 1);
  const first = await stored(page);
  expect(first.session!.config).toMatchObject({
    categories: ["household"],
    difficulty: "easy",
    count: 12,
  });
  expect(first.session!.items.map((item) => item.questionId).sort()).toEqual(
    [...unseenIds].sort(),
  );
  const firstId = first.session!.items[0].questionId;
  expect(first.learning[firstId]).toMatchObject({
    lastSessionId: first.session!.id,
  });
  expect(first.learning[firstId].correct).toBeUndefined();
  for (const id of unseenIds) {
    if (id !== firstId) expect(first.learning[id]).toBeUndefined();
  }

  await page.reload();
  await expect(page.locator(".resume-banner")).toContainText("0 / 12問");
  expect((await stored(page)).learning).toEqual(first.learning);
  await page.getByRole("button", { name: "クイズを再開" }).click();
  await expect(page.locator(".question-panel h1")).toHaveText(
    questionMap.get(firstId)!.prompt,
  );
  expect((await stored(page)).session).toEqual(first.session);
  expect((await stored(page)).learning).toEqual(first.learning);

  await page.getByRole("button", { name: "中断して戻る" }).click();
  await chooseHouseholdEasy(page);
  await page.getByRole("button", { name: "クイズをはじめる" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  expect((await stored(page)).learning).toEqual(first.learning);
  await page
    .getByRole("button", { name: "新しくはじめる", exact: true })
    .click();
  await expect
    .poll(async () => (await stored(page)).session?.id)
    .not.toBe(first.session!.id);
  const replacementSession = (await stored(page)).session!;
  const replacementFirstId = replacementSession.items[0].questionId;
  await expect
    .poll(
      async () =>
        (await stored(page)).learning[replacementFirstId]?.lastSessionId,
    )
    .toBe(replacementSession.id);
  const replacement = await stored(page);
  const changed = Object.keys({
    ...first.learning,
    ...replacement.learning,
  }).filter(
    (id) =>
      JSON.stringify(first.learning[id]) !==
      JSON.stringify(replacement.learning[id]),
  );
  expect(changed).toEqual([replacementFirstId]);
  expect(replacement.learning[replacementFirstId].lastSessionId).toBe(
    replacement.session!.id,
  );
  for (const id of unseenIds) {
    if (id !== firstId && id !== replacementFirstId)
      expect(replacement.learning[id]).toBeUndefined();
  }
});

test("a confirmed mistake becomes correct after answering its review question", async ({
  page,
}) => {
  const question = questions[0];
  const session = oneQuestionSession(question.id);
  await seed(page, { history: [], session, learning: {} });
  await page.getByRole("button", { name: "クイズを再開" }).click();
  await page
    .locator(".answer-option")
    .nth(session.items[0].order.indexOf((question.answer + 1) % 4))
    .click();
  await page.getByRole("button", { name: "回答を確定する" }).click();
  await expect
    .poll(async () => (await stored(page)).learning[question.id]?.correct)
    .toBe(false);
  const wrong = (await stored(page)).learning[question.id];
  expect(wrong.lastAnsweredAt).toBeGreaterThanOrEqual(session.startedAt);
  await page.getByRole("button", { name: "結果を見る", exact: true }).click();
  await page
    .getByRole("button", { name: "間違えた1問を復習", exact: true })
    .click();
  await expect(page.locator(".quiz-toolbar")).toContainText("復習");
  await page
    .locator(".answer-option")
    .filter({
      has: page
        .locator("span:not(.answer-letter)")
        .and(
          page.getByText(question.choices[question.answer], { exact: true }),
        ),
    })
    .click();
  await page.getByRole("button", { name: "回答を確定する" }).click();
  await expect
    .poll(async () => (await stored(page)).learning[question.id]?.correct)
    .toBe(true);
  const corrected = await stored(page);
  expect(corrected.learning[question.id].lastAnsweredAt).toBeGreaterThanOrEqual(
    wrong.lastAnsweredAt!,
  );
  expect(corrected.learning[question.id].lastSessionId).toBe(
    corrected.session!.id,
  );
  await page.getByRole("button", { name: "結果を見る", exact: true }).click();
  await expect(page.locator(".score-number")).toHaveText("100%");
  await page.getByRole("button", { name: "学習の記録", exact: true }).click();
  await expect(page.locator(".review-banner")).toContainText("0問");
});

test("learning can be cleared without completed history while the unfinished session remains and deletion survives reload", async ({
  page,
}) => {
  const session = oneQuestionSession(questions[1].id);
  const previousTime = Date.now() - 10000;
  await seed(page, {
    history: [],
    session,
    learning: {
      [questions[0].id]: {
        lastSeenAt: previousTime,
        lastSessionId: "previous-interrupted-session",
        lastAnsweredAt: previousTime,
        correct: false,
      },
    },
  });
  await page.getByRole("button", { name: "学習の記録", exact: true }).click();
  await expect(page.locator(".history-row")).toHaveCount(0);
  await page
    .getByRole("button", { name: "学習履歴を削除", exact: true })
    .click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page
    .getByRole("button", { name: "記録を削除する", exact: true })
    .click();
  await expect.poll(async () => (await stored(page)).learning).toEqual({});
  expect((await stored(page)).history).toEqual([]);
  expect((await stored(page)).session).toEqual(session);
  await page.reload();
  await expect(page.locator(".resume-banner")).toContainText("0 / 1問");
  expect((await stored(page)).learning).toEqual({});
  expect((await stored(page)).history).toEqual([]);
  expect((await stored(page)).session).toEqual(session);
});
