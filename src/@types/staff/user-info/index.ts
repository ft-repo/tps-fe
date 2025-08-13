export interface SearchUserName {
  username: string;
}

export interface DeleteClientListsResponse {
  message: string;
}

export interface TableCategoryData {
  business_name: string;
  road_code: string;
  road_name: string;
  start_date: string;
  end_date: string;
  permit_date: string;
  validate_document: string;
  validate_route: string;
  validate_vehicle: string;
  wait_signed: string;
  permit: string;
}

export interface TableOtherData {
  business_name: string;
  petition_date: string;
  committee_conside: string;
  wait_signed: string;
  petition_approved: string;
}

export interface ClientListsResponse {
  data: ClientList[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}

export interface StaffListsResponse {
  data: StaffList[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}

export interface ClientList {
  id: string
  registration_no: string
  created_at: string
  business_details: BusinessDetails
  business_address: BusinessAddress
  contact_info: ContactInfo
  documents: Documents
}

export interface BusinessDetails {
  entity_type_id: number
  business_name: string
  entity_type: EntityType
}

export interface EntityType {
  id: number
  name: string
}

export interface BusinessAddress {
  house_number: string
  village: string
  lane: string
  road: string
  sub_district_id: number
  district_id: number
  zip_codes: string
  province_id: number
  phone_number: string
  province: Province
  district: District
  sub_district: SubDistrict
}

export interface Province {
  id: number
  name_th: string
  name_en: string
}

export interface District {
  id: number
  name_th: string
  name_en: string
  province_id: number
}

export interface SubDistrict {
  id: number
  name_th: string
  name_en: string
  zip_code: string
  province_id: number
  district_id: number
}

export interface ContactInfo {
  contact_name: string
  contact_type_id: number
  phone_number: string
  cid: string
  contact_type: ContactType
}

export interface ContactType {
  id: number
  name: string
}

export interface Documents {
  certificate_file_url: string
  cid_card_file_url: string
  business_file_url: string
  uploaded_at: string
}

export interface StaffListsResponse {
  data: StaffList[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}

export interface StaffList {
  id: string
  username: string
  title: string
  first_name: string
  last_name: string
  department_id: number
  role_id: number
  department: Department
  role: Role
}

export interface Department {
  dept_name: string
  dept_type: number
  dept_group: number
  dept_province: string
}

export interface Role {
  name: string
}
