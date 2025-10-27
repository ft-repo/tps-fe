/* eslint-disable import/no-unresolved */
/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React, { ReactElement, useCallback } from 'react'
import { Col, DatePicker, Input, Row, Select, message, Upload } from 'antd';
import { Control, Controller, UseFormSetValue, useFormState, useWatch } from 'react-hook-form';
import { FieldTypePetition } from '@/@types/entrepreneur/permit-list';
import { useAppSelector } from '@/store';
import { FaUpload as UploadIcon } from "react-icons/fa6";
import { postUploadSignedDocumentAPI } from '@/services/entrepreneur/PetitionService';
import { RcFile, UploadFile } from 'antd/es/upload';
import {
  AiOutlineEye as EyeOutlined,
  AiOutlineDelete as DeleteOutlined
} from "react-icons/ai";
import dayjs, { Dayjs } from 'dayjs';

interface Props {
  control: Control<FieldTypePetition>;
  setValue: UseFormSetValue<FieldTypePetition>;
}

const FormPermitRoute: React.FC<Props> = (props) => {
  const { control, setValue } = props
  const { details } = useAppSelector(state => state.auth.user)
  const { province } = useAppSelector(state => state.master)

  const { errors } = useFormState({ control })
  const { start_date } = useWatch({ control })

  const uploadFile = useCallback(async (fieldName: string, file: any) => {
    try {
      // POST
      const response = await postUploadSignedDocumentAPI({ upload: file[0].originFileObj })
      if (response.status === 200) {
        setValue(fieldName as any, response.data?.url)
      } else {
        console.log('Error')
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      } else {
        console.error(error)
      }
    }
  }, [setValue])

  const _itemRender = useCallback((
    originNode: ReactElement,
    file: UploadFile,
    fileList: UploadFile[],
    actions: {
      download: (file: UploadFile) => void,
      preview: (file: UploadFile) => void,
      remove: (file: UploadFile) => void
    }) => {
    if (file.type === 'application/pdf') {
      return (
        <div className='custom-upload-item'>
          {originNode}
          <div className='preview-overlay rounded-md'>
            <EyeOutlined
              className='preview-icon'
              onClick={() => {
                const url = URL.createObjectURL(file.originFileObj as RcFile);
                window.open(url);
              }}
            />
            <DeleteOutlined
              className='delete-icon'
              onClick={() => actions.remove(file)}
            />
          </div>
        </div>
      )
    }
    return originNode
  }, []);

  return (
    <>
      <section>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
            <fieldset>
              <label>ข้าพเจ้า (ชื่อบริษัท / ห้าง / ร้าน) <span className='text-red-500'>*</span></label>
              <Input
                disabled
                placeholder='กรุณาระบุ'
                className='w-full'
                size='large'
                style={{
                  fontFamily: 'Noto Sans Thai'
                }}
                defaultValue={details.business_details.business_name}
              />
            </fieldset>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
            <Controller
              name='start_date'
              control={control}
              rules={{
                required: 'กรุณาเลือกวันที่ (เริ่มต้น)'
              }}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>วันที่ (เริ่มต้น) <span className='text-red-500'>*</span></label>
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
                      onChange={(e) => {
                        field.onChange(e)
                        setValue('end_date', null)
                      }}
                    />
                    {!!errors.start_date &&
                      <p className='text-red-500'>{errors.start_date.message}</p>
                    }
                  </fieldset>
                )
              }}
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
            <Controller
              name='end_date'
              control={control}
              rules={{
                required: 'กรุณาเลือกวันที่ (สิ้นสุด)'
              }}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>วันที่ (สิ้นสุด) <span className='text-red-500'>*</span></label>
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
                      minDate={dayjs(start_date as Dayjs)}
                    />
                    {!!errors.end_date &&
                      <p className='text-red-500'>{errors.end_date.message}</p>
                    }
                  </fieldset>
                )
              }}
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
            <Controller
              name='contact_name'
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
                    {!!errors.contact_name &&
                      <p className='text-red-500'>{errors.contact_name.message}</p>
                    }
                  </fieldset>
                )
              }}
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
            <Controller
              name='phone_number'
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
                    />
                    {!!errors.phone_number &&
                      <p className='text-red-500'>{errors.phone_number.message}</p>
                    }
                  </fieldset>
                )
              }}
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
            <Controller
              name='project_name'
              control={control}
              rules={{
                required: 'กรุณาระบุชื่อโครงการ'
              }}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>ชื่อโครงการ <span className='text-red-500'>*</span></label>
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
                    {!!errors.project_name &&
                      <p className='text-red-500'>{errors.project_name.message}</p>
                    }
                  </fieldset>
                )
              }}
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
            <Controller
              name='start_point'
              control={control}
              rules={{
                required: 'กรุณาระบุขนส่งจาก'
              }}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>ขนส่งจาก <span className='text-red-500'>*</span></label>
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
                    {!!errors.start_point &&
                      <p className='text-red-500'>{errors.start_point.message}</p>
                    }
                  </fieldset>
                )
              }}
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
            <Controller
              name='start_province'
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
                    {!!errors.start_province &&
                      <p className='text-red-500'>{errors.start_province.message}</p>
                    }
                  </fieldset>
                )
              }}
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
            <Controller
              name='end_point'
              control={control}
              rules={{
                required: 'กรุณาระบุไปยัง'
              }}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>ไปยัง <span className='text-red-500'>*</span></label>
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
                    {!!errors.end_point &&
                      <p className='text-red-500'>{errors.end_point.message}</p>
                    }
                  </fieldset>
                )
              }}
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
            <Controller
              name='end_Povince'
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
                    {!!errors.end_Povince &&
                      <p className='text-red-500'>{errors.end_Povince.message}</p>
                    }
                  </fieldset>
                )
              }}
            />
          </Col>
        </Row>
      </section>
      <section className='mt-5'>
        <h5>เอกสารสำคัญ</h5>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={8}>
            <Controller
              name='poa_url.file'
              control={control}
              rules={{
                required: 'กรุณาอัปโหลดหนังสือมอบอำนาจ'
              }}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>หนังสือมอบอำนาจ <span className='text-red-500'>*</span></label>
                    <Upload
                      {...field}
                      fileList={field.value || []}
                      maxCount={1}
                      listType='picture-card'
                      accept='application/pdf'
                      beforeUpload={(file) => {
                        // DEFAULT VALUES
                        const allowList = ['application/pdf']
                        const maxFileSize = 10000000
                        // CHECK
                        const isListAvailable = allowList.some(item => item === file.type)
                        const isLt10 = file.size < maxFileSize
                        if (!isListAvailable) {
                          message.error('ประเภทไฟล์ไม่ถูกต้อง')
                          return Upload.LIST_IGNORE
                        }
                        if (!isLt10) {
                          message.error('ไม่สามารถอัปโหลดไฟล์ได้ ไฟล์ที่อัปโหลดมีขนาดเกิน 10 MB')
                          return Upload.LIST_IGNORE
                        }
                        return false
                      }}
                      itemRender={_itemRender}
                      onChange={(e) => {
                        field.onChange(e.fileList);
                        if (e.fileList.length) {
                          uploadFile('poa_url.url', e.fileList)
                        } else {
                          setValue('poa_url.url', '')
                        }
                      }}
                      onPreview={(e) => {
                        const url = URL.createObjectURL(e.originFileObj as RcFile);
                        window.open(url);
                      }}
                    >
                      {field.value.length ? null :
                        <div className="my-8 text-center">
                          <div className="text-6xl mb-4 flex justify-center">
                            <UploadIcon />
                          </div>
                          <p className="font-semibold text-gray-800 dark:text-white">
                            เพิ่มไฟล์
                          </p>
                          <p className="mt-1 opacity-60 dark:text-white">
                            กรุณาอัปโหลดไฟล์ประเภท PDF
                          </p>
                        </div>
                      }
                    </Upload>
                    {!!errors.poa_url?.file &&
                      <p className='text-red-500'>{errors.poa_url?.file.message}</p>
                    }
                  </fieldset>
                )
              }}
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={8}>
            <Controller
              name='mach_book_url.file'
              control={control}
              rules={{
                required: 'กรุณาอัปโหลดหนังสือวิศวะเครื่องกล'
              }}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>หนังสือวิศวะเครื่องกล <span className='text-red-500'>*</span></label>
                    <Upload
                      {...field}
                      fileList={field.value || []}
                      maxCount={1}
                      listType='picture-card'
                      accept='application/pdf'
                      beforeUpload={(file) => {
                        // DEFAULT VALUES
                        const allowList = ['application/pdf']
                        const maxFileSize = 10000000
                        // CHECK
                        const isListAvailable = allowList.some(item => item === file.type)
                        const isLt10 = file.size < maxFileSize
                        if (!isListAvailable) {
                          message.error('ประเภทไฟล์ไม่ถูกต้อง')
                          return Upload.LIST_IGNORE
                        }
                        if (!isLt10) {
                          message.error('ไม่สามารถอัปโหลดไฟล์ได้ ไฟล์ที่อัปโหลดมีขนาดเกิน 10 MB')
                          return Upload.LIST_IGNORE
                        }
                        return false
                      }}
                      itemRender={_itemRender}
                      onChange={(e) => {
                        field.onChange(e.fileList);
                        if (e.fileList.length) {
                          uploadFile('mach_book_url.url', e.fileList)
                        } else {
                          setValue('mach_book_url.url', '')
                        }
                      }}
                      onPreview={(e) => {
                        const url = URL.createObjectURL(e.originFileObj as RcFile);
                        window.open(url);
                      }}
                    >
                      {field.value.length ? null :
                        <div className="my-8 text-center">
                          <div className="text-6xl mb-4 flex justify-center">
                            <UploadIcon />
                          </div>
                          <p className="font-semibold text-gray-800 dark:text-white">
                            เพิ่มไฟล์
                          </p>
                          <p className="mt-1 opacity-60 dark:text-white">
                            กรุณาอัปโหลดไฟล์ประเภท PDF
                          </p>
                        </div>
                      }
                    </Upload>
                    {!!errors.mach_book_url?.file &&
                      <p className='text-red-500'>{errors.mach_book_url?.file.message}</p>
                    }
                  </fieldset>
                )
              }}
            />
          </Col>
        </Row>
      </section>
    </>

  )
}

export default React.memo<Props>(FormPermitRoute)
