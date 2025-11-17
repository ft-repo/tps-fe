/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import { useAppSelector } from '@/store';
import { Badge, Button, Col, Row, Select } from 'antd';
import React, { useCallback, useRef } from 'react'
import { Controller, useForm } from 'react-hook-form'

interface Props {
  setProjectId: (value: number | null) => void;
}

interface FieldType {
  search: string | null;
}

const FormSearchMap: React.FC<Props> = (props) => {
  const { setProjectId } = props
  const { detail } = useAppSelector(state => state.tracking)
  const submitRef = useRef<HTMLButtonElement>(null)

  const form = useForm<FieldType>({
    defaultValues: {
      search: null
    }
  })

  const { handleSubmit, control, setValue } = form

  const onSubmit = useCallback((value: FieldType) => {
    setProjectId(Number(value.search))
  }, [setProjectId])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
          <Controller
            name='search'
            control={control}
            render={({ field }) => {
              return (
                <fieldset>
                  <Select
                    {...field}
                    allowClear
                    showSearch
                    placeholder='โครงการทั้งหมด...'
                    options={detail.business.project}
                    fieldNames={{
                      label: 'project_name',
                      value: 'project_id'
                    }}
                    filterOption={(input, option) => {
                      return option ? option.project_name.toLowerCase().indexOf(input.toLowerCase()) >= 0 : false;
                    }}
                    className='w-full'
                    size='large'
                    style={{
                      fontFamily: 'Noto Sans Thai'
                    }}
                    onChange={(e) => {
                      if (!e) {
                        field.onChange(e)
                        setValue('search', null)
                        submitRef.current?.click()
                      } else {
                        field.onChange(e)
                        setValue('search', e)
                        submitRef.current?.click()
                      }
                    }}
                  />
                </fieldset>
              )
            }}
          />
        </Col>
        <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12} className='lg:text-right'>
          <Button
            type='primary'
            size='large'
            onClick={() => { setProjectId(null); setValue('search', null) }}
          >
            โครงการ <Badge count={detail.business.project.length} />
          </Button>
        </Col>
      </Row>
      <button ref={submitRef} hidden type='submit' />
    </form>
  )
}

export default React.memo<Props>(FormSearchMap)
