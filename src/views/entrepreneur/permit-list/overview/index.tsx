import React, { useEffect } from 'react'
import PermitListScreen from '@/features/entrepreneur/permit-list/overview/screen'
import { useAppDispatch, useAppSelector } from '@/store'
import { fetchPermitList } from "@/store/slices/entrepreneur/permitSlice"

import { Loading } from '@/components/shared'

const OverviewIndex: React.FC = () => {
  const dispatch = useAppDispatch()
  // use your actual slice's loading flag:
  const loading = useAppSelector((s) => s.permit?.loading ?? false)


 // or s.layout.loading if that's your pattern

  useEffect(() => {
    dispatch(fetchPermitList({ page: 1, limit: 10 }))
  }, [dispatch])

  return (
    <Loading loading={loading}>
      <PermitListScreen />
    </Loading>
  )
}

export default React.memo(OverviewIndex)