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
  file_id: string;
  approved_date: Date | string | null | any;
  // DOCUMENT
  file_copied_of_citizen_id: string;
  file_legal_entity_id: string;
  file_trasfer_ownership_image_id: string;
}