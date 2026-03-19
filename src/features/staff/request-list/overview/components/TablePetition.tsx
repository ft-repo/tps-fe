/* eslint-disable react/display-name */
/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import { Table, type TableProps, Tag, Tooltip } from 'antd'
import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'
import { ADMIN_PETITION_STATUS } from '@/utils/constant'
import type { AdminPetitionData, AdminPetitionTableData, PetitionHold } from '@/@types/reducer/petition'

type ApprovalKey = keyof typeof ADMIN_PETITION_STATUS
type StepStatus =
  | { key: ApprovalKey; date?: string | null }
  | { key: 'SKIPPED'; date?: string | null }

// --- Step ids ---
const STEP = {
  DOCUMENT: 1,
  ROUTE: 2,
  VEHICLE: 3,
  SIGN: 5,     // is_skipped มาที่ step นี้
  PERMIT: 6,
} as const
type StepId = typeof STEP[keyof typeof STEP]

type FlowItem = {
  message_id: number
  status_id: number
  is_approved: boolean
  created_date?: string | null
  is_skipped?: boolean
  petition_hold?: PetitionHold
}
type MaybeFlow = FlowItem | null

// ✅ ทำให้สถานะกว้าง/สูงเท่ากันทุกอัน
const STATUS_TAG_STYLE: React.CSSProperties = {
  width: 100,
  minHeight: 48,
  display: 'inline-flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 2,
  borderRadius: 6,
  padding: '4px 8px',
  // color: '#ffff',
  textAlign: 'center',
  fontWeight: 500,
  lineHeight: 1.2,
}

// ---------- helpers ----------
const isTrue = (v: unknown) =>
  v === true || v === 1 || v === '1' || v === 'true' || v === 'TRUE' || v === 'Y' || v === 'y'

const latestFlowByStatus = (flow: FlowItem[] | undefined, statusId: StepId): FlowItem | null => {
  const items = (flow ?? []).filter(f => f.status_id === statusId)
  if (!items.length) return null
  return items.reduce((acc, cur) => (cur.message_id > acc.message_id ? cur : acc))
}

/** map flow -> status โดย APPROVE ต้องมี created_date */
const toApproval = (flowItem: MaybeFlow): StepStatus => {
  if (!flowItem) return { key: 'IN_PROGRESS' }
  if (flowItem.is_approved === true) {
    return flowItem.created_date
      ? { key: 'APPROVE', date: flowItem.created_date }
      : { key: 'IN_PROGRESS' }
  }
  // IF ไม่ผ่านการตรวจและมี hold แต่ยังไม่ end => PETITION_HOLD
  if (flowItem.is_approved === false && flowItem.petition_hold?.is_end === false) {
    return { key: 'PETITION_HOLD', date: flowItem.created_date ?? null }
  }
  // IF ไม่ผ่านการตรวจและมี hold และ end => PETITION_END
  if (flowItem.is_approved === false && flowItem.petition_hold?.is_end === true) {
    return { key: 'PETITION_END' }
  }
  // IF ไม่ผ่านการตรวจและไม่มี hold => NOT_APPROVE
  if (flowItem.is_approved === false) {
    return { key: 'NOT_APPROVE', date: flowItem.created_date ?? null }
  }
  return { key: 'IN_PROGRESS' }
}

// SIGN ถูก skip ?
const isSignSkipped = (record: AdminPetitionTableData) =>
  isTrue(latestFlowByStatus((record as any).petition_flow, STEP.SIGN)?.is_skipped)

/** อ่านสถานะของแต่ละ step; ถ้า SIGN ถูก skip คืน 'SKIPPED' */
const getStepStatus = (record: AdminPetitionTableData, stepId: StepId): StepStatus => {
  if (stepId === STEP.SIGN && isSignSkipped(record)) {
    return { key: 'SKIPPED', date: null }
  }
  return toApproval(latestFlowByStatus((record as any).petition_flow, stepId))
}

/** ปลดล็อก step:
 * - ปกติ: ต้องให้ step ก่อนหน้า APPROVE
 * - พิเศษ: ถ้า SIGN ถูก skip => PERMIT ปลดล็อกทันที
 */
const isStepUnlocked = (record: AdminPetitionTableData, stepId: StepId) => {
  const ORDER: readonly StepId[] = [STEP.DOCUMENT, STEP.ROUTE, STEP.VEHICLE, STEP.SIGN, STEP.PERMIT] as const
  const idx = ORDER.indexOf(stepId)
  if (idx <= 0) return true
  if (stepId === STEP.PERMIT && isSignSkipped(record)) return true

  const prev = getStepStatus(record, ORDER[idx - 1])
  return prev.key === 'APPROVE'
}

// render Tag ของแต่ละ step (handle SKIPPED ให้เรียบร้อย)
const makeStepRenderer =
  (stepId: StepId, path: string, navigate: ReturnType<typeof useNavigate>) =>
    (_val: any, record: AdminPetitionTableData) => {
      const st = getStepStatus(record, stepId)
      const unlocked = isStepUnlocked(record, stepId)

      // กรณี SKIPPED -> เทา/คลิกไม่ได้ และใช้ STATUS_TAG_STYLE
      if (st.key === 'SKIPPED') {
        const content = (
          <Tag
            color="default"
            style={{ ...STATUS_TAG_STYLE, cursor: 'not-allowed', opacity: 1, userSelect: 'none' }}
          >
            ข้ามขั้นตอน
          </Tag>
        )
        return <Tooltip title="ขั้นตอนนี้ถูกข้าม"><span>{content}</span></Tooltip>
      }

      // จากบรรทัดนี้ st.key เป็น ApprovalKey
      const cfg = ADMIN_PETITION_STATUS[st.key]
      const clickable = unlocked

      const content = (
        <Tag
          color={clickable ? cfg.color : 'default'}
          style={{
            ...STATUS_TAG_STYLE,
            cursor: clickable ? 'pointer' : 'not-allowed',
            opacity: clickable ? 1 : 0.6,
            userSelect: 'none',
          }}
          role={clickable ? 'button' : undefined}
          tabIndex={clickable ? 0 : -1}
          onKeyDown={e => {
            if (!clickable || e.key !== 'Enter') return
            const flow = latestFlowByStatus((record as any).petition_flow, stepId)
            const approved =
              flow?.is_approved === true ? 'true' :
                flow?.is_approved === false ? 'false' :
                  'null'
            navigate(
              path,
              // `${path}?petition_id=${(record as any).petition_id ?? (record as any).id}&status_id=${record.status_id}&is_approved=${approved}`,
              {
                state: {
                  petition_id: record.petition_id,
                  status_id: record.status_id,
                  is_approved: approved,
                  petition_hold: flow?.petition_hold
                }
              }
            )
          }}
          onClick={
            clickable
              ? () => {
                const flow = latestFlowByStatus((record as any).petition_flow, stepId)
                const approved =
                  flow?.is_approved === true ? 'true' :
                    flow?.is_approved === false ? 'false' :
                      'null'

                navigate(
                  path,
                  // `${path}?petition_id=${(record as any).petition_id ?? (record as any).id}&status_id=${record.status_id}&is_approved=${approved}`,
                  {
                    state: {
                      petition_id: record.petition_id,
                      status_id: record.status_id,
                      is_approved: approved,
                      petition_hold: flow?.petition_hold
                    }
                  }
                )
              }
              : undefined
          }
        >
          <span className={cfg.text_color}>{cfg.text}</span>
          {st.date ? (
            <>
              {/* <br /> */}
              {dayjs(st.date).isValid() ? dayjs(st.date).format('DD/MM/YYYY') : st.date}
            </>
          ) : null}
        </Tag>
      )

      return clickable ? content : <Tooltip title="ต้องอนุมัติขั้นก่อนหน้าก่อน"><span>{content}</span></Tooltip>
    }

// ---------- component ----------
interface Props {
  data: AdminPetitionData
  loading: boolean
  handleTableChange: (page: number, limit: number) => void
}

const TablePetition: React.FC<Props> = ({ data, loading, handleTableChange }) => {
  const navigate = useNavigate()

  const columns: TableProps<AdminPetitionTableData>['columns'] = [
    {
      title: 'เลขที่ชื่อบริษัท / ห้าง / ร้าน',
      dataIndex: 'business_name',
      key: 'business_name',
      width: 500,
      align: 'center',
      render: (item, record, index) => {
        if (item) {
          if (index === 0) {
            return <strong>{item}</strong>
          }
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
      render: (item, record, index) => {
        if (item) {
          if (index === 0) {
            return <strong>{item}</strong>
          }
          return item
        }
        return '-'
      }
    },
    {
      title: 'ชื่อสายทาง',
      dataIndex: 'road_name',
      key: 'road_name',
      width: 500,
      align: 'center',
      render: (item, record, index) => {
        if (item) {
          if (index === 0) {
            return <strong>{item}</strong>
          }
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
      render: (item, record, index) => {
        if (item) {
          if (index === 0) {
            return <strong>{dayjs(item, 'YYYY-MM-DD').format('DD/MM/YYYY')}</strong>
          }
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
      render: (item, record, index) => {
        if (item) {
          if (index === 0) {
            return <strong>{dayjs(item, 'YYYY-MM-DD').format('DD/MM/YYYY')}</strong>
          }
          return dayjs(item).format('DD/MM/YYYY')
        }
        return '-'
      },
    },
    {
      title: 'วันที่ขออนุญาต',
      dataIndex: 'petition_date',
      key: 'petition_date',
      width: 150,
      align: 'center',
      render: (item, record, index) => {
        if (item) {
          if (index === 0) {
            return <strong>{dayjs(item, 'YYYY-MM-DD').format('DD/MM/YYYY')}</strong>
          }
          return dayjs(item).format('DD/MM/YYYY')
        }
        return '-'
      },
    },
    {
      title: 'จำนวนวันแก้ไข',
      dataIndex: 'petition_date',
      key: 'petition_date',
      width: 150,
      align: 'center',
      render: (item, record, index) => {
        if (item) {
          if (index === 0) {
            return <strong>{dayjs(item, 'YYYY-MM-DD').format('DD/MM/YYYY')}</strong>
          }
          return dayjs(item).format('DD/MM/YYYY')
        }
        return '-'
      },
    },
    {
      title: 'จำนวนวันแก้ไข',
      dataIndex: 'edited_amount',
      key: 'edited_amount',
      width: 150,
      align: 'center',
      render: (item, record, index) => {
        if (record.petition_flow.some(item => !!item.petition_hold)) {
          const petitionHold = record.petition_flow.find(item => !!item.petition_hold)?.petition_hold
          const holdDate = dayjs(petitionHold?.hold_date, 'YYYY-MM-DD')
          const expiredDate = dayjs(petitionHold?.date_expired, 'YYYY-MM-DD')
          const isEnded = petitionHold?.is_end
          const isExpired = dayjs().isAfter(expiredDate)

          if (isEnded && isExpired) {
            return index === 0 ? (
              <div>
                <strong><p className='text-[#FF0000]'>หมดเวลาส่งเอกสาร</p></strong>
                <strong><p className='text-[#FF0000]'>{holdDate.format('DD/MM/YYYY')} - {expiredDate.format('DD/MM/YYYY')}</p></strong>
              </div>
            ) : (
              <div>
                <p className='text-[#FF0000]'>หมดเวลาส่งเอกสาร</p>
                <p className='text-[#FF0000]'>{holdDate.format('DD/MM/YYYY')} - {expiredDate.format('DD/MM/YYYY')}</p>
              </div>
            )
          }

          if (isEnded) {
            const createdAt = dayjs(petitionHold?.created_at)
            return index === 0 ? (
              <div>
                <strong><p className='text-[#A2A2A2]'>ยกเลิกคำขอ</p></strong>
                <strong><p className='text-[#A2A2A2]'>{createdAt.isValid() ? createdAt.format('DD/MM/YYYY') : '-'}</p></strong>
              </div>
            ) : (
              <div>
                <p className='text-[#A2A2A2]'>ยกเลิกคำขอ</p>
                <p className='text-[#A2A2A2]'>{createdAt.isValid() ? createdAt.format('DD/MM/YYYY') : '-'}</p>
              </div>
            )
          }

          if (index === 0) {
            return (
              <div>
                <strong><p>{expiredDate.diff(holdDate, 'day')} วัน</p></strong>
                <strong><p>{holdDate.format('DD/MM/YYYY')} - {expiredDate.format('DD/MM/YYYY')}</p></strong>
              </div>
            )
          }
          return (
            <div>
              <p>{expiredDate.diff(holdDate, 'day')} วัน</p>
              <p>{holdDate.format('DD/MM/YYYY')} - {expiredDate.format('DD/MM/YYYY')}</p>
            </div>
          )
        }
        return '-'
      }
    },
    {
      title: 'ตรวจเอกสาร', key: 'validate_document', width: 150, align: 'center',
      render: makeStepRenderer(STEP.DOCUMENT, '/request-list/approval/document', navigate)
    },
    {
      title: 'ตรวจเส้นทาง', key: 'validate_route', width: 150, align: 'center',
      render: makeStepRenderer(STEP.ROUTE, '/request-list/approval/route', navigate)
    },
    {
      title: 'ตรวจยานพาหนะ', key: 'validate_vehicle', width: 150, align: 'center',
      render: makeStepRenderer(STEP.VEHICLE, '/request-list/approval/vehicle', navigate)
    },
    {
      title: 'รอลงนาม', key: 'wait_signed', width: 150, align: 'center',
      render: makeStepRenderer(STEP.SIGN, '/request-list/approval/sign', navigate)
    },
    {
      title: 'ออกใบอนุญาต', key: 'permit', width: 150, align: 'center',
      render: makeStepRenderer(STEP.PERMIT, '/request-list/approval/permit', navigate)
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
    />
  )
}

export default React.memo<Props>(TablePetition)
