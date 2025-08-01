export interface SearchUserName {
  username: string;
}

export interface TableCategoryData {
  business_name: string;
  road_code: string;
  road_name: string;
  start_date: string;
  end_date: string;
  permit_date: string;
  validate_document: string;
  validate_route: string;
  validate_vehicle: string;
  wait_signed: string;
  permit: string;
}

export interface TableOtherData {
  business_name: string;
  petition_date: string;
  committee_conside: string;
  wait_signed: string;
  petition_approved: string;
}