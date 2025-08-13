/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import { FaPenToSquare as EditIcon, FaTrash as DeleteIcon } from "react-icons/fa6";
import { Button } from '@/components/ui';
import { TableData } from '@/@types/entrepreneur/vehicle-list';
import { Data } from '@/@types/reducer/vehicle';
import { Table, TableProps } from 'antd';

interface Props {
  data: Data;
  loading: boolean;
  handleTableChange: (page: number, pageSize: number) => void;
  confirmDelete: (id: string | number, data: TableData) => void;
}

const TableVehicleList: React.FC<Props> = (props) => {
  const { data, loading, handleTableChange, confirmDelete } = props

  const columns: TableProps<TableData>['columns'] = [
    {
      title: 'เลขที่',
      dataIndex: 'id',
      key: 'id',
      width: 100,
      align: 'center'
    },
    {
      title: 'ประเภท',
      dataIndex: 'vehicle_type_name',
      key: 'vehicle_type_name',
      width: 300,
      align: 'center'
    },
    {

      title: 'ยี่ห้อ',
      dataIndex: 'brand',
      key: 'brand',
      width: 300,
      align: 'center'
    },
    {
      title: 'เลขทะเบียน / เลขตัวรถ',
      dataIndex: 'plate_no',
      key: 'plate_no',
      width: 300,
      align: 'center'
    },
    {
      title: 'จังหวัด',
      dataIndex: 'plate_province',
      key: 'plate_province',
      width: 300,
      align: 'center'
    },
    {
      title: 'น้ำหนัก (กิโลกรัม)',
      dataIndex: 'weight',
      key: 'weight',
      width: 300,
      align: 'center'
    },
    {
      title: '',
      dataIndex: 'action',
      key: 'action',
      width: 150,
      align: 'center',
      render: (item, record) => {
        return (
          <div className='flex items-center gap-2'>
            <Button
              size='xs'
              variant='solid'
              icon={<EditIcon />}
            />
            <Button
              size='xs'
              variant='solid'
              icon={<DeleteIcon />}
              color='red-600'
              onClick={() => confirmDelete(record.id, record)}
            />
          </div>
        )
      }
    },
  ]

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

export default React.memo<Props>(TableVehicleList)
