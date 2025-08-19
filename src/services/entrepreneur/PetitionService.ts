import { GetPetitionParams, GetPetitionResponse } from "@/@types/services/petition"
import ApiService from "../ApiService"
import { UploadRequest, UploadResponse } from "@/@types/shared"

export const getPetitionAPI = async (params: GetPetitionParams) => {
  return ApiService.fetchData<GetPetitionResponse>({
    url: '/client/petition',
    method: 'get',
    // params = query/parameter
    params: { ...params }
  })
}

export const getPetitionExtendedAPI = async (params: GetPetitionParams) => {
  return ApiService.fetchData<GetPetitionResponse>({
    url: '/client/petition_extended',
    method: 'get',
    // params = query/parameter
    params: { ...params }
  })
}

export const postUploadFileAPI = async (data: UploadRequest) => {
  return ApiService.fetchData<UploadResponse, UploadRequest>({
    url: '/upload/permit_document',
    method: 'post',
    data: { ...data },
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}