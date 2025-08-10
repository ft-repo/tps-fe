// GET
export interface GetVehicleListParams {
  vehicle_type_id: number | string | null;
  page: number | string | null;
  limit: number | string | null;
}

export interface VehicleListResponse {
  data: any[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}

// BY ID
export interface VehicleListByIDResponse {
  vehicle_detail: GetVehicleDetail
  vehicle_owner_documents: GetVehicleOwnerDocuments
  vehicle_pictures: GetVehiclePictures
}

export interface GetVehicleDetail {
  vehicle_type_id: number | string | null | any;
  vehicle_type_name: string
  plate_no: string
  plate_province: string
  brand: string
  weight: number | string | null | any;
  color: string
  kingpin_distance: number | string | null | any;
  width: number | string | null | any;
  length: number | string | null | any;
  height: number | string | null | any;
  registration_document_url: string
}

export interface GetVehicleOwnerDocuments {
  owner_document_url: string
  employment_contact_url: string
  buyer_contact_url: string
  assignment_contact_url: string
}

export interface GetVehiclePictures {
  front_rear_url: string
  side_rear_url: string
  back_rear_url: string
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

// PUT
export interface APIPutBody {
  vehicle_detail: PutVehicleDetail;
  vehicle_picture: PutVehiclePicture;
}

export interface PutVehicleDetail {
  brand: string;
  color: string;
  kingpin_distance: number;
  width: number;
}

export interface PutVehiclePicture {
  front_rear_url: string;
}
