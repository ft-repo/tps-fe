import { Root } from '@/@types/entrepreneur/route-estimation'
import { memo, useEffect, useRef } from 'react'
import { Input, Space } from 'antd'
import { Control, Controller } from 'react-hook-form'

interface FormMapEstimationProps {
  control: Control<Root>
  setFirstPoint: (point: number[] | null) => void
  setSecondPoint: (point: number[] | null) => void
}

function FormMapEstimation(props: FormMapEstimationProps) {
  const { control, setFirstPoint, setSecondPoint } = props
  const firstPointTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const secondPointTimeoutRef = useRef<NodeJS.Timeout | null>(null)

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
    <div>
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
                      field.onChange(e)
                      if (firstPointTimeoutRef.current) {
                        clearTimeout(firstPointTimeoutRef.current)
                      }
                      firstPointTimeoutRef.current = setTimeout(() => {
                        setFirstPoint([
                          Number(e.target.value),
                          field.value[1] as unknown as number,
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
                      field.onChange(e)
                      if (firstPointTimeoutRef.current) {
                        clearTimeout(firstPointTimeoutRef.current)
                      }
                      firstPointTimeoutRef.current = setTimeout(() => {
                        setFirstPoint([
                          field.value[0] as unknown as number,
                          Number(e.target.value),
                        ])
                      }, 1000)
                    }}
                  />
                )
              }}
            />
          </Space.Compact>
          {/* <Input
                  {...field}
                  size="large"
                  placeholder="กรุณากรอก"
                  className="w-full"
                  onChange={(e) => {
                    if (firstPointTimeoutRef.current) {
                      clearTimeout(firstPointTimeoutRef.current)
                    }
                    firstPointTimeoutRef.current = setTimeout(() => {
                      setFirstPoint(e.target.value)
                    }, 1000)
                  }}
                /> */}
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
                      field.onChange(e)
                      if (secondPointTimeoutRef.current) {
                        clearTimeout(secondPointTimeoutRef.current)
                      }
                      secondPointTimeoutRef.current = setTimeout(() => {
                        setSecondPoint([
                          Number(e.target.value),
                          field.value[1] as unknown as number,
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
                      field.onChange(e)
                      if (secondPointTimeoutRef.current) {
                        clearTimeout(secondPointTimeoutRef.current)
                      }
                      secondPointTimeoutRef.current = setTimeout(() => {
                        setSecondPoint([
                          field.value[0] as unknown as number,
                          Number(e.target.value),
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
