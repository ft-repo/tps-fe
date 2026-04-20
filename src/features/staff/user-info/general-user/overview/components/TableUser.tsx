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

const TableUser: React.FC<Props> = (props) => {
  const { data, loading, handleTableChange, confirmDelete } = props
  const navigate = useNavigate();
  const { details } = useAppSelector(state => state.auth.user)

  const columns: TableProps<ClientList>['columns'] = [
    {
      title: 'ชื่อ - นามสกุล',
      dataIndex: 'business_details',
      key: 'business_details',
      width: 300,
      align: 'center',
      render: (item, record, index) => {
        if (item.business_name) {
          if (data.data.length - 1 === index) {
            return <strong>{item.business_name}</strong>
          }
          return item.business_name
        }
        return '-'
      }
    },
    {
      title: 'เลขบัตรประชาชน',
      dataIndex: 'registration_no',
      key: 'registration_no',
      width: 200,
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
      title: 'เบอร์โทรศัพท์',
      dataIndex: 'business_address',
      key: 'business_address',
      width: 200,
      align: 'center',
      render: (item, record, index) => {
        if (item.phone_number) {
          if (data.data.length - 1 === index) {
            return <strong>{item.phone_number}</strong>
          }
          return item.phone_number
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
      render: (item, record, index) => {
        if (item) {
          if (data.data.length - 1 === index) {
            return <strong>{dayjs(item).locale('th').format('DD/MM/YYYY')}</strong>
          }
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
              onClick={() => navigate(`/user-info/general-user/view/${record.id}`)}
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

export default React.memo<Props>(TableUser)
