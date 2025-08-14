/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import { Table, type TableProps } from 'antd';
import { PetitionData, PetitionTableData } from '@/@types/reducer/petition';
import { Tag } from '@/components/ui';
import { APPROVAL_STATUS } from '@/utils/constant';

interface Props {
  data: PetitionData;
  loading: boolean;
  handleTableChange: (page: number, limit: number) => void;
}

const TableOther: React.FC<Props> = (props) => {
  const { data, loading, handleTableChange } = props

  const columns: TableProps<PetitionTableData>['columns'] = [
    {
      title: 'ชื่อบริษัท / ห้าง / ร้าน',
      dataIndex: '',
      key: '',
      width: 150,
      align: 'center'
    },
    {
      title: 'วันที่ขออนุญาต',
      dataIndex: '',
      key: '',
      width: 150,
      align: 'center'
    },
    // PETITION FLOW
    {
      title: 'ตรวจเอกสาร',
      dataIndex: '',
      key: '',
      width: 150,
      align: 'center',
      render: () => {
        return (
          <Tag className={APPROVAL_STATUS['APPROVED'].className}>{APPROVAL_STATUS['APPROVED'].text}</Tag>)
      }
    },
    {
      title: 'คณะกรรมการพิจารณา',
      dataIndex: '',
      key: '',
      width: 150,
      align: 'center',
      render: () => {
        return (
          <Tag className={APPROVAL_STATUS['APPROVED'].className}>{APPROVAL_STATUS['APPROVED'].text}</Tag>)
      }
    },
    {
      title: 'ออกใบอนุญาต',
      dataIndex: '',
      key: '',
      width: 150,
      align: 'center',
      render: () => {
        return (
          <Tag className={APPROVAL_STATUS['APPROVED'].className}>{APPROVAL_STATUS['APPROVED'].text}</Tag>)
      }
    },
    {
      title: 'วันที่ขออนุญาต',
      dataIndex: '',
      key: '',
      width: 150,
      align: 'center',
      render: () => {
        return (
          <Tag className={APPROVAL_STATUS['APPROVED'].className}>{APPROVAL_STATUS['APPROVED'].text}</Tag>)
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

export default React.memo<Props>(TableOther)
