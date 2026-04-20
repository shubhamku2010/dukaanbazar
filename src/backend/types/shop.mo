module {
  public type ShopId = Nat;

  public type Shop = {
    id : ShopId;
    ownerId : Principal;
    name : Text;
    description : Text;
    location : Text;
    phone : Text;
    whatsappNumber : Text;
    createdAt : Int;
  };

  public type ShopInput = {
    name : Text;
    description : Text;
    location : Text;
    phone : Text;
    whatsappNumber : Text;
  };
};
