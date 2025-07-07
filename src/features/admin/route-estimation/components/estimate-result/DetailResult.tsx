import { FieldArray } from '@/@types/admin/route-estimation'
import React from 'react'

interface Props {
  data: FieldArray;
}

const DetailResult: React.FC<Props> = (props) => {
  const { data } = props

  return (
    <div className='grid lg:grid-cols-2 gap-5 '>
      <div>
        <h4>รายละเอียด รถคู่ที่ 1 : รถลากจูง + รถกึ่งพ่วง</h4>
        <figure className='w-full h-44 overflow-hidden rounded-lg'>
          <img
            src='https://www.atlasandboots.com/wp-content/uploads/2019/05/ama-dablam2-most-beautiful-mountains-in-the-world.jpg'
            alt='test-img'
            className='object-center object-cover'
          />
        </figure>
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
      <div
        style={{ width: '100%' }}
      >
        <iframe
          width="100%"
          height={450}
          frameBorder={0}
          scrolling="no"
          marginHeight={0}
          marginWidth={0}
          src="https://maps.google.com/maps?width=100%25&height=600&hl=en&q=1%20Grafton%20Street,%20Dublin,%20Ireland+(My%20Business%20Name)&t=&z=14&ie=UTF8&iwloc=B&output=embed"
        >
          &lt;a href="https://www.mapsdirections.info/fr/calculer-la-population-sur-une-carte"&gt;Carte démographique&lt;/a&gt;
        </iframe>
      </div>
    </div>
  )
}

export default React.memo<Props>(DetailResult)
