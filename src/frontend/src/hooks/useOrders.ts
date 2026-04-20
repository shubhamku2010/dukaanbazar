import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type { OrderInput, OrderStatus } from "../backend";
import type { Order } from "../types";

export function useMyOrders() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Order[]>({
    queryKey: ["my-orders"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyOrders();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateOrder() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<
    string,
    Error,
    { input: OrderInput; successUrl: string; cancelUrl: string }
  >({
    mutationFn: async ({ input, successUrl, cancelUrl }) => {
      if (!actor) throw new Error("Not connected");
      return actor.createOrder(input, successUrl, cancelUrl);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-orders"] });
    },
  });
}

export function useUpdateOrderStatus() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<Order, Error, { orderId: bigint; status: OrderStatus }>({
    mutationFn: async ({ orderId, status }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateOrderStatus(orderId, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-orders"] });
    },
  });
}
