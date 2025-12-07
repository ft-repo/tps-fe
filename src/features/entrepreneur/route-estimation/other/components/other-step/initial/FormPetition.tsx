/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import { FieldTypeForOther } from '@/@types/entrepreneur/route-estimation';
import { getNewDistrictAPI, getNewProvinceAPI, getNewSubDistrictAPI, ProvinceAPIResponse, SubDistrictAPIResponse } from '@/services/master/MasterService';
import { useAppSelector } from '@/store';
import { Checkbox, Col, DatePicker, Input, message, Row, Select } from 'antd';
import React, { useCallback, useEffect, useState } from 'react'
import { Control, Controller, UseFormSetValue, useFormState, useWatch } from 'react-hook-form'

interface Props {
  control: Control<FieldTypeForOther>;
  setValue: UseFormSetValue<FieldTypeForOther>;
}

const FormPetition: React.FC<Props> = (props) => {
  const { control, setValue } = props
  const { province, district, sub_district, entity_type } = useAppSelector((state) => state.master)
  const {
    company_address,
    company_village_number,
    company_alley,
    company_road,
    company_province,
    company_district,
    company_sub_district,
    company_postcode,
    transferer_company_province,
    transferer_company_district,
    transferer_company_sub_district,
  } = useWatch({ control })
  const { errors } = useFormState({ control })
  // CONTACT
  const [contactProvince, setContactProvince] = useState<ProvinceAPIResponse[]>([])
  const [contactDistrict, setContactDistrict] = useState<ProvinceAPIResponse[]>([])
  const [contactSubDistrict, setContactSubDistrict] = useState<SubDistrictAPIResponse[]>([])
  // POA
  const [poaProvince, setPoaProvince] = useState<ProvinceAPIResponse[]>([])
  const [poaDistrict, setPoaDistrict] = useState<ProvinceAPIResponse[]>([])
  const [poaSubDistrict, setPoaSubDistrict] = useState<SubDistrictAPIResponse[]>([])

  const fetchProvinceAPI = useCallback(async (selectType?: 'contact' | 'poa', provinceId?: string | number | null, districtId?: string | number | null, subDistrictId?: string | number | null) => {
    try {
      const response = await getNewProvinceAPI({
        province_id: provinceId ? provinceId : null,
        district_id: districtId ? districtId : null,
        sub_district_id: subDistrictId ? subDistrictId : null
      })
      if (response.status === 200) {
        if (selectType === 'contact') {
          setContactProvince(response.data)
        } else if (selectType === 'poa') {
          setPoaProvince(response.data)
        } else {
          setContactProvince(response.data)
          setPoaProvince(response.data)
        }
      } else {
        console.log(response)
      }
    } catch (error) {
      if (error instanceof Error) {
        message.error(error.message)
      } else {
        console.error(error)
      }
    }
  }, [])

  const fetchDistrictAPI = useCallback(async (selectType?: 'contact' | 'poa', provinceId?: string | number | null, districtId?: string | number | null, subDistrictId?: string | number | null) => {
    try {
      const response = await getNewDistrictAPI({
        province_id: provinceId ? provinceId : null,
        district_id: districtId ? districtId : null,
        sub_district_id: subDistrictId ? subDistrictId : null
      })
      if (response.status === 200) {
        if (selectType === 'contact') {
          setContactDistrict(response.data)
        } else if (selectType === 'poa') {
          setPoaDistrict(response.data)
        } else {
          setContactDistrict(response.data)
          setPoaDistrict(response.data)
        }
      } else {
        console.log(response)
      }
    } catch (error) {
      if (error instanceof Error) {
        message.error(error.message)
      } else {
        console.error(error)
      }
    }
  }, [])

  const fetchSubDistrictAPI = useCallback(async (selectType?: 'contact' | 'poa', provinceId?: string | number | null, districtId?: string | number | null, subDistrictId?: string | number | null) => {
    try {
      const response = await getNewSubDistrictAPI({
        province_id: provinceId ? provinceId : null,
        district_id: districtId ? districtId : null,
        sub_district_id: subDistrictId ? subDistrictId : null
      })
      if (response.status === 200) {
        if (selectType === 'contact') {
          setContactSubDistrict(response.data)
        } else if (selectType === 'poa') {
          setPoaSubDistrict(response.data)
        } else {
          setContactSubDistrict(response.data)
          setPoaSubDistrict(response.data)
        }
      } else {
        console.log(response)
      }
    } catch (error) {
      if (error instanceof Error) {
        message.error(error.message)
      } else {
        console.error(error)
      }
    }
  }, [])

  useEffect(() => {
    fetchProvinceAPI()
  }, [])

  useEffect(() => {
    fetchDistrictAPI()
  }, [])

  useEffect(() => {
    fetchSubDistrictAPI()
  }, [])

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
                    <label>ข้าพเจ้า (ชื่อบริษัท / ห้าง / ร้าน) <span className='text-red-500'>*</span></label>
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
                    <label>ชื่อผู้ติดต่อ / มอบอำนาจ <span className='text-red-500'>*</span></label>
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
                    <label>บ้านเลขที่ <span className='text-red-500'>*</span></label>
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
                        field.onChange(e.target.value.replace(/[^0-9]/g, ''))
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
                    <label>หมู่ที่ <span className='text-red-500'>*</span></label>
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
                        field.onChange(e.target.value.replace(/[^0-9]/g, ''))
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
                    <label>ตรอก / ซอย <span className='text-red-500'>*</span></label>
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
                    <label>ถนน <span className='text-red-500'>*</span></label>
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
                required: 'กรุณาเลือกจังหวัด'
              }}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>จังหวัด <span className='text-red-500'>*</span></label>
                    <Select
                      {...field}
                      allowClear
                      showSearch
                      placeholder='กรุณาเลือก'
                      options={contactProvince}
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
                      onChange={(value) => {
                        field.onChange(value)
                        // fetchProvinceAPI('contact', value, company_district, company_sub_district)
                        fetchDistrictAPI('contact', value, company_district, company_sub_district)
                        fetchSubDistrictAPI('contact', value, company_district, company_sub_district)
                        // SET VALUE
                        setValue('company_district', null)
                        setValue('company_sub_district', null)
                        setValue('company_postcode', '')
                        // NO VALUE
                        if (!value) {
                          fetchProvinceAPI('contact')
                        }
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
                    <label>เขต / อำเภอ <span className='text-red-500'>*</span></label>
                    <Select
                      {...field}
                      allowClear
                      showSearch
                      disabled={!company_province}
                      placeholder='กรุณาเลือก'
                      options={contactDistrict}
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
                      onChange={(value) => {
                        field.onChange(value)
                        fetchProvinceAPI('contact', company_province, value, company_sub_district)
                        // fetchDistrictAPI('contact', value, company_district, company_sub_district)
                        fetchSubDistrictAPI('contact', null, value, company_sub_district)
                        // SET VALUE
                        setValue('company_sub_district', null)
                        setValue('company_postcode', '')
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
                    <label>แขวง / ตำบล <span className='text-red-500'>*</span></label>
                    <Select
                      {...field}
                      allowClear
                      showSearch
                      disabled={!company_district}
                      placeholder='กรุณาเลือก'
                      options={contactSubDistrict}
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
                      onChange={(value) => {
                        field.onChange(value)
                        fetchProvinceAPI('contact', company_province, company_district, value)
                        fetchDistrictAPI('contact', company_province, company_district, value)
                        // fetchSubDistrictAPI('contact', value, company_district, company_sub_district)
                        const zip_code = contactSubDistrict.find(item => item.id === value)?.zip_code
                        if (zip_code) {
                          setValue('company_postcode', String(zip_code))
                        }
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
                    <label>รหัสไปรษณีย์ <span className='text-red-500'>*</span></label>
                    <Input
                      {...field}
                      name={field.name}
                      disabled={!company_sub_district}
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
                    <label>ประเภทนิติบุคคล <span className='text-red-500'>*</span></label>
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
                    <label>วันที่จดทะเบียน <span className='text-red-500'>*</span></label>
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
                    <label>บ้านเลขที่ <span className='text-red-500'>*</span></label>
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
                    <label>หมู่ที่ <span className='text-red-500'>*</span></label>
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
                    <label>ตรอก / ซอย <span className='text-red-500'>*</span></label>
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
                    <label>ถนน <span className='text-red-500'>*</span></label>
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
                    <label>จังหวัด <span className='text-red-500'>*</span></label>
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
                    <label>เขต / อำเภอ <span className='text-red-500'>*</span></label>
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
                    <label>แขวง / ตำบล <span className='text-red-500'>*</span></label>
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
                    <label>รหัสไปรษณีย์ <span className='text-red-500'>*</span></label>
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
                    <label>ชื่อผู้ได้รับมอบอำนาจ <span className='text-red-500'>*</span></label>
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
                    <label>เบอร์โทรศัพท์ <span className='text-red-500'>*</span></label>
                    <Input
                      {...field}
                      name={field.name}
                      placeholder='กรุณาระบุ'
                      className='w-full'
                      size='large'
                      style={{
                        fontFamily: 'Noto Sans Thai'
                      }}
                      maxLength={10}
                      onChange={(e) => {
                        field.onChange(e.target.value.replace(/[^0-9.]/g, ""))
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
                    <label>บ้านเลขที่ <span className='text-red-500'>*</span></label>
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
                        field.onChange(e.target.value.replace(/[^0-9]/g, ''))
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
                    <label>หมู่ที่ <span className='text-red-500'>*</span></label>
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
                        field.onChange(e.target.value.replace(/[^0-9]/g, ''))
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
                    <label>ตรอก / ซอย <span className='text-red-500'>*</span></label>
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
                    <label>ถนน <span className='text-red-500'>*</span></label>
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
                    <label>จังหวัด <span className='text-red-500'>*</span></label>
                    <Select
                      {...field}
                      allowClear
                      showSearch
                      placeholder='กรุณาเลือก'
                      options={poaProvince}
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
                      onChange={(value) => {
                        field.onChange(value)
                        // fetchProvinceAPI('poa', value, transferer_company_district, transferer_company_sub_district)
                        fetchDistrictAPI('poa', value, transferer_company_district, transferer_company_sub_district)
                        fetchSubDistrictAPI('poa', value, transferer_company_district, transferer_company_sub_district)
                        // SET VALUE
                        setValue('transferer_company_district', null)
                        setValue('transferer_company_sub_district', null)
                        setValue('transferer_company_postcode', '')
                        if (!value) {
                          fetchProvinceAPI('poa')
                        }
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
                    <label>เขต / อำเภอ <span className='text-red-500'>*</span></label>
                    <Select
                      {...field}
                      allowClear
                      showSearch
                      disabled={!transferer_company_province}
                      placeholder='กรุณาเลือก'
                      options={poaDistrict}
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
                      onChange={(value) => {
                        field.onChange(value)
                        fetchProvinceAPI('poa', transferer_company_province, value, transferer_company_sub_district)
                        // fetchDistrictAPI('poa', transferer_company_province, value, transferer_company_sub_district)
                        fetchSubDistrictAPI('poa', null, value, transferer_company_sub_district)
                        // SET VALUE
                        setValue('transferer_company_sub_district', null)
                        setValue('transferer_company_postcode', '')
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
                    <label>แขวง / ตำบล <span className='text-red-500'>*</span></label>
                    <Select
                      {...field}
                      allowClear
                      showSearch
                      disabled={!transferer_company_district}
                      placeholder='กรุณาเลือก'
                      options={poaSubDistrict}
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
                      onChange={(value) => {
                        field.onChange(value)
                        fetchProvinceAPI('poa', transferer_company_province, transferer_company_district, value)
                        fetchDistrictAPI('poa', transferer_company_province, transferer_company_district, value)
                        // fetchSubDistrictAPI('poa', transferer_company_province, transferer_company_district, value)
                        // SET VALUE
                        const zip_code = poaSubDistrict.find(item => item.id === value)?.zip_code
                        setValue('transferer_company_postcode', String(zip_code))
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
                    <label>รหัสไปรษณีย์ <span className='text-red-500'>*</span></label>
                    <Input
                      {...field}
                      name={field.name}
                      disabled={!transferer_company_sub_district}
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
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
            <Controller
              name='is_same'
              control={control}
              render={({ field }) => {
                return (
                  <fieldset>
                    <Checkbox.Group
                      {...field}
                      name={field.name}
                      options={[
                        {
                          label: 'ใช้ที่อยู่ตามข้อมูลผู้ประสงค์ขออนุญาต',
                          value: true
                        }
                      ]}
                      onChange={(e) => {
                        field.onChange(e)
                        if (e.length) {
                          setValue('transferer_company_address', String(company_address))
                          setValue('transferer_company_village_no', String(company_village_number))
                          setValue('transferer_company_alley', String(company_alley))
                          setValue('transferer_company_road', String(company_road))
                          setValue('transferer_company_province', company_province ? Number(company_province) : null)
                          setValue('transferer_company_district', company_district ? Number(company_district) : null)
                          setValue('transferer_company_sub_district', company_sub_district ? Number(company_sub_district) : null)
                          setValue('transferer_company_postcode', String(company_postcode))
                        } else {
                          setValue('transferer_company_address', '')
                          setValue('transferer_company_village_no', '')
                          setValue('transferer_company_alley', '')
                          setValue('transferer_company_road', '')
                          setValue('transferer_company_province', null)
                          setValue('transferer_company_district', null)
                          setValue('transferer_company_sub_district', null)
                          setValue('transferer_company_postcode', '')
                        }
                      }}
                    />
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
