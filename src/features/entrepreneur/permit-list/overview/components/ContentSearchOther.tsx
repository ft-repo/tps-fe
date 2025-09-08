/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React, { useCallback, useEffect } from 'react'
import {
  FormSearchOther as FormSearchPetitionExtended,
  TableOther as TablePetitionExtended
} from '../components'
import { setLoading, useAppDispatch, useAppSelector } from '@/store'
import { getPetitionExtendedData, setPetitionExtendedData } from '@/store/slices/entrepreneur'
import { FieldType } from '@/@types/entrepreneur/permit-list'
import { Button, Flex } from 'antd'
import { useNavigate } from 'react-router-dom'

interface Props {

}

const ContentSearchOther: React.FC<Props> = (props) => {
  const { } = props
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const petition_extended = useAppSelector(state => state.entrepreneur.permitList.petition_extended)
  const loading = useAppSelector(state => state.layout.loading)

  useEffect(() => {
    dispatch(getPetitionExtendedData(petition_extended.overview.search))
  }, [dispatch, petition_extended.overview.search])

  const handleTableChange = useCallback((page: number, limit: number) => {
    dispatch(setLoading(true))
    try {
      dispatch(setPetitionExtendedData({
        params: {
          ...petition_extended.overview.search,
          page,
          limit
        },
        data: { ...petition_extended.overview.data }
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
  }, [dispatch, petition_extended.overview])

  const handleSearch = useCallback((value: FieldType) => {
    dispatch(setLoading(true))
    try {
      dispatch(setPetitionExtendedData({
        params: {
          ...petition_extended.overview.search,
          search: value
        },
        data: { ...petition_extended.overview.data }
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
  }, [dispatch, petition_extended.overview])

  return (
    <div>
      <Flex
        wrap
        align='center'
        justify='space-between'
        gap={5}
      >
        <h3>รายการขออนุญาตรถนอกเหนือ (4 - 7 เพลา)</h3>
        <Button
          htmlType='button'
          type='primary'
          color='yellow'
          variant='solid'
          onClick={() => navigate('/route-estimation/other')}
        >
          ขอใบอนุญาตรถนอกเหนือ (4 - 7 เพลา)
        </Button>
      </Flex>
      <section className='mt-5'>
        <FormSearchPetitionExtended
          handleSearch={handleSearch}
        />
      </section>
      <section className='mt-3'>
        <TablePetitionExtended
          data={petition_extended.overview.data}
          loading={loading}
          handleTableChange={handleTableChange}
        />
      </section>
    </div>
  )
}

export default React.memo<Props>(ContentSearchOther)
