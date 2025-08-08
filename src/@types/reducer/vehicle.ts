// REDUCER
export interface VehicleListState {
  overview: Overview;
  detail: Detail;
}

export interface Overview {
  search: Search;
  data: Data;
}

export interface Search {
  vehicle_type_id: string | number | null | any;
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

export interface Detail { }