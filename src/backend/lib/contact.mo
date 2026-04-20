import Map "mo:core/Map";
import Time "mo:core/Time";
import ContactTypes "../types/contact";
import CommonTypes "../types/common";

module {
  public func submitContactMessage(
    messages : Map.Map<Nat, ContactTypes.ContactMessage>,
    counter : CommonTypes.Counter,
    name : Text,
    email : Text,
    phone : Text,
    message : Text,
  ) : ContactTypes.ContactMessage {
    let id = counter.value;
    counter.value += 1;

    let record : ContactTypes.ContactMessage = {
      id;
      name;
      email;
      phone;
      message;
      createdAt = Time.now();
    };

    messages.add(id, record);
    record;
  };
};
