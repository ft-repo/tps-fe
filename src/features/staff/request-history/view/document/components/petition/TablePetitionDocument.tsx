/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React, { useCallback } from 'react'
import { message, Table, TableProps } from 'antd'
import { setLoading, useAppDispatch, useAppSelector } from '@/store';
import { AiOutlineFilePdf } from "react-icons/ai";
import { getUploadAPI } from '@/services/entrepreneur/VehicleListService';

interface Props {
}

interface TableData {
  no: string;
  petition_list: string;
  file_id: string;
}

const TablePetitionDocument: React.FC<Props> = (props) => {
  const { } = props
  const { petition_extended } = useAppSelector(state => state.staff.petition)
  const detail = petition_extended.detail
  const dispatch = useAppDispatch()

  const extractUrl = useCallback((url: string) => {
    const path = url.split('/upload')[1];
    return path
  }, []);

  const showFile = useCallback(async (fileUrl: string) => {
    dispatch(setLoading(true))
    try {
      const response = await getUploadAPI(fileUrl)
      if (response.status === 200) {
        const url = URL.createObjectURL(response.data);
        window.open(url);
      }
    } catch (error) {
      if (error instanceof Error) {
        message.error(error.message)
      } else {
        console.error(error)
      }
    } finally {
      dispatch(setLoading(false))
    }
  }, [dispatch])

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
        if (record.file_id) {
          return (
            <AiOutlineFilePdf
              className='w-8 h-8 cursor-pointer inline-flex justify-center items-center'
              onClick={() => showFile(extractUrl(record.file_id))}
            />
          )
        }
        return '-'
      }
    },
  ];

  const data: TableData[] = [
    {
      no: '1',
      petition_list: 'สำเนาบัตรประชาชน',
      file_id: detail?.user_document?.cid_url
    },
    {
      no: '2',
      petition_list: 'สำเนาหนังสือรับรองนิติบุคคล',
      file_id: detail?.user_document?.company_certificate_url
    },
    {
      no: '3',
      petition_list: 'แบบคำขออนุยาตให้ยานพาหนะบางชนิด บางประเภท เดินบนทางหลวงชนบท',
      file_id: detail?.user_document?.vehicle_permit_url
    },
    {
      no: '4',
      petition_list: 'หนังสือมอบอำนาจพร้อมตราประทับของผู้มีอำนาจลงนามแทนบริษัทหรือห้างหุ้นส่วน',
      file_id: detail?.user_document?.power_of_attorney_url
    },
  ]

  return (
    <div>
      <h5>เอกสารผู้ประสงค์ขออนุญาต</h5>
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

export default React.memo<Props>(TablePetitionDocument)
