export type SignInCredential = {
  registration_no: string
  password: string
  is_personal?: boolean
  from_web?: boolean
}

export type SignInStaffCredential = {
  userName: string
  password: string
}

export type SignInResponse = {
  access_token: string;
  details: {
    id: string;
    registration_no: string;
    profile_url: string;
    is_personal: boolean;
    business_details: {
      entity_type_id: number;
      business_name: string;
      entity_type: {
        id: number;
        name: string;
      };
    };
    business_address: {
      house_number: string;
      village: string;
      lane: string;
      road: string;
      sub_district_id: number;
      district_id: number;
      zip_codes: string;
      province_id: number;
      phone_number: string;
      province: {
        id: number;
        name_th: string;
        name_en: string;
      };
      district: {
        id: number;
        name_th: string;
        name_en: string;
        province_id: number;
      };
      sub_district: {
        id: number;
        name_th: string;
        name_en: string;
        zip_code: string;
        province_id: number;
        district_id: number;
      };
    };
    contact_info: {
      contact_name: string;
      contact_type_id: number;
      phone_number: string;
      cid: string;
      contact_type: {
        id: number;
        name: string;
      };
    };
  };
  refresh_token?: string;
  role: string;
}

export type SignInStaffResponse = {
  access_token: string
  details: {
    id: string
    username: string
    title: string
    first_name: string
    last_name: string
    department_id: number
    role_id: number
    department: {
      dept_name: string
      dept_type: number
      dept_group: number
      dept_province: string
    }
    role: {
      name: string
    }
  }
  refresh_token?: string
}

export type SignUpResponse = SignInResponse

export type SignUpFieldType = {
  password: string
  password_confirmation: string
  business_detail: {
    business_name: string
    registration_no: string
    entity_type_id: number
  },
  business_address: {
    house_number: string
    village: string
    lane: string
    road: string
    sub_district_id: number
    district_id: number
    province_id: number
    zip_code: string
    phone_number: string
  },
  business_document: {
    certificate_file_url: string
    cid_card_file_url: string
    business_file_url: string
  },
  contact_info: {
    contact_name: string
    contact_type_id: number
    phone_number: string
    cid: string
  }
}

export type SignUpCredential = {
  is_personal: boolean;
  password: string
  business_detail: {
    business_name: string
    registration_no: string
    entity_type_id: number | null
  },
  business_address: {
    house_number: string
    village: string
    lane: string
    road: string
    sub_district_id: number
    district_id: number
    province_id: number
    zip_code: string
    phone_number: string
  },
  business_document: {
    certificate_file_url: string
    cid_card_file_url: string
    business_file_url: string
  },
  contact_info: {
    contact_name: string
    contact_type_id: number
    phone_number: string
    cid: string
  }
}

export type ForgotPassword = {
  email: string
}

export type ResetPassword = {
  password: string
}
