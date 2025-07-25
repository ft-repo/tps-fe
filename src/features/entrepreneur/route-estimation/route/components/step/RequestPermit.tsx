/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import { FormPermitDocument, FormPermitRoute } from '..'

interface Props {

}

const RequestPermit: React.FC<Props> = (props) => {
  const { } = props

  return (
    <>
      <section>
        <h3>ใบขออนุญาต</h3>
      </section>
      <section className='mt-5'>
        <div className='block xl:grid grid-cols-2 gap-5'>
          <FormPermitRoute />
          <FormPermitDocument />
        </div>
      </section>
    </>
  )
}

export default React.memo<Props>(RequestPermit)
