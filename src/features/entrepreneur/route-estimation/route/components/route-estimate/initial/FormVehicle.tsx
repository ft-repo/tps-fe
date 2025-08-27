/* eslint-disable react-refresh/only-export-components */
import { FieldTypeArr, FieldTypeForRoute } from '@/@types/entrepreneur/route-estimation';
import { useAppSelector } from '@/store';
import { Card, Col, Image, Input, Row, Select } from 'antd';
import React, { useMemo, useState } from 'react'
import { Control, Controller, UseFormSetValue, useFormState, useWatch } from 'react-hook-form';
import { VehicleDetail } from '@/services/master/MasterService';

interface Props {
  formItem: FieldTypeForRoute;
  formIndex: number;
  control: Control<FieldTypeArr>;
  setValue: UseFormSetValue<FieldTypeArr>;
}

interface PropertieState {
  id: number;
  vehicle_type_name: string;
  plate_no: string;
  plate_province: string;
  weight: number;
  width: number;
  length: number;
  height: number;
  axis_number: number;
}

const INIT_VALUE: PropertieState = {
  id: 0,
  vehicle_type_name: '',
  plate_no: '',
  plate_province: '',
  weight: 0,
  width: 0,
  length: 0,
  height: 0,
  axis_number: 0,
}

const FormVehicle: React.FC<Props> = (props) => {
  const { formIndex, control, setValue } = props
  const { vehicle_selection } = useAppSelector(state => state.master)
  // WHEEL
  const [toweringVehicleWheel, setToweringVehicleWheel] = useState<number>(0)
  const [semiVehicleWheel, setSemiVehicleWheel] = useState<number>(0)
  // WEIGHT
  const [towingProperties, setTowingProperties] = useState<PropertieState>(INIT_VALUE)
  const [semiProperties, setSemiProperties] = useState<PropertieState>(INIT_VALUE)
  const [etcProperties, setEtcProperties] = useState<PropertieState>(INIT_VALUE)

  const {
    match_type,
    towering_vehicle,
    semi_trailer_vehicle,
    etc_vehicle,
    towering_weight1,
    towering_weight2,
    towering_weight3,
    towering_weight4,
    towering_weight5,
    towering_weight6,
    towering_weight7,
    semi_weight1,
    semi_weight2,
    semi_weight3,
    semi_weight4,
    semi_weight5,
    semi_weight6,
    semi_weight7,
  } = useWatch({ control, name: `route_form.${formIndex}` })

  const { errors } = useFormState({ control })

  const columns = useMemo(() => {
    if (match_type === 1 || match_type === 3) {
      return {
        xs: 24,
        sm: 24,
        md: 24,
        lg: 16,
        xl: 16,
        xxl: 16
      }
    }
    return {
      xs: 24,
      sm: 24,
      md: 24,
      lg: 24,
      xl: 24,
      xxl: 24
    }
  }, [match_type])

  const selectTowing = vehicle_selection.data.find(item => item.vehicle_detail.id === towering_vehicle) || null
  const selectSemi = vehicle_selection.data.find(item => item.vehicle_detail.id === semi_trailer_vehicle) || null
  const selectETC = vehicle_selection.data.find(item => item.vehicle_detail.id === etc_vehicle) || null

  return (
    <>
      <section>
        <h5>ข้อมูลยานพาหนะ</h5>
        <Row gutter={[16, 16]}>
          <Col {...columns}>
            <Controller
              name={`route_form.${formIndex}.match_type`}
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
                        setValue(`route_form.${formIndex}.towering_vehicle`, null)
                        setValue(`route_form.${formIndex}.semi_trailer_vehicle`, null)
                        setValue(`route_form.${formIndex}.etc_vehicle`, null)
                        // ON STATE CHANGE
                        setToweringVehicleWheel(0)
                        setSemiVehicleWheel(0)
                      }}
                    />
                    {!!errors.route_form?.[formIndex]?.match_type &&
                      <p className='text-red-500'>{errors.route_form[formIndex].match_type.message}</p>
                    }
                  </fieldset>
                )
              }}
            />
          </Col>
          {(match_type === 1 || match_type === 3) ?
            <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8}>
              <Controller
                name={`route_form.${formIndex}.turn_radius`}
                control={control}
                rules={{
                  required: 'กรุณาระบุรัศมีวงเลี้ยว (เมตร)'
                }}
                render={({ field }) => {
                  return (
                    <fieldset>
                      <label>รัศมีวงเลี้ยว (เมตร)</label>
                      <Input
                        {...field}
                        name={field.name}
                        placeholder='กรุณาระบุ'
                        className='w-full'
                        size='large'
                        style={{
                          fontFamily: 'Noto Sans Thai'
                        }}
                        suffix='เมตร'
                        onChange={(e) => {
                          field.onChange(e.target.value.replace(/[^0-9.]/g, ""))
                        }}
                      />
                      {!!errors.route_form?.[formIndex]?.turn_radius &&
                        <p className='text-red-500'>{errors.route_form[formIndex].turn_radius.message}</p>
                      }
                    </fieldset>
                  )
                }}
              />
            </Col>
            : null}
          {(match_type === 1 || match_type === 2) ?
            <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8}>
              <Controller
                name={`route_form.${formIndex}.towering_vehicle`}
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
                            setTowingProperties(INIT_VALUE)
                          } else {
                            setToweringVehicleWheel(axis.axis_number)
                            setTowingProperties(axis)

                          }
                        }}
                      />
                      {!!errors.route_form?.[formIndex]?.towering_vehicle &&
                        <p className='text-red-500'>{errors.route_form[formIndex].towering_vehicle.message}</p>
                      }
                    </fieldset>
                  )
                }}
              />
            </Col>
            : null}
          {(match_type === 1 || match_type === 2) ?
            <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8}>
              <Controller
                name={`route_form.${formIndex}.semi_trailer_vehicle`}
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
                            setSemiProperties(INIT_VALUE)
                          } else {
                            setSemiVehicleWheel(axis.axis_number)
                            setSemiProperties(axis)
                          }
                        }}
                      />
                      {!!errors.route_form?.[formIndex]?.semi_trailer_vehicle &&
                        <p className='text-red-500'>{errors.route_form[formIndex].semi_trailer_vehicle.message}</p>
                      }
                    </fieldset>
                  )
                }}
              />
            </Col>
            : null}
          {(match_type === 1 || match_type === 3) ?
            <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8}>
              <Controller
                name={`route_form.${formIndex}.etc_vehicle`}
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
                        onChange={(value, option) => {
                          console.log(option)
                          const axis: VehicleDetail | any = option
                          field.onChange(value)
                          if (!value) {
                            setEtcProperties(INIT_VALUE)
                          } else {
                            setEtcProperties(axis)
                          }
                        }}
                      />
                      {!!errors.route_form?.[formIndex]?.etc_vehicle &&
                        <p className='text-red-500'>{errors.route_form[formIndex].etc_vehicle.message}</p>
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
                    name={`route_form.${formIndex}.towering_weight1`}
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
                            suffix='กิโลกรัม'
                            onChange={(e) => {
                              field.onChange(e.target.value.replace(/[^0-9.]/g, ""))
                            }}
                          />
                          {!!errors.route_form?.[formIndex]?.towering_weight1 &&
                            <p className='text-red-500'>{errors.route_form[formIndex].towering_weight1.message}</p>
                          }
                        </fieldset>
                      )
                    }}
                  />
                </Col>
                <Col xs={24} sm={24} md={12} lg={6} xl={6} xxl={6}>
                  <Controller
                    name={`route_form.${formIndex}.towering_weight2`}
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
                            suffix='กิโลกรัม'
                            onChange={(e) => {
                              field.onChange(e.target.value.replace(/[^0-9.]/g, ""))
                            }}
                          />
                          {!!errors.route_form?.[formIndex]?.towering_weight2 &&
                            <p className='text-red-500'>{errors.route_form[formIndex].towering_weight2.message}</p>
                          }
                        </fieldset>
                      )
                    }}
                  />
                </Col>
              </>
              : null}
            {toweringVehicleWheel >= 3 ?
              <Col xs={24} sm={24} md={12} lg={6} xl={6} xxl={6}>
                <Controller
                  name={`route_form.${formIndex}.towering_weight3`}
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
                          suffix='กิโลกรัม'
                          onChange={(e) => {
                            field.onChange(e.target.value.replace(/[^0-9.]/g, ""))
                          }}
                        />
                        {!!errors.route_form?.[formIndex]?.towering_weight3 &&
                          <p className='text-red-500'>{errors.route_form[formIndex].towering_weight3.message}</p>
                        }
                      </fieldset>
                    )
                  }}
                />
              </Col>
              : null}
            {toweringVehicleWheel >= 4 ?
              <Col xs={24} sm={24} md={12} lg={6} xl={6} xxl={6}>
                <Controller
                  name={`route_form.${formIndex}.towering_weight4`}
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
                          suffix='กิโลกรัม'
                          onChange={(e) => {
                            field.onChange(e.target.value.replace(/[^0-9.]/g, ""))
                          }}
                        />
                        {!!errors.route_form?.[formIndex]?.towering_weight4 &&
                          <p className='text-red-500'>{errors.route_form[formIndex].towering_weight4.message}</p>
                        }
                      </fieldset>
                    )
                  }}
                />
              </Col>
              : null}
            {toweringVehicleWheel >= 5 ?
              <Col xs={24} sm={24} md={12} lg={6} xl={6} xxl={6}>
                <Controller
                  name={`route_form.${formIndex}.towering_weight5`}
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
                          suffix='กิโลกรัม'
                          onChange={(e) => {
                            field.onChange(e.target.value.replace(/[^0-9.]/g, ""))
                          }}
                        />
                        {!!errors.route_form?.[formIndex]?.towering_weight5 &&
                          <p className='text-red-500'>{errors.route_form[formIndex].towering_weight5.message}</p>
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
                  name={`route_form.${formIndex}.towering_weight6`}
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
                          suffix='กิโลกรัม'
                          onChange={(e) => {
                            field.onChange(e.target.value.replace(/[^0-9.]/g, ""))
                          }}
                        />
                        {!!errors.route_form?.[formIndex]?.towering_weight6 &&
                          <p className='text-red-500'>{errors.route_form[formIndex].towering_weight6.message}</p>
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
                  name={`route_form.${formIndex}.towering_weight7`}
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
                          suffix='กิโลกรัม'
                          onChange={(e) => {
                            field.onChange(e.target.value.replace(/[^0-9.]/g, ""))
                          }}
                        />
                        {!!errors.route_form?.[formIndex]?.towering_weight7 &&
                          <p className='text-red-500'>{errors.route_form[formIndex].towering_weight7.message}</p>
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
            {semiVehicleWheel >= 2 ?
              <>
                <Col xs={24} sm={24} md={12} lg={6} xl={6} xxl={6}>
                  <Controller
                    name={`route_form.${formIndex}.semi_weight1`}
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
                            suffix='กิโลกรัม'
                            onChange={(e) => {
                              field.onChange(e.target.value.replace(/[^0-9.]/g, ""))
                            }}
                          />
                          {!!errors.route_form?.[formIndex]?.semi_weight1 &&
                            <p className='text-red-500'>{errors.route_form[formIndex].semi_weight1.message}</p>
                          }
                        </fieldset>
                      )
                    }}
                  />
                </Col>
                <Col xs={24} sm={24} md={12} lg={6} xl={6} xxl={6}>
                  <Controller
                    name={`route_form.${formIndex}.semi_weight2`}
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
                            suffix='กิโลกรัม'
                            onChange={(e) => {
                              field.onChange(e.target.value.replace(/[^0-9.]/g, ""))
                            }}
                          />
                          {!!errors.route_form?.[formIndex]?.semi_weight2 &&
                            <p className='text-red-500'>{errors.route_form[formIndex].semi_weight2.message}</p>
                          }
                        </fieldset>
                      )
                    }}
                  />
                </Col>
              </>
              : null}
            {semiVehicleWheel >= 3 ?
              <Col xs={24} sm={24} md={12} lg={6} xl={6} xxl={6}>
                <Controller
                  name={`route_form.${formIndex}.semi_weight3`}
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
                          suffix='กิโลกรัม'
                          onChange={(e) => {
                            field.onChange(e.target.value.replace(/[^0-9.]/g, ""))
                          }}
                        />
                        {!!errors.route_form?.[formIndex]?.semi_weight3 &&
                          <p className='text-red-500'>{errors.route_form[formIndex].semi_weight3.message}</p>
                        }
                      </fieldset>
                    )
                  }}
                />
              </Col>
              : null}
            {semiVehicleWheel >= 4 ?
              <Col xs={24} sm={24} md={12} lg={6} xl={6} xxl={6}>
                <Controller
                  name={`route_form.${formIndex}.semi_weight4`}
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
                          suffix='กิโลกรัม'
                          onChange={(e) => {
                            field.onChange(e.target.value.replace(/[^0-9.]/g, ""))
                          }}
                        />
                        {!!errors.route_form?.[formIndex]?.semi_weight4 &&
                          <p className='text-red-500'>{errors.route_form[formIndex].semi_weight4.message}</p>
                        }
                      </fieldset>
                    )
                  }}
                />
              </Col>
              : null}
            {semiVehicleWheel >= 5 ?
              <Col xs={24} sm={24} md={12} lg={6} xl={6} xxl={6}>
                <Controller
                  name={`route_form.${formIndex}.semi_weight5`}
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
                          suffix='กิโลกรัม'
                          onChange={(e) => {
                            field.onChange(e.target.value.replace(/[^0-9.]/g, ""))
                          }}
                        />
                        {!!errors.route_form?.[formIndex]?.semi_weight5 &&
                          <p className='text-red-500'>{errors.route_form[formIndex].semi_weight5.message}</p>
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
                  name={`route_form.${formIndex}.semi_weight6`}
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
                        {!!errors.route_form?.[formIndex]?.semi_weight6 &&
                          <p className='text-red-500'>{errors.route_form[formIndex].semi_weight6.message}</p>
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
                  name={`route_form.${formIndex}.semi_weight7`}
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
                          suffix='กิโลกรัม'
                          onChange={(e) => {
                            field.onChange(e.target.value.replace(/[^0-9.]/g, ""))
                          }}
                        />
                        {!!errors.route_form?.[formIndex]?.semi_weight7 &&
                          <p className='text-red-500'>{errors.route_form[formIndex].semi_weight7.message}</p>
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
      <section className='mt-5'>
        <h5>เส้นทาง</h5>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={12} lg={6} xl={6} xxl={6}>
            <Controller
              name={`route_form.${formIndex}.start_latitude`}
              control={control}
              rules={{
                required: 'กรุณาระบุละติจูด (ต้นทาง)'
              }}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>ละติจูด (ต้นทาง)</label>
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
                    {!!errors.route_form?.[formIndex]?.semi_weight7 &&
                      <p className='text-red-500'>{errors.route_form[formIndex].semi_weight7.message}</p>
                    }
                  </fieldset>
                )
              }}
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={6} xl={6} xxl={6}>
            <Controller
              name={`route_form.${formIndex}.start_longitude`}
              control={control}
              rules={{
                required: 'กรุณาระบุลองจิจูด (ต้นทาง)'
              }}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>ลองจิจูด (ต้นทาง)</label>
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
                    {!!errors.route_form?.[formIndex]?.semi_weight7 &&
                      <p className='text-red-500'>{errors.route_form[formIndex].semi_weight7.message}</p>
                    }
                  </fieldset>
                )
              }}
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={6} xl={6} xxl={6}>
            <Controller
              name={`route_form.${formIndex}.end_latitude`}
              control={control}
              rules={{
                required: 'กรุณาระบุละติจูด (ปลายทาง)'
              }}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>ละติจูด (ปลายทาง)</label>
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
                    {!!errors.route_form?.[formIndex]?.semi_weight7 &&
                      <p className='text-red-500'>{errors.route_form[formIndex].semi_weight7.message}</p>
                    }
                  </fieldset>
                )
              }}
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={6} xl={6} xxl={6}>
            <Controller
              name={`route_form.${formIndex}.end_longitude`}
              control={control}
              rules={{
                required: 'กรุณาระบุลองจิจูด (ปลายทาง)'
              }}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>ลองจิจูด (ปลายทาง)</label>
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
                    {!!errors.route_form?.[formIndex]?.semi_weight7 &&
                      <p className='text-red-500'>{errors.route_form[formIndex].semi_weight7.message}</p>
                    }
                  </fieldset>
                )
              }}
            />
          </Col>
        </Row>
      </section>
      <section className='mt-5'>
        <div className='bg-gray-200 rounded-md p-3'>
          <div className='flex items-center flex-wrap gap-3 justify-between'>
            <p><strong>น้ำหนักรถเปล่ารวม:</strong></p>
            <p>{(Number(towingProperties.weight) + Number(semiProperties.weight) + Number(etcProperties.weight)) || 0} กก.</p>
          </div>
          <div className='flex items-center flex-wrap gap-3 justify-between'>
            <p><strong>น้ำหนักรถเปล่ารวมน้ำหนักเพลา:</strong></p>
            <p>{(
              Number(towingProperties.weight) +
              Number(semiProperties.weight) +
              Number(etcProperties.weight) +
              Number(towering_weight1) +
              Number(towering_weight2) +
              Number(towering_weight3) +
              Number(towering_weight4) +
              Number(towering_weight5) +
              Number(towering_weight6) +
              Number(towering_weight7) +
              Number(semi_weight1) +
              Number(semi_weight2) +
              Number(semi_weight3) +
              Number(semi_weight4) +
              Number(semi_weight5) +
              Number(semi_weight6) +
              Number(semi_weight7)
            ) || 0}  กก.</p>
          </div>
          <div className='flex items-center flex-wrap gap-3 justify-between'>
            <p><strong>มิติรถเปล่า (ม.):</strong></p>
            <p>{`กว้าง ${Math.max(Number(towingProperties.width || 0), Number(semiProperties.width || 0))} X ยาว ${Math.max(Number(towingProperties.length || 0), Number(semiProperties.length || 0))} X สูง ${Math.max(Number(towingProperties.height || 0), Number(semiProperties.height || 0))}`}</p>
          </div>
          <div className='flex items-center flex-wrap gap-3 justify-between'>
            <p><strong>มิติรถเปล่ารวม สินค้า / เครื่องจักร(ม.):</strong></p>
            <p>{`กว้าง ${Math.max(Number(towingProperties.width || 0), Number(semiProperties.width || 0), Number(etcProperties.width || 0))} X ยาว ${Math.max(Number(towingProperties.length || 0), Number(semiProperties.length || 0), Number(etcProperties.length || 0))} X สูง ${Math.max(Number(towingProperties.height || 0), Number(semiProperties.height || 0), Number(etcProperties.height || 0))}`}</p>
          </div>
        </div>
      </section>
      <section className='mt-5'>
        <Row gutter={[16, 16]}>
          {towingProperties.id ?
            <Col xs={24} sm={12} md={12} lg={8} xl={8} xxl={8}>
              <Card
                cover={(
                  <Image
                    src={selectTowing?.vehicle_pictures.front_rear_url}
                    alt={'towering-vehicle'}
                    width={'100%'}
                    height={'100%'}
                    className='object-cover object-center'
                    fallback='data:image/png;base64,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'
                  />
                )}
              >
                <Card.Meta
                  title="รถลากจูง"
                  description={(
                    <>
                      <p>{towingProperties.weight || 0} กก.</p>
                      <p>{[towingProperties.plate_no, towingProperties.plate_province].filter(item => item !== '').length ? [towingProperties.plate_no, towingProperties.plate_province].join(' ').trim() : '-'}</p>
                    </>
                  )}
                />
              </Card>
            </Col>
            : null}
          {semiProperties.id ?
            <Col xs={24} sm={12} md={12} lg={8} xl={8} xxl={8}>
              <Card
                cover={(
                  <Image
                    src={selectSemi?.vehicle_pictures.front_rear_url}
                    alt={'semi-vehicle'}
                    width={'100%'}
                    height={'100%'}
                    className='object-cover object-center'
                    fallback='data:image/png;base64,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'
                  />
                )}
              >
                <Card.Meta
                  title="รถกึ่งพ่วง 4 เพลา 8"
                  description={(
                    <>
                      <p>{semiProperties.weight || 0} กก.</p>
                      <p>{[semiProperties.plate_no, semiProperties.plate_province].filter(item => item !== '').length ? [semiProperties.plate_no, semiProperties.plate_province].join(' ').trim() : '-'}</p>
                    </>
                  )}
                />
              </Card>
            </Col>
            : null}
          {etcProperties.id ?
            <Col xs={24} sm={12} md={12} lg={8} xl={8} xxl={8}>
              <Card
                cover={(
                  <Image
                    src={selectETC?.vehicle_pictures.front_rear_url}
                    alt={'etc-vehicle'}
                    width={'100%'}
                    height={'100%'}
                    className='object-cover object-center'
                    fallback='data:image/png;base64,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'
                  />
                )}
              >
                <Card.Meta
                  title="เครื่องจักร"
                  description={(
                    <>
                      <p>{etcProperties.weight || 0} กก.</p>
                      <p>{[etcProperties.plate_no, etcProperties.plate_province].filter(item => item !== '').length ? [etcProperties.plate_no, etcProperties.plate_province].join(' ').trim() : '-'}</p>
                    </>
                  )}
                />
              </Card>
            </Col>
            : null}
        </Row>
      </section>
    </>

  )
}

export default React.memo<Props>(FormVehicle)
