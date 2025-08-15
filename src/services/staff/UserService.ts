import { ClientList, ClientListsResponse, DeleteAdminListsResponse, DeleteClientListsResponse, GetAdminParams, GetClientParams, GetLDAPParams, StaffListsResponse } from "@/@types/services/user"
import ApiService from "../ApiService"

export const getClientUserAPI = async (params: GetClientParams) => {
  return ApiService.fetchData<ClientListsResponse, GetClientParams>({
    url: `/admin/manage/user`,
    method: 'get',
    params: { ...params }
  })
}

export const getClientDetailAPI = async (id: string | number) => {
  return ApiService.fetchData<ClientList>({
    url: `/admin/manage/user/${id}`,
    method: 'get',
  })
}

export const getAdminUserAPI = async (params: GetAdminParams) => {
  return ApiService.fetchData<StaffListsResponse, GetAdminParams>({
    url: `/admin/manage/admin`,
    method: 'get',
    params: { ...params }
  })
}

export const deleteClientAPI = async (id: string | number) => {
  return ApiService.fetchData<DeleteClientListsResponse>({
    url: `/admin/manage/user/${id}`,
    method: 'delete',
  })
}

export const deleteStaffAPI = async (id: string | number) => {
  return ApiService.fetchData<DeleteAdminListsResponse>({
    url: `/admin/manage/admin/${id}`,
    method: 'delete',
  })
}

export const getLDAPUserAPI = async (params: GetLDAPParams) => {
  return ApiService.fetchData<any, GetLDAPParams>({
    url: `/admin/manage/admin/ldap`,
    method: 'get',
    params: { ...params }
  })
} 