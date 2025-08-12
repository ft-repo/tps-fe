
import ApiService from "../ApiService"

export const getUser = async () => {
  return ApiService.fetchData<any>({
    url: '/client/user/me',
    method: 'get',
  })
}

export const putUser = async (data: any) => {
  return ApiService.fetchData<any>({
    url: `/client/user/me`,
    method: 'post',
    data: { ...data }
  })
}

// export const postUser = async (data: APIPostBody) => {
//   return ApiService.fetchData<any, APIPostBody>({
//     url: '/client/vehicle',
//     method: 'post',
//     // data = body
//     data: { ...data }
//   })
// }