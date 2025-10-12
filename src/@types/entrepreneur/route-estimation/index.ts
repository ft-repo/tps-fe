import { FileType } from "@/@types/shared";
import { Dayjs } from "dayjs";

// Old fucked up things
export interface FieldType {
  form_template: FieldArray[];
}

export interface FieldArray {
  vehicle_type: string;
  turn_radius: string;
  recovery_vehicle_license_plate: string;
  semi_trailer_license_plate: string;
  mechanical_vehicle_license_plate: string;
  recover_vehicle_chassis_weight_1: number;
  recover_vehicle_chassis_weight_2: number;
  recover_vehicle_chassis_weight_3: number;
  semi_trailer_chassis_weight_1: number;
  semi_trailer_chassis_weight_2: number;
  semi_trailer_chassis_weight_3: number;
  semi_trailer_chassis_weight_4: number;
  start_route: string;
  end_route: string;
}
// End Old fucked up things

// Estimation Route Body
export type RouteEstimationRequest = {
  vehicle: Vehicle[]
  start_point: StartPoint
  end_point: EndPoint
  vehicle_route: VehicleRoute
}

export interface Vehicle {
  turn_radius: number
  towing_vehicle_id: number | null
  semi_trailer_vehicle_id: number | null
  etc_vehicle_id: number | null
  towing_axis_weight: number[]
  semi_trailer_axis_weight: number[]
}

export interface StartPoint {
  type: string
  coordinates: [number, number]
}

export interface EndPoint {
  type: string
  coordinates: [number, number]
}

export interface VehicleRoute {
  type: string
  coordinates: number[][]
}

export type VehicleId = Omit<Vehicle, 'turn_radius' | 'towing_axis_weight' | 'semi_trailer_axis_weight'>
// End Estimation Route Body

export interface FieldTypeForOther {
  // 1. PETITOR INFO
  company_name: string;
  company_contactor: string;
  company_address: string;
  company_village_number: string;
  company_alley: string;
  company_road: string;
  company_province: string | number | null;
  company_district: string | number | null;
  company_sub_district: string | number | null;
  company_postcode: string;
  // 1.1 REGISTERED DETAIL
  business_type: string | number;
  registered_date: string | null | Dayjs;
  registered_company_address: string;
  registered_company_village_no: string;
  registered_company_alley: string;
  registered_company_road: string;
  registered_company_province: string | number | null;
  registered_company_district: string | number | null;
  registered_company_sub_district: string | number | null;
  registered_company_postcode: string;
  // 1.2 TRANSFERER DETAIL
  transferer_name: string;
  transferer_phone_number: string;
  transferer_company_address: string;
  transferer_company_village_no: string;
  transferer_company_alley: string;
  transferer_company_road: string;
  transferer_company_province: string | number | null;
  transferer_company_district: string | number | null;
  transferer_company_sub_district: string | number | null;
  transferer_company_postcode: string;
  // 2. VEHICLE DETAIL
  match_type: number | null,
  towering_vehicle: number | null,
  semi_trailer_vehicle: number | null,
  etc_vehicle: number | null,
  towering_weight1: number | string;
  towering_weight2: number | string;
  towering_weight3: number | string;
  towering_weight4: number | string;
  towering_weight5: number | string;
  towering_weight6: number | string;
  towering_weight7: number | string;
  semi_weight1: number | string;
  semi_weight2: number | string;
  semi_weight3: number | string;
  semi_weight4: number | string;
  semi_weight5: number | string;
  semi_weight6: number | string;
  semi_weight7: number | string;
  // 3. REMARK
  petition_number: string;
  remark: string;
  // 4. IS SAME
  is_same: boolean[];
}

export interface ContextProps {
  step: number;
  setStep: (step: number | any) => void;
  dataParser: RouteEstimationRequest;
  setDataParser: (dataParser: RouteEstimationRequest) => void;
}

export interface VehicleData {
  title: string;
  weight: number;
  plate_no: string;
  image: string;
}

export interface SummaryData {
  title: string;
  description: string;
}

// OTHE RDOC FORM
export interface DocumentFieldType {
  petition_extended_user_document: PetitionExtendedUserDocument;
  petition_extended_vehicle_document: PetitionExtendedVehicleDocument;
  petition_extended_audit_document: PetitionExtendedAuditDocument;
}

export interface PetitionExtendedUserDocument {
  cid_url: FileType;
  company_certificate_url: FileType;
  vehicle_permit_url: FileType;
  power_of_attorney_url: FileType;
}

export interface PetitionExtendedVehicleDocument {
  vehicle_registration_url: FileType;
  vehicle_photos_url: FileType;
  vehicle_dimensions_empty_url: FileType;
  vehicle_dimensions_loaded_url: FileType;
  prefab_parts_details_url: FileType;
  vehicle_turning_radius_url: FileType;
}

export interface PetitionExtendedAuditDocument {
  bridge_structure_calculation_url: FileType;
  road_structure_calculation_url: FileType;
  bridge_engineer_certificate_url: FileType;
  road_engineer_certificate_url: FileType;
  mechanical_engineer_certificate_url: FileType;
  safety_management_plan_url: FileType;
  route_map_url: FileType;
  operation_plan_url: FileType;
  contact_info_url: FileType;
}

export type RouteEstimationResponse = {
  estimate: EstimateResponse[]
  set_id: string
}

export interface EstimateResponse {
  estimate_id: string
  vehicle: VehicleResponse[]
}

export interface VehicleResponse {
  id: number
  vehicle_type: string
  plate_no: string
  plate_province: string
}

export type RouteEstimationDetailResponse = {
  towing_vehicle: TowingVehicle
  semi_trailer_vehicle: SemiTrailerVehicle
  towing_axis_weight: number[]
  semi_trailer_axis_weight: number[]
  start_point: number[]
  end_point: number[]
  vehicle_route: number[][]
  estimate_rural_roads: EstimateRuralRoad[]
}

export interface TowingVehicle {
  vehicle_type: string
  vehicle_weight: number
  vehicle_plate: string
  vehicle_province: string
  vehicle_picture: string
}

export interface SemiTrailerVehicle {
  vehicle_type: string
  vehicle_weight: number
  vehicle_plate: string
  vehicle_province: string
  vehicle_picture: string
}

export interface EstimateRuralRoad {
  road_line: number[][][]
}


export type RouteEstimationSummaryResponse = RouteEstimationSummary[]

export interface RouteEstimationSummary {
  type: string
  total: number
  pass: number
  not_pass: number
}

export type RouteCurveResponse = {
  data: RouteCurve[]
  total: number
  page: number
  limit: number
  total_pages: number
}

export interface RouteCurve {
  curvature_radius: number
  curvature_angle: number
  curve_type: string
  is_pass: boolean
}

export type RouteBridgeResponse = {
  data: any[]
  total: number
  page: number
  limit: number
  total_pages: number
}


// NORMAL
export interface FieldTypeArr {
  // start_latitude: number | string;
  // start_longitude: number | string;
  // end_latitude: number | string;
  // end_longitude: number | string;
  start_point: number | string;
  end_point: number | string;
  route_form: FieldTypeForRoute[];
}

export interface FieldTypeForRoute {
  match_type: number | null;
  turn_radius: number | string;
  towering_vehicle: number | null;
  semi_trailer_vehicle: number | null;
  etc_vehicle: number | null;
  towering_weight1: number | string;
  towering_weight2: number | string;
  towering_weight3: number | string;
  towering_weight4: number | string;
  towering_weight5: number | string;
  towering_weight6: number | string;
  towering_weight7: number | string;
  semi_weight1: number | string;
  semi_weight2: number | string;
  semi_weight3: number | string;
  semi_weight4: number | string;
  semi_weight5: number | string;
  semi_weight6: number | string;
  semi_weight7: number | string;
}