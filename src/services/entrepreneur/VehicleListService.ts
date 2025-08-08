/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  APIPostBody,
  GetVehicleListParams,
  UploadRequest,
  UploadResponse,
  VehicleListResponse
} from "@/@types/services/vehicle";
import ApiService from "../ApiService"

export const getVehicleList = async (params: GetVehicleListParams) => {
  return ApiService.fetchData<VehicleListResponse>({
    url: 'client/vehicle',
    method: 'get',
    // params = query/parameter
    params: { ...params }
  })
}

export const getVehicleListByID = async (id: number | string | null | any) => {
  return ApiService.fetchData<VehicleListResponse>({
    url: `client/vehicle/${id}`,
    method: 'get',
    // params = query/parameter
  })
}

export const postVehicleList = async (data: APIPostBody) => {
  return ApiService.fetchData<any>({
    url: 'client/vehicle',
    method: 'post',
    // data = body
    data: { ...data }
  })
}

export const postUploadFile = async (data: any) => {
  return ApiService.fetchData<UploadResponse, UploadRequest>({
    url: '/upload/business_certificate',
    method: 'post',
    data: { ...data },
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const postUploadImage = async (data: any) => {
  return ApiService.fetchData<UploadResponse, UploadRequest>({
    url: '/upload/business_picture',
    method: 'post',
    data: { ...data },
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}