/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React, { useCallback, useEffect } from 'react'
import { SeachStaff, StaffTable } from '../components'
import { Button } from '@/components/ui'
import { FaPlus as PlusIcon } from 'react-icons/fa6'
import { setLoading, useAppDispatch, useAppSelector } from '@/store'
import { Modal } from 'antd'
import { getAdminData, setAdminData } from '@/store/slices/staff'
import { deleteStaffAPI } from '@/services/staff/UserService'
import { StaffList } from '@/@types/services/user'
import { useNavigate } from 'react-router-dom'

interface Props { }

const OverviewScreen: React.FC<Props> = (props) => {
  const { } = props
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const admin = useAppSelector(state => state.staff.staff.admin)
  const loading = useAppSelector(state => state.layout.loading)

  useEffect(() => {
    dispatch(getAdminData(admin.overview.search))
  }, [dispatch, admin.overview.search])

  const handleTableChange = useCallback((page: number, limit: number) => {
    dispatch(setLoading(true))
    try {
      dispatch(setAdminData({
        params: {
          ...admin.overview.search,
          page,
          limit
        },
        data: { ...admin.overview.data }
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
  }, [dispatch, admin.overview])

  const handleSearch = useCallback((value: string) => {
    dispatch(setLoading(true))
    try {
      dispatch(setAdminData({
        params: {
          ...admin.overview.search,
          search: value
        },
        data: { ...admin.overview.data }
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
  }, [dispatch, admin.overview])
  
  const deleteRecord = useCallback(async (id: string | number) => {
    dispatch(setLoading(true))
    try {
      const response = await deleteStaffAPI(id)
      if (response.status === 200) {
        Modal.success({
          title: 'สำเร็จ',
          content: 'บันทึกข้อมูลสำเร็จ',
          okText: 'ตกลง',
          onOk: () => {
            dispatch(setAdminData(admin.overview.search))
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
  }, [dispatch, admin.overview.search])

  const confirmDeleteRecord = useCallback(async (id: string | number, data: StaffList) => {
    Modal.confirm({
      title: 'ยืนยันการลบข้อมูล',
      content: (
        <>
          <p className='text-base'><strong>Username</strong> : {data.username || '-'}</p>
          <p className='text-base'><strong>ชื่อ - นามสกุล</strong> : {data.first_name + ' ' + data.last_name || '-'}</p>
          <p className='text-base'><strong>หน่วยงาน	</strong> : {data.department.dept_name}</p>
          <p className='text-base'><strong>สิทธิ์การเข้าใช้งาน	</strong> : {data.role.name}</p>
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
      <section className="mt-5">
        <SeachStaff
          handleSearch={handleSearch}
        />
      </section>
      <section className="mt-5">
        <StaffTable
          data={admin.overview.data}
          loading={loading}
          handleTableChange={handleTableChange}
          confirmDelete={confirmDeleteRecord}
        />
      </section>
    </div>
  )
}

export default React.memo<Props>(OverviewScreen)
