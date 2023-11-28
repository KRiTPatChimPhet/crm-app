import { COMMON_ERROR_MSG, COMMON_UNKNOWN_MSG } from "./common.const";

export const PRODUCT_ERROR_MSG = {
  ...COMMON_ERROR_MSG,
  '40007': COMMON_UNKNOWN_MSG,    // 'Group, Section, Category, Type code is invalid',
  '40008': COMMON_UNKNOWN_MSG,    // 'Section code is invalid',
  '40009': COMMON_UNKNOWN_MSG,    // 'Group code is invalid',
  '40010': COMMON_UNKNOWN_MSG,    // 'Category code is invalid',
  '40011': COMMON_UNKNOWN_MSG,    // 'Type code is invalid',
  '40012': COMMON_UNKNOWN_MSG,    // 'Unit size is missing',
  '40013': COMMON_UNKNOWN_MSG,    // 'Unit weight is missing',
  '40016': COMMON_UNKNOWN_MSG,    // 'Product variants total invalid',
  '40017': COMMON_UNKNOWN_MSG,    // 'Product variants total exceeded',
  '40018': COMMON_UNKNOWN_MSG,    // 'Total Collections exceeded.',
  '50004': COMMON_UNKNOWN_MSG,    // 'Code exceeded.',
}
