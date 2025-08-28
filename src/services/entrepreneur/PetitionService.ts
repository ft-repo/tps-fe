import { GetEstimateDetailParams, GetEstimateParams, GetPetitionParams, GetPetitionResponse, GetRuralRoadParams, PetitionConfirmRequest, PetitionConfirmResponse, PetitionEstimateRequest, PetitionEstimateResponse, PetitionExtendedDocumentPostRequest, PetitionExtendedPostRequest, PetitionExtendedPostResponse } from "@/@types/services/petition"
import ApiService from "../ApiService"
import { UploadRequest, UploadResponse } from "@/@types/shared"
import { RoadInfo } from "@/features/entrepreneur/permit-list/overview/components/ModalRuralRoadDetails"
import { ClientEstimateDetail, EstimateBridgeDetailData, EstimateTurnRadiusDetailData, SummaryTableData } from "@/@types/reducer/petition"

export const getPetitionAPI = async (params: GetPetitionParams) => {
  return ApiService.fetchData<GetPetitionResponse>({
    url: '/client/petition',
    method: 'get',
    // params = query/parameter
    params: { ...params }
  })
}

export const getPetitionExtendedAPI = async (params: GetPetitionParams) => {
  return ApiService.fetchData<any, GetPetitionParams>({
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

export const postPetitionExtendedAPI = async (data: PetitionExtendedPostRequest) => {
  return ApiService.fetchData<PetitionExtendedPostResponse, PetitionExtendedPostRequest>({
    url: '/client/petition_extended/temporary',
    method: 'post',
    data: { ...data },
  })
}

export const postConfirmPetitionExtendedAPI = async (id: string, data: PetitionExtendedDocumentPostRequest) => {
  return ApiService.fetchData<any, PetitionExtendedDocumentPostRequest>({
    url: `/client/petition_extended/confirm/${id}`,
    method: 'post',
    data: { ...data },
  })
}

// PETITION EXTENDED
export const postUploadPermitDocumentAPI = async (data: UploadRequest) => {
  return ApiService.fetchData<UploadResponse, UploadRequest>({
    url: '/upload/permit_document',
    method: 'post',
    data: { ...data },
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const postUploadVehicleOwnerDocumentAPI = async (data: UploadRequest) => {
  return ApiService.fetchData<UploadResponse, UploadRequest>({
    url: '/upload/vehicle_owner_document',
    method: 'post',
    data: { ...data },
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const postUploadVehicleRegistrationDocumentAPI = async (data: UploadRequest) => {
  return ApiService.fetchData<UploadResponse, UploadRequest>({
    url: '/upload/vehicle_registration_document',
    method: 'post',
    data: { ...data },
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const postUploadSignedDocumentAPI = async (data: UploadRequest) => {
  return ApiService.fetchData<UploadResponse, UploadRequest>({
    url: '/upload/signed_document',
    method: 'post',
    data: { ...data },
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const postPetitionEstimateAPI = async (data: PetitionEstimateRequest) => {
  return ApiService.fetchData<PetitionEstimateResponse, PetitionEstimateRequest>({
    url: '/client/estimate',
    method: 'post',
    data: { ...data },
  })
}

export const getPetitionEstimateDetailAPI = async (params: GetEstimateParams) => {
  return ApiService.fetchData<ClientEstimateDetail, GetEstimateParams>({
    url: '/client/estimate/details',
    method: 'get',
    params: { ...params }
  })
}

export const getPetitionEstimateSummaryAPI = async (params: GetEstimateParams) => {
  return ApiService.fetchData<SummaryTableData[], GetEstimateParams>({
    url: '/client/estimate/summary',
    method: 'get',
    params: { ...params }
  })
}

export const getPetitionEstimateBridgeAPI = async (params: GetEstimateDetailParams) => {
  return ApiService.fetchData<EstimateBridgeDetailData, GetEstimateDetailParams>({
    url: '/client/estimate/bridges',
    method: 'get',
    params: { ...params }
  })
}

export const getPetitionEstimateTurnRadiusAPI = async (params: GetEstimateDetailParams) => {
  return ApiService.fetchData<EstimateTurnRadiusDetailData, GetEstimateDetailParams>({
    url: '/client/estimate/turn_radius',
    method: 'get',
    params: { ...params }
  })
}

export const postConfirmPetitionAPI = async (data: PetitionConfirmRequest) => {
  return ApiService.fetchData<PetitionConfirmResponse, PetitionConfirmRequest>({
    url: `/client/estimate/petition`,
    method: 'post',
    data: { ...data },
  })
}