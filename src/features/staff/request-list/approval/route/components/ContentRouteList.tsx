/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React, { useCallback } from 'react'
import { FormSearchRoute, TableRoute } from '../components'

interface Props {

}

const ContentRouteList: React.FC<Props> = (props) => {
  const { } = props

  const handleTableChange = useCallback((page: number, pageSize: number) => {
    console.log(page)
    console.log(pageSize)
  }, [])

  return (
    <>
      <section>
        <FormSearchRoute />
      </section>
      <section className='mt-5'>
        <TableRoute
          handleTableChange={handleTableChange}
        />
      </section>
    </>
  )
}

export default React.memo<Props>(ContentRouteList)
