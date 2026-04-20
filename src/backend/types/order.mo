module {
  public type OrderId = Nat;

  public type OrderStatus = {
    #Pending;
    #Paid;
    #Cancelled;
  };

  public type Order = {
    id : OrderId;
    productId : Nat;
    shopId : Nat;
    buyerPrincipal : ?Principal;
    buyerName : Text;
    quantity : Nat;
    totalAmount : Nat;
    stripeSessionId : Text;
    status : OrderStatus;
    createdAt : Int;
  };

  public type OrderInput = {
    productId : Nat;
    shopId : Nat;
    buyerName : Text;
    quantity : Nat;
  };
};
