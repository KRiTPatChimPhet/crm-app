import { COMMON_ERROR_MSG, COMMON_UNKNOWN_MSG } from "./common.const";

export const AUTH_ERROR_MSG = {
  ...COMMON_ERROR_MSG,
  '40006': 'ไม่พบข้อมูลผู้ใช้ กรุณาติดต่อแอดมิน',   // 'User not found',
  '40007': COMMON_UNKNOWN_MSG,              // 'Confirm password invalid',
  '40102': COMMON_UNKNOWN_MSG,              // 'Line Verify token invalid.',
  '50004': COMMON_UNKNOWN_MSG,              // 'User Duplicated',
  '50005': COMMON_UNKNOWN_MSG,              // 'Missing line channel id',
}
