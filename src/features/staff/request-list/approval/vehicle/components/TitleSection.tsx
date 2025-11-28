/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
/* TitleSection.tsx */
import { VehicleList } from '@/@types/reducer/petition'
import { setLoading, useAppDispatch, useAppSelector } from '@/store'
import { pdf } from '@react-pdf/renderer'
import { Button, Dropdown, Flex, MenuProps, message } from 'antd'
import JSZip from 'jszip'
import React, { useCallback, useMemo } from 'react'
import { AiOutlineDownload } from 'react-icons/ai'
import RenderDoc from '../../../../request-history/view/other/components/pdf/PetitionForm'

interface Props {
  onExport?: () => void
}

const TitleSection: React.FC<Props> = (props) => {
  const { } = props;
  const dispatch = useAppDispatch()
  const { petition } = useAppSelector(state => state.staff.petition)

  const downloadAllFile = useCallback(async () => {
    dispatch(setLoading(true))

    try {
      const zip = new JSZip()

      if (petition.detail.vehicle.vehicle_list.length === 0) {
        message.warning('ไม่พบไฟล์ที่จะดาวน์โหลด')
        return
      }

      // Add vehicle PDFs (แบบขออนุญาต) - matching the dropdown items
      const vehiclePdfPromises = petition.detail.vehicle.vehicle_list.map(async (item, index) => {
        try {
          const vehicleBlob = await pdf(<RenderDoc data={petition.detail} item={item} index={index} />).toBlob();
          zip.file(`${index + 1}_แบบขออนุญาต_${item.sort}.pdf`, vehicleBlob)
        } catch (error) {
          console.error(`Error generating vehicle PDF ${item.sort}:`, error)
        }
      })

      await Promise.all(vehiclePdfPromises)

      // Generate zip file
      const zipBlob = await zip.generateAsync({ type: 'blob' })

      // Download zip
      const url = URL.createObjectURL(zipBlob)
      const a = document.createElement('a')
      a.href = url
      a.download = `แบบขออนุญาตทั้งหมด_${new Date().getTime()}.zip`
      a.style.display = 'none'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      message.success(`ดาวน์โหลดไฟล์สำเร็จ ${petition.detail.vehicle.vehicle_list.length} ไฟล์`)
    } catch (e) {
      if (e instanceof Error) message.error(e.message)
      else console.error(e)
    } finally {
      dispatch(setLoading(false))
    }
  }, [dispatch, petition])

  const onShowPDF = useCallback(async (item: VehicleList, index: number) => {
    const blob = await pdf(<RenderDoc data={petition.detail} item={item} index={index} />).toBlob();
    const url = URL.createObjectURL(blob);
    // window.open(url, '_blank');
    // setTimeout(() => URL.revokeObjectURL(url), 100);

    const fileName: string = 'แบบขออนุญาต';
    const a: HTMLAnchorElement = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.style.display = 'none';

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }, [petition.detail])

  const vehicleDoc = useMemo(() => {
    return petition.detail.vehicle.vehicle_list.filter(item => item.match_type !== 'สิ้นค้า/เครื่องจักร').map((item, index) => {
      return {
        key: String(5 + (index + 1)),
        label: `แบบขออนุญาต ${item.sort}`,
        onClick: () => onShowPDF(item, index)
      }
    })
  }, [onShowPDF, petition.detail.vehicle.vehicle_list])

  const items: MenuProps['items'] = [
    ...vehicleDoc,
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
      <h3>ตรวจสอบยานพาหนะ</h3>
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
