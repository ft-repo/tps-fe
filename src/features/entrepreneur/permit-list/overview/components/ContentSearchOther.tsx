/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React, { useCallback, useEffect } from 'react'
import {
  FormSearchOther as FormSearchPetitionExtended,
  TableOther as TablePetitionExtended
} from '../components'
import { setLoading, useAppDispatch, useAppSelector } from '@/store'
import { getPetitionData, setPetitionData } from '@/store/slices/entrepreneur'
import { FieldType } from '@/@types/entrepreneur/permit-list'

interface Props {

}

const ContentSearchOther: React.FC<Props> = (props) => {
  const { } = props
  const dispatch = useAppDispatch()
  const petition = useAppSelector(state => state.entrepreneur.permitList.petition)
  const loading = useAppSelector(state => state.layout.loading)

  useEffect(() => {
    dispatch(getPetitionData(petition.overview.search))
  }, [dispatch, petition.overview.search])

  const handleTableChange = useCallback((page: number, limit: number) => {
    dispatch(setLoading(true))
    try {
      dispatch(setPetitionData({
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
      dispatch(setPetitionData({
        params: {
          ...petition.overview.search,
          search: value
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
      <h3>รายการขออนุญาตรถนอกเหนือ (4 - 7 เพลา)</h3>
      <section className='mt-5'>
        <FormSearchPetitionExtended
          handleSearch={handleSearch}
        />
      </section>
      <section className='mt-3'>
        <TablePetitionExtended
          data={petition.overview.data}
          loading={loading}
          handleTableChange={handleTableChange}
        />
      </section>
    </div>
  )
}

export default React.memo<Props>(ContentSearchOther)
