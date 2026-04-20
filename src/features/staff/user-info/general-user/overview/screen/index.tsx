/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React, { useCallback, useEffect } from 'react'
import { FormSearchUser, TableUser } from '../components'
import { setLoading, useAppDispatch, useAppSelector } from '@/store'
import { getClientData, setClientData } from '@/store/slices/staff'
import { Modal } from 'antd'
import { ClientList } from '@/@types/services/user'
import { deleteClientAPI } from '@/services/staff/UserService'
import dayjs from 'dayjs'

interface Props { }

const OverviewScreen: React.FC<Props> = (props) => {
  const { } = props
  const dispatch = useAppDispatch()
  const { client, loading } = useAppSelector(state => state.staff.staff)
  // const loading = useAppSelector(state => state.layout.loading)

  useEffect(() => {
    dispatch(getClientData({
      ...client.overview.search,
      is_personal: true
    }))
  }, [dispatch, client.overview.search])

  const handleTableChange = useCallback((page: number, limit: number) => {
    dispatch(setLoading(true))
    try {
      dispatch(setClientData({
        params: {
          ...client.overview.search,
          page,
          limit,
          is_personal: true
        },
        data: { ...client.overview.data }
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
  }, [dispatch, client.overview])

  const handleSearch = useCallback((value: string) => {
    dispatch(setLoading(true))
    try {
      dispatch(setClientData({
        params: {
          ...client.overview.search,
          search: value,
          is_personal: true
        },
        data: { ...client.overview.data }
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
  }, [dispatch, client.overview])

  const deleteRecord = useCallback(async (id: string | number) => {
    dispatch(setLoading(true))
    try {
      const response = await deleteClientAPI(id)
      if (response.status === 200) {
        Modal.success({
          title: 'สำเร็จ',
          content: 'บันทึกข้อมูลสำเร็จ',
          okText: 'ตกลง',
          onOk: () => {
            dispatch(getClientData(client.overview.search))
            Modal.destroyAll()
          },
          okButtonProps: {
            style: {
              fontFamily: 'Noto Sans Thai'
            }
          },
          style: {
            fontFamily: 'Noto Sans Thai'
          }
        })
      }
    } catch (error) {
      if (error instanceof Error) {
        Modal.error({
          title: 'ผิดพลาด',
          content: 'ไม่สามารถบันทึกข้อมูลได้',
          okText: 'ตกลง',
          onOk: () => Modal.destroyAll(),
          okButtonProps: {
            style: {
              fontFamily: 'Noto Sans Thai'
            }
          },
          style: {
            fontFamily: 'Noto Sans Thai'
          }
        })
      } else {
        console.error(error)
      }
    } finally {
      dispatch(setLoading(false))
    }
  }, [dispatch, client.overview])

  const confirmDeleteRecord = useCallback((id: string | number, data: ClientList) => {
    Modal.confirm({
      title: 'ยืนยันการลบข้อมูล',
      content: (
        <>
          <p className='text-base'><strong>ชื่อ - นามสกุล</strong> : {data.business_details.business_name || '-'}</p>
          <p className='text-base'><strong>เลขบัตรประชาชน</strong> : {data.registration_no || '-'}</p>
          <p className='text-base'><strong>เบอร์โทรศัพท์</strong> : {data.contact_info.phone_number || '-'}</p>
          <p className='text-base'><strong>วันที่ได้รับอนุญาต</strong> : {dayjs(data.created_at).format('DD MMM YYYY')}</p>
        </>
      ),
      okText: 'ลบข้อมูล',
      cancelText: 'ยกเลิก',
      onOk: () => deleteRecord(id),
      onCancel: () => Modal.destroyAll(),
      okButtonProps: {
        style: {
          fontFamily: 'Noto Sans Thai'
        },
        danger: true,
        loading: loading
      },
      cancelButtonProps: {
        style: {
          fontFamily: 'Noto Sans Thai'
        },
        disabled: loading
      },
      style: {
        fontFamily: 'Noto Sans Thai'
      }
    })
  }, [deleteRecord, loading])

  return (
    <div>
      <h3>ข้อมูลผู้ประกอบการ</h3>
      <section className="mt-5">
        <FormSearchUser
          handleSearch={handleSearch}
        />
      </section>
      <section className="mt-5">
        <TableUser
          data={client.overview.data}
          loading={loading}
          handleTableChange={handleTableChange}
          confirmDelete={confirmDeleteRecord}
        />
      </section>
    </div>
  )
}

export default React.memo<Props>(OverviewScreen)
