import { APIPostBody } from "../services/vehicle";

export interface DialogProps {
  open: boolean;
  data: APIPostBody | null;
}

export interface ClientPetitionColor {
  APPROVE: {
    color: string;
    text: string;
    text_color: string;
  }
  NOT_APPROVE: {
    color: string;
    text: string;
    text_color: string;
  }
  REJECTED: {
    color: string;
    text: string;
    text_color: string;
  }
  IN_PROGRESS: {
    color: string;
    text: string;
    text_color: string;
  }
}

export interface ClientPetitionExtendColor {
  APPROVE: {
    color: string;
    text: string;
  }
  NOT_APPROVE: {
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

export interface HistoryPetitionColor {
  APPROVE: {
    color: string;
    text: string;
  }
  NOT_APPROVE: {
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
    text_color: string;
  };
  NOT_APPROVE: {
    color: string;
    text: string;
    text_color: string;
  };
  IN_PROGRESS: {
    color: string;
    text: string;
    text_color: string;
  };
  SKIPPED: {
    color: string;
    text: string;
    text_color: string;
  };
}
export interface ApprovalStatusValue {
  className: string;
  color: string;
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

// FILE TYPE
export interface FileType {
  file: any[];
  url: string;
}

export interface RouteDirectionResponse {
  type: string
  bbox: number[]
  features: Feature[]
  metadata: Metadata
}

export interface Feature {
  bbox: number[]
  type: string
  properties: Properties
  geometry: Geometry
}

export interface Properties {
  segments: Segment[]
  way_points: number[]
  summary: Summary
}

export interface Segment {
  distance: number
  duration: number
  steps: Step[]
}

export interface Step {
  distance: number
  duration: number
  type: number
  instruction: string
  name: string
  way_points: number[]
}

export interface Summary {
  distance: number
  duration: number
}

export interface Geometry {
  coordinates: number[][]
  type: string
}

export interface Metadata {
  attribution: string
  service: string
  timestamp: number
  query: Query
  engine: Engine
}

export interface Query {
  coordinates: number[][]
  profile: string
  profileName: string
  format: string
  radiuses: number[]
}

export interface Engine {
  version: string
  build_date: string
  graph_date: string
  osm_date: string
}

// REGION API
export interface APIResponseRegion {
  latitude: number
  lookupSource: string
  longitude: number
  localityLanguageRequested: string
  continent: string
  continentCode: string
  countryName: string
  countryCode: string
  principalSubdivision: string
  principalSubdivisionCode: string
  city: string
  locality: string
  postcode: string
  plusCode: string
  localityInfo: LocalityInfo
}

export interface LocalityInfo {
  administrative: Administrative[]
  informative: Informative[]
}

export interface Administrative {
  name: string
  description?: string
  isoName?: string
  order: number
  adminLevel: number
  isoCode?: string
  wikidataId?: string
  geonameId?: number
}

export interface Informative {
  name: string
  description: string
  isoName?: string
  order: number
  isoCode?: string
  wikidataId?: string
  geonameId?: number
}

export interface AxisType {
  id: number;
  name: string
  max_weight: number;
  max_carry_weight: number;
  axis_number: number;
}