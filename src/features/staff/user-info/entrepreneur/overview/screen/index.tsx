/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import { memo, FC, useCallback, useEffect } from 'react'
import FormSearch from '../components/FormSearchEntrepreneur'
import TableEntrepreneur from '../components/TableEntrepreneur'
import { getClientLists } from '@/services/staff/UserManagement'
import { useForm } from 'react-hook-form'
import { SearchUserName } from '@/@types/staff/user-info'
import { useDispatch } from 'react-redux'
import { setLoading, useAppSelector } from '@/store'
import { setUserLists } from '@/store/slices/staff'

const OverviewScreen: FC = () => {
  const dispatch = useDispatch()
  const userLists = useAppSelector(state => state.staff.userLists)
  const loading = useAppSelector(state => state.layout.loading)

  const form = useForm<SearchUserName>({
    defaultValues: {
      username: ''
    }
  })

  const { control, handleSubmit } = form

  const fetchClientLists = useCallback(async (username: string, page: number = 1, limit: number = 10) => {
    dispatch(setLoading(true))
    try {
      const resp = await getClientLists({ limit, page, search: username })
      dispatch(setUserLists(resp.data))
    } catch (error) {
      console.log(error)
    } finally {
      dispatch(setLoading(false))
    }
  }, [dispatch])

  useEffect(() => {
    fetchClientLists('')
  }, [fetchClientLists])

  const onSubmit = useCallback((value: SearchUserName) => {
    fetchClientLists(value.username)
  }, [fetchClientLists])

  console.log(userLists)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>ข้อมูลผู้ประกอบการ</h3>
      <section className='mt-5'>
        <FormSearch control={control} loading={loading} />
      </section>
      <section className='mt-5'>
        <TableEntrepreneur />
      </section>
    </form>
  )
}

export default memo(OverviewScreen)
