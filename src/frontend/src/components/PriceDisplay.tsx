import { cn } from "@/lib/utils";
import { formatINR } from "../utils/formatting";

interface PriceDisplayProps {
  paise: bigint;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeClasses = {
  sm: "text-sm font-medium",
  md: "text-base font-semibold",
  lg: "text-xl font-bold",
  xl: "text-3xl font-bold",
};

export default function PriceDisplay({
  paise,
  size = "md",
  className,
}: PriceDisplayProps) {
  return (
    <span
      className={cn(
        "font-display text-primary tabular-nums",
        sizeClasses[size],
        className,
      )}
    >
      {formatINR(paise)}
    </span>
  );
}
