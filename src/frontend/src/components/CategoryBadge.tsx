import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Category } from "../backend";
import { getCategoryEmoji, getCategoryLabel } from "../utils/categories";

interface CategoryBadgeProps {
  category: Category;
  size?: "sm" | "md";
  className?: string;
}

const categoryColorMap: Record<string, string> = {
  Saree: "bg-accent/20 text-accent-foreground border-accent/30",
  Kurti: "bg-primary/15 text-primary border-primary/30",
  Lehenga: "bg-secondary text-secondary-foreground border-border",
  Dupatta: "bg-accent/30 text-accent-foreground border-accent/40",
  Salwar: "bg-primary/10 text-primary border-primary/20",
  Kameez: "bg-muted text-muted-foreground border-border",
  Other: "bg-muted text-muted-foreground border-border",
};

export default function CategoryBadge({
  category,
  size = "sm",
  className,
}: CategoryBadgeProps) {
  const colorClass =
    categoryColorMap[category] ??
    "bg-muted text-muted-foreground border-border";
  const label = getCategoryLabel(category);
  const emoji = getCategoryEmoji(category);

  return (
    <Badge
      variant="outline"
      className={cn(
        "font-body font-medium border",
        size === "sm" ? "text-xs px-2 py-0.5" : "text-sm px-2.5 py-1",
        colorClass,
        className,
      )}
    >
      {emoji} {label}
    </Badge>
  );
}
