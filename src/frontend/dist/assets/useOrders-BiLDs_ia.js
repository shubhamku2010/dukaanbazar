import "./index-DuMvlbDW.js";
import { u as useActor, a as useQuery, c as createActor } from "./backend-B-zt_gHz.js";
function useMyOrders() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["my-orders"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyOrders();
    },
    enabled: !!actor && !isFetching
  });
}
export {
  useMyOrders as u
};
