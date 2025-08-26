/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import { DocumentFieldType } from '@/@types/entrepreneur/route-estimation';
import { postUploadVehicleRegistrationDocumentAPI } from '@/services/entrepreneur/PetitionService';
import { Button, Input, message, Upload } from 'antd';
import React, { useCallback } from 'react'
import { Control, Controller, UseFormSetValue, useFormState } from 'react-hook-form';

interface Props {
  control: Control<DocumentFieldType>;
  setValue: UseFormSetValue<DocumentFieldType>;
}

const FormDocumentApproval: React.FC<Props> = (props) => {
  const { control, setValue } = props
  const { errors } = useFormState({ control })

  const uploadFile = useCallback(async (fieldName: string, file: any) => {
    try {
      // POST
      const response = await postUploadVehicleRegistrationDocumentAPI({ upload: file[0].originFileObj })
      if (response.status === 200) {
        setValue(fieldName as any, response.data?.url)
      } else {
        console.log(response)
      }
    } catch (error) {
      if (error instanceof Error) {
        message.error(error.message)
      } else {
        console.log(error)
      }
    }
  }, [setValue])

  return (
    <div className='border-2 rounded-md p-4 mb-3'>
      <h5>เอกสารรายการคำนวณและหนังสือรับรอง</h5>
      <div className='block mt-3'>
        <Controller
          name='petition_extended_audit_document.bridge_structure_calculation_url.file'
          control={control}
          rules={{
            required: 'กรุณาอัปโหลดรายการคำนวณแรงที่เกิดขึ้นต่อโครงสร้างสะพานรายสะพานที่อยู่ในเส้นทางขออนุญาต เมื่อบรรทุกน้ำหนัก'
          }}
          render={({ field }) => {
            return (
              <fieldset>
                <label>รายการคำนวณแรงที่เกิดขึ้นต่อโครงสร้างสะพานรายสะพานที่อยู่ในเส้นทางขออนุญาต เมื่อบรรทุกน้ำหนัก (รองรับไฟล์ .pdf เท่านั้น)</label>
                <Upload
                  {...field}
                  fileList={field.value || []}
                  maxCount={1}
                  listType='text'
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
                  onChange={(e) => {
                    field.onChange(e.fileList);
                    if (e.fileList.length) {
                      uploadFile('petition_extended_audit_document.bridge_structure_calculation_url.url', e.fileList)
                    } else {
                      setValue('petition_extended_audit_document.bridge_structure_calculation_url.url', '')
                    }
                  }}
                >
                  {field.value.length ? null :
                    <div className='flex items-center gap-1'>
                      <Input
                        readOnly
                        placeholder='กรุณาเลือกไฟล์'
                        // size='large'
                        className='w-full'
                        style={{
                          fontFamily: 'Noto Sans Thai'
                        }}
                      />
                      <Button
                        htmlType='button'
                        type='primary'
                      // size='large'
                      >
                        เลือก
                      </Button>
                    </div>
                  }
                </Upload>
                {!!errors.petition_extended_audit_document?.bridge_structure_calculation_url?.file &&
                  <p className='text-red-500'>{errors.petition_extended_audit_document?.bridge_structure_calculation_url?.file.message}</p>
                }
              </fieldset>
            )
          }}
        />
      </div>
      <div className='block mt-3'>
        <Controller
          name='petition_extended_audit_document.road_structure_calculation_url.file'
          control={control}
          rules={{
            required: 'กรุณาอัปโหลดรายการคำนวณแรงที่เกิดขึ้นต่อโครงสร้างทางตลอดเส้นทางที่อยู่ในเส้นทางขออนุญาต เมื่อบรรทุกน้ำหนัก'
          }}
          render={({ field }) => {
            return (
              <fieldset>
                <label>รายการคำนวณแรงที่เกิดขึ้นต่อโครงสร้างทางตลอดเส้นทางที่อยู่ในเส้นทางขออนุญาต เมื่อบรรทุกน้ำหนัก (รองรับไฟล์ .pdf เท่านั้น)</label>
                <Upload
                  {...field}
                  fileList={field.value || []}
                  maxCount={1}
                  listType='text'
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
                  onChange={(e) => {
                    field.onChange(e.fileList);
                    if (e.fileList.length) {
                      uploadFile('petition_extended_audit_document.road_structure_calculation_url.url', e.fileList)
                    } else {
                      setValue('petition_extended_audit_document.road_structure_calculation_url.url', '')
                    }
                  }}
                >
                  {field.value.length ? null :
                    <div className='flex items-center gap-1'>
                      <Input
                        readOnly
                        placeholder='กรุณาเลือกไฟล์'
                        // size='large'
                        className='w-full'
                        style={{
                          fontFamily: 'Noto Sans Thai'
                        }}
                      />
                      <Button
                        htmlType='button'
                        type='primary'
                      // size='large'
                      >
                        เลือก
                      </Button>
                    </div>
                  }
                </Upload>
                {!!errors.petition_extended_audit_document?.road_structure_calculation_url?.file &&
                  <p className='text-red-500'>{errors.petition_extended_audit_document?.road_structure_calculation_url?.file.message}</p>
                }
              </fieldset>
            )
          }}
        />
      </div>
      <div className='block mt-3'>
        <Controller
          name='petition_extended_audit_document.bridge_engineer_certificate_url.file'
          control={control}
          rules={{
            required: 'กรุณาอัปโหลดหนังสือรับรองของวิศวกรโยธาผู้คำนวณโครงสร้างสะพานพร้อมสำเนาใบอนุญาตผู้ประกอบวิชาชีพ (ระดับไม่ต่ำกว่าสามัญวิศวกร)'
          }}
          render={({ field }) => {
            return (
              <fieldset>
                <label>หนังสือรับรองของวิศวกรโยธาผู้คำนวณโครงสร้างสะพานพร้อมสำเนาใบอนุญาตผู้ประกอบวิชาชีพ (ระดับไม่ต่ำกว่าสามัญวิศวกร) (รองรับไฟล์ .pdf เท่านั้น)</label>
                <Upload
                  {...field}
                  fileList={field.value || []}
                  maxCount={1}
                  listType='text'
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
                  onChange={(e) => {
                    field.onChange(e.fileList);
                    if (e.fileList.length) {
                      uploadFile('petition_extended_audit_document.bridge_engineer_certificate_url.url', e.fileList)
                    } else {
                      setValue('petition_extended_audit_document.bridge_engineer_certificate_url.url', '')
                    }
                  }}
                >
                  {field.value.length ? null :
                    <div className='flex items-center gap-1'>
                      <Input
                        readOnly
                        placeholder='กรุณาเลือกไฟล์'
                        // size='large'
                        className='w-full'
                        style={{
                          fontFamily: 'Noto Sans Thai'
                        }}
                      />
                      <Button
                        htmlType='button'
                        type='primary'
                      // size='large'
                      >
                        เลือก
                      </Button>
                    </div>
                  }
                </Upload>
                {!!errors.petition_extended_audit_document?.bridge_engineer_certificate_url?.file &&
                  <p className='text-red-500'>{errors.petition_extended_audit_document?.bridge_engineer_certificate_url?.file.message}</p>
                }
              </fieldset>
            )
          }}
        />
      </div>
      <div className='block mt-3'>
        <Controller
          name='petition_extended_audit_document.road_engineer_certificate_url.file'
          control={control}
          rules={{
            required: 'กรุณาอัปโหลดหนังสือรับรองของวิศวกรโยธาผู้คำนวณโครงสร้างทางพร้อมสำเนาใบอนุญาตผู้ประกอบวิชาชีพ (ระดับไม่ต่ำกว่าสามัญวิศวกร)'
          }}
          render={({ field }) => {
            return (
              <fieldset>
                <label>หนังสือรับรองของวิศวกรโยธาผู้คำนวณโครงสร้างทางพร้อมสำเนาใบอนุญาตผู้ประกอบวิชาชีพ (ระดับไม่ต่ำกว่าสามัญวิศวกร) (รองรับไฟล์ .pdf เท่านั้น)</label>
                <Upload
                  {...field}
                  fileList={field.value || []}
                  maxCount={1}
                  listType='text'
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
                  onChange={(e) => {
                    field.onChange(e.fileList);
                    if (e.fileList.length) {
                      uploadFile('petition_extended_audit_document.road_engineer_certificate_url.url', e.fileList)
                    } else {
                      setValue('petition_extended_audit_document.road_engineer_certificate_url.url', '')
                    }
                  }}
                >
                  {field.value.length ? null :
                    <div className='flex items-center gap-1'>
                      <Input
                        readOnly
                        placeholder='กรุณาเลือกไฟล์'
                        // size='large'
                        className='w-full'
                        style={{
                          fontFamily: 'Noto Sans Thai'
                        }}
                      />
                      <Button
                        htmlType='button'
                        type='primary'
                      // size='large'
                      >
                        เลือก
                      </Button>
                    </div>
                  }
                </Upload>
                {!!errors.petition_extended_audit_document?.road_engineer_certificate_url?.file &&
                  <p className='text-red-500'>{errors.petition_extended_audit_document?.road_engineer_certificate_url?.file.message}</p>
                }
              </fieldset>
            )
          }}
        />
      </div>
      <div className='block mt-3'>
        <Controller
          name='petition_extended_audit_document.mechanical_engineer_certificate_url.file'
          control={control}
          rules={{
            required: 'กรุณาอัปโหลดหนังสือรับรองของวิศวกรเครื่องกลผู้คำนวณรัศมีวงเลี้ยว (ระดับไม่ต่ำกว่าสามัญวิศวกร)'
          }}
          render={({ field }) => {
            return (
              <fieldset>
                <label>หนังสือรับรองของวิศวกรเครื่องกลผู้คำนวณรัศมีวงเลี้ยว (ระดับไม่ต่ำกว่าสามัญวิศวกร) (รองรับไฟล์ .pdf เท่านั้น)</label>
                <Upload
                  {...field}
                  fileList={field.value || []}
                  maxCount={1}
                  listType='text'
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
                  onChange={(e) => {
                    field.onChange(e.fileList);
                    if (e.fileList.length) {
                      uploadFile('petition_extended_audit_document.mechanical_engineer_certificate_url.url', e.fileList)
                    } else {
                      setValue('petition_extended_audit_document.mechanical_engineer_certificate_url.url', '')
                    }
                  }}
                >
                  {field.value.length ? null :
                    <div className='flex items-center gap-1'>
                      <Input
                        readOnly
                        placeholder='กรุณาเลือกไฟล์'
                        // size='large'
                        className='w-full'
                        style={{
                          fontFamily: 'Noto Sans Thai'
                        }}
                      />
                      <Button
                        htmlType='button'
                        type='primary'
                      // size='large'
                      >
                        เลือก
                      </Button>
                    </div>
                  }
                </Upload>
                {!!errors.petition_extended_audit_document?.mechanical_engineer_certificate_url?.file &&
                  <p className='text-red-500'>{errors.petition_extended_audit_document?.mechanical_engineer_certificate_url?.file.message}</p>
                }
              </fieldset>
            )
          }}
        />
      </div>
      <div className='block mt-3'>
        <Controller
          name='petition_extended_audit_document.safety_management_plan_url.file'
          control={control}
          rules={{
            required: 'กรุณาอัปโหลดรูปแบบการบริหารจัดการด้านความปลอดภัยในการใช้ทางหลวง'
          }}
          render={({ field }) => {
            return (
              <fieldset>
                <label>(ถ้ามี) รูปแบบการบริหารจัดการด้านความปลอดภัยในการใช้ทางหลวง (รองรับไฟล์ .pdf เท่านั้น)</label>
                <Upload
                  {...field}
                  fileList={field.value || []}
                  maxCount={1}
                  listType='text'
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
                  onChange={(e) => {
                    field.onChange(e.fileList);
                    if (e.fileList.length) {
                      uploadFile('petition_extended_audit_document.safety_management_plan_url.url', e.fileList)
                    } else {
                      setValue('petition_extended_audit_document.safety_management_plan_url.url', '')
                    }
                  }}
                >
                  {field.value.length ? null :
                    <div className='flex items-center gap-1'>
                      <Input
                        readOnly
                        placeholder='กรุณาเลือกไฟล์'
                        // size='large'
                        className='w-full'
                        style={{
                          fontFamily: 'Noto Sans Thai'
                        }}
                      />
                      <Button
                        htmlType='button'
                        type='primary'
                      // size='large'
                      >
                        เลือก
                      </Button>
                    </div>
                  }
                </Upload>
                {!!errors.petition_extended_audit_document?.safety_management_plan_url?.file &&
                  <p className='text-red-500'>{errors.petition_extended_audit_document?.safety_management_plan_url?.file.message}</p>
                }
              </fieldset>
            )
          }}
        />
      </div>
      <div className='block mt-3'>
        <Controller
          name='petition_extended_audit_document.route_map_url.file'
          control={control}
          rules={{
            required: 'กรุณาอัปโหลดรูปแผนที่เส้นทางเดินบนทางหลวง'
          }}
          render={({ field }) => {
            return (
              <fieldset>
                <label>(ถ้ามี) รูปแผนที่เส้นทางเดินบนทางหลวง (รองรับไฟล์ .pdf เท่านั้น)</label>
                <Upload
                  {...field}
                  fileList={field.value || []}
                  maxCount={1}
                  listType='text'
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
                  onChange={(e) => {
                    field.onChange(e.fileList);
                    if (e.fileList.length) {
                      uploadFile('petition_extended_audit_document.route_map_url.url', e.fileList)
                    } else {
                      setValue('petition_extended_audit_document.route_map_url.url', '')
                    }
                  }}
                >
                  {field.value.length ? null :
                    <div className='flex items-center gap-1'>
                      <Input
                        readOnly
                        placeholder='กรุณาเลือกไฟล์'
                        // size='large'
                        className='w-full'
                        style={{
                          fontFamily: 'Noto Sans Thai'
                        }}
                      />
                      <Button
                        htmlType='button'
                        type='primary'
                      // size='large'
                      >
                        เลือก
                      </Button>
                    </div>
                  }
                </Upload>
                {!!errors.petition_extended_audit_document?.route_map_url?.file &&
                  <p className='text-red-500'>{errors.petition_extended_audit_document?.route_map_url?.file.message}</p>
                }
              </fieldset>
            )
          }}
        />
      </div>
      <div className='block mt-3'>
        <Controller
          name='petition_extended_audit_document.operation_plan_url.file'
          control={control}
          rules={{
            required: 'กรุณาอัปโหลดแผนและระยะเวลาการดำเนินงาน'
          }}
          render={({ field }) => {
            return (
              <fieldset>
                <label>แผนและระยะเวลาการดำเนินงาน (รองรับไฟล์ .pdf เท่านั้น)</label>
                <Upload
                  {...field}
                  fileList={field.value || []}
                  maxCount={1}
                  listType='text'
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
                  onChange={(e) => {
                    field.onChange(e.fileList);
                    if (e.fileList.length) {
                      uploadFile('petition_extended_audit_document.operation_plan_url.url', e.fileList)
                    } else {
                      setValue('petition_extended_audit_document.operation_plan_url.url', '')
                    }
                  }}
                >
                  {field.value.length ? null :
                    <div className='flex items-center gap-1'>
                      <Input
                        readOnly
                        placeholder='กรุณาเลือกไฟล์'
                        // size='large'
                        className='w-full'
                        style={{
                          fontFamily: 'Noto Sans Thai'
                        }}
                      />
                      <Button
                        htmlType='button'
                        type='primary'
                      // size='large'
                      >
                        เลือก
                      </Button>
                    </div>
                  }
                </Upload>
                {!!errors.petition_extended_audit_document?.operation_plan_url?.file &&
                  <p className='text-red-500'>{errors.petition_extended_audit_document?.operation_plan_url?.file.message}</p>
                }
              </fieldset>
            )
          }}
        />
      </div>
      <div className='block mt-3'>
        <Controller
          name='petition_extended_audit_document.contact_info_url.file'
          control={control}
          rules={{
            required: 'กรุณาอัปโหลดที่อยู่และอีเมลในการจัดส่งเอกสาร'
          }}
          render={({ field }) => {
            return (
              <fieldset>
                <label>(ถ้ามี) ที่อยู่และอีเมลในการจัดส่งเอกสาร (รองรับไฟล์ .pdf เท่านั้น)</label>
                <Upload
                  {...field}
                  fileList={field.value || []}
                  maxCount={1}
                  listType='text'
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
                  onChange={(e) => {
                    field.onChange(e.fileList);
                    if (e.fileList.length) {
                      uploadFile('petition_extended_audit_document.contact_info_url.url', e.fileList)
                    } else {
                      setValue('petition_extended_audit_document.contact_info_url.url', '')
                    }
                  }}
                >
                  {field.value.length ? null :
                    <div className='flex items-center gap-1'>
                      <Input
                        readOnly
                        placeholder='กรุณาเลือกไฟล์'
                        // size='large'
                        className='w-full'
                        style={{
                          fontFamily: 'Noto Sans Thai'
                        }}
                      />
                      <Button
                        htmlType='button'
                        type='primary'
                      // size='large'
                      >
                        เลือก
                      </Button>
                    </div>
                  }
                </Upload>
                {!!errors.petition_extended_audit_document?.contact_info_url?.file &&
                  <p className='text-red-500'>{errors.petition_extended_audit_document?.contact_info_url?.file.message}</p>
                }
              </fieldset>
            )
          }}
        />
      </div>
    </div>
  )
}

export default React.memo<Props>(FormDocumentApproval)
