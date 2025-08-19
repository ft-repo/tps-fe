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