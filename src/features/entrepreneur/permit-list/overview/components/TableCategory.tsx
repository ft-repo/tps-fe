/* eslint-disable import/no-unresolved */
/* eslint-disable react-refresh/only-export-components */
import { ColumnDef } from '@tanstack/react-table'
import React, { useEffect, useMemo, useState, useCallback } from 'react'
import dayjs from 'dayjs'
import { Table } from '@/components/custom/table'
import { Tag } from '@/components/ui'
import { APPROVAL_STATUS } from '@/utils/constant'

import { getPermitList } from '@/services/entrepreneur/PermitListService'
import type {
  Petition,
  PetitionFlowItem,
  PetitionListResponse,
} from '@/@types/entrepreneur/permit-list'

type ApprovalKey = keyof typeof APPROVAL_STATUS

interface TableData {
  no: string
  road_code: string
  road_name: string
  start_date: string
  end_date: string
  permit_date: string
  validate_document: ApprovalKey
  validate_route: ApprovalKey
  validate_vehicle: ApprovalKey
  wait_signed: ApprovalKey
  permit: ApprovalKey
}

interface Props { }

const TableCategory: React.FC<Props> = () => {
  const [rows, setRows] = useState<TableData[]>([])
  const [total, setTotal] = useState<number>(0)
  const [error, setError] = useState<string | null>(null)

  const fmt = (d: string | Date) => dayjs(d).format('DD MMM YYYY')

  const computeStepStatus = (flow: PetitionFlowItem[], targetStatusId: number): ApprovalKey => {
    const items = flow.filter(f => f.status_id === targetStatusId)
    if (items.length === 0) return 'WAIT_APPROVAL'
    const latest = [...items].sort(
      (a, b) => new Date(b.created_date as any).getTime() - new Date(a.created_date as any).getTime()
    )[0]
    return latest.is_approved ? 'APPROVED' : 'IN_PROGRESS'
  }

  const mapToRow = (p: Petition, index: number): TableData => ({
    no: p.petition_no ?? String(index + 1),
    road_code: p.road_code,
    road_name: p.road_name,
    start_date: fmt(p.start_date),
    end_date: fmt(p.end_date),
    permit_date: fmt(p.petition_date),
    validate_document: computeStepStatus(p.petition_flow, 1),
    validate_route: computeStepStatus(p.petition_flow, 2),
    validate_vehicle: computeStepStatus(p.petition_flow, 3),
    wait_signed: computeStepStatus(p.petition_flow, 5),
    permit: computeStepStatus(p.petition_flow, 5) === 'APPROVED' ? 'APPROVED' : 'WAIT_APPROVAL',
  })

  const fetchList = useCallback(async () => {
    try {
      setError(null)
      // ⬇️ unwrap Axios response
      const { data: res } = await getPermitList({ page: 1, limit: 10 })
      // res is PetitionListResponse here
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
    { header: 'เลขที่', accessorKey: 'no' },
    { header: 'รหัสสายทาง', accessorKey: 'road_code' },
    { header: 'ชื่อสายทาง', accessorKey: 'road_name' },
    { header: 'วันที่เริ่มต้น', accessorKey: 'start_date' },
    { header: 'วันที่สิ้นสุด', accessorKey: 'end_date' },
    { header: 'วันที่ขออนุญาต', accessorKey: 'permit_date' },
    {
      header: 'ตรวจเอกสาร',
      accessorKey: 'validate_document',
      cell: ({ getValue }) => {
        const key = getValue<ApprovalKey>()
        return <Tag className={APPROVAL_STATUS[key].className}>{APPROVAL_STATUS[key].text}</Tag>
      },
    },
    {
      header: 'ตรวจเส้นทาง',
      accessorKey: 'validate_route',
      cell: ({ getValue }) => {
        const key = getValue<ApprovalKey>()
        return <Tag className={APPROVAL_STATUS[key].className}>{APPROVAL_STATUS[key].text}</Tag>
      },
    },
    {
      header: 'ตรวจยานพาหนะ',
      accessorKey: 'validate_vehicle',
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
      accessorKey: 'permit',
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

export default React.memo<Props>(TableCategory)
