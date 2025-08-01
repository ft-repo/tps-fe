/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import { Input, Select } from '@/components/ui'
import React from 'react'

interface Props {

}

const FormVehicle: React.FC<Props> = (props) => {
  const { } = props

  return (
    <div className='border-2 rounded-md p-4 mb-3'>
      <section>
        <h5>ข้อมูลยานพาหนะ</h5>
        <div className='block lg:grid grid-cols-2 lg:grid-cols-4 gap-3 mt-3'>
          <div className='col-span-4'>
            <fieldset>
              <label>ลักษณะ / มาตราฐาน</label>
              <Input
                placeholder='กรุณาระบุ'
              />
            </fieldset>
          </div>
          <div className='col-span-2'>
            <fieldset>
              <label>ประเภท</label>
              <Select
                placeholder='กรุณาเลือก'
                options={[]}
              />
            </fieldset>
          </div>
          <div className='col-span-2'>
            <fieldset>
              <label>เลขทะเบียน</label>
              <Input
                placeholder='กรุณาระบุ'
              />
            </fieldset>
          </div>
          <div className='col-span-2'>
            <fieldset>
              <label>จังหวัด</label>
              <Select
                placeholder='กรุณาเลือก'
                options={[]}
              />
            </fieldset>
          </div>
          <div className='col-span-2'>
            <fieldset>
              <label>สี</label>
              <Input
                placeholder='กรุณาระบุ'
              />
            </fieldset>
          </div>
          <div className='col-span-2'>
            <fieldset>
              <label>จำนวนเพลา</label>
              <Select
                placeholder='กรุณาเลือก'
                options={[]}
              />
            </fieldset>
          </div>
          <div className='col-span-2'>
            <fieldset>
              <label>น้ำหนักรวม (กิโลกรัม)</label>
              <Input
                placeholder='กรุณาระบุ'
              />
            </fieldset>
          </div>
        </div>
      </section>
      <section className='mt-3'>
        <h5>น้ำหนักลงเพลา (กิโลกรัม)</h5>
        <div className='block sm:grid grid-cols-2 2xl:grid-cols-4 gap-3'>
          <fieldset className='mb-3 sm:mb-0'>
            <Input
              placeholder='กรุณาระบุ'
            />
          </fieldset>
          <fieldset className='mb-3 sm:mb-0'>
            <Input
              placeholder='กรุณาระบุ'
            />
          </fieldset>
          <fieldset className='mb-3 sm:mb-0'>
            <Input
              placeholder='กรุณาระบุ'
            />
          </fieldset>
          <fieldset>
            <Input
              placeholder='กรุณาระบุ'
            />
          </fieldset>
        </div>
      </section>
    </div >
  )
}

export default React.memo<Props>(FormVehicle)
