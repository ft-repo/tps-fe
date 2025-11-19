/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Col, Row, Spin, Tag } from 'antd'
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
  const { detail, loading } = useAppSelector(state => state.tracking)
  const dispatch = useAppDispatch()
  const { item } = useViewContext()
  const [currentProvince, setCurrentProvince] = useState<string>('')
  const [isFirstClick, setIsFirstClick] = useState<boolean>(false)

  useEffect(() => {
    if (id && projectId) {
      dispatch(getGPSBusinessDetailData({ business_id: id, project_id: projectId }))
      setIsFirstClick(true)
    } else {
      dispatch(resetTrackingBusinessDetail())
      setIsFirstClick(false)
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
    if (item.gps.geom[1] && item.gps.geom[0]) {
      getRegion(item.gps.geom[1], item.gps.geom[0])
    }
  }, [getRegion, item.gps.geom])

  const renderSubDetail = useMemo(() => {
    if (projectId) {
      return (
        <>
          <div className='mt-3 px-3 py-4 bg-[#145D89] rounded-md'>
            <div className='flex items-center justify-between'>
              <p className='text-white'>{detail.business_detail.road_details.project_name}</p>
              <Tag color={item.gps.is_show ? "#47BAA3" : "#FF0000"} className='!p-1'>{item.gps.is_show ? 'อยู่ในเส้นทาง' : 'ไม่อยู่ในเส้นทาง'}</Tag>
            </div>
          </div>
          <div className='mt-3 p-3 bg-[#5A9BC3] rounded-md'>
            <p className='text-white'>ตำแหน่งปัจจุบัน : {currentProvince}</p>
          </div>
        </>
      )
    }
  }, [currentProvince, detail.business_detail.road_details.project_name, item.gps.is_show, projectId])

  return (
    <Spin spinning={loading}>
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
                line={detail.business_detail.road_details.route ? detail.business_detail.road_details.route : [[]]}
                apiData={detail}
                projectId={projectId}
                setProjectId={setProjectId}
                isFirstClick={isFirstClick}
              />
            </div>
            {renderSubDetail}
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={10}>
            {renderDetail}
          </Col>
        </Row>
      </section>
    </Spin>
  )
}

export default React.memo<Props>(ContentTracking)
