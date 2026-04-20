import Map "mo:core/Map";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Stripe "mo:caffeineai-stripe/stripe";
import OutCall "mo:caffeineai-http-outcalls/outcall";
import AccessControl "mo:caffeineai-authorization/access-control";
import OrderLib "../lib/order";
import OrderTypes "../types/order";
import ProductTypes "../types/product";
import ShopTypes "../types/shop";
import CommonTypes "../types/common";

mixin (
  accessControlState : AccessControl.AccessControlState,
  shops : Map.Map<Nat, ShopTypes.Shop>,
  products : Map.Map<Nat, ProductTypes.Product>,
  orders : Map.Map<Nat, OrderTypes.Order>,
  orderCounter : CommonTypes.Counter,
  getStripeConfig : () -> Stripe.StripeConfiguration,
  transform : OutCall.Transform,
) {
  public shared ({ caller }) func createOrder(input : OrderTypes.OrderInput, successUrl : Text, cancelUrl : Text) : async Text {
    let product = switch (products.get(input.productId)) {
      case (?p) { p };
      case (null) { Runtime.trap("Product not found") };
    };
    let totalAmount = product.price * input.quantity;
    let item : Stripe.ShoppingItem = {
      currency = "inr";
      productName = product.name;
      productDescription = product.description;
      priceInCents = product.price;
      quantity = input.quantity;
    };
    let sessionJson = await Stripe.createCheckoutSession(
      getStripeConfig(),
      caller,
      [item],
      successUrl,
      cancelUrl,
      transform,
    );
    let sessionId = extractValue(sessionJson, "\"id\":\"");
    let maybeCaller : ?Principal = if (caller.isAnonymous()) null else ?caller;
    ignore OrderLib.createOrder(orders, orderCounter.value, maybeCaller, input, totalAmount, sessionId);
    orderCounter.value += 1;
    sessionJson;
  };

  public shared ({ caller }) func updateOrderStatus(orderId : Nat, status : OrderTypes.OrderStatus) : async OrderTypes.Order {
    OrderLib.updateOrderStatus(orders, shops, caller, orderId, status);
  };

  public query ({ caller }) func getMyOrders() : async [OrderTypes.Order] {
    OrderLib.getMyOrders(orders, caller);
  };

  // Extract the string value after a needle like `"key":"` until the next `"`
  func extractValue(json : Text, needle : Text) : Text {
    let jChars = json.toArray();
    let nChars = needle.toArray();
    let jLen = jChars.size();
    let nLen = nChars.size();
    var i = 0;
    while (i + nLen <= jLen) {
      var matched = true;
      var k = 0;
      while (k < nLen) {
        if (jChars[i + k] != nChars[k]) { matched := false };
        k += 1;
      };
      if (matched) {
        var start = i + nLen;
        var result = "";
        while (start < jLen and jChars[start] != '\"') {
          result := result # Text.fromChar(jChars[start]);
          start += 1;
        };
        return result;
      };
      i += 1;
    };
    Runtime.trap("Session id not found in Stripe JSON response");
  };
};
