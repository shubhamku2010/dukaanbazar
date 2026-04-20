import CommonTypes "common";

module {
  public type ContactMessage = {
    id : Nat;
    name : Text;
    email : Text;
    phone : Text;
    message : Text;
    createdAt : CommonTypes.Timestamp;
  };
};
