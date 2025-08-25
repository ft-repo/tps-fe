/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import { Flex, Table, TableProps, Tag } from 'antd'
import { EstimateSummaryData, SummaryTableData } from '@/@types/reducer/petition';

interface Props {
  data: EstimateSummaryData;
  handleTableChange: (page: number, pageSize: number) => void;
  loading: boolean;
}

const TableSummary: React.FC<Props> = (props) => {
  const { data, loading } = props

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
      <Flex
        wrap
        align='center'
        gap={3}
      >
        <h5>รายการประเมินเส้นทาง</h5>
        <Tag color="#52c41a">ผ่านได้ ({data.data.reduce((accumulator, currentValue) => accumulator + currentValue.pass, 0) || 0})</Tag>
        <Tag color="#f5222d">ไม่ผ่านไม่ได้ ({data.data.reduce((accumulator, currentValue) => accumulator + currentValue.not_pass, 0) || 0})</Tag>
      </Flex>
      <Table
        columns={columns}
        dataSource={data.data || []}
        loading={loading}
        pagination={false}
        // pagination={{
        //   defaultCurrent: 1,
        //   defaultPageSize: 10,
        //   current: data.page,
        //   pageSize: data.limit,
        //   total: Number(data.total) || 0,
        //   onChange: (page: number, pageSize: number) => handleTableChange(page, pageSize),
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
