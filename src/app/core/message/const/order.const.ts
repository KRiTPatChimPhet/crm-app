import { COMMON_ERROR_MSG, COMMON_UNKNOWN_MSG } from "./common.const";

export const ORDER_ERROR_MSG = {
  ...COMMON_ERROR_MSG,
  '40007': 'ไม่พบข้อมูลออเดอร์นี้ กรุณาติดต่อแอดมิน', //'Order not found',
  '40008': 'ออเดอร์นี้ปิดแล้ว',      //'Order already closed, Do not be updated',
  '40009': COMMON_UNKNOWN_MSG,  // 'Delivery Items was not equal items',
  '40010': COMMON_UNKNOWN_MSG,  // 'Update order Items must greater than equal delivery Item',
  '40011': COMMON_UNKNOWN_MSG,  // 'Payment index invalid',
  '40012': COMMON_UNKNOWN_MSG,  // 'Shipment index invalid',
  '40013': COMMON_UNKNOWN_MSG,  // 'Shipment cost type invalid',
  '40014': COMMON_UNKNOWN_MSG,  // 'Shipment cost criteria invalid',
  '50004': COMMON_UNKNOWN_MSG,  // 'Qrcode generate error',
}
