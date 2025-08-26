import { RouteEstimationRequest } from '@/@types/entrepreneur/route-estimation'
import { VehicleDetailForRouteEstimation } from '@/@types/services/vehicle'
import { getVehicleByIDAPI } from '@/services/entrepreneur/VehicleListService'
import { setLoading, useAppDispatch, useAppSelector } from '@/store'
import { setVehicleDetailForRouteEstimation } from '@/store/slices/entrepreneur/vehicleListSlice'
import { Button, Input, Select } from 'antd'
import { memo, useCallback, useEffect, useState } from 'react'
import { Control, Controller, useWatch } from 'react-hook-form'

interface FormVehicleProps {
  vehicleType: number | null
  formIndex: number
  control: Control<RouteEstimationRequest>
  vehicleList: any
}

function FormVehicle(props: FormVehicleProps) {
  const { vehicleType, formIndex, control, vehicleList } = props
  const dispatch = useAppDispatch()
  const { signedIn } = useAppSelector((state) => state.auth.session)
  const [enableAddAxle, setEnableAddAxle] = useState<boolean>(true)
  const [enableRemoveAxle, setEnableRemoveAxle] = useState<boolean>(false)
  const [axles, setAxles] = useState<number>(4)
  const towingId = useWatch({ control, name: `vehicle.${formIndex}.towing_vehicle_id` })
  const semiTrailerId = useWatch({ control, name: `vehicle.${formIndex}.semi_trailer_vehicle_id` })
  const etcId = useWatch({ control, name: `vehicle.${formIndex}.etc_vehicle_id` })

  const addedAxle = useCallback(() => {
    if (axles >= 4 && axles < 7) {
      setAxles((prev) => prev + 1)
      setEnableRemoveAxle(true)
      if (axles + 1 >= 7) {
        setEnableAddAxle(false)
      }
    }
  }, [axles])

  const removedAxle = useCallback(() => {
    if (axles > 4 && axles <= 7) {
      setAxles((prev) => prev - 1)
      setEnableAddAxle(true)
      if (axles - 1 <= 4) {
        setEnableRemoveAxle(false)
      }
    }
  }, [axles])

  const getVehicleDetail = useCallback(async () => {
    const detailForRouteEstimation: VehicleDetailForRouteEstimation = {} as VehicleDetailForRouteEstimation
    dispatch(setLoading(true))

    if (towingId) {
      const towing = await getVehicleByIDAPI(towingId)
      detailForRouteEstimation.towing_vehicle_detail = towing.data
    }
    if (semiTrailerId) {
      const semiTrailer = await getVehicleByIDAPI(semiTrailerId)
      detailForRouteEstimation.semi_trailer_vehicle_detail = semiTrailer.data
    }
    if (etcId) {
      const etc = await getVehicleByIDAPI(etcId)
      detailForRouteEstimation.etc_vehicle_detail = etc.data
    }

    dispatch(setVehicleDetailForRouteEstimation(detailForRouteEstimation))
    dispatch(setLoading(false))
  }, [dispatch, towingId, semiTrailerId, etcId])

  useEffect(() => {
    getVehicleDetail()
  }, [getVehicleDetail, control])

  return (
    <section className="grid lg:grid-cols-3 gap-4">
      {signedIn && (vehicleType === 1 || vehicleType === 2 || vehicleType === 3) && (
        <div>
          <h5>รถลากจูง</h5>
          <Controller
            name={`vehicle.${formIndex}.towing_vehicle_id`}
            control={control}
            render={({ field }) => {
              return (
                <fieldset>
                  <label>เลขทะเบียน / เลขตัวรถ</label>
                  <Select
                    {...field}
                    placeholder="กรุณาเลือก"
                    options={vehicleList.data.data}
                    fieldNames={{
                      label: 'plate_no',
                      value: 'id',
                    }}
                    className="w-full"
                    size="large"
                    style={{
                      fontFamily: 'Noto Sans Thai',
                    }}
                    onChange={(value) => {
                      field.onChange(value)
                    }}
                  />
                </fieldset>
              )
            }}
          />
        </div>
      )}
      {signedIn && (vehicleType === 1 || vehicleType === 2) && (
        <div>
          <h5>รถกึ่งพ่วง</h5>
          <Controller
            name={`vehicle.${formIndex}.semi_trailer_vehicle_id`}
            control={control}
            render={({ field }) => {
              return (
                <fieldset>
                  <label>เลขทะเบียน / เลขตัวรถ</label>
                  <Select
                    {...field}
                    placeholder="กรุณาเลือก"
                    options={vehicleList.data.data}
                    fieldNames={{
                      label: 'plate_no',
                      value: 'id',
                    }}
                    className="w-full"
                    size="large"
                    style={{
                      fontFamily: 'Noto Sans Thai',
                    }}
                    onChange={(value) => {
                      field.onChange(value)
                    }}
                  />
                </fieldset>
              )
            }}
          />
        </div>
      )}
      {signedIn && vehicleType === 1 && (
        <div>
          <h5>สินค้า/เครื่องจักร</h5>
          <Controller
            name={`vehicle.${formIndex}.etc_vehicle_id`}
            control={control}
            render={({ field }) => {
              return (
                <fieldset>
                  <label>เลขทะเบียน / เลขตัวรถ</label>
                  <Select
                    {...field}
                    placeholder="กรุณาเลือก"
                    options={vehicleList.data.data}
                    fieldNames={{
                      label: 'plate_no',
                      value: 'id',
                    }}
                    className="w-full"
                    size="large"
                    style={{
                      fontFamily: 'Noto Sans Thai',
                    }}
                    onChange={(value) => {
                      field.onChange(value)
                    }}
                  />
                </fieldset>
              )
            }}
          />
        </div>
      )}

      {(vehicleType === 1 || vehicleType === 2 || vehicleType === 3) && (
        <div className="lg:col-span-3">
          <h5>น้ำหนักลงเพลา รถลากจูง (กิโลกรัม)</h5>
          <div className="grid grid-cols-2 xl:grid-cols-6 gap-4">
            <div className="xl:col-span-2">
              <Controller
                name={`vehicle.${formIndex}.towing_axis_weight.0`}
                control={control}
                render={({ field }) => {
                  return (
                    <fieldset>
                      <Input
                        {...field}
                        placeholder="เพลาที่ 1"
                        className="w-full"
                        size="large"
                        style={{
                          fontFamily: 'Noto Sans Thai',
                        }}
                        onChange={(e) => {
                          const newVal = Number(e.target.value)
                          field.onChange(newVal)
                        }}
                      />
                    </fieldset>
                  )
                }}
              />
            </div>
            <div className="xl:col-span-2">
              <Controller
                name={`vehicle.${formIndex}.towing_axis_weight.1`}
                control={control}
                render={({ field }) => {
                  return (
                    <fieldset>
                      <Input
                        {...field}
                        placeholder="เพลาที่ 2"
                        className="w-full"
                        size="large"
                        style={{
                          fontFamily: 'Noto Sans Thai',
                        }}
                        onChange={(e) => {
                          const newVal = Number(e.target.value)
                          field.onChange(newVal)
                        }}
                      />
                    </fieldset>
                  )
                }}
              />
            </div>
            <div className="xl:col-span-2">
              <Controller
                name={`vehicle.${formIndex}.towing_axis_weight.2`}
                control={control}
                render={({ field }) => {
                  return (
                    <fieldset>
                      <Input
                        {...field}
                        placeholder="เพลาที่ 3"
                        className="w-full"
                        size="large"
                        style={{
                          fontFamily: 'Noto Sans Thai',
                        }}
                        onChange={(e) => {
                          const newVal = Number(e.target.value)
                          field.onChange(newVal)
                        }}
                      />
                    </fieldset>
                  )
                }}
              />
            </div>
          </div>
        </div>
      )}
      {(vehicleType === 2 || vehicleType === 1) && (
        <div className="lg:col-span-3">
          <h5>น้ำหนักลงเพลา รถกึ่งพ่วง (กิโลกรัม)</h5>
          <div className="grid grid-cols-2 xl:grid-cols-8 gap-4">
            {Array.from({ length: axles }).map((_, index) => (
              <div key={index} className="xl:col-span-2">
                <Controller
                  name={
                    `vehicle.${formIndex}.semi_trailer_axis_weight.${index}`
                  }
                  control={control}
                  render={({ field }) => {
                    return (
                      <fieldset>
                        <Input
                          {...field}
                          placeholder={`เพลาที่ ${index + 1}`}
                          className="w-full"
                          size="large"
                          style={{
                            fontFamily: 'Noto Sans Thai',
                          }}
                          onChange={(e) => {
                            const newVal = Number(e.target.value)
                            field.onChange(newVal)
                          }}
                        />
                      </fieldset>
                    )
                  }}
                />
              </div>
            ))}
            <Button
              type="primary"
              disabled={!enableAddAxle}
              onClick={addedAxle}
            >
              เพิ่มเพลา
            </Button>
            <Button
              type="primary"
              danger={true}
              disabled={!enableRemoveAxle}
              onClick={removedAxle}
            >
              ลบเพลา
            </Button>
          </div>
        </div>
      )}
    </section>
  )
}

export default memo(FormVehicle)
