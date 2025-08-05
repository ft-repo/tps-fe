/* eslint-disable import/no-unresolved */
/* eslint-disable react-refresh/only-export-components */
import React, { useState } from 'react';
import { FormRouteEstimation } from '../..'
import { FieldType, FieldArray } from '@/@types/entrepreneur/route-estimation';
import { Control } from 'react-hook-form';
import MapRouteEstimation from './MapRouteEstimation';

interface Props {
  formItem: FieldArray;
  formIndex: number;
  control: Control<FieldType>;
}

const TemplateForm: React.FC<Props> = (props) => {
  const { formItem, formIndex, control } = props;
  const [firstPoint, setFirstPoint] = useState<[number, number] | null>(null);
  const [secondPoint, setSecondPoint] = useState<[number, number] | null>(null);

  return (
    <div className='grid grid-cols-1 xl:grid-cols-3 gap-5'>
      <div className='order-last xl:col-span-2 xl:order-first'>
        <FormRouteEstimation
          formIndex={formIndex}
          formItem={formItem}
          control={control}
          setFirstPoint={setFirstPoint}
          setSecondPoint={setSecondPoint}
        />
      </div>
      <div className='order-first z-0 h-[50vh] block rounded-md xl:order-last xl:h-[70vh] xl:max-h-auto xl:sticky xl:top-4 xl:overflow-hidden border border-gray-200'>
        <MapRouteEstimation
          firstPoint={firstPoint}
          secondPoint={secondPoint}
        />
      </div>
    </div>
  )
}

export default React.memo<Props>(TemplateForm)
