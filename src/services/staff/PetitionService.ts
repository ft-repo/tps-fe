import { GetPetitionParams, PetitionExtendedPostBody, PetitionPostBody } from "@/@types/services/petition"
import ApiService from "../ApiService"
import { AdminPetitionData } from "@/@types/reducer/petition"

export const getAdminPetitionAPI = async (params: GetPetitionParams) => {
  return ApiService.fetchData<AdminPetitionData>({
    url: '/admin/petition',
    method: 'get',
    // params = query/parameter
    params: { ...params }
  })
}

export const getAdminPetitionExtendedAPI = async (params: GetPetitionParams) => {
  return ApiService.fetchData<AdminPetitionData>({
    url: '/admin/petition_extended',
    method: 'get',
    // params = query/parameter
    params: { ...params }
  })
}

export const postPetitionApprove = async (data: PetitionPostBody) => {
  return ApiService.fetchData<PetitionPostBody>({
    url: '/admin/petition/approve',
    method: 'post',
    data: { ...data }
  })
}

export const postPetitionExtendedApprove = async (data: PetitionExtendedPostBody) => {
  return ApiService.fetchData<PetitionExtendedPostBody>({
    url: '/admin/petition_extended/approve',
    method: 'post',
    data: { ...data }
  })
}