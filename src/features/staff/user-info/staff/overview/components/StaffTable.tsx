/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import {
  FaPenToSquare as EditIcon,
  FaTrash as DeleteIcon,
} from 'react-icons/fa6'
import { Button } from '@/components/ui'
import { Table, TableProps } from 'antd'
import { StaffList, StaffListsResponse } from '@/@types/services/user';

interface Props {
  data: StaffListsResponse;
  loading: boolean;
  handleTableChange: (page: number, pageSize: number) => void;
  confirmDelete: (id: string | number, data: StaffList) => void;
  setOpen: ({ open, data, id }: { id: string, open: boolean, data: StaffList }) => void;
}

const SeachTable: React.FC<Props> = (props) => {
  const { data, loading, handleTableChange, confirmDelete, setOpen } = props

  const columns: TableProps<StaffList>['columns'] = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      width: 150,
      align: 'center',
    },
    {
      title: 'ชื่อ - นามสกุล',
      dataIndex: 'name',
      key: 'name',
      width: 200,
      align: 'center',
      render: (item, record) => {
        return (
          <div className="flex items-center justify-center gap-2">
            <span>{record.title} {record.first_name} {record.last_name}</span>
          </div>
        )
      },
    },
    {
      title: 'หน่วยงาน',
      dataIndex: 'department',
      key: 'department',
      width: 150,
      align: 'center',
      render: (item, record) => {
        return (
          <div className="flex items-center justify-center gap-2">
            <span>{record.department?.dept_name}</span>
          </div>
        )
      },
    },
    {
      title: 'สิทธิ์การเข้าใช้งาน',
      dataIndex: 'role',
      key: 'role',
      width: 150,
      align: 'center',
      render: (item, record) => {
        return (
          <div className="flex items-center justify-center gap-2">
            <span>{record.role?.name}</span>
          </div>
        )
      },
    },
    {
      title: 'จัดการ',
      dataIndex: 'action',
      key: 'action',
      fixed: 'right',
      width: 70,
      align: 'center',
      render: (item, record) => {
        return (
          <div className="flex items-center justify-center gap-2">
            <Button
              size="xs"
              variant="solid"
              icon={<EditIcon />}
              color="yellow-600"
              onClick={() => setOpen({ id: record.id, open: true, data: record })}
            />
            <Button
              size="xs"
              variant="solid"
              icon={<DeleteIcon />}
              color="red-600"
              onClick={() => confirmDelete(record.id, record)}
            />
          </div>
        )
      },
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

export default React.memo<Props>(SeachTable)
