import { RouteEstimationRequest } from '@/@types/entrepreneur/route-estimation'
import { memo, useEffect, useRef } from 'react'
import { Input, Space } from 'antd'
import { Control, Controller, useWatch } from 'react-hook-form'

interface FormMapEstimationProps {
  className?: string
  control: Control<RouteEstimationRequest>
  setFirstPoint: (point: [number, number] | null) => void
  setSecondPoint: (point: [number, number] | null) => void
}

function FormMapEstimation(props: FormMapEstimationProps) {
  const { control, setFirstPoint, setSecondPoint, className } = props
  const firstPointTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const secondPointTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Watch current coordinate values to compute the paired point reliably
  const startLat = useWatch({ control, name: 'start_point.coordinates.0' })
  const startLng = useWatch({ control, name: 'start_point.coordinates.1' })
  const endLat = useWatch({ control, name: 'end_point.coordinates.0' })
  const endLng = useWatch({ control, name: 'end_point.coordinates.1' })

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

  return (
    <div className={className}>
      <h5>เส้นทาง</h5>
      <section className="grid grid-cols-2 gap-4 mb-5">
        <fieldset>
          <label>ต้นทาง</label>
          <Space.Compact size="large">
            <Controller
              name={`start_point.coordinates.0`}
              control={control}
              render={({ field }) => {
                return (
                  <Input
                    {...field}
                    placeholder="ละติจูด"
                    onChange={(e) => {
                      const newVal = Number(e.target.value)
                      field.onChange(newVal)
                      if (firstPointTimeoutRef.current) {
                        clearTimeout(firstPointTimeoutRef.current)
                      }
                      firstPointTimeoutRef.current = setTimeout(() => {
                        setFirstPoint([
                          newVal,
                          typeof startLng === 'number' ? startLng : Number(startLng) || 0,
                        ])
                      }, 1000)
                    }}
                  />
                )
              }}
            />
            <Controller
              name={`start_point.coordinates.1`}
              control={control}
              render={({ field }) => {
                return (
                  <Input
                    {...field}
                    placeholder="ลองติจูด"
                    onChange={(e) => {
                      const newVal = Number(e.target.value)
                      field.onChange(newVal)
                      if (firstPointTimeoutRef.current) {
                        clearTimeout(firstPointTimeoutRef.current)
                      }
                      firstPointTimeoutRef.current = setTimeout(() => {
                        setFirstPoint([
                          typeof startLat === 'number' ? startLat : Number(startLat) || 0,
                          newVal,
                        ])
                      }, 1000)
                    }}
                  />
                )
              }}
            />
          </Space.Compact>
        </fieldset>

        <fieldset>
          <label>ปลายทาง</label>
          <Space.Compact size="large">
            <Controller
              name={`end_point.coordinates.0`}
              control={control}
              render={({ field }) => {
                return (
                  <Input
                    {...field}
                    placeholder="ละติจูด"
                    onChange={(e) => {
                      const newVal = Number(e.target.value)
                      field.onChange(newVal)
                      if (secondPointTimeoutRef.current) {
                        clearTimeout(secondPointTimeoutRef.current)
                      }
                      secondPointTimeoutRef.current = setTimeout(() => {
                        setSecondPoint([
                          newVal,
                          typeof endLng === 'number' ? endLng : Number(endLng) || 0,
                        ])
                      }, 1000)
                    }}
                  />
                )
              }}
            />
            <Controller
              name={`end_point.coordinates.1`}
              control={control}
              render={({ field }) => {
                return (
                  <Input
                    {...field}
                    placeholder="ลองติจูด"
                    onChange={(e) => {
                      const newVal = Number(e.target.value)
                      field.onChange(newVal)
                      if (secondPointTimeoutRef.current) {
                        clearTimeout(secondPointTimeoutRef.current)
                      }
                      secondPointTimeoutRef.current = setTimeout(() => {
                        setSecondPoint([
                          typeof endLat === 'number' ? endLat : Number(endLat) || 0,
                          newVal,
                        ])
                      }, 1000)
                    }}
                  />
                )
              }}
            />
          </Space.Compact>
        </fieldset>
      </section>
    </div>
  )
}

export default memo(FormMapEstimation)
