/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-empty-pattern */
/* eslint-disable import/no-unresolved */
/* eslint-disable react-refresh/only-export-components */
import { ColumnDef } from '@tanstack/react-table'
import React, { useMemo } from 'react'
import dayjs from 'dayjs'
import { Table } from '@/components/custom/table'
import { Tag } from '@/components/ui';
import { APPROVAL_STATUS } from '@/utils/constant';
import { TableCategoryData } from '@/@types/staff/user-info';

interface Props {

}

const TableCategory: React.FC<Props> = (props) => {
  const { } = props

  const columns = useMemo<ColumnDef<any>[]>(() => [
    {
      header: 'ชื่อบริษัท / ห้าง / ร้าน',
      accessorKey: 'business_name'
    },
    {
      header: 'รหัสสายทาง',
      accessorKey: 'road_code'
    },
    {
      header: 'ชื่อสายทาง',
      accessorKey: 'road_name'
    },
    {
      header: 'วันที่เริ่มต้น',
      accessorKey: 'start_date'
    },
    {
      header: 'วันที่สิ้นสุด',
      accessorKey: 'end_date'
    },
    {
      header: 'วันที่ขออนุญาต',
      accessorKey: 'permit_date',
    },
    {
      header: 'ตรวจเอกสาร',
      accessorKey: 'validate_document',
      cell: () => {
        return (
          <Tag className={APPROVAL_STATUS['APPROVED'].className}>
            {APPROVAL_STATUS['APPROVED'].text}
          </Tag>
        )
      }
    },
    {
      header: 'ตรวจเส้นทาง',
      accessorKey: 'validate_route',
      cell: () => {
        return (
          <Tag className={APPROVAL_STATUS['APPROVED'].className}>
            {APPROVAL_STATUS['APPROVED'].text}
          </Tag>
        )
      }
    },
    {
      header: 'ตรวจยานพาหนะ',
      accessorKey: 'validate_vehicle',
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
      accessorKey: 'permit',
      cell: () => {
        return (
          <Tag className={APPROVAL_STATUS['WAIT_APPROVAL'].className}>
            {APPROVAL_STATUS['WAIT_APPROVAL'].text}
          </Tag>
        )
      }
    },
  ], [])

  const data = useMemo<TableCategoryData[]>(() => [
    {
      business_name: 'บริษัท บีคอน โกลบอล เทรด จำกัด',
      road_code: 'ชม. 3005',
      road_name: 'ถนนอบจ.ชม.3005 (บ้านหนองบัวคำ - บ้านโป่ง)',
      start_date: dayjs().format('DD MMM YYYY'),
      end_date: dayjs().format('DD MMM YYYY'),
      permit_date: dayjs().format('DD MMM YYYY'),
      validate_document: 'กำลังดำเนินการ',
      validate_route: 'กำลังดำเนินการ',
      validate_vehicle: 'กำลังดำเนินการ',
      wait_signed: 'กำลังดำเนินการ',
      permit: 'กำลังดำเนินการ'
    },
  ], [])

  return (
    <div>
      <Table
        showPagination
        data={data}
        columns={columns}
        totalData={data.length || 0}
        pageSizeOption={[
          {
            label: '10 / หน้า',
            value: 10,
          },
          {
            label: '20 / หน้า',
            value: 20,
          },
          {
            label: '30 / หน้า',
            value: 30,
          },
          {
            label: '40 / หน้า',
            value: 40,
          },
          {
            label: '50 / หน้า',
            value: 50,
          },
        ]}
      />
    </div>
  )
}

export default React.memo<Props>(TableCategory)
