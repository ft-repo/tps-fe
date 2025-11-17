/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Col, Row, Tag } from 'antd'
import { ContentDetail, FormSearchMap, UserInfoDetail, ProjectList, TrackingMap, UserFullDetail } from '../components'
import { useAppDispatch, useAppSelector } from '@/store';
import { getGPSBusinessDetailData, resetTrackingBusinessDetail } from '@/store/slices/staff/trackingSlice';
import axios from 'axios';
import { APIResponseRegion } from '@/@types/shared';
import { useViewContext } from '../context';

interface Props {
  id: string | null;
}

const ContentTracking: React.FC<Props> = (props) => {
  const { id } = props
  const [projectId, setProjectId] = useState<number | null>(null)
  const { detail } = useAppSelector(state => state.tracking)
  const dispatch = useAppDispatch()
  const { item } = useViewContext()
  const [currentProvince, setCurrentProvince] = useState<string>('')

  useEffect(() => {
    if (id && projectId) {
      dispatch(getGPSBusinessDetailData({ business_id: id, project_id: projectId }))
    } else {
      dispatch(resetTrackingBusinessDetail())
    }
  }, [dispatch, id, projectId])

  const renderDetail = useMemo(() => {
    if (projectId) {
      return (
        <>
          <UserFullDetail />
          <ContentDetail />
        </>
      )
    }
    return (
      <>
        <UserInfoDetail />
        <ProjectList
          setProjectId={setProjectId}
        />
      </>
    )
  }, [projectId])

  const getRegion = useCallback(async (lat: number, lng: number) => {
    try {
      const response = await axios.get<APIResponseRegion>(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=th`)
      if (response.status === 200) {
        setCurrentProvince(response.data.principalSubdivision)
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      } else {
        console.error(error)
      }
    }
  }, [])

  useEffect(() => {
    getRegion(item.gps.geom[1], item.gps.geom[0])
  }, [getRegion, item.gps.geom])

  return (
    <div>
      <h3>ติดตามการเดินรถ</h3>
      <section className='mt-3'>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={14}>
            <FormSearchMap
              setProjectId={setProjectId}
            />
          </Col>
        </Row>
      </section>
      <section className='mt-5'>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={14}>
            <div className='order-first z-0 h-[50vh] block rounded-md xl:order-last xl:h-[50vh] xl:max-h-auto xl:sticky xl:top-4 xl:overflow-hidden border border-gray-200'>
              <TrackingMap
                coord={item.gps.geom ? [[item.gps.geom[0], item.gps.geom[1]]] : [[]]}
                line={detail.business_detail.road_details.route ? detail.business_detail.road_details.route : [[]]}
              />
            </div>
            {projectId ? <>
              <div className='mt-3 px-3 py-4 bg-[#145D89] rounded-md'>
                <div className='flex items-center justify-between'>
                  <p className='text-white'>{detail.business_detail.road_details.project_name}</p>
                  <Tag color={item.gps.is_show ? "#47BAA3" : ""} className='!p-1'>{item.gps.is_show ? 'อยู่ในเส้นทาง' : 'ออกนอกเส้นทาง'}</Tag>
                </div>
              </div>
              <div className='mt-3 p-3 bg-[#5A9BC3] rounded-md'>
                <p className='text-white'>ตำแหน่งปัจจุบัน : {currentProvince}</p>
              </div>
            </> : null}
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={10}>
            {renderDetail}
          </Col>
        </Row>
      </section>
    </div>
  )
}

export default React.memo<Props>(ContentTracking)
