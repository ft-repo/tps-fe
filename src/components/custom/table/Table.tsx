/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React, { useCallback, useMemo } from 'react'
import Table from '@/components/ui/Table'
import Pagination from '@/components/ui/Pagination'
import Select from '@/components/ui/Select'
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  ColumnDef,
} from '@tanstack/react-table'
// import type { ColumnDef } from '@tanstack/react-table'

const { Tr, Th, Td, THead, TBody } = Table

type Option = {
  value: number
  label: string
}

interface Props {
  data: any[];
  columns: ColumnDef<any, any>[];
  totalData: number;
  pageSizeOption?: Option[];
  // DISPLAY
  showPagination?: boolean;
}

const CustomTable: React.FC<Props> = (props) => {
  const { data, columns, totalData, pageSizeOption, showPagination = true } = props

  const table = useReactTable({
    data,
    columns,
    // Pipeline
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  // FUNCTION
  const onPaginationChange = useCallback((page: number) => {
    table.setPageIndex(page - 1)
  }, [table])

  const onSelectChange = useCallback((value = 0) => {
    table.setPageSize(Number(value))
  }, [table])

  const renderPagination = useMemo(() => {
    if (!showPagination) return

    return (
      <div className="flex items-center justify-between mt-4">
        <Pagination
          pageSize={table.getState().pagination.pageSize}
          currentPage={table.getState().pagination.pageIndex + 1}
          total={totalData}
          onChange={onPaginationChange}
        />
        <div style={{ minWidth: 130 }}>
          <Select<Option>
            size="sm"
            isSearchable={false}
            value={pageSizeOption?.filter((option) => option.value === table.getState().pagination.pageSize
            )}
            options={pageSizeOption}
            onChange={(option) => onSelectChange(option?.value)}
          />
        </div>
      </div>
    )
  }, [
    onPaginationChange,
    onSelectChange,
    pageSizeOption,
    showPagination,
    table,
    totalData
  ])

  return (
    <div>
      <Table>
        <THead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <Th
                    key={header.id}
                    colSpan={header.colSpan}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </Th>
                )
              })}
            </Tr>
          ))}
        </THead>
        <TBody>
          {table.getRowModel().rows.map((row) => {
            return (
              <Tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <Td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Td>
                  )
                })}
              </Tr>
            )
          })}
        </TBody>
      </Table>
      {renderPagination}
    </div>
  )
}

export default React.memo<Props>(CustomTable)
