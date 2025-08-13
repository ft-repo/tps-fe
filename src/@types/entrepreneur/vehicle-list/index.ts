export interface FieldType {
  vehicle_type: string | number | null;
  license_plate: string;
  vehicle_model: string;
  province: string;
  vehicle_weight: number;
  vehicle_color: string;
  vehicle_distance: number
  wide_unit: number
  long_unit: number;
  tall_unit: number;
  // DOCUMENT ID
  file_registered_document_id: FileType;
  file_property_document_id: FileType;
  file_hire_contact_document_id: FileType;
  file_purchase_contact_document_id: FileType;
  file_transfer_contact_document_id: FileType;
  file_front_image_id: FileType;
  file_side_image_id: FileType;
  file_back_image_id: FileType;
}

export interface FileType {
  file: any[],
  url: string;
}

// COMPONENT TABLE
export interface TableData {
  id: string | number | null | any;
  vehicle_type_name: string;
  brand: string;
  plate_no: string;
  plate_province: string;
  weight: string;
}