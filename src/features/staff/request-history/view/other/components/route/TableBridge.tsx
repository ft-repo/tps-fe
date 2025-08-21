/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import { Table, TableProps } from 'antd'
import { BridgeTableData } from '@/@types/reducer/petition';

interface Props {
  loading: boolean;
}

const TableBridge: React.FC<Props> = (props) => {
  const { loading } = props

  const columns: TableProps<BridgeTableData>['columns'] = [
    {
      title: 'รหัสสะพาน',
      dataIndex: 'name_th',
      key: 'name_th',
      width: 150,
      align: 'center'
    },
    {
      title: 'ชื่อสะพาน',
      dataIndex: 'name_th',
      key: 'name_th',
      width: 150,
      align: 'center'
    },
    {
      title: 'ความยาว (เมตร)',
      dataIndex: 'length',
      key: 'length',
      width: 150,
      align: 'center'
    },
    {
      title: 'สภาพ',
      dataIndex: 'bridge_status',
      key: 'bridge_status',
      width: 150,
      align: 'center',
      render: () => {
        return <p>สภาพปกติ</p>
      }
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
      <h5>สะพาน</h5>
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

export default React.memo<Props>(TableBridge)
