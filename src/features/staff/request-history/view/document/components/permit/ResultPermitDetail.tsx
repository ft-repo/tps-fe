/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import { getUploadAPI } from '@/services/entrepreneur/VehicleListService'
import { setLoading, useAppDispatch, useAppSelector } from '@/store'
import { Col, Descriptions, DescriptionsProps, message, Row } from 'antd'
import dayjs from 'dayjs'
import React, { useCallback } from 'react'
import { AiOutlineFilePdf } from 'react-icons/ai'

interface Props {

}

const ResultPermitDetail: React.FC<Props> = (props) => {
  const { } = props
  const { petition_status } = useAppSelector(state => state.staff.petition)
  const dispatch = useAppDispatch()

  const extractUrl = useCallback((url: string) => {
    const path = url.split('/upload')[1];
    return path
  }, []);

  const renderName = useCallback((title: string, firstName: string, lastName: string) => {
    const nameArr = [title, firstName, lastName]
    if (!nameArr.length) return '-'
    return nameArr.join(' ').trim()
  }, [])

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

  const signed_document: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'เอกสารลงนาม',
      children: petition_status[3]?.document_url ? (
        <AiOutlineFilePdf
          className='w-5 h-5 cursor-pointer inline-flex justify-center items-center'
          onClick={() => showFile(extractUrl(petition_status[3]?.document_url) || '-')}
        />
      ) : '-'
    },
    {
      key: '2',
      label: 'วันที่นำเข้าเอกสาร',
      children: <p>{petition_status[3]?.created_at ? dayjs(petition_status[3]?.created_at).format('DD/MM/YYYY') : '-'}</p>,
    },
    {
      key: '3',
      label: 'นำเข้าโดย',
      children: <p>{renderName(petition_status[3]?.admin_creaded?.title, petition_status[3]?.admin_creaded?.first_name, petition_status[3]?.admin_creaded?.last_name)}</p>,
    },
    {
      key: '4',
      label: 'หมายเหตุ',
      children: <p>{petition_status[3]?.remark || '-'}</p>,
    },
  ]

  const permit_document: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'เอกสารใบอนุญาต',
      children: petition_status[4]?.document_url ? (
        <AiOutlineFilePdf
          className='w-5 h-5 cursor-pointer inline-flex justify-center items-center'
          onClick={() => showFile(extractUrl(petition_status[4]?.document_url) || '-')}
        />
      ) : '-'
    },
    {
      key: '2',
      label: 'วันที่นำเข้าเอกสาร',
      children: <p>{petition_status[4]?.created_at ? dayjs(petition_status[4]?.created_at).format('DD/MM/YYYY') : '-'}</p>,
    },
    {
      key: '3',
      label: 'นำเข้าโดย',
      children: <p>{renderName(petition_status[4]?.admin_creaded?.title, petition_status[4]?.admin_creaded?.first_name, petition_status[4]?.admin_creaded?.last_name)}</p>,
    },
    {
      key: '4',
      label: 'หมายเหตุ',
      children: <p>{petition_status[4]?.remark || '-'}</p>,
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
