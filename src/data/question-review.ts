import life from "./review-life.json" with { type: "json" };
import society from "./review-society.json" with { type: "json" };
import knowledge from "./review-knowledge.json" with { type: "json" };
import type { Question } from "./types";

type Revision = Pick<
  Question,
  "prompt" | "choices" | "answer" | "explanation"
> &
  Partial<Pick<Question, "source" | "topic" | "difficulty">>;
export const questionRevisions = {
  ...life.revisions,
  ...society.revisions,
  ...knowledge.revisions,
} as unknown as Record<string, Revision>;
export const reviewOriginalIds = new Set(Object.keys(questionRevisions));
export const retiredReviewIds = new Set<string>([
  ...life.retiredIds,
  ...society.retiredIds,
  ...knowledge.retiredIds,
]);
const reasoningIds = new Set<string>([
  ...life.reasoningIds,
  ...society.reasoningIds,
  ...knowledge.reasoningIds,
]);
const originals = new Map([...reviewOriginalIds].map((id) => [`${id}-r5`, id]));
export const originalReviewId = (id: string) => originals.get(id) ?? id;
export const currentReviewId = (id: string) =>
  reviewOriginalIds.has(id) ? `${id}-r5` : id;

export type QuestionKind = "knowledge" | "reasoning";
export type QuestionScope = QuestionKind | "all";
export function questionKind(question: Pick<Question, "id">): QuestionKind {
  return reasoningIds.has(originalReviewId(question.id))
    ? "reasoning"
    : "knowledge";
}
export const scopeName = (scope?: QuestionScope) =>
  scope === "knowledge"
    ? "知識"
    : scope === "reasoning"
      ? "計算・読み取り"
      : "すべての問題";
export const matchesScope = (question: Question, scope?: QuestionScope) =>
  !scope || scope === "all" || questionKind(question) === scope;
