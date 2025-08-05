import BaseService from './BaseService'
import type { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'

const ApiService = {
	fetchData<Response = unknown, Request = Record<string, unknown>>(
		param: AxiosRequestConfig<Request>,
	) {
		return new Promise<AxiosResponse<Response>>((resolve, reject) => {
			BaseService({
				...param,
				headers: {
					"x-api-key": import.meta.env.VITE_API_KEY
				}
			})
				.then((response: AxiosResponse<Response>) => {
					resolve(response)
				})
				.catch((errors: AxiosError) => {
					reject(errors)
				})
		})
	},
}

export default ApiService
