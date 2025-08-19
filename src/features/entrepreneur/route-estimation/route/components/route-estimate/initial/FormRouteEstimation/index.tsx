import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Control, Controller } from 'react-hook-form'
import { FieldType, FieldArray } from '@/@types/entrepreneur/route-estimation'
import CardVehicleDetails from '../CardVehicleDetails'
import VehicleSummary from '../VehicleSummary'
import { SUMMARY_DATA, VEHICLE_DATA } from '../../../../mock'
import { useAppDispatch, useAppSelector } from '@/store'
import { Input, Select } from 'antd'
import {
  clearVehicleList,
  getVehicleData,
} from '@/store/slices/entrepreneur/vehicleListSlice'
import RecoveryVehicleForm from './RecoveryVehicleForm'
import SemiTrailerForm from './SemiTrailerForm'
import MechanicalVehicleForm from './MechanicalVehicleForm'

interface Props {
  formItem: FieldArray
  formIndex: number
  control: Control<FieldType>
  setFirstPoint?: (point: [number, number]) => void
  setSecondPoint?: (point: [number, number]) => void
}

const FormRouteEstimation: React.FC<Props> = (props) => {
  const { formItem, formIndex, control, setFirstPoint, setSecondPoint } = props
  const dispatch = useAppDispatch()
  const { vehicle_type } = useAppSelector((state) => state.master)
  const { vehicleList } = useAppSelector((state) => state.entrepreneur)
  const firstPointTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const secondPointTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const [vehicleType, setVehicleType] = useState<number>(0)

  console.log(formItem)

  useEffect(() => {
    dispatch(clearVehicleList())
    dispatch(
      getVehicleData({
        vehicle_type_id: vehicleType,
        page: 1,
        limit: 1000,
      }),
    )
  }, [dispatch, vehicleType])

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (firstPointTimeoutRef.current) {
        clearTimeout(firstPointTimeoutRef.current)
      }
      if (secondPointTimeoutRef.current) {
        clearTimeout(secondPointTimeoutRef.current)
      }
    }
  }, [])

  const renderVehicleType = useMemo(() => {
    {
      switch (vehicleType) {
        case 1:
          return (
            <RecoveryVehicleForm
              formIndex={formIndex}
              control={control}
              vehicleList={vehicleList}
            />
          )
        case 2:
          return (
            <SemiTrailerForm
              formIndex={formIndex}
              control={control}
              vehicleList={vehicleList}
            />
          )
        case 3:
          return (
            <MechanicalVehicleForm
              formIndex={formIndex}
              control={control}
              vehicleList={vehicleList}
            />
          )
        default:
          return null
      }
    }
  }, [vehicleType, vehicleList])

  return (
    <>
      <section>
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <Controller
              name={
                `form_template.'${formIndex}.'vehicle_type` as `form_template.0.vehicle_type`
              }
              control={control}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>เลือกประเภทจับคู่</label>
                    <Select
                      {...field}
                      allowClear
                      placeholder="กรุณาเลือก"
                      options={vehicle_type}
                      fieldNames={{
                        label: 'name',
                        value: 'id',
                      }}
                      className="w-full"
                      size="large"
                      style={{
                        fontFamily: 'Noto Sans Thai',
                      }}
                      onChange={async (value) => {
                        field.onChange(value)
                        setVehicleType(Number(value))
                      }}
                    />
                  </fieldset>
                )
              }}
            />
          </div>
          <div>
            <Controller
              name={
                `form_template.'${formIndex}.'turn_radius` as `form_template.0.turn_radius`
              }
              control={control}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>รัศมีวงเลี้ยว</label>
                    <Input
                      {...field}
                      placeholder="กรุณาระบุ"
                      className="w-full"
                      size="large"
                      style={{
                        fontFamily: 'Noto Sans Thai',
                      }}
                    />
                  </fieldset>
                )
              }}
            />
          </div>
        </div>
      </section>
      <section className="mt-5">{renderVehicleType}</section>
      <section className="mt-5"></section>
      <section className="mt-5">
        <h5>เส้นทาง</h5>
        <div className="grid grid-cols-2 xl:grid-cols-8 gap-4">
          <div className="xl:col-span-4">
            <Controller
              name={
                `form_template.'${formIndex}.'start_route` as `form_template.0.start_route`
              }
              control={control}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>ต้นทาง</label>
                    <Input
                      {...field}
                      name={`form_template.'${formIndex}.${field.name}`}
                      placeholder="ต้นทาง"
                      className="w-full"
                      size="large"
                      style={{
                        fontFamily: 'Noto Sans Thai',
                      }}
                      onChange={(e) => {
                        field.onChange(e)
                        const [lat, lng] =
                          e.target.value.split(',').map(Number) ?? []

                        // Clear existing timeout
                        if (firstPointTimeoutRef.current) {
                          clearTimeout(firstPointTimeoutRef.current)
                        }

                        // Set new timeout for 500ms delay
                        firstPointTimeoutRef.current = setTimeout(() => {
                          setFirstPoint?.([lat, lng])
                        }, 500)
                      }}
                    />
                  </fieldset>
                )
              }}
            />
          </div>
          <div className="xl:col-span-4">
            <Controller
              name={
                `form_template.'${formIndex}.'end_route` as `form_template.0.end_route`
              }
              control={control}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>ปลายทาง</label>
                    <Input
                      {...field}
                      name={`form_template.'${formIndex}.${field.name}`}
                      placeholder="ปลายทาง"
                      className="w-full"
                      size="large"
                      style={{
                        fontFamily: 'Noto Sans Thai',
                      }}
                      onChange={(e) => {
                        field.onChange(e)
                        const [lat, lng] =
                          e.target.value.split(',').map(Number) ?? []

                        // Clear existing timeout
                        if (secondPointTimeoutRef.current) {
                          clearTimeout(secondPointTimeoutRef.current)
                        }

                        // Set new timeout for 500ms delay
                        secondPointTimeoutRef.current = setTimeout(() => {
                          setSecondPoint?.([lat, lng])
                        }, 500)
                      }}
                    />
                  </fieldset>
                )
              }}
            />
          </div>
        </div>
      </section>
      <section className="mt-5">
        <h5>รายละเอียด</h5>
        <section className="mb-3">
          <VehicleSummary data={SUMMARY_DATA} />
        </section>
        <section>
          <CardVehicleDetails data={VEHICLE_DATA} />
        </section>
      </section>
    </>
  )
}

export default React.memo<Props>(FormRouteEstimation)
