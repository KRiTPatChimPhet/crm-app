import { Contact } from "../contacts/contact.types";
import { LineProfile } from "../line/line-profile.types";

export interface User {
  contact?: Contact;
  lineProfile: LineProfile;
}
