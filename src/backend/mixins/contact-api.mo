import Map "mo:core/Map";
import ContactTypes "../types/contact";
import CommonTypes "../types/common";
import ContactLib "../lib/contact";

mixin (
  messages : Map.Map<Nat, ContactTypes.ContactMessage>,
  contactCounter : CommonTypes.Counter,
) {
  public func submitContactForm(
    name : Text,
    email : Text,
    phone : Text,
    message : Text,
  ) : async { #ok : ContactTypes.ContactMessage; #err : Text } {
    if (name.size() == 0) {
      return #err("Naam zaruri hai / Name is required");
    };
    if (email.size() == 0) {
      return #err("Email zaruri hai / Email is required");
    };
    if (message.size() == 0) {
      return #err("Message zaruri hai / Message is required");
    };

    let record = ContactLib.submitContactMessage(
      messages,
      contactCounter,
      name,
      email,
      phone,
      message,
    );
    #ok(record);
  };
};
