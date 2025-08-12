/* eslint-disable import/no-unresolved */
/* eslint-disable react-refresh/only-export-components */
import React, { useEffect, useMemo, useState, useCallback } from 'react'
import { Table } from '@/components/custom/table'
import dayjs from 'dayjs'
import { APPROVAL_STATUS } from '@/utils/constant'
import { Tag } from '@/components/ui'
import { ColumnDef } from '@tanstack/react-table'
import PetitionExtendedService, {
  PetitionExtendedItem,
  PetitionExtendedListResponse,
} from '@/services/entrepreneur/PermitListExtendService'

type ApprovalKey = keyof typeof APPROVAL_STATUS

interface TableData {
  business_name: string
  petition_date: string
  validate_document: ApprovalKey
  committee_conside: ApprovalKey
  wait_signed: ApprovalKey
  petition_approved: ApprovalKey
}

interface Props { }

const TableOther: React.FC<Props> = () => {
  const [rows, setRows] = useState<TableData[]>([])
  const [total, setTotal] = useState<number>(0)
  const [error, setError] = useState<string | null>(null)

  const fmt = (d?: string | null) => (d ? dayjs(d).format('DD MMM YYYY') : '-')

  // reuse logic from previous table: latest by status_id, approved => APPROVED, else IN_PROGRESS
  const computeStepStatus = (flow: PetitionExtendedItem['petition_extended_flow'], targetStatusId: number): ApprovalKey => {
    const items = (flow || []).filter(f => f.status_id === targetStatusId)
    if (items.length === 0) return 'WAIT_APPROVAL'
    const latest = [...items].sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )[0]
    return latest.is_approved ? 'APPROVED' : 'IN_PROGRESS'
  }

  const mapToRow = (it: PetitionExtendedItem): TableData => {
    const business = it.user_created?.business_details?.business_name ?? '-'
    // ใช้ created_at เป็น "วันที่ขออนุญาต" (ถ้าต้องการ cert_date แทน เปลี่ยนเป็น it.cert_date)
    const petitionDate = fmt(it.created_at)

    return {
      business_name: business,
      petition_date: petitionDate,
      // mapping ตามสถานะในระบบ:
      // 1 ตรวจเอกสาร, 4 คณะกรรมการพิจารณา, 5 รอลงนาม
      validate_document: computeStepStatus(it.petition_extended_flow, 1),
      committee_conside: computeStepStatus(it.petition_extended_flow, 4),
      wait_signed: computeStepStatus(it.petition_extended_flow, 5),

      // ออกใบอนุญาต: ถือว่าอนุมัติเมื่อผ่าน "รอลงนาม" แล้ว (status_id 5 approved)
      petition_approved:
        computeStepStatus(it.petition_extended_flow, 5) === 'APPROVED'
          ? 'APPROVED'
          : 'WAIT_APPROVAL',
    }
  }

  const fetchList = useCallback(async () => {
    try {
      setError(null)
      const { data: res } = await PetitionExtendedService.getPetitionExtendedList({ page: 1, limit: 10, search: '' })
      const mapped = res.data.map(mapToRow)
      setRows(mapped)
      setTotal(res.total)
    } catch (e: any) {
      setError(e?.message ?? 'โหลดข้อมูลไม่สำเร็จ')
    }
  }, [])

  useEffect(() => {
    fetchList()
  }, [fetchList])

  const columns = useMemo<ColumnDef<TableData>[]>(() => [
    { header: 'ชื่อบริษัท / ห้าง / ร้าน', accessorKey: 'business_name' },
    { header: 'วันที่ขออนุญาต', accessorKey: 'petition_date' },
    {
      header: 'ตรวจเอกสาร',
      accessorKey: 'validate_document',
      cell: ({ getValue }) => {
        const key = getValue<ApprovalKey>()
        return <Tag className={APPROVAL_STATUS[key].className}>{APPROVAL_STATUS[key].text}</Tag>
      },
    },
    {
      header: 'คณะกรรมการพิจารณา',
      accessorKey: 'committee_conside',
      cell: ({ getValue }) => {
        const key = getValue<ApprovalKey>()
        return <Tag className={APPROVAL_STATUS[key].className}>{APPROVAL_STATUS[key].text}</Tag>
      },
    },
    {
      header: 'รอลงนาม',
      accessorKey: 'wait_signed',
      cell: ({ getValue }) => {
        const key = getValue<ApprovalKey>()
        return <Tag className={APPROVAL_STATUS[key].className}>{APPROVAL_STATUS[key].text}</Tag>
      },
    },
    {
      header: 'ออกใบอนุญาต',
      accessorKey: 'petition_approved',
      cell: ({ getValue }) => {
        const key = getValue<ApprovalKey>()
        return <Tag className={APPROVAL_STATUS[key].className}>{APPROVAL_STATUS[key].text}</Tag>
      },
    },
  ], [])

  return (
    <div>
      {error && <div className="text-red-600 mb-2">{error}</div>}

      <Table
        showPagination
        data={rows}
        columns={columns}
        totalData={total}
        pageSizeOption={[
          { label: '10 / หน้า', value: 10 },
          { label: '20 / หน้า', value: 20 },
          { label: '30 / หน้า', value: 30 },
          { label: '40 / หน้า', value: 40 },
          { label: '50 / หน้า', value: 50 },
        ]}
      />
    </div>
  )
}

export default React.memo<Props>(TableOther)
