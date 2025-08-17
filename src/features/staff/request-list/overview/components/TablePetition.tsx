/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import { Table, TableProps } from 'antd'
import { AdminPetitionData, AdminPetitionTableData } from '@/@types/reducer/petition';

interface Props {
  data: AdminPetitionData;
  loading: boolean;
  handleTableChange: (page: number, limit: number) => void;
}

const TablePetition: React.FC<Props> = (props) => {
  const { data, loading, handleTableChange } = props

  const columns: TableProps<AdminPetitionTableData>['columns'] = [
    {
      title: 'เลขที่ชื่อบริษัท / ห้าง / ร้าน',
      dataIndex: 'business_name',
      key: 'business_name',
      width: 500,
      align: 'center'
    },
    {
      title: 'รหัสสายทาง',
      dataIndex: 'road_code',
      key: 'road_code',
      width: 150,
      align: 'center'
    },
    {
      title: 'ชื่อสายทาง',
      dataIndex: 'road_name',
      key: 'road_name',
      width: 200,
      align: 'center'
    },
    {
      title: 'วันที่เริ่มต้น',
      dataIndex: 'start_date',
      key: 'start_date',
      width: 150,
      align: 'center'
    },
    {
      title: 'วันที่สิ้นสุด',
      dataIndex: 'end_date',
      key: 'end_date',
      width: 150,
      align: 'center'
    },
    {
      title: 'วันที่ขออนุญาต',
      dataIndex: 'petition_date',
      key: 'petition_date',
      width: 150,
      align: 'center'
    },
    {
      title: 'ตรวจเอกสาร',
      key: 'validate_document',
      width: 150,
      align: 'center',
    },
    {
      title: 'ตรวจเส้นทาง',
      key: 'validate_route',
      width: 150,
      align: 'center',
    },
    {
      title: 'ตรวจยานพาหนะ',
      key: 'validate_vehicle',
      width: 150,
      align: 'center',
    },
    {
      title: 'รอลงนาม',
      key: 'wait_signed',
      width: 150,
      align: 'center',
    },
    {
      title: 'ออกใบอนุญาต',
      key: 'permit',
      width: 150,
      align: 'center',
    },
  ];

  return (
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

export default React.memo<Props>(TablePetition)
