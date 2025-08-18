/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import { Table, type TableProps } from 'antd';
import { PetitionData, PetitionExtendedTableData } from '@/@types/reducer/petition';
import { Tag } from '@/components/ui';
import { APPROVAL_STATUS } from '@/utils/constant';
import dayjs from 'dayjs';

interface Props {
  data: PetitionData;
  loading: boolean;
  handleTableChange: (page: number, limit: number) => void;
}

const latestFlowByStatus = (
  flow: PetitionExtendedTableData['petition_extended_flow'] | undefined,
  statusId: number
) => {
  const items = (flow ?? []).filter(f => f.status_id === statusId)
  if (items.length === 0) return null
  // ใช้ id มากที่สุด = ล่าสุด
  return items.reduce((acc, cur) => (cur.id > acc.id ? cur : acc))
}

type ApprovalKey = keyof typeof APPROVAL_STATUS

// แปลงรายการล่าสุดเป็น key ของป้าย
const toApprovalKey = (flowItem: ReturnType<typeof latestFlowByStatus>): ApprovalKey => {
  if (!flowItem) return 'WAIT_APPROVAL'
  return flowItem.is_approved ? 'APPROVED' : 'IN_PROGRESS'
}


const TableOther: React.FC<Props> = ({ data, loading, handleTableChange }) => {

  const columns: TableProps<PetitionExtendedTableData>['columns'] = [
    {
      title: 'ชื่อบริษัท / ห้าง / ร้าน',
      dataIndex: 'user_created',
      key: 'user_created.business_details.business_name',
      width: 180,
      align: 'center',
      render: (_value, record) => (
        <p>{record.user_created?.business_details?.business_name ?? '-'}</p>
      )
    },
    {
      title: 'วันที่ขออนุญาต',
      dataIndex: 'created_at',
      key: 'created_at',
      width: 160,
      align: 'center',
      render: (_value, record) => (
        <p>{record.created_at ? dayjs(record.created_at).format('DD-MM-YYYY') : '-'}</p>
      )
    },

    // ---------- PETITION EXTENDED FLOW ----------
    {
      title: 'ตรวจเอกสาร',
      key: 'validate_document',
      width: 150,
      align: 'center',
      render: (_val, record) => {
        const latest = latestFlowByStatus(record.petition_extended_flow, 1)
        const key: ApprovalKey = toApprovalKey(latest)
        return <Tag className={APPROVAL_STATUS[key].className}>{APPROVAL_STATUS[key].text}</Tag>
      }
    },
    {
      title: 'ตรวจเส้นทาง',
      key: 'validate_route',
      width: 150,
      align: 'center',
      render: (_val, record) => {
        const latest = latestFlowByStatus(record.petition_extended_flow, 2)
        const key: ApprovalKey = toApprovalKey(latest)
        return <Tag className={APPROVAL_STATUS[key].className}>{APPROVAL_STATUS[key].text}</Tag>
      }
    },
    {
      title: 'ตรวจยานพาหนะ',
      key: 'validate_vehicle',
      width: 150,
      align: 'center',
      render: (_val, record) => {
        const latest = latestFlowByStatus(record.petition_extended_flow, 3)
        const key: ApprovalKey = toApprovalKey(latest)
        return <Tag className={APPROVAL_STATUS[key].className}>{APPROVAL_STATUS[key].text}</Tag>
      }
    },
    {
      title: 'คณะกรรมการพิจารณา',
      key: 'committee_conside',
      width: 170,
      align: 'center',
      render: (_val, record) => {
        const latest = latestFlowByStatus(record.petition_extended_flow, 4)
        const key: ApprovalKey = toApprovalKey(latest)
        return <Tag className={APPROVAL_STATUS[key].className}>{APPROVAL_STATUS[key].text}</Tag>
      }
    },

    // ถ้าต้องการ “ออกใบอนุญาต”: ไม่มี status_id=6 ใน extended_flow
    // ให้ถือว่า "อนุมัติ" เมื่อขั้น 4 ผ่านแล้ว หรือมี cert_date
    {
      title: 'ออกใบอนุญาต',
      key: 'permit',
      width: 150,
      align: 'center',
      render: (_val, record) => {
        const latest4 = latestFlowByStatus(record.petition_extended_flow, 4)
        const approvedByCommittee = toApprovalKey(latest4) === 'APPROVED'
        const key: ApprovalKey = (approvedByCommittee || !!record.cert_date)
          ? 'APPROVED'
          : 'WAIT_APPROVAL'
        return <Tag className={APPROVAL_STATUS[key].className}>{APPROVAL_STATUS[key].text}</Tag>
      }
    },
  ]

  return (
    <Table
      columns={columns}
      rowKey="id"
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
      scroll={{ x: 1100 }}
    />
  )
}

export default React.memo<Props>(TableOther)
