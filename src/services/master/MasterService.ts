/* eslint-disable @typescript-eslint/no-explicit-any */
import ApiService from "../ApiService"

export type TestAPIResponse = APIResponse[];

export interface APIResponse {
  id: string;
  name: string;
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