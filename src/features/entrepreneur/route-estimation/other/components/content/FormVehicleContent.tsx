/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import { FormVehicle, FormRemark } from '../../components'
import { FieldTypeForOther } from '@/@types/entrepreneur/route-estimation';
import { Control } from 'react-hook-form';

interface Props {
  control: Control<FieldTypeForOther>;
}

const FormVehicleContent: React.FC<Props> = (props) => {
  const { control } = props

  return (
    <div>
      <section>
        <FormVehicle
          control={control}
        />
      </section>
      <section className='mt-3'>
        <FormRemark
          control={control}
        />
      </section>
    </div>
  )
}

export default React.memo<Props>(FormVehicleContent)
