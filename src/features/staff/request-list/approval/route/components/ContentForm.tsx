/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import { Button } from '@/components/ui';
import { postUploadProfileImageAPI } from '@/services/entrepreneur/UserService';
import { Flex, Input, message, Radio, Upload } from 'antd';
import React, { useCallback } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { HiOutlineCloudUpload } from 'react-icons/hi';

interface Props {

}

interface FieldType {
  is_approved: boolean;
  remark: string;
  file_id: FileType;
}

interface FileType {
  file: any[];
  url: string;
}

const OPTIONS = [
  {
    label: 'ผ่านการตรวจสอบ',
    value: true,
  },
  {
    label: 'ไม่ผ่านการตรวจสอบ',
    value: false,
  },
]
const ContentForm: React.FC<Props> = (props) => {
  const { } = props

  const form = useForm<FieldType>({
    defaultValues: {
      is_approved: false,
      remark: '',
      file_id: {
        file: [],
        url: ''
      }
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


  const onSubmit = useCallback((value: FieldType) => {
    console.log(value)
  }, [])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h5>ผลการตรวจสอบ</h5>
      <section className='mt-3'>
        <Controller
          name='is_approved'
          control={control}
          render={({ field }) => {
            return (
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
              <Input.TextArea
                {...field}
                name={field.name}
                placeholder='ข้อความตอบกลับ...'
                size='large'
              />
            )
          }}
        />
      </section>
      <section className='mt-3'>
        <Controller
          name='file_id.file'
          control={control}
          rules={{
            required: 'กรุณาอัปโหลดเอกสารตอบกลับ'
          }}
          render={({ field }) => {
            return (
              <fieldset>
                <label className='block'>เอกสารตอบกลับ</label>
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
