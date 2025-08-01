/* eslint-disable import/no-unresolved */
/* eslint-disable react-refresh/only-export-components */
import React from 'react';
import { FormRouteEstimation } from '../..'
import { FieldType, FieldArray } from '@/@types/entrepreneur/route-estimation';
import { Control } from 'react-hook-form';

interface Props {
  formItem: FieldArray;
  formIndex: number;
  control: Control<FieldType>;
}

const TemplateForm: React.FC<Props> = (props) => {
  const { formItem, formIndex, control } = props;

  return (
    <div className='grid grid-cols-1 xl:grid-cols-3 gap-5'>
      <div className='xl:col-span-2'>
        <FormRouteEstimation
          formIndex={formIndex}
          formItem={formItem}
          control={control}
        />
      </div>
      <figure className='h-full bg-gray-400 block rounded-md overflow-hidden'>
        <h1>MAP GOES HERE</h1>
      </figure>
    </div>
  )
}

export default React.memo<Props>(TemplateForm)
