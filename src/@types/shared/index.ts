import { APIPostBody } from "../services/vehicle";

export interface DialogProps {
  open: boolean;
  data: APIPostBody | null;
}

export interface StatusColor {
  APPROVE: {
    color: string;
    text: string;
  };
  REJECTED: {
    color: string;
    text: string;
  };
  IN_PROGRESS: {
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
