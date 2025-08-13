/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  APIPostBody,
  GetVehicleListParams,
  UploadRequest,
  UploadResponse,
  VehicleListByIDResponse,
  VehicleListResponse
} from "@/@types/services/vehicle";
import ApiService from "../ApiService"

export const getVehicleAPI = async (params: GetVehicleListParams) => {
  return ApiService.fetchData<VehicleListResponse>({
    url: '/client/vehicle',
    method: 'get',
    // params = query/parameter
    params: { ...params }
  })
}

export const getVehicleByIDAPI = async (id: number | string | null | any) => {
  return ApiService.fetchData<VehicleListByIDResponse>({
    url: `/client/vehicle/${id}`,
    method: 'get',
    // params = query/parameter
  })
}

export const postVehicleAPI = async (data: APIPostBody) => {
  return ApiService.fetchData<any, APIPostBody>({
    url: '/client/vehicle',
    method: 'post',
    // data = body
    data: { ...data }
  })
}

export const putVehicleAPI = async (id: string | number, data: APIPostBody) => {
  return ApiService.fetchData<any, APIPostBody>({
    url: `/client/vehicle/${id}`,
    method: 'put',
    // data = body
    data: { ...data }
  })
}

export const deleteVehicleAPI = async (id: string | number) => {
    return ApiService.fetchData({
    url: `/client/vehicle/${id}`,
    method: 'delete',
  })
}

export const postUploadFileAPI = async (data: UploadRequest) => {
  return ApiService.fetchData<UploadResponse, UploadRequest>({
    url: '/upload/business_certificate',
    method: 'post',
    data: { ...data },
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const postUploadImageAPI = async (data: any) => {
  return ApiService.fetchData<UploadResponse, UploadRequest>({
    url: '/upload/business_picture',
    method: 'post',
    data: { ...data },
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const getUploadAPI = async (params: string) => {
  return ApiService.fetchData<File>({
    url: `/upload/${params}`,
    method: 'get',
    responseType: 'blob'
  })
}