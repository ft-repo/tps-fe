/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import { buildUploadFileUrl } from '@/utils/uploadFileUrl'
import { useAppSelector } from '@/store'
import ModalPdfPreview from '@/components/custom/pdf/ModalPdfPreview'
import { Col, Descriptions, DescriptionsProps, Row } from 'antd'
import dayjs from 'dayjs'
import React, { useCallback, useState } from 'react'
import { AiOutlineFilePdf } from 'react-icons/ai'

interface Props {

}

const ResultPermitDetail: React.FC<Props> = (props) => {
  const { } = props
  const { petition_status } = useAppSelector(state => state.staff.petition)
  const { from_web } = useAppSelector(state => state.auth.user)
  const [previewFile, setPreviewFile] = useState<string | null>(null)

  const renderName = useCallback((title: string, firstName: string, lastName: string) => {
    const nameArr = [title, firstName, lastName]
    if (!nameArr.length) return '-'
    return nameArr.join(' ').trim()
  }, [])

  const showFile = useCallback((documentUrl: string) => {
    if (!documentUrl) return
    // The upload routes take the api key as a query parameter, so the URL goes straight
    // to the viewer — pulling the bytes down first was only ever a way to set a header.
    const url = buildUploadFileUrl(documentUrl)
    if (from_web === false) {
      setPreviewFile(url)
    } else {
      window.open(url)
    }
  }, [from_web])

  const signed_document: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'เอกสารลงนาม',
      children: petition_status[3]?.document_url ? (
        <AiOutlineFilePdf
          className='w-5 h-5 cursor-pointer inline-flex justify-center items-center'
          onClick={() => showFile(petition_status[3]?.document_url)}
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
          onClick={() => showFile(petition_status[4]?.document_url)}
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
    <>
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
      <ModalPdfPreview
        file={previewFile}
        onClose={() => setPreviewFile(null)}
      />
    </>
  )
}

export default React.memo<Props>(ResultPermitDetail)
