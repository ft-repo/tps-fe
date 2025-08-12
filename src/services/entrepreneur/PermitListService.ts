import ApiService from "@/services/ApiService"
import type {
    PetitionListResponse,
    Petition,
    PermitListParams,
} from "@/@types/entrepreneur/permit-list"

// Accept legacy second arg but ignore it
export const getPermitList = (params: PermitListParams = {}) =>
    ApiService.fetchData<PetitionListResponse>({
        
            url: "/client/petition",
            method: "get",
            params: {
                params: { ...params }
            },
        })

export const getPermitById = (id: number | string) =>
    ApiService.fetchData<{ data: Petition }>({
        url: `/client/petition/${id}`,
        method: "get",
    })

// Default export + legacy aliases for backward compatibility
const PermitListService = { getPermitList, getPermitById }
export default PermitListService
