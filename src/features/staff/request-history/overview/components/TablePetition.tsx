/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import { Table, type TableProps } from 'antd'
import dayjs from 'dayjs'
import type { AdminPetitionData, AdminPetitionTableData } from '@/@types/reducer/petition'
import { ADMIN_PETITION_HISTORY_STATUS } from '@/utils/constant'
import { useNavigate } from 'react-router-dom'
import { Tag } from '@/components/ui'

interface Props {
  data: AdminPetitionData;
  loading: boolean;
  handleTableChange: (page: number, pageSize: number) => void;
}

type HistoryKey = keyof typeof ADMIN_PETITION_HISTORY_STATUS // 'APPROVE' | 'NOT_APPROVE' | 'REJECTED'
type StepId = 1 | 2 | 3 | 5 | 6

type FlowItem = {
  id?: number
  message_id?: number
  status_id: number
  is_approved: boolean | 0 | 1 | '0' | '1' | 'true' | 'false' | 'TRUE' | 'FALSE'
  created_at?: string | null
  created_date?: string | null
}

const ORDER: StepId[] = [1, 2, 3, 5, 6]

const isTrue = (v: FlowItem['is_approved']) =>
  v === true || v === 1 || v === '1' || v === 'true' || v === 'TRUE'

const getFlows = (record: any): FlowItem[] =>
  (record?.petition_flow ?? []) as FlowItem[]

const latestFlowByStatus = (flows: FlowItem[], statusId: StepId): FlowItem | null => {
  const items = flows.filter(f => f.status_id === statusId)
  if (!items.length) return null
  return items.reduce((a, b) => {
    const da = (a.created_at ?? a.created_date ?? '') as string
    const db = (b.created_at ?? b.created_date ?? '') as string
    if (da !== db) return db > da ? b : a
    const ia = a.id ?? a.message_id ?? 0
    const ib = b.id ?? b.message_id ?? 0
    return ib > ia ? b : a
  })
}

/** คืนสถานะ + วันที่ของแต่ละสเต็ป
 * - ถ้าเจอ NOT_APPROVE ที่สเต็ปใด ให้สเต็ปหลังจากนั้นทั้งหมด = REJECTED และใช้วันที่ของ NOT_APPROVE นั้น
 */
const computeHistory = (record: AdminPetitionTableData):
  Partial<Record<StepId, { key: HistoryKey; date?: string | null }>> => {

  const out: Partial<Record<StepId, { key: HistoryKey; date?: string | null }>> = {}
  const flows = getFlows(record)

  let notApproveAnchorDate: string | null = null
  let rejectedTail = false

  for (const step of ORDER) {
    if (rejectedTail) {
      out[step] = { key: 'REJECTED' }
      continue
    }

    const f = latestFlowByStatus(flows, step)
    if (!f) continue

    const date = f.created_at ?? f.created_date ?? null

    if (isTrue(f.is_approved)) {
      out[step] = { key: 'APPROVE', date }
    } else {
      out[step] = { key: 'NOT_APPROVE', date }
      notApproveAnchorDate = date
      rejectedTail = true
    }
  }

  return out
}

const STATUS_TAG_STYLE: React.CSSProperties = {
  width: 120,               // ✅ ความกว้างเท่ากันทุกอัน (px หรือ '10rem' ก็ได้)
  minHeight: 48,            // ✅ ความสูงขั้นต่ำพอสำหรับ 2 บรรทัด (มีวันที่/ไม่มีวันที่ก็ไม่กระดิก)
  display: 'inline-flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 2,                   // เว้นบรรทัดระหว่างข้อความกับวันที่นิดนึง
  borderRadius: 6,
  padding: '4px 8px',
  color: '#fff',
  textAlign: 'center',
  fontWeight: 500,
  lineHeight: 1.2,
};

const TablePetition: React.FC<Props> = ({ data, loading, handleTableChange }) => {
  const makeStatusCell = (step: StepId) =>
    (_val: unknown, record: AdminPetitionTableData) => {
      const map = computeHistory(record)
      const st = map[step]
      if (!st) return '-' // ไม่มีข้อมูล step นี้

      const cfg = ADMIN_PETITION_HISTORY_STATUS[st.key]
      const dateText = st.date
        ? (dayjs(st.date).isValid() ? dayjs(st.date).format('DD/MM/YYYY') : st.date)
        : null

      return (
        // <Tag color={cfg.color}>
        //   {cfg.text}
        //   {dateText ? (<><br />{dateText}</>) : null}
        // </Tag>
        <Tag
          style={{
            ...STATUS_TAG_STYLE,
            backgroundColor: cfg.color
          }}
        >
          {cfg.text}
          {dateText ? (<><br />{dateText}</>) : null}
        </Tag>
      )
    }

  const columns: TableProps<AdminPetitionTableData>['columns'] = [
    {
      title: 'เลขที่ชื่อบริษัท / ห้าง / ร้าน',
      dataIndex: 'business_name',
      key: 'business_name',
      width: 500,
      align: 'center',
      render: (item) => {
        if (item) {
          return item
        }
        return '-'
      }
    },
    {
      title: 'รหัสสายทาง',
      dataIndex: 'road_code',
      key: 'road_code',
      width: 150,
      align: 'center',
      render: (item) => {
        if (item) {
          return item
        }
        return '-'
      }
    },
    {
      title: 'ชื่อสายทาง',
      dataIndex: 'road_name',
      key: 'road_name',
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
      title: 'วันที่เริ่มต้น',
      dataIndex: 'start_date',
      key: 'start_date',
      width: 150,
      align: 'center',
      render: (item) => {
        if (item) {
          return dayjs(item).format('DD/MM/YYYY')
        }
        return '-'
      }
    },
    {
      title: 'วันที่สิ้นสุด',
      dataIndex: 'end_date',
      key: 'end_date',
      width: 150,
      align: 'center',
      render: (item) => {
        if (item) {
          return dayjs(item).format('DD/MM/YYYY')
        }
        return '-'
      }
    },
    {
      title: 'วันที่ขออนุญาต',
      dataIndex: 'petition_date',
      key: 'petition_date',
      width: 150,
      align: 'center',
      render: (item) => {
        if (item) {
          return dayjs(item).format('DD/MM/YYYY')
        }
        return '-'
      }
    },

    { title: 'ตรวจเอกสาร', key: 'validate_document', width: 150, align: 'center', render: makeStatusCell(1) },
    { title: 'ตรวจเส้นทาง', key: 'validate_route', width: 150, align: 'center', render: makeStatusCell(2) },
    { title: 'ตรวจยานพาหนะ', key: 'validate_vehicle', width: 150, align: 'center', render: makeStatusCell(3) },
    { title: 'รอลงนาม', key: 'wait_signed', width: 150, align: 'center', render: makeStatusCell(5) },
    { title: 'ออกใบอนุญาต', key: 'permit', width: 150, align: 'center', render: makeStatusCell(6) },
  ]
  const navigate = useNavigate()

  return (
    <Table
      columns={columns}
      dataSource={data.data || []}
      loading={loading}
      onRow={(record) => ({
        onClick: () => {
          const href = `/request-history/view/other?petition_id=${(record as any).petition_id ?? ''}`

          navigate(href)
        },
      })}
      pagination={{
        defaultCurrent: 1,
        defaultPageSize: 10,
        current: data.page,
        pageSize: data.limit,
        total: Number(data.total) || 0,
        onChange: (page, pageSize) => handleTableChange(page, pageSize),
        showSizeChanger: true,
        position: ['bottomRight'],
        showTotal: (total, range) => {
          const totalPage = (range[1] + 1) - range[0]
          return `ทั้งหมด ${totalPage || total} รายการ`
        },
        locale: { items_per_page: '/ หน้า' },
      }}
      scroll={{ x: 1000 }}
      rowKey={(r: any) => r.id ?? r.key ?? JSON.stringify(r)}
    />
  )
}

export default React.memo<Props>(TablePetition)
