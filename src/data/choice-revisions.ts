import life from "./choice-revisions-life.json" with { type: "json" };
import society from "./choice-revisions-society.json" with { type: "json" };
import knowledge from "./choice-revisions-knowledge.json" with { type: "json" };
import type { Question } from "./types";

export interface ChoiceRevision {
  choices: Question["choices"];
  prompt?: string;
  explanation?: string;
}

// Published choices stay under their original IDs for saved answers and older diagnostics.
export const choiceRevisions = {
  ...life,
  ...society,
  ...knowledge,
} as unknown as Record<string, ChoiceRevision>;
export const revisedOriginalIds = new Set(Object.keys(choiceRevisions));
const originalByRevision = new Map(
  [...revisedOriginalIds].map((id) => [`${id}-r2`, id]),
);
export function originalChoiceId(id: string): string {
  return originalByRevision.get(id) ?? id;
}
export function currentChoiceId(id: string): string {
  return revisedOriginalIds.has(id) ? `${id}-r2` : id;
}
