/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
/* eslint-disable react-refresh/only-export-components */
import React, { useMemo } from 'react'
import { FaPenToSquare as EditIcon, FaTrash as DeleteIcon } from "react-icons/fa6";
import { Button } from '@/components/ui';
import { ColumnDef, DataTable } from '@/components/shared';
import { Data, TableData } from '@/@types/entrepreneur/vehicle-list';

interface Props {
  data: Data | any;
  loading: boolean;
  setOpen: (open: any) => void;
}

const TableVehicleList: React.FC<Props> = (props) => {
  const { data, loading, setOpen } = props

  const columns: ColumnDef<TableData>[] = useMemo(() => {
    return [
      {
        header: 'เลขที่',
        accessorKey: 'no',
      },
      {
        header: 'ประเภท',
        accessorKey: 'vehicle_type',
      },
      {
        header: 'ยี่ห้อ',
        accessorKey: 'brand',
      },
      {
        header: 'เลขทะเบียน / เลขตัวรถ',
        accessorKey: 'license_plate',
      },
      {
        header: 'จังหวัด',
        accessorKey: 'province',
      },
      {
        header: 'น้ำหนัก (กิโลกรัม)',
        accessorKey: 'weight',
      },
      {
        header: 'จัดการ',
        accessorKey: 'action',
        cell: () => {
          return (
            <div className='flex items-center gap-2'>
              <Button
                size='xs'
                variant='solid'
                icon={<EditIcon />}
                onClick={() => setOpen({ open: true })}
              />
              <Button
                size='xs'
                variant='solid'
                icon={<DeleteIcon />}
                color='red-600'
              />
            </div>
          )
        }
      },
    ]
  }, [setOpen])

  // const mockData: TableData[] = [
  //   {
  //     no: '0016',
  //     vehicle_type: 'รถลากจูง',
  //     brand: 'ISUZU',
  //     license_plate: '56 - 2256',
  //     province: 'กรุงเทพมหานคร',
  //     weight: '800'
  //   },
  //   {
  //     no: '0016',
  //     vehicle_type: 'รถลากจูง',
  //     brand: 'ISUZU',
  //     license_plate: '56 - 2256',
  //     province: 'กรุงเทพมหานคร',
  //     weight: '800'
  //   },
  // ]

  const handlePaginationChange = (pageIndex: number) => {
    console.log(pageIndex)
  }

  const handleSelectChange = (pageSize: number) => {
    console.log(pageSize)
  }

  return (
    <DataTable
      data={data}
      columns={columns}
      loading={loading}
      pagingData={{
        total: data.total,
        pageIndex: data.page,
        pageSize: data.limit,
      }}
      onPaginationChange={handlePaginationChange}
      onSelectChange={handleSelectChange}
    />
  )
}

export default React.memo<Props>(TableVehicleList)
