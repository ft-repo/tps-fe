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
import ConfirmModal from './ConfirmPermitModal'
import { useNavigate } from 'react-router-dom';
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
  const [modalOpen, setModalOpen] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState<TableData | null>(null);
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
      accessorKey: 'validate_document',
      cell: ({ getValue }) => renderStatusBadge(getValue() as string)

    },
    {
      header: 'ตรวจเส้นทาง',
      accessorKey: 'validate_route',
      cell: ({ getValue }) => renderStatusBadge(getValue() as string)

    },
    {
      header: 'ตรวจยานพาหนะ',
      accessorKey: 'validate_vehicle',
      cell: ({ getValue }) => renderStatusBadge(getValue() as string)

    },
    {
      header: 'รอลงนาม',
      accessorKey: 'wait_signed',
      cell: ({ getValue, row }) => {
        const status = (getValue() as string).trim();
        const isDisabled = status.includes("ยุติ");
        const navigate = useNavigate();

        return (
          <span
            onClick={() => {
              if (!isDisabled) {
                setSelectedRow(row.original);
                navigate('/request-list/approval/permit');
              }
            }}
            className={`w-32 h-[48px] flex flex-col items-center justify-center text-sm font-medium rounded text-center px-2 leading-tight cursor-pointer ${isDisabled ? 'bg-gray-500 text-white cursor-not-allowed' : 'bg-yellow-400 text-black'
              }`}
          >
            {status}
          </span>
        );
      }
    },
    {
      header: 'ออกใบอนุญาต',
      accessorKey: 'permit',
      cell: ({ getValue, row }) => {
        const status = (getValue() as string).trim();
        const isDisabled = status.includes("ยุติ");

        return (
          <span
            onClick={() => {
              if (!isDisabled) {
                setSelectedRow(row.original);
                setModalOpen(true);
              }
            }}
            className={`w-32 h-[48px] flex flex-col items-center justify-center text-sm font-medium rounded text-center px-2 leading-tight cursor-pointer ${isDisabled ? 'bg-gray-500 text-white cursor-not-allowed' : 'bg-yellow-400 text-black'
              }`}
          >
            {status}
          </span>
        );
      }
    },
  ], [])

  const renderStatusBadge = (status: string) => {
    if (!status) return null;

    const cleanStatus = status.trim();
    const parts = cleanStatus.split(' ');
    const main = parts.slice(0, -3).join(' ') || cleanStatus;
    const maybeDate = parts.slice(-3).join(' ');
    const isDate = maybeDate.match(/\d{1,2}\s(ม\.ค\.|ก\.พ\.|มี\.ค\.|เม\.ย\.|พ\.ค\.|มิ\.ย\.|ก\.ค\.|ส\.ค\.|ก\.ย\.|ต\.ค\.|พ\.ย\.|ธ\.ค\.)\s\d{2,4}/);

    const baseClass =
      'w-32 h-[48px] flex flex-col items-center justify-center text-sm font-medium rounded text-center px-2 leading-tight';
    let colorClass = 'bg-slate-200 text-black';

    if (cleanStatus.includes('ไม่ผ่าน')) {
      colorClass = 'bg-red-500 text-white';
    } else if (cleanStatus.includes('ผ่านการตรวจ')) {
      colorClass = 'bg-green-500 text-white';
    } else if (cleanStatus.includes('รอดำเนินการ') || cleanStatus.includes('กำลังดำเนินการ')) {
      colorClass = 'bg-yellow-400 text-black';
    } else if (cleanStatus.includes('ยุติ')) {
      colorClass = 'bg-gray-500 text-white';
    }

    return (
      <span className={`${baseClass} ${colorClass}`}>
        {isDate ? (
          <>
            <div>{main}</div>
            <div>{maybeDate}</div>
          </>
        ) : (
          <div>{cleanStatus}</div>
        )}
      </span>
    );
  };

  const data = useMemo<TableData[]>(() => [
    {
      no: '007',
      road_code: 'ชม. 3005',
      road_name: 'ถนนอบจ.ชม.3005 (บ้านหนองบัวคำ - บ้านโป่ง)',
      start_date: dayjs().format('DD MMM YYYY'),
      end_date: dayjs().format('DD MMM YYYY'),
      permit_date: dayjs().format('DD MMM YYYY'),
      validate_document: 'รอดำเนินการ',
      validate_route: 'รอดำเนินการ',
      validate_vehicle: 'รอดำเนินการ',
      wait_signed: 'รอดำเนินการ',
      permit: 'รอดำเนินการ'
    },
    {
      no: '001',
      road_code: 'ชม. 3001',
      road_name: 'ถนนสาย A',
      start_date: '20 Jul 2025',
      end_date: '25 Jul 2025',
      permit_date: '18 Jul 2025',
      validate_document: 'รอดำเนินการ',
      validate_route: 'ผ่านการตรวจ 22 ก.พ. 64',
      validate_vehicle: 'ผ่านการตรวจ 22 ก.พ. 64',
      wait_signed: 'รอดำเนินการ',
      permit: 'รอดำเนินการ',
    },
    {
      no: '002',
      road_code: 'ชม. 3002',
      road_name: 'ถนนสาย B',
      start_date: '21 Jul 2025',
      end_date: '26 Jul 2025',
      permit_date: '19 Jul 2025',
      validate_document: 'ผ่านการตรวจ 18 ก.พ. 64',
      validate_route: 'ยุติคำขออนุญาต',
      validate_vehicle: 'ผ่านการตรวจ 22 ก.พ. 64',
      wait_signed: 'ยุติคำขออนุญาต',
      permit: 'ยุติคำขออนุญาต',
    },
    {
      no: '003',
      road_code: 'ชม. 3003',
      road_name: 'ถนนสาย C',
      start_date: '22 Jul 2025',
      end_date: '27 Jul 2025',
      permit_date: '20 Jul 2025',
      validate_document: 'ผ่านการตรวจ 18 ก.พ. 64',
      validate_route: 'ผ่านการตรวจ 18 ก.พ. 64',
      validate_vehicle: 'ไม่ผ่านการตรวจ 18 ก.พ. 64',
      wait_signed: 'รอดำเนินการ',
      permit: 'รอดำเนินการ',
    },
  ], [])

  return (
    <div>
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
      <ConfirmModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={() => {
          if (selectedRow) {
            console.log("อนุมัติใบอนุญาตสำหรับ", selectedRow.no);
          }
          setModalOpen(false);
        }}
        data={selectedRow}
      />
    </div>
  )
}

export default React.memo<Props>(TableCategoryAdmin)
