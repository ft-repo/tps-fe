import { APIPostBody } from "../services/vehicle";

export interface DialogProps {
  open: boolean;
  data: APIPostBody | null;
}

export interface ClientPetitionColor{
  APPROVE: {
    color: string;
    text: string;
  }
  NOT_APPROVE:{
    color: string;
    text: string;
  }
  REJECTED: {
    color: string;
    text: string;
  }
  IN_PROGRESS: {
    color: string;
    text: string;
  }
}

export interface ClientPetitionExtendColor{
  APPROVE: {
    color: string;
    text: string;
  }
  NOT_APPROVE:{
    color: string;
    text: string;
  }
  REJECTED: {
    color: string;
    text: string;
  }
  IN_PROGRESS: {
    color: string;
    text: string;
  }
}

export interface HistoryPetitionColor{
  APPROVE: {
    color: string;
    text: string;
  }
  NOT_APPROVE:{
    color: string;
    text: string;
  }
  REJECTED: {
    color: string;
    text: string;
  }
}

export interface StatusColor {
  APPROVE: {
    color: string;
    text: string;
  };
  NOT_APPROVE: {
    color: string;
    text: string;
  };
  IN_PROGRESS: {
    color: string;
    text: string;
  };
  SKIPPED: {
    color: string;
    text: string;
  };
}
export interface ApprovalStatusValue {
  className: string;
  text: string;
};

// MASTER SLICE
export interface EntityState {
  id: string | number;
  name: string;
}

export interface ThailandState {
  id: string | number;
  name_th: string;
  name_en: string;
}

export interface SubDistrictState extends ThailandState {
  zip_code: string;
}

export interface DepartmentState {
  id: number;
  dept_name: string;
  dept_type: number;
  dept_group: number;
  dept_province: string;
}

export interface RoleState {
  id: string;
  name: string;
}

// UPLOAD
export interface UploadRequest {
  upload: ArrayBuffer
}

export interface UploadResponse {
  url: string;
}

// PARAMS
export interface GetPaginateParams {
  page: number;
  limit: number;
}