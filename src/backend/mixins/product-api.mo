import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import ProductLib "../lib/product";
import ProductTypes "../types/product";
import ShopTypes "../types/shop";
import CommonTypes "../types/common";

mixin (
  accessControlState : AccessControl.AccessControlState,
  shops : Map.Map<Nat, ShopTypes.Shop>,
  products : Map.Map<Nat, ProductTypes.Product>,
  productCounter : CommonTypes.Counter,
) {
  func getCallerShopId(caller : Principal) : Nat {
    let result = shops.entries().find(func((_, s) : (Nat, ShopTypes.Shop)) : Bool {
      Principal.equal(s.ownerId, caller)
    });
    switch (result) {
      case (?(_, shop)) shop.id;
      case null Runtime.trap("Unauthorized: No shop found for this account");
    };
  };

  public shared ({ caller }) func addProduct(input : ProductTypes.ProductInput) : async ProductTypes.Product {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to add a product");
    };
    let ownerShopId = getCallerShopId(caller);
    let product = ProductLib.addProduct(products, productCounter.value, caller, input, ownerShopId);
    productCounter.value += 1;
    product;
  };

  public shared ({ caller }) func updateProduct(productId : Nat, input : ProductTypes.ProductInput) : async ProductTypes.Product {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to update a product");
    };
    let ownerShopId = getCallerShopId(caller);
    ProductLib.updateProduct(products, caller, productId, input, ownerShopId);
  };

  public shared ({ caller }) func deleteProduct(productId : Nat) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to delete a product");
    };
    let ownerShopId = getCallerShopId(caller);
    ProductLib.deleteProduct(products, caller, productId, ownerShopId);
  };

  public query func getShopProducts(shopId : Nat) : async [ProductTypes.Product] {
    ProductLib.getShopProducts(products, shopId);
  };

  public query func getAllProducts() : async [ProductTypes.Product] {
    ProductLib.getAllProducts(products);
  };

  public query func searchProducts(
    keyword : Text,
    category : ?ProductTypes.Category,
    minPrice : ?Nat,
    maxPrice : ?Nat,
  ) : async [ProductTypes.Product] {
    ProductLib.searchProducts(products, keyword, category, minPrice, maxPrice);
  };

  public query func getProductById(productId : Nat) : async ?ProductTypes.Product {
    ProductLib.getProductById(products, productId);
  };
};
