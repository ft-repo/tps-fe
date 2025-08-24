/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React, { useCallback } from 'react'
import { message, Table, TableProps } from 'antd'
import { useAppSelector } from '@/store';
import { getUploadAPI } from '@/services/entrepreneur/VehicleListService';
import { AiOutlineFilePdf } from 'react-icons/ai';

interface Props {
}

interface TableData {
  no: string;
  petition_list: string;
  file_id: string;
}

const TablePermitDocument: React.FC<Props> = (props) => {
  const { } = props
  const { petition_extended } = useAppSelector(state => state.staff.petition)
  const detail = petition_extended.detail

  const showFile = useCallback(async (fileUrl: string) => {
    try {
      const response = await getUploadAPI(fileUrl)
      if (response.status === 200) {
        console.log(response)
      }
    } catch (error) {
      if (error instanceof Error) {
        message.error(error.message)
      } else {
        console.error(error)
      }
    }
  }, [])

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
      align: 'center',
      render: (item, record) => {
        return (
          <AiOutlineFilePdf
            className='w-8 h-8 cursor-pointer inline-flex justify-center items-center'
            onClick={() => showFile(record.file_id)}
          />
        )
      }
    },
  ];

  const data: TableData[] = [
    {
      no: '1',
      petition_list: 'รายการคำนวณแรงที่เกิดขึ้นต่อโครงสร้างสะพานรายสะพานที่อยู่ในเส้นทางขออนุญาต เมื่อบรรทุกน้ำหนัก',
      file_id: detail.audit_document.bridge_structure_calculation_url
    },
    {
      no: '2',
      petition_list: 'รายการคำนวณแรงที่เกิดขึ้นต่อโครงสร้างทางตลอดเส้นทางที่อยู่ในเส้นทางขออนุญาต เมื่อบรรทุกน้ำหนัก',
      file_id: detail.audit_document.road_structure_calculation_url
    },
    {
      no: '3',
      petition_list: 'หนังสือรับรองของวิศวกรโยธาผู้คำนวณโครงสร้างสะพานพร้อมสำเนาใบอนุญาตผู้ประกอบวิชาชีพ (ระดับไม่ต่ำกว่าสามัญวิศวกร)',
      file_id: detail.audit_document.bridge_engineer_certificate_url
    },
    {
      no: '4',
      petition_list: 'หนังสือรับรองของวิศวกรโยธาผู้คำนวณโครงสร้างทางพร้อมสำเนาใบอนุญาตผู้ประกอบวิชาชีพ (ระดับไม่ต่ำกว่าสามัญวิศวกร)',
      file_id: detail.audit_document.road_engineer_certificate_url
    },
    {
      no: '5',
      petition_list: 'หนังสือรับรองของวิศวกรเครื่องกลผู้คำนวณรัศมีวงเลี้ยว (ระดับไม่ต่ำกว่าสามัญวิศวกร)',
      file_id: detail.audit_document.mechanical_engineer_certificate_url
    },
    {
      no: '6',
      petition_list: 'แผนและระยะเวลาการดำเนินงาน',
      file_id: detail.audit_document.operation_plan_url
    },
  ]

  return (
    <div className='mt-5'>
      <h5>เอกสารรายการคำนวณและหนังสือรับรอง</h5>
      <Table
        columns={columns}
        dataSource={data || []}
        loading={false}
        pagination={false}
        // pagination={{
        //   defaultCurrent: 1,
        //   defaultPageSize: 10,
        //   current: 1,
        //   pageSize: 10,
        //   total: Number(10) || 0,
        //   // onChange: (page: number, pageSize: number) => handleTableChange(page, pageSize),
        //   showSizeChanger: true,
        //   position: ['bottomRight'],
        //   showTotal: (total, range) => {
        //     const totalPage = (range[1] + 1) - range[0]
        //     return `ทั้งหมด ${totalPage || total} รายการ`
        //   },
        //   locale: { items_per_page: "/ หน้า" }
        // }}
        scroll={{ x: 1000 }}
      />
    </div>
  )
}

export default React.memo<Props>(TablePermitDocument)
