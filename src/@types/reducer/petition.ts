export interface PetitionState {
  petition: Petition;
  petition_extended: PetitionExtended;
  loading: boolean;
}

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

//petition extended

export interface PetitionExtendedTableData {
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

export interface Status {
  status_name: string
}

export interface PetitionExtendedFlow {
  id: number
  petition_exid: number
  status_id: number
  is_approved: boolean
  created_by: string
  created_at: string
  status: Status2
  admin_creaded: AdminCreaded
}

export interface Status2 {
  status_name: string
}

export interface AdminCreaded {
  id: string
  username: string
  title: string
  first_name: string
  last_name: string
  department_id: any
  role_id: any
}

export interface UserCreated {
  id: string
  registration_no: string
  created_at: string
  profile_url: string
  business_details: BusinessDetails
}

export interface BusinessDetails {
  entity_type_id: number
  business_name: string
}

//petitionAdmin
export interface Root {
  data: Daum[]
  total: number
  page: number
  limit: number
  total_pages: number
}

export interface Daum {
  petition_id: number
  business_name: string
  road_code: string
  road_name: string
  start_date: string
  end_date: string
  petition_date: string
  status_id: number
  status: Status
  petition_flow: PetitionFlow[]
  estimate: Estimate[]
}

export interface Status {
  status_name: string
}

export interface PetitionFlow {
  message_id: number
  status_id: number
  created_date: string
  created_by: string
  is_approved: boolean
  status: Status2
}

export interface Status2 {
  status_name: string
}

export interface Estimate {
  estimate_id: string
  sort: string
}
