export type SignInCredential = {
    registration_no: string
    password: string
}

export type SignInResponse = {
    access_token: string;
  details: {
    id: string;
    registration_no: string;
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
  refresh_token: string;
  role: string;
}

export type SignUpResponse = SignInResponse

export type SignUpCredential = {
    userName: string
    email: string
    password: string
}

export type ForgotPassword = {
    email: string
}

export type ResetPassword = {
    password: string
}
