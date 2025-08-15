// CLIENT

import { ClientList, StaffList } from "../services/user";

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

// ADMIN
export interface StaffState {
  client: Client;
  admin: Staff;
  ldap: LDAP;
  loading: boolean;
}

export interface Client {
  overview: ClientOverview;
  detail: ClientList;
}

export interface ClientOverview {
  search: SearchClient;
  data: ClientListsResponse;
}

export interface SearchClient {
  search: string;
  page: number;
  limit: number;
}

export interface ClientListsResponse {
  data: ClientList[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}

export interface ClientDetail { }

// STAFF
export interface Staff {
  overview: StaffOverview;
  detail: StaffDetail;
}

export interface StaffOverview {
  search: SearchStaff;
  data: StaffListsResponse;
}

export interface SearchStaff {
  search: string;
  page: number;
  limit: number;
}

export interface StaffListsResponse {
  data: StaffList[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}

export interface StaffDetail { }

export interface LDAP {
  search: GetLDAPParams;
  data: LDAPList[];
}

export interface GetLDAPParams {
  keyword: string;
  page: number;
  limit: number;
}

export interface ResponseLDAPData {
  data: LDAPList[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}

export interface LDAPList {
  Description: string;
  FirstName: string;
  LastName: string;
  Username: string;
}