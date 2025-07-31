/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import {SeachStaff, StaffTable} from '../components'

interface Props {

}

const OverviewScreen: React.FC<Props> = (props) => {
  const { } = props

  return (
    <div>
      <h3>ข้อมูลเจ้าหน้าที่</h3>
      <section className='mt-5'>
      <SeachStaff/>
      </section>
      <section className= 'mt-5'>
      <StaffTable/>
      </section>
    </div>
  )
}

export default React.memo<Props>(OverviewScreen)