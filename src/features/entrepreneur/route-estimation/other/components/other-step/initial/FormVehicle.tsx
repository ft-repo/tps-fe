/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import { FieldTypeForOther } from '@/@types/entrepreneur/route-estimation';
import { Control, Controller, FieldErrors, UseFormSetValue } from 'react-hook-form';
import { Col, Input, Row, Select } from 'antd';
import { useAppSelector } from '@/store';

interface Props {
  control: Control<FieldTypeForOther>;
  setValue: UseFormSetValue<FieldTypeForOther>;
  errors: FieldErrors<FieldTypeForOther>;
}

const FormVehicle: React.FC<Props> = (props) => {
  const { control, errors } = props
  const { vehicle_type } = useAppSelector(state => state.master)

  return (
    <div className='border-2 rounded-md p-4 mb-3'>
      <section>
        <h5>ข้อมูลยานพาหนะ</h5>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
            <Controller
              name='vehicle_appearance'
              control={control}
              rules={{
                required: 'กรุณาระบุลักษณะ / มาตราฐาน'
              }}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>ลักษณะ / มาตราฐาน</label>
                    <Input
                      {...field}
                      name={field.name}
                      placeholder='กรุณาระบุ'
                      className='w-full'
                      size='large'
                      style={{
                        fontFamily: 'Noto Sans Thai'
                      }}
                    />
                    {!!errors.vehicle_appearance &&
                      <p className='text-red-500'>{errors.vehicle_appearance.message}</p>
                    }
                  </fieldset>
                )
              }}
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
            <Controller
              name='vehicle_type'
              control={control}
              rules={{
                required: 'กรุณาเลือกประเภท'
              }}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>ประเภท</label>
                    <Select
                      {...field}
                      allowClear
                      showSearch
                      placeholder='กรุณาเลือก'
                      options={vehicle_type}
                      fieldNames={{
                        label: 'name',
                        value: 'id'
                      }}
                      filterOption={(input, option) => {
                        return option ? option.name.toLowerCase().indexOf(input.toLowerCase()) >= 0 : false;
                      }}
                      className='w-full'
                      size='large'
                      style={{
                        fontFamily: 'Noto Sans Thai'
                      }}
                    />
                    {!!errors.vehicle_type &&
                      <p className='text-red-500'>{errors.vehicle_type.message}</p>
                    }
                  </fieldset>
                )
              }}
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
            <Controller
              name='vehicle_license_plate'
              control={control}
              rules={{
                required: 'กรุณาระบุเลขทะเบียน'
              }}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>เลขทะเบียน</label>
                    <Input
                      {...field}
                      name={field.name}
                      placeholder='กรุณาระบุ'
                      className='w-full'
                      size='large'
                      style={{
                        fontFamily: 'Noto Sans Thai'
                      }}
                    />
                    {!!errors.vehicle_license_plate &&
                      <p className='text-red-500'>{errors.vehicle_license_plate.message}</p>
                    }
                  </fieldset>
                )
              }}
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
            <Controller
              name='vehicle_province'
              control={control}
              rules={{
                required: 'กรุณาระบุจังหวัด'
              }}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>จังหวัด</label>
                    <Input
                      {...field}
                      name={field.name}
                      placeholder='กรุณาระบุ'
                      className='w-full'
                      size='large'
                      style={{
                        fontFamily: 'Noto Sans Thai'
                      }}
                    />
                    {!!errors.vehicle_province &&
                      <p className='text-red-500'>{errors.vehicle_province.message}</p>
                    }
                  </fieldset>
                )
              }}
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
            <Controller
              name='vehicle_color'
              control={control}
              rules={{
                required: 'กรุณาระบุสี'
              }}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>สี</label>
                    <Input
                      {...field}
                      name={field.name}
                      placeholder='กรุณาระบุ'
                      className='w-full'
                      size='large'
                      style={{
                        fontFamily: 'Noto Sans Thai'
                      }}
                    />
                    {!!errors.vehicle_color &&
                      <p className='text-red-500'>{errors.vehicle_color.message}</p>
                    }
                  </fieldset>
                )
              }}
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
            <Controller
              name='vehicle_axles'
              control={control}
              rules={{
                required: 'กรุณาระบุจำนวนเพลา'
              }}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>จำนวนเพลา</label>
                    <Select
                      {...field}
                      allowClear
                      showSearch
                      placeholder='กรุณาเลือก'
                      options={[
                        {
                          label: '1 เพลา',
                          value: 1
                        },
                        {
                          label: '2 เพลา',
                          value: 2
                        },
                        {
                          label: '3 เพลา',
                          value: 3
                        },
                        {
                          label: '4 เพลา',
                          value: 4
                        },
                        {
                          label: '5 เพลา',
                          value: 5
                        },
                        {
                          label: '6 เพลา',
                          value: 6
                        },
                        {
                          label: '7 เพลา',
                          value: 7
                        },
                      ]}
                      className='w-full'
                      size='large'
                      style={{
                        fontFamily: 'Noto Sans Thai'
                      }}
                    />
                    {!!errors.vehicle_axles &&
                      <p className='text-red-500'>{errors.vehicle_axles.message}</p>
                    }
                  </fieldset>
                )
              }}
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
            <Controller
              name='vehicle_weight'
              control={control}
              rules={{
                required: 'กรุณาระบุน้ำหนักรวม (กิโลกรัม)'
              }}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>น้ำหนักรวม (กิโลกรัม)</label>
                    <Input
                      {...field}
                      name={field.name}
                      placeholder='กรุณาระบุ'
                      className='w-full'
                      size='large'
                      style={{
                        fontFamily: 'Noto Sans Thai'
                      }}
                      onChange={(e) => {
                        field.onChange(e.target.value.replace(/[^0-9.]/g, ""))
                      }}
                    />
                    {!!errors.vehicle_weight &&
                      <p className='text-red-500'>{errors.vehicle_weight.message}</p>
                    }
                  </fieldset>
                )
              }}
            />
          </Col>
        </Row>
      </section>
      <section className='mt-3'>
        <h5>น้ำหนักลงเพลา (กิโลกรัม)</h5>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={12} lg={6} xl={6} xxl={6}>
            <Controller
              name='vehicle_axles_weight1'
              control={control}
              rules={{
                required: 'กรุณาระบุน้ำหนักลงเพลา (กิโลกรัม)'
              }}
              render={({ field }) => {
                return (
                  <fieldset>
                    <Input
                      {...field}
                      name={field.name}
                      placeholder='กรุณาระบุ'
                      className='w-full'
                      size='large'
                      style={{
                        fontFamily: 'Noto Sans Thai'
                      }}
                      onChange={(e) => {
                        field.onChange(e.target.value.replace(/[^0-9.]/g, ""))
                      }}
                    />
                    {!!errors.vehicle_axles_weight1 &&
                      <p className='text-red-500'>{errors.vehicle_axles_weight1.message}</p>
                    }
                  </fieldset>
                )
              }}
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={6} xl={6} xxl={6}>
            <Controller
              name='vehicle_axles_weight2'
              control={control}
              rules={{
                required: 'กรุณาระบุน้ำหนักลงเพลา (กิโลกรัม)'
              }}
              render={({ field }) => {
                return (
                  <fieldset>
                    <Input
                      {...field}
                      name={field.name}
                      placeholder='กรุณาระบุ'
                      className='w-full'
                      size='large'
                      style={{
                        fontFamily: 'Noto Sans Thai'
                      }}
                      onChange={(e) => {
                        field.onChange(e.target.value.replace(/[^0-9.]/g, ""))
                      }}
                    />
                    {!!errors.vehicle_axles_weight2 &&
                      <p className='text-red-500'>{errors.vehicle_axles_weight2.message}</p>
                    }
                  </fieldset>
                )
              }}
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={6} xl={6} xxl={6}>
            <Controller
              name='vehicle_axles_weight3'
              control={control}
              rules={{
                required: 'กรุณาระบุน้ำหนักลงเพลา (กิโลกรัม)'
              }}
              render={({ field }) => {
                return (
                  <fieldset>
                    <Input
                      {...field}
                      name={field.name}
                      placeholder='กรุณาระบุ'
                      className='w-full'
                      size='large'
                      style={{
                        fontFamily: 'Noto Sans Thai'
                      }}
                      onChange={(e) => {
                        field.onChange(e.target.value.replace(/[^0-9.]/g, ""))
                      }}
                    />
                    {!!errors.vehicle_axles_weight3 &&
                      <p className='text-red-500'>{errors.vehicle_axles_weight3.message}</p>
                    }
                  </fieldset>
                )
              }}
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={6} xl={6} xxl={6}>
            <Controller
              name='vehicle_axles_weight4'
              control={control}
              rules={{
                required: 'กรุณาระบุน้ำหนักลงเพลา (กิโลกรัม)'
              }}
              render={({ field }) => {
                return (
                  <fieldset>
                    <Input
                      {...field}
                      name={field.name}
                      placeholder='กรุณาระบุ'
                      className='w-full'
                      size='large'
                      style={{
                        fontFamily: 'Noto Sans Thai'
                      }}
                      onChange={(e) => {
                        field.onChange(e.target.value.replace(/[^0-9.]/g, ""))
                      }}
                    />
                    {!!errors.vehicle_axles_weight4 &&
                      <p className='text-red-500'>{errors.vehicle_axles_weight4.message}</p>
                    }
                  </fieldset>
                )
              }}
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={6} xl={6} xxl={6}>
            <Controller
              name='vehicle_axles_weight5'
              control={control}
              rules={{
                required: 'กรุณาระบุน้ำหนักลงเพลา (กิโลกรัม)'
              }}
              render={({ field }) => {
                return (
                  <fieldset>
                    <Input
                      {...field}
                      name={field.name}
                      placeholder='กรุณาระบุ'
                      className='w-full'
                      size='large'
                      style={{
                        fontFamily: 'Noto Sans Thai'
                      }}
                      onChange={(e) => {
                        field.onChange(e.target.value.replace(/[^0-9.]/g, ""))
                      }}
                    />
                    {!!errors.vehicle_axles_weight4 &&
                      <p className='text-red-500'>{errors.vehicle_axles_weight4.message}</p>
                    }
                  </fieldset>
                )
              }}
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={6} xl={6} xxl={6}>
            <Controller
              name='vehicle_axles_weight6'
              control={control}
              rules={{
                required: 'กรุณาระบุน้ำหนักลงเพลา (กิโลกรัม)'
              }}
              render={({ field }) => {
                return (
                  <fieldset>
                    <Input
                      {...field}
                      name={field.name}
                      placeholder='กรุณาระบุ'
                      className='w-full'
                      size='large'
                      style={{
                        fontFamily: 'Noto Sans Thai'
                      }}
                      onChange={(e) => {
                        field.onChange(e.target.value.replace(/[^0-9.]/g, ""))
                      }}
                    />
                    {!!errors.vehicle_axles_weight4 &&
                      <p className='text-red-500'>{errors.vehicle_axles_weight4.message}</p>
                    }
                  </fieldset>
                )
              }}
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={6} xl={6} xxl={6}>
            <Controller
              name='vehicle_axles_weight7'
              control={control}
              rules={{
                required: 'กรุณาระบุน้ำหนักลงเพลา (กิโลกรัม)'
              }}
              render={({ field }) => {
                return (
                  <fieldset>
                    <Input
                      {...field}
                      name={field.name}
                      placeholder='กรุณาระบุ'
                      className='w-full'
                      size='large'
                      style={{
                        fontFamily: 'Noto Sans Thai'
                      }}
                      onChange={(e) => {
                        field.onChange(e.target.value.replace(/[^0-9.]/g, ""))
                      }}
                    />
                    {!!errors.vehicle_axles_weight4 &&
                      <p className='text-red-500'>{errors.vehicle_axles_weight4.message}</p>
                    }
                  </fieldset>
                )
              }}
            />
          </Col>
        </Row>
      </section>
    </div >
  )
}

export default React.memo<Props>(FormVehicle)
