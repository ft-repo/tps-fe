/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React, { useCallback, useEffect, useState } from 'react'
import { SeachCreateStaff, CreateStaffTable, ContentCreateStaff } from '../components'
import { setLoading, useAppDispatch, useAppSelector } from '@/store'
import { getLDAPData, setLDAPData } from '@/store/slices/staff'
import { LDAPList } from '@/@types/reducer/user'
import { Col, Row } from 'antd'

interface Props {

}

const INIT_STATE: LDAPList = {
  Description: '',
  FirstName: '',
  LastName: '',
  Username: ''
}

const CreateScreen: React.FC<Props> = (props) => {
  const { } = props
  const dispatch = useAppDispatch()
  const { ldap, loading } = useAppSelector(state => state.staff.staff)
  const [ldapPrefil, setLdapPrefil] = useState<LDAPList | any>(INIT_STATE)
  const [id, setID] = useState<number | null>(null)

  useEffect(() => {
    dispatch(getLDAPData(ldap.search))
  }, [dispatch, ldap.search])

  const handleTableChange = useCallback((page: number, limit: number) => {
    dispatch(setLoading(true))
    try {
      dispatch(setLDAPData({
        params: {
          ...ldap.search,
          page,
          limit
        },
        data: ldap.data
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
  }, [dispatch, ldap])

  const handleSearch = useCallback((value: string) => {
    dispatch(setLoading(true))
    try {
      dispatch(setLDAPData({
        params: {
          ...ldap.search,
          keyword: value
        },
        data: ldap.data
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
  }, [dispatch, ldap])

  const onRowSelect = useCallback((key: React.Key[], row: LDAPList[]) => {
    setID(key[0] as number)
    setLdapPrefil(ldap.data.find((item) => item.Username === row[0].Username))
  }, [ldap.data])

  return (
    <div>
      <section>
        <h3>เพิ่มข้อมูลเจ้าหน้าที่</h3>
        <div className='mt-5'>
          <SeachCreateStaff
            handleSearch={handleSearch}
          />
        </div>
      </section>
      <section className='mt-5'>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={12}>
            <CreateStaffTable
              search={ldap.search}
              data={ldap.data}
              loading={loading}
              handleTableChange={handleTableChange}
              onRowSelection={onRowSelect}
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={12}>
            <ContentCreateStaff
              id={id}
              ldapPrefil={ldapPrefil}
            />
          </Col>
        </Row>
      </section >
    </div>
  )
}

export default React.memo<Props>(CreateScreen)
