/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React, { useCallback, useEffect } from 'react'
import { FormSearchTracking, TableTracking } from '../components'
import { setLoading, useAppDispatch, useAppSelector } from '@/store'
import { getTrackingData, setTrackingData } from '@/store/slices/staff/trackingSlice'

interface Props {

}

const OverviewScreen: React.FC<Props> = (props) => {
  const { } = props
  const dispatch = useAppDispatch()
  const { overview, loading } = useAppSelector(state => state.tracking)

  useEffect(() => {
    dispatch(getTrackingData(overview.search))
  }, [dispatch, overview.search])

  // console.log(overview)

  const handleTableChange = useCallback((page: number, limit: number) => {
    dispatch(setLoading(true))
    try {
      dispatch(setTrackingData({
        params: {
          ...overview.search,
          page,
          limit
        },
        data: { ...overview.data }
      }))
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      } else {
        console.error(error)
      }
    } finally {
      dispatch(setLoading(false))
    }
  }, [dispatch, overview.data, overview.search])

  const handleSearch = useCallback((value: string) => {
    dispatch(setLoading(true))
    try {
      dispatch(setTrackingData({
        params: {
          ...overview.search,
          search: value
        },
        data: { ...overview.data }
      }))
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      } else {
        console.error(error)
      }
    } finally {
      dispatch(setLoading(false))
    }
  }, [dispatch, overview.data, overview.search])

  return (
    <div>
      <h3>ติดตามการเดินรถ</h3>
      <section className="mt-5">
        <FormSearchTracking
          handleSearch={handleSearch}
        />
      </section>
      <section className="mt-5">
        <TableTracking
          data={overview.data}
          loading={loading}
          handleTableChange={handleTableChange}
        />
      </section>
    </div>
  )
}

export default React.memo<Props>(OverviewScreen)
