/* eslint-disable react-refresh/only-export-components */
import { FieldTypeArr, FieldTypeForRoute } from '@/@types/entrepreneur/route-estimation';
import { Col, Row } from 'antd'
import React from 'react'
import { Control, UseFormSetValue } from 'react-hook-form';
import FormVehicle from './FormVehicle';
import MapRouteEstimation from './MapRouteEstimation';

interface Props {
  formItem: FieldTypeForRoute;
  formIndex: number;
  control: Control<FieldTypeArr>;
  setValue: UseFormSetValue<FieldTypeArr>;
}

const Content: React.FC<Props> = (props) => {
  const { formItem, formIndex, control, setValue } = props

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={14}>
        <FormVehicle
          formItem={formItem}
          formIndex={formIndex}
          control={control}
          setValue={setValue}
        />
      </Col>
      <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={10}>
        <div className='order-first z-0 h-[50vh] block rounded-md xl:order-last xl:h-screen xl:max-h-auto xl:sticky xl:top-4 xl:overflow-hidden border border-gray-200'>
          <MapRouteEstimation
            firstPoint={null}
            secondPoint={null}
          />
        </div>
      </Col>
    </Row>
  )
}

export default React.memo<Props>(Content)
