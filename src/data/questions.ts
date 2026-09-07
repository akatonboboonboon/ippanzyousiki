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
import { toolsPackagingQuestions } from "./expansion-tools-packaging";
import { utilitiesNewsQuestions } from "./expansion-utilities-news";
import { diningQuestions } from "./expansion-dining";
import { signQuestions } from "./expansion-signs";
import { streetSymbolQuestions } from "./expansion-street-symbols";
import { floorFamilyQuestions } from "./expansion-floor-family";
import { beddingApplianceQuestions } from "./expansion-bedding-appliance";
import { settlementShoppingQuestions } from "./expansion-settlement-shopping";
import { dealQuestions } from "./expansion-deals";
import archive from "./archive-v1.json" with { type: "json" };
import type { Question } from "./types";
import {
  choiceRevisions,
  currentChoiceId,
  revisedOriginalIds,
} from "./choice-revisions";
export const publishedQuestions: Question[] = [
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
export const revisedQuestions: Question[] = publishedQuestions.map(
  (question) =>
    revisedOriginalIds.has(question.id)
      ? {
          ...question,
          ...choiceRevisions[question.id],
          id: currentChoiceId(question.id),
        }
      : question,
);
export const dailyQuestions: Question[] = [
  ...toolsPackagingQuestions,
  ...utilitiesNewsQuestions,
  ...diningQuestions,
  ...dealQuestions,
  ...signQuestions,
];
export const dailyEditionQuestions: Question[] = [
  ...revisedQuestions,
  ...dailyQuestions,
];
export const sceneQuestions: Question[] = [
  ...streetSymbolQuestions,
  ...floorFamilyQuestions,
  ...beddingApplianceQuestions,
  ...settlementShoppingQuestions,
];
export const questions: Question[] = [
  ...dailyEditionQuestions,
  ...sceneQuestions,
];
export const archivedQuestions: Question[] = [
  ...(archive as Question[]),
  ...publishedQuestions.filter((question) =>
    revisedOriginalIds.has(question.id),
  ),
];
export const activeQuestionIds = new Set(questions.map((q) => q.id));
export const questionMap = new Map(
  [...archivedQuestions, ...questions].map((q) => [q.id, q]),
);
