/* eslint-disable react-refresh/only-export-components */
import React, { useCallback, useMemo } from 'react'
import type { PetitionData, PetitionFlow, PetitionTableData } from '@/@types/reducer/petition';
import { Badge, Button, Card, Col, Empty, Flex, message, Pagination, Row, Skeleton, Tag, Typography } from 'antd';
import { CLIENT_PETITION_STATUS } from '@/utils/constant';
import { setLoading, useAppDispatch } from '@/store';
import { getUploadAPI } from '@/services/entrepreneur/VehicleListService';
import { getPetitionMessageAPI } from '@/services/entrepreneur/PetitionService';
import dayjs from 'dayjs';

const STEP_NAMES = ['ตรวจเอกสาร', 'ตรวจเส้นทาง', 'ตรวจยานพาหนะ', 'รอลงนาม', 'ออกใบอนุญาต'] as const

interface Props {
  data: PetitionData;
  loading: boolean;
  handleTableChange: (page: number, limit: number) => void;
  openDataModal: (id: string | number, record: PetitionTableData) => void;
  openMessageModal: (messageId: number) => void;
}

const CardListPetition: React.FC<Props> = (props) => {
  const { data, loading, handleTableChange, openDataModal, openMessageModal } = props
  const dispatch = useAppDispatch()

  const extractUrl = useCallback((url: string) => {
    return url.split('/upload')[1]
  }, [])

  const showFile = useCallback(async (fileUrl: string) => {
    dispatch(setLoading(true))
    try {
      const response = await getUploadAPI(fileUrl)
      if (response.status === 200) {
        const url = URL.createObjectURL(response.data)
        window.open(url)
      }
    } catch (error) {
      if (error instanceof Error) message.error(error.message)
      else console.error(error)
    } finally {
      dispatch(setLoading(false))
    }
  }, [dispatch])

  const fetchStatusMessage = useCallback(async (messageId: number) => {
    dispatch(setLoading(true))
    try {
      const response = await getPetitionMessageAPI({ message_id: messageId })
      if (response.status === 200) {
        showFile(extractUrl(response.data.document_url))
      }
    } catch (error) {
      if (error instanceof Error) message.error(error.message)
      else console.error(error)
    } finally {
      dispatch(setLoading(false))
    }
  }, [dispatch, showFile, extractUrl])

  const renderStatusTag = useCallback((petitionFlow: PetitionFlow | undefined, record: PetitionTableData, stepName?: string) => {
    let text: 'IN_PROGRESS' | 'REJECTED' | 'APPROVE' | 'NOT_APPROVE' = 'IN_PROGRESS'
    if (typeof petitionFlow === 'undefined') {
      text = record.petition_flow.some(item => item.is_approved === false) ? 'REJECTED' : 'IN_PROGRESS'
    } else if (petitionFlow?.is_approved) {
      text = 'APPROVE'
    } else {
      text = 'NOT_APPROVE'
    }

    const hasNewMessage = typeof petitionFlow?.is_approved === 'boolean' && !petitionFlow.is_approved && !petitionFlow.petition_hold?.is_end

    const tagBg = hasNewMessage ? '#5A9BC3' : CLIENT_PETITION_STATUS[text]?.color
    const tagText = hasNewMessage ? 'ข้อความใหม่' : CLIENT_PETITION_STATUS[text]?.text

    return (
      <figure>
        <Tag bordered={false} style={{ backgroundColor: tagBg }}>
          <span className={CLIENT_PETITION_STATUS[text]?.text_color}>{stepName ?? petitionFlow?.status.status_name} : {tagText}</span>
        </Tag>
      </figure>
    )
  }, [])

  const renderCardList = useMemo(() => {
    if (loading) return <Skeleton loading={loading} paragraph={{ rows: 4 }} />
    if (!data || data.data.length === 0) return <Empty description="ไม่พบข้อมูล" image={Empty.PRESENTED_IMAGE_SIMPLE} />

    return data.data.map((item) => {
      const title = [item.road_code, item.road_name].filter(Boolean).join(' ')
      // หา step แรกที่ยังไม่ผ่าน; ถ้าผ่านทุก step แล้วชี้ที่ step สุดท้าย
      const flows = item.petition_flow
      let activeIndex = flows.findIndex(f => (f.is_approved as boolean | null) !== true)
      if (activeIndex === -1) activeIndex = Math.min(flows.length, 4)
      const currentFlow: PetitionFlow | undefined = flows[activeIndex]
      const hasNewMessage = typeof currentFlow?.is_approved === 'boolean' && !currentFlow.is_approved && !currentFlow.petition_hold?.is_end
      const isPermitReady = flows.length === 5 && flows[4]?.status_id === 6
      return (
        <Col key={item.petition_id} xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
          <Card
            className='bg-gray-100!'
          >
            <Flex
              align='center'
              gap={3}
              className='mb-3!'
            >
              <Tag color='#878787'>
                คำขอเลขที่ {item.petition_no}
              </Tag>
              {renderStatusTag(currentFlow, item, STEP_NAMES[activeIndex])}
            </Flex>
            <section>
              <Typography.Title
                level={4}
                className='cursor-pointer hover:underline!'
                onClick={() => openDataModal(item.petition_id, item)}
              >
                {title || '-'}
              </Typography.Title>
              <Typography.Text className='block' type="secondary">วันที่เริ่มต้น - วันที่สิ้นสุด: {dayjs(item.start_date).format('DD/MM/YYYY')} - {dayjs(item.end_date).format('DD/MM/YYYY')}</Typography.Text>
              <Typography.Text className='block' type="secondary">วันที่ยื่นคำขอ: {dayjs(item.petition_date).format('DD/MM/YYYY')}</Typography.Text>
            </section>
            <section className='mt-1.5 flex justify-end gap-2'>
              {isPermitReady && (
                <Button
                  type='primary'
                  variant='solid'
                  color='green'
                  onClick={() => fetchStatusMessage(flows[4].message_id)}
                >
                  ดูใบอนุญาต
                </Button>
              )}
              {(currentFlow && typeof currentFlow.is_approved === 'boolean' && !currentFlow.is_approved) && (
                <Badge count={hasNewMessage ? 1 : 0} >
                  <Button
                    danger
                    type='primary'
                    onClick={() => openMessageModal(currentFlow.message_id)}
                  >
                    ดูข้อความ
                  </Button>
                </Badge>
              )}
            </section>
          </Card>
        </Col>
      )
    })
  }, [data, loading, renderStatusTag, fetchStatusMessage, openMessageModal, openDataModal])

  return (
    <>
      <Row gutter={[30, 30]}>
        {renderCardList}
      </Row>
      {!loading && data && data.data.length > 0 && (
        <Flex justify="end" className="mt-4!">
          <Pagination
            showSizeChanger
            current={data.page}
            pageSize={data.limit}
            total={Number(data.total) || 0}
            showTotal={(total, range) => {
              const totalPage = (range[1] + 1) - range[0]
              return `ทั้งหมด ${totalPage || total} รายการ`
            }}
            locale={{ items_per_page: '/ หน้า' }}
            onChange={(page, pageSize) => handleTableChange(page, pageSize)}
          />
        </Flex>
      )}
    </>
  )
}

export default React.memo<Props>(CardListPetition)
