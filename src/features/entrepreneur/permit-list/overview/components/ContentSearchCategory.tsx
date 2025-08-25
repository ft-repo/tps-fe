/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React, { useCallback, useEffect, useState } from 'react'
import {
  FormSearchCategory as FormSearchPetition,
  ModalRuralRoadDetails,
  TableCategory as TablePetition
} from '../components'
import { setLoading, useAppDispatch, useAppSelector } from '@/store'
import { getPetitionData, setPetitionData } from '@/store/slices/entrepreneur'
import { FieldType } from '@/@types/entrepreneur/permit-list'
import { PetitionInfo, RoadInfo } from './ModalRuralRoadDetails'
import { getRuralRoadDetailAPI } from '@/services/entrepreneur/PetitionService'
import { message } from 'antd'
import { PetitionTableData } from '@/@types/reducer/petition'
import dayjs from 'dayjs'

interface Props {

}

interface ModalStateProps {
  open: boolean;
  data: RoadInfo[];
  info: PetitionInfo;
}

export const INIT_MODAL: ModalStateProps = {
  open: false,
  data: [],
  info: {
    petition_no: '',
    petition_date: ''
  }
}

const ContentSearchCategory: React.FC<Props> = (props) => {
  const { } = props
  const dispatch = useAppDispatch()
  const petition = useAppSelector(state => state.entrepreneur.permitList.petition)
  const loading = useAppSelector(state => state.layout.loading)
  // STATE
  const [open, setOpen] = useState<ModalStateProps>(INIT_MODAL)

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

  const openDataModal = useCallback(async (id: string | number, record: PetitionTableData) => {
    dispatch(setLoading(true))
    try {
      const response = await getRuralRoadDetailAPI({
        petition_id: String(id),
        page: 1,
        limit: 10
      })
      if (response.status === 200) {
        setOpen({
          open: true,
          data: response.data,
          info: {
            petition_no: record.petition_no,
            petition_date: dayjs(record.petition_date).format('DD MMMM YYYY'),
          }
        })
      }
    } catch (error) {
      if (error instanceof Error) {
        message.error(error.message)
      } else {
        console.error(error)
      }
    } finally {
      dispatch(setLoading(false))
    }
  }, [dispatch])

  return (
    <div>
      <h3>รายการขออนุญาตรถหมวด 2 (4 - 7 เพลา)</h3>
      <section className='mt-5'>
        <FormSearchPetition
          handleSearch={handleSearch}
        />
      </section>
      <section className='mt-3'>
        <TablePetition
          data={petition.overview.data}
          loading={loading}
          handleTableChange={handleTableChange}
          openDataModal={openDataModal}
        />
      </section>
      <ModalRuralRoadDetails
        open={open.open}
        data={open.data}
        info={open.info}
        setOpen={setOpen}
      />
    </div>
  )
}

export default React.memo<Props>(ContentSearchCategory)
