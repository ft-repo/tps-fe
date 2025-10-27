/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import { FaPenToSquare as EditIcon, FaTrash as DeleteIcon } from "react-icons/fa6";
import { Button } from '@/components/ui';
import { TableData } from '@/@types/entrepreneur/vehicle-list';
import { Data } from '@/@types/reducer/vehicle';
import { Table, type TableProps } from 'antd';

interface Props {
  data: Data;
  loading: boolean;
  handleTableChange: (page: number, pageSize: number) => void;
  confirmDelete: (id: string | number, data: TableData) => void;
  openDataModal: (id: string | number) => void;
}

const TableVehicleList: React.FC<Props> = (props) => {
  const { data, loading, handleTableChange, confirmDelete, openDataModal } = props

  const columns: TableProps<TableData>['columns'] = [
    {
      title: 'เลขที่',
      dataIndex: 'id',
      key: 'id',
      width: 100,
      align: 'center',
      render: (item, record, index) => {
        if (data.data.length - 1 === index) {
          return <strong>{index + 1}</strong>
        }
        return index + 1
      }
    },
    {
      title: 'ประเภท',
      dataIndex: 'vehicle_type_name',
      key: 'vehicle_type_name',
      width: 300,
      align: 'center',
      render: (item, record, index) => {
        if (item) {
          if (data.data.length - 1 === index) {
            return <strong>{item}</strong>
          }
          return item
        }
        return '-'
      }
    },
    {

      title: 'ยี่ห้อ',
      dataIndex: 'brand',
      key: 'brand',
      width: 300,
      align: 'center',
      render: (item, record, index) => {
        if (item) {
          if (data.data.length - 1 === index) {
            return <strong>{item}</strong>
          }
          return item
        }
        return '-'
      }
    },
    {
      title: 'เลขทะเบียน / เลขตัวรถ',
      dataIndex: 'plate_no',
      key: 'plate_no',
      width: 300,
      align: 'center',
      render: (item, record, index) => {
        if (item) {
          if (data.data.length - 1 === index) {
            return <strong>{item}</strong>
          }
          return item
        }
        return '-'
      }
    },
    {
      title: 'จังหวัด',
      dataIndex: 'plate_province',
      key: 'plate_province',
      width: 300,
      align: 'center',
      render: (item, record, index) => {
        if (item) {
          if (data.data.length - 1 === index) {
            return <strong>{item}</strong>
          }
          return item
        }
        return '-'
      }
    },
    {
      title: 'น้ำหนัก (กิโลกรัม)',
      dataIndex: 'weight',
      key: 'weight',
      width: 300,
      align: 'center',
      render: (item, record, index) => {
        if (item) {
          if (data.data.length - 1 === index) {
            return <strong>{item}</strong>
          }
          return item
        }
        return '-'
      }
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
              onClick={() => openDataModal(record.id)}
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
      dataSource={[...data.data].sort((a, b) => Number(a.id) - Number(b.id))}
      loading={loading}
      rowKey={(record) => String(record.id ?? `${record.plate_no}-${record.plate_province}`)} // ✅ ใส่คีย์ให้แถว
      pagination={{
        defaultCurrent: 1,
        defaultPageSize: 10,
        current: data.page,
        pageSize: data.limit,
        total: Number(data.total) || 0,
        onChange: (page: number, pageSize: number) => handleTableChange(page, pageSize),
        showSizeChanger: true,
        position: ['bottomRight'],
        showTotal: (total) => `ทั้งหมด ${total} รายการ`, // (อันเก่าคิดจำนวนหน้าในเพจ ไม่ใช่ total ทั้งหมด)
        locale: { items_per_page: '/ หน้า' },
      }}
      scroll={{ x: 1000 }}
    />
  );
}

export default React.memo<Props>(TableVehicleList)
