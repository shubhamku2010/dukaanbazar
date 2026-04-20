import { j as jsxRuntimeExports, f as cn } from "./index-DuMvlbDW.js";
import { B as Badge } from "./badge-CEcpm3IJ.js";
import { g as getCategoryLabel, a as getCategoryEmoji } from "./categories-3x0Ar9Yi.js";
import { f as formatINR } from "./formatting-RrZxb8cP.js";
const categoryColorMap = {
  Saree: "bg-accent/20 text-accent-foreground border-accent/30",
  Kurti: "bg-primary/15 text-primary border-primary/30",
  Lehenga: "bg-secondary text-secondary-foreground border-border",
  Dupatta: "bg-accent/30 text-accent-foreground border-accent/40",
  Salwar: "bg-primary/10 text-primary border-primary/20",
  Kameez: "bg-muted text-muted-foreground border-border",
  Other: "bg-muted text-muted-foreground border-border"
};
function CategoryBadge({
  category,
  size = "sm",
  className
}) {
  const colorClass = categoryColorMap[category] ?? "bg-muted text-muted-foreground border-border";
  const label = getCategoryLabel(category);
  const emoji = getCategoryEmoji(category);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Badge,
    {
      variant: "outline",
      className: cn(
        "font-body font-medium border",
        size === "sm" ? "text-xs px-2 py-0.5" : "text-sm px-2.5 py-1",
        colorClass,
        className
      ),
      children: [
        emoji,
        " ",
        label
      ]
    }
  );
}
const sizeClasses = {
  sm: "text-sm font-medium",
  md: "text-base font-semibold",
  lg: "text-xl font-bold",
  xl: "text-3xl font-bold"
};
function PriceDisplay({
  paise,
  size = "md",
  className
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: cn(
        "font-display text-primary tabular-nums",
        sizeClasses[size],
        className
      ),
      children: formatINR(paise)
    }
  );
}
export {
  CategoryBadge as C,
  PriceDisplay as P
};
