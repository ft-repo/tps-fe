/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
/* eslint-disable react-refresh/only-export-components */
import React, { useMemo } from 'react'
import { Data, VehicleListData } from '@/@types/reducer/vehicle';
import { Button, Card, Col, Empty, Flex, Pagination, Row, Skeleton, Tag, Typography } from 'antd';
import { FaPenToSquare as EditIcon, FaTrash as DeleteIcon } from "react-icons/fa6";

interface Props {
  data: Data;
  loading: boolean;
  handleTableChange: (page: number, pageSize: number) => void;
  confirmDelete: (id: string | number, data: VehicleListData) => void;
  openDataModal: (id: string | number) => void;
}

const TYPE_COLOR: Record<string, string> = {
  "รถกึ่งพ่วง": "#3aaebd",
  "รถลากจูง": "#3a89bd",
  "เครื่องจักร / สินค้า": "#3a59bd"
}

const CardListVehicle: React.FC<Props> = (props) => {
  const { data, loading, handleTableChange, confirmDelete, openDataModal } = props

  const renderCardList = useMemo(() => {
    if (loading) return <Skeleton loading={loading} paragraph={{ rows: 4 }} />
    if (!data || data.data.length === 0) return <Empty description="ไม่พบข้อมูล" image={Empty.PRESENTED_IMAGE_SIMPLE} />

    return data.data.map((item) => {
      const license = [item.plate_no, item.plate_province].filter(Boolean).join(' ')
      return (
        <Col key={item.id} xs={24} sm={24} md={24} lg={6} xl={24} xxl={24}>
          <Card
            className='bg-gray-100!'
          >
            <section>
              <Flex
                align='center'
                justify='space-between'
                gap={3}
              >
                <Tag color={TYPE_COLOR[item.vehicle_type_name] || '#878787'}>
                  {item.vehicle_type_name}
                </Tag>
                <Flex
                  align='center'
                  gap={3}
                >
                  <Button
                    type='primary'
                    icon={<EditIcon />}
                    onClick={() => openDataModal(item.id)}
                  />
                  <Button
                    danger
                    type='primary'
                    icon={<DeleteIcon />}
                    onClick={() => confirmDelete(item.id, item)}
                  />
                </Flex>
              </Flex>
            </section>
            <section className='mt-3'>
              <Typography.Title
                level={4}
                className='cursor-pointer hover:underline!'
                onClick={() => openDataModal(item.id)}
              >
                {item.vehicle_type_name === 'เครื่องจักร / สินค้า' ? item.plate_no : license || '-'}
              </Typography.Title>
              {item.vehicle_type_name !== 'เครื่องจักร / สินค้า' && (
                <Typography.Text className='block' type="secondary">ยี่ห้อ: {item.brand || '-'}</Typography.Text>
              )}
              <Typography.Text className='block' type="secondary">น้ำหนัก: {item.weight || '-'} กิโลกรัม</Typography.Text>
            </section>
          </Card>
        </Col>
      )
    })
  }, [data, loading, openDataModal, confirmDelete])

  return (
    <>
      <Row gutter={[16, 16]}>
        {renderCardList}
      </Row>
      {!loading && data && data.data.length > 0 && (
        <Flex justify="end" className="mt-4!">
          <Pagination
            showSizeChanger
            current={data.page}
            pageSize={data.limit}
            total={Number(data.total) || 0}
            showTotal={(total) => `ทั้งหมด ${total} รายการ`}
            locale={{ items_per_page: '/ หน้า' }}
            onChange={(page, pageSize) => handleTableChange(page, pageSize)}
          />
        </Flex>
      )}
    </>
  )
}

export default React.memo<Props>(CardListVehicle)
