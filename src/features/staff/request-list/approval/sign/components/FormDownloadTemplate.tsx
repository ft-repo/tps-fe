/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import RenderDoc from '@/features/staff/request-history/view/other/components/pdf/ApproveForm';
import AttachedDoc from '@/features/staff/request-history/view/other/components/pdf/AttachedForm';
import { useAppSelector } from '@/store';
import { pdf } from '@react-pdf/renderer';
import { Button, Col, Input, Row } from 'antd';
import React, { useCallback, useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { FaCircleExclamation } from "react-icons/fa6";

interface Props {
  setStep: (step: number | any) => void;
}

export interface FieldType {
  start_km: string;
  end_km: string;
  distance: number;
}

const FormDownloadTemplate: React.FC<Props> = (props) => {
  const { setStep } = props
  const { petition } = useAppSelector(state => state.staff.petition)
  const [type, setType] = useState<'DOC' | 'ATTACHED' | null>(null)
  const form = useForm<FieldType>({
    defaultValues: {
      start_km: '25+1588',
      end_km: '25+4930',
      distance: 5000
    }
  })

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = form

  const onShowAttachedPDF = useCallback(async (value: FieldType) => {
    const blob = await pdf(<AttachedDoc data={petition.detail} value={value} />).toBlob();
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
    setTimeout(() => URL.revokeObjectURL(url), 100);
  }, [petition.detail])

  const onShowPDF = useCallback(async (value: FieldType) => {
    const blob = await pdf(<RenderDoc data={petition.detail} value={value} />).toBlob();
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
    setTimeout(() => URL.revokeObjectURL(url), 100);
  }, [petition.detail])

  const onSubmit = useCallback((value: FieldType) => {
    if (type === 'DOC') {
      onShowPDF(value)
    }
    if (type === 'ATTACHED') {
      onShowAttachedPDF(value)
    }
  }, [onShowPDF, onShowAttachedPDF, type])

  return (
    <div className='lg:max-w-2xl lg:mx-auto mt-20'>
      <h2 className='mb-10 font-medium'>กรอกข้อมูลสำคัญ</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
            <Controller
              name='start_km'
              control={control}
              rules={{
                required: 'กรุณาระบุกม.เริ่มต้น'
              }}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>กม.เริ่มต้น <span className='text-red-500'>*</span></label>
                    <Input
                      {...field}
                      name={field.name}
                      placeholder='กรุณาระบุกม.เริ่มต้น'
                      className='w-full'
                      size='large'
                      style={{
                        fontFamily: 'Noto Sans Thai'
                      }}
                      maxLength={7}
                      onChange={(e) => {
                        field.onChange(e.target.value.replace(/[^0-9+]/g, ""))
                      }}
                    />
                    {!!errors.start_km &&
                      <p className='text-red-500'>{errors.start_km.message}</p>
                    }
                  </fieldset>
                )
              }}
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
            <Controller
              name='end_km'
              control={control}
              rules={{
                required: 'กรุณาระบุกม.สิ้นสุด'
              }}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>กม.สิ้นสุด <span className='text-red-500'>*</span></label>
                    <Input
                      {...field}
                      name={field.name}
                      placeholder='กรุณาระบุกม.สิ้นสุด'
                      className='w-full'
                      size='large'
                      style={{
                        fontFamily: 'Noto Sans Thai'
                      }}
                      maxLength={7}
                      onChange={(e) => {
                        field.onChange(e.target.value.replace(/[^0-9+]/g, ""))
                      }}
                    />
                    {!!errors.end_km &&
                      <p className='text-red-500'>{errors.end_km.message}</p>
                    }
                  </fieldset>
                )
              }}
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
            <Controller
              name='distance'
              control={control}
              rules={{
                required: 'กรุณาระบุระยะทาง'
              }}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>ระยะทาง (กิโลเมตร) <span className='text-red-500'>*</span></label>
                    <Input
                      {...field}
                      name={field.name}
                      placeholder='กรุณาระบุระยะทาง'
                      className='w-full'
                      size='large'
                      style={{
                        fontFamily: 'Noto Sans Thai'
                      }}
                      onChange={(e) => {
                        field.onChange(e.target.value.replace(/[^0-9]/g, ""))
                      }}
                    />
                    {!!errors.distance &&
                      <p className='text-red-500'>{errors.distance.message}</p>
                    }
                  </fieldset>
                )
              }}
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
            <Button
              block
              htmlType='submit'
              type='primary'
              size='large'
              onClick={() => setType('DOC')}
            >
              ดาวน์โหลดหนังสืออนุญาต
            </Button>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
            <Button
              block
              htmlType='submit'
              type='primary'
              size='large'
              onClick={() => setType('ATTACHED')}
            >
              ดาวน์โหลดเอกสารแนบ
            </Button>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
            <div className='flex items-center gap-3'>
              <FaCircleExclamation fill='#5A9BC3' fontSize={32} />
              <p>ภายหลังการดาวน์โหลดหนังสืออนุญาต กรุณาตรวจสอบความถูกต้องของข้อมูลทุกรายการให้ครบถ้วนก่อนดำเนินการลงนามในเอกสารทุกครั้ง</p>
            </div>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
            <Button
              block
              htmlType='button'
              type='default'
              size='large'
              onClick={() => reset()}
            >
              ล้างข้อมูล
            </Button>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
            <Button
              block
              htmlType='button'
              type='primary'
              size='large'
              variant='solid'
              color='green'
              onClick={() => setStep((prev: number) => prev + 1)}
            >
              ถัดไป
            </Button>
          </Col>
        </Row>
      </form>
    </div>
  )
}

export default React.memo<Props>(FormDownloadTemplate)
