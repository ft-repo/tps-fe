/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import { Button } from '@/components/ui';
import { postUploadProfileImageAPI } from '@/services/entrepreneur/UserService';
import { Flex, Input, message, Upload } from 'antd';
import React, { useCallback } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { HiOutlineCloudUpload } from 'react-icons/hi';

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

  const form = useForm<FieldType>({
    defaultValues: {
      file_id: {
        file: [],
        url: ''
      },
      remark: '',
    }
  })

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors }
  } = form

  const uploadFile = useCallback(async (file: any) => {
    try {
      // POST
      const response = await postUploadProfileImageAPI({ upload: file[0].originFileObj })
      if (response.status === 200) {
        setValue('file_id.url', response.data?.url)
        setUrl(response.data.url)
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


  const onSubmit = useCallback((value: FieldType) => {
    console.log(value)
  }, [])

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
                    }
                  }}
                >
                  {field.value.length ? null :
                    <Button
                      variant="solid"
                      icon={<HiOutlineCloudUpload />}
                      size='sm'
                      type='button'
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
            type='button'
            variant='default'
            size='sm'
            className='w-full lg:w-auto'
          >
            ล้างข้อมูล
          </Button>
          <Button
            type='submit'
            variant='solid'
            size='sm'
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
