import "./index-DuMvlbDW.js";
import { u as useActor, a as useQuery, c as createActor } from "./backend-B-zt_gHz.js";
function useShops() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["shops"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllShops();
    },
    enabled: !!actor && !isFetching
  });
}
function useShop(shopId) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["shop", shopId == null ? void 0 : shopId.toString()],
    queryFn: async () => {
      if (!actor || shopId === void 0) return null;
      return actor.getShopById(shopId);
    },
    enabled: !!actor && !isFetching && shopId !== void 0
  });
}
export {
  useShop as a,
  useShops as u
};
