/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import { Table, TableProps } from 'antd'
import { TurnRadiusTableData } from '@/@types/reducer/petition';

interface Props {
  // data: any[];
  // handleTableChange: (page: number, pageSize: number) => void;
  loading: boolean;
}

const TableTurnRadius: React.FC<Props> = (props) => {
  const { loading } = props

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
      <h5>รัศมีวงเลี้ยว</h5>
      <Table
        columns={columns}
        dataSource={[]}
        loading={loading}
        pagination={{
          defaultCurrent: 1,
          defaultPageSize: 10,
          current: 1,
          pageSize: 10,
          total: 10,
          // onChange: (page: number, pageSize: number) => handleTableChange(page, pageSize),
          showSizeChanger: true,
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
