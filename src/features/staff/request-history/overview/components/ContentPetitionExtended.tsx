/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React, { useCallback, useEffect } from 'react'
import { FormSearchPetitionExtended, TablePetitionExtended } from '../components'
import { setLoading, useAppDispatch, useAppSelector } from '@/store'
import { getAdminPetitionHistoryExtendedData, setAdminPetitionHistoryExtendedData } from '@/store/slices/staff'
import { Button, Dropdown, Flex, MenuProps } from 'antd'
import { AiOutlineDownload } from 'react-icons/ai'

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
        <h3>ประวัติการขออนุญาตรถหมวด 2 นอกเหนือ (4 - 7 เพลา)</h3>
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
