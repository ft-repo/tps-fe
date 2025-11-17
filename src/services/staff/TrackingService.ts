import ApiService from "../ApiService"
import { ProjectParams, TrackingBusiness, TrackingBusinessDetail, TrackingOverviewData, TrackingOverviewSearch } from "@/store/slices/staff/trackingSlice"

export const getTrackingAPI = async (params: TrackingOverviewSearch) => {
  return ApiService.fetchData<TrackingOverviewData, TrackingOverviewSearch>({
    url: '/admin/gps',
    method: 'get',
    params: { ...params }
  })
}

export const getGPSBusinessAPI = async (id: string) => {
  return ApiService.fetchData<TrackingBusiness>({
    url: `/admin/gps/${id}`,
    method: 'get',
  })
}

export const getGPSBusinessDetailAPI = async (params: ProjectParams) => {
  return ApiService.fetchData<TrackingBusinessDetail>({
    url: `/admin/gps/${params.business_id}/${params.project_id}`,
    method: 'get',
  })
}