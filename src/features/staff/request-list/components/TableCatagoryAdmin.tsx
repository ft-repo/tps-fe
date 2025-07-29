/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-empty-pattern */
/* eslint-disable import/no-unresolved */
/* eslint-disable react-refresh/only-export-components */
import { ColumnDef } from '@tanstack/react-table'
import React, { useMemo } from 'react'
// import Table from '@/components/ui/Table'
import dayjs from 'dayjs'
// import { Tag } from '@/components/ui'
// import { useNavigate } from 'react-router-dom'
import { Table } from '@/components/custom/table'

// const { Tr, Th, Td, THead, TBody } = Table

interface Props {

}

interface TableData {
  no: string;
  road_code: string;
  road_name: string;
  start_date: string;
  end_date: string;
  permit_date: string;
  validate_document: any;
  validate_route: any;
  validate_vehicle: any;
  wait_signed: any;
  permit: any;
}

const TableCategoryAdmin: React.FC<Props> = (props) => {
  const { } = props
  // const navigation = useNavigate()

  const columns = useMemo<ColumnDef<any>[]>(() => [
    {
      header: 'เลขที่',
      accessorKey: 'no'
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
      accessorKey: 'permit_date'
    },
    {
      header: 'ตรวจเอกสาร',
      accessorKey: 'validate_document'
    },
    {
      header: 'ตรวจเส้นทาง',
      accessorKey: 'validate_route'
    },
    {
      header: 'ตรวจยานพาหนะ',
      accessorKey: 'validate_vehicle'
    },
    {
      header: 'รอลงนาม',
      accessorKey: 'wait_signed'
    },
    {
      header: 'ออกใบอนุญาต',
      accessorKey: 'permit',

    },
  ], [])

  const data = useMemo<TableData[]>(() => [
    {
      no: '007',
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
      {/* <Table>
        <THead>
          <Tr>
            <Th>เลขที่</Th>
            <Th>รหัสสายทาง</Th>
            <Th>ชื่อสายทาง</Th>
            <Th>วันที่เริ่มต้น</Th>
            <Th>วันที่สิ้นสุด</Th>
            <Th>วันที่ขออนุญาต</Th>
            <Th>ตรวจเอกสาร</Th>
            <Th>ตรวจเส้นทาง</Th>
            <Th>ตรวจยานพาหนะ</Th>
            <Th>รอลงนาม</Th>
            <Th>ออกใบอนุญาต</Th>
          </Tr>
        </THead>
        <TBody>
          <Tr className='cursor-pointer' onClick={() => navigation('/permit-list/view')}>
            <Td>007</Td>
            <Td>ชม. 3005</Td>
            <Td>ถนนอบจ.ชม.3005 (บ้านหนองบัวคำ - บ้านโป่ง)</Td>
            <Td>{dayjs().format('DD MMM YYYY')}</Td>
            <Td>{dayjs().format('DD MMM YYYY')}</Td>
            <Td>{dayjs().format('DD MMM YYYY')}</Td>
            <Td>
              <Tag className="bg-yellow-500 text-black border-0 rounded">
                กำลังดำเนินการ
              </Tag>
            </Td>
            <Td>
              <Tag className="bg-yellow-500 text-black border-0 rounded">
                กำลังดำเนินการ
              </Tag>
            </Td>
            <Td>
              <Tag className="bg-yellow-500 text-black border-0 rounded">
                กำลังดำเนินการ
              </Tag>
            </Td>
            <Td>
              <Tag className="bg-yellow-500 text-black border-0 rounded">
                กำลังดำเนินการ
              </Tag>
            </Td>
            <Td>
              <Tag className="bg-red-500 text-white border-0 rounded">
                รอดตรวจสอบ
              </Tag>
            </Td>
          </Tr>
          <Tr>
            <Td>007</Td>
            <Td>ชม. 3005</Td>
            <Td>ถนนอบจ.ชม.3005 (บ้านหนองบัวคำ - บ้านโป่ง)</Td>
            <Td>{dayjs().format('DD MMM YYYY')}</Td>
            <Td>{dayjs().format('DD MMM YYYY')}</Td>
            <Td>{dayjs().format('DD MMM YYYY')}</Td>
            <Td>
              <Tag className="bg-yellow-500 text-black border-0 rounded">
                กำลังดำเนินการ
              </Tag>
            </Td>
            <Td>
              <Tag className="bg-yellow-500 text-black border-0 rounded">
                กำลังดำเนินการ
              </Tag>
            </Td>
            <Td>
              <Tag className="bg-yellow-500 text-black border-0 rounded">
                กำลังดำเนินการ
              </Tag>
            </Td>
            <Td>
              <Tag className="bg-yellow-500 text-black border-0 rounded">
                กำลังดำเนินการ
              </Tag>
            </Td>
            <Td>
              <Tag className="bg-red-500 text-white border-0 rounded">
                รอดตรวจสอบ
              </Tag>
            </Td>
          </Tr>
          <Tr>
            <Td>007</Td>
            <Td>ชม. 3005</Td>
            <Td>ถนนอบจ.ชม.3005 (บ้านหนองบัวคำ - บ้านโป่ง)</Td>
            <Td>{dayjs().format('DD MMM YYYY')}</Td>
            <Td>{dayjs().format('DD MMM YYYY')}</Td>
            <Td>{dayjs().format('DD MMM YYYY')}</Td>
            <Td>
              <Tag className="bg-yellow-500 text-black border-0 rounded">
                กำลังดำเนินการ
              </Tag>
            </Td>
            <Td>
              <Tag className="bg-yellow-500 text-black border-0 rounded">
                กำลังดำเนินการ
              </Tag>
            </Td>
            <Td>
              <Tag className="bg-yellow-500 text-black border-0 rounded">
                กำลังดำเนินการ
              </Tag>
            </Td>
            <Td>
              <Tag className="bg-yellow-500 text-black border-0 rounded">
                กำลังดำเนินการ
              </Tag>
            </Td>
            <Td>
              <Tag className="bg-red-500 text-white border-0 rounded">
                รอดตรวจสอบ
              </Tag>
            </Td>
          </Tr>
        </TBody>
      </Table> */}
      <Table
        data={data}
        columns={columns}
        totalData={data.length}
        pageSizeOption={[
          { value: 10, label: '10 / page' },
          { value: 20, label: '20 / page' },
          { value: 30, label: '30 / page' },
          { value: 40, label: '40 / page' },
          { value: 50, label: '50 / page' },
        ]}
      />
    </div>
  )
}

export default React.memo<Props>(TableCategoryAdmin)
