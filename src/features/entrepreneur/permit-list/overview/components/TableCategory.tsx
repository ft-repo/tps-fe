/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import { Table, type TableProps } from 'antd';
import dayjs from 'dayjs'
import type { PetitionData, PetitionTableData } from '@/@types/reducer/petition';
import { Tag } from '@/components/ui';
import { CLIENT_PETITION_STATUS } from '@/utils/constant';

interface Props {
  data: PetitionData;
  loading: boolean;
  handleTableChange: (page: number, limit: number) => void;
}

// ---------- Helpers ----------
type StepId = 1 | 2 | 3 | 5 | 6
const ORDER: StepId[] = [1, 2, 3, 5, 6]

type FlowItem = {
  message_id: number
  status_id: number
  is_approved: boolean
  created_at?: string | null
  created_date?: string | null
}

const getDate = (f?: FlowItem | null) =>
  (f?.created_at ?? f?.created_date ?? null) as string | null

/** เลือกล่าสุดด้วย created_at/created_date; เสมอกันค่อยดู message_id มากสุด */
const latestFlowByStatus = (
  flow: FlowItem[] | undefined,
  statusId: StepId
): FlowItem | null => {
  const items = (flow ?? []).filter(f => f.status_id === statusId)
  if (!items.length) return null
  return items.reduce((a, b) => {
    const da = getDate(a) ?? ''
    const db = getDate(b) ?? ''
    if (da !== db) return db > da ? b : a
    return (b.message_id > a.message_id) ? b : a
  })
}

type StatusKey = keyof typeof CLIENT_PETITION_STATUS // 'APPROVE' | 'NOT_APPROVE' | 'REJECTED' | 'IN_PROGRESS'
type StepStatus = { key: StatusKey; date?: string | null }

/** คำนวณสถานะ + วันที่ ตามกฎ:
 * - APPROVE => date ของสเต็ปนั้น
 * - NOT_APPROVE => date ของสเต็ปนั้น และสเต็ปถัดไปทั้งหมด = REJECTED (ไม่แสดงวันที่)
 * - ไม่มี flow => IN_PROGRESS (ไม่แสดงวันที่)
 */
const computeStatuses = (record: PetitionTableData): Record<StepId, StepStatus> => {
  const out = {} as Record<StepId, StepStatus>
  let rejectedTail = false

  for (const step of ORDER) {
    if (rejectedTail) {
      out[step] = { key: 'REJECTED' }
      continue
    }

    const latest = latestFlowByStatus((record as any).petition_flow, step)
    if (!latest) {
      out[step] = { key: 'IN_PROGRESS' }
      continue
    }

    if (latest.is_approved === true) {
      out[step] = { key: 'APPROVE', date: getDate(latest) }
    } else {
      out[step] = { key: 'NOT_APPROVE', date: getDate(latest) }
      rejectedTail = true
    }
  }

  return out
}

const TableCategory: React.FC<Props> = ({ data, loading, handleTableChange }) => {
  const makeStatusCell =
    (step: StepId) =>
      (_val: unknown, record: PetitionTableData) => {
        const map = computeStatuses(record)
        const st = map[step] ?? { key: 'IN_PROGRESS' as StatusKey }
        const cfg = CLIENT_PETITION_STATUS[st.key]

        const showDate = st.key === 'APPROVE' || st.key === 'NOT_APPROVE'
        const dateText =
          showDate && st.date
            ? (dayjs(st.date).isValid() ? dayjs(st.date).format('DD/MM/YYYY') : st.date)
            : null

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

        return (
          <Tag
            style={{
              ...STATUS_TAG_STYLE,
              backgroundColor: cfg.color, // ใช้สีจาก CLIENT_PETITION_STATUS
            }}
          >
            {cfg.text}
            {dateText ? <span style={{ fontSize: 12 }}>{dateText}</span> : null}
          </Tag>
        );

      }

  const columns: TableProps<PetitionTableData>['columns'] = [
    { title: 'เลขที่', dataIndex: 'petition_no', key: 'petition_no', width: 100, align: 'center' },
    { title: 'รหัสสายทาง', dataIndex: 'road_code', key: 'road_code', width: 150, align: 'center' },
    { title: 'ชื่อสายทาง', dataIndex: 'road_name', key: 'road_name', width: 200, align: 'center' },
    { title: 'วันที่เริ่มต้น', dataIndex: 'start_date', key: 'start_date', width: 150, align: 'center' },
    { title: 'วันที่สิ้นสุด', dataIndex: 'end_date', key: 'end_date', width: 150, align: 'center' },
    { title: 'วันที่ขออนุญาต', dataIndex: 'petition_date', key: 'petition_date', width: 150, align: 'center' },

    { title: 'ตรวจเอกสาร', key: 'validate_document', width: 150, align: 'center', render: makeStatusCell(1) },
    { title: 'ตรวจเส้นทาง', key: 'validate_route', width: 150, align: 'center', render: makeStatusCell(2) },
    { title: 'ตรวจยานพาหนะ', key: 'validate_vehicle', width: 150, align: 'center', render: makeStatusCell(3) },
    { title: 'รอลงนาม', key: 'wait_signed', width: 150, align: 'center', render: makeStatusCell(5) },
    { title: 'ออกใบอนุญาต', key: 'permit', width: 150, align: 'center', render: makeStatusCell(6) },
  ]

  return (
    <Table
      columns={columns}
      rowKey="petition_id"
      dataSource={data.data || []}
      loading={loading}
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
        locale: { items_per_page: "/ หน้า" }
      }}
      scroll={{ x: 1000 }}
    />
  )
}

export default React.memo<Props>(TableCategory)
