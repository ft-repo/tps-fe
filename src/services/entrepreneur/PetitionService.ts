import { GetPetitionParams, GetPetitionResponse } from "@/@types/services/petition"
import ApiService from "../ApiService"

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

export const getPetitionAdminAPI = async (params: GetPetitionParams) => {
  return ApiService.fetchData<GetPetitionResponse>({
    url: '/admin/petition',
    method: 'get',
    params: { 
      ...params,
    is_finish: true,
   }
  })
}
