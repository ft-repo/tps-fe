/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import { Table, TableProps } from 'antd'

interface Props {
  handleTableChange: (page: number, pageSize: number) => void;
}

interface TableData {
  company_name: string;
  permit_date: string;
  validate_document: string;
  validate_judge: string;
  wait_signed: string;
  permit: string;
}

const TablePetitionExtended: React.FC<Props> = (props) => {
  const { handleTableChange } = props

  const columns: TableProps<TableData>['columns'] = [
    {
      title: 'ชื่อบริษัท / ห้าง / ร้าน',
      dataIndex: 'company_name',
      key: 'company_name',
      width: 500,
      align: 'center'
    },
    {
      title: 'วันที่ขออนุญาต',
      dataIndex: 'permit_date',
      key: 'permit_date',
      width: 200,
      align: 'center'
    },
    {
      title: 'คณะกรรมการพิจารณา',
      dataIndex: 'validate_judge',
      key: 'validate_judge',
      width: 150,
      align: 'center'
    },
    {
      title: 'รอลงนาม',
      dataIndex: 'wait_signed',
      key: 'wait_signed',
      width: 150,
      align: 'center'
    },
    {
      title: 'ออกใบอนุญาต',
      dataIndex: 'permit',
      key: 'permit',
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

export default React.memo<Props>(TablePetitionExtended)
