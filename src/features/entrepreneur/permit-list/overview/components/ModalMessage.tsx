/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React, { useCallback, useRef, useState } from 'react'
import { Button, Flex, Input, message, Modal, Radio, Tag } from 'antd'
import { PetitionMessageResponse } from '@/@types/services/petition';
import { INIT_MODAL_MESSAGE } from './ContentSearchCategory';
import { Controller, useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import { setLoading, useAppDispatch, useAppSelector } from '@/store';
import { getUploadAPI } from '@/services/entrepreneur/VehicleListService';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { patchPetitionHoldAPI } from '@/services/entrepreneur/PetitionService';

interface Props {
  open: boolean;
  data: PetitionMessageResponse;
  setOpen: ({ open, data, }: { open: boolean, data: PetitionMessageResponse }) => void;
  onRefetch: () => Promise<void>;  // ← add
}

interface ContentProps {
  data: PetitionMessageResponse;
  showEditForm: boolean;
  submitRef: React.RefObject<HTMLButtonElement | null>;
  setShowEditForm: (value: boolean) => void;
  onRefetch: () => Promise<void>;  // ← add
}

interface FieldType {
  remark: string;
  duration: string | number;
}

const Content = (props: ContentProps) => {
  const { data, showEditForm, submitRef, setShowEditForm, onRefetch } = props
  const { name } = useAppSelector(state => state.auth.user)
  const dispatch = useAppDispatch()

  const form = useForm<FieldType>({
    defaultValues: {
      remark: data.remark || '',
      duration: dayjs(data.petition_hold.date_expired).diff(dayjs(data.petition_hold.hold_date), 'day'),
    }
  })

  const {
    control,
    watch,
    handleSubmit,
    formState: { dirtyFields }
  } = form

  const renderDuration = useCallback((duration: string | number) => {
    if (duration === 'Cancel' || data.petition_hold.is_end) return 'ยกเลิกคำขอ'
    const holdDate = dayjs(data.petition_hold.hold_date, 'YYYY-MM-DD')
    if (dirtyFields.duration) {
      const newExpired = holdDate.add(Number(duration), 'day')
      return `${duration} วัน (${holdDate.format('DD/MM/YYYY')} - ${newExpired.format('DD/MM/YYYY')})`
    }
    const dayDiff = dayjs(data.petition_hold.date_expired).diff(holdDate, 'day')
    return `${dayDiff} วัน (${holdDate.format('DD/MM/YYYY')} - ${dayjs(data.petition_hold.date_expired, 'YYYY-MM-DD').format('DD/MM/YYYY')})`
  }, [
    data.petition_hold.date_expired,
    data.petition_hold.hold_date,
    dirtyFields.duration,
    data.petition_hold.is_end,
  ])

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

  const onSubmit = useCallback(async (value: FieldType) => {
    const body = value.duration !== 'Cancel' ? {
      hold_id: data.petition_hold.id,
      days: Number(value.duration)
    } : {
      hold_id: data.petition_hold.id,
      cancel: value.duration === 'Cancel' ? true : false,
    }
    try {
      const response = await patchPetitionHoldAPI(body)
      if (response.status === 200) {
        Modal.success({
          title: 'สำเร็จ',
          content: 'บันทึกข้อมูลสำเร็จ',
          okText: 'ตกลง',
          onOk: async () => {
            setShowEditForm(false)
            await onRefetch()
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
          title: 'ผิดพลาด',
          content: error?.response?.data?.message,
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
    }
  }, [data.petition_hold.id, setShowEditForm, onRefetch])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
      <section className='mt-3'>
        <p className='mb-3'>ระยะเวลาในการแก้ไข : {renderDuration(watch('duration'))}</p>
        {showEditForm &&
          <Controller
            name='duration'
            control={control}
            render={({ field }) => {
              return (
                <Radio.Group
                  {...field}
                  name={field.name}
                  options={[
                    { value: 3, label: '3 วัน' },
                    { value: 7, label: '7 วัน' },
                    { value: 14, label: '14 วัน' },
                    { value: "Cancel", label: 'ยกเลิกคำขอ' },
                  ]}
                />
              )
            }}
          />
        }
      </section>
      <button ref={submitRef} type='submit' className='hidden' />
    </form>
  )
}

const ModalMessage: React.FC<Props> = (props) => {
  const { open, data, setOpen, onRefetch } = props
  const [showEditForm, setShowEditForm] = useState<boolean>(false)
  const navigate = useNavigate()
  const submitRef = useRef<HTMLButtonElement | null>(null)

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
      footer={(_, { OkBtn }) => {
        if (data.petition_hold.is_end) return false
        return (
          <div className='flex items-center justify-between gap-5'>
            <Button
              className='!bg-[#0009FF] !text-white'
              style={{
                visibility: showEditForm ? 'hidden' : 'visible'
              }}
              onClick={() => setShowEditForm(true)}
            >
              เพิ่มระยะเวลา
            </Button>
            {showEditForm ?
              <Button
                type='primary'
                htmlType='submit'
                onClick={() => submitRef.current?.click()}
              >
                บันทึก
              </Button>
              :
              <OkBtn />
            }
          </div>
        )
      }}
      okText='แก้ไขข้อมูล'
      okButtonProps={{
        style: {
          backgroundColor: '#FF7E00'
        },
        onClick: () => {
          navigate('/route-estimation/route', {
            state: {
              petition_id: data.petition_id,
              type: data.status.status_name
            }
          })
        }
      }}
      afterClose={() => setShowEditForm(false)}
      onCancel={() => setOpen(INIT_MODAL_MESSAGE)}
    >
      <Content
        data={data}
        showEditForm={showEditForm}
        submitRef={submitRef}
        setShowEditForm={setShowEditForm}
        onRefetch={onRefetch}
      />
    </Modal>
  )
}

export default React.memo<Props>(ModalMessage)
