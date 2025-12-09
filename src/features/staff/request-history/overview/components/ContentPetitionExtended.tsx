/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React, { useCallback, useEffect } from 'react'
import { ExportFileExtended, FormSearchPetitionExtended, TablePetitionExtended } from '../components'
import { setLoading, useAppDispatch, useAppSelector } from '@/store'
import { getAdminPetitionHistoryExtendedData, setAdminPetitionHistoryExtendedData } from '@/store/slices/staff'
import { Flex } from 'antd'

interface Props { }

const ContentPetitionExtended: React.FC<Props> = (props) => {
  const { } = props
  const dispatch = useAppDispatch()
  const { petition_history_extended, loading } = useAppSelector(state => state.staff.petition)

  useEffect(() => {
    dispatch(getAdminPetitionHistoryExtendedData(petition_history_extended.overview.search))
  }, [dispatch, petition_history_extended.overview.search])

  const handleTableChange = useCallback((page: number, limit: number) => {
    dispatch(setLoading(true))
    try {
      dispatch(setAdminPetitionHistoryExtendedData({
        params: {
          ...petition_history_extended.overview.search,
          page,
          limit
        },
        data: { ...petition_history_extended.overview.data }
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
  }, [dispatch, petition_history_extended.overview])

  const handleSearch = useCallback((value: string) => {
    dispatch(setLoading(true))
    try {
      dispatch(setAdminPetitionHistoryExtendedData({
        params: {
          ...petition_history_extended.overview.search,
          search: value
        },
        data: { ...petition_history_extended.overview.data }
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
  }, [dispatch, petition_history_extended.overview])

  return (
    <div>
      <Flex
        wrap
        align='center'
        justify='space-between'
        gap={5}
      >
        <h3>ประวัติการขออนุญาตรถหมวด 2 นอกเหนือ (4 - 7 เพลา)</h3>
        <ExportFileExtended
          data={petition_history_extended.overview.data}
        />
      </Flex>
      <section className="mt-5">
        <FormSearchPetitionExtended
          handleSearch={handleSearch}
        />
      </section>
      <section className="mt-5">
        <TablePetitionExtended
          data={petition_history_extended.overview.data}
          loading={loading}
          handleTableChange={handleTableChange}
        />
      </section>
    </div>
  )
}

export default React.memo<Props>(ContentPetitionExtended)
