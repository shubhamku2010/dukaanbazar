import { C as Category } from "./backend-B-zt_gHz.js";
const CATEGORIES = [
  { key: Category.Saree, label: "Saree", emoji: "🥻" },
  { key: Category.Kurti, label: "Kurti", emoji: "👘" },
  { key: Category.Lehenga, label: "Lehenga", emoji: "👗" },
  { key: Category.Dupatta, label: "Dupatta", emoji: "🧣" },
  { key: Category.Salwar, label: "Salwar", emoji: "👖" },
  { key: Category.Kameez, label: "Kameez", emoji: "👔" },
  { key: Category.Other, label: "Other", emoji: "✨" }
];
function getCategoryLabel(key) {
  var _a;
  return ((_a = CATEGORIES.find((c) => c.key === key)) == null ? void 0 : _a.label) ?? key;
}
function getCategoryEmoji(key) {
  var _a;
  return ((_a = CATEGORIES.find((c) => c.key === key)) == null ? void 0 : _a.emoji) ?? "✨";
}
export {
  CATEGORIES as C,
  getCategoryEmoji as a,
  getCategoryLabel as g
};
