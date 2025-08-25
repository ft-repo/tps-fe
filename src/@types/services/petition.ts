import { GetPaginateParams } from "../shared";

export interface GetPetitionParams {
  search?: string;
  page: number;
  limit: number;
  status_id?: string
  is_finish?: boolean
}

export interface GetPetitionResponse {
  data: PetitionData[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}

export interface PetitionData {
  petition_id: number;
  petition_no: string;
  road_code: string;
  road_name: string;
  start_date: string;
  end_date: string;
  petition_date: string;
  status_id: number;
  status: Status;
  petition_flow: PetitionFlow[];
}

export interface Status {
  status_name: string;
}

export interface PetitionFlow {
  message_id: number;
  status_id: number;
  created_date: string;
  created_by: string;
  is_approved: boolean;
  status: PetitionStatus;
}

export interface PetitionStatus {
  status_name: string;
}

// ADMIN
export interface PetitionPostBody {
  petition_id: number;
  status_id: number;
  is_approved: boolean;
  remark: string;
  document_url: string;
  is_skipped: boolean;
}

export interface PetitionExtendedPostBody {
  petition_exid: number;
  status_id: number;
  is_approved: boolean;
  remark: string;
  reply_message: string;
  document_url: string;
}

export interface GetPetitionDetailParams {
  petition_id: string;
}

export interface GetEstimateParams {
  estimate_id: string;
}

export interface GetEstimateDetailParams extends GetPaginateParams {
  estimate_id: string;
}

export interface GetRuralRoadParams extends GetPaginateParams {
  petition_id: string;
}

// POST BODY
export interface PetitionExtendedPostRequest {
  petition_extended_detail: PetitionExtendedDetail;
  petition_extended_address: PetitionExtendedAddress;
  petition_extended_vehicle: PetitionExtendedVehicle;
}

export interface PetitionExtendedDetail {
  cert_date: string;
  poa_name: string;
  phone_number: string;
  ref_form_no: number;
  remark: string;
}

export interface PetitionExtendedAddress {
  contact_address: ContactAddress;
  poa_address: PoaAddress;
}

export interface ContactAddress {
  house_number: string;
  village: string;
  lane: string;
  road: string;
  sub_district_id: number;
  district_id: number;
  province_id: number;
  zip_code: string;
}

export interface PoaAddress {
  house_number: string;
  village: string;
  lane: string;
  road: string;
  sub_district_id: number;
  district_id: number;
  province_id: number;
  zip_code: string;
}

export interface PetitionExtendedVehicle {
  characteristic: string;
  type: string;
  plate_no: string;
  plate_province: string;
  color: string;
  axis_number: number;
  weight_total: number;
  axis_weight: number[];
}

export interface PetitionExtendedPostResponse {
  message: string
  success: boolean
  temporary_id: string
}