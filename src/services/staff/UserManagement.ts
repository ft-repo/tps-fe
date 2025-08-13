import ApiService from '@/services/ApiService'
import { ClientListsResponse, DeleteClientListsResponse, StaffListsResponse } from '@/@types/staff/user-info'

export interface UserListsParams {
  limit: number
  page: number
  search: string
}

export const getClientLists = async (params: UserListsParams) => {
  const { limit = 10, page = 1, search = '' } = params

  const response = await ApiService.fetchData<ClientListsResponse>({
    url: '/admin/manage/user',
    method: 'GET',
    params: {
      limit,
      page,
      search,
    },
  })
  return response.data
}

export const deleteClientLists = async (id: string | number) => {
  const response = await ApiService.fetchData<DeleteClientListsResponse>({
    url: `/admin/manage/user/${id}`,
    method: 'DELETE',
  })
  return response
}

export const getStaffLists = async (params: UserListsParams) => {
  const { limit = 10, page = 1, search = '' } = params

  const response = await ApiService.fetchData<StaffListsResponse>({
    url: '/admin/manage/admin',
    method: 'GET',
    params: {
      limit,
      page,
      search,
    },
  })
  return response.data
}