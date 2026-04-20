import Map "mo:core/Map";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Types "../types/order";
import ShopTypes "../types/shop";

module {
  public func createOrder(
    orders : Map.Map<Nat, Types.Order>,
    nextId : Nat,
    caller : ?Principal,
    input : Types.OrderInput,
    totalAmount : Nat,
    stripeSessionId : Text,
  ) : Types.Order {
    let order : Types.Order = {
      id = nextId;
      productId = input.productId;
      shopId = input.shopId;
      buyerPrincipal = caller;
      buyerName = input.buyerName;
      quantity = input.quantity;
      totalAmount;
      stripeSessionId;
      status = #Pending;
      createdAt = Time.now();
    };
    orders.add(nextId, order);
    order;
  };

  public func updateOrderStatus(
    orders : Map.Map<Nat, Types.Order>,
    shops : Map.Map<Nat, ShopTypes.Shop>,
    caller : Principal,
    orderId : Nat,
    status : Types.OrderStatus,
  ) : Types.Order {
    let order = switch (orders.get(orderId)) {
      case (?o) { o };
      case (null) { Runtime.trap("Order not found") };
    };
    let shop = switch (shops.get(order.shopId)) {
      case (?s) { s };
      case (null) { Runtime.trap("Shop not found") };
    };
    if (not (shop.ownerId == caller)) {
      Runtime.trap("Unauthorized: Only the shop owner can update order status");
    };
    let updated : Types.Order = { order with status };
    orders.add(orderId, updated);
    updated;
  };

  public func getMyOrders(
    orders : Map.Map<Nat, Types.Order>,
    caller : Principal,
  ) : [Types.Order] {
    orders.values()
      .filter(func(o : Types.Order) : Bool {
        switch (o.buyerPrincipal) {
          case (?p) { p == caller };
          case (null) { false };
        };
      })
      .toArray();
  };
};
