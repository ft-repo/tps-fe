/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React, { useCallback, useEffect } from 'react'
import { FormSearchPetition, TablePetition } from '../components'
import { setLoading, useAppDispatch, useAppSelector } from '@/store'
import { getAdminPetitionData, setAdminPetitionData } from '@/store/slices/staff'
import { FieldType } from './FormSearchPetition'


interface Props { }

const ContentPetition: React.FC<Props> = (props) => {
  const { } = props
  const dispatch = useAppDispatch()
  const { petition, loading } = useAppSelector(state => state.staff.petition)

  useEffect(() => {
    dispatch(getAdminPetitionData(petition.overview.search))
  }, [dispatch, petition.overview.search])

  const handleTableChange = useCallback((page: number, limit: number) => {
    dispatch(setLoading(true))
    try {
      dispatch(setAdminPetitionData({
        params: {
          ...petition.overview.search,
          page,
          limit
        },
        data: { ...petition.overview.data }
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
  }, [dispatch, petition.overview])

  const handleSearch = useCallback((value: FieldType) => {
    dispatch(setLoading(true))
    try {
      dispatch(setAdminPetitionData({
        params: {
          ...petition.overview.search,
          ...value
        },
        data: { ...petition.overview.data }
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
  }, [dispatch, petition.overview])
  
  return (
    <div>
      <h3>รายการขออนุญาตรถหมวด 2 (4 - 7 เพลา)</h3>
      <section className="mt-5">
        <FormSearchPetition
          handleSearch={handleSearch}
        />
      </section>
      <section className="mt-5">
        <TablePetition
          data={petition.overview.data}
          loading={loading}
          handleTableChange={handleTableChange}
        />
      </section>
    </div>
  )
}

export default React.memo<Props>(ContentPetition)
