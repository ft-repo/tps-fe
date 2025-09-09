/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import { FaTrash as DeleteIcon, FaEye as EyeIcon } from "react-icons/fa6";
import { useNavigate } from "react-router";
import { Table, TableProps } from 'antd';
import { Button } from '@/components/ui';
import dayjs from 'dayjs';
import { ClientList, ClientListsResponse } from '@/@types/services/user';
import { useAppSelector } from '@/store';

interface Props {
  data: ClientListsResponse;
  loading: boolean;
  handleTableChange: (page: number, pageSize: number) => void;
  confirmDelete: (id: string | number, data: ClientList) => void;
}

const TableEntrepreneur: React.FC<Props> = (props) => {
  const { data, loading, handleTableChange, confirmDelete } = props
  const navigate = useNavigate();
  const { details } = useAppSelector(state => state.auth.user)

  const columns: TableProps<ClientList>['columns'] = [
    {
      title: 'ชื่อผู้ประกอบการ',
      dataIndex: 'business_name',
      key: 'business_name',
      width: 300,
      align: 'center',
      render: (item, record) => {
        if (record.business_details?.business_name) {
          return record.business_details?.business_name
        }
        return '-'
      }
    },
    {
      title: 'ประเภทนิติบุคคล',
      dataIndex: 'entity_type_name',
      key: 'entity_type_name',
      width: 200,
      align: 'center',
      render: (item, record) => {
        if (record.business_details?.entity_type?.name) {
          return record.business_details?.entity_type?.name
        }
        return '-'
      }
    },
    {
      title: 'เลขทะเบียนนิติบุคคล',
      dataIndex: 'registration_no',
      key: 'registration_no',
      width: 200,
      align: 'center',
      render: (item) => {
        if (item) {
          return item
        }
        return '-'
      }
    },
    {
      title: 'วันที่ได้รับอนุญาต',
      dataIndex: 'created_at',
      key: 'created_at',
      width: 200,
      align: 'center',
      render: (item) => {
        if (item) {
          return dayjs(item).locale('th').format('DD/MM/YYYY')
        }
        return '-'
      }
    },
    {
      title: 'จัดการ',
      dataIndex: 'action',
      key: 'action',
      fixed: 'right',
      width: 100,
      align: 'center',
      render: (item, record) => {
        return (
          <div className='flex items-center justify-center gap-2'>
            <Button
              size='xs'
              variant='solid'
              icon={<EyeIcon />}
              color='blue-600'
              onClick={() => navigate(`/user-info/entrepreneur/view/${record.id}`)}
            />
            {details?.role?.name === "ผู้ดูแลระบบ" ?
              <Button
                size='xs'
                variant='solid'
                icon={<DeleteIcon />}
                color='red-600'
                onClick={() => confirmDelete(record.id, record)}
              />
              : null}
          </div>
        )
      }
    },
  ]

  return (
    <Table
      rowKey={'id'}
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

export default React.memo<Props>(TableEntrepreneur)
