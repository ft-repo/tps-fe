/* eslint-disable @typescript-eslint/no-explicit-any */
import { DepartmentState, RoleState } from "@/@types/shared";
import ApiService from "../ApiService"
import { NotificationPagination } from "@/@types/reducer/petition";
import { VehiclePictures } from "@/@types/reducer/vehicle";

export type ProvinceAPI = ProvinceAPIResponse[];
export type SubDistrictAPI = SubDistrictAPIResponse[];
export type TestAPIResponse = APIResponse[];

export interface APIResponse {
  id: string;
  name: string;
}

export interface ProvinceAPIResponse {
  id: string;
  name_th: string;
  name_en: string;
}

export interface SubDistrictAPIResponse {
  id: string;
  name_th: string;
  name_en: string;
  zip_code: string;
}

export interface VehicleSelectionRequest {
  page: number;
  limit: number;
  search: string;
  vehicle_type_id: string | number;
}

export interface VehicleSelectionResponse {
  data: VehicleList[];
  pagination: NotificationPagination;
}

export interface VehicleList {
  vehicle_detail: VehicleDetail
  vehicle_pictures: VehiclePictures;
}

export interface VehicleDetail {
  id: number
  vehicle_type_name: string
  plate_no: string
  plate_province: string
  weight: number
  width: number
  length: number
  height: number
  axis_number: number
}

export interface RegionParams {
  province_id?: string | number | null;
  district_id?: string | number | null;
  sub_district_id?: string | number | null;
}

export const getEntityAPI = async () => {
  return ApiService.fetchData<APIResponse[]>({
    url: '/lists/entity',
    method: 'get',
  })
}

export const getContactTypeAPI = async () => {
  return ApiService.fetchData<TestAPIResponse>({
    url: '/lists/contact_type',
    method: 'get',
  })
}

export const getVechicleTypeAPI = async () => {
  return ApiService.fetchData<TestAPIResponse>({
    url: '/lists/vehicle_type',
    method: 'get',
  })
}

export const getProvinceAPI = async (provinceId?: string, districtId?: string, subDistrictId?: string) => {
  return ApiService.fetchData<ProvinceAPI>({
    url: `/th/provinces?province_id=${provinceId}&district_id=${districtId}&sub_district_id=${subDistrictId}`,
    method: 'get',
  })
}

// ดึงข้อมูลอำเภอตามจังหวัด จะต้องส่ง province_id เข้าไป
export const getDistrictAPI = async (provinceId?: string, districtId?: string, subDistrictId?: string) => {
  return ApiService.fetchData<ProvinceAPI>({
    url: `/th/districts?province_id=${provinceId}&district_id=${districtId}&sub_district_id=${subDistrictId}`,
    method: 'get',
  })
}

export const getSubDistrictAPI = async (provinceId?: string, districtId?: string, subDistrictId?: string) => {
  return ApiService.fetchData<SubDistrictAPI>({
    url: `/th/subdistricts?province_id=${provinceId}&district_id=${districtId}&sub_district_id=${subDistrictId}`,
    method: 'get',
  })
}

export const getEntityTypeAPI = async () => {
  return ApiService.fetchData<TestAPIResponse>({
    url: '/lists/entity',
    method: 'get',
  })
}

export const getDepartmentAPI = async () => {
  return ApiService.fetchData<DepartmentState[]>({
    url: '/lists/department',
    method: 'get',
  })
}

export const getRoleAPI = async () => {
  return ApiService.fetchData<RoleState[]>({
    url: '/lists/role',
    method: 'get',
  })
}

export const getVehicleSelectionAPI = async (params: VehicleSelectionRequest) => {
  return ApiService.fetchData<VehicleSelectionResponse, VehicleSelectionRequest>({
    url: `/client/vehicle/selection`,
    method: 'get',
    params: { ...params }
  })
}

// NEW PROVINCE
export const getNewProvinceAPI = async (params: RegionParams) => {
  return ApiService.fetchData<ProvinceAPIResponse[], RegionParams>({
    url: `/th/provinces`,
    method: 'get',
    params: { ...params }
  })
}

// NEW DISTRICT
export const getNewDistrictAPI = async (params: RegionParams) => {
  return ApiService.fetchData<ProvinceAPIResponse[], RegionParams>({
    url: `/th/districts`,
    method: 'get',
    params: { ...params }
  })
}

// NEW SUB DISTRICT
export const getNewSubDistrictAPI = async (params: RegionParams) => {
  return ApiService.fetchData<SubDistrictAPIResponse[], RegionParams>({
    url: `/th/subdistricts`,
    method: 'get',
    params: { ...params }
  })
}