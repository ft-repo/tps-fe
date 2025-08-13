/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import { memo, FC, useCallback, useEffect } from 'react'
import FormSearch from '../components/FormSearchEntrepreneur'
import TableEntrepreneur from '../components/TableEntrepreneur'
import {
  deleteClientLists,
  getClientLists,
} from '@/services/staff/UserManagement'
import { useForm } from 'react-hook-form'
import {
  ClientList,
  ClientListsResponse,
  SearchUserName,
} from '@/@types/staff/user-info'
import { useDispatch } from 'react-redux'
import { setLoading, useAppSelector } from '@/store'
import { setUserLists } from '@/store/slices/staff'
import { message, Modal } from 'antd'
import dayjs from 'dayjs'

const OverviewScreen: FC = () => {
  const dispatch = useDispatch()
  const userLists = useAppSelector((state) => state.staff.userLists)
  const loading = useAppSelector((state) => state.layout.loading)

  const form = useForm<SearchUserName>({
    defaultValues: {
      username: '',
    },
  })

  const { control, handleSubmit } = form

  const fetchClientLists = useCallback(
    async (username: string, page: number = 1, limit: number = 10) => {
      dispatch(setLoading(true))
      try {
        const resp = await getClientLists({ limit, page, search: username })
        dispatch(setUserLists(resp))
      } catch (error) {
        message.error('ไม่สามารถดึงข้อมูลได้')
      } finally {
        dispatch(setLoading(false))
      }
    },
    [dispatch],
  )

  const deleteRecord = useCallback(
    async (id: string | number) => {
      dispatch(setLoading(true))
      try {
        const response = await deleteClientLists(id)
        if (response.status === 200) {
          message.success('ลบข้อมูลสำเร็จ')
        }
      } catch (error) {
        message.error('ไม่สามารถลบข้อมูลได้')
      } finally {
        fetchClientLists('')
        dispatch(setLoading(false))
        Modal.destroyAll()
      }
    },
    [dispatch, fetchClientLists],
  )

  useEffect(() => {
    fetchClientLists('')
  }, [fetchClientLists])

  const onSubmit = useCallback(
    (value: SearchUserName) => {
      fetchClientLists(value.username)
    },
    [fetchClientLists],
  )

  const handleTableChange = useCallback(
    (page: number, pageSize: number) => {
      fetchClientLists(form.getValues('username'), page, pageSize)
    },
    [fetchClientLists, form],
  )

  const confirmDelete = useCallback(
    (id: string | number, data: ClientList) => {
      Modal.confirm({
        title: 'ยืนยันการลบข้อมูล',
        content: (
          <>
            <p className="text-base">
              <strong>ชื่อผู้ประกอบการ</strong> :{' '}
              {data.business_details.business_name || '-'}
            </p>
            <p className="text-base">
              <strong>ประเภทนิติบุคคล</strong> :{' '}
              {data.business_details.entity_type.name || '-'}
            </p>
            <p className="text-base">
              <strong>เลขทะเบียนนิติบุคคล</strong> : {data.registration_no}
            </p>
            <p className="text-base">
              <strong>วันที่ได้รับอนุญาต</strong> :{' '}
              {dayjs(data.created_at).locale('th').format('DD MMM YYYY')}
            </p>
          </>
        ),
        okText: 'ลบข้อมูล',
        cancelText: 'ยกเลิก',
        onOk: () => deleteRecord(id),
        onCancel: () => Modal.destroyAll(),
        okButtonProps: {
          style: {
            fontFamily: 'Noto Sans Thai',
          },
          danger: true,
          loading: loading,
        },
        cancelButtonProps: {
          style: {
            fontFamily: 'Noto Sans Thai',
          },
          disabled: loading,
        },
        style: {
          fontFamily: 'Noto Sans Thai',
        },
      })
    },
    [deleteRecord, loading],
  )

  console.log(userLists)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>ข้อมูลผู้ประกอบการ</h3>
      <section className="mt-5">
        <FormSearch control={control} loading={loading} />
      </section>
      <section className="mt-5">
        <TableEntrepreneur
          userLists={userLists as ClientListsResponse}
          handleTableChange={handleTableChange}
          confirmDelete={confirmDelete}
          loading={loading}
        />
      </section>
    </form>
  )
}

export default memo(OverviewScreen)
