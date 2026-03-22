import { EditDocumentDetail, EditRoadMapDetail, EditVehicleDetail, PetitionHold } from "../reducer/petition";
import { GetPaginateParams } from "../shared";

export type PetitionDetailDocumentResponse = EditDocumentDetail
export type PetitionDetailVehicleResponse = EditVehicleDetail

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
  is_skipped: boolean;
  is_readed: boolean;
  status: PetitionStatus;
  petition_hold: PetitionHold;
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

export interface GetPetitionExtendedDetailParams {
  petition_exid: string;
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
  ref_form_no: number | string;
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
  towing_vehicle_id: number | null;
  semi_trailer_vehicle_id: number | null;
  etc_vehicle_id: number[] | null;
  axis_weight_towing: number[];
  axis_weight_semi_trailer: number[];
}

export interface PetitionExtendedPostResponse {
  message: string
  success: boolean
  temporary_id: string
}

export interface PetitionExtendedDocumentPostRequest {
  petition_extended_user_document: PetitionExtendedUserDocument;
  petition_extended_vehicle_document: PetitionExtendedVehicleDocument;
  petition_extended_audit_document: PetitionExtendedAuditDocument;
}

export interface PetitionExtendedUserDocument {
  cid_url: string;
  company_certificate_url: string;
  vehicle_permit_url: string;
  power_of_attorney_url: string;
}

export interface PetitionExtendedVehicleDocument {
  vehicle_registration_url: string;
  vehicle_photos_url: string;
  vehicle_dimensions_empty_url: string;
  vehicle_dimensions_loaded_url: string;
  prefab_parts_details_url: string;
  vehicle_turning_radius_url: string;
}

export interface PetitionExtendedAuditDocument {
  bridge_structure_calculation_url: string;
  road_structure_calculation_url: string;
  bridge_engineer_certificate_url: string;
  road_engineer_certificate_url: string;
  mechanical_engineer_certificate_url: string;
  safety_management_plan_url: string;
  route_map_url: string;
  operation_plan_url: string;
  contact_info_url: string;
  mechanical_engineer_certifier_url: string;
}

// PETITION
export interface PetitionEstimateRequest {
  vehicle: VehicleRequestArr[];
  start_point: StartPoint;
  end_point: EndPoint;
  vehicle_route: VehicleRoute;
}

export interface VehicleRequestArr {
  turn_radius: number;
  towing_vehicle_id: number | null;
  semi_trailer_vehicle_id: number | null;
  etc_vehicle_id: number[] | null;
  towing_axis_weight: number[];
  semi_trailer_axis_weight: number[];
}

export interface StartPoint {
  type: string;
  coordinates: number[] | any;
}

export interface EndPoint {
  type: string;
  coordinates: number[] | any;
}

export interface VehicleRoute {
  type: string;
  coordinates: number[][] | any;
}


export interface PetitionEstimateResponse {
  estimate: EstimateResponse[];
  set_id: string;
}

export interface EstimateResponse {
  estimate_id: string
  vehicle: Vehicle[]
}

export interface Vehicle {
  id: number;
  vehicle_type: string
  plate_no: string
  plate_province: string
}

// REQUEST
export interface PetitionConfirmRequest {
  set_id: string;
  start_date: string;
  end_date: string;
  contact_name: string;
  phone_number: string;
  project_name: string;
  start_point: string | number;
  end_point: string | number;
  start_province: string;
  end_Povince: string;
  poa_url: string;
  mach_book_url: string;
  vehicle: VehicleArray[];
}
export interface VehicleArray {
  estimate_id: string;
  truck_dimension_url: string;
  semi_trailer_dimension_url: string;
  combined_vehicle_url: string;
  turning_radius_url: string;
  cargo_dimension_url: string;
  highway_dept_permit_url: string;
  highway_dept_permit_number_url: string;
  rural_highway_dept_permit_url: string;
  rural_highway_dept_permit_number_url: string;
}

export interface PetitionConfirmResponse {
  message: string;
}

export interface PetitionMessageResponse {
  id: number;
  petition_id: number;
  status_id: number;
  remark: string;
  document_url: string;
  is_approved: boolean;
  is_skipped: boolean;
  created_by: string;
  created_at: string;
  is_readed: boolean;
  status: Status;
  admin_creaded: AdminCreaded;
  petition_hold: PetitionHold;
}
export interface AdminCreaded {
  id: string;
  username: string;
  title: string;
  first_name: string;
  last_name: string;
  department_id: number;
  role_id: number;
}

export interface PetitionExtendedMessageResponse {
  id: number
  petition_exid: number
  status_id: number
  reply_message: string
  remark: string
  document_url: string
  is_approved: boolean
  created_by: string
  created_at: string
  is_readed: boolean
  status: Status
  admin_creaded: AdminCreaded
}

export interface PetitionMessageRequest {
  message_id: string | number;
}

export interface PetitionHoldRequest {
  hold_id: number;
  days?: number;
  cancel?: boolean;
}

export interface PetitionHoldResponse {
  message: string;
}

export interface PetitionDocumentRequest {
  petition_id: number
  start_date: string
  end_date: string
  contact_name: string
  phone_number: string
  project_name: string
  poa_url: string
  mach_book_url: string
}

export type PetitionDocumentResponse = PetitionHoldResponse;

export interface PetitionRoadMapRequest {
  petition_id: string | number | null;
}

export type PetitionRoadMapResponse = EditRoadMapDetail;

export interface PostPetitionRoadMapRequest {
  petition_id: number;
  vehicles: Vehicles[];
  start_point: StartPoint;
  end_point: EndPoint;
  vehicle_route: VehicleRoute;
}

export interface Vehicles {
  estimate_id: string;
  turn_radius: number;
}

export interface PostPetitionRoadMapResponse {
  estimate: RoadMapResponseEstimate[]
  set_id: string
}

export interface RoadMapResponseEstimate {
  estimate_id: string;
  vehicle: RoadMapResponseVehicle[];
}

export interface RoadMapResponseVehicle {
  id: number
  vehicle_type: string
  plate_no: string
  plate_province: string
}

export interface PostConfirmPetitionRoadMapRequest {
  petition_id: number;
  new_set_id: string;
}

export type PostConfirmPetitionRoadMapResponse = EditRoadMapDetail;

export interface PetitionVehicleRequest {
  petition_id: number;
  vehicle: VehicleDocument[];
}

export interface VehicleDocument {
  truck_dimension_url?: string
  semi_trailer_dimension_url?: string
  combined_vehicle_url?: string
  turning_radius_url?: string
  cargo_dimension_url?: string
  highway_dept_permit_url?: string
  highway_dept_permit_number_url?: string
  rural_highway_dept_permit_url?: string
  rural_highway_dept_permit_number_url?: string
  towing_axis_weight?: number[]
  semi_trailer_axis_weight?: number[];
}

export interface PetitionVehicleResponse { }

export interface PostPetitionEndRequest {
  petition_flow_id: number;
  canceled_remark: string;
}

export interface PostPetitionEndResponse { }