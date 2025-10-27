/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React, { useEffect, useState } from 'react'
import { FieldTypeForOther } from '@/@types/entrepreneur/route-estimation';
import { Control, Controller, UseFormSetValue, useFormState, useWatch } from 'react-hook-form';
import { Col, Input, Modal, Row, Select } from 'antd';
import { useAppSelector } from '@/store';
import { useNavigate } from 'react-router-dom';
// import { VehicleDetail } from '@/services/master/MasterService';

interface Props {
  control: Control<FieldTypeForOther>;
  setValue: UseFormSetValue<FieldTypeForOther>;
}

const FormVehicle: React.FC<Props> = (props) => {
  const { control, setValue } = props
  const { vehicle_selection } = useAppSelector(state => state.master)
  const { loading } = useAppSelector(state => state.layout)
  const [toweringVehicleWheel, setToweringVehicleWheel] = useState<number>(0)
  const [semiVehicleWheel, setSemiVehicleWheel] = useState<number>(0)
  const navigate = useNavigate()

  const {
    match_type,
    towering_vehicle,
    semi_trailer_vehicle,
  } = useWatch({ control })

  const { errors } = useFormState({ control })

  const selectTowing = vehicle_selection.data.find(item => item.vehicle_detail.id === towering_vehicle) || null
  const selectSemi = vehicle_selection.data.find(item => item.vehicle_detail.id === semi_trailer_vehicle) || null

  useEffect(() => {
    if (towering_vehicle) {
      setToweringVehicleWheel(Number(selectTowing?.vehicle_detail.axis_number))
    }
    if (semi_trailer_vehicle) {
      setSemiVehicleWheel(Number(selectSemi?.vehicle_detail.axis_number))
    }
    if (!match_type) {
      setToweringVehicleWheel(0)
      setSemiVehicleWheel(0)

    }
    if (!towering_vehicle) {
      setToweringVehicleWheel(0)
    }
    if (!semi_trailer_vehicle) {
      setSemiVehicleWheel(0)
    }
  }, [
    towering_vehicle,
    selectTowing?.vehicle_detail.axis_number,
    semi_trailer_vehicle,
    selectSemi?.vehicle_detail.axis_number,
    match_type
  ])

  useEffect(() => {
    if (Number(selectTowing?.vehicle_detail.axis_number) + Number(selectSemi?.vehicle_detail.axis_number) < 7) {
      Modal.confirm({
        title: 'จำนวนเพลาต่ำกว่ากำหนด',
        content: 'กรุณากดยืนยันเพื่อเข้าสู่ขบวนการขอใบอนุญาตหมวด 2 (4 - 7 เพลา)',
        okText: 'ยืนยัน',
        cancelText: 'ยกเลิก',
        onOk: () => navigate('/route-estimation/route'),
        onCancel: () => Modal.destroyAll(),
        okButtonProps: {
          style: {
            fontFamily: 'Noto Sans Thai'
          },
          loading: loading
        },
        cancelButtonProps: {
          style: {
            fontFamily: 'Noto Sans Thai'
          },
          disabled: loading
        },
        style: {
          fontFamily: 'Noto Sans Thai'
        }
      })
    }
  }, [selectTowing?.vehicle_detail.axis_number, selectSemi?.vehicle_detail.axis_number, loading, navigate])

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
                    <label>เลือกประเภทจับคู่ <span className='text-red-500'>*</span></label>
                    <Select
                      {...field}
                      allowClear
                      showSearch
                      placeholder='กรุณาเลือก'
                      options={[
                        {
                          label: 'รถลากจูง + รถกึ่งพ่วง + เครื่องจักร / สินค้า',
                          value: 1
                        },
                        {
                          label: 'รถลากจูง + รถกึ่งพ่วง',
                          value: 2
                        },
                        {
                          label: 'เครื่องจักร / สินค้า',
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
                        // SET TOWER WEIGHT
                        setValue(`towering_weight1`, 0)
                        setValue(`towering_weight2`, 0)
                        setValue(`towering_weight3`, 0)
                        setValue(`towering_weight4`, 0)
                        setValue(`towering_weight5`, 0)
                        setValue(`towering_weight6`, 0)
                        setValue(`towering_weight7`, 0)
                        // SET SEMI WEIGHT
                        setValue(`semi_weight1`, 0)
                        setValue(`semi_weight2`, 0)
                        setValue(`semi_weight3`, 0)
                        setValue(`semi_weight4`, 0)
                        setValue(`semi_weight5`, 0)
                        setValue(`semi_weight6`, 0)
                        setValue(`semi_weight7`, 0)
                        // ON STATE CHANGE
                        // setToweringVehicleWheel(0)
                        // setSemiVehicleWheel(0)
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
          {(match_type === 1 || match_type === 2) ?
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
                      <label>เลขทะเบียน / เลขตัวรถ <span className='text-red-500'>*</span></label>
                      <Select
                        {...field}
                        allowClear
                        showSearch
                        placeholder='กรุณาเลือก'
                        options={vehicle_selection.data.filter(item => item.vehicle_detail.vehicle_type_name === 'รถลากจูง').map(item => {
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
                        onChange={(value) => {
                          field.onChange(value)
                          // SET TOWER WEIGHT
                          setValue(`towering_weight1`, '')
                          setValue(`towering_weight2`, '')
                          setValue(`towering_weight3`, '')
                          setValue(`towering_weight4`, '')
                          setValue(`towering_weight5`, '')
                          setValue(`towering_weight6`, '')
                          setValue(`towering_weight7`, '')
                        }}
                      // onChange={(value, option) => {
                      //   const axis: VehicleDetail | any = option
                      //   field.onChange(value)
                      //   if (!value) {
                      //     setToweringVehicleWheel(0)
                      //     // SET TOWING WEIGHT
                      //     setValue(`towering_weight1`, 0)
                      //     setValue(`towering_weight2`, 0)
                      //     setValue(`towering_weight3`, 0)
                      //     setValue(`towering_weight4`, 0)
                      //     setValue(`towering_weight5`, 0)
                      //     setValue(`towering_weight6`, 0)
                      //     setValue(`towering_weight7`, 0)
                      //   } else {
                      //     setToweringVehicleWheel(axis.axis_number)
                      //   }
                      // }}
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
          {(match_type === 1 || match_type === 2) ?
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
                      <label>เลขทะเบียน / เลขตัวรถ <span className='text-red-500'>*</span></label>
                      <Select
                        {...field}
                        allowClear
                        showSearch
                        placeholder='กรุณาเลือก'
                        options={vehicle_selection.data.filter(item => item.vehicle_detail.vehicle_type_name === 'รถกึ่งพ่วง').map(item => {
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
                        onChange={(value) => {
                          field.onChange(value)
                          // SET SEMI WEIGHT
                          setValue(`semi_weight1`, '')
                          setValue(`semi_weight2`, '')
                          setValue(`semi_weight3`, '')
                          setValue(`semi_weight4`, '')
                          setValue(`semi_weight5`, '')
                          setValue(`semi_weight6`, '')
                          setValue(`semi_weight7`, '')
                        }}
                      // onChange={(value, option) => {
                      //   const axis: VehicleDetail | any = option
                      //   field.onChange(value)
                      //   if (!value) {
                      //     setSemiVehicleWheel(0)
                      //     // SET SEMI WEIGHT
                      //     setValue(`semi_weight1`, 0)
                      //     setValue(`semi_weight2`, 0)
                      //     setValue(`semi_weight3`, 0)
                      //     setValue(`semi_weight4`, 0)
                      //     setValue(`semi_weight5`, 0)
                      //     setValue(`semi_weight6`, 0)
                      //     setValue(`semi_weight7`, 0)
                      //   } else {
                      //     setSemiVehicleWheel(axis.axis_number)
                      //   }
                      // }}
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
          {(match_type === 1 || match_type === 3) ?
            <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8}>
              <Controller
                name='etc_vehicle'
                control={control}
                rules={{
                  required: 'กรุณาระบุชื่อเครื่องจักร / สินค้า'
                }}
                render={({ field }) => {
                  return (
                    <fieldset>
                      <h5>เครื่องจักร / สินค้า</h5>
                      <label>ชื่อเครื่องจักร / สินค้า <span className='text-red-500'>*</span></label>
                      <Select
                        {...field}
                        allowClear
                        showSearch
                        placeholder='กรุณาเลือก'
                        options={vehicle_selection.data.filter(item => item.vehicle_detail.vehicle_type_name === 'เครื่องจักร / สินค้า').map(item => {
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
          <h5>น้ำหนักลงเพลา รถลากจูง (กิโลกรัม) <span className='text-red-500'>*</span></h5>
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
              </>
              : null}
            {toweringVehicleWheel >= 3 ?
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
              : null}
            {toweringVehicleWheel >= 4 ?
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
          <h5>น้ำหนักลงเพลา รถกึ่งพ่วง (กิโลกรัม) <span className='text-red-500'>*</span></h5>
          <Row gutter={[16, 16]}>
            {semiVehicleWheel >= 2 ?
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
                    name='semi_weight2'
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
              </>
              : null}
            {semiVehicleWheel >= 3 ?
              <Col xs={24} sm={24} md={12} lg={6} xl={6} xxl={6}>
                <Controller
                  name='semi_weight3'
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
                        {!!errors.semi_weight3 &&
                          <p className='text-red-500'>{errors.semi_weight3.message}</p>
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
