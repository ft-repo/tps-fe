import { GetEstimateDetailParams, GetEstimateParams, GetPetitionDetailParams, GetPetitionParams, GetPetitionResponse, GetRuralRoadParams, PetitionConfirmRequest, PetitionConfirmResponse, PetitionDetailDocumentResponse, PetitionDetailVehicleResponse, PetitionDocumentRequest, PetitionDocumentResponse, PetitionEstimateRequest, PetitionEstimateResponse, PetitionExtendedDocumentPostRequest, PetitionExtendedMessageResponse, PetitionExtendedPostRequest, PetitionExtendedPostResponse, PetitionHoldRequest, PetitionHoldResponse, PetitionMessageRequest, PetitionMessageResponse, PetitionRoadMapRequest, PetitionRoadMapResponse, PetitionVehicleRequest, PetitionVehicleResponse, PostConfirmPetitionRoadMapRequest, PostConfirmPetitionRoadMapResponse, PostPetitionRoadMapRequest, PostPetitionRoadMapResponse } from "@/@types/services/petition"
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

export const getPetitionMessageAPI = async (params: PetitionMessageRequest) => {
  return ApiService.fetchData<PetitionMessageResponse, PetitionMessageRequest>({
    url: '/client/petition/status/message',
    method: 'get',
    params: { ...params }
  })
}

export const getPetitionExtendedMessageAPI = async (params: PetitionMessageRequest) => {
  return ApiService.fetchData<PetitionExtendedMessageResponse, PetitionMessageRequest>({
    url: '/client/petition_extended/status/message',
    method: 'get',
    params: { ...params }
  })
}

export const getPetitionDetailDocumentAPI = async (params: GetPetitionDetailParams) => {
  return ApiService.fetchData<PetitionDetailDocumentResponse, GetPetitionDetailParams>({
    url: '/client/petition/documents',
    method: 'GET',
    params: { ...params }
  })
}

export const getPetitionDetailVehicleAPI = async (params: GetPetitionDetailParams) => {
  return ApiService.fetchData<PetitionDetailVehicleResponse, GetPetitionDetailParams>({
    url: '/client/petition/vehicle',
    method: 'GET',
    params: { ...params }
  })
}

export const patchPetitionHoldAPI = async (data: PetitionHoldRequest) => {
  return ApiService.fetchData<PetitionHoldResponse, PetitionHoldRequest>({
    url: '/client/petition/hold_date',
    method: 'PATCH',
    data: { ...data },
  })
}

export const putPetitionDocumentAPI = async (data: PetitionDocumentRequest) => {
  return ApiService.fetchData<PetitionDocumentResponse, PetitionDocumentRequest>({
    url: '/client/petition/documents',
    method: 'PUT',
    data: { ...data },
  })
}

export const putPetitionVehicleAPI = async (data: PetitionVehicleRequest) => {
  return ApiService.fetchData<PetitionVehicleResponse, PetitionVehicleRequest>({
    url: '/client/petition/vehicle',
    method: 'PUT',
    data: { ...data },
  })
}

export const getPetitionRoadMapAPI = async (params: PetitionRoadMapRequest) => {
  return ApiService.fetchData<PetitionRoadMapResponse, PetitionRoadMapRequest>({
    url: '/client/petition/road_map',
    method: 'GET',
    params: { ...params }
  })
}

export const postPetitionRoadMapAPI = async (data: PostPetitionRoadMapRequest) => {
  return ApiService.fetchData<PostPetitionRoadMapResponse, PostPetitionRoadMapRequest>({
    url: '/client/petition/road_map',
    method: 'POST',
    data: { ...data }
  })
}

export const postConfirmPetitionRoadMapAPI = async (data: PostConfirmPetitionRoadMapRequest) => {
  return ApiService.fetchData<PostConfirmPetitionRoadMapResponse, PostConfirmPetitionRoadMapRequest>({
    url: '/client/petition/road_map/confirm',
    method: 'POST',
    data: { ...data }
  })
}