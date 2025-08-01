/* eslint-disable @typescript-eslint/no-explicit-any */
export interface FieldType {
  form_template: FieldArray[];
}

export interface FieldArray {
  vehicle_type: string;
  turn_radius: string;
  recovery_vehicle_license_plate: string;
  semi_trailer_license_plate: string;
  mechanical_vehicle_license_plate: string;
  recover_vehicle_chassis_weight_1: number;
  recover_vehicle_chassis_weight_2: number;
  recover_vehicle_chassis_weight_3: number;
  semi_trailer_chassis_weight_1: number;
  semi_trailer_chassis_weight_2: number;
  semi_trailer_chassis_weight_3: number;
  semi_trailer_chassis_weight_4: number;
  start_route: string;
  end_route: string;
}

export interface FieldTypeForOther {
  // 1. PETITOR INFO
  company_name: string;
  company_contactor: string;
  company_address: string;
  company_village_number: string;
  company_alley: string;
  company_road: string;
  company_province: string;
  company_district: string;
  company_sub_district: string;
  company_postcode: string;
  // 1.1 REGISTERED DETAIL
  business_type: string;
  registered_date: string;
  registered_company_address: string;
  registered_company_village_no: string;
  registered_company_alley: string;
  registered_company_road: string;
  registered_company_province: string;
  registered_company_district: string;
  registered_company_sub_district: string;
  registered_company_postcode: string;
  // 1.2 TRANSFERER DETAIL
  transferer_name: string;
  transferer_phone_number: string;
  transferer_company_address: string;
  transferer_company_village_no: string;
  transferer_company_alley: string;
  transferer_company_road: string;
  transferer_company_province: string;
  transferer_company_district: string;
  transferer_company_sub_district: string;
  transferer_company_postcode: string;
  // 2. VEHICLE DETAIL
  vehicle_appearance: string;
  vehicle_type: string;
  vehicle_license_plate: string;
  vehicle_province: string;
  vehicle_color: string;
  vehicle_axles: string;
  vehicle_weight: string;
  // 3. REMARK
  petition_number: string;
  remark: string;
}

export interface ContextProps {
  step: number;
  setStep: (step: number | any) => void;
  dataParser: FieldType;
  setDataParser: (dataParser: FieldType | FieldTypeForOther) => void;
}

export interface VehicleData {
  title: string;
  description: string;
  image: string;
}

export type SummaryData = Omit<VehicleData, 'image'>