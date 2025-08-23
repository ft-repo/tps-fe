/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import { getUploadAPI } from '@/services/entrepreneur/VehicleListService'
import { useAppSelector } from '@/store'
import { Col, Descriptions, DescriptionsProps, message, Row } from 'antd'
import dayjs from 'dayjs'
import React, { useCallback } from 'react'
import { AiOutlineFilePdf } from 'react-icons/ai'

interface Props {

}

const ResultPermitDetail: React.FC<Props> = (props) => {
  const { } = props
  const { petition_status } = useAppSelector(state => state.staff.petition)

  const renderName = useCallback((title: string, firstName: string, lastName: string) => {
    const nameArr = [title, firstName, lastName]
    if (!nameArr.length) return '-'
    return nameArr.join(' ').trim()
  }, [])

  const showFile = useCallback(async (fileUrl: string) => {
    try {
      const response = await getUploadAPI(fileUrl)
      if (response.status === 200) {
        console.log(response)
      }
    } catch (error) {
      if (error instanceof Error) {
        message.error(error.message)
      } else {
        console.error(error)
      }
    }
  }, [])

  const signed_document: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'เอกสารลงนาม',
      children: (
        <AiOutlineFilePdf
          className='w-5 h-5 cursor-pointer inline-flex justify-center items-center'
          onClick={() => showFile(petition_status[3]?.document_url || '-')}
        />
      )
    },
    {
      key: '2',
      label: 'วันที่นำเข้าเอกสาร',
      children: <p>{petition_status[3]?.created_at ? dayjs(petition_status[3]?.created_at).format('DD MMMM YYYY') : '-'}</p>,
    },
    {
      key: '3',
      label: 'นำเข้าโดย',
      children: <p>{renderName(petition_status[3]?.admin_creaded?.title, petition_status[3]?.admin_creaded?.first_name, petition_status[3]?.admin_creaded?.last_name)}</p>,
    },
  ]

  const permit_document: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'เอกสารใบอนุญาต',
      children: (
        <AiOutlineFilePdf
          className='w-5 h-5 cursor-pointer inline-flex justify-center items-center'
          onClick={() => showFile(petition_status[4]?.document_url || '-')}
        />
      )
    },
    {
      key: '2',
      label: 'วันที่นำเข้าเอกสาร',
      children: <p>{petition_status[4]?.created_at ? dayjs(petition_status[4]?.created_at).format('DD MMMM YYYY') : '-'}</p>,
    },
    {
      key: '3',
      label: 'นำเข้าโดย',
      children: <p>{renderName(petition_status[4]?.admin_creaded?.title, petition_status[4]?.admin_creaded?.first_name, petition_status[4]?.admin_creaded?.last_name)}</p>,
    },
  ]

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
        <Descriptions
          title="เอกสารสำคัญ (เอกสารลงนาม)"
          items={signed_document}
          column={1}
          layout='vertical'
          size='small'
        />
      </Col>
      <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
        <Descriptions
          title="เอกสารสำคัญ (เอกสารใบอนุมัติ)"
          items={permit_document}
          column={1}
          layout='vertical'
          size='small'
        />
      </Col>
    </Row>
  )
}

export default React.memo<Props>(ResultPermitDetail)
