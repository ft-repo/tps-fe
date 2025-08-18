/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import { Table, TableProps } from 'antd'

interface Props {
  handleTableChange: (page: number, pageSize: number) => void;
}

interface TableData {
  type: string;
  total: string;
  pass: string;
  not_pass: string;
}

const TableRoute: React.FC<Props> = (props) => {
  const { handleTableChange } = props

  const columns: TableProps<TableData>['columns'] = [
    {
      title: 'ประเภท',
      dataIndex: 'type',
      key: 'type',
      width: 150,
      align: 'center'
    },
    {
      title: 'รวมทั้งหมด',
      dataIndex: 'total',
      key: 'total',
      width: 150,
      align: 'center'
    },
    {
      title: 'ผ่านได้',
      dataIndex: 'pass',
      key: 'pass',
      width: 150,
      align: 'center'
    },
    {
      title: 'ผ่านไม่ได้',
      dataIndex: 'not_pass',
      key: 'not_pass',
      width: 150,
      align: 'center'
    },
  ];

  const data: any[] = []

  return (
    <Table
      columns={columns}
      dataSource={data || []}
      loading={false}
      pagination={{
        defaultCurrent: 1,
        defaultPageSize: 10,
        current: 1,
        pageSize: 10,
        total: Number(10) || 0,
        onChange: (page: number, pageSize: number) => handleTableChange(page, pageSize),
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
  )
}

export default React.memo<Props>(TableRoute)
