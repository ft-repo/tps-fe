/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import { Table, TableProps } from 'antd'

interface Props {
}

interface TableData {
  no: string;
  petition_list: string;
}

const TablePetitionDocument: React.FC<Props> = (props) => {
  const { } = props

  const columns: TableProps<TableData>['columns'] = [
    {
      title: 'ลำดับ',
      dataIndex: 'no',
      key: 'no',
      width: 200,
      align: 'center'
    },
    {
      title: 'รายการ',
      dataIndex: 'petition_list',
      key: 'petition_list',
      width: 500,
      align: 'center'
    },
    {
      title: 'จัดการ',
      dataIndex: 'action',
      key: 'action',
      width: 200,
      align: 'center'
    },
  ];

  const data: TableData[] = [
    {
      no: '1',
      petition_list: 'สำเนาบัตรประชาชน'
    },
    {
      no: '2',
      petition_list: 'สำเนาหนังสือรับรองนิติบุคคล'
    },
    {
      no: '3',
      petition_list: 'แบบคำขออนุยาตให้ยานพาหนะบางชนิด บางประเภท เดินบนทางหลวงชนบท'
    },
    {
      no: '4',
      petition_list: 'หนังสือมอบอำนาจพร้อมตราประทับของผู้มีอำนาจลงนามแทนบริษัทหรือห้างหุ้นส่วน'
    },
  ]

  return (
    <div>
      <h5>เอกสารผู้ประสงค์ขออนุญาต</h5>
      <Table
        columns={columns}
        dataSource={data || []}
        loading={false}
        pagination={{
          defaultCurrent: 1,
          defaultPageSize: 10,
          current: 1,
          pageSize: 10,
          total: Number(10) || 0,
          // onChange: (page: number, pageSize: number) => handleTableChange(page, pageSize),
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
    </div>
  )
}

export default React.memo<Props>(TablePetitionDocument)
