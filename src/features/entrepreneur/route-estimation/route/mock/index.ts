import { FieldArray, SummaryData, VehicleData } from "@/@types/entrepreneur/route-estimation";

export const initFormValue: FieldArray = {
  vehicle_type: "",
  turn_radius: "",
  recovery_vehicle_license_plate: "",
  semi_trailer_license_plate: "",
  mechanical_vehicle_license_plate: "",
  recover_vehicle_chassis_weight_1: 0,
  recover_vehicle_chassis_weight_2: 0,
  recover_vehicle_chassis_weight_3: 0,
  semi_trailer_chassis_weight_1: 0,
  semi_trailer_chassis_weight_2: 0,
  semi_trailer_chassis_weight_3: 0,
  semi_trailer_chassis_weight_4: 0,
  start_route: "",
  end_route: "",
}

export const VEHICLE_DATA: VehicleData[] = [
  {
    title: 'Sample Title 1',
    description: 'Sample Description 1',
    image: 'https://pbs.twimg.com/media/Gwd3ck3bEAAcuBB?format=jpg&name=4096x4096'
  },
  {
    title: 'Sample Title 2',
    description: 'Sample Description 1',
    image: 'https://pbs.twimg.com/media/Gwd231HX0AA13vq?format=jpg&name=4096x4096'
  },
  {
    title: 'Sample Title 3',
    description: 'Sample Description 1',
    image: 'https://pbs.twimg.com/media/GwdaA_NbEAMkEfj?format=jpg&name=4096x4096'
  },
]

export const SUMMARY_DATA: SummaryData[] = [
  {
    title: 'น้ำหนักรถเปล่ารวม',
    description: '27,900 กก.'
  },
  {
    title: 'น้ำหนักรถเปล่ารวมน้ำหนักเพลา',
    description: '57,000 กก.'
  },
  {
    title: 'มิติรถเปล่า',
    description: 'กว้าง 3.50 X ยาว 9.00 X สูง 4.30'
  },
  {
    title: 'มิติรถเปล่ารวม สินค้า / เครื่องจักร(ม.)',
    description: 'กว้าง 3.50 X ยาว 9.00 X สูง 4.96'
  },
]