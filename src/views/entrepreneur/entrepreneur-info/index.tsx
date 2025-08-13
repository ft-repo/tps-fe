/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-empty-pattern */
/* eslint-disable import/no-unresolved */
/* eslint-disable react-refresh/only-export-components */
import React, { useEffect } from 'react'
import ExecutiveDataScreen from '@/features/entrepreneur/entrepreneur-info/screen'
import { Loading } from '@/components/shared'
import { getContactType, getEntityType, useAppDispatch, useAppSelector } from '@/store'
import { getUserData } from '@/store/slices/entrepreneur'

interface Props {
}

const ExecutiveDataIndex: React.FC<Props> = (props) => {
  const { } = props
  const dispatch = useAppDispatch()
  const { loading } = useAppSelector(state => state.entrepreneur.user)
  const localLoad = useAppSelector(state => state.layout.loading)

  useEffect(() => {
    dispatch(getUserData())
    dispatch(getContactType())
    dispatch(getEntityType())
  }, [])

  return (
    <Loading loading={loading || localLoad}>
      <ExecutiveDataScreen />
    </Loading>
  )
}

export default React.memo<Props>(ExecutiveDataIndex)
