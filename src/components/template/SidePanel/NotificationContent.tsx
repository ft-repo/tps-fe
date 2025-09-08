/* eslint-disable no-empty-pattern */
import type { ThemeConfiguratorProps } from '@/components/template/ThemeConfigurator'
import { useAppDispatch, useAppSelector } from '@/store';
import { getPetitionNotification } from '@/store/slices/staff';
import { Avatar, Button, ConfigProvider, List, Spin } from 'antd';
import dayjs from 'dayjs';
import { useCallback } from 'react';

export type SidePanelContentProps = ThemeConfiguratorProps

export interface ContentProps { }

const Content = (props: ContentProps) => {
  const { } = props;
  const { notification } = useAppSelector(state => state.staff.petition)
  const dispatch = useAppDispatch()

  const updateLimit = useCallback(() => {
    dispatch(getPetitionNotification({
      ...notification.search,
      limit: 100
    }))
  }, [dispatch, notification.search])

  return (
    <>
      <section>
        <List
          itemLayout="horizontal"
          dataSource={notification.data}
          renderItem={(item, index) => {
            return (
              <List.Item
                extra={<p className='text-gray-500'>{dayjs(item.created_at).format('DD/MM/YYYY HH:mm')}</p>}
              >
                <List.Item.Meta
                  avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
                  title={'คำขออนุญาตใหม่'}
                  description={item.business_name || '-'}
                />
              </List.Item>
            )
          }}
        />
      </section>
      {notification.pagination.hasMore ?
        <section className='mt-5'>
          <Button
            block
            type='primary'
            size='large'
            onClick={() => updateLimit()}
          >
            แจ้งเตือนเพิ่มเติม
          </Button>
        </section>
        : null}
    </>
  )
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const NotificationContent = (props: SidePanelContentProps) => {
  const { } = props;
  const { loading } = useAppSelector(state => state.staff.petition)

  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "Noto Sans Thai"
        }
      }}
    >
      <Spin spinning={loading}>
        <Content />
      </Spin>
    </ConfigProvider>
  )
}

export default NotificationContent
