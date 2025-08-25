import { GetPetitionParams, GetPetitionResponse, GetRuralRoadParams } from "@/@types/services/petition"
import ApiService from "../ApiService"
import { UploadRequest, UploadResponse } from "@/@types/shared"
import { RoadInfo } from "@/features/entrepreneur/permit-list/overview/components/ModalRuralRoadDetails"

export const getPetitionAPI = async (params: GetPetitionParams) => {
  return ApiService.fetchData<GetPetitionResponse>({
    url: '/client/petition',
    method: 'get',
    // params = query/parameter
    params: { ...params }
  })
}

export const getPetitionExtendedAPI = async (params: GetPetitionParams) => {
  return ApiService.fetchData<GetPetitionResponse, GetPetitionParams>({
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

export const getRuralRoadDetailAPI = async (params: GetRuralRoadParams) => {
  return ApiService.fetchData<RoadInfo[], GetRuralRoadParams>({
    url: '/lists/rural_road_details',
    method: 'get',
    // params = query/parameter
    params: { ...params }
  })
}
