/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React, { useCallback, useEffect, useState } from 'react'
import {
  FormSearchCategory as FormSearchPetition,
  ModalMessage,
  ModalRuralRoadDetails,
  TableCategory as TablePetition
} from '../components'
import { setLoading, useAppDispatch, useAppSelector } from '@/store'
import { getPetitionData, setPetitionData } from '@/store/slices/entrepreneur'
import { FieldType } from '@/@types/entrepreneur/permit-list'
import { PetitionInfo, RoadInfo } from './ModalRuralRoadDetails'
import { getPetitionMessageAPI, getRuralRoadDetailAPI } from '@/services/entrepreneur/PetitionService'
import { Button, Flex, message } from 'antd'
import { PetitionTableData } from '@/@types/reducer/petition'
import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'
import { PetitionMessageResponse } from '@/@types/services/petition'

interface Props {

}

interface ModalStateProps {
  open: boolean;
  data: RoadInfo[];
  info: PetitionInfo;
}

interface ModalMessageStateProps {
  open: boolean;
  data: PetitionMessageResponse;
}

export const INIT_MODAL: ModalStateProps = {
  open: false,
  data: [],
  info: {
    petition_no: '',
    petition_date: ''
  }
}

export const INIT_MODAL_MESSAGE: ModalMessageStateProps = {
  open: false,
  data: {
    id: 0,
    petition_id: 0,
    status_id: 0,
    remark: '',
    document_url: '',
    is_approved: false,
    is_skipped: false,
    created_by: '',
    created_at: '',
    is_readed: false,
    status: {
      status_name: ''
    },
    admin_creaded: {
      id: '',
      username: '',
      title: '',
      first_name: '',
      last_name: '',
      department_id: 0,
      role_id: 0
    }
  }
}

const ContentSearchCategory: React.FC<Props> = (props) => {
  const { } = props
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const petition = useAppSelector(state => state.entrepreneur.permitList.petition)
  const loading = useAppSelector(state => state.layout.loading)
  // STATE
  const [open, setOpen] = useState<ModalStateProps>(INIT_MODAL)
  const [openMessage, setOpenMessage] = useState<ModalMessageStateProps>(INIT_MODAL_MESSAGE)

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

  const openMessageModal = useCallback(async (messageId: number) => {
    dispatch(setLoading(true))
    try {
      const response = await getPetitionMessageAPI({ message_id: messageId })
      if (response.status === 200) {
        setOpenMessage({
          open: true,
          data: response.data
        })
      }
    } catch (error) {
      if (error instanceof Error) {
        message.error(error.message)
      } else {
        console.error('error: ', error)
      }
    } finally {
      dispatch(setLoading(false))
      dispatch(getPetitionData(petition.overview.search))
    }
  }, [dispatch, petition.overview.search])

  return (
    <div>
      <Flex
        wrap
        align='center'
        justify='space-between'
        gap={5}
      >
        <h3>รายการขออนุญาตรถหมวด 2 (4 - 7 เพลา)</h3>

        <Button
          htmlType='button'
          type='primary'
          onClick={() => navigate('/route-estimation/route')}
        >
          ขอใบอนุญาตรถหมวด 2 (4 - 7 เพลา)
        </Button>
      </Flex>
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
          openMessageModal={openMessageModal}
        />
      </section>
      <ModalMessage
        open={openMessage.open}
        data={openMessage.data}
        setOpen={setOpenMessage}
      />
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
