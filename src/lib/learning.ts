import type { Question } from "../data/types";
import type { QuizItem, Result, Session } from "./quiz";

export interface QuestionProgress {
  lastSeenAt: number;
  lastSessionId: string;
  lastAnsweredAt?: number;
  correct?: boolean;
}

export type LearningProgress = Record<string, QuestionProgress>;

function validTime(value: unknown): value is number {
  return (
    typeof value === "number" &&
    Number.isFinite(value) &&
    value >= 0 &&
    Number.isFinite(new Date(value).getTime())
  );
}

function validSessionId(value: unknown): value is string {
  return typeof value === "string" && value.length > 0;
}

function validProgress(value: unknown): value is QuestionProgress {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const entry = value as QuestionProgress;
  if (!validTime(entry.lastSeenAt) || !validSessionId(entry.lastSessionId))
    return false;
  return entry.lastAnsweredAt === undefined && entry.correct === undefined
    ? true
    : validTime(entry.lastAnsweredAt) && typeof entry.correct === "boolean";
}

/** Mark a displayed question once per session, keeping its previous answer. */
export function recordExposure(
  progress: LearningProgress,
  item: QuizItem,
  sessionId: string,
  at: number,
): LearningProgress {
  if (
    !item ||
    typeof item.questionId !== "string" ||
    !item.questionId ||
    !validSessionId(sessionId) ||
    !validTime(at)
  )
    return progress;
  const previous = progress[item.questionId];
  if (
    previous &&
    (previous.lastSessionId === sessionId || previous.lastSeenAt >= at)
  )
    return progress;
  return {
    ...progress,
    [item.questionId]: {
      ...previous,
      lastSeenAt: at,
      lastSessionId: sessionId,
    },
  };
}

/** Store the latest answer using the displayed, shuffled choice position. */
export function recordAnswer(
  progress: LearningProgress,
  item: QuizItem,
  choice: number,
  bank: ReadonlyMap<string, Question>,
  sessionId: string,
  at: number,
): LearningProgress {
  const question = item && bank.get(item.questionId);
  if (
    !question ||
    !validTime(at) ||
    !validSessionId(sessionId) ||
    !Number.isInteger(choice) ||
    choice < 0 ||
    choice > 3 ||
    !Array.isArray(item.order) ||
    item.order.length !== 4 ||
    !item.order.every(Number.isInteger) ||
    [...item.order].sort().join("") !== "0123"
  )
    return progress;
  const exposed = recordExposure(progress, item, sessionId, at);
  const previous = exposed[item.questionId];
  if (previous.lastAnsweredAt !== undefined && previous.lastAnsweredAt >= at)
    return exposed;
  return {
    ...exposed,
    [item.questionId]: {
      ...previous,
      lastAnsweredAt: at,
      correct: item.order[choice] === question.answer,
    },
  };
}

/** Restore the independent learning ledger and migrate older local saves. */
export function restoreLearning(
  value: unknown,
  history: Result[],
  session: Session | null,
  activeBank: ReadonlyMap<string, Question>,
): LearningProgress {
  let progress: LearningProgress = {};
  if (value && typeof value === "object" && !Array.isArray(value)) {
    for (const [id, entry] of Object.entries(value)) {
      if (!activeBank.has(id) || !validProgress(entry)) continue;
      progress[id] = {
        lastSeenAt: entry.lastSeenAt,
        lastSessionId: entry.lastSessionId,
        ...(entry.lastAnsweredAt === undefined
          ? {}
          : { lastAnsweredAt: entry.lastAnsweredAt, correct: entry.correct }),
      };
    }
    // An explicitly saved ledger (including {}) is authoritative after a reset.
    return progress;
  }
  // Historical records have no per-question time; completion is the best known time.
  for (const result of [...history].sort(
    (a, b) => a.finishedAt - b.finishedAt,
  )) {
    if (!validTime(result.finishedAt) || !validSessionId(result.id)) continue;
    for (const [index, item] of result.items.entries()) {
      progress = recordAnswer(
        progress,
        item,
        result.answers[index],
        activeBank,
        result.id,
        result.finishedAt,
      );
    }
  }
  if (
    session &&
    validTime(session.startedAt) &&
    validSessionId(session.id) &&
    Number.isInteger(session.index) &&
    session.index >= 0 &&
    session.index < session.items.length
  ) {
    // A session stores its entire queue. Only the current and earlier items were shown.
    for (const item of session.items.slice(0, session.index + 1)) {
      if (!activeBank.has(item.questionId)) continue;
      progress = recordExposure(progress, item, session.id, session.startedAt);
    }
    for (let index = 0; index <= session.index; index++) {
      const answer = session.answers[index];
      if (answer === null) continue;
      progress = recordAnswer(
        progress,
        session.items[index],
        answer,
        activeBank,
        session.id,
        session.startedAt,
      );
    }
  }
  return progress;
}
