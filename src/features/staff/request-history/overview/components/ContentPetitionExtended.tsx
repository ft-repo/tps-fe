/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React, { useCallback } from 'react'
import { FormSearchPetitionExtended, TablePetitionExtended } from '../components'

interface Props { }

const ContentPetitionExtended: React.FC<Props> = (props) => {
  const { } = props

  const handleTableChange = useCallback((page: number, pageSize: number) => {
    console.log(page)
    console.log(pageSize)
  }, [])

  return (
    <div>
      <h3>ประวัติการขออนุญาตรถหมวด 2 นอกเหนือ (4 - 7 เพลา)</h3>
      <section className="mt-5">
        <FormSearchPetitionExtended />
      </section>
      <section className="mt-5">
        <TablePetitionExtended
          handleTableChange={handleTableChange}
        />
      </section>
    </div>
  )
}

export default React.memo<Props>(ContentPetitionExtended)
