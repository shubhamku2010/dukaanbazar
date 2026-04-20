import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import MixinObjectStorage "mo:caffeineai-object-storage/Mixin";
import Stripe "mo:caffeineai-stripe/stripe";
import OutCall "mo:caffeineai-http-outcalls/outcall";
import ShopTypes "types/shop";
import ProductTypes "types/product";
import OrderTypes "types/order";
import CommonTypes "types/common";
import ShopMixin "mixins/shop-api";
import ProductMixin "mixins/product-api";
import OrderMixin "mixins/order-api";
import ContactTypes "types/contact";
import ContactMixin "mixins/contact-api";

actor {
  // Authorization state
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Object storage
  include MixinObjectStorage();

  // Shops state
  let shops = Map.empty<Nat, ShopTypes.Shop>();
  let shopCounter : CommonTypes.Counter = { var value = 0 };

  // Products state
  let products = Map.empty<Nat, ProductTypes.Product>();
  let productCounter : CommonTypes.Counter = { var value = 0 };

  // Orders state
  let orders = Map.empty<Nat, OrderTypes.Order>();
  let orderCounter : CommonTypes.Counter = { var value = 0 };

  // Contact messages state
  let contactMessages = Map.empty<Nat, ContactTypes.ContactMessage>();
  let contactCounter : CommonTypes.Counter = { var value = 0 };

  // Stripe configuration
  var stripeConfig : ?Stripe.StripeConfiguration = null;

  // Transform function for HTTP outcalls
  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };

  // Stripe setup
  public shared ({ caller }) func setStripeConfiguration(config : Stripe.StripeConfiguration) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can configure Stripe");
    };
    stripeConfig := ?config;
  };

  public query func isStripeConfigured() : async Bool {
    stripeConfig != null;
  };

  func getStripeConfiguration() : Stripe.StripeConfiguration {
    switch (stripeConfig) {
      case (null) { Runtime.trap("Stripe needs to be first configured") };
      case (?value) { value };
    };
  };

  public func getStripeSessionStatus(sessionId : Text) : async Stripe.StripeSessionStatus {
    await Stripe.getSessionStatus(getStripeConfiguration(), sessionId, transform);
  };

  public shared ({ caller }) func createCheckoutSession(items : [Stripe.ShoppingItem], successUrl : Text, cancelUrl : Text) : async Text {
    await Stripe.createCheckoutSession(getStripeConfiguration(), caller, items, successUrl, cancelUrl, transform);
  };

  // Mixin includes
  include ShopMixin(accessControlState, shops, shopCounter);
  include ProductMixin(accessControlState, shops, products, productCounter);
  include OrderMixin(accessControlState, shops, products, orders, orderCounter, getStripeConfiguration, transform);
  include ContactMixin(contactMessages, contactCounter);
};
