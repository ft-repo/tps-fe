export interface FieldType {
  // vehicle_type: string;
  vehicle_type: {
    label: string | null;
    value: number | string | null;
  } | null;
  license_plate: string;
  vehicle_model: string;
  province: string;
  vehicle_weight: string;
  vehicle_color: string;
  vehicle_distance: string;
  wide_unit: string;
  long_unit: string;
  tall_unit: string;
  // DOCUMENT ID
  file_registered_document_id: string;
  file_property_document_id: string;
  file_hire_contact_document_id: string;
  file_purchase_contact_document_id: string;
  file_transfer_contact_document_id: string;
  file_front_image_id: string;
  file_side_image_id: string;
  file_back_image_id: string;
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