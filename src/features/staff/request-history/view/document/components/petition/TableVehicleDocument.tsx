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

const TableVehicleDocument: React.FC<Props> = () => {
  const { petition_extended } = useAppSelector(s => s.staff.petition)
  const detail = petition_extended.detail
  const dispatch = useAppDispatch()
  const screens = Grid.useBreakpoint()
  const isCompact = !screens.md

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
      responsive: ['md'], // ✅ โชว์เฉพาะ md+
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
        'สำเนาคู่มือจดทะเบียนและประวัติยานพาหนะที่ขออนุญาต พร้อมหลักฐานฉบับจริง',
      file_id: detail?.vehicle_document?.prefab_parts_details_url,
    },
    {
      no: '2',
      petition_list: 'รูปถ่ายสียานพาหนะ',
      file_id: detail?.vehicle_document?.vehicle_photos_url,
    },
    {
      no: '3',
      petition_list:
        'รูปแบบยานพาหนะโดยแสดงถึงขนาดระยะและน้ำหนักลงเพลาของยานพาหนะเปล่า',
      file_id: detail?.vehicle_document?.vehicle_dimensions_empty_url,
    },
    {
      no: '4',
      petition_list:
        'รูปแบบยานพาหนะโดยแสดงถึงมิติของรถรวมสิ่งของที่บรรทุก น้ำหนักลงเพลา',
      file_id: detail?.vehicle_document?.vehicle_dimensions_loaded_url,
    },
    {
      no: '5',
      petition_list: 'รูปแบบยานพาหนะโดยแสดงถึงรัศมีวงเลี้ยว',
      file_id: detail?.vehicle_document?.vehicle_turning_radius_url,
    },
  ]

  return (
    <div className="mt-5">
      <h5>เอกสารยานพาหนะ</h5>
      <Table
        rowKey="no"
        columns={columns}
        dataSource={data}
        pagination={false}
        scroll={isCompact ? undefined : { x: 900 }}
      />
    </div>
  )
}

export default React.memo(TableVehicleDocument)
