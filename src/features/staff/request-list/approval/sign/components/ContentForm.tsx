/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import { PetitionPostBody } from '@/@types/services/petition';
import { postUploadFileAPI } from '@/services/entrepreneur/PetitionService';
import { postPetitionApproveAPI } from '@/services/staff/PetitionService';
import { setLoading, useAppDispatch, useAppSelector } from '@/store';
import { getAdminPetitionData } from '@/store/slices/staff';
import { Flex, Input, message, Modal, Upload, Button } from 'antd';
import React, { useCallback } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { HiOutlineCloudUpload } from 'react-icons/hi';
import { useNavigate, useSearchParams } from 'react-router-dom';

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
  const [params] = useSearchParams()
  const petitionId = params.get('petition_id')
  const statusId = params.get('status_id')
  const isApproved = params.get('is_approved')
  // REDUX MANAGE
  const { petition } = useAppSelector(state => state.staff.petition)
  const dispatch = useAppDispatch()
  // NAVIGATE
  const navigate = useNavigate()
  // IS DISABLED
  const disabled = isApproved !== 'null' ? true : false

  const form = useForm<FieldType>({
    defaultValues: {
      file_id: {
        file: [],
        url: ''
      },
      remark: '',
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
      petition_id: Number(petitionId),
      status_id: Number(statusId),
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
            navigate(-1)
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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <section>
        <Controller
          name='file_id.file'
          control={control}
          rules={{
            required: 'กรุณาอัปโหลดเอกสารลงนาม'
          }}
          render={({ field }) => {
            return (
              <fieldset>
                <label className='block'>เอกสารลงนาม (รองรับไฟล์ .pdf เท่านั้น)</label>
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
          render={({ field }) => {
            return (
              <fieldset>
                <label>หมายเหตุ</label>
                <Input.TextArea
                  {...field}
                  name={field.name}
                  placeholder='กรุณาระบุหมายเหตุ'
                  size='large'
                  rows={10}
                />
                {!!errors.remark &&
                  <p>{errors.remark.message}</p>
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
