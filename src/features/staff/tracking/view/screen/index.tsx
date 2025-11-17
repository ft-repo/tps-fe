/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React, { useEffect } from 'react'
import { Button } from 'antd'
import { ContentTracking } from '../components'
import { AiOutlineLeft } from 'react-icons/ai'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAppDispatch } from '@/store'
import { getGPSBusinessData } from '@/store/slices/staff/trackingSlice'

interface Props {

}

const ViewScreen: React.FC<Props> = (props) => {
  const { } = props
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const id = params.get("id")
  const dispatch = useAppDispatch()
  // const { loading } = useAppSelector(state => state.tracking)

  useEffect(() => {
    if (id) {
      dispatch(getGPSBusinessData(id))
    }
  }, [id, dispatch])

  // const renderContentTracking = useMemo(() => {
  //   if (id && !loading) {
  //     return <ContentTracking id={id} />
  //   } else {
  //     return <Spin spinning={loading} />
  //   }
  // }, [id, loading])

  return (
    <>
      <section>
        <Button
          type='text'
          icon={<AiOutlineLeft />}
          onClick={() => navigate(-1)}
        >
          ย้อนกลับ
        </Button>
      </section>
      <section className='mt-5'>
        <ContentTracking id={id} />
      </section>
    </>
  )
}

export default React.memo<Props>(ViewScreen)
