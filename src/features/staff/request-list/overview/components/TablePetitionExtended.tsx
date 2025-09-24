/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import { Table, type TableProps, Tag, Tooltip } from 'antd'
import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'
import { ADMIN_PETITION_STATUS } from '@/utils/constant'
import type { AdminPetitionExtendedTableData, AdminPetitionExtendedData } from '@/@types/reducer/petition'

type ApprovalKey = keyof typeof ADMIN_PETITION_STATUS
type StepStatus = { key: ApprovalKey; date?: string | null }

interface Props {
  data: AdminPetitionExtendedData;
  loading: boolean;
  handleTableChange: (page: number, pageSize: number) => void;
}

// --- step id จาก API (ไม่มีข้ามขั้นตอน) ---
const STEP = { JUDGE: 4, SIGN: 5, PERMIT: 6 } as const
type StepId = typeof STEP[keyof typeof STEP]

type FlowItem = {
  id: number
  status_id: number
  is_approved: boolean | null
  created_at?: string | null
}
type MaybeFlow = FlowItem | null

// ---------- helpers ----------
const getFlows = (record: any): FlowItem[] =>
  record?.petition_extended_flow ?? []

const latestFlowByStatus = (flow: FlowItem[] | undefined, statusId: StepId): FlowItem | null => {
  const items = (flow ?? []).filter(f => f.status_id === statusId)
  if (!items.length) return null
  // เลือกล่าสุดด้วย created_at; ถ้าเวลาเท่ากันให้ดู id มากสุด
  return items.reduce((acc, cur) => {
    const ta = acc.created_at ? new Date(acc.created_at).getTime() : 0
    const tc = cur.created_at ? new Date(cur.created_at).getTime() : 0
    if (tc !== ta) return tc > ta ? cur : acc
    return cur.id > acc.id ? cur : acc
  })
}

/** APPROVE ต้องมีวันที่ */
const toApproval = (flowItem: MaybeFlow): StepStatus => {
  if (!flowItem) return { key: 'IN_PROGRESS' }
  if (flowItem.is_approved === true) {
    return flowItem.created_at
      ? { key: 'APPROVE', date: flowItem.created_at }
      : { key: 'IN_PROGRESS' }
  }
  if (flowItem.is_approved === false) {
    return { key: 'NOT_APPROVE', date: flowItem.created_at ?? null }
  }
  return { key: 'IN_PROGRESS' }
}

const getStepStatus = (record: AdminPetitionExtendedTableData, stepId: StepId): StepStatus =>
  toApproval(latestFlowByStatus(getFlows(record), stepId))

/** Gate: ต้อง APPROVE ขั้นก่อนหน้า ถึงจะปลดล็อกขั้นนี้ */
const isStepUnlocked = (record: AdminPetitionExtendedTableData, stepId: StepId) => {
  const ORDER: readonly StepId[] = [STEP.JUDGE, STEP.SIGN, STEP.PERMIT] as const
  const idx = ORDER.indexOf(stepId)
  if (idx <= 0) return true
  const prev = getStepStatus(record, ORDER[idx - 1])
  return prev.key === 'APPROVE'
}

const STATUS_TAG_STYLE: React.CSSProperties = {
  width: 100, minHeight: 48,
  display: 'inline-flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 2,
  borderRadius: 6,
  padding: '4px 8px',
  textAlign: 'center',
  fontWeight: 500,
  lineHeight: 1.2,
}

const makeStepRenderer =
  (stepId: StepId, path: string, navigate: ReturnType<typeof useNavigate>) =>
    (_val: unknown, record: AdminPetitionExtendedTableData) => {
      const st = getStepStatus(record, stepId)
      const cfg = ADMIN_PETITION_STATUS[st.key]
      const unlocked = isStepUnlocked(record, stepId)
      const clickable = unlocked

      const flow = latestFlowByStatus(getFlows(record), stepId)
      const approvedParam =
        flow?.is_approved === true ? 'true'
          : flow?.is_approved === false ? 'false'
            : 'null'

      const pid = (record as any).id ?? ''
      const href = `${path}?petition_id=${encodeURIComponent(String(pid))}&status_id=${record.status_id}&is_approved=${approvedParam}`

      const go = (e?: React.MouseEvent) => {
        e?.stopPropagation()
        navigate(href)
      }

      const content = (
        <Tag
          color={clickable ? cfg.color : 'default'}  // ✅ ปลดล็อก: ใช้สีสถานะ, ล็อก: ใช้ default
          style={{
            ...STATUS_TAG_STYLE,
            cursor: clickable ? 'pointer' : 'not-allowed',
            opacity: clickable ? 1 : 0.85,
            userSelect: 'none',
          }}
          onClick={clickable ? go : undefined}
          role={clickable ? 'button' : undefined}
          tabIndex={clickable ? 0 : -1}
          onKeyDown={(e) => {
            if (!clickable) return
            if (e.key === 'Enter') {
              e.stopPropagation()
              navigate(href)
            }
          }}
        >
          {cfg.text}
          {st.date ? (
            <>
              <br />
              {dayjs(st.date).isValid() ? dayjs(st.date).format('DD/MM/YYYY') : st.date}
            </>
          ) : null}
        </Tag>
      )

      return clickable ? content : (
        <Tooltip title="ต้องอนุมัติขั้นก่อนหน้าก่อน">
          <span onClick={(e) => e.stopPropagation()}>{content}</span>
        </Tooltip>
      )
    }


// ---------- component ----------
const TablePetitionExtended: React.FC<Props> = ({ data, loading, handleTableChange }) => {
  const navigate = useNavigate()

  const columns: TableProps<AdminPetitionExtendedTableData>['columns'] = [
    {
      title: 'ชื่อบริษัท / ห้าง / ร้าน',
      key: 'company',
      width: 300,
      align: 'center',
      render: (item, record, index) => {
        if (record.user_created?.business_details?.business_name) {
          if (data.data.length - 1 === index) {
            return <strong>{record.user_created?.business_details?.business_name}</strong>
          }
          return record.user_created?.business_details?.business_name
        } else if (record.poa_name) {
          if (data.data.length - 1 === index) {
            return <strong>{record.poa_name}</strong>
          }
          return record.poa_name
        } else {
          return '-'
        }
      }
    },
    {
      title: 'วันที่ขออนุญาต',
      dataIndex: 'created_at',
      key: 'created_at',
      width: 160,
      align: 'center',
      render: (item, record, index) => {
        if (item) {
          if (data.data.length - 1 === index) {
            return <strong>{dayjs(item).format('DD/MM/YYYY')}</strong>
          }
          return dayjs(item).format('DD/MM/YYYY')
        }
        return '-'
      }
    },

    // STEP by STEP (คลิกได้ตามลำดับ)
    {
      title: 'คณะกรรมการพิจารณา', key: 'validate_judge', width: 180, align: 'center',
      render: makeStepRenderer(STEP.JUDGE, '/request-list/approval/other', navigate)
    },
    {
      title: 'รอลงนาม', key: 'wait_signed', width: 150, align: 'center',
      render: makeStepRenderer(STEP.SIGN, '/request-list/approval/sign-extended', navigate)
    },
    {
      title: 'ออกใบอนุญาต', key: 'permit', width: 150, align: 'center',
      render: makeStepRenderer(STEP.PERMIT, '/request-list/approval/permit-extended', navigate)
    },
  ]

  return (
    <Table
      columns={columns}
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
        locale: { items_per_page: '/ หน้า' },
      }}
      scroll={{ x: 1000 }}
      rowKey={(r: any) => r.id ?? r.key ?? JSON.stringify(r)}
      onRow={(record) => ({
        onClick: () => {
          const href = `/request-list/approval/evaluation?petition_id=${(record as any).id ?? ''}&status_id=${record.status_id}`
          navigate(href)
        },
      })}
    />
  )
}

export default React.memo(TablePetitionExtended)
