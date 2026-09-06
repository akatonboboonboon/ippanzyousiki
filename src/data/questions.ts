import { practicalLifeQuestions } from "./practical-life";
import { practicalCommunicationQuestions } from "./practical-communication";
import { practicalSocietyQuestions } from "./practical-society";
import { practicalWorldQuestions } from "./practical-world";
import archive from "./archive-v1.json" with { type: "json" };
import type { Question } from "./types";
export const questions: Question[] = [
  ...practicalLifeQuestions,
  ...practicalCommunicationQuestions,
  ...practicalSocietyQuestions,
  ...practicalWorldQuestions,
];
export const archivedQuestions = archive as Question[];
export const activeQuestionIds = new Set(questions.map((q) => q.id));
export const questionMap = new Map(
  [...archivedQuestions, ...questions].map((q) => [q.id, q]),
);
