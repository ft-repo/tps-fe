import { RouteDirectionResponse } from '@/@types/shared'
import axios, { AxiosResponse, AxiosError, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios'

export interface RouteDirectionRequest {
  coordinates: number[][],
  radiuses?: number[],
  geometry?: boolean,
  max_speed?: number,
}

const AxiosSetting = axios.create({
	timeout: 60000,
	baseURL: import.meta.env.VITE_API_ROUTE_DIRECTION_URL,
})

AxiosSetting.interceptors.request.use(
	(config: InternalAxiosRequestConfig<any>) => {
		const accessToken = import.meta.env.VITE_API_ROUTE_DIRECTION_KEY

		if (accessToken) {
			config.headers['Authorization'] = `${accessToken}`
		}

		return config
	},
	(error: any) => {
		return Promise.reject(error)
	},
)

const FetchApi = {
	fetchData<Response = unknown, Request = Record<string, unknown>>(
		param: AxiosRequestConfig<Request>,
	) {
		return new Promise<AxiosResponse<Response>>((resolve, reject) => {
			AxiosSetting(param)
				.then((response: AxiosResponse<Response>) => {
					resolve(response)
				})
				.catch((errors: AxiosError) => {
					reject(errors)
				})
		})
	},
}

export const getRouteDirection = (data: RouteDirectionRequest) => {
  return FetchApi.fetchData<RouteDirectionResponse, RouteDirectionRequest>({
    url: '/v2/directions/driving-hgv/geojson',
    method: 'post',
    data,
  })
}