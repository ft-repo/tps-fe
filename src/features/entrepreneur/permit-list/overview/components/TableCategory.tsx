/* eslint-disable react-refresh/only-export-components */
import React, { useCallback } from 'react'
import { Badge, message, Table, type TableProps } from 'antd';
import dayjs from 'dayjs'
import type { PetitionData, PetitionFlow, PetitionTableData } from '@/@types/reducer/petition';
import { Tag } from '@/components/ui';
import { CLIENT_PETITION_STATUS } from '@/utils/constant';
import { setLoading, useAppDispatch } from '@/store';
import { getUploadAPI } from '@/services/entrepreneur/VehicleListService';
import { getPetitionMessageAPI } from '@/services/entrepreneur/PetitionService';

interface Props {
  data: PetitionData;
  loading: boolean;
  handleTableChange: (page: number, limit: number) => void;
  openDataModal: (id: string | number, record: PetitionTableData) => void;
  openMessageModal: (messageId: number) => void;
}

const STATUS_TAG_STYLE: React.CSSProperties = {
  width: 100,               // ✅ ความกว้างเท่ากันทุกอัน (px หรือ '10rem' ก็ได้)
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

const TableCategory: React.FC<Props> = (props) => {
  const { data, loading, handleTableChange, openDataModal, openMessageModal } = props
  const dispatch = useAppDispatch()

  const renderStatusTag = useCallback((petitionFlow: PetitionFlow, record: PetitionTableData) => {
    let text: 'IN_PROGRESS' | 'REJECTED' | 'APPROVE' | 'NOT_APPROVE' = 'IN_PROGRESS'
    if (typeof petitionFlow === 'undefined') {
      const isInProgress = record.petition_flow.some(item => item.is_approved === false) ? 'REJECTED' : 'IN_PROGRESS'
      text = isInProgress
    } else {
      if (petitionFlow?.is_approved) {
        text = 'APPROVE'
      } else {
        text = 'NOT_APPROVE'
      }
    }

    const tagBg = (typeof petitionFlow?.is_approved === 'boolean' && !petitionFlow?.is_approved && !petitionFlow.is_readed) ?
      '#5A9BC3'
      : CLIENT_PETITION_STATUS[text]?.color // ใช้สีจาก CLIENT_PETITION_STATUS

    const tagText = (typeof petitionFlow?.is_approved === 'boolean' && !petitionFlow?.is_approved && !petitionFlow.is_readed) ?
      'ข้อความใหม่'
      : CLIENT_PETITION_STATUS[text]?.text

    const tagSubText = (typeof petitionFlow?.is_approved === 'boolean' && !petitionFlow?.is_approved && !petitionFlow.is_readed) ?
      <Badge count={1} />
      : (text === 'IN_PROGRESS' || text === 'REJECTED') ? null :
        <span style={{ fontSize: 12 }}>{dayjs(petitionFlow?.created_date).format('DD/MM/YYYY')}</span>

    return (
      <figure
        className={
          (typeof petitionFlow?.is_approved === 'boolean' && !petitionFlow?.is_approved)
            ? 'cursor-pointer' : 'cursor-auto'
        }
        onClick={() => {
          if (typeof petitionFlow?.is_approved === 'boolean' && !petitionFlow?.is_approved) {
            openMessageModal(petitionFlow?.message_id)
          }
        }}
      >
        <Tag
          style={{
            ...STATUS_TAG_STYLE,
            backgroundColor: tagBg
          }}
        >
          <span className={CLIENT_PETITION_STATUS[text]?.text_color}>{tagText}</span>
          {tagSubText}
        </Tag>
      </figure>
    );
  }, [openMessageModal])

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

  const fetchStatusMessage = useCallback(async (messageId: number) => {
    dispatch(setLoading(true))
    try {
      const response = await getPetitionMessageAPI({ message_id: messageId })
      if (response.status === 200) {
        showFile(extractUrl(response.data.document_url))
      }
    } catch (error) {
      if (error instanceof Error) {
        message.error(error.message)
      } else {
        console.error('error: ', error)
      }
    } finally {
      dispatch(setLoading(false))
    }
  }, [dispatch, showFile, extractUrl])

  const columns: TableProps<PetitionTableData>['columns'] = [
    {
      title: 'เลขที่',
      dataIndex: 'petition_no',
      key: 'petition_no',
      width: 100,
      align: 'center',
      render: (item, record, index) => {
        if (item) {
          if (data.data.length - 1 === index) {
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
          if (data.data.length - 1 === index) {
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
          if (data.data.length - 1 === index) {
            return <p onClick={() => openDataModal(record.petition_id, record)}><strong>{item}</strong></p>
          }
          return <p onClick={() => openDataModal(record.petition_id, record)}>{item}</p>
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
          if (data.data.length - 1 === index) {
            return <strong>{dayjs(item, 'YYYY-MM-DD').format('DD/MM/YYYY')}</strong>
          }
          return dayjs(item, 'YYYY-MM-DD').format('DD/MM/YYYY')
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
          if (data.data.length - 1 === index) {
            return <strong>{dayjs(item, 'YYYY-MM-DD').format('DD/MM/YYYY')}</strong>
          }
          return dayjs(item, 'YYYY-MM-DD').format('DD/MM/YYYY')
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
      render: (item, record, index) => {
        if (item) {
          if (data.data.length - 1 === index) {
            return <strong>{dayjs(item, 'YYYY-MM-DD').format('DD/MM/YYYY')}</strong>
          }
          return dayjs(item, 'YYYY-MM-DD').format('DD/MM/YYYY')
        }
        return '-'
      }
    },
    {
      title: 'ตรวจเอกสาร',
      key: 'validate_document',
      width: 150,
      align: 'center',
      render: (item, record) => {
        return renderStatusTag(record.petition_flow[0], record)
      }
    },
    {
      title: 'ตรวจเส้นทาง',
      key: 'validate_route',
      width: 150,
      align: 'center',
      render: (item, record) => {
        return renderStatusTag(record.petition_flow[1], record)
      }
    },
    {
      title: 'ตรวจยานพาหนะ',
      key: 'validate_vehicle',
      width: 150,
      align: 'center',
      render: (item, record) => {
        return renderStatusTag(record.petition_flow[2], record)
      }
    },
    {
      title: 'รอลงนาม',
      key: 'wait_signed',
      width: 150,
      align: 'center',
      render: (item, record) => {
        return renderStatusTag(record.petition_flow[3], record)
      }
    },
    {
      title: 'ออกใบอนุญาต',
      key: 'permit',
      width: 150,
      align: 'center',
      render: (item, record) => {
        return renderStatusTag(record.petition_flow[4], record)
      }
    },
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
      onRow={(record) => {
        return {
          onClick: () => {
            if (record.petition_flow.length === 5 && record.petition_flow[4].status_id === 6) {
              fetchStatusMessage(record.petition_flow[4].message_id)
            }
            return
          }
        };
      }}
    />
  )
}

export default React.memo<Props>(TableCategory)
