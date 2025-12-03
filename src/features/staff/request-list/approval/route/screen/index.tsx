/* eslint-disable react-refresh/only-export-components */
import React, { useEffect, useState } from 'react'
import { Button, Spin, Tooltip } from 'antd'
import { TitleSection, ContentSection, ContentRouteList } from '../components'
import { AiOutlineLeft } from 'react-icons/ai'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/store'
import { getPetitionEstimateRoute, getPetitionStatus } from '@/store/slices/staff'
import { useRouteContext } from '../context'
// import MapRoute from '@/components/ui/Maps'
// import { GeoJsonObject } from 'geojson'
// import { useReactToPrint } from 'react-to-print'
import DisplayMap from '@/features/entrepreneur/route-estimation/route/components/map/DisplayMap'
import { InfoCircleFilled } from '@ant-design/icons'
// import Map from '@/features/entrepreneur/route-estimation/route/components/map/Map'

interface Props { }

const RouteScreen: React.FC<Props> = () => {
  const [params] = useSearchParams()
  const petitionId = params.get('petition_id')
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const defaultLoading = useAppSelector(state => state.layout.loading)
  const { loading } = useAppSelector(state => state.staff.petition)
  const { index, item } = useRouteContext()
  const { petition } = useAppSelector(state => state.staff.petition)
  const detail = petition.detail.estimate.route
  const [remark, setRemark] = useState<'ตารางสรุป' | 'สะพาน' | 'รัศมีเลี้ยว'>('ตารางสรุป')

  useEffect(() => {
    if (!petitionId) return
    dispatch(getPetitionEstimateRoute({ petition_id: String(petitionId) }))
    dispatch(getPetitionStatus({ petition_id: String(petitionId) }))
  }, [dispatch, petitionId])

  // First index (always 0 for non-empty arrays)
  // const firstIndex = 0;
  // Last index
  // const lastIndex = detail.vehicle_route.length - 1;

  // const geometryData = useMemo<GeoJsonObject | undefined>(() => {
  //   if (detail?.vehicle_route) {
  //     return {
  //       type: 'LineString',
  //       coordinates: detail.vehicle_route
  //     } as unknown as GeoJsonObject
  //   }
  //   return undefined
  // }, [detail])

  // ====== PRINT (A4) ======
  // const printRef = useRef<HTMLDivElement>(null)

  // const handlePrint = useReactToPrint({
  //   contentRef: printRef,
  //   documentTitle: `route-${petitionId ?? ''}`,
  //   // ถ้าต้องการ style เสริมเฉพาะเอกสารนี้ (นอกเหนือจากไฟล์ CSS) ก็เติมใน pageStyle ได้
  //   pageStyle: `
  //     @page { size: A4 portrait; margin: 16mm; }
  //     @media print {
  //       html, body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  //     }
  //   `,
  // })

  return (
    <Spin spinning={loading || defaultLoading}>
      <section className="no-print">
        <Button
          type="text"
          icon={<AiOutlineLeft />}
          onClick={() => navigate('/request-list/overview')}
        >
          ย้อนกลับ
        </Button>
      </section>
      <section className="no-print">
        <TitleSection
        // onExport={handlePrint}
        />
      </section>
      {/* <div ref={printRef} className="print-a4"> */}
      <section className="mt-5">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 print-keep-together">
          <div className="min-h-[200px]">
            <ContentSection />
          </div>
          <div className="order-first xl:order-last rounded-md border border-gray-200 h-[50vh] xl:h-[75vh] overflow-hidden print-map print-keep-together">
            <DisplayMap
              coord={[detail?.vehicle_route[0] || 0, detail?.vehicle_route[detail?.vehicle_route?.length - 1]]}
              line={detail?.vehicle_route}
            />
          </div>
        </div>
      </section>
      <hr className="my-5" />
      <section>
        <h3 className='flex items-center gap-3 flex-wrap'>รายการประเมินเส้นทาง ({remark}){remark !== 'รัศมีเลี้ยว' ? null : <Tooltip title="เอกสารสูตรคำนวณรัศมีวงเลี้ยว"><InfoCircleFilled style={{ color: '#69b1ff' }} onClick={() => window.open('/pdf/สูตรคำนวณรัศมีวงเลี้ยว.pdf', '_blank')} /></Tooltip>}</h3>
        <section className="mt-3 print-condensed">
          <ContentRouteList
            index={index}
            item={item}
            setRemark={setRemark}
          />
        </section>
      </section>
      {/* </div> */}
    </Spin>
  )
}

export default React.memo<Props>(RouteScreen)
