/* eslint-disable no-empty-pattern */
import type { ThemeConfiguratorProps } from '@/components/template/ThemeConfigurator'
import { getUploadAPI } from '@/services/entrepreneur/VehicleListService';
import { setPanelExpand, useAppDispatch, useAppSelector } from '@/store';
import { getPetitionNotification } from '@/store/slices/staff';
import { Avatar, Button, ConfigProvider, List, message, Spin } from 'antd';
import dayjs from 'dayjs';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export type SidePanelContentProps = ThemeConfiguratorProps

export interface ContentProps { }

const Content = (props: ContentProps) => {
  const { } = props;
  const { notification } = useAppSelector(state => state.staff.petition)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  // State to cache loaded images
  const [imageCache, setImageCache] = useState<Record<string, string>>({});
  const [loadingImages, setLoadingImages] = useState<Record<string, boolean>>({});

  const updateLimit = useCallback(() => {
    dispatch(getPetitionNotification({
      ...notification.search,
      limit: 100
    }))
  }, [dispatch, notification.search])

  const extractUrl = useCallback((url: string) => {
    const path = url.split('/upload')[1];
    return path
  }, []);

  const loadImage = useCallback(async (fileUrl: string, cacheKey: string) => {
    // If already loading or cached, don't load again
    if (loadingImages[cacheKey] || imageCache[cacheKey]) {
      return;
    }

    setLoadingImages(prev => ({ ...prev, [cacheKey]: true }));

    try {
      const response = await getUploadAPI(fileUrl);
      if (response.status === 200) {
        const url = URL.createObjectURL(response.data);
        setImageCache(prev => ({ ...prev, [cacheKey]: url }));
      }
    } catch (error) {
      if (error instanceof Error) {
        message.error(error.message);
      } else {
        console.error(error);
      }
    } finally {
      setLoadingImages(prev => ({ ...prev, [cacheKey]: false }));
    }
  }, [imageCache, loadingImages]);

  // Load images when notification data changes
  useEffect(() => {
    notification.data.forEach((item, index) => {
      const extractedUrl = extractUrl(item.profile_url);
      const cacheKey = `${item.petition_id}-${index}`;

      if (extractedUrl && !imageCache[cacheKey] && !loadingImages[cacheKey]) {
        loadImage(extractedUrl, cacheKey);
      }
    });
  }, [notification.data, loadImage, extractUrl, imageCache, loadingImages]);

  // Cleanup object URLs when component unmounts
  useEffect(() => {
    return () => {
      Object.values(imageCache).forEach(url => {
        if (url.startsWith('blob:')) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [imageCache]);

  return (
    <>
      <section>
        <List
          itemLayout="horizontal"
          dataSource={notification.data}
          renderItem={(item, index) => {
            const cacheKey = `${item.petition_id}-${index}`;
            const cachedImage = imageCache[cacheKey];
            const isLoadingImage = loadingImages[cacheKey];
            const fallbackImage = `https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`;

            return (
              <List.Item
                extra={<p className='text-gray-500'>{dayjs(item.created_at).format('DD/MM/YYYY HH:mm')}</p>}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar
                      src={cachedImage || fallbackImage}
                      style={isLoadingImage ? { opacity: 0.6 } : {}}
                    />
                  }
                  title={
                    <a
                      href="#"
                      onClick={() => {
                        if (item.from === 'petition') {
                          // navigate(`/request-list/approval/document?petition_id=${item.petition_id}&status_id=${item.status_id}&is_approved=null`)
                          navigate(`/request-list/overview?tabKey=1`)
                        }
                        if (item.from === 'extended') {
                          // navigate(`/request-list/approval/other?petition_id=${item.petition_id}&status_id=${item.status_id}&is_approved=null`)
                          navigate(`/request-list/overview?tabKey=2`)
                        }
                        dispatch(setPanelExpand(false))
                      }}
                    >
                      คำขออนุญาตใหม่
                    </a>
                  }
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