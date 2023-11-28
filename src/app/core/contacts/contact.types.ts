import { BaseInterface } from "../base/baseInterface.types";

export interface Contact extends BaseInterface {
  id: string;

  title: string;
  firstName: string;
  lastName: string;
  displayName?: string;

  luid?: string;
  lineName?: string;
  cuid?: string;
  fbName?: string;
  fbuid?: string

  pid: string;
  tid: string;
  shareholderId?: string;
  tags?: string[];

  citizenId?: string;
  tel?: string;
  email?: string;
  addr01?: string;
  street?: string;
  subDistrict?: string;
  district?: string;
  province?: string;
  zip?: string;
  locationcode?: string;
  imageProfile?: string;
  latitude?: number;
  longitude?: number;

  birthday?: string;
  occupation?: string;

  bankAccountInfo?: BankAccountInfo;
  remark?: string;

  // Old version -- Not use --
  // study?: string;
  // carrer?: string;
}

export interface BankAccountInfo {
  accountNo?: string;
  accountName?: string;
  bankName?: string;

  // Not use
  brunchName?: string;
}
