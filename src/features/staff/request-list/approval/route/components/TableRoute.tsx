/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import { Table, TableProps } from 'antd'
import { SummaryTableData, TurnRadiusTableData } from '@/@types/reducer/petition';

// Define the union type for all possible data types
type TableDataType = SummaryTableData | BridgeTableData | TurnRadiusTableData;

// Define the data structure that comes from your store
interface TableDataResponse<T = TableDataType> {
  data: T[];
  page: number;
  limit: number;
  total: number;
}

interface Props {
  keyId: 'summary' | 'bridge' | 'turn_radius';
  data: TableDataResponse; // Replace 'any' with proper type
  handleTableChange: (page: number, pageSize: number) => void;
  loading: boolean;
}
interface BridgeTableData { }

const TableRoute: React.FC<Props> = (props) => {
  const { keyId, data, loading, handleTableChange } = props

  const summary_columns: TableProps<SummaryTableData>['columns'] = [
    {
      title: 'ประเภท',
      dataIndex: 'type',
      key: 'type',
      width: 150,
      align: 'center'
    },
    {
      title: 'รวมทั้งหมด',
      dataIndex: 'total',
      key: 'total',
      width: 150,
      align: 'center'
    },
    {
      title: 'ผ่านได้',
      dataIndex: 'pass',
      key: 'pass',
      width: 150,
      align: 'center'
    },
    {
      title: 'ผ่านไม่ได้',
      dataIndex: 'not_pass',
      key: 'not_pass',
      width: 150,
      align: 'center'
    },
  ];

  const bridge_columns: TableProps<BridgeTableData>['columns'] = []

  const turn_radius_columns: TableProps<TurnRadiusTableData>['columns'] = [
    {
      title: 'มุมโค้ง',
      dataIndex: 'curvature_angle',
      key: 'curvature_angle',
      width: 150,
      align: 'center'
    },
    {
      title: 'รัศมีความโค้ง',
      dataIndex: 'curvature_radius',
      key: 'curvature_radius',
      width: 150,
      align: 'center'
    },
    {
      title: 'ประเภทรัศมีมุมเลี้ยว',
      dataIndex: 'curve_type',
      key: 'curve_type',
      width: 150,
      align: 'center'
    },
    {
      title: 'สถานะ',
      dataIndex: 'is_pass',
      key: 'is_pass',
      width: 150,
      align: 'center',
      render: (item) => {
        if (item) {
          return 'ผ่านได้'
        }

        return 'ผ่านไม่ได้'
      }
    },
  ]

  const column_list: Record<typeof keyId, TableProps<any>['columns']> = {
    summary: summary_columns,
    bridge: bridge_columns,
    turn_radius: turn_radius_columns,
  }

  return (
    <Table
      columns={column_list[keyId]}
      dataSource={data.data || []}
      loading={loading}
      pagination={{
        defaultCurrent: 1,
        defaultPageSize: 10,
        current: data.page,
        pageSize: data.limit,
        total: Number(data.total) || 0,
        onChange: (page: number, pageSize: number) => handleTableChange(page, pageSize),
        showSizeChanger: true,
        position: ['bottomRight'],
        showTotal: (total, range) => {
          const totalPage = (range[1] + 1) - range[0]
          return `ทั้งหมด ${totalPage || total} รายการ`
        },
        locale: { items_per_page: "/ หน้า" }
      }}
      scroll={{ x: 1000 }}
    />
  )
}

export default React.memo<Props>(TableRoute)
