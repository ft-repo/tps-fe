/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import FormSearch from '../components/FormSearchEntrepreneur'
import TableEntrepreneur from '../components/TableEntrepreneur'

interface Props {

}

const OverviewScreen: React.FC<Props> = (props) => {
  const { } = props

  return (
    <div>
      <h3>ข้อมูลผู้ประกอบการ</h3>
      <section className='mt-5'>
        <FormSearch />
      </section>
      <section className='mt-5'>
        <TableEntrepreneur />
      </section>
    </div>
  )
}

export default React.memo<Props>(OverviewScreen)
