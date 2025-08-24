import { RouteEstimationRequest, RouteEstimationResponse } from "@/@types/entrepreneur/route-estimation"
import ApiService from "../ApiService"

export async function postRouteEstimationStep1API(data: RouteEstimationRequest) {
  console.log('data ======> ', data)
  return ApiService.fetchData<RouteEstimationResponse>({
    url: '/client/estimate',
    method: 'post',
    data,
  })
}