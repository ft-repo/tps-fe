/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React, { useCallback, useEffect, useState } from 'react'
import { Button, Col, message, Row, Spin } from 'antd';
import { ContentForm, ContentPreviewPDF } from '../components'
import { AiOutlineLeft } from 'react-icons/ai';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { setLoading, useAppDispatch, useAppSelector } from '@/store';
import { getUploadAPI } from '@/services/entrepreneur/VehicleListService';
import { getPetitionStatus } from '@/store/slices/staff';

interface Props {

}

const PermitScreen: React.FC<Props> = (props) => {
  const { } = props
  const [params] = useSearchParams()
  const petitionId = params.get('petition_id')
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { petition_status, loading } = useAppSelector(state => state.staff.petition)
  // STATE
  const [url, setUrl] = useState<string>('')

  useEffect(() => {
    dispatch(getPetitionStatus({ petition_id: String(petitionId) }))
  }, [dispatch, petitionId])

  const extractUrl = useCallback((url: string) => {
    const path = url.split('/upload')[1];
    return path
  }, []);

  const fetchImage = useCallback(async (imgUrl: string) => {
    dispatch(setLoading(true))
    try {
      const response = await getUploadAPI(imgUrl)
      if (response.status === 200) {
        const blobFile = new Blob([response.data], { type: response.data.type })
        const url = URL.createObjectURL(blobFile)
        setUrl(url)
      }
    } catch (error) {
      if (error instanceof Error) {
        message.error(error.message)
      } else {
        console.error(error)
      }
    } finally {
      dispatch(setLoading(false))
    }
  }, [dispatch])

  useEffect(() => {
    if (petition_status[4]?.document_url) {
      fetchImage(extractUrl(petition_status[4]?.document_url))
    }
  }, [fetchImage, extractUrl, petition_status])

  return (
    <Spin spinning={loading}>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={24} lg={24} xl={12} xxl={12}>
          <section>
            <Button
              type='text'
              icon={<AiOutlineLeft />}
              onClick={() => navigate('/request-list/overview')}
            >
              ย้อนกลับ
            </Button>
          </section>
          <section>
            <h3>นำเข้าใบอนุญาต</h3>
          </section>
          <section className='mt-5'>
            {!loading ?
              <ContentForm
                setUrl={setUrl}
              />
              : null}
          </section>
        </Col>
        <Col xs={24} sm={24} md={24} lg={24} xl={12} xxl={12}>
          {!loading ?
            <ContentPreviewPDF
              url={url}
            />
            : null}
        </Col>
      </Row>
    </Spin>
  )
}

export default React.memo<Props>(PermitScreen)
