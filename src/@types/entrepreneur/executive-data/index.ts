/* eslint-disable @typescript-eslint/no-explicit-any */
export interface FieldType {
  business_type: string;
  business_name: string;
  business_address: string;
  office_tel: string;
  business_no: string;
  contact_name: string;
  contact_type: string;
  citizen_id: string;
  contact_tel: string;
  file_id: FileType;
  approved_date: Date | string | null | any;
  // DOCUMENT
  file_copied_of_citizen_id: FileType;
  file_legal_entity_id: FileType;
  file_trasfer_ownership_image_id: FileType;
}

export interface FileType {
  file: any[];
  url: string;
}

// PUT USER
export interface APIPutBody {
  important_info: ImportantInfo;
  business_document: BusinessDocument;
}

export interface ImportantInfo {
  business_phone_number: string;
  contact_name: string;
  contact_type_id: number;
  cid: string;
  contact_phone_number: string;
}

export interface BusinessDocument {
  cid_card_file_url: string;
  certificate_file_url: string;
  business_file_url: string;
}

export interface APIChangePasswordBody {
  new_password: string;
  confirm_password: string;
}