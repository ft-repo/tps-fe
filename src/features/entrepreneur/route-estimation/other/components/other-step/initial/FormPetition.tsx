/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import { Input } from '@/components/ui'
import React from 'react'

interface Props {

}

const FormPetition: React.FC<Props> = (props) => {
  const { } = props

  return (
    <div>
      <div className='border-2 rounded-md p-4 mb-3'>
        <h5>ข้อมูลผู้ประสงค์ขออนุญาต</h5>
        <div className='block lg:grid grid-cols-2 lg:grid-cols-4 gap-3 mt-3'>
          <div className='col-span-2'>
            <fieldset>
              <label>ข้าพเจ้า (ชื่อบริษัท / ห้าง / ร้าน)</label>
              <Input
                placeholder='กรุณาระบุ'
              />
            </fieldset>
          </div>
          <div className='col-span-2'>
            <fieldset>
              <label>ชื่อผู้ติดต่อ / มอบอำนาจ</label>
              <Input
                placeholder='กรุณาระบุ'
              />
            </fieldset>
          </div>
          <fieldset>
            <label>บ้านเลขที่</label>
            <Input
              placeholder='กรุณาระบุ'
            />
          </fieldset>
          <fieldset>
            <label>หมู่ที่</label>
            <Input
              placeholder='กรุณาระบุ'
            />
          </fieldset>
          <fieldset>
            <label>ตรอก / ซอย</label>
            <Input
              placeholder='กรุณาระบุ'
            />
          </fieldset>
          <fieldset>
            <label>ถนน</label>
            <Input
              placeholder='กรุณาระบุ'
            />
          </fieldset>
          <fieldset>
            <label>แขวง / ตำบล</label>
            <Input
              placeholder='กรุณาระบุ'
            />
          </fieldset>
          <fieldset>
            <label>เขต / อำเภอ</label>
            <Input
              placeholder='กรุณาระบุ'
            />
          </fieldset>
          <fieldset>
            <label>จังหวัด</label>
            <Input
              placeholder='กรุณาระบุ'
            />
          </fieldset>
          <fieldset>
            <label>รหัสไปรษณีย์</label>
            <Input
              placeholder='กรุณาระบุ'
            />
          </fieldset>
        </div>
      </div>
      <div className='border-2 rounded-md p-4 mb-3'>
        <h5>ข้อมูลนิติบุคคล</h5>
        <div className='block lg:grid grid-cols-2 lg:grid-cols-4 gap-3 mt-3'>
          <div className='col-span-3'>
            <fieldset>
              <label>ประเภทนิติบุคคล</label>
              <Input
                placeholder='กรุณาระบุ'
              />
            </fieldset>
          </div>
          <fieldset>
            <label>วันที่จดทะเบียน</label>
            <Input
              placeholder='กรุณาระบุ'
            />
          </fieldset>
          <fieldset>
            <label>บ้านเลขที่</label>
            <Input
              placeholder='กรุณาระบุ'
            />
          </fieldset>
          <fieldset>
            <label>หมู่ที่</label>
            <Input
              placeholder='กรุณาระบุ'
            />
          </fieldset>
          <fieldset>
            <label>ตรอก / ซอย</label>
            <Input
              placeholder='กรุณาระบุ'
            />
          </fieldset>
          <fieldset>
            <label>ถนน</label>
            <Input
              placeholder='กรุณาระบุ'
            />
          </fieldset>
          <fieldset>
            <label>แขวง / ตำบล</label>
            <Input
              placeholder='กรุณาระบุ'
            />
          </fieldset>
          <fieldset>
            <label>เขต / อำเภอ</label>
            <Input
              placeholder='กรุณาระบุ'
            />
          </fieldset>
          <fieldset>
            <label>จังหวัด</label>
            <Input
              placeholder='กรุณาระบุ'
            />
          </fieldset>
          <fieldset>
            <label>รหัสไปรษณีย์</label>
            <Input
              placeholder='กรุณาระบุ'
            />
          </fieldset>
          <div className='col-span-3'>
            <fieldset>
              <label>ประเภทนิติบุคคล</label>
              <Input
                placeholder='กรุณาระบุ'
              />
            </fieldset>
          </div>
          <fieldset>
            <label>วันที่จดทะเบียน</label>
            <Input
              placeholder='กรุณาระบุ'
            />
          </fieldset>
        </div>
      </div>
      <div className='border-2 rounded-md p-4 mb-3'>
        <h5>ข้อมูลผู้ได้รับมอบอำนาจ</h5>
        <div className='block lg:grid grid-cols-2 lg:grid-cols-4 gap-3 mt-3'>
          <div className='col-span-2'>
            <fieldset>
              <label>ชื่อผู้ได้รับมอบอำนาจ</label>
              <Input
                placeholder='กรุณาระบุ'
              />
            </fieldset>
          </div>
          <div className='col-span-2'>
            <fieldset>
              <label>เบอร์โทรศัพท์</label>
              <Input
                placeholder='กรุณาระบุ'
              />
            </fieldset>
          </div>
          <fieldset>
            <label>ที่อยู่บ้านเลขที่ผู้ได้รับมอบอำนาจ</label>
            <Input
              placeholder='กรุณาระบุ'
            />
          </fieldset>
          <fieldset>
            <label>หมู่ที่</label>
            <Input
              placeholder='กรุณาระบุ'
            />
          </fieldset>
          <fieldset>
            <label>ตรอก / ซอย</label>
            <Input
              placeholder='กรุณาระบุ'
            />
          </fieldset>
          <fieldset>
            <label>ถนน</label>
            <Input
              placeholder='กรุณาระบุ'
            />
          </fieldset>
          <fieldset>
            <label>แขวง / ตำบล</label>
            <Input
              placeholder='กรุณาระบุ'
            />
          </fieldset>
          <fieldset>
            <label>เขต / อำเภอ</label>
            <Input
              placeholder='กรุณาระบุ'
            />
          </fieldset>
          <fieldset>
            <label>จังหวัด</label>
            <Input
              placeholder='กรุณาระบุ'
            />
          </fieldset>
          <fieldset>
            <label>รหัสไปรษณีย์</label>
            <Input
              placeholder='กรุณาระบุ'
            />
          </fieldset>
          <div className='col-span-3'>
            <fieldset>
              <label>ประเภทนิติบุคคล</label>
              <Input
                placeholder='กรุณาระบุ'
              />
            </fieldset>
          </div>
          <fieldset>
            <label>วันที่จดทะเบียน</label>
            <Input
              placeholder='กรุณาระบุ'
            />
          </fieldset>
        </div>
      </div>
    </div>
  )
}

export default React.memo<Props>(FormPetition)
