import { Category } from "../backend";
import type { CategoryMeta } from "../types";

export { Category };

export const CATEGORIES: CategoryMeta[] = [
  { key: Category.Saree, label: "Saree", emoji: "🥻" },
  { key: Category.Kurti, label: "Kurti", emoji: "👘" },
  { key: Category.Lehenga, label: "Lehenga", emoji: "👗" },
  { key: Category.Dupatta, label: "Dupatta", emoji: "🧣" },
  { key: Category.Salwar, label: "Salwar", emoji: "👖" },
  { key: Category.Kameez, label: "Kameez", emoji: "👔" },
  { key: Category.Other, label: "Other", emoji: "✨" },
];

export function getCategoryLabel(key: Category): string {
  return CATEGORIES.find((c) => c.key === key)?.label ?? key;
}

export function getCategoryEmoji(key: Category): string {
  return CATEGORIES.find((c) => c.key === key)?.emoji ?? "✨";
}
