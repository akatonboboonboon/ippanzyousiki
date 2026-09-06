export const CATEGORY_IDS = [
  "language",
  "geography",
  "history",
  "society",
  "science",
  "life",
  "culture",
  "information",
] as const;
export type CategoryId = (typeof CATEGORY_IDS)[number];
export type Difficulty = "easy" | "normal" | "hard";
export interface Question {
  id: string;
  category: CategoryId;
  difficulty: Difficulty;
  prompt: string;
  choices: [string, string, string, string];
  answer: number;
  explanation: string;
  source?: { label: string; url: string };
}
export const CATEGORIES: {
  id: CategoryId;
  name: string;
  short: string;
  description: string;
  color: string;
}[] = [
  {
    id: "language",
    name: "国語・ことば",
    short: "国語",
    description: "漢字、ことわざ、言葉の使い方",
    color: "#6c82b2",
  },
  {
    id: "geography",
    name: "地理・世界",
    short: "地理",
    description: "日本と世界、地形、気候",
    color: "#5a9580",
  },
  {
    id: "history",
    name: "歴史",
    short: "歴史",
    description: "時代をつくった出来事と人物",
    color: "#ba8961",
  },
  {
    id: "society",
    name: "社会・経済",
    short: "社会",
    description: "社会のしくみ、政治、経済",
    color: "#a27eac",
  },
  {
    id: "science",
    name: "科学・自然",
    short: "科学",
    description: "生き物、宇宙、身近な科学",
    color: "#5d98a7",
  },
  {
    id: "life",
    name: "生活・マナー",
    short: "生活",
    description: "暮らしの知恵、計算、マナー",
    color: "#c49a48",
  },
  {
    id: "culture",
    name: "文化・スポーツ",
    short: "文化",
    description: "芸術、伝統、スポーツ",
    color: "#bf8183",
  },
  {
    id: "information",
    name: "IT・情報",
    short: "IT",
    description: "デジタル、ネット、情報の扱い方",
    color: "#728ba4",
  },
];
export const DIFFICULTIES: {
  id: Difficulty | "mix";
  name: string;
  description: string;
}[] = [
  { id: "mix", name: "おまかせ", description: "3つの難易度をミックス" },
  { id: "easy", name: "初級", description: "まずは基本をおさらい" },
  { id: "normal", name: "中級", description: "知識をもう一歩深く" },
  { id: "hard", name: "上級", description: "自信のあるあなたに" },
];
