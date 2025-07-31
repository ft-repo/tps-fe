/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import { SeachCreateStaff, CreateStaffTable, CreateStaffData } from '../components'

interface Props {

}

const CreateScreen: React.FC<Props> = (props) => {
  const { } = props

  return (
    <div>
      <section>
        <h3>เพิ่มข้อมูลเจ้าหน้าที่</h3>
        <div className='mt-5'>
          <SeachCreateStaff />
        </div>
      </section>
      <section className='mt-5'>
        <div className='block xl:grid grid-cols-2 gap-5'>
          <CreateStaffTable />
          <CreateStaffData />
        </div>
      </section>
    </div>
  )
}

export default React.memo<Props>(CreateScreen)
