/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import { FC, memo, useCallback, useEffect } from 'react'
import { SeachStaff, StaffTable } from '../components'
import { Button } from '@/components/ui'
import { FaPlus as PlusIcon } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import {
  SearchUserName,
  StaffList,
  StaffListsResponse,
} from '@/@types/staff/user-info'
import { useForm } from 'react-hook-form'
import { setLoading, useAppSelector } from '@/store'
import { useDispatch } from 'react-redux'
import { message } from 'antd'
import { getStaffLists } from '@/services/staff/UserManagement'
import { setUserLists } from '@/store/slices/staff'

const OverviewScreen: FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userLists = useAppSelector((state) => state.staff.userLists)
  const loading = useAppSelector((state) => state.layout.loading)

  const form = useForm<SearchUserName>({
    defaultValues: {
      username: '',
    },
  })

  const { control, handleSubmit } = form

  const fetchStaffLists = useCallback(
    async (username: string, page: number = 1, limit: number = 10) => {
      dispatch(setLoading(true))
      try {
        const resp = await getStaffLists({ limit, page, search: username })
        dispatch(setUserLists(resp))
      } catch (error) {
        message.error('ไม่สามารถดึงข้อมูลได้')
      } finally {
        dispatch(setLoading(false))
      }
    },
    [dispatch],
  )

  const onSubmit = useCallback(
    (value: SearchUserName) => {
      fetchStaffLists(value.username)
    },
    [fetchStaffLists],
  )

  useEffect(() => {
    fetchStaffLists('')
  }, [fetchStaffLists])

  const handleTableChange = useCallback(
    (page: number, pageSize: number) => {
      fetchStaffLists(form.getValues('username'), page, pageSize)
    },
    [fetchStaffLists],
  )

  const confirmDelete = useCallback((id: string | number, data: StaffList) => {
    console.log(id, data)
  }, [])

  return (
    <div>
      <section className="flex justify-between items-center flex-wrap gap-5">
        <h3>ข้อมูลเจ้าหน้าที่</h3>
        <Button
          variant="solid"
          icon={<PlusIcon />}
          onClick={() => navigate('/user-info/staff/create')}
        >
          เพิ่มผู้ใช้งาน
        </Button>
      </section>
      <form onSubmit={handleSubmit(onSubmit)}>
        <section className="mt-5">
          <SeachStaff control={control} />
        </section>
        <section className="mt-3">
          <StaffTable
            userLists={userLists as StaffListsResponse}
            loading={loading}
            handleTableChange={handleTableChange}
            confirmDelete={confirmDelete}
          />
        </section>
      </form>
    </div>
  )
}

export default memo(OverviewScreen)
