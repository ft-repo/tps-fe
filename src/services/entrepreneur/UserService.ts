
import { APIChangePasswordBody, APIPutBody } from "@/@types/entrepreneur/executive-data"
import ApiService from "../ApiService"
import { UserState } from "@/@types/reducer/user"

export const getUserAPI = async () => {
  return ApiService.fetchData<UserState, any>({
    url: '/client/user/me',
    method: 'get',
  })
}

export const putUserAPI = async (data: APIPutBody) => {
  return ApiService.fetchData<any, APIPutBody>({
    url: `/client/user/me`,
    method: 'put',
    data: { ...data }
  })
}

export const putChangePassword = async (data: APIChangePasswordBody) => {
  return ApiService.fetchData<any, APIChangePasswordBody>({
    url: `/client/user/me/password`,
    method: 'put',
    data: { ...data }
  })
}