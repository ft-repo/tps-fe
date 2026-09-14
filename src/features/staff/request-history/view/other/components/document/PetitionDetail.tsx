/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React, { useCallback, useMemo, useState } from 'react'
import { Descriptions, DescriptionsProps } from 'antd'
import { useAppSelector } from '@/store'
import ModalPdfPreview from '@/components/custom/pdf/ModalPdfPreview'
import dayjs from 'dayjs'
import { buildUploadFileUrl } from '@/utils/uploadFileUrl'
import { AiOutlineFilePdf } from 'react-icons/ai'

interface Props {

}

const PetitionDetail: React.FC<Props> = (props) => {
  const { } = props
  const { petition } = useAppSelector(state => state.staff.petition)
  const { from_web } = useAppSelector(state => state.auth.user)
  const [previewFile, setPreviewFile] = useState<string | null>(null)
  const document = petition?.detail?.document

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

  const items: DescriptionsProps['items'] = useMemo(() => {
    return [
      {
        key: '1',
        label: document?.is_personal ? 'ชื่อ - นามสกุล' : 'ชื่อบริษัท / ห้าง / ร้าน',
        children: <p>{document?.business_name || '-'}</p>,
      },
      {
        key: '2',
        label: 'ประเภทนิติบุคคล',
        children: <p>{document?.entity_type || '-'}</p>,
      },
      {
        key: '3',
        label: document?.is_personal ? 'ที่อยู่' : 'ที่อยู่บริษัท',
        children: <p>{document?.address || '-'}</p>,
      },
      {
        key: '4',
        label: document?.is_personal ? 'เลขบัตรประชาชน' : 'เลขทะเบียนนิติบุคคล',
        children: <p>{document?.registration_no || '-'}</p>,
      },
      {
        key: '5',
        label: document?.is_personal ? 'เบอร์โทรศัพท์' : 'เบอร์โทรสำนักงาน',
        children: <p>{document?.business_phone_no || '-'}</p>,
      },
      {
        key: '6',
        label: 'ผู้ติดต่อ / ผู้มอบอำนาจ',
        children: <p>{document?.contact_name || '-'}</p>,
      },
      {
        key: '7',
        label: 'เบอร์โทรศัพท์ผู้ติดต่อ / มอบอำนาจ',
        children: <p>{document?.contact_phone_no || '-'}</p>,
      },
      {
        key: '8',
        label: 'ชื่อโครงการ',
        children: <p>{document?.project_name || '-'}</p>,
      },
      {
        key: '9',
        label: 'ประเภทการขออนุญาต',
        children: <p>{document?.petition_type || '-'}</p>,
      },
      {
        key: '10',
        label: 'วันที่เริ่มต้น',
        children: <p>{document?.start_date ? dayjs(document?.start_date).format('DD/MM/YYYY') : '-'}</p>,
      },
      {
        key: '11',
        label: 'วันที่สิ้นสุด',
        children: <p>{document?.end_date ? dayjs(document?.end_date).format('DD/MM/YYYY') : '-'}</p>,
      },
      {
        key: '12',
        label: 'ขนส่งจาก',
        children: <p>{document?.start_point || '-'}</p>,
      },
      {
        key: '13',
        label: 'ไปยัง',
        children: <p>{document?.end_point || '-'}</p>,
      },
      {
        key: '14',
        label: 'หนังสือมอบอำนาจ',
        children: document?.poa_url ? (
          <AiOutlineFilePdf
            className='w-5 h-5 cursor-pointer inline-flex justify-center items-center'
            onClick={() => showFile(document?.poa_url)}
          />
        ) : '-'
      },
      {
        key: '15',
        label: 'หนังสือวิศวะเครื่องกล',
        children: document?.mach_book_url ? (
          <AiOutlineFilePdf
            className='w-5 h-5 cursor-pointer inline-flex justify-center items-center'
            onClick={() => showFile(document?.mach_book_url)}
          />
        ) : '-'
      },
    ]
  }, [document, showFile])

  const isPersonalContent = useMemo(() => {
    if (document?.is_personal) return items.filter(item => item.key !== '2')
    return items
  }, [document?.is_personal, items])

  return (
    <>
      <Descriptions
        title="ข้อมูลผู้ประสงค์ขออนุญาต"
        items={isPersonalContent}
        column={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 2, xxl: 3 }}
        layout='vertical'
        size='small'
      />
      <ModalPdfPreview
        file={previewFile}
        onClose={() => setPreviewFile(null)}
      />
    </>
  )
}

export default React.memo<Props>(PetitionDetail)
