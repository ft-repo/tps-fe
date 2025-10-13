/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-empty-pattern */
import React, { useMemo } from 'react'
import { Col, Row } from 'antd'
import { EvaluateRouteDetail, ContentRouteTab } from '../components'
import MapRoute from '@/components/ui/Maps'
import { useAppSelector } from '@/store'
import { GeoJsonObject } from 'geojson'
import DisplayMap from '@/features/entrepreneur/route-estimation/route/components/map/DisplayMap'

interface Props {

}

const EvaluationRoute: React.FC<Props> = (props) => {
  const { } = props
  const { petition } = useAppSelector(state => state.staff.petition)
  const detail = petition.detail.estimate.route

  // const geometryData = useMemo(() => {
  //   if (detail?.vehicle_route) {
  //     return { type: 'LineString', coordinates: detail?.vehicle_route } as unknown as GeoJsonObject
  //   }
  //   return undefined
  // }, [detail])

  return (
    <div className='border-2 rounded-md p-4 mb-3'>
      <h3>ตรวจสอบเส้นทาง</h3>
      <section className='mt-5'>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={8}>
            <section>
              <div className='order-first z-0 h-[50vh] block rounded-md xl:order-last xl:h-[40vh] xl:max-h-auto xl:sticky xl:top-4 xl:overflow-hidden border border-gray-200'>
                <DisplayMap
                  coord={[detail?.vehicle_route[0] || 0, detail?.vehicle_route[detail?.vehicle_route?.length - 1]]}
                  line={detail?.vehicle_route}
                />
              </div>
            </section>
            <section className='mt-5'>
              <EvaluateRouteDetail />
            </section>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={16}>
            <ContentRouteTab />
          </Col>
        </Row>
      </section>
    </div>
  )
}

export default React.memo<Props>(EvaluationRoute)
