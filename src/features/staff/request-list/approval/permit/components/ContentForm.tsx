/* eslint-disable no-useless-escape */
/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import { PetitionPostBody } from '@/@types/services/petition';
import { postUploadFileAPI } from '@/services/entrepreneur/PetitionService';
import { getUploadAPI } from '@/services/entrepreneur/VehicleListService';
import { postPetitionApproveAPI } from '@/services/staff/PetitionService';
import { setLoading, useAppDispatch, useAppSelector } from '@/store';
import { getAdminPetitionData, getAdminPetitionHistoryData } from '@/store/slices/staff';
import { Flex, Input, message, Modal, Upload, Button } from 'antd';
import { RcFile } from 'antd/es/upload';
import { AxiosError } from 'axios';
import React, { useCallback, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { HiOutlineCloudUpload } from 'react-icons/hi';
import { useLocation, useNavigate } from 'react-router-dom';

interface Props {
  setUrl: (value: string) => void
}

interface FieldType {
  file_id: FileType;
  remark: string;
}

interface FileType {
  file: any[];
  url: string;
}

const ContentForm: React.FC<Props> = (props) => {
  const { setUrl } = props
  // PARAMS
  // const [params] = useSearchParams()
  // const petitionId = params.get('petition_id')
  // const statusId = params.get('status_id')
  // const isApproved = params.get('is_approved')
  // REDUX MANAGE
  const { petition, petition_status, petition_history } = useAppSelector(state => state.staff.petition)
  const dispatch = useAppDispatch()
  // NAVIGATE
  const navigate = useNavigate()
  // LOCATION
  const { state } = useLocation()
  // IS DISABLED
  const disabled = state?.is_approved !== 'null' ? true : false

  const form = useForm<FieldType>({
    defaultValues: {
      file_id: {
        file: [],
        url: ''
      },
      remark: petition_status[4]?.remark || '',
    },
    disabled: disabled
  })

  const {
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors }
  } = form

  const uploadFile = useCallback(async (file: any) => {
    try {
      // POST
      const response = await postUploadFileAPI({ upload: file[0].originFileObj })
      if (response.status === 200) {
        setValue('file_id.url', response.data?.url)
        // SET URL
        const url = URL.createObjectURL(file[0].originFileObj)
        setUrl(url)
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
  }, [setValue, setUrl])

  const onSubmit = useCallback(async (value: FieldType) => {
    const body: PetitionPostBody = {
      petition_id: Number(state?.petition_id),
      status_id: Number(state?.status_id),
      is_approved: true,
      document_url: value.file_id.url,
      remark: value.remark,
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
            dispatch(getAdminPetitionHistoryData(petition_history.overview.search))
            navigate('/request-history/overview')
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
      if (error instanceof AxiosError) {
        Modal.error({
          title: 'ไม่สามารถบันทึกข้อมูลได้',
          content: error.response?.data?.res_data?.message || 'เกิดข้อผิดพลาดในการบันทึกข้อมูล',
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
  }, [state?.petition_id, state?.status_id, dispatch, navigate, petition.overview.search, petition_history.overview.search])

  // const extractFileName = useCallback((url: string | null) => {
  //   const match = url?.match(/\/([^\/]+)$/);
  //   return match ? match[1] : '';
  // }, [])

  const extractUrl = useCallback((url: string) => {
    const path = url.split('/upload')[1];
    return path
  }, []);

  const fetchImage = useCallback(async (imgUrl: string) => {
    dispatch(setLoading(true))
    try {
      const response = await getUploadAPI(imgUrl)
      if (response.status === 200) {
        const blobFile = new Blob([response.data], { type: response.data.type })
        const url = URL.createObjectURL(blobFile)
        setValue('file_id.file', [
          {
            // crossOrigin: 'use-credentials',
            // name: extractFileName(String(petition_status[4]?.document_url)),
            name: 'เอกสารใบอนุญาต',
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
      dispatch(setLoading(false))
    }
  }, [setValue, dispatch])

  useEffect(() => {
    if (petition_status[4]?.document_url) {
      if (extractUrl(petition_status[4]?.document_url)) {
        fetchImage(extractUrl(petition_status[4]?.document_url))
      }
    }
  }, [extractUrl, fetchImage, petition_status])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <section>
        <Controller
          name='file_id.file'
          control={control}
          rules={{
            required: 'กรุณาอัปโหลดเอกสารใบอนุญาต'
          }}
          render={({ field }) => {
            return (
              <fieldset>
                <label className='block'>เอกสารใบอนุญาต (รองรับไฟล์ .pdf เท่านั้น) <span className='text-red-500'>*</span></label>
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
                      setUrl('')
                    }
                  }}
                  onPreview={(e) => {
                    const url = URL.createObjectURL(e.originFileObj as RcFile);
                    window.open(url);
                  }}
                >
                  {field.value.length ? null :
                    <Button
                      disabled={disabled}
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
      <section className='mt-3'>
        <Controller
          name='remark'
          control={control}
          rules={{
            required: 'กรุณาระบุหมายเหตุ'
          }}
          render={({ field }) => {
            return (
              <fieldset>
                <label>หมายเหตุ <span className='text-red-500'>*</span></label>
                <Input.TextArea
                  {...field}
                  name={field.name}
                  placeholder='กรุณาระบุหมายเหตุ'
                  size='large'
                  rows={10}
                />
                {!!errors.remark &&
                  <p className='text-red-500'>{errors.remark.message}</p>
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
