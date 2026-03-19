import { PromiseProperties } from "../shared";

// REDUX CLIENT
export interface PetitionState {
  petition: Petition;
  petition_extended: PetitionExtended;
  estimate: RouteEstimate;
  petition_detail: EditPetitionDetail;
  loading: PromiseModules;
}

// PETITION DETAIL
export interface EditPetitionDetail {
  document: EditDocumentDetail;
  vehicle: EditVehicleDetail;
  road_map: EditRoadMapDetail;
}

export interface EditRoadMapDetail {
  id: string;
  vehicle_route: number[][];
  start_point: number[];
  end_point: number[];
  estimate: RoadMapEstimate[];
}

export interface RoadMapEstimate {
  id: string;
  turn_radius: number;
  towing_vehicle_id?: number;
  semi_trailer_vehicle_id: number;
  towing_axis_weight: number[];
  semi_trailer_axis_weight: number[];
  sort: number;
  created_by: string;
  towing_vehicle?: RoadMapTowingVehicle;
  semi_trailer_vehicle: RoadMapSemiTrailerVehicle;
  etc_vehicle?: RoadMapEtcVehicle[];
}

export interface RoadMapTowingVehicle {
  id: number
  user_id: string
  vehicle_type_id: number
  plate_no: string
  plate_province: string
  brand: string
  weight: number
  color: string
  kingpin_distance: number
  width: number
  length: number
  height: number
  axis_type_id: any
  registration_document_url: string
}

export interface RoadMapSemiTrailerVehicle {
  id: number
  user_id: string
  vehicle_type_id: number
  plate_no: string
  plate_province: string
  brand: string
  weight: number
  color: string
  kingpin_distance: number
  width: number
  length: number
  height: number
  axis_type_id: number
  registration_document_url: string
}

export interface RoadMapEtcVehicle {
  estimate_id: string;
  vehicle_id: number;
  vehicle: RoadMapETCVehicleDetail;
}

export interface RoadMapETCVehicleDetail {
  id: number
  user_id: string
  vehicle_type_id: number
  plate_no: string
  plate_province: string
  brand: string
  weight: number
  color: string
  kingpin_distance: number
  width: number
  length: number
  height: number
  axis_type_id?: number
  registration_document_url: string
}

export interface EditDocumentDetail {
  petition_id: number
  registration_no: string
  business_name: string
  entity_type: string
  address: string
  business_phone_no: string
  contact_name: string
  contact_phone_no: string
  project_name: string
  petition_type: string
  start_date: string
  end_date: string
  start_point: string
  end_point: string
  poa_url: string
  mach_book_url: string
}

export interface EditVehicleDetail {
  petition_id: number
  vehicle_list: EditVehicleList[]
}

export interface EditVehicleList {
  sort: string
  match_type: string
  turn_radius: number
  towing_vehicle?: EditTowingVehicle
  semi_trailer_vehicle: EditSemiTrailerVehicle
  etc_vehicle?: EditEtcVehicle[]
  truck_dimension_url: string
  semi_trailer_dimension_url: string
  combined_vehicle_url: string
  turning_radius_url: string
  cargo_dimension_url: string
  highway_dept_permit_url: string
  highway_dept_permit_number_url: string
  rural_highway_dept_permit_url: string
  rural_highway_dept_permit_number_url: string
}

export interface EditSemiTrailerVehicle {
  plate_no: string
  plate_province: string
  weight: number
  axis_weight: number[]
  width: number
  length: number
  height: number
  vehicle_picture: VehiclePicture
  axis_type: AxisType
}

export interface EditEtcVehicle {
  plate_no: string
  plate_province: string
  weight: number
  axis_weight: any
  width: number
  length: number
  height: number
  vehicle_picture: VehiclePicture
}

export interface EditTowingVehicle {
  plate_no: string
  plate_province: string
  weight: number
  axis_weight: number[]
  width: number
  length: number
  height: number
  vehicle_picture: VehiclePicture
}

// CLIENT PETITION
export interface Petition {
  overview: PetitionOverview;
  detail: PetitionDetail;
}

export interface PetitionOverview {
  search: PetitionSearch;
  data: PetitionData;
}

export interface PetitionSearch {
  search: string;
  page: number;
  limit: number;
}

export interface PetitionData {
  data: PetitionTableData[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}

export interface PetitionDetail { }

// PETITION EXTENDED

export interface PetitionExtended {
  overview: PetitionExtendedOverview;
  detail: PetitionExtendedDetail;
}

export interface PetitionExtendedOverview {
  search: PetitionExtendedSearch;
  data: PetitionExtendedData;
}

export interface PetitionExtendedSearch {
  search: string;
  page: number;
  limit: number;
}

export interface PetitionExtendedData {
  data: PetitionExtendedTableData[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}

export interface PetitionExtendedDetail { }

// API RETURN VALUE = PETITION

export interface PetitionTableData {
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

export interface PetitionHold {
  id: number;
  petition_flow_id: number;
  hold_date: string;
  date_expired: string;
  created_by: string;
  created_at: string;
  is_end: boolean;
}

export interface PetitionStatus {
  status_name: string;
}

// API RETURN VALUE = PETITION EXTENDED

export interface PetitionExtendedTableData {
  id: number;
  status_id: number;
  cert_date: string;
  created_by: string;
  poa_name: string;
  phone_number: string;
  ref_form_no: number;
  remark: string;
  created_at: string;
  status: Status;
  petition_extended_flow: PetitionExtendedFlow[];
  user_created: UserCreated;
}

export interface PetitionExtendedFlow {
  id: number;
  petition_exid: number;
  status_id: number;
  is_approved: boolean;
  created_by: string;
  created_at: string;
  is_readed: boolean;
  status: PetitionStatus;
  admin_creaded: AdminCreaded;
}
export interface AdminCreaded {
  id: string;
  username: string;
  title: string;
  first_name: string;
  last_name: string;
  department_id: any;
  role_id: any;
}

export interface UserCreated {
  id: string;
  registration_no: string;
  created_at: string;
  profile_url: string;
  business_details: BusinessDetails;
}

export interface BusinessDetails {
  entity_type_id: number;
  business_name: string;
}

// REDUX ADMIN
export interface PetitionAdminState {
  petition: AdminPetition;
  petition_extended: AdminPetitionExtended;
  petition_history: AdminPetition;
  petition_history_extended: AdminPetitionExtended;
  notification: AdminPetitionNotification;
  petition_status: AdminPetitionStatus[];
  petition_extended_status: AdminPetitionExtendedStatus[];
  petition_count: AdminPetitionCount[];
  petition_extended_count: AdminPetitionCount[];
  loading: boolean;
}

export interface AdminPetitionCount {
  status_id: number;
  status_name: string;
  count: number;
}

export interface AdminPetitionStatus {
  id: number;
  petition_id: number;
  status_id: number;
  remark: string;
  document_url: string;
  is_approved: boolean;
  is_skipped: boolean;
  created_by: string;
  created_at: string;
  status: Status;
  admin_creaded: AdminCreaded;
}

export interface AdminPetitionExtendedStatus {
  id: number;
  petition_exid: number;
  status_id: number;
  reply_message: string;
  remark: string;
  document_url: string;
  is_approved: boolean;
  created_by: string;
  created_at: string;
  is_readed: boolean
  status: Status;
  admin_creaded: AdminCreaded;
}

export interface AdminPetitionNotification {
  search: NotificationSearch;
  data: NotificationData[];
  pagination: NotificationPagination;
}

export interface NotificationSearch {
  page: number;
  limit: number;
}

export interface NotificationData {
  business_name: string;
  created_at: string;
  from: string;
  petition_id: number;
  status_id: number;
  profile_url: string;
}

export interface NotificationPagination {
  hasMore: boolean;
  limit: number;
  page: number;
  total: number;
  totalPages: number;
}

export interface AdminPetition {
  overview: AdminPetitionOverview;
  detail: AdminPetitionDetail
}

export interface AdminPetitionOverview {
  search: AdminPetitionSearch;
  data: AdminPetitionData;
}

export interface AdminPetitionSearch {
  search: string
  is_finish: boolean
  status_id: string
  page: number
  limit: number
}

export interface AdminPetitionData {
  data: AdminPetitionTableData[]
  total: number
  page: number
  limit: number
  total_pages: number
}

export interface AdminPetitionTableData {
  petition_id: number;
  business_name: string;
  road_code: string;
  road_name: string;
  start_date: string;
  end_date: string;
  petition_date: string;
  status_id: number;
  status: Status;
  petition_flow: PetitionFlow[];
  estimate: Estimate[];
}

export interface Estimate {
  estimate_id: string;
  sort: string;
}

export interface AdminPetitionDetail {
  document: DocumentDetail;
  estimate: EstimateDetail;
  vehicle: VehicleDetail;
}

export interface DocumentDetail {
  petition_id: number;
  business_name: string;
  entity_type: string;
  address: string;
  business_phone_no: string;
  contact_name: string;
  contact_phone_no: string;
  project_name: string;
  petition_type: string;
  start_date: string;
  end_date: string;
  start_point: string;
  end_point: string;
  poa_url: string;
  mach_book_url: string;
  registration_no: string;
}

export interface EstimateDetail {
  route: EstimateRouteDetail;
  summary: EstimateSummaryDetail;
  bridge: EstimateBridgeDetail;
  turn_radius: EstimateTurnRadiusDetail;
}

export interface EstimateRouteDetail {
  petition_id: number;
  vehicle_route: number[][];
  estimate: EstimateRouteSubDetail[];
  start_point: string;
  end_point: string;
  estimate_rural_roads: EstimateRuralRoad[];
  start_road: string;
  end_road: string;
  start_road_code: string;
  end_road_code: string;
}

export interface EstimateRouteSubDetail {
  estimate_id: string;
  sort: string;
}

export interface EstimateRuralRoad {
  road_line: number[][][];
}

export interface EstimateSummaryDetail {
  search: EstimateSearch;
  data: EstimateSummaryData;
}

export interface EstimateSearch {
  estimate_id: string;
  page: number;
  limit: number;
}

export interface EstimateSummaryData {
  data: SummaryTableData[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}

export interface SummaryTableData {
  type: string;
  total: number;
  pass: number;
  not_pass: number;
}
export interface EstimateBridgeDetail {
  search: EstimateSearch;
  data: EstimateBridgeDetailData;
}

export interface EstimateBridgeDetailSearch {
  estimate_id: string;
  page: number;
  limit: number;
}

export interface EstimateBridgeDetailData {
  data: BridgeTableData[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}

export interface BridgeTableData {
  is_pass: boolean;
  length: number;
  name_th: string;
}

export interface EstimateTurnRadiusDetail {
  search: EstimateSearch;
  data: EstimateTurnRadiusDetailData;
}

export interface EstimateTurnRadiusDetailSearch {
  estimate_id: string;
  page: number;
  limit: number;
}

export interface EstimateTurnRadiusDetailData {
  data: TurnRadiusTableData[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}

export interface TurnRadiusTableData {
  curvature_radius: number;
  curvature_angle: number;
  curve_type: string;
  is_pass: boolean;
}

export interface VehicleDetail {
  petition_id: number;
  vehicle_list: VehicleList[];
}

export interface VehicleList {
  sort: string;
  match_type: string;
  turn_radius: number;
  towing_vehicle: TowingVehicle;
  semi_trailer_vehicle: SemiTrailerVehicle;
  etc_vehicle: ETCVehicle[];
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

export interface TowingVehicle {
  plate_no: string;
  plate_province: string;
  weight: number;
  axis_weight: number[];
  width: number;
  length: number;
  height: number;
  vehicle_picture: VehiclePicture;
  axis_type: AxisType;
}

export interface AxisType {
  id: number;
  name: string;
  max_weight: number;
  max_carry_weight: number;
  axis_number: number;
}

export interface SemiTrailerVehicle {
  plate_no: string;
  plate_province: string;
  weight: number;
  axis_weight: number[];
  width: number;
  length: number;
  height: number;
  vehicle_picture: VehiclePicture;
  axis_type: AxisType;
}

export interface ETCVehicle {
  plate_no: string;
  plate_province: string;
  weight: number;
  axis_weight: number[];
  width: number;
  length: number;
  height: number;
  vehicle_picture: VehiclePicture;
  axis_type: AxisType;
}

export interface VehiclePicture {
  front_rear_url: string;
  side_rear_url: string;
  back_rear_url: string;
}


// ADMIN PETITION EXTENDED

export interface AdminPetitionExtended {
  overview: AdminPetitionExtendedOverview;
  detail: AdminPetitionExtendedDetail;
}

export interface AdminPetitionExtendedOverview {
  search: AdminPetitionExtendedSearch;
  data: AdminPetitionExtendedData;
}

export interface AdminPetitionExtendedSearch {
  search: string
  is_finish: boolean
  status_id: string
  page: number
  limit: number
}

export interface AdminPetitionExtendedTableData {
  id: number
  status_id: number
  cert_date: string
  created_by: string
  poa_name: string
  phone_number: string
  ref_form_no: number
  remark: string
  created_at: string
  status: Status
  petition_extended_flow: PetitionExtendedFlow[]
  user_created: UserCreated
}

export interface AdminPetitionExtendedData {
  data: AdminPetitionExtendedTableData[]
  total: number
  page: number
  limit: number
  total_pages: number
}

export interface AdminPetitionExtendedDetail {
  id: number;
  status_id: number;
  cert_date: string;
  created_by: string;
  poa_name: string;
  phone_number: string;
  ref_form_no: number;
  remark: string;
  created_at: string;
  status: Status;
  address: PetitionExtendedAddress;
  vehicle: PetitionExtendedVehicle;
  user_document: UserDocument;
  vehicle_document: VehicleDocument;
  audit_document: AuditDocument;
  petition_extended_flow: PetitionExtendedFlow[];
  user_created: PetitionExtendedUserCreated;
}

export interface PetitionExtendedAddress {
  id: number;
  petition_exid: number;
  contact_house_number: string;
  contact_village: string;
  contact_lane: string;
  contact_road: string;
  contact_sub_district_id: number;
  contact_district_id: number;
  contact_province_id: number;
  contact_zip_code: string;
  poa_house_number: string;
  poa_village: string;
  poa_lane: string;
  poa_road: string;
  poa_sub_district_id: number;
  poa_district_id: number;
  poa_province_id: number;
  poa_zip_code: string;
  poa_province: PoaProvince;
  poa_district: PoaDistrict;
  poa_sub_district: PoaSubDistrict;
  contact_province: ContactProvince;
  contact_district: ContactDistrict;
  contact_sub_district: ContactSubDistrict;
}

export interface PoaProvince {
  id: number;
  name_th: string;
  name_en: string;
}

export interface PoaDistrict {
  id: number;
  name_th: string;
  name_en: string;
  province_id: number;
}

export interface PoaSubDistrict {
  id: number;
  name_th: string;
  name_en: string;
  zip_code: string;
  province_id: number;
  district_id: number;
}

export interface ContactProvince {
  id: number;
  name_th: string;
  name_en: string;
}

export interface ContactDistrict {
  id: number;
  name_th: string;
  name_en: string;
  province_id: number;
}

export interface ContactSubDistrict {
  id: number;
  name_th: string;
  name_en: string;
  zip_code: string;
  province_id: number;
  district_id: number;
}

export interface PetitionExtendedVehicle {
  // id: number;
  // petition_exid: number;
  // characteristic: string;
  // type: string;
  // plate_no: string;
  // plate_province: string;
  // color: string;
  // axis_number: number;
  // weight: number;
  // axis_weight: number[];

  id: number
  petition_exid: number
  towing_vehicle_id: number
  semi_trailer_vehicle_id: number
  etc_vehicle_id: number
  axis_weight_towing: number[]
  axis_weight_semi_trailer: number[]
  towing_vehicle: ExtendedVehicleDetail;
  semi_trailer_vehicle: ExtendedVehicleDetail;
  etc_vehicle: ExtendedETCVehicleDetail[];
}

export interface ExtendedETCVehicleDetail {
  etc_vehicle: ExtendedVehicleDetail;
  id: number;
  petition_ex_vehicle_id: number;
  vehicle_id: number;
}

export interface ExtendedVehicleDetail {
  id: number;
  user_id: string;
  vehicle_type_id: number;
  plate_no: string;
  plate_province: string;
  brand: string;
  weight: number;
  color: string;
  kingpin_distance: number;
  width: number;
  length: number;
  height: number;
  axis_number: number;
  registration_document_url: string;
}

export interface UserDocument {
  id: number;
  petition_exid: number;
  cid_url: string;
  company_certificate_url: string;
  vehicle_permit_url: string;
  power_of_attorney_url: string;
}

export interface VehicleDocument {
  id: number;
  petition_exid: number;
  vehicle_registration_url: string;
  vehicle_photos_url: string;
  vehicle_dimensions_empty_url: string;
  vehicle_dimensions_loaded_url: string;
  prefab_parts_details_url: string;
  vehicle_turning_radius_url: string;
}

export interface AuditDocument {
  id: number;
  petition_exid: number;
  bridge_structure_calculation_url: string;
  road_structure_calculation_url: string;
  bridge_engineer_certificate_url: string;
  road_engineer_certificate_url: string;
  mechanical_engineer_certificate_url: string;
  safety_management_plan_url: string;
  route_map_url: string;
  operation_plan_url: string;
  contact_info_url: string;
}

export interface PetitionExtendedUserCreated {
  id: string;
  registration_no: string;
  created_at: string;
  profile_url: string;
  business_details: BusinessDetails;
  business_address: BusinessAddress;
}

export interface BusinessAddress {
  house_number: string;
  village: string;
  lane: string;
  road: string;
  sub_district_id: number;
  district_id: number;
  zip_codes: string;
  province_id: number;
  phone_number: string;
  province: PoaProvince;
  district: PoaDistrict;
  sub_district: PoaSubDistrict;
}

// ROUTE ESTIMATE
export interface RouteEstimate {
  detail: ClientEstimateDetail;
  summary: EstimateSummaryDetail;
  bridge: EstimateBridgeDetail;
  turn_radius: EstimateTurnRadiusDetail;
}

export interface ClientEstimateDetail {
  towing_vehicle: ClientTowingVehicle
  semi_trailer_vehicle: ClientSemiTrailerVehicle
  etc_vehicle: ClientETCVehicle
  towing_axis_weight: number[]
  semi_trailer_axis_weight: number[]
  start_point: number[]
  end_point: number[]
  vehicle_route: number[][]
  estimate_rural_roads: any
  start_road: string
  end_road: string
  start_road_code: string
  end_road_code: string
}

export interface ClientTowingVehicle {
  vehicle_type: string
  vehicle_weight: number
  vehicle_plate: string
  vehicle_province: string
  vehicle_picture: string
}

export interface ClientSemiTrailerVehicle {
  vehicle_type: string
  vehicle_weight: number
  vehicle_plate: string
  vehicle_province: string
  vehicle_picture: string
}

export interface ClientETCVehicle {
  vehicle_type: string
  vehicle_weight: number
  vehicle_plate: string
  vehicle_province: string
  vehicle_picture: string
}

export interface PromiseModules {
  petition: {
    overview: PromiseProperties;
    detail: PromiseProperties;
  };
  petition_extended: {
    overview: PromiseProperties;
    detail: PromiseProperties;
  };
  estimate: {
    detail: PromiseProperties;
    summary: PromiseProperties;
    bridge: PromiseProperties;
    turn_radius: PromiseProperties;
  };
  petition_detail: {
    document: PromiseProperties;
    vehicle: PromiseProperties;
    road_map: PromiseProperties;
  };
}