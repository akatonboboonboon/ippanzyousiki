export const CATEGORY_IDS = [
  "household",
  "health",
  "money",
  "consumer",
  "work",
  "manners",
  "public",
  "safety",
  "digital",
  "civic",
  "culture",
  "world",
] as const;
export const LEGACY_CATEGORY_IDS = [
  "language",
  "geography",
  "history",
  "society",
  "science",
  "life",
  "culture",
  "information",
] as const;
export type ActiveCategoryId = (typeof CATEGORY_IDS)[number];
export type CategoryId =
  ActiveCategoryId | (typeof LEGACY_CATEGORY_IDS)[number];
export type Difficulty = "easy" | "normal" | "hard";
export interface Question {
  id: string;
  category: CategoryId;
  difficulty: Difficulty;
  prompt: string;
  choices: [string, string, string, string];
  answer: number;
  explanation: string;
  image?: { src: string; alt: string; caption?: string };
  topic?: string;
  source?: { label: string; url: string };
}
export interface Category {
  id: CategoryId;
  name: string;
  short: string;
  description: string;
  color: string;
}
export const CATEGORIES: Category[] = [
  {
    id: "household",
    name: "家事・暮らし",
    short: "家事",
    description: "洗濯、掃除、住まい、ごみ、道具",
    color: "#628d7b",
  },
  {
    id: "health",
    name: "食と健康",
    short: "食・健康",
    description: "料理、食品表示、保存、衛生、健康",
    color: "#b47f61",
  },
  {
    id: "money",
    name: "お金・家計",
    short: "お金",
    description: "家計、支払い、銀行、保険、税の基本",
    color: "#ae8b38",
  },
  {
    id: "consumer",
    name: "買い物・契約",
    short: "買い物",
    description: "価格表示、通販、契約、消費者相談",
    color: "#a17f9c",
  },
  {
    id: "work",
    name: "仕事・連絡",
    short: "仕事",
    description: "電話、メール、敬語、文書、予定",
    color: "#6c82b2",
  },
  {
    id: "manners",
    name: "マナー・慣習",
    short: "慣習",
    description: "訪問、贈答、冠婚葬祭、季節の行事",
    color: "#b6787c",
  },
  {
    id: "public",
    name: "交通・公共",
    short: "交通",
    description: "道路、乗り物、施設、郵便、旅",
    color: "#5c91a3",
  },
  {
    id: "safety",
    name: "防災・安全",
    short: "防災",
    description: "備え、避難、防犯、緊急時の対応",
    color: "#a27b55",
  },
  {
    id: "digital",
    name: "ネット・情報",
    short: "ネット",
    description: "スマホ、情報の確かめ方、個人情報",
    color: "#788cab",
  },
  {
    id: "civic",
    name: "社会・手続き",
    short: "社会",
    description: "役所、社会保障、働く権利、社会のしくみ",
    color: "#8b83a6",
  },
  {
    id: "culture",
    name: "ことば・教養",
    short: "ことば",
    description: "身近な言葉、表示、音楽、スポーツ",
    color: "#aa8364",
  },
  {
    id: "world",
    name: "身近な科学・世界",
    short: "科学・世界",
    description: "自然、天気、地図、日本と世界の基本",
    color: "#629c92",
  },
];
export const LEGACY_CATEGORIES: {
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

export const ALL_CATEGORIES = [
  ...CATEGORIES,
  ...LEGACY_CATEGORIES.filter(
    (c) => !CATEGORY_IDS.includes(c.id as ActiveCategoryId),
  ),
];
export const categoryFor = (id: CategoryId, legacy = false) =>
  (legacy ? LEGACY_CATEGORIES : ALL_CATEGORIES).find((c) => c.id === id)!;
export const DIFFICULTIES: {
  id: Difficulty | "mix";
  name: string;
  description: string;
}[] = [
  { id: "mix", name: "おまかせ", description: "3つの難易度をミックス" },
  { id: "easy", name: "初級", description: "まずは基本をおさらい" },
  { id: "normal", name: "中級", description: "意味や使い方を確認" },
  { id: "hard", name: "上級", description: "基礎知識を使って判断" },
];
