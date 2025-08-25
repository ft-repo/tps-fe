/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import { FormVehicle, FormRemark } from '../../components'
import { FieldTypeForOther } from '@/@types/entrepreneur/route-estimation';
import { Control, FieldErrors, UseFormSetValue } from 'react-hook-form';

interface Props {
  control: Control<FieldTypeForOther>;
  setValue: UseFormSetValue<FieldTypeForOther>;
  errors: FieldErrors<FieldTypeForOther>;
}

const FormVehicleContent: React.FC<Props> = (props) => {
  const { control, setValue, errors } = props

  return (
    <div>
      <section>
        <FormVehicle
          control={control}
          setValue={setValue}
          errors={errors}
        />
      </section>
      <section className='mt-3'>
        <FormRemark
          control={control}
          setValue={setValue}
          errors={errors}
        />
      </section>
    </div>
  )
}

export default React.memo<Props>(FormVehicleContent)
