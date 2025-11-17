/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import { getUploadAPI } from '@/services/entrepreneur/VehicleListService'
import { setLoading, useAppDispatch, useAppSelector } from '@/store'
import { Button, Dropdown, Flex, MenuProps, message } from 'antd'
import React, { useCallback } from 'react'
import { AiOutlineDownload } from 'react-icons/ai'
import JSZip from 'jszip'

interface Props {
  onExport?: () => void
}

const TitleSection: React.FC<Props> = (props) => {
  const { } = props;
  const { petition_extended } = useAppSelector(state => state.staff.petition)
  const dispatch = useAppDispatch()

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
          url: extractUrl(petition_extended?.detail?.user_document?.cid_url),
          name: '1_สำเนาบัตรประชาชน.pdf'
        },
        {
          url: extractUrl(petition_extended?.detail?.user_document?.company_certificate_url),
          name: '2_สำเนาหนังสือรับรองนิติบุคคล.pdf'
        },
        {
          url: extractUrl(petition_extended?.detail?.user_document?.vehicle_permit_url),
          name: '3_แบบคำขออนุญาตให้ยานพาหนะบางชนิดบางประเภทเดินบนทางหลวงชนบท.pdf'
        },
        {
          url: extractUrl(petition_extended?.detail?.user_document?.power_of_attorney_url),
          name: '4_หนังสือมอบอำนาจ.pdf'
        },
        {
          url: extractUrl(petition_extended?.detail?.vehicle_document?.prefab_parts_details_url),
          name: '5_สำเนาคู่มือจดทะเบียนและประวัติยานพาหนะ.pdf'
        },
        {
          url: extractUrl(petition_extended?.detail?.vehicle_document?.vehicle_photos_url),
          name: '6_รูปถ่ายสียานพาหนะ.pdf'
        },
        {
          url: extractUrl(petition_extended?.detail?.vehicle_document?.vehicle_dimensions_empty_url),
          name: '7_รูปแบบยานพาหนะแสดงขนาดระยะและน้ำหนักลงเพลาของยานพาหนะเปล่า.pdf'
        },
        {
          url: extractUrl(petition_extended?.detail?.vehicle_document?.vehicle_dimensions_loaded_url),
          name: '8_รูปแบบยานพาหนะแสดงมิติของรถรวมสิ่งของที่บรรทุกน้ำหนักลงเพลา.pdf'
        },
        {
          url: extractUrl(petition_extended?.detail?.vehicle_document?.vehicle_turning_radius_url),
          name: '9_รูปแบบยานพาหนะแสดงรัศมีวงเลี้ยว.pdf'
        },
        {
          url: extractUrl(petition_extended?.detail?.audit_document?.bridge_structure_calculation_url),
          name: '10_รายการคำนวณแรงที่เกิดขึ้นต่อโครงสร้างสะพาน.pdf'
        },
        {
          url: extractUrl(petition_extended?.detail?.audit_document?.road_structure_calculation_url),
          name: '11_รายการคำนวณแรงที่เกิดขึ้นต่อโครงสร้างทาง.pdf'
        },
        {
          url: extractUrl(petition_extended?.detail?.audit_document?.bridge_engineer_certificate_url),
          name: '12_หนังสือรับรองของวิศวกรโยธาผู้คำนวณโครงสร้างสะพาน.pdf'
        },
        {
          url: extractUrl(petition_extended?.detail?.audit_document?.road_engineer_certificate_url),
          name: '13_หนังสือรับรองของวิศวกรโยธาผู้คำนวณโครงสร้างทาง.pdf'
        },
        {
          url: extractUrl(petition_extended?.detail?.audit_document?.mechanical_engineer_certificate_url),
          name: '14_หนังสือรับรองของวิศวกรเครื่องกลผู้คำนวณรัศมีวงเลี้ยว.pdf'
        },
        {
          url: extractUrl(petition_extended?.detail?.audit_document?.operation_plan_url),
          name: '15_แผนและระยะเวลาการดำเนินงาน.pdf'
        }
      ]

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
  }, [dispatch, petition_extended, extractUrl])

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: 'สำเนาบัตรประชาชน',
      onClick: () => showFile(extractUrl(petition_extended?.detail?.user_document?.cid_url))
    },
    {
      key: '2',
      label: 'สำเนาหนังสือรับรองนิติบุคคล',
      onClick: () => showFile(extractUrl(petition_extended?.detail?.user_document?.company_certificate_url))
    },
    {
      key: '3',
      label: 'แบบคำขออนุญาตให้ยานพาหนะบางชนิด บางประเภท เดินบนทางหลวงชนบท',
      onClick: () => showFile(extractUrl(petition_extended?.detail?.user_document?.vehicle_permit_url))
    },
    {
      key: '4',
      label: 'หนังสือมอบอำนาจฯ',
      onClick: () => showFile(extractUrl(petition_extended?.detail?.user_document?.power_of_attorney_url))
    },
    {
      key: '5',
      label: 'สำเนาคู่มือจดทะเบียนและประวัติบานพาหนะที่ขออนุญาต พร้อมหลักฐานฉบับจริง',
      onClick: () => showFile(extractUrl(petition_extended?.detail?.vehicle_document?.prefab_parts_details_url))

    },
    {
      key: '6',
      label: 'รูปถ่ายสียานพาหนะ',
      onClick: () => showFile(extractUrl(petition_extended?.detail?.vehicle_document?.vehicle_photos_url))

    },
    {
      key: '7',
      label: 'รูปแบบยานพาหนะโดยแสดงถึงขนาดระยะและน้ำหนักลงเพลาของยานพาหนะเปล่า',
      onClick: () => showFile(extractUrl(petition_extended?.detail?.vehicle_document?.vehicle_dimensions_empty_url))

    },
    {
      key: '8',
      label: 'รูปแบบยานพาหนะโดยแสดงถึงมิติของรถรวมสิ่งของที่บรรทุก น้ำหนักลงเพลา',
      onClick: () => showFile(extractUrl(petition_extended?.detail?.vehicle_document?.vehicle_dimensions_loaded_url))

    },
    {
      key: '9',
      label: 'รูปแบบยานพาหนะโดยแสดงถึงรัศมีวงเลี้ยว',
      onClick: () => showFile(extractUrl(petition_extended?.detail?.vehicle_document?.vehicle_turning_radius_url))

    },
    {
      key: '10',
      label: 'รายการคำนวณแรงที่เกิดขึ้นต่อโครงสร้างสะพานรายสะพานที่อยู่ในเส้นทางขออนุญาต เมื่อบรรทุกน้ำหนัก',
      onClick: () => showFile(extractUrl(petition_extended?.detail?.audit_document?.bridge_structure_calculation_url))

    },
    {
      key: '11',
      label: 'รายการคำนวณแรงที่เกิดขึ้นต่อโครงสร้างทางตลอดเส้นทางที่อยู่ในเส้นทางขออนุญาต เมื่อบรรทุกน้ำหนัก',
      onClick: () => showFile(extractUrl(petition_extended?.detail?.audit_document?.road_structure_calculation_url))

    },
    {
      key: '12',
      label: 'หนังสือรับรองของวิศวกรโยธาผู้คำนวณโครงสร้างสะพานพร้อมสำเนาใบอนุญาตผู้ประกอบวิชาชีพ (ระดับไม่ต่ำกว่าสามัญวิศวกร)',
      onClick: () => showFile(extractUrl(petition_extended?.detail?.audit_document?.bridge_engineer_certificate_url))

    },
    {
      key: '13',
      label: 'หนังสือรับรองของวิศวกรโยธาผู้คำนวณโครงสร้างทางพร้อมสำเนาใบอนุญาตผู้ประกอบวิชาชีพ (ระดับไม่ต่ำกว่าสามัญวิศวกร)',
      onClick: () => showFile(extractUrl(petition_extended?.detail?.audit_document?.road_engineer_certificate_url))

    },
    {
      key: '14',
      label: 'หนังสือรับรองของวิศวกรเครื่องกลผู้คำนวณรัศมีวงเลี้ยว (ระดับไม่ต่ำกว่าสามัญวิศวกร)',
      onClick: () => showFile(extractUrl(petition_extended?.detail?.audit_document?.mechanical_engineer_certificate_url))

    },
    {
      key: '15',
      label: 'แผนและระยะเวลาการดำเนินงาน',
      onClick: () => showFile(extractUrl(petition_extended?.detail?.audit_document?.operation_plan_url))

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
      <h3>ตรวจสอบเอกสาร</h3>
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