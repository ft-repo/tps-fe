// src/services/admin/PetitionExtendedService.ts
import ApiService from "@/services/ApiService"

export interface PetitionExtendedFlowItem {
    id: number
    petition_exid: number
    status_id: number
    is_approved: boolean
    created_at: string
    // ...other fields omitted
    status?: { status_name: string }
}

export interface PetitionExtendedItem {
    id: number
    status_id: number
    cert_date: string | null
    created_at: string
    status?: { status_name: string }
    petition_extended_flow: PetitionExtendedFlowItem[]
    user_created?: {
        id: string
        registration_no: string
        created_at: string
        business_details?: {
            entity_type_id: number
            business_name: string
        }
    }
}

export interface PetitionExtendedListResponse {
    data: PetitionExtendedItem[]
    total: number
    page: number
    limit: number
    total_pages: number
}

export interface PetitionExtendedListParams {
    page?: number
    limit?: number
    search?: string
}

export const getPetitionExtendedList = (params: PetitionExtendedListParams = {}) =>
    ApiService.fetchData<PetitionExtendedListResponse>({
        url: "/client/petition_extended",
        method: "get",
        params: {
            page: params.page ?? 1,
            limit: params.limit ?? 10,
            search: params.search ?? "",
        },
    })

const PetitionExtendedService = { getPetitionExtendedList }
export default PetitionExtendedService
