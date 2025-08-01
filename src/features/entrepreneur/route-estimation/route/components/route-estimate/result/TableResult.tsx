/* eslint-disable react-refresh/only-export-components */
/* eslint-disable import/no-unresolved */
import React, { useMemo } from 'react'
import { FieldArray } from '@/@types/entrepreneur/route-estimation'
// import Table from '@/components/ui/Table'
import { Table } from '@/components/custom/table';
import { Segment } from '@/components/ui';
import { ColumnDef } from '@tanstack/react-table';

// const { Tr, Th, Td, THead, TBody } = Table

interface Props {
  data: FieldArray;
}

interface TableData {
  type: string;
  total: number;
  permitted: number;
  not_permitted: number;
}


const TableResult: React.FC<Props> = (props) => {
  const { data } = props

  console.log(data)

  const columns = useMemo<ColumnDef<TableData>[]>(() => [
    {
      header: 'ประเภท',
      accessorKey: 'type'
    },
    {
      header: 'รวมทั้งหมด',
      accessorKey: 'total'
    },
    {
      header: 'ผ่านได้',
      accessorKey: 'permitted'
    },
    {
      header: 'ผ่านไม่ได้',
      accessorKey: 'not_permitted'
    },
  ], [])

  const tableData = useMemo<TableData[]>(() => [
    {
      type: 'สะพานทั้งหมด',
      total: 14,
      permitted: 9,
      not_permitted: 4
    },
    {
      type: 'โครงสร้างทั้งหมด',
      total: 14,
      permitted: 9,
      not_permitted: 4
    },
    {
      type: 'รัศมีเลี้ยวทั้งหมด',
      total: 14,
      permitted: 9,
      not_permitted: 4
    },
    {
      type: 'จุดซ่อม / ภัยพิบัติ',
      total: 14,
      permitted: 9,
      not_permitted: 4
    },
  ], [])

  return (
    <div>
      <section className='flex items-center justify-between flex-wrap'>
        <div>
          <h3>ทางหลวงชนบทหมายเลข อย.2008 - ทางหลวงชนบทหมายเลข ชพ.2016</h3>
          <p>แยกทางหลวงหมายเลข 08 (กม.ที่ 20+500) - แยกทางหลวงหมายเลข 16 (กม.ที่ 20+100)</p>
        </div>
        <Segment>
          <Segment.Item value="summary">ตารางสรุป</Segment.Item>
          <Segment.Item value="bridge">สะพาน</Segment.Item>
          <Segment.Item value="structure">โครงสร้าง</Segment.Item>
          <Segment.Item value="turn_angle">รัศมีเลี้ยว</Segment.Item>
        </Segment>
      </section>
      <section className='mt-5'>
        <Table
          showPagination
          data={tableData}
          columns={columns}
          totalData={tableData.length || 0}
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
      </section>
    </div >
  )
}

export default React.memo<Props>(TableResult)
