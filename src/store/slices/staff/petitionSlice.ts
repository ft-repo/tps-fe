import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { SLICE_BASE_NAME } from './constants'
import { PetitionAdminState } from '@/@types/reducer/petition'
import { getAdminPetitionAPI, getAdminPetitionExtendedAPI, getPetitionCountAPI, getPetitionDocumentAPI, getPetitionEstimateBridgeAPI, getPetitionEstimateRouteAPI, getPetitionEstimateSummaryAPI, getPetitionEstimateTurnRadiusAPI, getPetitionExtendedCountAPI, getPetitionExtendedDetailAPI, getPetitionExtendedStatusAPI, getPetitionNotificationAPI, getPetitionStatusAPI, getPetitionVehicleAPI } from '@/services/staff/PetitionService'
import { GetEstimateDetailParams, GetPetitionDetailParams, GetPetitionExtendedDetailParams, GetPetitionParams } from '@/@types/services/petition'
import { GetPaginateParams } from '@/@types/shared'

const initialState: PetitionAdminState = {
  petition: {
    overview: {
      search: {
        search: '',
        is_finish: false,
        status_id: '',
        page: 1,
        limit: 10
      },
      data: {
        data: [],
        page: 1,
        limit: 10,
        total_pages: 0,
        total: 0,
      }
    },
    detail: {
      document: {
        petition_id: 0,
        business_name: '',
        entity_type: '',
        address: '',
        business_phone_no: '',
        contact_name: '',
        contact_phone_no: '',
        project_name: '',
        petition_type: '',
        start_date: '',
        end_date: '',
        start_point: '',
        end_point: '',
        poa_url: '',
        mach_book_url: '',
        registration_no: '',
        is_personal: false
      },
      estimate: {
        route: {
          petition_id: 0,
          vehicle_route: [],
          estimate: [],
          estimate_rural_roads: [],
          start_point: '',
          end_point: '',
          start_road_code: '',
          start_road: '',
          end_road_code: '',
          end_road: ''
        },
        summary: {
          search: {
            estimate_id: '',
            page: 1,
            limit: 10
          },
          data: {
            data: [],
            page: 1,
            limit: 10,
            total_pages: 0,
            total: 0,
          }
        },
        bridge: {
          search: {
            estimate_id: '',
            page: 1,
            limit: 10
          },
          data: {
            data: [],
            page: 1,
            limit: 10,
            total_pages: 0,
            total: 0,
          }
        },
        turn_radius: {
          search: {
            estimate_id: '',
            page: 1,
            limit: 10
          },
          data: {
            data: [],
            page: 1,
            limit: 10,
            total_pages: 0,
            total: 0,
          }
        }
      },
      vehicle: {
        petition_id: 0,
        vehicle_list: [],
      }
    }
  },
  petition_extended: {
    overview: {
      search: {
        search: '',
        is_finish: false,
        status_id: '',
        page: 1,
        limit: 10
      },
      data: {
        data: [],
        page: 1,
        limit: 10,
        total_pages: 0,
        total: 0,
      }
    },
    detail: {
      id: 0,
      status_id: 0,
      cert_date: '',
      created_by: '',
      poa_name: '',
      phone_number: '',
      ref_form_no: 0,
      remark: '',
      created_at: '',
      status: {
        status_name: ''
      },
      address: {
        id: 0,
        petition_exid: 0,
        contact_house_number: '',
        contact_village: '',
        contact_lane: '',
        contact_road: '',
        contact_sub_district_id: 0,
        contact_district_id: 0,
        contact_province_id: 0,
        contact_zip_code: '',
        poa_house_number: '',
        poa_village: '',
        poa_lane: '',
        poa_road: '',
        poa_sub_district_id: 0,
        poa_district_id: 0,
        poa_province_id: 0,
        poa_zip_code: '',
        poa_province: {
          id: 0,
          name_en: '',
          name_th: ''
        },
        poa_district: {
          id: 0,
          name_en: '',
          name_th: '',
          province_id: 0
        },
        poa_sub_district: {
          id: 0,
          name_en: '',
          name_th: '',
          province_id: 0,
          district_id: 0,
          zip_code: ''
        },
        contact_province: {
          id: 0,
          name_en: '',
          name_th: ''
        },
        contact_district: {
          id: 0,
          name_en: '',
          name_th: '',
          province_id: 0
        },
        contact_sub_district: {
          id: 0,
          name_en: '',
          name_th: '',
          province_id: 0,
          district_id: 0,
          zip_code: ''
        },
      },
      vehicle: {
        id: 0,
        petition_exid: 0,
        towing_vehicle_id: 0,
        semi_trailer_vehicle_id: 0,
        etc_vehicle_id: 0,
        axis_weight_towing: [],
        axis_weight_semi_trailer: [],
        towing_vehicle: {
          id: 0,
          user_id: '',
          vehicle_type_id: 0,
          plate_no: '',
          plate_province: '',
          brand: '',
          weight: 0,
          color: '',
          kingpin_distance: 0,
          width: 0,
          length: 0,
          height: 0,
          axis_number: 0,
          registration_document_url: '',
        },
        semi_trailer_vehicle: {
          id: 0,
          user_id: '',
          vehicle_type_id: 0,
          plate_no: '',
          plate_province: '',
          brand: '',
          weight: 0,
          color: '',
          kingpin_distance: 0,
          width: 0,
          length: 0,
          height: 0,
          axis_number: 0,
          registration_document_url: '',
        },
        etc_vehicle: []
        // etc_vehicle: {
        //   id: 0,
        //   user_id: '',
        //   vehicle_type_id: 0,
        //   plate_no: '',
        //   plate_province: '',
        //   brand: '',
        //   weight: 0,
        //   color: '',
        //   kingpin_distance: 0,
        //   width: 0,
        //   length: 0,
        //   height: 0,
        //   axis_number: 0,
        //   registration_document_url: '',
        // },
      },
      user_document: {
        id: 0,
        petition_exid: 0,
        cid_url: '',
        company_certificate_url: '',
        vehicle_permit_url: '',
        power_of_attorney_url: '',
      },
      vehicle_document: {
        id: 0,
        petition_exid: 0,
        vehicle_registration_url: '',
        vehicle_photos_url: '',
        vehicle_dimensions_empty_url: '',
        vehicle_dimensions_loaded_url: '',
        prefab_parts_details_url: '',
        vehicle_turning_radius_url: '',
      },
      audit_document: {
        id: 0,
        petition_exid: 0,
        bridge_structure_calculation_url: '',
        road_structure_calculation_url: '',
        bridge_engineer_certificate_url: '',
        road_engineer_certificate_url: '',
        mechanical_engineer_certificate_url: '',
        safety_management_plan_url: '',
        route_map_url: '',
        operation_plan_url: '',
        contact_info_url: '',
      },
      petition_extended_flow: [],
      user_created: {
        id: '',
        registration_no: '',
        created_at: '',
        profile_url: '',
        is_personal: false,
        business_details: {
          business_name: '',
          entity_type_id: 0
        },
        business_address: {
          house_number: '',
          village: '',
          lane: '',
          road: '',
          sub_district_id: 0,
          district_id: 0,
          zip_codes: '',
          province_id: 0,
          phone_number: '',
          province: {
            id: 0,
            name_en: '',
            name_th: '',
          },
          district: {
            id: 0,
            name_en: '',
            name_th: '',
            province_id: 0
          },
          sub_district: {
            id: 0,
            name_en: '',
            name_th: '',
            province_id: 0,
            district_id: 0,
            zip_code: ''
          },
        }
      },
    },
  },
  petition_history: {
    overview: {
      search: {
        search: '',
        is_finish: true,
        status_id: '',
        page: 1,
        limit: 10
      },
      data: {
        data: [],
        page: 1,
        limit: 10,
        total_pages: 0,
        total: 0,
      }
    },
    detail: {
      document: {
        petition_id: 0,
        business_name: '',
        entity_type: '',
        address: '',
        business_phone_no: '',
        contact_name: '',
        contact_phone_no: '',
        project_name: '',
        petition_type: '',
        start_date: '',
        end_date: '',
        start_point: '',
        end_point: '',
        poa_url: '',
        mach_book_url: '',
        registration_no: '',
        is_personal: false
      },
      estimate: {
        route: {
          petition_id: 0,
          vehicle_route: [],
          estimate: [],
          estimate_rural_roads: [],
          start_point: '',
          end_point: '',
          start_road_code: '',
          start_road: '',
          end_road_code: '',
          end_road: ''
        },
        summary: {
          search: {
            estimate_id: '',
            page: 1,
            limit: 10
          },
          data: {
            data: [],
            page: 1,
            limit: 10,
            total_pages: 0,
            total: 0,
          }
        },
        bridge: {
          search: {
            estimate_id: '',
            page: 1,
            limit: 10
          },
          data: {
            data: [],
            page: 1,
            limit: 10,
            total_pages: 0,
            total: 0,
          }
        },
        turn_radius: {
          search: {
            estimate_id: '',
            page: 1,
            limit: 10
          },
          data: {
            data: [],
            page: 1,
            limit: 10,
            total_pages: 0,
            total: 0,
          }
        }
      },
      vehicle: {
        petition_id: 0,
        vehicle_list: [],
      }
    }
  },
  petition_history_extended: {
    overview: {
      search: {
        search: '',
        is_finish: true,
        status_id: '',
        page: 1,
        limit: 10
      },
      data: {
        data: [],
        page: 1,
        limit: 10,
        total_pages: 0,
        total: 0,
      }
    },
    detail: {
      id: 0,
      status_id: 0,
      cert_date: '',
      created_by: '',
      poa_name: '',
      phone_number: '',
      ref_form_no: 0,
      remark: '',
      created_at: '',
      status: {
        status_name: ''
      },
      address: {
        id: 0,
        petition_exid: 0,
        contact_house_number: '',
        contact_village: '',
        contact_lane: '',
        contact_road: '',
        contact_sub_district_id: 0,
        contact_district_id: 0,
        contact_province_id: 0,
        contact_zip_code: '',
        poa_house_number: '',
        poa_village: '',
        poa_lane: '',
        poa_road: '',
        poa_sub_district_id: 0,
        poa_district_id: 0,
        poa_province_id: 0,
        poa_zip_code: '',
        poa_province: {
          id: 0,
          name_en: '',
          name_th: ''
        },
        poa_district: {
          id: 0,
          name_en: '',
          name_th: '',
          province_id: 0
        },
        poa_sub_district: {
          id: 0,
          name_en: '',
          name_th: '',
          province_id: 0,
          district_id: 0,
          zip_code: ''
        },
        contact_province: {
          id: 0,
          name_en: '',
          name_th: ''
        },
        contact_district: {
          id: 0,
          name_en: '',
          name_th: '',
          province_id: 0
        },
        contact_sub_district: {
          id: 0,
          name_en: '',
          name_th: '',
          province_id: 0,
          district_id: 0,
          zip_code: ''
        },
      },
      vehicle: {
        id: 0,
        petition_exid: 0,
        towing_vehicle_id: 0,
        semi_trailer_vehicle_id: 0,
        etc_vehicle_id: 0,
        axis_weight_towing: [],
        axis_weight_semi_trailer: [],
        towing_vehicle: {
          id: 0,
          user_id: '',
          vehicle_type_id: 0,
          plate_no: '',
          plate_province: '',
          brand: '',
          weight: 0,
          color: '',
          kingpin_distance: 0,
          width: 0,
          length: 0,
          height: 0,
          axis_number: 0,
          registration_document_url: '',
        },
        semi_trailer_vehicle: {
          id: 0,
          user_id: '',
          vehicle_type_id: 0,
          plate_no: '',
          plate_province: '',
          brand: '',
          weight: 0,
          color: '',
          kingpin_distance: 0,
          width: 0,
          length: 0,
          height: 0,
          axis_number: 0,
          registration_document_url: '',
        },
        // etc_vehicle: {
        //   id: 0,
        //   user_id: '',
        //   vehicle_type_id: 0,
        //   plate_no: '',
        //   plate_province: '',
        //   brand: '',
        //   weight: 0,
        //   color: '',
        //   kingpin_distance: 0,
        //   width: 0,
        //   length: 0,
        //   height: 0,
        //   axis_number: 0,
        //   registration_document_url: '',
        // },
        etc_vehicle: []
      },
      user_document: {
        id: 0,
        petition_exid: 0,
        cid_url: '',
        company_certificate_url: '',
        vehicle_permit_url: '',
        power_of_attorney_url: '',
      },
      vehicle_document: {
        id: 0,
        petition_exid: 0,
        vehicle_registration_url: '',
        vehicle_photos_url: '',
        vehicle_dimensions_empty_url: '',
        vehicle_dimensions_loaded_url: '',
        prefab_parts_details_url: '',
        vehicle_turning_radius_url: '',
      },
      audit_document: {
        id: 0,
        petition_exid: 0,
        bridge_structure_calculation_url: '',
        road_structure_calculation_url: '',
        bridge_engineer_certificate_url: '',
        road_engineer_certificate_url: '',
        mechanical_engineer_certificate_url: '',
        safety_management_plan_url: '',
        route_map_url: '',
        operation_plan_url: '',
        contact_info_url: '',
      },
      petition_extended_flow: [],
      user_created: {
        id: '',
        registration_no: '',
        created_at: '',
        profile_url: '',
        is_personal: false,
        business_details: {
          business_name: '',
          entity_type_id: 0
        },
        business_address: {
          house_number: '',
          village: '',
          lane: '',
          road: '',
          sub_district_id: 0,
          district_id: 0,
          zip_codes: '',
          province_id: 0,
          phone_number: '',
          province: {
            id: 0,
            name_en: '',
            name_th: '',
          },
          district: {
            id: 0,
            name_en: '',
            name_th: '',
            province_id: 0
          },
          sub_district: {
            id: 0,
            name_en: '',
            name_th: '',
            province_id: 0,
            district_id: 0,
            zip_code: ''
          },
        }
      },
    },
  },
  petition_status: [],
  petition_extended_status: [],
  notification: {
    search: {
      page: 1,
      limit: 10
    },
    data: [],
    pagination: {
      hasMore: false,
      page: 1,
      limit: 10,
      total: 0,
      totalPages: 0,
    }
  },
  petition_count: [],
  petition_extended_count: [],
  loading: false
}

// export const SLICE_NAME = 'yourSliceName';

export const getAdminPetitionData = createAsyncThunk(SLICE_BASE_NAME + '/apiGetAdminPetitionData', async (params: GetPetitionParams) => {
  // assume someService required reesponse & require type as generic
  const response = await getAdminPetitionAPI(params)
  return response.data
})

export const getAdminPetitionExtendedData = createAsyncThunk(SLICE_BASE_NAME + '/apiGetAdminPetitionExtendedData', async (params: GetPetitionParams) => {
  // assume someService required reesponse & require type as generic
  const response = await getAdminPetitionExtendedAPI(params)
  return response.data
})

export const getAdminPetitionHistoryData = createAsyncThunk(SLICE_BASE_NAME + '/apiGetAdminPetitionHistoryData', async (params: GetPetitionParams) => {
  // assume someService required reesponse & require type as generic
  const response = await getAdminPetitionAPI(params)
  return response.data
})

export const getAdminPetitionHistoryExtendedData = createAsyncThunk(SLICE_BASE_NAME + '/apiGetAdminPetitionHistoryExtendedData', async (params: GetPetitionParams) => {
  // assume someService required reesponse & require type as generic
  const response = await getAdminPetitionExtendedAPI(params)
  return response.data
})

export const getPetitionDocument = createAsyncThunk(SLICE_BASE_NAME + '/apiGetPetitionDocument', async (params: GetPetitionDetailParams) => {
  // assume someService required reesponse & require type as generic
  const response = await getPetitionDocumentAPI(params)
  return response.data
})

export const getPetitionEstimateRoute = createAsyncThunk(SLICE_BASE_NAME + '/apiGetPetitionEstimateRoute', async (params: GetPetitionDetailParams) => {
  // assume someService required reesponse & require type as generic
  const response = await getPetitionEstimateRouteAPI(params)
  return response.data
})

export const getPetitionEstimateSummary = createAsyncThunk(SLICE_BASE_NAME + '/apiGetPetitionEstimateSummary', async (params: GetEstimateDetailParams) => {
  // assume someService required reesponse & require type as generic
  const response = await getPetitionEstimateSummaryAPI(params)
  return response.data
})

export const getPetitionEstimateBridge = createAsyncThunk(SLICE_BASE_NAME + '/apiGetPetitionEstimateBridge', async (params: GetEstimateDetailParams) => {
  // assume someService required reesponse & require type as generic
  const response = await getPetitionEstimateBridgeAPI(params)
  return response.data
})

export const getPetitionEstimateTurnRadius = createAsyncThunk(SLICE_BASE_NAME + '/apiGetPetitionEstimateTurnRadius', async (params: GetEstimateDetailParams) => {
  // assume someService required reesponse & require type as generic
  const response = await getPetitionEstimateTurnRadiusAPI(params)
  return response.data
})

export const getPetitionVehicle = createAsyncThunk(SLICE_BASE_NAME + '/apiGetPetitionVehicle', async (params: GetPetitionDetailParams) => {
  // assume someService required reesponse & require type as generic
  const response = await getPetitionVehicleAPI(params)
  return response.data
})

export const getPetitionExtendedDetail = createAsyncThunk(SLICE_BASE_NAME + '/apiGetPetitionExtendedDetail', async (params: string) => {
  // assume someService required reesponse & require type as generic
  const response = await getPetitionExtendedDetailAPI(params)
  return response.data
})

export const getPetitionNotification = createAsyncThunk(SLICE_BASE_NAME + '/apiGetPetitionNotification', async (params: GetPaginateParams) => {
  // assume someService required reesponse & require type as generic
  const response = await getPetitionNotificationAPI(params)
  return response.data
})

export const getPetitionStatus = createAsyncThunk(SLICE_BASE_NAME + '/apiGetPetitionStatus', async (params: GetPetitionDetailParams) => {
  // assume someService required reesponse & require type as generic
  const response = await getPetitionStatusAPI(params)
  return response.data
})

export const getPetitionExtendedStatus = createAsyncThunk(SLICE_BASE_NAME + '/apiGetPetitionExtendedStatus', async (params: GetPetitionExtendedDetailParams) => {
  // assume someService required reesponse & require type as generic
  const response = await getPetitionExtendedStatusAPI(params)
  return response.data
})

export const getPetitionCount = createAsyncThunk(SLICE_BASE_NAME + '/apiGetPetitionCount', async () => {
  // assume someService required reesponse & require type as generic
  const response = await getPetitionCountAPI()
  return response.data
})

export const getPetitionExtendedCount = createAsyncThunk(SLICE_BASE_NAME + '/apiGetPetitionExtendedCount', async () => {
  // assume someService required reesponse & require type as generic
  const response = await getPetitionExtendedCountAPI()
  return response.data
})

const petitionSlice = createSlice({
  name: `${SLICE_BASE_NAME}/petition`,
  initialState,
  reducers: {
    setAdminPetitionData: (state, action) => {
      state.petition.overview.search = action.payload.params,
        state.petition.overview.data = action.payload.data
    },
    setAdminPetitionExtendedData: (state, action) => {
      state.petition_extended.overview.search = action.payload.params,
        state.petition_extended.overview.data = action.payload.data
    },
    setAdminPetitionHistoryData: (state, action) => {
      state.petition_history.overview.search = action.payload.params,
        state.petition_history.overview.data = action.payload.data
    },
    setAdminPetitionHistoryExtendedData: (state, action) => {
      state.petition_history_extended.overview.search = action.payload.params,
        state.petition_history_extended.overview.data = action.payload.data
    },
    setAdminPetitionDocument: (state, action) => {
      state.petition.detail.document = action.payload.data
    },
    setAdminPetitionVehicle: (state, action) => {
      state.petition.detail.vehicle = action.payload.data
    },
    setAdminPetitionRouteEstimation: (state, action) => {
      state.petition.detail.estimate.route = action.payload.data
    },
    setAdminPetitionSummaryEstimation: (state, action) => {
      state.petition.detail.estimate.summary.search = action.payload.params,
        state.petition.detail.estimate.summary.data = action.payload.data
    },
    setAdminPetitionBridgeEstimation: (state, action) => {
      state.petition.detail.estimate.bridge.search = action.payload.params,
        state.petition.detail.estimate.bridge.data = action.payload.data
    },
    setAdminPetitionTurnRadiusEstimation: (state, action) => {
      state.petition.detail.estimate.turn_radius.search = action.payload.params,
        state.petition.detail.estimate.turn_radius.data = action.payload.data
    },
    setAdminPetitionExtendedDetail: (state, action) => {
      state.petition_extended.detail = action.payload
    },
    setAdminPetitionNotification: (state, action) => {
      state.notification.search = action.payload.params,
        state.notification.data = action.payload.data
    },
    setAdminPetitionStatus: (state, action) => {
      state.petition_status = action.payload
    },
    setAdminPetitionExtendedStatus: (state, action) => {
      state.petition_extended_status = action.payload
    },
    setPetitionCount: (state, action) => {
      state.petition_count = action.payload
    },
    setPetitionExtendedCount: (state, action) => {
      state.petition_extended_count = action.payload
    },
    resetAdminPetitionDocument: (state) => {
      state.petition.detail.document = initialState.petition.detail.document
    },
    resetAdminPetitionRouteEstimation: (state) => {
      state.petition.detail.estimate.route = initialState.petition.detail.estimate.route,
        state.petition.detail.estimate.summary = initialState.petition.detail.estimate.summary,
        state.petition.detail.estimate.bridge = initialState.petition.detail.estimate.bridge,
        state.petition.detail.estimate.turn_radius = initialState.petition.detail.estimate.turn_radius
    },
    resetAdminPetitionVehicle: (state) => {
      state.petition.detail.vehicle = initialState.petition.detail.vehicle
    },
    resetAdminPetitionExtendedDetail: (state) => {
      state.petition_extended.detail = initialState.petition_extended.detail
    },
    resetPetitionStatus: (state) => {
      state.petition_status = initialState.petition_status
    },
    resetPetitionExtendedStatus: (state) => {
      state.petition_extended_status = initialState.petition_extended_status
    }
  },
  extraReducers: (builder) => {
    // GET PETITION DATA
    builder.addCase(getAdminPetitionData.fulfilled, (state, action) => {
      state.petition.overview.data = action.payload,
        state.loading = false
    })
      .addCase(getAdminPetitionData.pending, (state) => {
        state.loading = true
      })
      .addCase(getAdminPetitionData.rejected, (state) => {
        state.loading = false
      })
    // GET PETITION DETAIL
    builder.addCase(getAdminPetitionExtendedData.fulfilled, (state, action) => {
      state.petition_extended.overview.data = action.payload,
        state.loading = false
    })
      .addCase(getAdminPetitionExtendedData.pending, (state) => {
        state.loading = true
      })
      .addCase(getAdminPetitionExtendedData.rejected, (state) => {
        state.loading = false
      })
    // GET PETITION HISTORY
    builder.addCase(getAdminPetitionHistoryData.fulfilled, (state, action) => {
      state.petition_history.overview.data = action.payload,
        state.loading = false
    })
      .addCase(getAdminPetitionHistoryData.pending, (state) => {
        state.loading = true
      })
      .addCase(getAdminPetitionHistoryData.rejected, (state) => {
        state.loading = false
      })
    // GET PETITION EXTENDED HISTORY
    builder.addCase(getAdminPetitionHistoryExtendedData.fulfilled, (state, action) => {
      state.petition_history_extended.overview.data = action.payload,
        state.loading = false
    })
      .addCase(getAdminPetitionHistoryExtendedData.pending, (state) => {
        state.loading = true
      })
      .addCase(getAdminPetitionHistoryExtendedData.rejected, (state) => {
        state.loading = false
      })
    // GET PETITION DOCUMENT
    builder.addCase(getPetitionDocument.fulfilled, (state, action) => {
      state.petition.detail.document = action.payload,
        state.loading = false
    })
      .addCase(getPetitionDocument.pending, (state) => {
        state.loading = true
      })
      .addCase(getPetitionDocument.rejected, (state) => {
        state.loading = false
      })
    // GET PETITION ESTIMATE ROUTE
    builder.addCase(getPetitionEstimateRoute.fulfilled, (state, action) => {
      state.petition.detail.estimate.route = action.payload,
        state.loading = false
    })
      .addCase(getPetitionEstimateRoute.pending, (state) => {
        state.loading = true
      })
      .addCase(getPetitionEstimateRoute.rejected, (state) => {
        state.loading = false
      })
    // GET PETITION ESTIMATE SUMMARY
    builder.addCase(getPetitionEstimateSummary.fulfilled, (state, action) => {
      state.petition.detail.estimate.summary.data.data = action.payload,
        state.loading = false
    })
      .addCase(getPetitionEstimateSummary.pending, (state) => {
        state.loading = true
      })
      .addCase(getPetitionEstimateSummary.rejected, (state) => {
        state.loading = false
      })
    // GET PETITION ESTIMATE BRIDGE
    builder.addCase(getPetitionEstimateBridge.fulfilled, (state, action) => {
      state.petition.detail.estimate.bridge.data = action.payload,
        state.loading = false
    })
      .addCase(getPetitionEstimateBridge.pending, (state) => {
        state.loading = true
      })
      .addCase(getPetitionEstimateBridge.rejected, (state) => {
        state.loading = false
      })
    // GET PETITION ESTIMATE TURN RADIUS
    builder.addCase(getPetitionEstimateTurnRadius.fulfilled, (state, action) => {
      state.petition.detail.estimate.turn_radius.data = action.payload,
        state.loading = false
    })
      .addCase(getPetitionEstimateTurnRadius.pending, (state) => {
        state.loading = true
      })
      .addCase(getPetitionEstimateTurnRadius.rejected, (state) => {
        state.loading = false
      })
    // GET PETITION VEHICLE
    builder.addCase(getPetitionVehicle.fulfilled, (state, action) => {
      state.petition.detail.vehicle = action.payload,
        state.loading = false
    })
      .addCase(getPetitionVehicle.pending, (state) => {
        state.loading = true
      })
      .addCase(getPetitionVehicle.rejected, (state) => {
        state.loading = false
      })
    // GET PETITION EXTENDED DETAIL
    builder.addCase(getPetitionExtendedDetail.fulfilled, (state, action) => {
      state.petition_extended.detail = action.payload[0],
        state.loading = false
    })
      .addCase(getPetitionExtendedDetail.pending, (state) => {
        state.loading = true
      })
      .addCase(getPetitionExtendedDetail.rejected, (state) => {
        state.loading = false
      })
    // GET PETITION NOTIFICATION
    builder.addCase(getPetitionNotification.fulfilled, (state, action) => {
      state.notification.data = action.payload.data,
        state.notification.pagination = action.payload.pagination,
        state.loading = false
    })
      .addCase(getPetitionNotification.pending, (state) => {
        state.loading = true
      })
      .addCase(getPetitionNotification.rejected, (state) => {
        state.loading = false
      })
    // GET PETITION STATUS
    builder.addCase(getPetitionStatus.fulfilled, (state, action) => {
      state.petition_status = action.payload,
        state.loading = false
    })
      .addCase(getPetitionStatus.pending, (state) => {
        state.loading = true
      })
      .addCase(getPetitionStatus.rejected, (state) => {
        state.loading = false
      })
    // GET PETITION EXTENDED STATUS
    builder.addCase(getPetitionExtendedStatus.fulfilled, (state, action) => {
      state.petition_extended_status = action.payload,
        state.loading = false
    })
      .addCase(getPetitionExtendedStatus.pending, (state) => {
        state.loading = true
      })
      .addCase(getPetitionExtendedStatus.rejected, (state) => {
        state.loading = false
      })
    // GET PETITION COUNT
    builder.addCase(getPetitionCount.fulfilled, (state, action) => {
      state.petition_count = action.payload,
        state.loading = false
    })
      .addCase(getPetitionCount.pending, (state) => {
        state.loading = true
      })
      .addCase(getPetitionCount.rejected, (state) => {
        state.loading = false
      })
    // GET PETITION_EXTENDED COUNT
    builder.addCase(getPetitionExtendedCount.fulfilled, (state, action) => {
      state.petition_extended_count = action.payload,
        state.loading = false
    })
      .addCase(getPetitionExtendedCount.pending, (state) => {
        state.loading = true
      })
      .addCase(getPetitionExtendedCount.rejected, (state) => {
        state.loading = false
      })
  }
})

export const {
  setAdminPetitionData,
  setAdminPetitionExtendedData,
  setAdminPetitionHistoryData,
  setAdminPetitionHistoryExtendedData,
  setAdminPetitionDocument,
  setAdminPetitionRouteEstimation,
  setAdminPetitionSummaryEstimation,
  setAdminPetitionBridgeEstimation,
  setAdminPetitionTurnRadiusEstimation,
  setAdminPetitionVehicle,
  setAdminPetitionExtendedDetail,
  setAdminPetitionNotification,
  setAdminPetitionStatus,
  setPetitionCount,
  setAdminPetitionExtendedStatus,
  resetAdminPetitionDocument,
  resetAdminPetitionRouteEstimation,
  resetAdminPetitionVehicle,
  resetAdminPetitionExtendedDetail,
  resetPetitionStatus,
  resetPetitionExtendedStatus
} = petitionSlice.actions

export default petitionSlice.reducer