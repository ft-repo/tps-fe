/* eslint-disable no-useless-escape */
/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import { PetitionPostBody } from '@/@types/services/petition';
import { postUploadFileAPI } from '@/services/entrepreneur/PetitionService';
import { getUploadAPI } from '@/services/entrepreneur/VehicleListService';
import { postPetitionApproveAPI } from '@/services/staff/PetitionService';
import { setLoading, useAppDispatch, useAppSelector } from '@/store';
import { getAdminPetitionData } from '@/store/slices/staff';
import { Button, Flex, Input, message, Modal, Radio, Upload } from 'antd';
import { RcFile } from 'antd/es/upload';
import React, { useCallback, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { HiOutlineCloudUpload } from 'react-icons/hi';
import { useNavigate, useSearchParams } from 'react-router-dom';

interface Props {

}

interface FieldType {
  is_approved: string | null;
  reply_message: string;
  file_id: FileType;
}

interface FileType {
  file: any[];
  url: string;
}

const OPTIONS = [
  {
    label: 'ผ่านการตรวจสอบ',
    value: '1',
  },
  {
    label: 'ไม่ผ่านการตรวจสอบ',
    value: '2',
  },
]

const ContentForm: React.FC<Props> = (props) => {
  const { } = props
  // PARAMS
  const [params] = useSearchParams()
  const petitionId = params.get('petition_id')
  const statusId = params.get('status_id')
  const isApproved = params.get('is_approved')
  // REDUX MANAGE
  const { petition, petition_status } = useAppSelector(state => state.staff.petition)
  const dispatch = useAppDispatch()
  // NAVIGATE
  const navigate = useNavigate()
  // IS DISABLED
  const disabled = isApproved !== 'null' ? true : false

  const form = useForm<FieldType>({
    defaultValues: {
      is_approved: typeof petition_status[1]?.is_approved === 'boolean' ? (petition_status[1]?.is_approved === true ? '1' : '2') : null,
      reply_message: petition_status[1]?.remark || '',
      file_id: {
        file: [],
        url: ''
      }
    },
    disabled: disabled
  })

  const {
    handleSubmit,
    control,
    setValue,
    reset,
    watch,
    formState: { errors }
  } = form

  const uploadFile = useCallback(async (file: any) => {
    try {
      // POST
      const response = await postUploadFileAPI({ upload: file[0].originFileObj })
      if (response.status === 200) {
        setValue('file_id.url', response.data?.url)
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

  const onSubmit = useCallback(async (value: FieldType) => {
    const body: PetitionPostBody = {
      petition_id: Number(petitionId),
      status_id: Number(statusId),
      is_approved: value.is_approved === '1' ? true : false,
      document_url: value.file_id.url,
      remark: value.reply_message,
      is_skipped: false
    }

    dispatch(setLoading(true))
    try {
      const response = await postPetitionApproveAPI(body)
      if (response.status === 200) {
        Modal.success({
          title: 'สำเร็จ',
          content: 'บันทึกข้อมูลสำเร็จ',
          okText: 'ตกลง',
          onOk: () => {
            dispatch(getAdminPetitionData(petition.overview.search))
            if (!body.is_approved) {
              navigate('/request-history/overview')
            }
            navigate('/request-list/overview')
          },
          okButtonProps: {
            style: {
              fontFamily: 'Noto Sans Thai'
            }
          },
          style: {
            fontFamily: 'Noto Sans Thai'
          }
        })
      }
    } catch (error) {
      if (error instanceof Error) {
        Modal.error({
          title: 'ผิดพลาด',
          content: 'ไม่สามารถบันทึกข้อมูลได้',
          okText: 'ตกลง',
          onOk: () => Modal.destroyAll(),
          okButtonProps: {
            style: {
              fontFamily: 'Noto Sans Thai'
            }
          },
          style: {
            fontFamily: 'Noto Sans Thai'
          }
        })
      } else {
        console.error(error)
      }
    } finally {
      dispatch(setLoading(false))
    }
  }, [petitionId, statusId, dispatch, navigate, petition.overview.search])

  const extractFileName = useCallback((url: string | null) => {
    const match = url?.match(/\/([^\/]+)$/);
    return match ? match[1] : '';
  }, [])

  const extractUrl = useCallback((url: string) => {
    const path = url.split('/upload')[1];
    return path
  }, []);

  const fetchImage = useCallback(async (imgUrl: string) => {
    setLoading(true)
    try {
      const response = await getUploadAPI(imgUrl)
      if (response.status === 200) {
        const blobFile = new Blob([response.data], { type: response.data.type })
        const url = URL.createObjectURL(blobFile)
        setValue('file_id.file', [
          {
            // crossOrigin: 'use-credentials',
            name: extractFileName(String(petition_status[1]?.document_url)),
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
    } catch (error) {
      if (error instanceof Error) {
        message.error(error.message)
      } else {
        console.error(error)
      }
    } finally {
      setLoading(false)
    }
  }, [extractFileName, petition_status, setValue])

  useEffect(() => {
    if (petition_status[1]?.document_url) {
      if (extractUrl(petition_status[1]?.document_url)) {
        fetchImage(extractUrl(petition_status[1]?.document_url))
      }
    }
  }, [extractUrl, fetchImage, petition_status])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h5>ผลการตรวจสอบ</h5>
      <section className='mt-3'>
        <Controller
          name='is_approved'
          control={control}
          rules={{
            required: 'กรุณาเลือกผลการตรวจสอบ'
          }}
          render={({ field }) => {
            return (
              <fieldset>
                <Radio.Group
                  {...field}
                  name={field.name}
                  value={field.value}
                  options={OPTIONS}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 8,
                  }}
                />
                {!!errors.is_approved &&
                  <p className='text-red-500'>{errors.is_approved.message}</p>
                }
              </fieldset>
            )
          }}
        />
      </section>
      <section className='mt-3'>
        <Controller
          disabled={watch('is_approved') === '1' ? true : false}
          name='reply_message'
          control={control}
          rules={{
            required: 'กรุณาระบุข้อความตอบกลับ'
          }}
          render={({ field }) => {
            return (
              <fieldset>
                <label>ข้อความตอบกลับ <span className='text-red-500'>*</span></label>
                <Input.TextArea
                  {...field}
                  name={field.name}
                  placeholder='กรุณาระบุข้อความตอบกลับ'
                  size='large'
                  rows={6}
                />
                {!!errors.reply_message &&
                  <p className='text-red-500'>{errors.reply_message.message}</p>
                }
              </fieldset>
            )
          }}
        />
      </section>
      <section className='mt-3'>
        <Controller
          disabled={watch('is_approved') === '1' ? true : false}
          name='file_id.file'
          control={control}
          rules={{
            required: 'กรุณาอัปโหลดเอกสารตอบกลับ'
          }}
          render={({ field }) => {
            return (
              <fieldset>
                <label className='block'>เอกสารตอบกลับ <span className='text-red-500'>*</span></label>
                <Upload
                  {...field}
                  fileList={field.value || []}
                  maxCount={1}
                  listType='picture'
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
                      uploadFile(e.fileList)
                    } else {
                      setValue('file_id.url', '')
                    }
                  }}
                  onPreview={(e) => {
                    const url = URL.createObjectURL(e.originFileObj as RcFile);
                    window.open(url);
                  }}
                >
                  {field.value.length ? null :
                    <Button
                      disabled={(watch('is_approved') === '1' ? true : false) || disabled}
                      icon={<HiOutlineCloudUpload />}
                      htmlType='button'
                      type='primary'
                    >
                      เพิ่มไฟล์ .pdf
                    </Button>
                  }
                </Upload>
                {!!errors.file_id?.file &&
                  <p className='text-red-500'>{errors.file_id.file.message}</p>
                }
              </fieldset>
            )
          }}
        />
      </section>
      <section className='mt-5'>
        <Flex
          wrap
          justify={'space-between'}
          align={'center'}
          gap={5}
        >
          <Button
            disabled={disabled}
            htmlType='button'
            type='default'
            size='large'
            className='w-full lg:w-auto'
            onClick={() => reset()}
          >
            ล้างข้อมูล
          </Button>
          <Button
            disabled={disabled}
            htmlType='submit'
            type='primary'
            size='large'
            className='w-full lg:w-auto'
          >
            บันทึกข้อมูล
          </Button>
        </Flex>
      </section>
    </form>
  )
}

export default React.memo<Props>(ContentForm)
