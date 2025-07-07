import React from 'react';
import { FormRouteEstimation } from '..'
import { FieldArray } from '@/@types/admin/route-estimation';
import { Control } from 'react-hook-form';

interface Props {
  formItem: FieldArray;
  formIndex: number;
  control: Control<FieldArray>;
}

const TemplateForm: React.FC<Props> = (props) => {
  const { formIndex, formItem, control } = props;

  return (
    <div className='grid grid-cols-1 xl:grid-cols-3 gap-5'>
      <div className='xl:col-span-2'>
        <FormRouteEstimation
          formIndex={formIndex}
          formItem={formItem}
          control={control}
        />
      </div>
      <div
        style={{ width: '100%' }}
      >
        <iframe
          width="100%"
          height={500}
          frameBorder={0}
          scrolling="no"
          marginHeight={0}
          marginWidth={0}
          src="https://maps.google.com/maps?width=100%25&height=600&hl=en&q=1%20Grafton%20Street,%20Dublin,%20Ireland+(My%20Business%20Name)&t=&z=14&ie=UTF8&iwloc=B&output=embed"
        >
          &lt;a href="https://www.mapsdirections.info/fr/calculer-la-population-sur-une-carte"&gt;Carte démographique&lt;/a&gt;
        </iframe>
      </div>
    </div>
  )
}

export default React.memo<Props>(TemplateForm)
