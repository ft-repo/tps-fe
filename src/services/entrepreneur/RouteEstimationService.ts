import { RouteBridgeResponse, RouteCurveResponse, RouteEstimationDetailResponse, RouteEstimationRequest, RouteEstimationResponse, RouteEstimationSummaryResponse } from "@/@types/entrepreneur/route-estimation"
import ApiService from "../ApiService"

export async function postRouteEstimationStep1API(data: RouteEstimationRequest) {
  console.log('data ======> ', data)
  return ApiService.fetchData<RouteEstimationResponse>({
    url: '/client/estimate',
    method: 'post',
    data,
  })
}

export async function getRouteEstimationDetailAPI(estimate_id: string) {
  return ApiService.fetchData<RouteEstimationDetailResponse>({
    url: `/client/estimate/detail`,
    method: 'get',
    params: {
      estimate_id,
    },
  })
}

export async function getRouteEstimationSummaryAPI(estimate_id: string) {
  return ApiService.fetchData<RouteEstimationSummaryResponse>({
    url: `/client/estimate/summary`,
    method: 'get',
    params: {
      estimate_id,
    },
  })
}

export async function getRouteEstimationCurveAPI(estimate_id: string) {
  return ApiService.fetchData<RouteCurveResponse>({
    url: `/client/estimate/turn_radius`,
    method: 'get',
    params: {
      estimate_id,
      page: 1,
      limit: 100,
    },
  })
}

export async function getRouteEstimationBridgeAPI(estimate_id: string) {
  return ApiService.fetchData<RouteBridgeResponse>({
    url: `/client/estimate/bridges`,
    method: 'get',
    params: {
      estimate_id,
      page: 1,
      limit: 100,
    },
  })
}