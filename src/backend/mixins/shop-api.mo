import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import ShopLib "../lib/shop";
import ShopTypes "../types/shop";
import CommonTypes "../types/common";

mixin (
  accessControlState : AccessControl.AccessControlState,
  shops : Map.Map<Nat, ShopTypes.Shop>,
  shopCounter : CommonTypes.Counter,
) {
  public shared ({ caller }) func createShop(input : ShopTypes.ShopInput) : async ShopTypes.Shop {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to create a shop");
    };
    let shop = ShopLib.createShop(shops, shopCounter.value, caller, input);
    shopCounter.value += 1;
    shop;
  };

  public shared ({ caller }) func updateShop(shopId : Nat, input : ShopTypes.ShopInput) : async ShopTypes.Shop {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to update a shop");
    };
    ShopLib.updateShop(shops, caller, shopId, input);
  };

  public query ({ caller }) func getMyShop() : async ?ShopTypes.Shop {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to get your shop");
    };
    ShopLib.getMyShop(shops, caller);
  };

  public query func getAllShops() : async [ShopTypes.Shop] {
    ShopLib.getAllShops(shops);
  };

  public query func getShopById(shopId : Nat) : async ?ShopTypes.Shop {
    ShopLib.getShopById(shops, shopId);
  };
};
