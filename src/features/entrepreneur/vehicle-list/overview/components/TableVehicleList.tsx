/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
/* eslint-disable react-refresh/only-export-components */
import React, { useCallback, useMemo } from 'react'
import { FaPenToSquare as EditIcon, FaTrash as DeleteIcon } from "react-icons/fa6";
import { Button } from '@/components/ui';
import { ColumnDef, DataTable } from '@/components/shared';
import { TableData } from '@/@types/entrepreneur/vehicle-list';
import { Data } from '@/@types/reducer/vehicle';

interface Props {
  data: Data;
  loading: boolean;
  setOpen: ({ open, data, id }: { open: boolean, data: TableData, id: string | number }) => void;
  onChangeTable: (page: number | string | null, pageSize: number | string | null) => void;
  openModalWithData: (id: number) => void;
}

const TableVehicleList: React.FC<Props> = (props) => {
  const { data, loading, onChangeTable, openModalWithData, setOpen } = props

  const columns: ColumnDef<TableData>[] = useMemo(() => {
    return [
      {
        header: 'เลขที่',
        accessorKey: 'id',
      },
      {
        header: 'ประเภท',
        accessorKey: 'vehicle_type_name',
      },
      {
        header: 'ยี่ห้อ',
        accessorKey: 'brand',
      },
      {
        header: 'เลขทะเบียน / เลขตัวรถ',
        accessorKey: 'plate_no',
      },
      {
        header: 'จังหวัด',
        accessorKey: 'plate_province',
      },
      {
        header: 'น้ำหนัก (กิโลกรัม)',
        accessorKey: 'weight',
      },
      {
        header: 'จัดการ',
        accessorKey: 'action',
        cell: ({ row }) => {
          return (
            <div className='flex items-center gap-2'>
              <Button
                size='xs'
                variant='solid'
                icon={<EditIcon />}
                // onClick={() => setOpen({ open: true })}
                onClick={() => openModalWithData(row.original.id)}
              />
              <Button
                size='xs'
                variant='solid'
                icon={<DeleteIcon />}
                color='red-600'
                onClick={() => setOpen({
                  open: true,
                  id: row.original.id,
                  data: { ...row.original }
                })}
              />
            </div>
          )
        }
      },
    ]
  }, [openModalWithData, setOpen])

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

  const handlePaginationChange = useCallback((pageIndex: number) => {
    onChangeTable(pageIndex, null)
  }, [onChangeTable])

  const handleSelectChange = useCallback((pageSize: number) => {
    onChangeTable(null, pageSize)
  }, [onChangeTable])

  return (
    <DataTable
      data={data.data}
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
