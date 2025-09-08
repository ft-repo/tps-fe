/* eslint-disable no-useless-escape */
/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import { VehicleList } from '@/@types/reducer/petition';
import { FileType } from '@/@types/shared';
import { getUploadAPI, postUploadImageAPI } from '@/services/entrepreneur/VehicleListService';
import { setLoading, useAppDispatch } from '@/store';
import { Col, message, Row, Upload } from 'antd'
import React, { useCallback, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { FaUpload as UploadIcon } from "react-icons/fa6";

interface Props {
  index: number;
  item: VehicleList;
}

interface FieldType {
  towing_image: FileType;
  semi_image: FileType;
  etc_image: FileType;
  truck_dimension_image: FileType;
  semi_dimension_image: FileType;
  cargo_dimension_image: FileType;
  combined_vehicle_image: FileType;
  turn_radius_image: FileType;
  highway_permit_image: FileType;
  highway_number_image: FileType;
  rural_permit_image: FileType;
  rural_number_image: FileType;
}

const ContentImage: React.FC<Props> = (props) => {
  const { item } = props
  const dispatch = useAppDispatch()

  const form = useForm<FieldType>({
    defaultValues: {
      towing_image: {
        file: [],
        url: ''
      },
      semi_image: {
        file: [],
        url: ''
      },
      etc_image: {
        file: [],
        url: ''
      },
      truck_dimension_image: {
        file: [],
        url: ''
      },
      semi_dimension_image: {
        file: [],
        url: ''
      },
      cargo_dimension_image: {
        file: [],
        url: ''
      },
      combined_vehicle_image: {
        file: [],
        url: ''
      },
      turn_radius_image: {
        file: [],
        url: ''
      },
      highway_permit_image: {
        file: [],
        url: ''
      },
      highway_number_image: {
        file: [],
        url: ''
      },
      rural_permit_image: {
        file: [],
        url: ''
      },
      rural_number_image: {
        file: [],
        url: ''
      },
    },
  })

  const {
    setValue,
    control,
    formState: { errors }
  } = form

  const uploadFile = useCallback(async (fieldName: string, file: any) => {
    try {
      // POST
      const response = await postUploadImageAPI({ upload: file[0].originFileObj })
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

  const extractFileName = useCallback((url: string | null) => {
    const match = url?.match(/\/([^\/]+)$/);
    return match ? match[1] : '';
  }, [])

  const extractUrl = useCallback((url: string) => {
    const path = url.split('/upload')[1];
    return path
  }, []);

  const fetchImage = useCallback(async (
    stateType:
      'towing' |
      'semi' |
      'etc' |
      'truck_dimension' |
      'semi_dimension' |
      'cargo_dimension' |
      'combined_vehicle' |
      'turn_radius' |
      'highway_permit' |
      'highway_number' |
      'rural_permit' |
      'rural_number',
    imgUrl: string
  ) => {
    dispatch(setLoading(true))
    try {
      const response = await getUploadAPI(imgUrl)
      if (response.status === 200) {
        const blobFile = new Blob([response.data], { type: response.data.type })
        const url = URL.createObjectURL(blobFile)
        if (stateType === 'towing') {
          setValue('towing_image.file', [
            {
              // crossOrigin: 'use-credentials',
              name: extractFileName(String(item?.towing_vehicle?.vehicle_picture?.front_rear_url)),
              // percent: 100,
              uid: '1',
              status: 'done',
              url: url,
              // thumbUrl: url,
              type: response.data.type,
              originFileObj: blobFile as any,
            }
          ])
        }
        if (stateType === 'semi') {
          setValue('semi_image.file', [
            {
              // crossOrigin: 'use-credentials',
              name: extractFileName(String(item?.semi_trailer_vehicle?.vehicle_picture?.front_rear_url)),
              // percent: 100,
              uid: '1',
              status: 'done',
              url: url,
              // thumbUrl: url,
              type: response.data.type,
              originFileObj: blobFile as any,
            }
          ])
        }
        if (stateType === 'etc') {
          setValue('etc_image.file', [
            {
              // crossOrigin: 'use-credentials',
              name: extractFileName(String(item?.etc_vehicle?.vehicle_picture?.front_rear_url)),
              // percent: 100,
              uid: '1',
              status: 'done',
              url: url,
              // thumbUrl: url,
              type: response.data.type,
              originFileObj: blobFile as any,
            }
          ])
        }
        if (stateType === 'truck_dimension') {
          setValue('truck_dimension_image.file', [
            {
              // crossOrigin: 'use-credentials',
              name: extractFileName(String(item?.truck_dimension_url)),
              // percent: 100,
              uid: '1',
              status: 'done',
              url: url,
              // thumbUrl: url,
              type: response.data.type,
              originFileObj: blobFile as any,
            }
          ])
        }
        if (stateType === 'semi_dimension') {
          setValue('semi_dimension_image.file', [
            {
              // crossOrigin: 'use-credentials',
              name: extractFileName(String(item?.semi_trailer_dimension_url)),
              // percent: 100,
              uid: '1',
              status: 'done',
              url: url,
              // thumbUrl: url,
              type: response.data.type,
              originFileObj: blobFile as any,
            }
          ])
        }
        if (stateType === 'cargo_dimension') {
          setValue('cargo_dimension_image.file', [
            {
              // crossOrigin: 'use-credentials',
              name: extractFileName(String(item?.cargo_dimension_url)),
              // percent: 100,
              uid: '1',
              status: 'done',
              url: url,
              // thumbUrl: url,
              type: response.data.type,
              originFileObj: blobFile as any,
            }
          ])
        }
        if (stateType === 'combined_vehicle') {
          setValue('combined_vehicle_image.file', [
            {
              // crossOrigin: 'use-credentials',
              name: extractFileName(String(item?.combined_vehicle_url)),
              // percent: 100,
              uid: '1',
              status: 'done',
              url: url,
              // thumbUrl: url,
              type: response.data.type,
              originFileObj: blobFile as any,
            }
          ])
        }
        if (stateType === 'turn_radius') {
          setValue('turn_radius_image.file', [
            {
              // crossOrigin: 'use-credentials',
              name: extractFileName(String(item?.turn_radius)),
              // percent: 100,
              uid: '1',
              status: 'done',
              url: url,
              // thumbUrl: url,
              type: response.data.type,
              originFileObj: blobFile as any,
            }
          ])
        }
        if (stateType === 'highway_permit') {
          setValue('highway_permit_image.file', [
            {
              // crossOrigin: 'use-credentials',
              name: extractFileName(String(item?.highway_dept_permit_url)),
              // percent: 100,
              uid: '1',
              status: 'done',
              url: url,
              // thumbUrl: url,
              type: response.data.type,
              originFileObj: blobFile as any,
            }
          ])
        }
        if (stateType === 'highway_number') {
          setValue('highway_number_image.file', [
            {
              // crossOrigin: 'use-credentials',
              name: extractFileName(String(item?.highway_dept_permit_number_url)),
              // percent: 100,
              uid: '1',
              status: 'done',
              url: url,
              // thumbUrl: url,
              type: response.data.type,
              originFileObj: blobFile as any,
            }
          ])
        }
        if (stateType === 'rural_permit') {
          setValue('rural_permit_image.file', [
            {
              // crossOrigin: 'use-credentials',
              name: extractFileName(String(item?.rural_highway_dept_permit_url)),
              // percent: 100,
              uid: '1',
              status: 'done',
              url: url,
              // thumbUrl: url,
              type: response.data.type,
              originFileObj: blobFile as any,
            }
          ])
        }
        if (stateType === 'rural_number') {
          setValue('rural_number_image.file', [
            {
              // crossOrigin: 'use-credentials',
              name: extractFileName(String(item?.rural_highway_dept_permit_url)),
              // percent: 100,
              uid: '1',
              status: 'done',
              url: url,
              // thumbUrl: url,
              type: response.data.type,
              originFileObj: blobFile as any,
            }
          ])
        }
      }

    } catch (error) {
      if (error instanceof Error) {
        message.error(error.message)
      } else {
        console.error(error)
      }
    } finally {
      dispatch(setLoading(false))
    }
  }, [dispatch, extractFileName, item, setValue])

  useEffect(() => {
    if (item?.towing_vehicle?.vehicle_picture?.front_rear_url) {
      fetchImage('towing', extractUrl(item?.towing_vehicle?.vehicle_picture?.front_rear_url))
    }
    if (item?.semi_trailer_vehicle?.vehicle_picture?.front_rear_url) {
      fetchImage('semi', extractUrl(item?.semi_trailer_vehicle?.vehicle_picture?.front_rear_url))
    }
    if (item?.etc_vehicle?.vehicle_picture?.front_rear_url) {
      fetchImage('etc', extractUrl(item?.etc_vehicle?.vehicle_picture?.front_rear_url))
    }
    if (item?.truck_dimension_url) {
      fetchImage('truck_dimension', extractUrl(item?.truck_dimension_url))
    }
    if (item?.semi_trailer_dimension_url) {
      fetchImage('semi_dimension', extractUrl(item?.semi_trailer_dimension_url))
    }
    if (item?.cargo_dimension_url) {
      fetchImage('cargo_dimension', extractUrl(item?.cargo_dimension_url))
    }
    if (item?.combined_vehicle_url) {
      fetchImage('combined_vehicle', extractUrl(item?.combined_vehicle_url))
    }
    if (item?.turning_radius_url) {
      fetchImage('turn_radius', extractUrl(item?.turning_radius_url))
    }
    if (item?.highway_dept_permit_url) {
      fetchImage('highway_permit', extractUrl(item?.highway_dept_permit_url))
    }
    if (item?.highway_dept_permit_number_url) {
      fetchImage('highway_number', extractUrl(item?.highway_dept_permit_number_url))
    }
    if (item?.rural_highway_dept_permit_url) {
      fetchImage('rural_permit', extractUrl(item?.rural_highway_dept_permit_url))
    }
    if (item?.rural_highway_dept_permit_number_url) {
      fetchImage('rural_number', extractUrl(item?.rural_highway_dept_permit_number_url))
    }
  }, [item, extractUrl, fetchImage])

  return (
    <Row gutter={[16, 16]}>
      {item?.towing_vehicle?.vehicle_picture?.front_rear_url ?
        <Col xs={24} sm={12} md={12} lg={8} xl={12} xxl={8}>
          <Controller
            name='towing_image.file'
            control={control}
            rules={{
              required: 'กรุณาอัปโหลดรถลากจูง'
            }}
            render={({ field }) => {
              return (
                <fieldset>
                  <label>รถลากจูง <span className='text-red-500'>*</span></label>
                  <Upload
                    {...field}
                    fileList={field.value || []}
                    maxCount={1}
                    listType='picture-card'
                    accept='image/jpg,image/jpeg,image/png'
                    beforeUpload={(file) => {
                      // DEFAULT VALUES
                      const allowList = ['image/jpg', 'image/jpeg', 'image/png']
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
                        uploadFile('towing_image.url', e.fileList)
                      } else {
                        setValue('towing_image.url', '')
                      }
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
                          กรุณาอัปโหลดไฟล์ประเภท JPG JPEG หรือ PNG
                        </p>
                      </div>
                    }
                  </Upload>
                  {!!errors.towing_image?.file &&
                    <p className='text-red-500'>{errors.towing_image?.file.message}</p>
                  }
                </fieldset>
              )
            }}
          />
        </Col>
        : null}
      {item?.semi_trailer_vehicle?.vehicle_picture?.front_rear_url ?
        <Col xs={24} sm={12} md={12} lg={8} xl={12} xxl={8}>
          <Controller
            name='semi_image.file'
            control={control}
            rules={{
              required: 'กรุณาอัปโหลดรถกึ่งพ่วง'
            }}
            render={({ field }) => {
              return (
                <fieldset>
                  <label>รถกึ่งพ่วง <span className='text-red-500'>*</span></label>
                  <Upload
                    {...field}
                    fileList={field.value || []}
                    maxCount={1}
                    listType='picture-card'
                    accept='image/jpg,image/jpeg,image/png'
                    beforeUpload={(file) => {
                      // DEFAULT VALUES
                      const allowList = ['image/jpg', 'image/jpeg', 'image/png']
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
                        uploadFile('semi_image.url', e.fileList)
                      } else {
                        setValue('semi_image.url', '')
                      }
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
                          กรุณาอัปโหลดไฟล์ประเภท JPG JPEG หรือ PNG
                        </p>
                      </div>
                    }
                  </Upload>
                  {!!errors.semi_image?.file &&
                    <p className='text-red-500'>{errors.semi_image?.file.message}</p>
                  }
                </fieldset>
              )
            }}
          />
        </Col>
        : null}
      {item?.etc_vehicle?.vehicle_picture?.front_rear_url ?
        <Col xs={24} sm={12} md={12} lg={8} xl={12} xxl={8}>
          <Controller
            name='etc_image.file'
            control={control}
            rules={{
              required: 'กรุณาอัปโหลดเครื่องจักร'
            }}
            render={({ field }) => {
              return (
                <fieldset>
                  <label>เครื่องจักร <span className='text-red-500'>*</span></label>
                  <Upload
                    {...field}
                    fileList={field.value || []}
                    maxCount={1}
                    listType='picture-card'
                    accept='image/jpg,image/jpeg,image/png'
                    beforeUpload={(file) => {
                      // DEFAULT VALUES
                      const allowList = ['image/jpg', 'image/jpeg', 'image/png']
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
                        uploadFile('etc_image.url', e.fileList)
                      } else {
                        setValue('etc_image.url', '')
                      }
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
                          กรุณาอัปโหลดไฟล์ประเภท JPG JPEG หรือ PNG
                        </p>
                      </div>
                    }
                  </Upload>
                  {!!errors.etc_image?.file &&
                    <p className='text-red-500'>{errors.etc_image?.file.message}</p>
                  }
                </fieldset>
              )
            }}
          />
        </Col>
        : null}
      {item?.truck_dimension_url ?
        <Col xs={24} sm={12} md={12} lg={8} xl={12} xxl={8}>
          <Controller
            name='truck_dimension_image.file'
            control={control}
            rules={{
              required: 'กรุณาอัปโหลดรูปแบบที่แสดงมิติ รถลากจูง'
            }}
            render={({ field }) => {
              return (
                <fieldset>
                  <label>รูปแบบที่แสดงมิติ รถลากจูง</label>
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
                    onChange={(e) => {
                      field.onChange(e.fileList);
                      if (e.fileList.length) {
                        uploadFile(`truck_dimension_image.url`, e.fileList)
                      } else {
                        setValue(`truck_dimension_image.url`, '')
                      }
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
                  {!!errors.truck_dimension_image?.file &&
                    <p className='text-red-500'>{errors.truck_dimension_image?.file.message}</p>
                  }
                </fieldset>
              )
            }}
          />
        </Col>
        : null}
      {item?.semi_trailer_dimension_url ?
        <Col xs={24} sm={12} md={12} lg={8} xl={12} xxl={8}>
          <Controller
            name='semi_dimension_image.file'
            control={control}
            rules={{
              required: 'กรุณาอัปโหลดรูปแบบที่แสดงมิติ รถกึ่งพ่วง'
            }}
            render={({ field }) => {
              return (
                <fieldset>
                  <label>รูปแบบที่แสดงมิติ รถกึ่งพ่วง</label>
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
                    onChange={(e) => {
                      field.onChange(e.fileList);
                      if (e.fileList.length) {
                        uploadFile(`semi_dimension_image.url`, e.fileList)
                      } else {
                        setValue(`semi_dimension_image.url`, '')
                      }
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
                  {!!errors.semi_dimension_image?.file &&
                    <p className='text-red-500'>{errors.semi_dimension_image?.file.message}</p>
                  }
                </fieldset>
              )
            }}
          />
        </Col>
        : null}
      {item?.cargo_dimension_url ?
        <Col xs={24} sm={12} md={12} lg={8} xl={12} xxl={8}>
          <Controller
            name='cargo_dimension_image.file'
            control={control}
            rules={{
              required: 'กรุณาอัปโหลดรูปแบบที่แสดงมิติ สินค้า / เครื่องจักร'
            }}
            render={({ field }) => {
              return (
                <fieldset>
                  <label>รูปแบบที่แสดงมิติ สินค้า / เครื่องจักร</label>
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
                    onChange={(e) => {
                      field.onChange(e.fileList);
                      if (e.fileList.length) {
                        uploadFile(`cargo_dimension_image.url`, e.fileList)
                      } else {
                        setValue(`cargo_dimension_image.url`, '')
                      }
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
                  {!!errors.cargo_dimension_image?.file &&
                    <p className='text-red-500'>{errors.cargo_dimension_image?.file.message}</p>
                  }
                </fieldset>
              )
            }}
          />
        </Col>
        : null}
      {item?.combined_vehicle_url ?
        <Col xs={24} sm={12} md={12} lg={8} xl={12} xxl={8}>
          <Controller
            name='combined_vehicle_image.file'
            control={control}
            rules={{
              required: 'กรุณาอัปโหลดรูปแบบยานพาหนะรวมสิ่งของ'
            }}
            render={({ field }) => {
              return (
                <fieldset>
                  <label>รูปแบบยานพาหนะรวมสิ่งของ</label>
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
                    onChange={(e) => {
                      field.onChange(e.fileList);
                      if (e.fileList.length) {
                        uploadFile(`combined_vehicle_image.url`, e.fileList)
                      } else {
                        setValue(`combined_vehicle_image.url`, '')
                      }
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
                  {!!errors.combined_vehicle_image?.file &&
                    <p className='text-red-500'>{errors.combined_vehicle_image?.file.message}</p>
                  }
                </fieldset>
              )
            }}
          />
        </Col>
        : null}
      {item?.turning_radius_url ?
        <Col xs={24} sm={12} md={12} lg={8} xl={12} xxl={8}>
          <Controller
            name='turn_radius_image.file'
            control={control}
            rules={{
              required: 'กรุณาอัปโหลดรูปแบบที่แสดงรัศมีวงเลี่ยว'
            }}
            render={({ field }) => {
              return (
                <fieldset>
                  <label>รูปแบบที่แสดงรัศมีวงเลี่ยว</label>
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
                    onChange={(e) => {
                      field.onChange(e.fileList);
                      if (e.fileList.length) {
                        uploadFile(`turn_radius_image.url`, e.fileList)
                      } else {
                        setValue(`turn_radius_image.url`, '')
                      }
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
                  {!!errors.turn_radius_image?.file &&
                    <p className='text-red-500'>{errors.turn_radius_image?.file.message}</p>
                  }
                </fieldset>
              )
            }}
          />
        </Col>
        : null}
      {item?.highway_dept_permit_url ?
        <Col xs={24} sm={12} md={12} lg={8} xl={12} xxl={8}>
          <Controller
            name='highway_permit_image.file'
            control={control}
            rules={{
              required: 'กรุณาอัปโหลดเอกสารขออนุญาตจาก ทล.'
            }}
            render={({ field }) => {
              return (
                <fieldset>
                  <label>เอกสารขออนุญาตจาก ทล.</label>
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
                    onChange={(e) => {
                      field.onChange(e.fileList);
                      if (e.fileList.length) {
                        uploadFile(`highway_permit_image.url`, e.fileList)
                      } else {
                        setValue(`highway_permit_image.url`, '')
                      }
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
                  {!!errors.highway_permit_image?.file &&
                    <p className='text-red-500'>{errors.highway_permit_image?.file.message}</p>
                  }
                </fieldset>
              )
            }}
          />
        </Col>
        : null}
      {item?.highway_dept_permit_number_url ?
        <Col xs={24} sm={12} md={12} lg={8} xl={12} xxl={8}>
          <Controller
            name='highway_number_image.file'
            control={control}
            rules={{
              required: 'กรุณาอัปโหลดเลขที่ขออนุญาตเดิมจาก ทล.'
            }}
            render={({ field }) => {
              return (
                <fieldset>
                  <label>เลขที่ขออนุญาตเดิมจาก ทล.</label>
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
                    onChange={(e) => {
                      field.onChange(e.fileList);
                      if (e.fileList.length) {
                        uploadFile(`highway_number_image.url`, e.fileList)
                      } else {
                        setValue(`highway_number_image.url`, '')
                      }
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
                  {!!errors.highway_number_image?.file &&
                    <p className='text-red-500'>{errors.highway_number_image?.file.message}</p>
                  }
                </fieldset>
              )
            }}
          />
        </Col>
        : null}
      {item?.rural_highway_dept_permit_url ?
        <Col xs={24} sm={12} md={12} lg={8} xl={12} xxl={8}>
          <Controller
            name='rural_permit_image.file'
            control={control}
            rules={{
              required: 'กรุณาอัปโหลดเอกสารขออนุญาตจาก ทช.'
            }}
            render={({ field }) => {
              return (
                <fieldset>
                  <label>เอกสารขออนุญาตจาก ทช.</label>
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
                    onChange={(e) => {
                      field.onChange(e.fileList);
                      if (e.fileList.length) {
                        uploadFile(`rural_permit_image.url`, e.fileList)
                      } else {
                        setValue(`rural_permit_image.url`, '')
                      }
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
                  {!!errors.rural_permit_image?.file &&
                    <p className='text-red-500'>{errors.rural_permit_image?.file.message}</p>
                  }
                </fieldset>
              )
            }}
          />
        </Col>
        : null}
      {item?.rural_highway_dept_permit_number_url ?
        <Col xs={24} sm={12} md={12} lg={8} xl={12} xxl={8}>
          <Controller
            name='rural_number_image.file'
            control={control}
            rules={{
              required: 'กรุณาอัปโหลดเลขที่ขออนุญาตเดิมจาก ทช.'
            }}
            render={({ field }) => {
              return (
                <fieldset>
                  <label>เลขที่ขออนุญาตเดิมจาก ทช.</label>
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
                    onChange={(e) => {
                      field.onChange(e.fileList);
                      if (e.fileList.length) {
                        uploadFile(`rural_number_image.url`, e.fileList)
                      } else {
                        setValue(`rural_number_image.url`, '')
                      }
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
                  {!!errors.rural_number_image?.file &&
                    <p className='text-red-500'>{errors.rural_number_image?.file.message}</p>
                  }
                </fieldset>
              )
            }}
          />
        </Col>
        : null}
    </Row>
  )
}

export default React.memo<Props>(ContentImage)
