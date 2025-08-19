/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React, { useCallback, useEffect } from 'react'
import { FormSearchPetitionExtended, TablePetitionExtended } from '../components'
import { setLoading, useAppDispatch, useAppSelector } from '@/store'
import { getAdminPetitionExtendedData, setAdminPetitionExtendedData } from '@/store/slices/staff'
import type { FieldType } from './FormSearchPetition'

interface Props { }

const ContentPetitionExtended: React.FC<Props> = (_props) => {
  const dispatch = useAppDispatch()

  // ⬇️ ตาม state structure เดิม: state.staff.petition มีทั้ง petition และ petition_extended
  const { petition_extended, loading } = useAppSelector(state => state.staff.petition)

  // ⬇️ โหลดข้อมูลครั้งแรก + เมื่อ search params ของ extended เปลี่ยน
  useEffect(() => {
    dispatch(getAdminPetitionExtendedData(petition_extended.overview.search))
  }, [dispatch, petition_extended.overview.search])

  // ⬇️ เปลี่ยนหน้า/จำนวนต่อหน้า
  const handleTableChange = useCallback((page: number, limit: number) => {
    dispatch(setLoading(true))
    try {
      dispatch(setAdminPetitionExtendedData({
        params: {
          ...petition_extended.overview.search,
          page,
          limit,
        },
        data: { ...petition_extended.overview.data },
      }))
    } finally {
      dispatch(setLoading(false))
    }
  }, [dispatch, petition_extended.overview])

  // ⬇️ ค้นหา
  const handleSearch = useCallback((value: FieldType) => {
    dispatch(setLoading(true))
    try {
      dispatch(setAdminPetitionExtendedData({
        params: {
          ...petition_extended.overview.search,
          ...value,
          page: 1, // รีเซ็ตหน้าแรกเมื่อเปลี่ยนเงื่อนไขค้นหา
        },
        data: { ...petition_extended.overview.data },
      }))
    } finally {
      dispatch(setLoading(false))
    }
  }, [dispatch, petition_extended.overview])

  return (
    <div>
      <h3>รายการขออนุญาตรถหมวด 2 นอกเหนือ (4 - 7 เพลา)</h3>

      <section className="mt-5">
        <FormSearchPetitionExtended handleSearch={handleSearch} />
      </section>

      <section className="mt-5">
        <TablePetitionExtended
          data={petition_extended.overview.data}
          loading={loading}
          handleTableChange={handleTableChange}
        />
      </section>
    </div>
  )
}

export default React.memo<Props>(ContentPetitionExtended)
