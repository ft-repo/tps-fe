import { GetEstimateDetailParams, GetPetitionDetailParams, GetPetitionParams, PetitionExtendedPostBody, PetitionPostBody } from "@/@types/services/petition"
import ApiService from "../ApiService"
import { AdminPetitionData, AdminPetitionExtendedData } from "@/@types/reducer/petition"

export const getAdminPetitionAPI = async (params: GetPetitionParams) => {
  return ApiService.fetchData<AdminPetitionData>({
    url: '/admin/petition',
    method: 'get',
    // params = query/parameter
    params: { ...params }
  })
}

export const getAdminPetitionExtendedAPI = async (params: GetPetitionParams) => {
  return ApiService.fetchData<AdminPetitionExtendedData>({
    url: '/admin/petition_extended',
    method: 'get',
    // params = query/parameter
    params: { ...params }
  })
}

export const postPetitionApproveAPI = async (data: PetitionPostBody) => {
  return ApiService.fetchData<PetitionPostBody>({
    url: '/admin/petition/approve',
    method: 'post',
    data: { ...data }
  })
}

export const postPetitionExtendedApproveAPI = async (data: PetitionExtendedPostBody) => {
  return ApiService.fetchData<PetitionExtendedPostBody>({
    url: '/admin/petition_extended/approve',
    method: 'post',
    data: { ...data }
  })
}

export const getPetitionDocumentAPI = async (params: GetPetitionDetailParams) => {
  return ApiService.fetchData<any, GetPetitionDetailParams>({
    url: '/admin/petition/documents',
    method: 'get',
    params: { ...params }
  })
}

export const getPetitionEstimateRouteAPI = async (params: GetPetitionDetailParams) => {
  return ApiService.fetchData<any, GetPetitionDetailParams>({
    url: '/admin/petition/estimate',
    method: 'get',
    params: { ...params }
  })
}

export const getPetitionEstimateSummaryAPI = async (params: GetEstimateDetailParams) => {
  return ApiService.fetchData<any, GetEstimateDetailParams>({
    url: '/admin/petition/estimate/summary',
    method: 'get',
    params: { ...params }
  })
}

export const getPetitionEstimateBridgeAPI = async (params: GetEstimateDetailParams) => {
  return ApiService.fetchData<any, GetEstimateDetailParams>({
    url: '/admin/petition/estimate/bridges',
    method: 'get',
    params: { ...params }
  })
}

export const getPetitionEstimateTurnRadiusAPI = async (params: GetEstimateDetailParams) => {
  return ApiService.fetchData<any, GetEstimateDetailParams>({
    url: '/admin/petition/estimate/turn_radius',
    method: 'get',
    params: { ...params }
  })
}

export const getPetitionVehicleAPI = async (params: GetPetitionDetailParams) => {
  return ApiService.fetchData<any, GetPetitionDetailParams>({
    url: '/admin/petition/vehicle',
    method: 'get',
    params: { ...params }
  })
}

