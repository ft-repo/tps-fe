// @types/entrepreneur/permit-list/index.ts

import { FileType } from "@/@types/shared";

/** Root API response with pagination */
export interface PetitionListResponse {
  data: Petition[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}

/** One petition item */
export interface Petition {
  petition_id: number;
  petition_no: string;
  road_code: string;
  road_name: string;
  start_date: ISODateString | Date;
  end_date: ISODateString | Date;
  petition_date: ISODateString | Date;
  status_id: number;
  status: Status;
  petition_flow: PetitionFlowItem[];
}

/** Nested status object used in multiple places */
export interface Status {
  status_name: string;
}

/** Each petition flow message */
export interface PetitionFlowItem {
  message_id: number;
  status_id: number;
  created_date: ISODateString | Date;
  created_by: string;
  is_approved: boolean;
  status: Status;
}

/** String type for API date fields */
export type ISODateString = string;

/** Params for listing petitions */
export interface PermitListParams {
  page?: number; // default 1
  limit?: number; // default 10
  search?: string;
  status_id?: number;
  start_date?: ISODateString;
  end_date?: ISODateString;
}

/** Extra client-side options for fetching lists */
export interface ListOptions {
  /** Convert date strings to Date objects on client. Default: false */
  parseDates?: boolean;
  /** Abort controller signal for canceling requests */
  signal?: AbortSignal;
}


// NEW
export interface FieldType {
  search: string;
}

// FIELD TYPE POST PETITION
export interface FieldTypePetition {
  set_id: string;
  start_date: string;
  end_date: string;
  contact_name: string;
  phone_number: string;
  project_name: string;
  start_point: string;
  end_point: string;
  start_province: string | null;
  end_Povince: string | null;
  poa_url: FileType;
  mach_book_url: FileType;
  vehicle: VehicleList[]
}

export interface VehicleList {
  estimate_id: string;
  truck_dimension_url: FileType;
  semi_trailer_dimension_url: FileType;
  combined_vehicle_url: FileType;
  turning_radius_url: FileType;
  cargo_dimension_url: FileType;
  highway_dept_permit_url: FileType;
  highway_dept_permit_number_url: FileType;
  rural_highway_dept_permit_url: FileType;
  rural_highway_dept_permit_number_url: FileType;
}
