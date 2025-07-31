/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
//import React from 'react'
import React from 'react'
import CreateScreen from '@/features/staff/user-info/staff/create/screen'

interface Props {

}

const CreateIndex: React.FC<Props> = (props) => {
  const { } = props

  return (
    <div>
      <CreateScreen />
    </div>
  )
}

export default React.memo<Props>(CreateIndex)
