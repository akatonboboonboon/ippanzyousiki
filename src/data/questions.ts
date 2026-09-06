import { practicalLifeQuestions } from "./practical-life";
import { practicalCommunicationQuestions } from "./practical-communication";
import { practicalSocietyQuestions } from "./practical-society";
import { practicalWorldQuestions } from "./practical-world";
import { visualQuestions } from "./visual-questions";
import { lifeExpansionQuestions } from "./life-expansion";
import { expansionLifeWorldQuestions } from "./expansion-life-world";
import { expansionSocietyDigitalQuestions } from "./expansion-society-digital";
import { expansionCommunicationQuestions } from "./expansion-communication";
import { cookingUvQuestions } from "./expansion-cooking-uv";
import { deliveryLostQuestions } from "./expansion-delivery-lost";
import { carHomeQuestions } from "./expansion-car-home";
import { rentLabelQuestions } from "./expansion-rent-label";
import { recycleBatteryQuestions } from "./expansion-recycle-battery";
import { bicycleFamiliarQuestions } from "./expansion-bicycle-familiar";
import archive from "./archive-v1.json" with { type: "json" };
import type { Question } from "./types";
export const questions: Question[] = [
  ...practicalLifeQuestions,
  ...practicalCommunicationQuestions,
  ...practicalSocietyQuestions,
  ...practicalWorldQuestions,
  ...visualQuestions,
  ...lifeExpansionQuestions,
  ...expansionLifeWorldQuestions,
  ...expansionSocietyDigitalQuestions,
  ...expansionCommunicationQuestions,
  ...cookingUvQuestions,
  ...deliveryLostQuestions,
  ...carHomeQuestions,
  ...rentLabelQuestions,
  ...recycleBatteryQuestions,
  ...bicycleFamiliarQuestions,
];
export const archivedQuestions = archive as Question[];
export const activeQuestionIds = new Set(questions.map((q) => q.id));
export const questionMap = new Map(
  [...archivedQuestions, ...questions].map((q) => [q.id, q]),
);
