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
  file_id?: string
}

const TablePermitDocument: React.FC<Props> = () => {
  const { petition_extended } = useAppSelector(s => s.staff.petition)
  const detail = petition_extended.detail
  const dispatch = useAppDispatch()
  const screens = Grid.useBreakpoint()
  const isCompact = !screens.md // < md

  const extractUrl = useCallback((url: string) => url.split('/upload')[1], [])

  const showFile = useCallback(async (fileUrl: string) => {
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
  }, [dispatch])

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
          />
        ) : (
          '-'
        ),
    },
  ]

  const data: TableData[] = [
    {
      no: '1',
      petition_list:
        'รายการคำนวณแรงที่เกิดขึ้นต่อโครงสร้างสะพานรายสะพานที่อยู่ในเส้นทางขออนุญาต เมื่อบรรทุกน้ำหนัก',
      file_id: detail?.audit_document?.bridge_structure_calculation_url,
    },
    {
      no: '2',
      petition_list:
        'รายการคำนวณแรงที่เกิดขึ้นต่อโครงสร้างทางตลอดเส้นทางที่อยู่ในเส้นทางขออนุญาต เมื่อบรรทุกน้ำหนัก',
      file_id: detail?.audit_document?.road_structure_calculation_url,
    },
    {
      no: '3',
      petition_list:
        'หนังสือรับรองของวิศวกรโยธาผู้คำนวณโครงสร้างสะพานพร้อมสำเนาใบอนุญาตผู้ประกอบวิชาชีพ (ระดับไม่ต่ำกว่าสามัญวิศวกร)',
      file_id: detail?.audit_document?.bridge_engineer_certificate_url,
    },
    {
      no: '4',
      petition_list:
        'หนังสือรับรองของวิศวกรโยธาผู้คำนวณโครงสร้างทางพร้อมสำเนาใบอนุญาตผู้ประกอบวิชาชีพ (ระดับไม่ต่ำกว่าสามัญวิศวกร)',
      file_id: detail?.audit_document?.road_engineer_certificate_url,
    },
    {
      no: '5',
      petition_list: 'หนังสือรับรองของวิศวกรเครื่องกลผู้คำนวณรัศมีวงเลี้ยว (ระดับไม่ต่ำกว่าสามัญวิศวกร)',
      file_id: detail?.audit_document?.mechanical_engineer_certificate_url,
    },
    {
      no: '6',
      petition_list: 'แผนและระยะเวลาการดำเนินงาน',
      file_id: detail?.audit_document?.operation_plan_url,
    },
  ]

  return (
    <div className="mt-5">
      <h5>เอกสารรายการคำนวณและหนังสือรับรอง</h5>
      <Table
        rowKey="no"
        columns={columns}
        dataSource={data}
        pagination={false}
        // ถ้าจอเล็ก ไม่ต้องมีสกรอลล์แนวนอน
        scroll={isCompact ? undefined : { x: 900 }}
      />
    </div>
  )
}

export default React.memo(TablePermitDocument)
