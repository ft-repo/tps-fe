/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import { getUploadAPI } from '@/services/entrepreneur/VehicleListService'
import { setLoading, useAppDispatch, useAppSelector } from '@/store'
import { Button, Dropdown, Flex, MenuProps, message } from 'antd'
import React, { useCallback, useMemo } from 'react'
import { AiOutlineDownload, AiOutlineLeft } from 'react-icons/ai'
import JSZip from 'jszip'
import { useNavigate } from 'react-router-dom'
// import { pdf } from '@react-pdf/renderer'
// import { pdf } from '@react-pdf/renderer'
// import RenderDoc from './pdf/PetitionForm'
// import vehicle from '@/views/staff/request-list/approval/vehicle'
// import { VehicleList } from '@/@types/reducer/petition'

interface Props {
  onExport?: () => void
}

const TitleSection: React.FC<Props> = (props) => {
  const { } = props;
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { petition, petition_status } = useAppSelector(state => state.staff.petition)

  console.log(petition)

  const pdfDocument = petition?.detail?.document

  const extractUrl = useCallback((url: string) => url.split('/upload')[1], [])

  const showFile = useCallback(async (fileUrl: string, fileName?: string) => {
    if (!fileUrl) return
    dispatch(setLoading(true))
    try {
      const res = await getUploadAPI(fileUrl)
      if (res.status === 200) {
        const url = URL.createObjectURL(res.data)
        // DOWNLOAD
        const downloadFileName: string = fileName || url.substring(url.lastIndexOf('/') + 1);
        const a: HTMLAnchorElement = document.createElement('a');
        a.href = url;
        a.download = downloadFileName;
        a.style.display = 'none';

        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    } catch (e) {
      if (e instanceof Error) message.error(e.message)
      else console.error(e)
    } finally {
      dispatch(setLoading(false))
    }
  }, [dispatch])

  const downloadAllFile = useCallback(async () => {
    dispatch(setLoading(true))

    try {
      const zip = new JSZip()

      // Define base files with their URLs and names
      const baseFiles = [
        {
          url: extractUrl(pdfDocument?.poa_url),
          name: '1_หนังสือมอบอำนาจ.pdf'
        },
        {
          url: extractUrl(pdfDocument?.mach_book_url),
          name: '2_หนังสือวิศวะเครื่องกล.pdf'
        },
      ]

      // Add rural highway dept permit files for each vehicle
      const ruralFiles = petition.detail.vehicle.vehicle_list.map((item, index) => ({
        url: extractUrl(item.rural_highway_dept_permit_url),
        name: `${3 + index}_เอกสารขออนุญาตจาก ทช._${item.sort}.pdf`
      }))

      // Calculate the next index after rural files
      const nextIndex = 3 + petition.detail.vehicle.vehicle_list.length

      // Add remaining files
      const remainingFiles = [
        {
          url: extractUrl(petition_status[3]?.document_url),
          name: `${nextIndex}_เอกสารลงนาม.pdf`
        },
        {
          url: extractUrl(petition_status[4]?.document_url),
          name: `${nextIndex + 1}_เอกสารใบอนุญาต.pdf`
        },
      ]

      // Combine all files
      const allFiles = [...baseFiles, ...ruralFiles, ...remainingFiles]

      // Filter out files with no URL
      const validFiles = allFiles.filter(file => file.url)

      if (validFiles.length === 0 && petition.detail.vehicle.vehicle_list.length === 0) {
        message.warning('ไม่พบไฟล์ที่จะดาวน์โหลด')
        return
      }

      // Fetch all files and add to zip
      const fetchPromises = validFiles.map(async (file) => {
        try {
          const res = await getUploadAPI(file.url || '')
          if (res.status === 200) {
            zip.file(file.name, res.data)
          }
        } catch (error) {
          console.error(`Error downloading ${file.name}:`, error)
        }
      })

      await Promise.all(fetchPromises)

      // Add vehicle PDFs (แบบขออนุญาต)
      // const vehicleStartIndex = nextIndex + 2
      // const vehiclePdfPromises = petition.detail.vehicle.vehicle_list.map(async (item, index) => {
      //   try {
      //     const vehicleBlob = await pdf(<RenderDoc data={petition.detail} item={item} index={index} />).toBlob();
      //     zip.file(`${vehicleStartIndex + index}_แบบขออนุญาต_${item.sort}.pdf`, vehicleBlob)
      //   } catch (error) {
      //     console.error(`Error generating vehicle PDF ${item.sort}:`, error)
      //   }
      // })

      // await Promise.all(vehiclePdfPromises)

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

      const totalFiles = validFiles.length + petition.detail.vehicle.vehicle_list.length
      message.success(`ดาวน์โหลดไฟล์สำเร็จ ${totalFiles} ไฟล์`)
    } catch (e) {
      if (e instanceof Error) message.error(e.message)
      else console.error(e)
    } finally {
      dispatch(setLoading(false))
    }
  }, [dispatch, petition, extractUrl, pdfDocument?.poa_url, pdfDocument?.mach_book_url, petition_status])

  // const onShowPDF = useCallback(async (item: VehicleList, index: number) => {
  //   const blob = await pdf(<RenderDoc data={petition.detail} item={item} index={index} />).toBlob();
  //   const url = URL.createObjectURL(blob);
  //   // window.open(url, '_blank');
  //   // setTimeout(() => URL.revokeObjectURL(url), 100);

  //   const fileName: string = 'แบบขออนุญาต';
  //   const a: HTMLAnchorElement = document.createElement('a');
  //   a.href = url;
  //   a.download = fileName;
  //   a.style.display = 'none';

  //   document.body.appendChild(a);
  //   a.click();
  //   document.body.removeChild(a);
  // }, [petition.detail])

  // const vehicleDoc = useMemo(() => {
  //   return petition.detail.vehicle.vehicle_list.map((item, index) => {
  //     return {
  //       key: String(5 + (index + 1)),
  //       label: `แบบขออนุญาต ${item.sort}`,
  //       onClick: () => onShowPDF(item, index)
  //     }
  //   })
  // }, [onShowPDF, petition.detail.vehicle.vehicle_list])

  const ruralDoc = useMemo(() => {
    return petition.detail.vehicle.vehicle_list.map((item, index) => {
      return {
        key: String(2 + (index + 1)),
        label: `เอกสารขออนุญาตจาก ทช. ${item.sort}`,
        onClick: () => showFile(extractUrl(item.rural_highway_dept_permit_url), `เอกสารขออนุญาตจาก ทช._${item.sort}.pdf`)
      }
    })
  }, [petition.detail.vehicle.vehicle_list, extractUrl, showFile])

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: 'หนังสือมอบอำนาจ',
      onClick: () => showFile(extractUrl(pdfDocument?.poa_url), 'หนังสือมอบอำนาจ.pdf')
    },
    {
      key: '2',
      label: 'หนังสือวิศวะเครื่องกล',
      onClick: () => showFile(extractUrl(pdfDocument?.mach_book_url), 'หนังสือวิศวะเครื่องกล.pdf')
    },
    ...ruralDoc,
    {
      key: '4',
      label: 'เอกสารลงนาม',
      onClick: () => showFile(extractUrl(petition_status[3]?.document_url), 'เอกสารลงนาม.pdf')
    },
    {
      key: '5',
      label: 'เอกสารใบอนุญาต',
      onClick: () => showFile(extractUrl(petition_status[4]?.document_url), 'เอกสารใบอนุญาต.pdf')
    },
    // ...vehicleDoc,
    {
      key: '10',
      label: 'ดาวน์โหลดทั้งหมด (.zip)',
      onClick: downloadAllFile
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