import target from "./knowledge-revisions-target.json" with { type: "json" };
import life from "./knowledge-revisions-life.json" with { type: "json" };
import society from "./knowledge-revisions-society.json" with { type: "json" };
import knowledge from "./knowledge-revisions-knowledge.json" with { type: "json" };
import type { Question } from "./types";

type KnowledgeRevision = Pick<
  Question,
  "prompt" | "choices" | "answer" | "explanation"
> &
  Partial<Pick<Question, "source" | "topic">>;
export const knowledgeRevisions = {
  ...target,
  ...life,
  ...society,
  ...knowledge,
} as unknown as Record<string, KnowledgeRevision>;
export const knowledgeOriginalIds = new Set(Object.keys(knowledgeRevisions));
const originals = new Map(
  [...knowledgeOriginalIds].map((id) => [`${id}-r4`, id]),
);
export function currentKnowledgeId(id: string): string {
  return knowledgeOriginalIds.has(id) ? `${id}-r4` : id;
}
export function originalKnowledgeId(id: string): string {
  return originals.get(id) ?? id;
}
