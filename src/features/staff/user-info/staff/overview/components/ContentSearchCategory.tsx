/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import { FormSearchCategory, TableCategory } from '.'

interface Props {

}

const ContentSearchCategory: React.FC<Props> = (props) => {
  const { } = props

  return (
    <div>
      <h3>ข้อมูลเจ้าหน้าที่</h3>
      <section className='mt-5'>
        <FormSearchCategory />
      </section>
      <section className='mt-3'>
        <TableCategory />
      </section>
    </div>
  )
}

export default React.memo<Props>(ContentSearchCategory)
