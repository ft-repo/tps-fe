/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import { useAppSelector } from '@/store'
import { Button, Col, Row } from 'antd'
import React from 'react'
import { useRouteContext } from '../../context'
import ContentTab from '../route-estimate/result/ContentTab'
import ContentRouteList from '../route-estimate/result/ContentRouteList'
import DisplayMap from '../map/DisplayMap'
// import Map from '../map/Map'

interface Props {

}

const EstimateResult: React.FC<Props> = (props) => {
  const { } = props
  const { loading } = useAppSelector(state => state.layout)
  const { estimate } = useAppSelector(state => state.entrepreneur.permitList)
  const { setStep, index, item } = useRouteContext()
  const detail = estimate.detail

  return (
    <main>
      <section className='flex justify-between items-center flex-wrap gap-5 mb-5'>
        <h3>ขออนุญาตหมวด 2 (4 - 7 เพลา)</h3>
        <div className='flex items-center gap-3'>
          <Button
            disabled={loading}
            htmlType='button'
            type='default'
            // size='large'
            className='w-full lg:w-auto'
            onClick={() => setStep((prev: number) => prev - 1)}
          >
            ย้อนกลับ
          </Button>
          <Button
            loading={loading}
            htmlType='submit'
            type='primary'
            // size='large'
            className='w-full lg:w-auto'
            onClick={() => setStep((prev: number) => prev + 1)}
          >
            ขอใบนุญาต
          </Button>
        </div>
      </section>
      <section className='mt-5'>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={12}>
            <ContentTab />
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={12}>
            <div className='order-first z-0 h-[50vh] block rounded-md xl:order-last xl:h-[77vh] xl:max-h-auto xl:sticky xl:top-4 xl:overflow-hidden border border-gray-200'>
              <DisplayMap
                coord={[detail?.start_point || 0, detail?.end_point || 0]}
                line={detail?.vehicle_route}
              />
            </div>
          </Col>
        </Row>
      </section>
      <hr className='my-5' />
      <section>
        <h3>รายการประเมินเส้นทาง</h3>
        <section className='mt-3'>
          <ContentRouteList
            item={item}
            index={index}
          />
        </section>
      </section>
    </main>
  )
}

export default React.memo<Props>(EstimateResult)
