/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-empty-pattern */
import appConfig from '@/configs/app.config';
import { REDIRECT_URL_KEY } from '@/constants/app.constant';
import useAuth from '@/utils/hooks/useAuth';
import { ConfigProvider, Modal } from 'antd'
import React, { useCallback, useEffect } from 'react'
import { useLocation } from 'react-router-dom';

interface Props {

}

const { unAuthenticatedEntryPath } = appConfig

const AccessDeniedPage: React.FC<Props> = (props) => {
  const { } = props
  const [modal, contextHolder] = Modal.useModal();
  const location = useLocation()
  const { signOut } = useAuth()

  const openErrorModal = useCallback(async () => {
    await modal.error({
      title: 'ไม่สามารถเข้าถึงข้อมูลได้',
      content: 'กรุณาเข้าสู่ระบบอีกครั้ง',
      okText: 'ตกลง',
      onOk: () => {
        Modal.destroyAll()
        signOut()
        window.location.replace(`${unAuthenticatedEntryPath}?${REDIRECT_URL_KEY}=${location.pathname}`)
      },
      okButtonProps: {
        style: {
          fontFamily: 'Noto Sans Thai'
        }
      },
      style: {
        fontFamily: 'Noto Sans Thai'
      },
    })
  }, [location.pathname, modal, signOut])

  useEffect(() => {
    openErrorModal()
  }, [openErrorModal])

  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            fontFamily: "Noto Sans Thai"
          }
        }}
      >
      </ConfigProvider>
      {contextHolder}
    </>
  )
}

export default React.memo<Props>(AccessDeniedPage)
