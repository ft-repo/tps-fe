// REDUX CLIENT
export interface PetitionState {
  petition: Petition;
  petition_extended: PetitionExtended;
  loading: boolean;
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
  status: PetitionStatus;
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
  loading: boolean;
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
  estimate_rural_roads: EstimateRuralRoad[];
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
  etc_vehicle: any;
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

export interface AdminPetitionExtendedDetail { }