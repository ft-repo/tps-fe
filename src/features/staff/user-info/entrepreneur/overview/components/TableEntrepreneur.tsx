/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import { FaTrash as DeleteIcon } from "react-icons/fa6";
import { useNavigate } from "react-router";
import { ClientList, ClientListsResponse } from '@/@types/staff/user-info';
import { Table, TableProps } from 'antd';
import { Button } from '@/components/ui';
import dayjs from 'dayjs';

interface Props {
  userLists?: ClientListsResponse;
  handleTableChange: (page: number, pageSize: number) => void;
  confirmDelete: (id: string | number, data: ClientList) => void;
  loading: boolean;
}

const TableEntrepreneur: React.FC<Props> = (props) => {
  const { userLists, confirmDelete, handleTableChange, loading } = props
  const navigate = useNavigate();

  const columns: TableProps<ClientList>['columns'] = [
    {
      title: 'ชื่อผู้ประกอบการ',
      dataIndex: 'business_name',
      key: 'business_name',
      width: 300,
      align: 'center',
      render: (item, record) => {
        return (
          <div className='flex items-center justify-center gap-2'>
            <span>{record.business_details?.business_name}</span>
          </div>
        )
      }
    },
    {
      title: 'ประเภทนิติบุคคล',
      dataIndex: 'entity_type_name',
      key: 'entity_type_name',
      width: 200,
      align: 'center',
      render: (item, record) => {
        return (
          <div className='flex items-center justify-center gap-2'>
            <span>{record.business_details?.entity_type?.name}</span>
          </div>
        )
      }
    },
    {
      title: 'เลขทะเบียนนิติบุคคล',
      dataIndex: 'registration_no',
      key: 'registration_no',
      width: 200,
      align: 'center'
    },
    {
      title: 'วันที่ได้รับอนุญาต',
      dataIndex: 'created_at',
      key: 'created_at',
      width: 200,
      align: 'center',
      render: (item, record) => {
        return (
          <div className='flex items-center justify-center gap-2'>
            <span>{dayjs(record.created_at).locale('th').format('DD MMM YYYY')}</span>
          </div>
        )
      }
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
          <div className='flex items-center justify-center gap-2'>
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
      dataSource={userLists?.data || []}
      loading={loading}
      onRow={(record) => ({
        onClick: () => navigate(`/user-info/entrepreneur/view/${record.id}`),
      })}
      pagination={{
        defaultCurrent: 1,
        defaultPageSize: 10,
        current: userLists?.page,
        pageSize: userLists?.limit,
        total: Number(userLists?.total) || 0,
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

export default React.memo<Props>(TableEntrepreneur)
