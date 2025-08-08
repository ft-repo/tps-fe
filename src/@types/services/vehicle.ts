// GET
export interface GetVehicleListParams {
  vehicle_type_id: number | string | null;
  page: number;
  limit: number;
}

export interface VehicleListResponse {
  data: any[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}

// POST
export interface APIPostBody {
  vehicle_detail: VehicleDetail;
  vehicle_owner_document: VehicleOwnerDocument;
  vehicle_picture: VehiclePicture;
}

export interface VehicleDetail {
  vehicle_type_id: number | string;
  plate_no: string;
  plate_province: string;
  brand: string;
  weight: number | string;
  color: string;
  kingpin_distance: number | string;
  width: number | string;
  length: number | string;
  height: number | string;
  registration_document_url: string;
}

export interface VehicleOwnerDocument {
  owner_document_url: string;
  employment_contact_url: string;
  buyer_contact_url: string;
  assignment_contact_url: string;
}

export interface VehiclePicture {
  front_rear_url: string;
  side_rear_url: string;
  back_rear_url: string;
}

// UPLOAD
export interface UploadRequest {
  upload: ArrayBuffer
}

export interface UploadResponse {
  url: string;
}