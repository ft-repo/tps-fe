/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React, { useState } from 'react'
import { FieldTypeForOther } from '@/@types/entrepreneur/route-estimation';
import { Control, Controller, FieldErrors, UseFormSetValue, useFormState, UseFormWatch, useWatch } from 'react-hook-form';
import { Col, Input, Row, Select } from 'antd';
import { useAppSelector } from '@/store';
import { VehicleDetail } from '@/services/master/MasterService';

interface Props {
  control: Control<FieldTypeForOther>;
  setValue: UseFormSetValue<FieldTypeForOther>;
  watch: UseFormWatch<FieldTypeForOther>;
  errors: FieldErrors<FieldTypeForOther>;
}

const FormVehicle: React.FC<Props> = (props) => {
  const { control, setValue } = props
  const { vehicle_selection } = useAppSelector(state => state.master)
  const [toweringVehicleWheel, setToweringVehicleWheel] = useState<number>(0)
  const [semiVehicleWheel, setSemiVehicleWheel] = useState<number>(0)

  const matchType = useWatch({
    control,
    name: 'match_type'
  })

  const { errors } = useFormState({ control })

  return (
    <div className='border-2 rounded-md p-4 mb-3'>
      <section>
        <h5>ข้อมูลยานพาหนะ</h5>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
            <Controller
              name='match_type'
              control={control}
              rules={{
                required: 'กรุณาเลือกเลือกประเภทจับคู่'
              }}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>เลือกประเภทจับคู่</label>
                    <Select
                      {...field}
                      allowClear
                      showSearch
                      placeholder='กรุณาเลือก'
                      options={[
                        {
                          label: 'รถลากจูง + รถกึ่งพ่วง + สินค้า / เครื่องจักร',
                          value: 1
                        },
                        {
                          label: 'รถลากจูง + รถกึ่งพ่วง',
                          value: 2
                        },
                        {
                          label: 'สินค้า / เครื่องจักร',
                          value: 3
                        },
                      ]}
                      className='w-full'
                      size='large'
                      style={{
                        fontFamily: 'Noto Sans Thai'
                      }}
                      onChange={(value) => {
                        field.onChange(value)
                        // ON VALUE CHANGE
                        setValue('towering_vehicle', null)
                        setValue('semi_trailer_vehicle', null)
                        setValue('etc_vehicle', null)
                        // ON STATE CHANGE
                        setToweringVehicleWheel(0)
                        setSemiVehicleWheel(0)
                      }}
                    />
                    {!!errors.match_type &&
                      <p className='text-red-500'>{errors.match_type.message}</p>
                    }
                  </fieldset>
                )
              }}
            />
          </Col>
          {(matchType === 1 || matchType === 2) ?
            <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8}>
              <Controller
                name='towering_vehicle'
                control={control}
                rules={{
                  required: 'กรุณาระบุเลขทะเบียน / เลขตัวรถ'
                }}
                render={({ field }) => {
                  return (
                    <fieldset>
                      <h5>รถลากจูง</h5>
                      <label>เลขทะเบียน / เลขตัวรถ</label>
                      <Select
                        {...field}
                        allowClear
                        showSearch
                        placeholder='กรุณาเลือก'
                        options={vehicle_selection.data.map(item => {
                          return item.vehicle_detail
                        })}
                        fieldNames={{
                          label: 'plate_no',
                          value: 'id'
                        }}
                        filterOption={(input, option) => {
                          return option ? option.plate_no.toLowerCase().indexOf(input.toLowerCase()) >= 0 : false;
                        }}
                        className='w-full'
                        size='large'
                        style={{
                          fontFamily: 'Noto Sans Thai'
                        }}
                        onChange={(value, option) => {
                          const axis: VehicleDetail | any = option
                          field.onChange(value)
                          if (!value) {
                            setToweringVehicleWheel(0)
                          } else {
                            setToweringVehicleWheel(axis.axis_number)
                          }
                        }}
                      />
                      {!!errors.towering_vehicle &&
                        <p className='text-red-500'>{errors.towering_vehicle.message}</p>
                      }
                    </fieldset>
                  )
                }}
              />
            </Col>
            : null}
          {(matchType === 1 || matchType === 2) ?
            <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8}>
              <Controller
                name='semi_trailer_vehicle'
                control={control}
                rules={{
                  required: 'กรุณาระบุเลขทะเบียน / เลขตัวรถ'
                }}
                render={({ field }) => {
                  return (
                    <fieldset>
                      <h5>รถกึ่งพ่วง</h5>
                      <label>เลขทะเบียน / เลขตัวรถ</label>
                      <Select
                        {...field}
                        allowClear
                        showSearch
                        placeholder='กรุณาเลือก'
                        options={vehicle_selection.data.map(item => {
                          return item.vehicle_detail
                        })} fieldNames={{
                          label: 'plate_no',
                          value: 'id'
                        }}
                        filterOption={(input, option) => {
                          return option ? option.plate_no.toLowerCase().indexOf(input.toLowerCase()) >= 0 : false;
                        }}
                        className='w-full'
                        size='large'
                        style={{
                          fontFamily: 'Noto Sans Thai'
                        }}
                        onChange={(value, option) => {
                          const axis: VehicleDetail | any = option
                          field.onChange(value)
                          if (!value) {
                            setSemiVehicleWheel(0)
                          } else {
                            setSemiVehicleWheel(axis.axis_number)
                          }
                        }}
                      />
                      {!!errors.semi_trailer_vehicle &&
                        <p className='text-red-500'>{errors.semi_trailer_vehicle.message}</p>
                      }
                    </fieldset>
                  )
                }}
              />
            </Col>
            : null}
          {(matchType === 1 || matchType === 3) ?
            <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8}>
              <Controller
                name='etc_vehicle'
                control={control}
                rules={{
                  required: 'กรุณาระบุชื่อสินค้า / เครื่องจักร'
                }}
                render={({ field }) => {
                  return (
                    <fieldset>
                      <h5>สินค้า / เครื่องจักร</h5>
                      <label>ชื่อสินค้า / เครื่องจักร</label>
                      <Select
                        {...field}
                        allowClear
                        showSearch
                        placeholder='กรุณาเลือก'
                        options={vehicle_selection.data.map(item => {
                          return item.vehicle_detail
                        })} fieldNames={{
                          label: 'plate_no',
                          value: 'id'
                        }}
                        filterOption={(input, option) => {
                          return option ? option.plate_no.toLowerCase().indexOf(input.toLowerCase()) >= 0 : false;
                        }}
                        className='w-full'
                        size='large'
                        style={{
                          fontFamily: 'Noto Sans Thai'
                        }}
                      />
                      {!!errors.etc_vehicle &&
                        <p className='text-red-500'>{errors.etc_vehicle.message}</p>
                      }
                    </fieldset>
                  )
                }}
              />
            </Col>
            : null}
        </Row>
      </section>
      {toweringVehicleWheel !== 0 ?
        <section className='mt-3'>
          <h5>น้ำหนักลงเพลา รถลากจูง (กิโลกรัม)</h5>
          <Row gutter={[16, 16]}>
            {toweringVehicleWheel >= 2 ?
              <>
                <Col xs={24} sm={24} md={12} lg={6} xl={6} xxl={6}>
                  <Controller
                    name='towering_weight1'
                    control={control}
                    rules={{
                      required: 'กรุณาระบุน้ำหนักลงเพลา (กิโลกรัม)'
                    }}
                    render={({ field }) => {
                      return (
                        <fieldset>
                          <Input
                            {...field}
                            name={field.name}
                            placeholder='กรุณาระบุ'
                            className='w-full'
                            size='large'
                            style={{
                              fontFamily: 'Noto Sans Thai'
                            }}
                            onChange={(e) => {
                              field.onChange(e.target.value.replace(/[^0-9.]/g, ""))
                            }}
                          />
                          {!!errors.towering_weight1 &&
                            <p className='text-red-500'>{errors.towering_weight1.message}</p>
                          }
                        </fieldset>
                      )
                    }}
                  />
                </Col>
                <Col xs={24} sm={24} md={12} lg={6} xl={6} xxl={6}>
                  <Controller
                    name='towering_weight2'
                    control={control}
                    rules={{
                      required: 'กรุณาระบุน้ำหนักลงเพลา (กิโลกรัม)'
                    }}
                    render={({ field }) => {
                      return (
                        <fieldset>
                          <Input
                            {...field}
                            name={field.name}
                            placeholder='กรุณาระบุ'
                            className='w-full'
                            size='large'
                            style={{
                              fontFamily: 'Noto Sans Thai'
                            }}
                            onChange={(e) => {
                              field.onChange(e.target.value.replace(/[^0-9.]/g, ""))
                            }}
                          />
                          {!!errors.towering_weight2 &&
                            <p className='text-red-500'>{errors.towering_weight2.message}</p>
                          }
                        </fieldset>
                      )
                    }}
                  />
                </Col>
                <Col xs={24} sm={24} md={12} lg={6} xl={6} xxl={6}>
                  <Controller
                    name='towering_weight3'
                    control={control}
                    rules={{
                      required: 'กรุณาระบุน้ำหนักลงเพลา (กิโลกรัม)'
                    }}
                    render={({ field }) => {
                      return (
                        <fieldset>
                          <Input
                            {...field}
                            name={field.name}
                            placeholder='กรุณาระบุ'
                            className='w-full'
                            size='large'
                            style={{
                              fontFamily: 'Noto Sans Thai'
                            }}
                            onChange={(e) => {
                              field.onChange(e.target.value.replace(/[^0-9.]/g, ""))
                            }}
                          />
                          {!!errors.towering_weight3 &&
                            <p className='text-red-500'>{errors.towering_weight3.message}</p>
                          }
                        </fieldset>
                      )
                    }}
                  />
                </Col>
                <Col xs={24} sm={24} md={12} lg={6} xl={6} xxl={6}>
                  <Controller
                    name='towering_weight4'
                    control={control}
                    rules={{
                      required: 'กรุณาระบุน้ำหนักลงเพลา (กิโลกรัม)'
                    }}
                    render={({ field }) => {
                      return (
                        <fieldset>
                          <Input
                            {...field}
                            name={field.name}
                            placeholder='กรุณาระบุ'
                            className='w-full'
                            size='large'
                            style={{
                              fontFamily: 'Noto Sans Thai'
                            }}
                            onChange={(e) => {
                              field.onChange(e.target.value.replace(/[^0-9.]/g, ""))
                            }}
                          />
                          {!!errors.towering_weight4 &&
                            <p className='text-red-500'>{errors.towering_weight4.message}</p>
                          }
                        </fieldset>
                      )
                    }}
                  />
                </Col>
              </>
              : null}
            {toweringVehicleWheel >= 5 ?
              <Col xs={24} sm={24} md={12} lg={6} xl={6} xxl={6}>
                <Controller
                  name='towering_weight5'
                  control={control}
                  rules={{
                    required: 'กรุณาระบุน้ำหนักลงเพลา (กิโลกรัม)'
                  }}
                  render={({ field }) => {
                    return (
                      <fieldset>
                        <Input
                          {...field}
                          name={field.name}
                          placeholder='กรุณาระบุ'
                          className='w-full'
                          size='large'
                          style={{
                            fontFamily: 'Noto Sans Thai'
                          }}
                          onChange={(e) => {
                            field.onChange(e.target.value.replace(/[^0-9.]/g, ""))
                          }}
                        />
                        {!!errors.towering_weight5 &&
                          <p className='text-red-500'>{errors.towering_weight5.message}</p>
                        }
                      </fieldset>
                    )
                  }}
                />
              </Col>
              : null}
            {toweringVehicleWheel >= 6 ?
              <Col xs={24} sm={24} md={12} lg={6} xl={6} xxl={6}>
                <Controller
                  name='towering_weight6'
                  control={control}
                  rules={{
                    required: 'กรุณาระบุน้ำหนักลงเพลา (กิโลกรัม)'
                  }}
                  render={({ field }) => {
                    return (
                      <fieldset>
                        <Input
                          {...field}
                          name={field.name}
                          placeholder='กรุณาระบุ'
                          className='w-full'
                          size='large'
                          style={{
                            fontFamily: 'Noto Sans Thai'
                          }}
                          onChange={(e) => {
                            field.onChange(e.target.value.replace(/[^0-9.]/g, ""))
                          }}
                        />
                        {!!errors.towering_weight6 &&
                          <p className='text-red-500'>{errors.towering_weight6.message}</p>
                        }
                      </fieldset>
                    )
                  }}
                />
              </Col>
              : null}
            {toweringVehicleWheel >= 7 ?
              <Col xs={24} sm={24} md={12} lg={6} xl={6} xxl={6}>
                <Controller
                  name='towering_weight7'
                  control={control}
                  rules={{
                    required: 'กรุณาระบุน้ำหนักลงเพลา (กิโลกรัม)'
                  }}
                  render={({ field }) => {
                    return (
                      <fieldset>
                        <Input
                          {...field}
                          name={field.name}
                          placeholder='กรุณาระบุ'
                          className='w-full'
                          size='large'
                          style={{
                            fontFamily: 'Noto Sans Thai'
                          }}
                          onChange={(e) => {
                            field.onChange(e.target.value.replace(/[^0-9.]/g, ""))
                          }}
                        />
                        {!!errors.towering_weight7 &&
                          <p className='text-red-500'>{errors.towering_weight7.message}</p>
                        }
                      </fieldset>
                    )
                  }}
                />
              </Col>
              : null}
          </Row>
        </section>
        : null}
      {semiVehicleWheel !== 0 ?
        <section className='mt-3'>
          <h5>น้ำหนักลงเพลา รถกึ่งพ่วง (กิโลกรัม)</h5>
          <Row gutter={[16, 16]}>
            {semiVehicleWheel >= 4 ?
              <>
                <Col xs={24} sm={24} md={12} lg={6} xl={6} xxl={6}>
                  <Controller
                    name='semi_weight1'
                    control={control}
                    rules={{
                      required: 'กรุณาระบุน้ำหนักลงเพลา (กิโลกรัม)'
                    }}
                    render={({ field }) => {
                      return (
                        <fieldset>
                          <Input
                            {...field}
                            name={field.name}
                            placeholder='กรุณาระบุ'
                            className='w-full'
                            size='large'
                            style={{
                              fontFamily: 'Noto Sans Thai'
                            }}
                            onChange={(e) => {
                              field.onChange(e.target.value.replace(/[^0-9.]/g, ""))
                            }}
                          />
                          {!!errors.semi_weight1 &&
                            <p className='text-red-500'>{errors.semi_weight1.message}</p>
                          }
                        </fieldset>
                      )
                    }}
                  />
                </Col>
                <Col xs={24} sm={24} md={12} lg={6} xl={6} xxl={6}>
                  <Controller
                    name='semi_weight6'
                    control={control}
                    rules={{
                      required: 'กรุณาระบุน้ำหนักลงเพลา (กิโลกรัม)'
                    }}
                    render={({ field }) => {
                      return (
                        <fieldset>
                          <Input
                            {...field}
                            name={field.name}
                            placeholder='กรุณาระบุ'
                            className='w-full'
                            size='large'
                            style={{
                              fontFamily: 'Noto Sans Thai'
                            }}
                            onChange={(e) => {
                              field.onChange(e.target.value.replace(/[^0-9.]/g, ""))
                            }}
                          />
                          {!!errors.semi_weight2 &&
                            <p className='text-red-500'>{errors.semi_weight2.message}</p>
                          }
                        </fieldset>
                      )
                    }}
                  />
                </Col>
                <Col xs={24} sm={24} md={12} lg={6} xl={6} xxl={6}>
                  <Controller
                    name='towering_weight7'
                    control={control}
                    rules={{
                      required: 'กรุณาระบุน้ำหนักลงเพลา (กิโลกรัม)'
                    }}
                    render={({ field }) => {
                      return (
                        <fieldset>
                          <Input
                            {...field}
                            name={field.name}
                            placeholder='กรุณาระบุ'
                            className='w-full'
                            size='large'
                            style={{
                              fontFamily: 'Noto Sans Thai'
                            }}
                            onChange={(e) => {
                              field.onChange(e.target.value.replace(/[^0-9.]/g, ""))
                            }}
                          />
                          {!!errors.towering_weight7 &&
                            <p className='text-red-500'>{errors.towering_weight7.message}</p>
                          }
                        </fieldset>
                      )
                    }}
                  />
                </Col>
                <Col xs={24} sm={24} md={12} lg={6} xl={6} xxl={6}>
                  <Controller
                    name='semi_weight4'
                    control={control}
                    rules={{
                      required: 'กรุณาระบุน้ำหนักลงเพลา (กิโลกรัม)'
                    }}
                    render={({ field }) => {
                      return (
                        <fieldset>
                          <Input
                            {...field}
                            name={field.name}
                            placeholder='กรุณาระบุ'
                            className='w-full'
                            size='large'
                            style={{
                              fontFamily: 'Noto Sans Thai'
                            }}
                            onChange={(e) => {
                              field.onChange(e.target.value.replace(/[^0-9.]/g, ""))
                            }}
                          />
                          {!!errors.semi_weight4 &&
                            <p className='text-red-500'>{errors.semi_weight4.message}</p>
                          }
                        </fieldset>
                      )
                    }}
                  />
                </Col>
              </>
              : null}
            {semiVehicleWheel >= 5 ?
              <Col xs={24} sm={24} md={12} lg={6} xl={6} xxl={6}>
                <Controller
                  name='semi_weight5'
                  control={control}
                  rules={{
                    required: 'กรุณาระบุน้ำหนักลงเพลา (กิโลกรัม)'
                  }}
                  render={({ field }) => {
                    return (
                      <fieldset>
                        <Input
                          {...field}
                          name={field.name}
                          placeholder='กรุณาระบุ'
                          className='w-full'
                          size='large'
                          style={{
                            fontFamily: 'Noto Sans Thai'
                          }}
                          onChange={(e) => {
                            field.onChange(e.target.value.replace(/[^0-9.]/g, ""))
                          }}
                        />
                        {!!errors.semi_weight5 &&
                          <p className='text-red-500'>{errors.semi_weight5.message}</p>
                        }
                      </fieldset>
                    )
                  }}
                />
              </Col>
              : null}
            {semiVehicleWheel >= 6 ?
              <Col xs={24} sm={24} md={12} lg={6} xl={6} xxl={6}>
                <Controller
                  name='semi_weight6'
                  control={control}
                  rules={{
                    required: 'กรุณาระบุน้ำหนักลงเพลา (กิโลกรัม)'
                  }}
                  render={({ field }) => {
                    return (
                      <fieldset>
                        <Input
                          {...field}
                          name={field.name}
                          placeholder='กรุณาระบุ'
                          className='w-full'
                          size='large'
                          style={{
                            fontFamily: 'Noto Sans Thai'
                          }}
                          onChange={(e) => {
                            field.onChange(e.target.value.replace(/[^0-9.]/g, ""))
                          }}
                        />
                        {!!errors.semi_weight6 &&
                          <p className='text-red-500'>{errors.semi_weight6.message}</p>
                        }
                      </fieldset>
                    )
                  }}
                />
              </Col>
              : null}
            {semiVehicleWheel >= 7 ?
              <Col xs={24} sm={24} md={12} lg={6} xl={6} xxl={6}>
                <Controller
                  name='semi_weight7'
                  control={control}
                  rules={{
                    required: 'กรุณาระบุน้ำหนักลงเพลา (กิโลกรัม)'
                  }}
                  render={({ field }) => {
                    return (
                      <fieldset>
                        <Input
                          {...field}
                          name={field.name}
                          placeholder='กรุณาระบุ'
                          className='w-full'
                          size='large'
                          style={{
                            fontFamily: 'Noto Sans Thai'
                          }}
                          onChange={(e) => {
                            field.onChange(e.target.value.replace(/[^0-9.]/g, ""))
                          }}
                        />
                        {!!errors.semi_weight7 &&
                          <p className='text-red-500'>{errors.semi_weight7.message}</p>
                        }
                      </fieldset>
                    )
                  }}
                />
              </Col>
              : null}
          </Row>
        </section>
        : null}
    </div >
  )
}

export default React.memo<Props>(FormVehicle)
