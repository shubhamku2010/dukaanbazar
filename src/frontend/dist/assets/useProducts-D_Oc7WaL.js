import "./index-DuMvlbDW.js";
import { u as useActor, a as useQuery, c as createActor } from "./backend-B-zt_gHz.js";
function useProducts() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllProducts();
    },
    enabled: !!actor && !isFetching
  });
}
function useProduct(productId) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["product", productId == null ? void 0 : productId.toString()],
    queryFn: async () => {
      if (!actor || productId === void 0) return null;
      return actor.getProductById(productId);
    },
    enabled: !!actor && !isFetching && productId !== void 0
  });
}
function useSearchProducts(keyword, category, minPrice, maxPrice) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: [
      "products",
      "search",
      keyword,
      category,
      minPrice == null ? void 0 : minPrice.toString(),
      maxPrice == null ? void 0 : maxPrice.toString()
    ],
    queryFn: async () => {
      if (!actor) return [];
      return actor.searchProducts(keyword, category, minPrice, maxPrice);
    },
    enabled: !!actor && !isFetching
  });
}
function useShopProducts(shopId) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["shop-products", shopId == null ? void 0 : shopId.toString()],
    queryFn: async () => {
      if (!actor || shopId === void 0) return [];
      return actor.getShopProducts(shopId);
    },
    enabled: !!actor && !isFetching && shopId !== void 0
  });
}
export {
  useSearchProducts as a,
  useShopProducts as b,
  useProduct as c,
  useProducts as u
};
