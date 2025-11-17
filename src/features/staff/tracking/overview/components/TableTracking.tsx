/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import { useNavigate } from "react-router";
import { Button, Table, TableProps } from 'antd';
import { TrackingData, TrackingOverviewData } from '@/store/slices/staff/trackingSlice';
// import { useAppSelector } from '@/store';
// import { TrackingData } from '@/store/slices/staff/trackingSlice';

interface Props {
  data: TrackingOverviewData;
  loading: boolean;
  handleTableChange: (page: number, pageSize: number) => void;
}

// interface DataType {
//   business_name: string;
//   entity_type_name: string;
//   contact_name: string;
//   permit_vehicle: number;
// }

const TableEntrepreneur: React.FC<Props> = (props) => {
  const { data, loading, handleTableChange } = props
  const navigate = useNavigate();
  // const { data } = useAppSelector(state => state.tracking.overview)

  // const data: DataType[] = [
  //   {
  //     business_name: 'บริษัท บีคอน โกลบอล เทรด จำกัด',
  //     entity_type_name: 'ห้างหุ้นส่วนสามัญนิติบุคคล',
  //     contact_name: 'ชญานิษฐ์ พงศ์เกษมชัย',
  //     permit_vehicle: 5
  //   },
  //   {
  //     business_name: 'บริษัท อินฟราสตริค โซลูชัน จำกัด',
  //     entity_type_name: 'บริษัทจำกัด',
  //     contact_name: 'วรพล จันทร์ทอง',
  //     permit_vehicle: 12
  //   },
  //   {
  //     business_name: 'ห้างหุ้นส่วนจำกัด แอคทิฟ เอ็นจิเนียริ่ง',
  //     entity_type_name: 'ห้างหุ้นส่วนสามัญนิติบุคคล',
  //     contact_name: 'สุนิสา เหลืองสุวรรณ',
  //     permit_vehicle: 1
  //   },
  // ]

  const columns: TableProps<TrackingData>['columns'] = [
    {
      title: 'ชื่อบริษัท / ห้าง / ร้าน',
      dataIndex: 'business_name',
      key: 'business_name',
      width: 200,
      align: 'center',
      render: (item) => {
        if (item) {
          return item
        }
        return '-'
      }
    },
    {
      title: 'ประเภทนิติบุคคล',
      dataIndex: 'entity_type',
      key: 'entity_type',
      width: 200,
      align: 'center',
      render: (item) => {
        if (item) {
          return item
        }
        return '-'
      }
    },
    {
      title: 'ผู้ติดต่อ / ผู้มอบอำนาจ',
      dataIndex: 'contact_name',
      key: 'contact_name',
      width: 200,
      align: 'center',
      render: (item) => {
        if (item) {
          return item
        }
        return '-'
      }
    },
    {
      title: 'จำนวนรถที่ได้รับใบอนุญาต',
      dataIndex: 'petition_count',
      key: 'petition_count',
      width: 200,
      align: 'center',
      render: (item) => {
        if (item) {
          return item
        }
        return '-'
      }
    },
    {
      title: 'เส้นทางการเดินรถ',
      dataIndex: 'action',
      key: 'action',
      fixed: 'right',
      width: 200,
      align: 'center',
      render: (item, record) => {
        return (
          <Button
            type="primary"
            onClick={() => navigate(`/tracking/view?id=${record.business_id}`)}
          >
            เพิ่มเติม
          </Button>
        )
      }
    },
  ]

  return (
    <Table
      rowKey={'id'}
      columns={columns}
      dataSource={data.data}
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

export default React.memo<Props>(TableEntrepreneur)
