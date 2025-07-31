/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import React, { useMemo, useState } from 'react'
import { Table } from '@/components/custom/table'
import { ColumnDef } from '@tanstack/react-table'
// import { Tag } from '@/components/ui'
import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'
import ConfirmModal from './ConfirmPermitModal'

// const { Tr, Th, Td, THead, TBody } = Table;

interface Props { }

interface TableData {
  company_name: string;
  permit_date: string;
  validate_document: string;
  validate_judge: string;
  wait_signed: string;
  permit: string;
}

const TableOtherAdmin: React.FC<Props> = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = React.useState(false);
  const [selectedRow, setSelectedRow] = useState<TableData | any>(null);

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

  const columns = useMemo<ColumnDef<TableData>[]>(() => [
    {
      header: 'ชื่อบริษัท / ห้าง / ร้าน',
      accessorKey: 'company_name',
    },
    {
      header: 'วันที่ขออนุญาต',
      accessorKey: 'permit_date',
    },
    // {
    //   header: 'ตรวจเอกสาร',
    //   accessorKey: 'validate_document',
    //   cell: ({ getValue }) => renderStatusBadge(getValue() as string),
    // },
    {
      header: 'คณะกรรมการพิจารณา',
      accessorKey: 'validate_judge',
      cell: ({ getValue }) => renderStatusBadge(getValue() as string),
    },
    {
      header: 'รอลงนาม',
      accessorKey: 'wait_signed',
      cell: ({ getValue, row }) => {
        const status = (getValue() as string).trim();
        const isDisabled = status.includes('ยุติ');

        return (
          <span
            className={`w-32 h-[48px] flex flex-col items-center justify-center text-sm font-medium rounded text-center px-2 leading-tight cursor-pointer ${isDisabled
              ? 'bg-gray-500 text-white cursor-not-allowed'
              : 'bg-yellow-400 text-black'
              }`}
            onClick={() => {
              if (!isDisabled) {
                setSelectedRow(row.original);
                navigate('/request-list/approval/permit');
              }
            }}
          >
            {status}
          </span>
        );
      },
    },
    {
      header: 'ออกใบอนุญาต',
      accessorKey: 'permit',
      cell: ({ getValue, row }) => {
        const status = (getValue() as string).trim();
        const isDisabled = status.includes("ยุติ");

        return (
          <span
            className={`w-32 h-[48px] flex flex-col items-center justify-center text-sm font-medium rounded text-center px-2 leading-tight cursor-pointer ${isDisabled ? 'bg-gray-500 text-white cursor-not-allowed' : 'bg-yellow-400 text-black'
              }`}
            onClick={() => {
              if (!isDisabled) {
                setSelectedRow(row.original);
                setModalOpen(true);
              }
            }}
          >
            {status}
          </span>
        );
      }
    },
  ], [navigate]);

  const data = useMemo<TableData[]>(() => [
    {
      company_name: 'บริษัท ดีเอกซ์ โกลบอล เทรด จำกัด',
      permit_date: dayjs().format('DD MMM YYYY'),
      validate_document: 'ผ่านการตรวจ 22 ก.พ. 64',
      validate_judge: 'ผ่านการตรวจ 22 ก.พ. 64',
      wait_signed: 'รอดำเนินการ',
      permit: 'รอดำเนินการ',
    },
    {
      company_name: 'บริษัท อินเมท โซลูชั่นส์ กรุ๊ป',
      permit_date: dayjs().format('DD MMM YYYY'),
      validate_document: 'ผ่านการตรวจ 18 ก.พ. 64',
      validate_judge: 'ไม่ผ่านการตรวจ 18 ก.พ. 64',
      wait_signed: 'ยุติคำขออนุญาต',
      permit: 'ยุติคำขออนุญาต',
    },
  ], []);


  return (
    <div>
      <Table
        data={data}
        columns={columns}
        // totalData={data.length}
        // pageSizeOption={[
        //   { value: 10, label: '10 / page' },
        //   { value: 20, label: '20 / page' },
        //   { value: 30, label: '30 / page' },
        //   { value: 40, label: '40 / page' },
        //   { value: 50, label: '50 / page' },
        // ]}
      />
      <ConfirmModal
        open={modalOpen}
        data={selectedRow}
        onClose={() => setModalOpen(false)}
        onConfirm={() => {
          if (selectedRow) {
            console.log("อนุมัติใบอนุญาตสำหรับ", selectedRow.no);
          }
          setModalOpen(false);
        }}
      />
    </div>
  );
};

export default React.memo(TableOtherAdmin);
