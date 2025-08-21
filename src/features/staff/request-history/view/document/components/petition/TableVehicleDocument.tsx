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

const TableVehicleDocument: React.FC<Props> = (props) => {
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
      petition_list: 'สำเนาคู่มือจดทะเบียนและประวัติบานพาหนะที่ขออนุญาต พร้อมหลักฐานฉบับจริง',
      file_id: detail.vehicle_document.prefab_parts_details_url
    },
    {
      no: '2',
      petition_list: 'รูปถ่ายสียานพาหนะ',
      file_id: detail.vehicle_document.vehicle_photos_url
    },
    {
      no: '3',
      petition_list: 'รูปแบบยานพาหนะโดยแสดงถึงขนาดระยะและน้ำหนักลงเพลาของยานพาหนะเปล่า',
      file_id: detail.vehicle_document.vehicle_dimensions_empty_url
    },
    {
      no: '4',
      petition_list: 'รูปแบบยานพาหนะโดยแสดงถึงมิติของรถรวมสิ่งของที่บรรทุก น้ำหนักลงเพลา',
      file_id: detail.vehicle_document.vehicle_dimensions_loaded_url
    },
    {
      no: '5',
      petition_list: 'รูปแบบยานพาหนะโดยแสดงถึงรัศมีวงเลี้ยว',
      file_id: detail.vehicle_document.vehicle_turning_radius_url
    },
  ]

  return (
    <div className='mt-5'>
      <h5>เอกสารยานพาหนะ</h5>
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

export default React.memo<Props>(TableVehicleDocument)
