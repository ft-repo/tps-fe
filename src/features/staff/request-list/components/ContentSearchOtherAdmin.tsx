/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import FormSearchOtherAdmin from './FormSearchOtherAdmin'
import TableOtherAdmin from './TableOtherAdmin'

interface Props {

}

const ContentSearchOtherAdmin: React.FC<Props> = (props) => {
  const { } = props

  return (
    <div>
      <h3>รายการขออนุญาตรถนอกเหนือ (4 - 7 เพลา)</h3>
      <section className='mt-5'>
        <FormSearchOtherAdmin />
      </section>
      <section className='mt-3'>
        <TableOtherAdmin />
      </section>
    </div>
  )
}

export default React.memo<Props>(ContentSearchOtherAdmin)
