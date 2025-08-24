// REDUCER
export interface VehicleListState {
  overview: Overview;
  detail: Detail;
  detailForRouteEstimation: DetailForRouteEstimation;
  loading: boolean;
}

export interface Overview {
  search: Search;
  data: Data;
}

export interface Search {
  vehicle_type_id?: string | number | null | any;
  page: number | string | null | any;
  limit: number | string | null | any;
}

export interface Data {
  data: any[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}

export interface Detail {
  vehicle_detail: VehicleDetail
  vehicle_owner_documents: VehicleOwnerDocuments
  vehicle_pictures: VehiclePictures
}

export interface VehicleDetail {
  vehicle_type_id: number
  vehicle_type_name: string
  plate_no: string
  plate_province: string
  brand: string
  weight: number
  color: string
  kingpin_distance: number
  width: number
  length: number
  height: number
  registration_document_url: string
}

export interface VehicleOwnerDocuments {
  owner_document_url: string
  employment_contact_url: string
  buyer_contact_url: string
  assignment_contact_url: string
}

export interface VehiclePictures {
  front_rear_url: string
  side_rear_url: string
  back_rear_url: string
}

export interface DetailForRouteEstimation {
  towing_vehicle_detail: Detail;
  semi_trailer_vehicle_detail: Detail;
  etc_vehicle_detail: Detail;
}