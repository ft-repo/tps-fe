/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import { SeachCreateStaff, CreateStaffTable } from '../components'

interface Props {

}

const CreateScreen: React.FC<Props> = (props) => {
  const { } = props

  return (
    <div>
      <h3>เพิ่มข้อมูลเจ้าหน้าที่</h3>
      <section>
        <SeachCreateStaff/>
      </section>
      <section>
        <CreateStaffTable/>
      </section>
    </div>
  )
}

export default React.memo<Props>(CreateScreen)
