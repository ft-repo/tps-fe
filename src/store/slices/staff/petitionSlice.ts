import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { SLICE_BASE_NAME } from './constants'
import { PetitionAdminState } from '@/@types/reducer/petition'
import { getAdminPetitionAPI, getAdminPetitionExtendedAPI, getPetitionDocumentAPI, getPetitionEstimateBridgeAPI, getPetitionEstimateRouteAPI, getPetitionEstimateSummaryAPI, getPetitionEstimateTurnRadiusAPI, getPetitionExtendedDetailAPI, getPetitionVehicleAPI } from '@/services/staff/PetitionService'
import { GetEstimateDetailParams, GetPetitionDetailParams, GetPetitionParams } from '@/@types/services/petition'

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
      },
      estimate: {
        route: {
          petition_id: 0,
          vehicle_route: [],
          estimate: [],
          estimate_rural_roads: [],
          start_point: '',
          end_point: ''
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
        characteristic: '',
        type: '',
        plate_no: '',
        plate_province: '',
        color: '',
        axis_number: 0,
        weight: 0,
        axis_weight: []
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
      },
      estimate: {
        route: {
          petition_id: 0,
          vehicle_route: [],
          estimate: [],
          estimate_rural_roads: [],
          start_point: '',
          end_point: ''
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
        characteristic: '',
        type: '',
        plate_no: '',
        plate_province: '',
        color: '',
        axis_number: 0,
        weight: 0,
        axis_weight: []
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
    // GET PETITION EXTENDED DETAI:
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
  setAdminPetitionExtendedDetail
} = petitionSlice.actions

export default petitionSlice.reducer