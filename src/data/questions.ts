import { humanitiesQuestions } from "./humanities";
import { scienceQuestions } from "./science";
import { societyQuestions } from "./society";
export const questions = [
  ...humanitiesQuestions,
  ...scienceQuestions,
  ...societyQuestions,
];
export const questionMap = new Map(
  questions.map((question) => [question.id, question]),
);
