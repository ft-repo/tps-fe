/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React, { useEffect } from 'react'
import { ContentDetail, ContentForm } from '../components'
import { EstimateRouteSubDetail } from '@/@types/reducer/petition';
import { useAppSelector } from '@/store';
import { useRouteContext } from '../context';

interface Props {
  index: number;
  item: EstimateRouteSubDetail;
}

const ContentRoute: React.FC<Props> = (props) => {
  const { index, item } = props
  const { loading } = useAppSelector(state => state.staff.petition)
  const { setIndex, setItem } = useRouteContext()

  useEffect(() => {
    setIndex(index)
    setItem(item)
  }, [index, item, setIndex, setItem])

  return (
    <>
      <section>
        <ContentDetail
          item={item}
        />
      </section>
      <section className='mt-5'>
        {!loading ?
          <ContentForm />
          : null}
      </section>
    </>
  )
}

export default React.memo<Props>(ContentRoute)
