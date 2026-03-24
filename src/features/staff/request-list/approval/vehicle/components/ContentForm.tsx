/* eslint-disable no-useless-escape */
/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import { PetitionPostBody, PostPetitionEndRequest } from '@/@types/services/petition';
import { postUploadFileAPI } from '@/services/entrepreneur/PetitionService';
import { getUploadAPI } from '@/services/entrepreneur/VehicleListService';
import { postPetitionApproveAPI, postPetitionEndAPI } from '@/services/staff/PetitionService';
import { setLoading, useAppDispatch, useAppSelector } from '@/store';
import { getAdminPetitionData } from '@/store/slices/staff';
import { Flex, Input, message, Modal, Radio, Upload, Button } from 'antd';
import { RcFile } from 'antd/es/upload';
import { AxiosError } from 'axios';
import React, { useCallback, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { HiOutlineCloudUpload } from 'react-icons/hi';
import { useLocation, useNavigate } from 'react-router-dom';

interface Props {

}

interface FieldType {
  is_approved: string | null;
  reply_message: string;
  file_id: FileType;
  // is_signed: string | null;
  remark: string;
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

// const OPTIONS_IS_SKIPPED = [
//   {
//     label: 'มีเอกสารลงนาม',
//     value: '1',
//   },
//   {
//     label: 'ไม่มีเอกสารลงนาม',
//     value: '2',
//   },
// ]

const ContentForm: React.FC<Props> = (props) => {
  const { } = props
  // PARAMS
  // const [params] = useSearchParams()
  // const petitionId = params.get('petition_id')
  // const statusId = params.get('status_id')
  // const isApproved = params.get('is_approved')
  // REDUX MANAGE
  const { petition, petition_status } = useAppSelector(state => state.staff.petition)
  const dispatch = useAppDispatch()
  // NAVIGATE
  const navigate = useNavigate()
  // LOCATION STATE
  const { state } = useLocation()
  // IS DISABLED
  const isDisabled = (
    state?.is_approved !== 'null' ||
    state?.is_approved === true ||
    state?.is_approved === false
  ) ? true : false
  const isEnded = state?.petition_hold?.is_end

  const form = useForm<FieldType>({
    defaultValues: {
      is_approved: typeof petition_status[2]?.is_approved === 'boolean' ? (petition_status[2]?.is_approved === true ? '1' : '2') : null,
      reply_message: petition_status[2]?.remark || '',
      file_id: {
        file: [],
        url: ''
      },
      remark: ''
      // is_signed: typeof petition_status[2]?.is_skipped === 'boolean' ? (petition_status[2]?.is_skipped === false ? '1' : '2') : null,
    },
    // disabled: disabled
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

  const onCreate = useCallback(async (value: FieldType) => {
    const body: PetitionPostBody = {
      petition_id: Number(state?.petition_id),
      status_id: Number(state?.status_id),
      is_approved: value.is_approved === '1' ? true : false,
      document_url: value.file_id.url,
      remark: value.reply_message,
      is_skipped: false
      // is_skipped: value.is_signed === '1' ? false : true
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
  }, [state?.petition_id, state?.status_id, dispatch, navigate, petition.overview.search])

  const onUpdate = useCallback(async (value: FieldType) => {
    const body: PostPetitionEndRequest = {
      petition_flow_id: Number(state?.petition_hold?.petition_flow_id),
      canceled_remark: value.remark,
    }

    dispatch(setLoading(true))
    try {
      const response = await postPetitionEndAPI(body)
      if (response.status === 200) {
        Modal.success({
          title: 'สำเร็จ',
          content: 'บันทึกข้อมูลสำเร็จ',
          okText: 'ตกลง',
          onOk: () => {
            dispatch(getAdminPetitionData(petition.overview.search))
            if (!value.is_approved) {
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
  }, [state?.petition_hold?.petition_flow_id, dispatch, navigate, petition.overview.search])

  const onSubmit = useCallback(async (value: FieldType) => {
    if (isEnded) {
      onUpdate(value)
    } else {
      onCreate(value)
    }
  }, [isEnded, onCreate, onUpdate])

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
            // name: extractFileName(String(petition_status[2]?.document_url)),
            name: 'เอกสารตอบกลับ',
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
    if (petition_status[2]?.document_url) {
      if (extractUrl(petition_status[2]?.document_url)) {
        fetchImage(extractUrl(petition_status[2]?.document_url))
      }
    }
  }, [extractUrl, fetchImage, petition_status])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <section>
        <h5 className='mb-3'>ผลการตรวจสอบ</h5>
        <Controller
          disabled={isEnded || isDisabled}
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
          disabled={(isEnded || isDisabled) || (watch('is_approved') === '2' ? false : true)}
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
          disabled={(isEnded || isDisabled) || (watch('is_approved') === '2' ? false : true)}
          name='file_id.file'
          control={control}
          // rules={{
          //   required: 'กรุณาอัปโหลดเอกสารตอบกลับ'
          // }}
          render={({ field }) => {
            return (
              <fieldset>
                {/* <label className='block'>เอกสารตอบกลับ <span className='text-red-500'>*</span></label> */}
                <label className='block'>เอกสารตอบกลับ</label>
                {(isEnded && !watch('file_id.file').length && !watch('file_id.url')) ? (
                  <p className='mt-1.5 text-[#C3C3C3]'>ไม่มีเอกสารตอบกลับ</p>
                ) :
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
                        disabled={(isEnded || isDisabled) || (watch('is_approved') === '2' ? false : true)}
                        icon={<HiOutlineCloudUpload />}
                        htmlType='button'
                        type='primary'
                      >
                        เพิ่มไฟล์ .pdf
                      </Button>
                    }
                  </Upload>
                }
                {!!errors.file_id?.file &&
                  <p className='text-red-500'>{errors.file_id.file.message}</p>
                }
              </fieldset>
            )
          }}
        />
      </section>
      {state?.petition_hold?.is_end && (
        <section className='mt-3'>
          <Controller
            name='remark'
            control={control}
            rules={{
              required: 'กรุณาระบุเหตุผล'
            }}
            render={({ field }) => {
              return (
                <fieldset>
                  <label>เหตุผล <span className='text-red-500'>*</span></label>
                  <Input.TextArea
                    {...field}
                    name={field.name}
                    placeholder='กรุณาระบุเหตุผลประกอบในการพิจารณาผลการตรวจสอบไม่ผ่าน'
                    size='large'
                    rows={6}
                  />
                  {!!errors.remark &&
                    <p className='text-red-500'>{errors.remark.message}</p>
                  }
                </fieldset>
              )
            }}
          />
        </section>
      )}
      {/* <section className='mt-3'>
        <h5 className='mb-3'>เอกสารลงนาม</h5>
        <Controller
          disabled={watch('is_approved') === '2' ? true : false}
          name='is_signed'
          control={control}
          rules={{
            required: 'กรุณาเลือกเอกสารลงนาม'
          }}
          render={({ field }) => {
            return (
              <fieldset>
                <Radio.Group
                  {...field}
                  name={field.name}
                  value={field.value}
                  options={OPTIONS_IS_SKIPPED}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 8,
                  }}
                />
                {!!errors.is_signed &&
                  <p className='text-red-500'>{errors.is_signed.message}</p>
                }
              </fieldset>
            )
          }}
        />
      </section> */}
      <section className='mt-5'>
        <Flex
          wrap
          justify={'space-between'}
          align={'center'}
          gap={5}
        >
          <Button
            disabled={isEnded ? false : isDisabled}
            htmlType='button'
            type='default'
            size='large'
            className='w-full lg:w-auto'
            onClick={() => reset()}
          >
            ล้างข้อมูล
          </Button>
          <Button
            disabled={isEnded ? false : isDisabled}
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
