/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import { FieldTypeForOther } from '@/@types/entrepreneur/route-estimation';
import { useAppSelector } from '@/store';
import { Col, DatePicker, Input, Row, Select } from 'antd';
import React from 'react'
import { Control, Controller, FieldErrors, UseFormSetValue } from 'react-hook-form'

interface Props {
  control: Control<FieldTypeForOther>;
  setValue: UseFormSetValue<FieldTypeForOther>;
  errors: FieldErrors<FieldTypeForOther>;
}

const FormPetition: React.FC<Props> = (props) => {
  const { control, errors } = props
  const { province, district, sub_district, entity_type } = useAppSelector((state) => state.master)

  return (
    <div>
      <div className='border-2 rounded-md p-4 mb-3'>
        <h5>ข้อมูลผู้ประสงค์ขออนุญาต</h5>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
            <Controller
              disabled
              name='company_name'
              control={control}
              rules={{
                required: 'กรุณาระบุชื่อบริษัท / ห้าง / ร้าน'
              }}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>ข้าพเจ้า (ชื่อบริษัท / ห้าง / ร้าน)</label>
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
                    {!!errors.company_name &&
                      <p className='text-red-500'>{errors.company_name.message}</p>
                    }
                  </fieldset>
                )
              }}
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
            <Controller
              disabled
              name='company_contactor'
              control={control}
              rules={{
                required: 'กรุณาระบุชื่อผู้ติดต่อ / มอบอำนาจ'
              }}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>ชื่อผู้ติดต่อ / มอบอำนาจ</label>
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
                    {!!errors.company_contactor &&
                      <p className='text-red-500'>{errors.company_contactor.message}</p>
                    }
                  </fieldset>
                )
              }}
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={6} xxl={6}>
            <Controller
              name='company_address'
              control={control}
              rules={{
                required: 'กรุณาระบุบ้านเลขที่'
              }}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>บ้านเลขที่</label>
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
                    {!!errors.company_address &&
                      <p className='text-red-500'>{errors.company_address.message}</p>
                    }
                  </fieldset>
                )
              }}
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={6} xxl={6}>
            <Controller
              name='company_village_number'
              control={control}
              rules={{
                required: 'กรุณาระบุหมู่ที่'
              }}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>หมู่ที่</label>
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
                    {!!errors.company_village_number &&
                      <p className='text-red-500'>{errors.company_village_number.message}</p>
                    }
                  </fieldset>
                )
              }}
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={6} xxl={6}>
            <Controller
              name='company_alley'
              control={control}
              rules={{
                required: 'กรุณาระบุตรอก / ซอย'
              }}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>ตรอก / ซอย</label>
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
                    {!!errors.company_alley &&
                      <p className='text-red-500'>{errors.company_alley.message}</p>
                    }
                  </fieldset>
                )
              }}
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={6} xxl={6}>
            <Controller
              name='company_road'
              control={control}
              rules={{
                required: 'กรุณาระบุถนน'
              }}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>ถนน</label>
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
                    {!!errors.company_road &&
                      <p className='text-red-500'>{errors.company_road.message}</p>
                    }
                  </fieldset>
                )
              }}
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={6} xxl={6}>
            <Controller
              name='company_province'
              control={control}
              rules={{
                required: 'กรุณาระบุจังหวัด'
              }}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>จังหวัด</label>
                    <Select
                      {...field}
                      allowClear
                      showSearch
                      placeholder='กรุณาเลือก'
                      options={province}
                      fieldNames={{
                        label: 'name_th',
                        value: 'id'
                      }}
                      filterOption={(input, option) => {
                        return option ? option.name_th.toLowerCase().indexOf(input.toLowerCase()) >= 0 : false;
                      }}
                      className='w-full'
                      size='large'
                      style={{
                        fontFamily: 'Noto Sans Thai'
                      }}
                    />
                    {!!errors.company_province &&
                      <p className='text-red-500'>{errors.company_province.message}</p>
                    }
                  </fieldset>
                )
              }}
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={6} xxl={6}>
            <Controller
              name='company_district'
              control={control}
              rules={{
                required: 'กรุณาระบุเขต / อำเภอ'
              }}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>เขต / อำเภอ</label>
                    <Select
                      {...field}
                      allowClear
                      showSearch
                      placeholder='กรุณาเลือก'
                      options={district}
                      fieldNames={{
                        label: 'name_th',
                        value: 'id'
                      }}
                      filterOption={(input, option) => {
                        return option ? option.name_th.toLowerCase().indexOf(input.toLowerCase()) >= 0 : false;
                      }}
                      className='w-full'
                      size='large'
                      style={{
                        fontFamily: 'Noto Sans Thai'
                      }}
                    />
                    {!!errors.company_district &&
                      <p className='text-red-500'>{errors.company_district.message}</p>
                    }
                  </fieldset>
                )
              }}
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={6} xxl={6}>
            <Controller
              name='company_sub_district'
              control={control}
              rules={{
                required: 'กรุณาระบุแขวง / ตำบล'
              }}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>แขวง / ตำบล</label>
                    <Select
                      {...field}
                      allowClear
                      showSearch
                      placeholder='กรุณาเลือก'
                      options={sub_district}
                      fieldNames={{
                        label: 'name_th',
                        value: 'id'
                      }}
                      filterOption={(input, option) => {
                        return option ? option.name_th.toLowerCase().indexOf(input.toLowerCase()) >= 0 : false;
                      }}
                      className='w-full'
                      size='large'
                      style={{
                        fontFamily: 'Noto Sans Thai'
                      }}
                    />
                    {!!errors.company_sub_district &&
                      <p className='text-red-500'>{errors.company_sub_district.message}</p>
                    }
                  </fieldset>
                )
              }}
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={6} xxl={6}>
            <Controller
              name='company_postcode'
              control={control}
              rules={{
                required: 'กรุณาระบุรหัสไปรษณีย์'
              }}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>รหัสไปรษณีย์</label>
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
                    {!!errors.company_postcode &&
                      <p className='text-red-500'>{errors.company_postcode.message}</p>
                    }
                  </fieldset>
                )
              }}
            />
          </Col>
        </Row>
      </div>
      <div className='border-2 rounded-md p-4 mb-3'>
        <h5>ข้อมูลนิติบุคคล</h5>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={24} lg={12} xl={18} xxl={18}>
            <Controller
              disabled
              name='business_type'
              control={control}
              rules={{
                required: 'กรุณาเลือกประเภทนิติบุคคล'
              }}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>ประเภทนิติบุคคล</label>
                    <Select
                      {...field}
                      allowClear
                      showSearch
                      placeholder='กรุณาเลือก'
                      options={entity_type}
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
                    {!!errors.business_type &&
                      <p className='text-red-500'>{errors.business_type.message}</p>
                    }
                  </fieldset>
                )
              }}
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={6} xxl={6}>
            <Controller
              disabled
              name='registered_date'
              control={control}
              rules={{
                required: 'กรุณาเลือกวันที่จดทะเบียน'
              }}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>วันที่จดทะเบียน</label>
                    <DatePicker
                      {...field}
                      name={field.name}
                      placeholder='กรุณาเลือกวันที่'
                      format={'DD/MM/YYYY'}
                      className='w-full'
                      size='large'
                      style={{
                        fontFamily: 'Noto Sans Thai'
                      }}
                    />
                    {!!errors.registered_date &&
                      <p className='text-red-500'>{errors.registered_date.message}</p>
                    }
                  </fieldset>
                )
              }}
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={6} xxl={6}>
            <Controller
              disabled
              name='registered_company_address'
              control={control}
              rules={{
                required: 'กรุณาระบุบ้านเลขที่'
              }}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>บ้านเลขที่</label>
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
                    {!!errors.registered_company_address &&
                      <p className='text-red-500'>{errors.registered_company_address.message}</p>
                    }
                  </fieldset>
                )
              }}
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={6} xxl={6}>
            <Controller
              disabled
              name='registered_company_village_no'
              control={control}
              rules={{
                required: 'กรุณาระบุหมู่ที่'
              }}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>หมู่ที่</label>
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
                    {!!errors.registered_company_village_no &&
                      <p className='text-red-500'>{errors.registered_company_village_no.message}</p>
                    }
                  </fieldset>
                )
              }}
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={6} xxl={6}>
            <Controller
              disabled
              name='registered_company_alley'
              control={control}
              rules={{
                required: 'กรุณาระบุตรอก / ซอย'
              }}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>ตรอก / ซอย</label>
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
                    {!!errors.registered_company_alley &&
                      <p className='text-red-500'>{errors.registered_company_alley.message}</p>
                    }
                  </fieldset>
                )
              }}
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={6} xxl={6}>
            <Controller
              disabled
              name='registered_company_road'
              control={control}
              rules={{
                required: 'กรุณาระบุถนน'
              }}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>ถนน</label>
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
                    {!!errors.registered_company_road &&
                      <p className='text-red-500'>{errors.registered_company_road.message}</p>
                    }
                  </fieldset>
                )
              }}
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={6} xxl={6}>
            <Controller
              disabled
              name='registered_company_province'
              control={control}
              rules={{
                required: 'กรุณาเลือกจังหวัด'
              }}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>จังหวัด</label>
                    <Select
                      {...field}
                      allowClear
                      showSearch
                      placeholder='กรุณาเลือก'
                      options={province}
                      fieldNames={{
                        label: 'name_th',
                        value: 'id'
                      }}
                      filterOption={(input, option) => {
                        return option ? option.name_th.toLowerCase().indexOf(input.toLowerCase()) >= 0 : false;
                      }}
                      className='w-full'
                      size='large'
                      style={{
                        fontFamily: 'Noto Sans Thai'
                      }}
                    />
                    {!!errors.registered_company_province &&
                      <p className='text-red-500'>{errors.registered_company_province.message}</p>
                    }
                  </fieldset>
                )
              }}
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={6} xxl={6}>
            <Controller
              disabled
              name='registered_company_district'
              control={control}
              rules={{
                required: 'กรุณาเลือกเขต / อำเภอ'
              }}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>เขต / อำเภอ</label>
                    <Select
                      {...field}
                      allowClear
                      showSearch
                      placeholder='กรุณาเลือก'
                      options={district}
                      fieldNames={{
                        label: 'name_th',
                        value: 'id'
                      }}
                      filterOption={(input, option) => {
                        return option ? option.name_th.toLowerCase().indexOf(input.toLowerCase()) >= 0 : false;
                      }}
                      className='w-full'
                      size='large'
                      style={{
                        fontFamily: 'Noto Sans Thai'
                      }}
                    />
                    {!!errors.registered_company_district &&
                      <p className='text-red-500'>{errors.registered_company_district.message}</p>
                    }
                  </fieldset>
                )
              }}
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={6} xxl={6}>
            <Controller
              disabled
              name='registered_company_sub_district'
              control={control}
              rules={{
                required: 'กรุณาเลือกแขวง / ตำบล'
              }}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>แขวง / ตำบล</label>
                    <Select
                      {...field}
                      allowClear
                      showSearch
                      placeholder='กรุณาเลือก'
                      options={sub_district}
                      fieldNames={{
                        label: 'name_th',
                        value: 'id'
                      }}
                      filterOption={(input, option) => {
                        return option ? option.name_th.toLowerCase().indexOf(input.toLowerCase()) >= 0 : false;
                      }}
                      className='w-full'
                      size='large'
                      style={{
                        fontFamily: 'Noto Sans Thai'
                      }}
                    />
                    {!!errors.registered_company_sub_district &&
                      <p className='text-red-500'>{errors.registered_company_sub_district.message}</p>
                    }
                  </fieldset>
                )
              }}
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={6} xxl={6}>
            <Controller
              disabled
              name='registered_company_postcode'
              control={control}
              rules={{
                required: 'กรุณาระบุรหัสไปรษณีย์'
              }}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>รหัสไปรษณีย์</label>
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
                    {!!errors.registered_company_postcode &&
                      <p className='text-red-500'>{errors.registered_company_postcode.message}</p>
                    }
                  </fieldset>
                )
              }}
            />
          </Col>
        </Row>
      </div>
      <div className='border-2 rounded-md p-4 mb-3'>
        <h5>ข้อมูลผู้ได้รับมอบอำนาจ</h5>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
            <Controller
              name='transferer_name'
              control={control}
              rules={{
                required: 'กรุณาระบุชื่อผู้ได้รับมอบอำนาจ'
              }}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>ชื่อผู้ได้รับมอบอำนาจ</label>
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
                    {!!errors.transferer_name &&
                      <p className='text-red-500'>{errors.transferer_name.message}</p>
                    }
                  </fieldset>
                )
              }}
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
            <Controller
              name='transferer_phone_number'
              control={control}
              rules={{
                required: 'กรุณาระบุเบอร์โทรศัพท์'
              }}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>เบอร์โทรศัพท์</label>
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
                    {!!errors.transferer_phone_number &&
                      <p className='text-red-500'>{errors.transferer_phone_number.message}</p>
                    }
                  </fieldset>
                )
              }}
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={6} xxl={6}>
            <Controller
              name='transferer_company_address'
              control={control}
              rules={{
                required: 'กรุณาระบุบ้านเลขที่'
              }}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>บ้านเลขที่</label>
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
                    {!!errors.transferer_company_address &&
                      <p className='text-red-500'>{errors.transferer_company_address.message}</p>
                    }
                  </fieldset>
                )
              }}
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={6} xxl={6}>
            <Controller
              name='transferer_company_village_no'
              control={control}
              rules={{
                required: 'กรุณาระบุหมู่ที่'
              }}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>หมู่ที่</label>
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
                    {!!errors.transferer_company_village_no &&
                      <p className='text-red-500'>{errors.transferer_company_village_no.message}</p>
                    }
                  </fieldset>
                )
              }}
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={6} xxl={6}>
            <Controller
              name='transferer_company_alley'
              control={control}
              rules={{
                required: 'กรุณาระบุตรอก / ซอย'
              }}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>ตรอก / ซอย</label>
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
                    {!!errors.transferer_company_alley &&
                      <p className='text-red-500'>{errors.transferer_company_alley.message}</p>
                    }
                  </fieldset>
                )
              }}
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={6} xxl={6}>
            <Controller
              name='transferer_company_road'
              control={control}
              rules={{
                required: 'กรุณาระบุถนน'
              }}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>ถนน</label>
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
                    {!!errors.transferer_company_road &&
                      <p className='text-red-500'>{errors.transferer_company_road.message}</p>
                    }
                  </fieldset>
                )
              }}
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={6} xxl={6}>
            <Controller
              name='transferer_company_province'
              control={control}
              rules={{
                required: 'กรุณาเลือกจังหวัด'
              }}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>จังหวัด</label>
                    <Select
                      {...field}
                      allowClear
                      showSearch
                      placeholder='กรุณาเลือก'
                      options={province}
                      fieldNames={{
                        label: 'name_th',
                        value: 'id'
                      }}
                      filterOption={(input, option) => {
                        return option ? option.name_th.toLowerCase().indexOf(input.toLowerCase()) >= 0 : false;
                      }}
                      className='w-full'
                      size='large'
                      style={{
                        fontFamily: 'Noto Sans Thai'
                      }}
                    />
                    {!!errors.transferer_company_province &&
                      <p className='text-red-500'>{errors.transferer_company_province.message}</p>
                    }
                  </fieldset>
                )
              }}
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={6} xxl={6}>
            <Controller
              name='transferer_company_district'
              control={control}
              rules={{
                required: 'กรุณาเลือกเขต / อำเภอ'
              }}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>เขต / อำเภอ</label>
                    <Select
                      {...field}
                      allowClear
                      showSearch
                      placeholder='กรุณาเลือก'
                      options={district}
                      fieldNames={{
                        label: 'name_th',
                        value: 'id'
                      }}
                      filterOption={(input, option) => {
                        return option ? option.name_th.toLowerCase().indexOf(input.toLowerCase()) >= 0 : false;
                      }}
                      className='w-full'
                      size='large'
                      style={{
                        fontFamily: 'Noto Sans Thai'
                      }}
                    />
                    {!!errors.transferer_company_district &&
                      <p className='text-red-500'>{errors.transferer_company_district.message}</p>
                    }
                  </fieldset>
                )
              }}
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={6} xxl={6}>
            <Controller
              name='transferer_company_sub_district'
              control={control}
              rules={{
                required: 'กรุณาเลือกแขวง / ตำบล'
              }}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>แขวง / ตำบล</label>
                    <Select
                      {...field}
                      allowClear
                      showSearch
                      placeholder='กรุณาเลือก'
                      options={sub_district}
                      fieldNames={{
                        label: 'name_th',
                        value: 'id'
                      }}
                      filterOption={(input, option) => {
                        return option ? option.name_th.toLowerCase().indexOf(input.toLowerCase()) >= 0 : false;
                      }}
                      className='w-full'
                      size='large'
                      style={{
                        fontFamily: 'Noto Sans Thai'
                      }}
                    />
                    {!!errors.transferer_company_sub_district &&
                      <p className='text-red-500'>{errors.transferer_company_sub_district.message}</p>
                    }
                  </fieldset>
                )
              }}
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={6} xxl={6}>
            <Controller
              name='transferer_company_postcode'
              control={control}
              rules={{
                required: 'กรุณาระบุรหัสไปรษณีย์'
              }}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>รหัสไปรษณีย์</label>
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
                    {!!errors.transferer_company_postcode &&
                      <p className='text-red-500'>{errors.transferer_company_postcode.message}</p>
                    }
                  </fieldset>
                )
              }}
            />
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default React.memo<Props>(FormPetition)
