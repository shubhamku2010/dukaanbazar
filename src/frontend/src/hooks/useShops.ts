import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { createActor } from "../backend";
import type { Shop } from "../types";

export function useShops() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Shop[]>({
    queryKey: ["shops"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllShops();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useShop(shopId: bigint | undefined) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Shop | null>({
    queryKey: ["shop", shopId?.toString()],
    queryFn: async () => {
      if (!actor || shopId === undefined) return null;
      return actor.getShopById(shopId);
    },
    enabled: !!actor && !isFetching && shopId !== undefined,
  });
}
