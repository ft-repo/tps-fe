/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import { Flex, Table, TableProps, Tag } from 'antd'
import { EstimateTurnRadiusDetailData, TurnRadiusTableData } from '@/@types/reducer/petition';

interface Props {
  data: EstimateTurnRadiusDetailData;
  handleTableChange: (page: number, pageSize: number) => void;
  loading: boolean;
}

const TableTurnRadius: React.FC<Props> = (props) => {
  const { data, handleTableChange, loading } = props

  const columns: TableProps<TurnRadiusTableData>['columns'] = [
    {
      title: 'Curve Length',
      dataIndex: 'curvature_angle',
      key: 'curvature_angle',
      width: 150,
      align: 'center'
    },
    {
      title: 'Radius',
      dataIndex: 'curvature_radius',
      key: 'curvature_radius',
      width: 150,
      align: 'center'
    },
    {
      title: 'Curve Type',
      dataIndex: 'curve_type',
      key: 'curve_type',
      width: 150,
      align: 'center'
    },
    {
      title: 'สถานะ',
      dataIndex: 'is_pass',
      key: 'is_pass',
      width: 150,
      align: 'center',
      render: (item) => {
        if (item) {
          return <p className='text-green-500'>ผ่านได้</p>
        }

        return <p className='text-red-500'>ผ่านไม่ได้</p>
      }
    },
  ]

  return (
    <div className='mt-5'>
      <Flex
        wrap
        align='center'
        gap={3}
      >
        <h5>รัศมีวงเลี้ยว</h5>
        <Tag color="#52c41a">ผ่านได้ ({data.data.filter(item => item.is_pass === true).length || 0})</Tag>
        <Tag color="#f5222d">ไม่ผ่านไม่ได้ ({data.data.filter(item => item.is_pass === false).length || 0})</Tag>
      </Flex>
      <Table
        columns={columns}
        dataSource={data.data || []}
        loading={loading}
        pagination={{
          defaultCurrent: 1,
          defaultPageSize: 10,
          current: data.page,
          pageSize: data.limit,
          total: Number(data.total) || 0,
          onChange: (page: number, pageSize: number) => handleTableChange(page, pageSize),
          showSizeChanger: false,
          position: ['bottomRight'],
          showTotal: (total, range) => {
            const totalPage = (range[1] + 1) - range[0]
            return `ทั้งหมด ${totalPage || total} รายการ`
          },
          locale: { items_per_page: "/ หน้า" }
        }}
        scroll={{ x: 1000 }}
      />
    </div>
  )
}

export default React.memo<Props>(TableTurnRadius)
