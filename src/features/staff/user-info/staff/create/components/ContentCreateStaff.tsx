/* eslint-disable react-refresh/only-export-components */
import React, { useEffect, useMemo, useState } from 'react'
import { CreateStaffData } from '../components';
import { Spin } from 'antd'
import { LDAPList } from '@/@types/reducer/user';

interface Props {
  id: number | null;
  ldapPrefil: LDAPList;
}

const ContentCreateStaff: React.FC<Props> = (props) => {
  const { id, ldapPrefil } = props
  const [updateID, setUpdateID] = useState(false);

  useEffect(() => {
    if (String(id)) {
      setUpdateID(true);

      const timer = setTimeout(() => {
        setUpdateID(false)
      }, 500)

      return () => clearTimeout(timer)
    }
  }, [id]);

  const renderCreateUser = useMemo(() => {
    if (!updateID) {
      return (
        <CreateStaffData
          ldapPrefil={ldapPrefil}
        />
      )
    } else {
      return (
        <Spin spinning>
          <CreateStaffData
            ldapPrefil={ldapPrefil}
          />
        </Spin>
      )
    }
  }, [updateID, ldapPrefil])

  return (
    <>
      {renderCreateUser}
    </>
  )
}

export default React.memo<Props>(ContentCreateStaff)
