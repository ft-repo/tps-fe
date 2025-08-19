/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React, { useCallback, useEffect } from 'react'
import { FormSearchPetition, TablePetition } from '../components'
import { setLoading, useAppDispatch, useAppSelector } from '@/store'
import { getAdminPetitionHistoryData, setAdminPetitionHistoryData } from '@/store/slices/staff'

interface Props { }

const ContentPetition: React.FC<Props> = (props) => {
  const { } = props
  const dispatch = useAppDispatch()
  const { petition_history, loading } = useAppSelector(state => state.staff.petition)

  useEffect(() => {
    dispatch(getAdminPetitionHistoryData(petition_history.overview.search))
  }, [dispatch, petition_history.overview.search])

  const handleTableChange = useCallback((page: number, limit: number) => {
    dispatch(setLoading(true))
    try {
      dispatch(setAdminPetitionHistoryData({
        params: {
          ...petition_history.overview.search,
          page,
          limit
        },
        data: { ...petition_history.overview.data }
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
  }, [dispatch, petition_history.overview])

  return (
    <div>
      <h3>ประวัติการขออนุญาตรถหมวด 2 (4 - 7 เพลา)</h3>
      <section className="mt-5">
        <FormSearchPetition />
      </section>
      <section className="mt-5">
        <TablePetition
          data={petition_history.overview.data}
          loading={loading}
          handleTableChange={handleTableChange}
        />
      </section>
    </div>
  )
}

export default React.memo<Props>(ContentPetition)
