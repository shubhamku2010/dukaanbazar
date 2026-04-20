import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Int "mo:core/Int";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Types "../types/shop";

module {
  public func createShop(
    shops : Map.Map<Nat, Types.Shop>,
    nextId : Nat,
    caller : Principal,
    input : Types.ShopInput,
  ) : Types.Shop {
    // Ensure one shop per owner
    let existing = shops.entries().find(func((_, s)) { Principal.equal(s.ownerId, caller) });
    switch (existing) {
      case (?(_, _)) { Runtime.trap("Shop already exists for this principal") };
      case null {};
    };

    let shop : Types.Shop = {
      id = nextId;
      ownerId = caller;
      name = input.name;
      description = input.description;
      location = input.location;
      phone = input.phone;
      whatsappNumber = input.whatsappNumber;
      createdAt = Time.now();
    };
    shops.add(nextId, shop);
    shop;
  };

  public func updateShop(
    shops : Map.Map<Nat, Types.Shop>,
    caller : Principal,
    shopId : Nat,
    input : Types.ShopInput,
  ) : Types.Shop {
    let existing = switch (shops.get(shopId)) {
      case (?s) s;
      case null { Runtime.trap("Shop not found") };
    };
    if (not Principal.equal(existing.ownerId, caller)) {
      Runtime.trap("Unauthorized: Only the shop owner can update this shop");
    };
    let updated : Types.Shop = {
      existing with
      name = input.name;
      description = input.description;
      location = input.location;
      phone = input.phone;
      whatsappNumber = input.whatsappNumber;
    };
    shops.add(shopId, updated);
    updated;
  };

  public func getMyShop(
    shops : Map.Map<Nat, Types.Shop>,
    caller : Principal,
  ) : ?Types.Shop {
    let result = shops.entries().find(func((_, s)) { Principal.equal(s.ownerId, caller) });
    switch (result) {
      case (?(_, shop)) ?shop;
      case null null;
    };
  };

  public func getAllShops(shops : Map.Map<Nat, Types.Shop>) : [Types.Shop] {
    let all = shops.values().toArray();
    all.sort(func(a : Types.Shop, b : Types.Shop) : { #less; #equal; #greater } {
      Int.compare(b.createdAt, a.createdAt);
    });
  };

  public func getShopById(shops : Map.Map<Nat, Types.Shop>, shopId : Nat) : ?Types.Shop {
    shops.get(shopId);
  };
};
