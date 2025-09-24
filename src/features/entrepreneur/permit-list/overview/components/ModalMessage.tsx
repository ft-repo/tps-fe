/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React, { useCallback } from 'react'
import { Flex, Input, message, Modal, Tag } from 'antd'
import { PetitionMessageResponse } from '@/@types/services/petition';
import { INIT_MODAL_MESSAGE } from './ContentSearchCategory';
import { Controller, useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import { setLoading, useAppDispatch, useAppSelector } from '@/store';
import { getUploadAPI } from '@/services/entrepreneur/VehicleListService';

interface Props {
  open: boolean;
  data: PetitionMessageResponse;
  setOpen: ({ open, data, }: { open: boolean, data: PetitionMessageResponse }) => void;
}

interface ContentProps {
  data: PetitionMessageResponse;
}

interface FieldType {
  remark: string;
}

const Content = (props: ContentProps) => {
  const { data } = props
  const { name } = useAppSelector(state => state.auth.user)
  const dispatch = useAppDispatch()

  const form = useForm<FieldType>({
    defaultValues: {
      remark: data.remark || ''
    }
  })

  const { control } = form

  const renderName = useCallback((title: string, firstName: string, lastName: string) => {
    const nameArr = [title, firstName, lastName]
    if (!nameArr?.length) return '-'
    return nameArr.join(' ').trim()
  }, [])

  const extractUrl = useCallback((url: string) => {
    const path = url.split('/upload')[1];
    return path
  }, []);

  const showFile = useCallback(async (fileUrl: string) => {
    dispatch(setLoading(true))
    try {
      const response = await getUploadAPI(fileUrl)
      if (response.status === 200) {
        const url = URL.createObjectURL(response.data);
        window.open(url);
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
  }, [dispatch])

  return (
    <form>
      <section>
        <p><strong>ยื่นคำขอโดย</strong>: {name || '-'}</p>
      </section>
      <section className='mt-3'>
        <p><strong>ตรวจสอบโดย</strong>: {renderName(data.admin_creaded.title, data.admin_creaded.first_name, data.admin_creaded.last_name)}</p>
        <p><strong>วันที่ตรวจสอบ</strong>: {dayjs(data.created_at).format('DD/MM/YYYY HH:mm:ss')}</p>
      </section>
      {data.document_url ?
        <section className='mt-3'>
          <p className='cursor-pointer text-blue-500' onClick={() => showFile(extractUrl(data.document_url))}>ดูเอกสารตอบกลับ</p>
        </section>
        : null}
      <section className='mt-3'>
        <Controller
          name='remark'
          control={control}
          render={({ field }) => {
            return (
              <fieldset>
                <label>หมายเหตุ</label>
                <Input.TextArea
                  readOnly
                  {...field}
                  name={field.name}
                  placeholder='กรุณาระบุ'
                  className='w-full'
                  size='large'
                  rows={3}
                  style={{
                    fontFamily: 'Noto Sans Thai'
                  }}
                />
              </fieldset>
            )
          }}
        />
      </section>
    </form>
  )
}

const ModalMessage: React.FC<Props> = (props) => {
  const { open, data, setOpen } = props

  return (
    <Modal
      destroyOnHidden
      width={800}
      open={open}
      title={(
        <Flex
          align='center'
          gap={5}
        >
          <h5>ข้อความใหม่</h5>
          <Tag color='#1F74AA'>{data.status.status_name}</Tag>
        </Flex>
      )}
      style={{
        fontFamily: 'Noto Sans Thai'
      }}
      footer={false}
      onCancel={() => setOpen(INIT_MODAL_MESSAGE)}
    >
      <Content
        data={data}
      />
    </Modal>
  )
}

export default React.memo<Props>(ModalMessage)
