/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import { Table, TableProps } from 'antd'
import { SummaryTableData } from '@/@types/reducer/petition';

interface Props {
  loading: boolean;
}

const TableSummary: React.FC<Props> = (props) => {
  const { loading } = props

  const columns: TableProps<SummaryTableData>['columns'] = [
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

  return (
    <div>
      <h5>รายการประเมินเส้นทาง</h5>
      <Table
        columns={columns}
        dataSource={[]}
        loading={loading}
        pagination={false}
        // pagination={{
        //   defaultCurrent: 1,
        //   defaultPageSize: 10,
        //   current: 1,
        //   pageSize: 10,
        //   total: 10,
        //   // onChange: (page: number, pageSize: number) => handleTableChange(page, pageSize),
        //   showSizeChanger: true,
        //   position: ['bottomRight'],
        //   showTotal: (total, range) => {
        //     const totalPage = (range[1] + 1) - range[0]
        //     return `ทั้งหมด ${totalPage || total} รายการ`
        //   },
        //   locale: { items_per_page: "/ หน้า" }
        // }}
        scroll={{ x: 1000 }}
      />
    </div>
  )
}

export default React.memo<Props>(TableSummary)
