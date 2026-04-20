import Map "mo:core/Map";
import Array "mo:core/Array";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Types "../types/product";

module {
  public func addProduct(
    products : Map.Map<Nat, Types.Product>,
    nextId : Nat,
    _caller : Principal,
    input : Types.ProductInput,
    ownerShopId : Nat,
  ) : Types.Product {
    if (input.shopId != ownerShopId) {
      Runtime.trap("Unauthorized: shop does not belong to caller");
    };
    let product : Types.Product = {
      id = nextId;
      shopId = input.shopId;
      name = input.name;
      description = input.description;
      price = input.price;
      category = input.category;
      imageKey = input.imageKey;
      stock = input.stock;
      createdAt = Time.now();
    };
    products.add(nextId, product);
    product;
  };

  public func updateProduct(
    products : Map.Map<Nat, Types.Product>,
    _caller : Principal,
    productId : Nat,
    input : Types.ProductInput,
    ownerShopId : Nat,
  ) : Types.Product {
    let existing = switch (products.get(productId)) {
      case (?p) p;
      case null Runtime.trap("Product not found");
    };
    if (existing.shopId != ownerShopId) {
      Runtime.trap("Unauthorized: product does not belong to caller's shop");
    };
    let updated : Types.Product = {
      existing with
      name = input.name;
      description = input.description;
      price = input.price;
      category = input.category;
      imageKey = input.imageKey;
      stock = input.stock;
    };
    products.add(productId, updated);
    updated;
  };

  public func deleteProduct(
    products : Map.Map<Nat, Types.Product>,
    _caller : Principal,
    productId : Nat,
    ownerShopId : Nat,
  ) : () {
    let existing = switch (products.get(productId)) {
      case (?p) p;
      case null Runtime.trap("Product not found");
    };
    if (existing.shopId != ownerShopId) {
      Runtime.trap("Unauthorized: product does not belong to caller's shop");
    };
    products.remove(productId);
  };

  public func getShopProducts(
    products : Map.Map<Nat, Types.Product>,
    shopId : Nat,
  ) : [Types.Product] {
    products.values()
      .filter(func(p : Types.Product) : Bool { p.shopId == shopId })
      .toArray();
  };

  public func getAllProducts(products : Map.Map<Nat, Types.Product>) : [Types.Product] {
    let all = products.values().toArray();
    all.sort(func(a : Types.Product, b : Types.Product) : { #less; #equal; #greater } {
      if (a.createdAt > b.createdAt) #less
      else if (a.createdAt < b.createdAt) #greater
      else #equal
    });
  };

  public func searchProducts(
    products : Map.Map<Nat, Types.Product>,
    keyword : Text,
    category : ?Types.Category,
    minPrice : ?Nat,
    maxPrice : ?Nat,
  ) : [Types.Product] {
    let lower = keyword.toLower();
    products.values()
      .filter(func(p : Types.Product) : Bool {
        let matchesKeyword = lower.size() == 0 or
          p.name.toLower().contains(#text lower) or
          p.description.toLower().contains(#text lower);
        let matchesCategory = switch (category) {
          case null true;
          case (?cat) p.category == cat;
        };
        let matchesMin = switch (minPrice) {
          case null true;
          case (?min) p.price >= min;
        };
        let matchesMax = switch (maxPrice) {
          case null true;
          case (?max) p.price <= max;
        };
        matchesKeyword and matchesCategory and matchesMin and matchesMax
      })
      .toArray();
  };

  public func getProductById(
    products : Map.Map<Nat, Types.Product>,
    productId : Nat,
  ) : ?Types.Product {
    products.get(productId);
  };
};
