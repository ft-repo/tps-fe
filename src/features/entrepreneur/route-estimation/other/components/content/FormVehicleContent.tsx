/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import { FormVehicle, FormRemark } from '../../components'
import { FieldTypeForOther } from '@/@types/entrepreneur/route-estimation';
import { Control, UseFormSetValue, UseFormTrigger } from 'react-hook-form';

interface Props {
  control: Control<FieldTypeForOther>;
  setValue: UseFormSetValue<FieldTypeForOther>;
  trigger: UseFormTrigger<FieldTypeForOther>;
}

const FormVehicleContent: React.FC<Props> = (props) => {
  const { control, setValue, trigger } = props

  return (
    <div>
      <section>
        <FormVehicle
          control={control}
          setValue={setValue}
          trigger={trigger}
        />
      </section>
      <section className='mt-3'>
        <FormRemark
          control={control}
          setValue={setValue}
        />
      </section>
    </div>
  )
}

export default React.memo<Props>(FormVehicleContent)
