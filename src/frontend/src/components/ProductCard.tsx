import { Card } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import { Store } from "lucide-react";
import type { Product } from "../types";
import CategoryBadge from "./CategoryBadge";
import PriceDisplay from "./PriceDisplay";

interface ProductCardProps {
  product: Product;
  shopName?: string;
  index?: number;
}

export default function ProductCard({
  product,
  shopName,
  index = 0,
}: ProductCardProps) {
  const imageUrl = product.imageKey.getDirectURL();

  return (
    <Link
      to="/products/$productId"
      params={{ productId: product.id.toString() }}
      data-ocid={`product.item.${index + 1}`}
    >
      <Card className="group overflow-hidden border border-border hover:border-primary/40 hover:shadow-md transition-all duration-200 bg-card cursor-pointer h-full flex flex-col">
        {/* Image */}
        <div className="relative aspect-[3/4] overflow-hidden bg-muted">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-muted">
              <span className="text-4xl">🥻</span>
            </div>
          )}
          <div className="absolute top-2 left-2">
            <CategoryBadge category={product.category} size="sm" />
          </div>
        </div>

        {/* Info */}
        <div className="p-3 flex flex-col gap-1.5 flex-1">
          <h3 className="font-display text-sm font-semibold text-foreground line-clamp-2 leading-snug">
            {product.name}
          </h3>
          <PriceDisplay paise={product.price} size="md" />
          {shopName && (
            <div className="flex items-center gap-1 mt-auto pt-1">
              <Store className="w-3 h-3 text-muted-foreground flex-shrink-0" />
              <span className="text-xs text-muted-foreground truncate">
                {shopName}
              </span>
            </div>
          )}
        </div>
      </Card>
    </Link>
  );
}
