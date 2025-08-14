// GET USER
export interface UserState {
  profile_url: string;
  important_info: ImportantInfo;
  business_document: BusinessDocument;
  loading: boolean;
}

export interface ImportantInfo {
  entity_name: string;
  business_name: string;
  business_address: BusinessAddress;
  business_phone_number: string;
  registration_no: string;
  contact_name: string;
  contact_type: ContactType;
  cid: string;
  contact_phone_number: string;
  permission_date: string;
}

export interface BusinessAddress {
  house_number: string;
  village: string;
  lane: string;
  road: string;
  sub_district: string;
  district: string;
  province: string;
  zip_code: string;
}

export interface ContactType {
  id: number;
  name: string;
}

export interface BusinessDocument {
  cid_card_file_url: string;
  certificate_file_url: string;
  business_file_url: string;
}