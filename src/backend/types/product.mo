import Storage "mo:caffeineai-object-storage/Storage";

module {
  public type ProductId = Nat;

  public type Category = {
    #Saree;
    #Kurti;
    #Lehenga;
    #Dupatta;
    #Salwar;
    #Kameez;
    #Other;
  };

  public type Product = {
    id : ProductId;
    shopId : Nat;
    name : Text;
    description : Text;
    price : Nat;
    category : Category;
    imageKey : Storage.ExternalBlob;
    stock : Nat;
    createdAt : Int;
  };

  public type ProductInput = {
    shopId : Nat;
    name : Text;
    description : Text;
    price : Nat;
    category : Category;
    imageKey : Storage.ExternalBlob;
    stock : Nat;
  };
};
