/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import { useAppSelector } from '@/store'
import { Button } from 'antd'
import React from 'react'
import { useRouteContext } from '../../context'
import ContentTab from '../route-estimate/result/ContentTab'

interface Props {

}

const EstimateResult: React.FC<Props> = (props) => {
  const { } = props
  const { loading } = useAppSelector(state => state.layout)
  const { setStep } = useRouteContext()

  return (
    <main>
      <section className='flex justify-between items-center flex-wrap gap-5 mb-5'>
        <h3>ขออนุญาตหมวด 2 (นอกเหนือ 4 - 7 เพลา)</h3>
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
        <ContentTab />
      </section>
    </main>
  )
}

export default React.memo<Props>(EstimateResult)
