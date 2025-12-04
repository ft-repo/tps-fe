/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React, { useCallback, useEffect } from 'react'
import { FormSearchPetition, TablePetition } from '../components'
import { setLoading, useAppDispatch, useAppSelector } from '@/store'
import { getAdminPetitionHistoryData, setAdminPetitionHistoryData } from '@/store/slices/staff'
import { Button, Dropdown, Flex, MenuProps } from 'antd';
import { AiOutlineDownload } from 'react-icons/ai';

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

  const handleSearch = useCallback((value: string) => {
    dispatch(setLoading(true))
    try {
      dispatch(setAdminPetitionHistoryData({
        params: {
          ...petition_history.overview.search,
          search: value
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

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: 'รายการสรุป xlsx',
      onClick: () => console.log((''))
    },
    {
      key: '2',
      label: 'รายการสรุป csv',
      onClick: () => console.log((''))
    },
    {
      key: '3',
      label: 'รายการสรุป pdf',
      onClick: () => console.log((''))
    },
  ]

  return (
    <div>
      <Flex
        wrap
        align='center'
        justify='space-between'
        gap={5}
      >
        <h3>ประวัติการขออนุญาตรถหมวด 2 (4 - 7 เพลา)</h3>
        <Dropdown
          menu={{ items }}
        >
          <Button
            type="primary"
            icon={<AiOutlineDownload />}
          >
            Export File
          </Button>
        </Dropdown>
      </Flex>
      <section className="mt-5">
        <FormSearchPetition
          handleSearch={handleSearch}
        />
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
