import { Card } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import { MapPin, Package } from "lucide-react";
import type { Shop } from "../types";

interface ShopCardProps {
  shop: Shop;
  productCount?: number;
  index?: number;
}

const shopColors = [
  "bg-primary/10 text-primary",
  "bg-accent/20 text-accent-foreground",
  "bg-secondary text-secondary-foreground",
];

export default function ShopCard({
  shop,
  productCount,
  index = 0,
}: ShopCardProps) {
  const initials = shop.name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
  const colorClass = shopColors[index % shopColors.length];

  return (
    <Link
      to="/shops/$shopId"
      params={{ shopId: shop.id.toString() }}
      data-ocid={`shop.item.${index + 1}`}
    >
      <Card className="group p-4 border border-border hover:border-primary/40 hover:shadow-md transition-all duration-200 bg-card cursor-pointer h-full flex flex-col gap-3">
        {/* Header */}
        <div className="flex items-start gap-3">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center font-display font-bold text-lg flex-shrink-0 ${colorClass}`}
          >
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-display text-base font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
              {shop.name}
            </h3>
            {shop.location && (
              <div className="flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                <span className="text-xs text-muted-foreground truncate">
                  {shop.location}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        {shop.description && (
          <p className="text-xs text-muted-foreground line-clamp-2 flex-1">
            {shop.description}
          </p>
        )}

        {/* Footer */}
        {productCount !== undefined && (
          <div className="flex items-center gap-1 mt-auto pt-2 border-t border-border">
            <Package className="w-3 h-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              {productCount} products
            </span>
          </div>
        )}
      </Card>
    </Link>
  );
}
