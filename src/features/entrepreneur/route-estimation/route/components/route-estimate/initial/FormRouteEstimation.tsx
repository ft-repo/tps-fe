/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable import/no-unresolved */
import React from 'react'
import { Input, Select } from '@/components/ui'
import { Control, Controller } from 'react-hook-form'
import { FieldType, FieldArray } from '@/@types/entrepreneur/route-estimation'
import CardVehicleDetails from './CardVehicleDetails';
import VehicleSummary from './VehicleSummary';
import { SUMMARY_DATA, VEHICLE_DATA } from '../../../mock';

interface Props {
  formItem: FieldArray;
  formIndex: number;
  control: Control<FieldType>
}

const FormRouteEstimation: React.FC<Props> = (props) => {
  const { formItem, formIndex, control } = props

  console.log(formItem)

  return (
    <>
      <section>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <Controller
              name={`form_template.'${formIndex}.'vehicle_type` as `form_template.0.vehicle_type`}
              control={control}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>เลือกประเภทจับคู่</label>
                    <Select
                      {...field}
                      name={`form_template.'${formIndex}.${field.name}`}
                      placeholder="เลือกประเภทจับคู่"
                      options={[
                        {
                          label: 'รถลากจูง + รถกึ่งพ่วง + สินค้า / เครื่องจักร',
                          value: '1',
                        },
                        {
                          label: 'รถลากจูง + รถกึ่งพ่วง',
                          value: '2',
                        },
                        {
                          label: 'สินค้า / เครื่องจักร',
                          value: '3',
                        },
                      ] as any}
                    />
                  </fieldset>
                )
              }}
            />
          </div>
          <div>
            <Controller
              name={`form_template.'${formIndex}.'turn_radius` as `form_template.0.turn_radius`}
              control={control}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>รัศมีวงเลี้ยว</label>
                    <Input
                      {...field}
                      name={`form_template.'${formIndex}.${field.name}`}
                      placeholder="รัศมีวงเลี้ยว"
                    />
                  </fieldset>
                )
              }}
            />
          </div>
        </div>
      </section>
      <section className='mt-5'>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <h5>รถลากจูง</h5>
            <Controller
              name={`form_template.'${formIndex}.'recovery_vehicle_license_plate` as `form_template.0.recovery_vehicle_license_plate`}
              control={control}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>เลขทะเบียน / เลขตัวรถ</label>
                    <Select
                      {...field}
                      name={`form_template.'${formIndex}.${field.name}`}
                      placeholder="กรุณาเลือก"
                      options={[
                        {
                          label: '83 - 9120',
                          value: '83 - 9120',
                        }
                      ] as any}
                    />
                  </fieldset>
                )
              }}
            />
          </div>
          <div>
            <h5>รถกึ่งพ่วง</h5>
            <Controller
              name={`form_template.'${formIndex}.'semi_trailer_license_plate` as `form_template.0.semi_trailer_license_plate`}
              control={control}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>เลขทะเบียน / เลขตัวรถ</label>
                    <Select
                      {...field}
                      name={`form_template.'${formIndex}.${field.name}`}
                      placeholder="กรุณาเลือก"
                      options={[
                        {
                          label: '83 - 9120',
                          value: '83 - 9120',
                        }
                      ] as any}
                    />
                  </fieldset>
                )
              }}
            />
          </div>
          <div>
            <h5>สินค้า/เครื่องจักร</h5>
            <Controller
              name={`form_template.'${formIndex}.'mechanical_vehicle_license_plate` as `form_template.0.mechanical_vehicle_license_plate`}
              control={control}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>เลขทะเบียน / เลขตัวรถ</label>
                    <Select
                      {...field}
                      name={`form_template.'${formIndex}.${field.name}`}
                      placeholder="กรุณาเลือก"
                      options={[
                        {
                          label: '83 - 9120',
                          value: '83 - 9120',
                        }
                      ] as any}
                    />
                  </fieldset>
                )
              }}
            />
          </div>
        </div>
      </section>
      <section className='mt-5'>
        <h5>น้ำหนักลงเพลา รถลากจูง (กิโลกรัม)</h5>
        <div className="grid lg:grid-cols-2 xl:grid-cols-8 gap-4">
          <div className="xl:col-span-2">
            <Controller
              name={`form_template.'${formIndex}.'recover_vehicle_chassis_weight_1` as `form_template.0.recover_vehicle_chassis_weight_1`}
              control={control}
              render={({ field }) => {
                return (
                  <fieldset>
                    <Input
                      {...field}
                      name={`form_template.'${formIndex}.${field.name}`}
                      placeholder="กรุณาระบุ"
                    />
                  </fieldset>
                )
              }}
            />
          </div>
          <div className="xl:col-span-2">
            <Controller
              name={`form_template.'${formIndex}.'recover_vehicle_chassis_weight_2` as `form_template.0.recover_vehicle_chassis_weight_2`}
              control={control}
              render={({ field }) => {
                return (
                  <fieldset>
                    <Input
                      {...field}
                      name={`form_template.'${formIndex}.${field.name}`}
                      placeholder="กรุณาระบุ"
                    />
                  </fieldset>
                )
              }}
            />
          </div>
          <div className="xl:col-span-2">
            <Controller
              name={`form_template.'${formIndex}.'recover_vehicle_chassis_weight_3` as `form_template.0.recover_vehicle_chassis_weight_3`}
              control={control}
              render={({ field }) => {
                return (
                  <fieldset>
                    <Input
                      {...field}
                      name={`form_template.'${formIndex}.${field.name}`}
                      placeholder="กรุณาระบุ"
                    />
                  </fieldset>
                )
              }}
            />
          </div>
        </div>
      </section>
      <section className='mt-5'>
        <h5>น้ำหนักลงเพลา รถกึ่งพ่วง (กิโลกรัม)</h5>
        <div className="grid lg:grid-cols-2 xl:grid-cols-8 gap-4">
          <div className="xl:col-span-2">
            <Controller
              name={`form_template.'${formIndex}.'semi_trailer_chassis_weight_1` as `form_template.0.semi_trailer_chassis_weight_1`}
              control={control}
              render={({ field }) => {
                return (
                  <fieldset>
                    <Input
                      {...field}
                      name={`form_template.'${formIndex}.${field.name}`}
                      placeholder="กรุณาระบุ"
                    />
                  </fieldset>
                )
              }}
            />
          </div>
          <div className="xl:col-span-2">
            <Controller
              name={`form_template.'${formIndex}.'semi_trailer_chassis_weight_2` as `form_template.0.semi_trailer_chassis_weight_2`}
              control={control}
              render={({ field }) => {
                return (
                  <fieldset>
                    <Input
                      {...field}
                      name={`form_template.'${formIndex}.${field.name}`}
                      placeholder="กรุณาระบุ"
                    />
                  </fieldset>
                )
              }}
            />
          </div>
          <div className="xl:col-span-2">
            <Controller
              name={`form_template.'${formIndex}.'semi_trailer_chassis_weight_3` as `form_template.0.semi_trailer_chassis_weight_3`}
              control={control}
              render={({ field }) => {
                return (
                  <fieldset>
                    <Input
                      {...field}
                      name={`form_template.'${formIndex}.${field.name}`}
                      placeholder="กรุณาระบุ"
                    />
                  </fieldset>
                )
              }}
            />
          </div>
          <div className="xl:col-span-2">
            <Controller
              name={`form_template.'${formIndex}.'semi_trailer_chassis_weight_4` as `form_template.0.semi_trailer_chassis_weight_4`}
              control={control}
              render={({ field }) => {
                return (
                  <fieldset>
                    <Input
                      {...field}
                      name={`form_template.'${formIndex}.${field.name}`}
                      placeholder="กรุณาระบุ"
                    />
                  </fieldset>
                )
              }}
            />
          </div>
        </div>
      </section>
      <section className='mt-5'>
        <h5>เส้นทาง</h5>
        <div className="grid grid-cols-2 xl:grid-cols-8 gap-4">
          <div className="xl:col-span-4">
            <Controller
              name={`form_template.'${formIndex}.'start_route` as `form_template.0.start_route`}
              control={control}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>ต้นทาง</label>
                    <Input
                      {...field}
                      name={`form_template.'${formIndex}.${field.name}`}
                      placeholder="ต้นทาง"
                    />
                  </fieldset>
                )
              }}
            />
          </div>
          <div className="xl:col-span-4">
            <Controller
              name={`form_template.'${formIndex}.'end_route` as `form_template.0.end_route`}
              control={control}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>ปลายทาง</label>
                    <Input
                      {...field}
                      name={`form_template.'${formIndex}.${field.name}`}
                      placeholder="ปลายทาง"
                    />
                  </fieldset>
                )
              }}
            />
          </div>
        </div>
      </section>
      <section className='mt-5'>
        <h5>รายละเอียด</h5>
        <section className='mb-3'>
          <VehicleSummary
            data={SUMMARY_DATA}
          />
        </section>
        <section>
          <CardVehicleDetails
            data={VEHICLE_DATA}
          />
        </section>
      </section>
    </>
  )
}

export default React.memo<Props>(FormRouteEstimation)
