/* eslint-disable react-refresh/only-export-components */
import { FieldArray } from '@/@types/entrepreneur/route-estimation'
import React from 'react'
import CardVehicleDetails from '../initial/DetailSection/CardVehicleDetails';
import { SUMMARY_DATA, VEHICLE_DATA } from '../../../mock';
import VehicleSummary from '../initial/DetailSection/VehicleSummary';
import MapRouteEstimation from '../initial/MapRouteEstimation';

interface Props {
  data: FieldArray;
}

const DetailResult: React.FC<Props> = (props) => {
  const { data } = props

  return (
    <div className='block 2xl:grid grid-cols-2 gap-5 '>
      <div>
        <h4>รายละเอียด รถคู่ที่ 1 : รถลากจูง + รถกึ่งพ่วง</h4>
        <section className='mt-3'>
          <VehicleSummary
            data={SUMMARY_DATA}
          />
        </section>
        <section className='mt-3'>
          <CardVehicleDetails
            data={VEHICLE_DATA}
          />
        </section>
        <section className='mt-3'>
          <h5>น้ำหนักลงเพลา รถลากจูง (กิโลกรัม)</h5>
          <p>{data.recover_vehicle_chassis_weight_1 || '0'} : {data.recover_vehicle_chassis_weight_2 || '0'} : {data.recover_vehicle_chassis_weight_3 || '0'}</p>
        </section>
        <section className='mt-3'>
          <h5>น้ำหนักลงเพลา กึ่งรถพ่วง (กิโลกรัม)</h5>
          <p>{data.semi_trailer_chassis_weight_1 || '0'} : {data.semi_trailer_chassis_weight_2 || '0'} : {data.semi_trailer_chassis_weight_3 || '0'}</p>
        </section>
        <section className='mt-3'>
          <h5>ต้นทาง</h5>
          <p>{data.start_route || '-'}</p>
        </section>
        <section className='mt-3'>
          <h5>ปลายทาง</h5>
          <p>{data.end_route || '-'}</p>
        </section>
      </div>
      <div className='order-first z-0 h-[50vh] block rounded-md xl:order-last xl:h-[70vh] xl:max-h-auto xl:sticky xl:top-4 xl:overflow-hidden border border-gray-200'>
        <MapRouteEstimation />
      </div>
    </div>
  )
}

export default React.memo<Props>(DetailResult)
