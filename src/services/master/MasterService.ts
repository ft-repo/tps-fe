/* eslint-disable @typescript-eslint/no-explicit-any */
import ApiService from "../ApiService"

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