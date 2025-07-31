/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-empty-pattern */
/* eslint-disable import/no-unresolved */
/* eslint-disable react-refresh/only-export-components */
import React, { useMemo } from 'react'
import dayjs from 'dayjs'
import { Tag } from '@/components/ui'
import { Table } from '@/components/custom/table'
import { APPROVAL_STATUS } from '@/utils/constant';
import { ColumnDef } from '@tanstack/react-table';

interface TableData {
  business_name: string;
  petition_date: string;
  committee_conside: string;
  wait_signed: string;
  petition_approved: string;
}

interface Props {

}

const TableOther: React.FC<Props> = (props) => {
  const { } = props

  const columns = useMemo<ColumnDef<any>[]>(() => [
    {
      header: 'ชื่อบริษัท / ห้าง / ร้าน',
      accessorKey: 'business_name'
    },
    {
      header: 'วันที่ขออนุญาต',
      accessorKey: 'petition_date'
    },
    {
      header: 'คณะกรรมการพิจารณา',
      accessorKey: 'committee_conside',
      cell: () => {
        return (
          <Tag className={APPROVAL_STATUS['APPROVED'].className}>
            {APPROVAL_STATUS['APPROVED'].text}
          </Tag>
        )
      }
    },
    {
      header: 'รอลงนาม',
      accessorKey: 'wait_signed',
      cell: () => {
        return (
          <Tag className={APPROVAL_STATUS['IN_PROGRESS'].className}>
            {APPROVAL_STATUS['IN_PROGRESS'].text}
          </Tag>
        )
      }
    },
    {
      header: 'ออกใบอนุญาต',
      accessorKey: 'petition_approved',
      cell: () => {
        return (
          <Tag className={APPROVAL_STATUS['WAIT_APPROVAL'].className}>
            {APPROVAL_STATUS['WAIT_APPROVAL'].text}
          </Tag>
        )
      }
    },
  ], [])

  const data = useMemo<TableData[]>(() => [
    {
      business_name: 'ห้างหุ้นส่วนจำกัด ยูนิเวอร์แทรนซ์ (ประเทศไทย) จำกัด',
      petition_date: dayjs().format('DD MMM YYYY'),
      committee_conside: 'IN_PROGRESS',
      wait_signed: 'IN_PROGRESS',
      petition_approved: 'IN_PROGRESS',
    },
  ], [])

  return (
    <div>
      <Table
        data={data}
        columns={columns}
      />
    </div>
  )
}

export default React.memo<Props>(TableOther)
