import { AUTH_ERROR_MSG } from "./const/auth.const";
import { CONTACT_ERROR_MSG } from "./const/contact.const";
import { ORDER_ERROR_MSG } from "./const/order.const";
import { PRODUCT_ERROR_MSG } from "./const/product.const";
import { UTIL_ERROR_MSG } from "./const/util.const";

export enum ServiceName {
  auth = 'auth',
  contact = 'contact',
  order = 'order',
  util = 'util',
  product = 'product',
}

export const SERVICE_ERROR_MESSAGE = {
  [ServiceName.auth]: AUTH_ERROR_MSG,
  [ServiceName.contact]: CONTACT_ERROR_MSG,
  [ServiceName.order]: ORDER_ERROR_MSG,
  [ServiceName.util]: UTIL_ERROR_MSG,
  [ServiceName.product]: PRODUCT_ERROR_MSG,
}
