import React from 'react'
import { Input, Select } from '@/components/ui'

const FormRouteEstimation = () => {

  return (
    <form>
      <section>
        <div className="grid grid-cols-8 gap-4">
          <div className="col-span-5">
            <fieldset>
              <label>เลือกประเภทจับคู่</label>
              <Input placeholder="เลือกประเภทจับคู่" />
            </fieldset>
          </div>
          <div className="col-span-3">
            <fieldset>
              <label>รัศมีวงเลี้ยว</label>
              <Input placeholder="รัศมีวงเลี้ยว" />
            </fieldset>
          </div>
          <div className="col-span-2">
            <fieldset>
              <label>เลขทะเบียน / เลขตัวรถ</label>
              <Select
                placeholder="กรุณาเลือก"
                options={[]}
              />
            </fieldset>
          </div>
          <div className="col-span-2">
            <fieldset>
              <label>เลขทะเบียน / เลขตัวรถ</label>
              <Select
                placeholder="กรุณาเลือก"
                options={[]}
              />
            </fieldset>
          </div>
          <div className="col-span-2">
            <fieldset>
              <label>เลขทะเบียน / เลขตัวรถ</label>
              <Select
                placeholder="กรุณาเลือก"
                options={[]}
              />
            </fieldset>
          </div>
        </div>
      </section>
      <section className='mt-5'>
        <h5>น้ำหนักลงเพลา รถลากจูง (กิโลกรัม)</h5>
        <div className="grid grid-cols-8 gap-4">
          <div className="col-span-2">
            <fieldset>
              <Input
                placeholder="กรุณาระบุ"
              />
            </fieldset>
          </div>
          <div className="col-span-2">
            <fieldset>
              <Input
                placeholder="กรุณาระบุ"
              />
            </fieldset>
          </div>
          <div className="col-span-2">
            <fieldset>
              <Input
                placeholder="กรุณาระบุ"
              />
            </fieldset>
          </div>
          <div className="col-span-2">
            <fieldset>
              <Input
                placeholder="กรุณาระบุ"
              />
            </fieldset>
          </div>
        </div>
      </section>
      <section className='mt-5'>
        <h5>น้ำหนักลงเพลา รถกึ่งพ่วง (กิโลกรัม)</h5>
        <div className="grid grid-cols-8 gap-4">
          <div className="col-span-2">
            <fieldset>
              <Input
                placeholder="กรุณาระบุ"
              />
            </fieldset>
          </div>
          <div className="col-span-2">
            <fieldset>
              <Input
                placeholder="กรุณาระบุ"
              />
            </fieldset>
          </div>
          <div className="col-span-2">
            <fieldset>
              <Input
                placeholder="กรุณาระบุ"
              />
            </fieldset>
          </div>
          <div className="col-span-2">
            <fieldset>
              <Input
                placeholder="กรุณาระบุ"
              />
            </fieldset>
          </div>
        </div>
      </section>
      <section className='mt-5'>
        <h5>เส้นทาง</h5>
        <div className="grid grid-cols-8 gap-4">
          <div className="col-span-4">
            <fieldset>
              <label>ต้นทาง</label>
              <Input
                placeholder="ต้นทาง"
              />
            </fieldset>
          </div>
          <div className="col-span-4">
            <fieldset>
              <label>ปลายทาง</label>
              <Input
                placeholder="ปลายทาง"
              />
            </fieldset>
          </div>
        </div>
      </section>
    </form>
  )
}

export default FormRouteEstimation
