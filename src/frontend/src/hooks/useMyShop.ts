import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type { ShopInput } from "../backend";
import type { Shop } from "../types";

export function useMyShop() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Shop | null>({
    queryKey: ["my-shop"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getMyShop();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateShop() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<Shop, Error, ShopInput>({
    mutationFn: async (input) => {
      if (!actor) throw new Error("Not connected");
      return actor.createShop(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-shop"] });
      queryClient.invalidateQueries({ queryKey: ["shops"] });
    },
  });
}

export function useUpdateShop() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<Shop, Error, { shopId: bigint; input: ShopInput }>({
    mutationFn: async ({ shopId, input }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateShop(shopId, input);
    },
    onSuccess: (_, { shopId }) => {
      queryClient.invalidateQueries({ queryKey: ["my-shop"] });
      queryClient.invalidateQueries({ queryKey: ["shop", shopId.toString()] });
      queryClient.invalidateQueries({ queryKey: ["shops"] });
    },
  });
}
