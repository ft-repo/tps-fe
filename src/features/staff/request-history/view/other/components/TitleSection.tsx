/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import { getUploadAPI } from '@/services/entrepreneur/VehicleListService'
import { setLoading, useAppDispatch, useAppSelector } from '@/store'
import { Button, Dropdown, Flex, MenuProps, message } from 'antd'
import React, { useCallback } from 'react'
import { AiOutlineDownload, AiOutlineLeft } from 'react-icons/ai'
import JSZip from 'jszip'
import { useNavigate } from 'react-router-dom'

interface Props {
  onExport?: () => void
}

const TitleSection: React.FC<Props> = (props) => {
  const { } = props;
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { petition, petition_status } = useAppSelector(state => state.staff.petition)

  const pdfDocument = petition?.detail?.document

  const extractUrl = useCallback((url: string) => url.split('/upload')[1], [])

  const showFile = useCallback(async (fileUrl: string) => {
    if (!fileUrl) return
    dispatch(setLoading(true))
    try {
      const res = await getUploadAPI(fileUrl)
      if (res.status === 200) {
        const url = URL.createObjectURL(res.data)
        // DOWNLOAD
        const fileName: string = url.substring(url.lastIndexOf('/') + 1);
        const a: HTMLAnchorElement = document.createElement('a');
        a.href = url;
        a.download = fileName;
        a.style.display = 'none';

        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    } catch (e) {
      if (e instanceof Error) message.error(e.message)
      else console.error(e)
    } finally {
      dispatch(setLoading(false))
    }
  }, [dispatch])

  const downloadAllAsZip = useCallback(async () => {
    dispatch(setLoading(true))
    try {
      const zip = new JSZip()

      // Define all files with their URLs and names
      const files = [
        {
          url: extractUrl(pdfDocument?.poa_url),
          name: '1_หนังสือมอบอำนาจ.pdf'
        },
        {
          url: extractUrl(pdfDocument?.mach_book_url),
          name: '2_หนังสือวิศวะเครื่องกล.pdf'
        },
        {
          url: extractUrl(petition_status[4]?.document_url),
          name: '3_เอกสารขออนุญาตจาก ทช.pdf'
        },
        {
          url: extractUrl(petition_status[3]?.document_url),
          name: '4_เอกสารลงนาม.pdf'
        },
        {
          url: extractUrl(petition_status[4]?.document_url),
          name: '5_เอกสารใบอนุญาต.pdf'
        },
      ]
      console.log(" === ", files)
      // Filter out files with no URL
      const validFiles = files.filter(file => file.url)

      if (validFiles.length === 0) {
        message.warning('ไม่พบไฟล์ที่จะดาวน์โหลด')
        return
      }

      // Fetch all files and add to zip
      const fetchPromises = validFiles.map(async (file) => {
        try {
          const res = await getUploadAPI(file.url)
          if (res.status === 200) {
            zip.file(file.name, res.data)
          }
        } catch (error) {
          console.error(`Error downloading ${file.name}:`, error)
        }
      })

      await Promise.all(fetchPromises)

      // Generate zip file
      const zipBlob = await zip.generateAsync({ type: 'blob' })

      // Download zip
      const url = URL.createObjectURL(zipBlob)
      const a = document.createElement('a')
      a.href = url
      a.download = `เอกสารทั้งหมด_${new Date().getTime()}.zip`
      a.style.display = 'none'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      message.success(`ดาวน์โหลดไฟล์สำเร็จ ${validFiles.length} ไฟล์`)
    } catch (e) {
      if (e instanceof Error) message.error(e.message)
      else console.error(e)
    } finally {
      dispatch(setLoading(false))
    }
  }, [dispatch, pdfDocument, petition_status, extractUrl])

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: 'หนังสือมอบอำนาจ',
      onClick: () => showFile(extractUrl(pdfDocument?.poa_url))
    },
    {
      key: '2',
      label: 'หนังสือวิศวะเครื่องกล',
      onClick: () => showFile(extractUrl(pdfDocument?.mach_book_url))
    },
    {
      key: '3',
      label: 'เอกสารขออนุญาตจาก ทช.',
      onClick: () => showFile(extractUrl(petition_status[4]?.document_url))
    },
    {
      key: '4',
      label: 'เอกสารลงนาม',
      onClick: () => showFile(extractUrl(petition_status[3]?.document_url))
    },
    {
      key: '5',
      label: 'เอกสารใบอนุญาต',
      onClick: () => showFile(extractUrl(petition_status[4]?.document_url))
    },
    {
      key: '16',
      label: 'ดาวน์โหลดทั้งหมด (.zip)',
      onClick: downloadAllAsZip
    },
  ];

  return (
    <Flex
      wrap
      justify="space-between"
      align="center"
      gap={5}
    >
      <Button
        type='text'
        icon={<AiOutlineLeft />}
        onClick={() => navigate('/request-history/overview')}
      >
        ย้อนกลับ
      </Button>
      <Dropdown
        menu={{ items }}
      >
        <Button
          type="primary"
          icon={<AiOutlineDownload />}
        >
          Export to PDF
        </Button>
      </Dropdown>
    </Flex>
  )
}

export default React.memo(TitleSection)