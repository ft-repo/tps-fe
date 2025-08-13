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
  data: any[];
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
