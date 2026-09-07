import life from "./editorial-revisions-life.json" with { type: "json" };
import society from "./editorial-revisions-society.json" with { type: "json" };
import knowledge from "./editorial-revisions-knowledge.json" with { type: "json" };
import type { Question } from "./types";

export type EditorialRevision = Pick<
  Question,
  "prompt" | "choices" | "answer" | "explanation"
> &
  Partial<Pick<Question, "source">>;

// Keep published wording and shuffled-answer positions available to saved records.
export const editorialRevisions = {
  ...life,
  ...society,
  ...knowledge,
} as unknown as Record<string, EditorialRevision>;
export const editorialOriginalIds = new Set(Object.keys(editorialRevisions));
const originalByRevision = new Map(
  [...editorialOriginalIds].map((id) => [`${id}-r3`, id]),
);
export function originalEditorialId(id: string): string {
  return originalByRevision.get(id) ?? id;
}
export function currentEditorialId(id: string): string {
  return editorialOriginalIds.has(id) ? `${id}-r3` : id;
}
