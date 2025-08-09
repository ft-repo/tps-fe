/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import { FieldTypeForOther } from '@/@types/entrepreneur/route-estimation';
import { Input, Select } from '@/components/ui'
import { useAppSelector } from '@/store';
import React from 'react'
import { Control, Controller, UseFormSetValue } from 'react-hook-form'

interface Props {
  control: Control<FieldTypeForOther>;
  setValue: UseFormSetValue<FieldTypeForOther>
  setProvinceId: (provinceId: string) => void
  setDistrictId: (districtId: string) => void
}

const FormPetition: React.FC<Props> = (props) => {
  const { control, setValue, setProvinceId, setDistrictId, } = props
  const { province, district, sub_district, } = useAppSelector((state) => state.master)

  return (
    <div>
      <div className='border-2 rounded-md p-4 mb-3'>
        <h5>ข้อมูลผู้ประสงค์ขออนุญาต</h5>
        <div className='block sm:grid grid-cols-2 2xl:grid-cols-4 gap-3 mt-3'>
          <div className='col-span-2'>
            <Controller
              disabled
              name='company_name'
              control={control}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>ข้าพเจ้า (ชื่อบริษัท / ห้าง / ร้าน)</label>
                    <Input
                      disabled
                      {...field}
                      name={field.name}
                      placeholder='กรุณาระบุ'
                    />
                  </fieldset>
                )
              }}
            />
          </div>
          <div className='col-span-2'>
            <Controller
              disabled
              name='company_contactor'
              control={control}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>ชื่อผู้ติดต่อ / มอบอำนาจ</label>
                    <Input
                      disabled
                      {...field}
                      name={field.name}
                      placeholder='กรุณาระบุ'
                    />
                  </fieldset>
                )
              }}
            />
          </div>
          <Controller
            name='company_address'
            control={control}
            render={({ field }) => {
              return (
                <fieldset>
                  <label>บ้านเลขที่</label>
                  <Input
                    {...field}
                    name={field.name}
                    placeholder='กรุณาระบุ'
                  />
                </fieldset>
              )
            }}
          />
          <Controller
            name='company_village_number'
            control={control}
            render={({ field }) => {
              return (
                <fieldset>
                  <label>หมู่ที่</label>
                  <Input
                    {...field}
                    name={field.name}
                    placeholder='กรุณาระบุ'
                  />
                </fieldset>
              )
            }}
          />
          <Controller
            name='company_alley'
            control={control}
            render={({ field }) => {
              return (
                <fieldset>
                  <label>ตรอก / ซอย</label>
                  <Input
                    {...field}
                    name={field.name}
                    placeholder='กรุณาระบุ'
                  />
                </fieldset>
              )
            }}
          />
          <Controller
            name='company_road'
            control={control}
            render={({ field }) => {
              return (
                <fieldset>
                  <label>ถนน</label>
                  <Input
                    {...field}
                    name={field.name}
                    placeholder='กรุณาระบุ'
                  />
                </fieldset>
              )
            }}
          />
          <Controller
            name='company_sub_district'
            control={control}
            render={({ field }) => {
              return (
                <fieldset>
                  <label>แขวง / ตำบล</label>
                  <Select
                    {...field}
                    name={field.name}
                    placeholder='กรุณาเลือก'
                    options={sub_district.map((item) => {
                      return {
                        label: item.name_th,
                        value: item.id,
                      }
                    })}
                    onChange={(e: any) => {
                      setValue(
                        'company_sub_district',
                        e.value,
                      )
                      field.onChange(e)
                    }}
                    isDisabled={sub_district.length === 0}
                  />
                </fieldset>
              )
            }}
          />
          <Controller
            name='company_district'
            control={control}
            render={({ field }) => {
              return (
                <fieldset>
                  <label>เขต / อำเภอ</label>
                  <Select
                    {...field}
                    name={field.name}
                    placeholder='กรุณาเลือก'
                    options={district.map((item) => {
                      return {
                        label: item.name_th,
                        value: item.id,
                      }
                    })}
                    onChange={(e: any) => {
                      setValue(
                        'company_district',
                        e.value,
                      )
                      setDistrictId(e.value)
                      field.onChange(e)
                    }}
                    isDisabled={district.length === 0}
                  />
                </fieldset>
              )
            }}
          />
          <Controller
            name='company_province'
            control={control}
            render={({ field }) => {
              return (
                <fieldset>
                  <label>จังหวัด</label>
                  <Select
                    {...field}
                    name={field.name}
                    placeholder='กรุณาเลือก'
                    options={province.map((item) => {
                      return {
                        label: item.name_th,
                        value: item.id,
                      }
                    })}
                    onChange={(e: any) => {
                      setValue(
                        'company_province',
                        e.value,
                      )
                      setProvinceId(e.value)
                      field.onChange(e)
                    }}
                  />
                </fieldset>
              )
            }}
          />
          <Controller
            name='company_postcode'
            control={control}
            render={({ field }) => {
              return (
                <fieldset>
                  <label>รหัสไปรษณีย์</label>
                  <Input
                    {...field}
                    name={field.name}
                    placeholder='กรุณาระบุ'
                  />
                </fieldset>
              )
            }}
          />
        </div>
      </div>
      <div className='border-2 rounded-md p-4 mb-3'>
        <h5>ข้อมูลนิติบุคคล</h5>
        <div className='block sm:grid grid-cols-2 2xl:grid-cols-4 gap-3 mt-3'>
          <div className='col-span-2 2xl:col-span-3'>
            <Controller
              disabled
              name='business_type'
              control={control}
              render={({ field }) => {
                return (
                  <fieldset disabled>
                    <label>ประเภทนิติบุคคล</label>
                    <Select
                      disabled
                      {...field}
                      name={field.name}
                      placeholder='กรุณาเลือก'
                      options={[]}
                    />
                  </fieldset>
                )
              }}
            />
          </div>
          <div className='col-span-2 2xl:col-span-1'>
            <Controller
              disabled
              name='registered_date'
              control={control}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>วันที่จดทะเบียน</label>
                    <Input
                      disabled
                      {...field}
                      name={field.name}
                      placeholder='กรุณาระบุ'
                    />
                  </fieldset>
                )
              }}
            />
          </div>
          <Controller
            disabled
            name='registered_company_address'
            control={control}
            render={({ field }) => {
              return (
                <fieldset>
                  <label>บ้านเลขที่</label>
                  <Input
                    disabled
                    {...field}
                    name={field.name}
                    placeholder='กรุณาระบุ'
                  />
                </fieldset>
              )
            }}
          />
          <Controller
            disabled
            name='registered_company_village_no'
            control={control}
            render={({ field }) => {
              return (
                <fieldset>
                  <label>หมู่ที่</label>
                  <Input
                    disabled
                    {...field}
                    name={field.name}
                    placeholder='กรุณาระบุ'
                  />
                </fieldset>
              )
            }}
          />
          <Controller
            disabled
            name='registered_company_alley'
            control={control}
            render={({ field }) => {
              return (
                <fieldset>
                  <label>ตรอก / ซอย</label>
                  <Input
                    disabled
                    {...field}
                    name={field.name}
                    placeholder='กรุณาระบุ'
                  />
                </fieldset>
              )
            }}
          />
          <Controller
            disabled
            name='registered_company_road'
            control={control}
            render={({ field }) => {
              return (
                <fieldset>
                  <label>ถนน</label>
                  <Input
                    disabled
                    {...field}
                    name={field.name}
                    placeholder='กรุณาระบุ'
                  />
                </fieldset>
              )
            }}
          />
          <Controller
            disabled
            name='registered_company_sub_district'
            control={control}
            render={({ field }) => {
              return (
                <fieldset disabled>
                  <label>แขวง / ตำบล</label>
                  <Select
                    disabled
                    {...field}
                    name={field.name}
                    placeholder='กรุณาเลือก'
                    options={[]}
                  />
                </fieldset>
              )
            }}
          />
          <Controller
            disabled
            name='registered_company_district'
            control={control}
            render={({ field }) => {
              return (
                <fieldset disabled>
                  <label>เขต / อำเภอ</label>
                  <Select
                    disabled
                    {...field}
                    name={field.name}
                    placeholder='กรุณาเลือก'
                    options={[]}
                  />
                </fieldset>
              )
            }}
          />
          <Controller
            disabled
            name='registered_company_province'
            control={control}
            render={({ field }) => {
              return (
                <fieldset disabled>
                  <label>จังหวัด</label>
                  <Select
                    disabled
                    {...field}
                    name={field.name}
                    placeholder='กรุณาเลือก'
                    options={[]}
                  />
                </fieldset>
              )
            }}
          />
          <Controller
            disabled
            name='registered_company_postcode'
            control={control}
            render={({ field }) => {
              return (
                <fieldset>
                  <label>รหัสไปรษณีย์</label>
                  <Input
                    disabled
                    {...field}
                    name={field.name}
                    placeholder='กรุณาระบุ'
                  />
                </fieldset>
              )
            }}
          />
        </div>
      </div>
      <div className='border-2 rounded-md p-4 mb-3'>
        <h5>ข้อมูลผู้ได้รับมอบอำนาจ</h5>
        <div className='block sm:grid grid-cols-2 2xl:grid-cols-4 gap-3 mt-3'>
          <div className='col-span-2 2xl:col-span-3'>
            <Controller
              name='transferer_name'
              control={control}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>ชื่อผู้ได้รับมอบอำนาจ</label>
                    <Input
                      {...field}
                      name={field.name}
                      placeholder='กรุณาระบุ'
                    />
                  </fieldset>
                )
              }}
            />
          </div>
          <div className='col-span-2 2xl:col-span-1'>
            <Controller
              name='transferer_phone_number'
              control={control}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>เบอร์โทรศัพท์</label>
                    <Input
                      {...field}
                      name={field.name}
                      placeholder='กรุณาระบุ'
                    />
                  </fieldset>
                )
              }}
            />
          </div>
          <Controller
            name='transferer_company_address'
            control={control}
            render={({ field }) => {
              return (
                <fieldset>
                  <label>บ้านเลขที่</label>
                  <Input
                    {...field}
                    name={field.name}
                    placeholder='กรุณาระบุ'
                  />
                </fieldset>
              )
            }}
          />
          <Controller
            name='transferer_company_village_no'
            control={control}
            render={({ field }) => {
              return (
                <fieldset>
                  <label>หมู่ที่</label>
                  <Input
                    {...field}
                    name={field.name}
                    placeholder='กรุณาระบุ'
                  />
                </fieldset>
              )
            }}
          />
          <Controller
            name='transferer_company_alley'
            control={control}
            render={({ field }) => {
              return (
                <fieldset>
                  <label>ตรอก / ซอย</label>
                  <Input
                    {...field}
                    name={field.name}
                    placeholder='กรุณาระบุ'
                  />
                </fieldset>
              )
            }}
          />
          <Controller
            name='transferer_company_road'
            control={control}
            render={({ field }) => {
              return (
                <fieldset>
                  <label>ถนน</label>
                  <Input
                    {...field}
                    name={field.name}
                    placeholder='กรุณาระบุ'
                  />
                </fieldset>
              )
            }}
          />
          <Controller
            name='transferer_company_sub_district'
            control={control}
            render={({ field }) => {
              return (
                <fieldset>
                  <label>แขวง / ตำบล</label>
                  <Select
                    {...field}
                    name={field.name}
                    placeholder='กรุณาเลือก'
                    options={sub_district.map((item) => {
                      return {
                        label: item.name_th,
                        value: item.id,
                      }
                    })}
                    onChange={(e: any) => {
                      setValue(
                        'transferer_company_sub_district',
                        e.value,
                      )
                      field.onChange(e)
                    }}
                    isDisabled={sub_district.length === 0}
                  />
                </fieldset>
              )
            }}
          />
          <Controller
            name='transferer_company_district'
            control={control}
            render={({ field }) => {
              return (
                <fieldset>
                  <label>เขต / อำเภอ</label>
                  <Select
                    {...field}
                    name={field.name}
                    placeholder='กรุณาเลือก'
                    options={district.map((item) => {
                      return {
                        label: item.name_th,
                        value: item.id,
                      }
                    })}
                    onChange={(e: any) => {
                      setValue(
                        'transferer_company_district',
                        e.value,
                      )
                      setDistrictId(e.value)
                      field.onChange(e)
                    }}
                    isDisabled={district.length === 0}

                  />
                </fieldset>
              )
            }}
          />
          <Controller
            name='transferer_company_province'
            control={control}
            render={({ field }) => {
              return (
                <fieldset>
                  <label>จังหวัด</label>
                  <Select
                    {...field}
                    name={field.name}
                    placeholder='กรุณาเลือก'
                    options={province.map((item) => {
                      return {
                        label: item.name_th,
                        value: item.id,
                      }
                    })}
                    onChange={(e: any) => {
                      setValue(
                        'transferer_company_province',
                        e.value,
                      )
                      setProvinceId(e.value)
                      field.onChange(e)
                    }}
                  />
                </fieldset>
              )
            }}
          />
          <Controller
            name='registered_company_postcode'
            control={control}
            render={({ field }) => {
              return (
                <fieldset>
                  <label>รหัสไปรษณีย์</label>
                  <Input
                    {...field}
                    name={field.name}
                    placeholder='กรุณาระบุ'
                  />
                </fieldset>
              )
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default React.memo<Props>(FormPetition)
