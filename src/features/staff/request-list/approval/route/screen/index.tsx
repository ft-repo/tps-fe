/* eslint-disable react-refresh/only-export-components */
import React, { useEffect, useMemo, useRef } from 'react'
import { Button, Col, Row, Spin } from 'antd'
import { TitleSection, ContentSection, ContentRouteList } from '../components'
import { AiOutlineLeft } from 'react-icons/ai'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/store'
import { getPetitionEstimateRoute, getPetitionStatus } from '@/store/slices/staff'
import { useRouteContext } from '../context'
import MapRoute from '@/components/ui/Maps'
import { GeoJsonObject } from 'geojson'
import { useReactToPrint } from 'react-to-print'
import Map from '@/features/entrepreneur/route-estimation/route/components/map/Map'

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

  useEffect(() => {
    if (!petitionId) return
    dispatch(getPetitionEstimateRoute({ petition_id: String(petitionId) }))
    dispatch(getPetitionStatus({ petition_id: String(petitionId) }))
  }, [dispatch, petitionId])

  const geometryData = useMemo<GeoJsonObject | undefined>(() => {
    if (detail?.vehicle_route) {
      return {
        type: 'LineString',
        coordinates: detail.vehicle_route
      } as unknown as GeoJsonObject
    }
    return undefined
  }, [detail])

  // ====== PRINT (A4) ======
  const printRef = useRef<HTMLDivElement>(null)

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `route-${petitionId ?? ''}`,
    // ถ้าต้องการ style เสริมเฉพาะเอกสารนี้ (นอกเหนือจากไฟล์ CSS) ก็เติมใน pageStyle ได้
    pageStyle: `
      @page { size: A4 portrait; margin: 16mm; }
      @media print {
        html, body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      }
    `,
  })

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
        <TitleSection onExport={handlePrint} />
      </section>
      <div ref={printRef} className="print-a4">
        <section className="mt-5">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 print-keep-together">
            <div className="min-h-[200px]">
              <ContentSection />
            </div>
            <div className="order-first xl:order-last rounded-md border border-gray-200 h-[50vh] xl:h-[75vh] overflow-hidden print-map print-keep-together">
              {/* <MapRoute
                coordinates={[
                  [
                    Number(detail?.vehicle_route?.[0]?.[0] || 0),
                    Number(detail?.vehicle_route?.[0]?.[1] || 0),
                  ],
                  [
                    Number(detail?.vehicle_route?.[1]?.[0] || 0),
                    Number(detail?.vehicle_route?.[1]?.[1] || 0),
                  ],
                ]}
                isRouteEstimate={false}
                geometry={geometryData}
              /> */}
              {/* <Map
                coord={[detail.start_point, detail.end_point]}
                line={detail.vehicle_route}
              /> */}
            </div>
          </div>
        </section>

        <hr className="my-5" />

        <section>
          <h3>รายการประเมินเส้นทาง</h3>
          <section className="mt-3 print-condensed">
            <ContentRouteList index={index} item={item} />
          </section>
        </section>
      </div>
    </Spin>
  )
}

export default React.memo<Props>(RouteScreen)
