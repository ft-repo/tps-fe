/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import FormSearchCategoryAdmin from './FormSearchCategoryAdmin'
import TableCatagoryAdmin from './TableCatagoryAdmin'

interface Props {

}

const ContentSearchCategoryAdmin: React.FC<Props> = (props) => {
  const { } = props

  return (
    <div>
      <section className='mt-5'>
        <FormSearchCategoryAdmin />
      </section>
      <section className='mt-3'>
        <TableCatagoryAdmin />
      </section>
    </div>
  )
}

export default React.memo<Props>(ContentSearchCategoryAdmin)
