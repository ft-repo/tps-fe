import React, { useCallback } from 'react'
import { message, Table, type TableProps, Grid } from 'antd'
import { setLoading, useAppDispatch, useAppSelector } from '@/store'
import { AiOutlineFilePdf } from 'react-icons/ai'
import { getUploadAPI } from '@/services/entrepreneur/VehicleListService'

interface Props {
  forceCondensed?: boolean
}

interface TableData {
  no: string
  petition_list: string
  file_id: string
}

const TablePetitionDocument: React.FC<Props> = ({ forceCondensed = false }) => {
  const { petition_extended } = useAppSelector(s => s.staff.petition)
  const detail = petition_extended.detail as any
  const dispatch = useAppDispatch()
  const screens = Grid.useBreakpoint()
  const isNarrow = !screens.md

  const extractUrl = useCallback((url: string) => url.split('/upload')[1], [])
  const showFile = useCallback(async (fileUrl: string) => {
    dispatch(setLoading(true))
    try {
      const res = await getUploadAPI(fileUrl)
      if (res.status === 200) window.open(URL.createObjectURL(res.data))
    } catch (e) {
      message.error(e instanceof Error ? e.message : 'เปิดไฟล์ไม่สำเร็จ')
    } finally {
      dispatch(setLoading(false))
    }
  }, [dispatch])

  const fullCols: TableProps<TableData>['columns'] = [
    { title: 'ลำดับ', dataIndex: 'no', key: 'no', width: 120, align: 'center' },
    {
      title: 'รายการ', dataIndex: 'petition_list', key: 'petition_list', align: 'center',
      onCell: () => ({ style: { whiteSpace: 'normal', wordBreak: 'break-word' } })
    },
    {
      title: 'จัดการ', dataIndex: 'action', key: 'action', width: 120, align: 'center',
      render: (_v, r) => r.file_id
        ? <AiOutlineFilePdf style={{ fontSize: 22 }} className="cursor-pointer ml-10"
          onClick={() => showFile(extractUrl(r.file_id))} />
        : '-'
    },
  ]

  const condensedCols: TableProps<TableData>['columns'] = [
    {
      title: 'รายการ', dataIndex: 'petition_list', key: 'petition_list', align: 'left',
      onCell: () => ({ style: { whiteSpace: 'normal', wordBreak: 'break-word' } })
    },
    {
      title: 'จัดการ', key: 'action', width: 90, align: 'center',
      render: (_v, r) => r.file_id
        ? <AiOutlineFilePdf style={{ fontSize: 20 }} className="cursor-pointer ml-7"
          onClick={() => showFile(extractUrl(r.file_id))} />
        : '-'
    },
  ]

  const columns = (isNarrow || forceCondensed) ? condensedCols : fullCols

  const data: TableData[] = [
    {
      no: '1', petition_list: 'สำเนาบัตรประชาชน',
      file_id: detail?.user_document?.cid_url
    },
    {
      no: '2', petition_list: 'สำเนาหนังสือรับรองนิติบุคคล',
      file_id: detail?.user_document?.company_certificate_url
    },
    {
      no: '3', petition_list: 'แบบคำขออนุญาตให้ยานพาหนะบางชนิด บางประเภท เดินบนทางหลวงชนบท',
      file_id: detail?.user_document?.vehicle_permit_url
    },
    {
      no: '4', petition_list: 'หนังสือมอบอำนาจฯ',
      file_id: detail?.user_document?.power_of_attorney_url
    },
  ]

  const useScroll = !(isNarrow || forceCondensed) ? { x: 700 } : undefined

  return (
    <div>
      <h5>เอกสารผู้ประสงค์ขออนุญาต</h5>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        size={(isNarrow || forceCondensed) ? 'small' : 'middle'}
        tableLayout="fixed"
        scroll={useScroll}
        rowKey={(r) => `${r.no}-${r.petition_list}`}
      />
    </div>
  )
}

export default React.memo(TablePetitionDocument)
