/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import { FormSearchOther, TableOther } from '.'

interface Props {

}

const ContentSearchOther: React.FC<Props> = (props) => {
  const { } = props

  return (
    <div>
      <h3>ประวัติการขออนุญาตรถหมวด 2 นอกเหนือ (4 - 7 เพลา)</h3>
      <section className='mt-5'>
        <FormSearchOther />
      </section>
      <section className='mt-3'>
        <TableOther />
      </section>
    </div>
  )
}

export default React.memo<Props>(ContentSearchOther)
