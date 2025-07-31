/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import { FormVehicle, FormRemark } from '../../components'

interface Props {

}

const FormVehicleContent: React.FC<Props> = (props) => {
  const { } = props

  return (
    <div>
      <section>
        <FormVehicle />
      </section>
      <section className='mt-3'>
        <FormRemark />
      </section>
    </div>
  )
}

export default React.memo<Props>(FormVehicleContent)
