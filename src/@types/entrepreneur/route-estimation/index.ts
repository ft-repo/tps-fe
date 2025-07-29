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

export interface ContextProps {
  step: number;
  setStep: (step: number) => void;
  dataParser: FieldType;
  setDataParser: (dataParser: FieldType) => void;
}

export interface VehicleData {
  title: string;
  description: string;
  image: string;
}

export type SummaryData = Omit<VehicleData, 'image'>