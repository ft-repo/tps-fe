/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React, { useCallback, useEffect, useState } from 'react'
import {
  FormSearchOther as FormSearchPetitionExtended,
  TableOther as TablePetitionExtended
} from '../components'
import { setLoading, useAppDispatch, useAppSelector } from '@/store'
import { getPetitionExtendedData, setPetitionExtendedData } from '@/store/slices/entrepreneur'
import { FieldType } from '@/@types/entrepreneur/permit-list'
import { Button, Flex, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { PetitionExtendedMessageResponse } from '@/@types/services/petition'
import { getPetitionExtendedMessageAPI } from '@/services/entrepreneur/PetitionService'
import ModalExtendedMessage from './ModalExtendedMessage'

interface Props {

}

interface ModalStateProps {
  open: boolean;
  data: PetitionExtendedMessageResponse;
}

export const INIT_MODAL: ModalStateProps = {
  open: false,
  data: {
    id: 0,
    petition_exid: 0,
    status_id: 0,
    reply_message: '',
    remark: '',
    document_url: '',
    is_approved: false,
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

const ContentSearchOther: React.FC<Props> = (props) => {
  const { } = props
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { petition_extended, loading } = useAppSelector(state => state.entrepreneur.permitList)
  // const loading = useAppSelector(state => state.layout.loading)
  const [open, setOpen] = useState<ModalStateProps>(INIT_MODAL)

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

  const openMessageModal = useCallback(async (messageId: number) => {
    dispatch(setLoading(true))
    try {
      const response = await getPetitionExtendedMessageAPI({ message_id: messageId })
      if (response.status === 200) {
        setOpen({
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
      dispatch(getPetitionExtendedData(petition_extended.overview.search))
    }
  }, [dispatch, petition_extended.overview.search])

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
          openMessageModal={openMessageModal}
        />
      </section>
      <ModalExtendedMessage
        open={open.open}
        data={open.data}
        setOpen={setOpen}
      />
    </div>
  )
}

export default React.memo<Props>(ContentSearchOther)
