import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { createActor } from "../backend";
import type { Category } from "../backend";
import type { Product } from "../types";

export function useProducts() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllProducts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useProduct(productId: bigint | undefined) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Product | null>({
    queryKey: ["product", productId?.toString()],
    queryFn: async () => {
      if (!actor || productId === undefined) return null;
      return actor.getProductById(productId);
    },
    enabled: !!actor && !isFetching && productId !== undefined,
  });
}

export function useSearchProducts(
  keyword: string,
  category: Category | null,
  minPrice: bigint | null,
  maxPrice: bigint | null,
) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Product[]>({
    queryKey: [
      "products",
      "search",
      keyword,
      category,
      minPrice?.toString(),
      maxPrice?.toString(),
    ],
    queryFn: async () => {
      if (!actor) return [];
      return actor.searchProducts(keyword, category, minPrice, maxPrice);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useShopProducts(shopId: bigint | undefined) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Product[]>({
    queryKey: ["shop-products", shopId?.toString()],
    queryFn: async () => {
      if (!actor || shopId === undefined) return [];
      return actor.getShopProducts(shopId);
    },
    enabled: !!actor && !isFetching && shopId !== undefined,
  });
}
