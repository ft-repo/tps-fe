import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { SLICE_BASE_NAME } from './constants'
import { StaffState } from '@/@types/reducer/user'
import { GetAdminParams, GetClientParams, GetLDAPParams } from '@/@types/services/user'
import { getAdminUserAPI, getClientDetailAPI, getClientUserAPI, getLDAPUserAPI } from '@/services/staff/UserService'

const initialState: StaffState = {
  client: {
    overview: {
      search: {
        search: '',
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
      id: "",
      registration_no: "",
      created_at: "",
      profile_url: "",
      business_details: {
        entity_type_id: null,
        business_name: "",
        entity_type: {
          id: null,
          name: ""
        }
      },
      business_address: {
        house_number: "",
        village: "",
        lane: "",
        road: "",
        sub_district_id: null,
        district_id: null,
        zip_codes: "",
        province_id: null,
        phone_number: "",
        province: {
          id: null,
          name_th: "",
          name_en: ""
        },
        district: {
          id: null,
          name_th: "",
          name_en: "",
          province_id: null
        },
        sub_district: {
          id: null,
          name_th: "",
          name_en: "",
          zip_code: "",
          province_id: null,
          district_id: null
        }
      },
      contact_info: {
        contact_name: "",
        contact_type_id: null,
        phone_number: "",
        cid: "",
        contact_type: {
          id: null,
          name: ""
        }
      },
      documents: {
        certificate_file_url: "",
        cid_card_file_url: "",
        business_file_url: "",
        uploaded_at: ""
      }
    }
  },
  admin: {
    overview: {
      search: {
        search: '',
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
    detail: {}
  },
  ldap: {
    search: {
      keyword: '',
      page: 1,
      limit: 10
    },
    data: []
  },
  loading: false,
}

export const getClientData = createAsyncThunk(SLICE_BASE_NAME + '/apiGetClientData', async (params: GetClientParams) => {
  // assume someService required reesponse & require type as generic
  const response = await getClientUserAPI(params)
  return response.data
})

export const getClientDetail = createAsyncThunk(SLICE_BASE_NAME + '/apiGetClientDetail', async (id: string | number) => {
  // assume someService required reesponse & require type as generic
  const response = await getClientDetailAPI(id)
  return response.data
})

export const getAdminData = createAsyncThunk(SLICE_BASE_NAME + '/apiGetAdminData', async (params: GetAdminParams) => {
  // assume someService required reesponse & require type as generic
  const response = await getAdminUserAPI(params)
  return response.data
})

export const getLDAPData = createAsyncThunk(SLICE_BASE_NAME + '/apiGetLDAPData', async (params: GetLDAPParams) => {
  // assume someService required reesponse & require type as generic
  const response = await getLDAPUserAPI(params)
  return response.data
})

const UserManageSlice = createSlice({
  name: SLICE_BASE_NAME,
  initialState,
  reducers: {
    setClientData: (state, action) => {
      state.client.overview.search = action.payload.params,
        state.client.overview.data = action.payload.data
    },
    setAdminData: (state, action) => {
      state.admin.overview.search = action.payload.params,
        state.admin.overview.data = action.payload.data
    },
    setLDAPData: (state, action) => {
      state.ldap.search = action.payload.params,
        state.ldap.data = action.payload.data
    },
    clearLDAPData: (state) => {
      state.ldap = initialState.ldap
    }
  },
  extraReducers: (builder) => {
    // CLIENT
    builder.addCase(getClientData.fulfilled, (state, action) => {
      state.client.overview.data = action.payload,
        state.loading = false
    })
      .addCase(getClientData.pending, (state) => {
        state.loading = true
      })
      .addCase(getClientData.rejected, (state) => {
        state.loading = false
      })
    // CLIENT DETAIL
    builder.addCase(getClientDetail.fulfilled, (state, action) => {
      state.client.detail = action.payload,
        state.loading = false
    })
      .addCase(getClientDetail.pending, (state) => {
        state.loading = true
      })
      .addCase(getClientDetail.rejected, (state) => {
        state.loading = false
      })
    // ADMIN
    builder.addCase(getAdminData.fulfilled, (state, action) => {
      state.admin.overview.data = action.payload,
        state.loading = false
    })
      .addCase(getAdminData.pending, (state) => {
        state.loading = true
      })
      .addCase(getAdminData.rejected, (state) => {
        state.loading = false
      })
    // LDAP
    builder.addCase(getLDAPData.fulfilled, (state, action) => {
      state.ldap.data = action.payload,
        state.loading = false
    })
      .addCase(getLDAPData.pending, (state) => {
        state.loading = true
      })
      .addCase(getLDAPData.rejected, (state) => {
        state.loading = false
      })
  }
})

export const { setClientData, setAdminData, setLDAPData, clearLDAPData } = UserManageSlice.actions

export default UserManageSlice.reducer