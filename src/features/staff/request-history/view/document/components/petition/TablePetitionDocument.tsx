/* eslint-disable react-refresh/only-export-components */
import React, { useCallback } from 'react'
import { Grid, message, Table, type TableProps } from 'antd'
import { setLoading, useAppDispatch, useAppSelector } from '@/store'
import { getUploadAPI } from '@/services/entrepreneur/VehicleListService'
import { AiOutlineFilePdf } from 'react-icons/ai'

interface Props { }

interface TableData {
  no: string
  petition_list: string
  file_id?: string | null
}

const TablePetitionDocument: React.FC<Props> = () => {
  const { petition_extended } = useAppSelector(s => s.staff.petition)
  const detail = petition_extended.detail as any
  const dispatch = useAppDispatch()
  const screens = Grid.useBreakpoint()
  const isCompact = !screens.md // < md

  const extractUrl = useCallback((url: string) => url.split('/upload')[1], [])

  const showFile = useCallback(
    async (fileUrl: string) => {
      if (!fileUrl) return
      dispatch(setLoading(true))
      try {
        const res = await getUploadAPI(fileUrl)
        if (res.status === 200) {
          const url = URL.createObjectURL(res.data)
          window.open(url)
        }
      } catch (e) {
        if (e instanceof Error) message.error(e.message)
        else console.error(e)
      } finally {
        dispatch(setLoading(false))
      }
    },
    [dispatch]
  )

  const columns: TableProps<TableData>['columns'] = [
    {
      title: 'ลำดับ',
      dataIndex: 'no',
      key: 'no',
      width: 120,
      align: 'center',
      responsive: ['md'], // ✅ โชว์เฉพาะ md ขึ้นไป
    },
    {
      title: 'รายการ',
      dataIndex: 'petition_list',
      key: 'petition_list',
      align: 'center',
      onCell: () => ({ style: { whiteSpace: 'normal', wordBreak: 'break-word' } }),
    },
    {
      title: 'จัดการ',
      dataIndex: 'action',
      key: 'action',
      width: 100,
      align: 'center',
      render: (_v, record) =>
        record.file_id ? (
          <AiOutlineFilePdf
            className="w-6 h-6 cursor-pointer inline-flex justify-center items-center"
            onClick={() => showFile(extractUrl(record.file_id!))}
            title="เปิดไฟล์ PDF"
            aria-label="เปิดไฟล์ PDF"
          />
        ) : (
          '-'
        ),
    },
  ]

  const data: TableData[] = [
    {
      no: '1',
      petition_list: 'สำเนาบัตรประชาชน',
      file_id: detail?.user_document?.cid_url,
    },
    {
      no: '2',
      petition_list: 'สำเนาหนังสือรับรองนิติบุคคล',
      file_id: detail?.user_document?.company_certificate_url,
    },
    {
      no: '3',
      petition_list:
        'แบบคำขออนุญาตให้ยานพาหนะบางชนิด บางประเภท เดินบนทางหลวงชนบท',
      file_id: detail?.user_document?.vehicle_permit_url,
    },
    {
      no: '4',
      petition_list: 'หนังสือมอบอำนาจฯ',
      file_id: detail?.user_document?.power_of_attorney_url,
    },
  ]

  return (
    <div>
      <h5>เอกสารผู้ประสงค์ขออนุญาต</h5>
      <Table
        rowKey="no"
        columns={columns}
        dataSource={data}
        pagination={false}
        scroll={isCompact ? undefined : { x: 900 }} // จอเล็กไม่สกรอลล์, จอใหญ่ค่อยสกรอลล์
      />
    </div>
  )
}

export default React.memo(TablePetitionDocument)
