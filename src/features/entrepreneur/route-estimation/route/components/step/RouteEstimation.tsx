/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import { FieldTypeArr, FieldTypeForRoute, RegionState } from '@/@types/entrepreneur/route-estimation'
import { setLoading, useAppDispatch, useAppSelector } from '@/store'
import { Button, Col, Input, Modal, Row } from 'antd'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'
import { ContentTab } from '../../components'
import { PetitionEstimateRequest, PostPetitionRoadMapRequest } from '@/@types/services/petition'
import { postPetitionEstimateAPI, postPetitionRoadMapAPI } from '@/services/entrepreneur/PetitionService'
import { useRouteContext } from '../../context'
import Map from '../map/Map'
import { FaTimes, FaEdit } from 'react-icons/fa';
import { calculateRoute, geocodeAddress, swapCoordinates, swapCoordinatesDeep } from '@/utils/custom/updateMapAPI'
import axios from 'axios'
import { APIResponseRegion } from '@/@types/shared'
import { getPetitionRoadMapData } from '@/store/slices/entrepreneur'
import { s } from '@fullcalendar/core/internal-common'

interface Props {

}

// Types
interface LatLng {
  lat: number;
  lng: number;
}

interface Route {
  coordinates: [number, number][];
  distance: string;
  duration: string;
  rawDistance: number;
  rawDuration: number;
}

interface RouteResponse {
  main: Route;
  alternative: Route | null;
}

type RouteType = 'main' | 'alternative';

const INIT_REGION_STATE: RegionState = { id: null, name: null }

const RouteEstimation: React.FC<Props> = (props) => {
  const { } = props
  const submitRef = useRef<HTMLButtonElement>(null)
  const dispatch = useAppDispatch()
  const { loading } = useAppSelector(state => state.layout)
  const { province } = useAppSelector(state => state.master)
  const { petition_detail } = useAppSelector(state => state.entrepreneur.permitList)
  const navigate = useNavigate()
  const { dataParser, setStep, setDataParser } = useRouteContext()
  const { state } = useLocation()
  // USE STATE
  const [startPoint, setStartPoint] = useState<LatLng | null>(null);
  const [endPoint, setEndPoint] = useState<LatLng | null>(null);
  const [waypoints, setWaypoints] = useState<LatLng[]>([]);
  const [routes, setRoutes] = useState<RouteResponse | null>(null);
  const [isSelectingStart, setIsSelectingStart] = useState(false);
  const [isSelectingEnd, setIsSelectingEnd] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<RouteType>('main');
  const [isCalculating, setIsCalculating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // const [startInput, setStartInput] = useState('');
  // const [endInput, setEndInput] = useState('');
  const [isGeocoding, setIsGeocoding] = useState(false);
  const startInputTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const endInputTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [startDetail, setStartDetail] = useState<RegionState>(INIT_REGION_STATE)
  const [endDetail, setEndDetail] = useState<RegionState>(INIT_REGION_STATE)

  // console.log(dataParser.raw_body.route_form)

  const form = useForm<FieldTypeArr>({
    defaultValues: {
      start_point: dataParser.raw_body.start_point || '',
      end_point: dataParser.raw_body.end_point || '',
      route_form: dataParser.raw_body.route_form.length ? dataParser.raw_body.route_form :
        [
          {
            match_type: null,
            turn_radius: '',
            towering_vehicle: null,
            semi_trailer_vehicle: null,
            etc_vehicle: [],
            towering_weight1: 0,
            towering_weight2: 0,
            towering_weight3: 0,
            towering_weight4: 0,
            towering_weight5: 0,
            towering_weight6: 0,
            towering_weight7: 0,
            semi_weight1: 0,
            semi_weight2: 0,
            semi_weight3: 0,
            semi_weight4: 0,
            semi_weight5: 0,
            semi_weight6: 0,
            semi_weight7: 0,
          }
        ]
    }
  })

  const {
    handleSubmit,
    control,
    setValue,
    trigger,
    formState: { errors },
  } = form

  const onCreate = useCallback(async (value: FieldTypeArr) => {
    // BUILD BODY
    const body: PetitionEstimateRequest = {
      vehicle: value.route_form.map((item) => {
        return {
          turn_radius: Number(item.turn_radius),
          towing_vehicle_id: item.match_type === 3 ? null : Number(item.towering_vehicle),
          // semi_trailer_vehicle_id: item.match_type === 3 ? null : Number(item.semi_trailer_vehicle),
          semi_trailer_vehicle_id: Number(item.semi_trailer_vehicle),
          // etc_vehicle_id: item.match_type === 2 ? null : Number(item.etc_vehicle),
          etc_vehicle_id: item.match_type === 2 ? null : item.etc_vehicle,
          towing_axis_weight: [
            Number(item.towering_weight1),
            Number(item.towering_weight2),
            Number(item.towering_weight3),
            Number(item.towering_weight4),
            Number(item.towering_weight5),
            Number(item.towering_weight6),
            Number(item.towering_weight7),
          ],
          semi_trailer_axis_weight: [
            Number(item.semi_weight1),
            Number(item.semi_weight2),
            Number(item.semi_weight3),
            Number(item.semi_weight4),
            Number(item.semi_weight5),
            Number(item.semi_weight6),
            Number(item.semi_weight7),
          ]
        }
      }),
      start_point: {
        type: "Point",
        coordinates: selectedRoute === 'main' ? swapCoordinates(routes?.main?.coordinates[0]) : swapCoordinates(routes?.alternative?.coordinates[0])
      },
      end_point: {
        type: "Point",
        coordinates: selectedRoute === 'main' ? swapCoordinates(routes?.main?.coordinates[routes?.main.coordinates?.length - 1]) : swapCoordinates(routes?.alternative?.coordinates[routes?.alternative?.coordinates.length - 1])
      },
      vehicle_route: {
        type: "LineString",
        coordinates: selectedRoute === 'main' ? swapCoordinatesDeep(routes?.main?.coordinates) : swapCoordinatesDeep(routes?.alternative?.coordinates)
      }
    }
    dispatch(setLoading(true))
    try {
      const response = await postPetitionEstimateAPI(body)
      if (response.status === 200) {
        Modal.success({
          title: 'สำเร็จ',
          content: 'บันทึกข้อมูลสำเร็จ',
          okText: 'ตกลง',
          onOk: () => {
            setDataParser({
              req_data: body,
              res_data: response.data,
              raw_body: value,
              region_detail: {
                start: startDetail,
                end: endDetail
              }
            })
            setStep(2)
          },
          okButtonProps: {
            style: {
              fontFamily: 'Noto Sans Thai'
            }
          },
          style: {
            fontFamily: 'Noto Sans Thai'
          }
        })
      }
    } catch (error) {
      if (error instanceof Error) {
        Modal.error({
          title: 'ผิดพลาด',
          content: 'ไม่สามารถบันทึกข้อมูลได้',
          okText: 'ตกลง',
          onOk: () => Modal.destroyAll(),
          okButtonProps: {
            style: {
              fontFamily: 'Noto Sans Thai'
            }
          },
          style: {
            fontFamily: 'Noto Sans Thai'
          }
        })
      } else {
        console.error(error)
      }
    } finally {
      dispatch(setLoading(false))
    }
  }, [
    dispatch,
    setDataParser,
    setStep,
    routes?.alternative?.coordinates,
    routes?.main.coordinates,
    selectedRoute,
    endDetail,
    startDetail
  ])

  const onUpdate = useCallback(async (value: FieldTypeArr) => {
    const body: PostPetitionRoadMapRequest = {
      petition_id: state?.petition_id || null,
      vehicles: value.route_form.map((item, index) => {
        return {
          estimate_id: petition_detail.road_map.estimate[index].id,
          turn_radius: Number(item.turn_radius),
        }
      }),
      start_point: {
        type: "Point",
        coordinates: selectedRoute === 'main' ? swapCoordinates(routes?.main?.coordinates[0]) : swapCoordinates(routes?.alternative?.coordinates[0])
      },
      end_point: {
        type: "Point",
        coordinates: selectedRoute === 'main' ? swapCoordinates(routes?.main?.coordinates[routes?.main.coordinates?.length - 1]) : swapCoordinates(routes?.alternative?.coordinates[routes?.alternative?.coordinates.length - 1])
      },
      vehicle_route: {
        type: "LineString",
        coordinates: selectedRoute === 'main' ? swapCoordinatesDeep(routes?.main?.coordinates) : swapCoordinatesDeep(routes?.alternative?.coordinates)
      }
    }
    // BUILD BODY
    const formData: PetitionEstimateRequest = {
      vehicle: value.route_form.map((item) => {
        return {
          turn_radius: Number(item.turn_radius),
          towing_vehicle_id: item.match_type === 3 ? null : Number(item.towering_vehicle),
          // semi_trailer_vehicle_id: item.match_type === 3 ? null : Number(item.semi_trailer_vehicle),
          semi_trailer_vehicle_id: Number(item.semi_trailer_vehicle),
          // etc_vehicle_id: item.match_type === 2 ? null : Number(item.etc_vehicle),
          etc_vehicle_id: item.match_type === 2 ? null : item.etc_vehicle,
          towing_axis_weight: [
            Number(item.towering_weight1),
            Number(item.towering_weight2),
            Number(item.towering_weight3),
            Number(item.towering_weight4),
            Number(item.towering_weight5),
            Number(item.towering_weight6),
            Number(item.towering_weight7),
          ],
          semi_trailer_axis_weight: [
            Number(item.semi_weight1),
            Number(item.semi_weight2),
            Number(item.semi_weight3),
            Number(item.semi_weight4),
            Number(item.semi_weight5),
            Number(item.semi_weight6),
            Number(item.semi_weight7),
          ]
        }
      }),
      start_point: {
        type: "Point",
        coordinates: selectedRoute === 'main' ? swapCoordinates(routes?.main?.coordinates[0]) : swapCoordinates(routes?.alternative?.coordinates[0])
      },
      end_point: {
        type: "Point",
        coordinates: selectedRoute === 'main' ? swapCoordinates(routes?.main?.coordinates[routes?.main.coordinates?.length - 1]) : swapCoordinates(routes?.alternative?.coordinates[routes?.alternative?.coordinates.length - 1])
      },
      vehicle_route: {
        type: "LineString",
        coordinates: selectedRoute === 'main' ? swapCoordinatesDeep(routes?.main?.coordinates) : swapCoordinatesDeep(routes?.alternative?.coordinates)
      }
    }
    dispatch(setLoading(true))
    try {
      const response = await postPetitionRoadMapAPI(body)
      console.log("===", response)
      if (response.status === 200) {
        Modal.success({
          title: 'สำเร็จ',
          content: 'บันทึกข้อมูลสำเร็จ',
          okText: 'ตกลง',
          onOk: () => {
            setDataParser({
              req_data: formData,
              res_data: response.data,
              raw_body: value,
              region_detail: {
                start: startDetail,
                end: endDetail
              }
            })
            setStep(2)
          },
          okButtonProps: {
            style: {
              fontFamily: 'Noto Sans Thai'
            }
          },
          style: {
            fontFamily: 'Noto Sans Thai'
          }
        })
      }
    } catch (error) {
      if (error instanceof Error) {
        Modal.error({
          title: 'ผิดพลาด',
          content: 'ไม่สามารถบันทึกข้อมูลได้',
          okText: 'ตกลง',
          onOk: () => Modal.destroyAll(),
          okButtonProps: {
            style: {
              fontFamily: 'Noto Sans Thai'
            }
          },
          style: {
            fontFamily: 'Noto Sans Thai'
          }
        })
      } else {
        console.error(error)
      }
    } finally {
      dispatch(setLoading(false))
    }
  }, [
    state?.petition_id,
    petition_detail.road_map.estimate,
    selectedRoute,
    routes,
    setDataParser,
    setStep,
    endDetail,
    startDetail,
    dispatch
  ])

  const onSubmit = useCallback(async (value: FieldTypeArr) => {
    // CHECK ROUTE
    if (!routes) {
      Modal.error({
        title: 'ผิดพลาด',
        content: 'ยังไม่มีการประเมินเส้นทาง',
        okText: 'ตกลง',
        onOk: () => Modal.destroyAll(),
        okButtonProps: {
          style: {
            fontFamily: 'Noto Sans Thai'
          }
        },
        style: {
          fontFamily: 'Noto Sans Thai'
        }
      })
    }
    // CHECK
    if (state?.petition_id) {
      onUpdate(value)
    } else {
      onCreate(value)
    }
  }, [routes, state?.petition_id, onCreate, onUpdate])

  const handleMapClick = useCallback((latlng: LatLng) => {
    if (isSelectingStart) {
      setStartPoint(latlng);
      // setStartInput(`${latlng.lat.toFixed(4)}, ${latlng.lng.toFixed(4)}`);
      setValue('start_point', `${latlng.lat.toFixed(5)}, ${latlng.lng.toFixed(5)}`);
      setIsSelectingStart(false);
      setRoutes(null); // Clear routes when start point changes
      setWaypoints([]); // Clear waypoints when start point changes
      setIsEditMode(false); // Exit edit mode
    } else if (isSelectingEnd) {
      setEndPoint(latlng);
      // setEndInput(`${latlng.lat.toFixed(4)}, ${latlng.lng.toFixed(4)}`);
      setValue('end_point', `${latlng.lat.toFixed(5)}, ${latlng.lng.toFixed(5)}`);
      setIsSelectingEnd(false);
      setRoutes(null); // Clear routes when end point changes
      setWaypoints([]); // Clear waypoints when end point changes
      setIsEditMode(false); // Exit edit mode
    } else if (isEditMode && startPoint && endPoint) {
      // Add waypoint when in edit mode
      setWaypoints([...waypoints, latlng]);
    }
  }, [
    endPoint,
    isEditMode,
    isSelectingEnd,
    isSelectingStart,
    startPoint,
    waypoints,
    setValue
  ]);

  // const handleStartInputSubmit = useCallback(async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!startInput.trim()) return;

  //   setIsGeocoding(true);
  //   setError(null);
  //   try {
  //     const location = await geocodeAddress(startInput);
  //     setStartPoint(location);
  //     setValue('start_point', `${location.lat.toFixed(6)},${location.lng.toFixed(6)}`)
  //   } catch (err) {
  //     setError('Could not find start location. Please try again.');
  //   } finally {
  //     setIsGeocoding(false);
  //   }
  // }, [startInput, setValue]);

  // const handleEndInputSubmit = useCallback(async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!endInput.trim()) return;

  //   setIsGeocoding(true);
  //   setError(null);
  //   try {
  //     const location = await geocodeAddress(endInput);
  //     setEndPoint(location);
  //     setValue('end_point', `${location.lat.toFixed(6)},${location.lng.toFixed(6)}`)
  //   } catch (err) {
  //     setError('Could not find end location. Please try again.');
  //   } finally {
  //     setIsGeocoding(false);
  //   }
  // }, [endInput, setValue]);

  const handleStartInputChange = useCallback((value: string) => {
    // setStartInput(value);

    // Clear existing timeout
    if (startInputTimeoutRef.current) {
      clearTimeout(startInputTimeoutRef.current);
    }

    // Set new timeout to geocode after user stops typing
    if (value.trim().length > 2) {
      startInputTimeoutRef.current = setTimeout(async () => {
        setIsGeocoding(true);
        setError(null);
        try {
          const location = await geocodeAddress(value);
          setStartPoint(location);
          setValue('start_point', `${location.lat.toFixed(5)}, ${location.lng.toFixed(5)}`);
          setRoutes(null); // Clear routes when start point changes
          setWaypoints([]); // Clear waypoints when start point changes
          setIsEditMode(false); // Exit edit mode
        } catch (err) {
          setError('Could not find start location. Please try again.');
        } finally {
          setIsGeocoding(false);
        }
      }, 1000); // Wait 1 second after user stops typing
    }
  }, [setValue]);

  const handleEndInputChange = useCallback((value: string) => {
    // setEndInput(value);

    // Clear existing timeout
    if (endInputTimeoutRef.current) {
      clearTimeout(endInputTimeoutRef.current);
    }

    // Set new timeout to geocode after user stops typing
    if (value.trim().length > 2) {
      endInputTimeoutRef.current = setTimeout(async () => {
        setIsGeocoding(true);
        setError(null);
        try {
          const location = await geocodeAddress(value);
          setEndPoint(location);
          setValue('end_point', `${location.lat.toFixed(5)}, ${location.lng.toFixed(5)}`);
          setRoutes(null); // Clear routes when end point changes
          setWaypoints([]); // Clear waypoints when end point changes
          setIsEditMode(false); // Exit edit mode
        } catch (err) {
          setError('Could not find end location. Please try again.');
        } finally {
          setIsGeocoding(false);
        }
      }, 1000); // Wait 1 second after user stops typing
    }
  }, [setValue]);

  const calculateRoutes = useCallback(async () => {
    if (!startPoint || !endPoint) return;

    setIsCalculating(true);
    setError(null);
    try {
      const calculatedRoutes = await calculateRoute(startPoint, endPoint, waypoints);
      setRoutes(calculatedRoutes);
      setIsEditMode(false);
    } catch (err) {
      setError('Failed to calculate route. Please try again.');
      console.error(err);
    } finally {
      setIsCalculating(false);
    }
  }, [endPoint, startPoint, waypoints]);

  const resetMap = useCallback(() => {
    setStartPoint(null);
    setEndPoint(null);
    setWaypoints([]);
    setRoutes(null);
    setIsEditMode(false);
    setSelectedRoute('main');
    setError(null);
    setValue('start_point', '')
    setValue('end_point', '')
    // setStartInput('');
    // setEndInput('');
    // Clear any pending timeouts
    if (startInputTimeoutRef.current) {
      clearTimeout(startInputTimeoutRef.current);
    }
    if (endInputTimeoutRef.current) {
      clearTimeout(endInputTimeoutRef.current);
    }
  }, [setValue]);

  const removeWaypoint = useCallback((index: number) => {
    setWaypoints(waypoints.filter((_, i) => i !== index));
  }, [waypoints]);

  const handleEditRoute = useCallback(() => {
    setIsEditMode(true);
    setRoutes(null);
  }, []);

  const getStartRegion = useCallback(async (lat: number, lng: number) => {
    try {
      const response = await axios.get<APIResponseRegion>(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=th`)
      if (response.status === 200) {
        const localText = response.data.principalSubdivision.replace(/^จังหวัด/, '')
        const findProvinceId = province.find(item => item.name_th === localText)?.id
        setStartDetail({
          id: Number(findProvinceId),
          name: localText
        })
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      } else {
        console.error(error)
      }
    }
  }, [province])

  const getEndRegion = useCallback(async (lat: number, lng: number) => {
    try {
      const response = await axios.get<APIResponseRegion>(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=th`)
      if (response.status === 200) {
        const localText = response.data.principalSubdivision.replace(/^จังหวัด/, '')
        const findProvinceId = province.find(item => item.name_th === localText)?.id
        setEndDetail({
          id: Number(findProvinceId),
          name: localText
        })
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      } else {
        console.error(error)
      }
    }
  }, [province])

  useEffect(() => {
    if (startPoint) {
      getStartRegion(startPoint.lat, startPoint.lng)
    } else {
      setStartDetail(INIT_REGION_STATE)
    }
  }, [getStartRegion, startPoint])

  useEffect(() => {
    if (endPoint) {
      getEndRegion(endPoint.lat, endPoint.lng)
    } else {
      setEndDetail(INIT_REGION_STATE)
    }
  }, [getEndRegion, endPoint])

  useEffect(() => {
    if (startPoint && endPoint && waypoints.length > 0 && isEditMode) {
      // Auto-recalculate when waypoints change in edit mode
      const timer = setTimeout(() => {
        calculateRoutes();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [waypoints, calculateRoutes, isEditMode, startPoint, endPoint]);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (startInputTimeoutRef.current) {
        clearTimeout(startInputTimeoutRef.current);
      }
      if (endInputTimeoutRef.current) {
        clearTimeout(endInputTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (dataParser.raw_body.start_point && dataParser.raw_body.end_point) {
      const convertStartPoint = String(dataParser.raw_body.start_point).split(',').map(s => parseFloat(s.trim()));
      const convertEndPoint = String(dataParser.raw_body.end_point).split(',').map(s => parseFloat(s.trim()));

      setStartPoint({ lat: convertStartPoint[0], lng: convertStartPoint[1] })
      setEndPoint({ lat: convertEndPoint[0], lng: convertEndPoint[1] })
    }
  }, [dataParser.raw_body.start_point, dataParser.raw_body.end_point])

  useEffect(() => {
    if (!state?.petition_id) return
    if (!petition_detail.road_map.start_point.length) return  // still loading

    const startCoords = [petition_detail.road_map.start_point[1], petition_detail.road_map.start_point[0]]
    const endCoords = [petition_detail.road_map.end_point[1], petition_detail.road_map.end_point[0]]

    setValue('start_point', startCoords.join(', '))
    setValue('end_point', endCoords.join(', '))

    setStartPoint({ lat: startCoords[0], lng: startCoords[1] })
    setEndPoint({ lat: endCoords[0], lng: endCoords[1] })
  }, [petition_detail.road_map.start_point, petition_detail.road_map.end_point, state?.petition_id, setValue])

  return (
    <main>
      <section className='flex justify-between items-center flex-wrap gap-5 mb-5'>
        <h3>ขออนุญาตหมวด 2 (4 - 7 เพลา)</h3>
        <div className='flex items-center gap-3'>
          <Button
            disabled={loading}
            htmlType='button'
            type='default'
            // size='large'
            className='w-full lg:w-auto'
            onClick={() => navigate('/permit-list')}
          >
            ย้อนกลับ
          </Button>
          <Button
            loading={loading}
            htmlType='submit'
            type='primary'
            // size='large'
            className='w-full lg:w-auto'
            onClick={() => submitRef.current?.click()}
          >
            ถัดไป
          </Button>
        </div>
      </section>
      <form onSubmit={handleSubmit(onSubmit, (errors) => {
        const routeFormErrors = errors.route_form

        const hasWeightError = Array.isArray(routeFormErrors) &&
          routeFormErrors.some(item =>
            item && Object.values(item).some(
              (fieldError: any) => fieldError?.message?.includes('น้ำหนักเกินเกณฑ์')
            )
          )

        if (hasWeightError) {
          Modal.warning({
            title: 'น้ำหนักลงเพลาเกินเกณฑ์',
            content: 'ไม่สามารถขออนุญาตได้ เนื่องจากน้ำหนักลงเพลาเกินเกณฑ์ตามข้อกำหนด กรุณาตรวจสอบน้ำหนักลงเพลา ',
            okText: 'รับทราบ',
            onOk: () => Modal.destroyAll(),
            okButtonProps: { style: { fontFamily: 'Noto Sans Thai' } },
            style: { fontFamily: 'Noto Sans Thai' }
          })
        }
      })}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={14}>
            <ContentTab
              control={control}
              setValue={setValue}
              trigger={trigger}
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={10}>
            {/* <div className='order-first z-0 h-[50vh] block rounded-md xl:order-last xl:h-[50vh] xl:max-h-auto xl:sticky xl:top-4 xl:overflow-hidden border border-gray-200'> */}
            <div className='order-first z-0 h-[50vh] block rounded-md xl:order-last xl:h-[50vh] xl:max-h-auto xl:top-4 xl:overflow-hidden border border-gray-200'>
              <Map
                // STATE
                isSelectingStart={isSelectingStart}
                isSelectingEnd={isSelectingEnd}
                isEditMode={isEditMode}
                startPoint={startPoint}
                endPoint={endPoint}
                waypoints={waypoints}
                routes={routes || null}
                selectedRoute={selectedRoute}
                // SET STATE
                setStartPoint={setStartPoint}
                setIsSelectingStart={setIsSelectingStart}
                setEndPoint={setEndPoint}
                setIsSelectingEnd={setIsSelectingEnd}
                setWaypoints={setWaypoints}
                setError={setError}
                setIsCalculating={setIsCalculating}
                setRoutes={setRoutes}
                setIsEditMode={setIsEditMode}
                setSelectedRoute={setSelectedRoute}
                // REACT HOOK FORM
                handleMapClick={handleMapClick}
              />
            </div>
            <section className='mt-5'>
              <h5>เส้นทาง</h5>
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                  <Controller
                    name='start_point'
                    control={control}
                    rules={{
                      required: 'กรุณาระบุต้นทาง'
                    }}
                    render={({ field }) => {
                      return (
                        <fieldset>
                          <label>ต้นทาง</label>
                          <Input
                            {...field}
                            name={field.name}
                            disabled={isGeocoding}
                            placeholder='กรุณาระบุ'
                            className='w-full'
                            size='large'
                            style={{
                              fontFamily: 'Noto Sans Thai'
                            }}
                            onChange={(e) => {
                              field.onChange(e)
                              handleStartInputChange(e.target.value)
                            }}
                          />
                          {!!errors.start_point &&
                            <p className='text-red-500'>{errors.start_point.message}</p>
                          }
                        </fieldset>
                      )
                    }}
                  />
                  <Button
                    block
                    htmlType='button'
                    color='green'
                    variant={isSelectingStart ? 'solid' : 'filled'}
                    onClick={() => {
                      setIsSelectingStart(true);
                      setIsSelectingEnd(false);
                    }}
                  >
                    {isSelectingStart ? 'กรุณาเลือกต้นทางบนแผนที่' : startPoint ? 'เปลี่ยนต้นทาง' : 'หรือเลือกบนแผนที่'}
                  </Button>
                  {startPoint && (
                    <p className="text-xs text-gray-500 mt-1">
                      {startPoint.lat.toFixed(5)}, {startPoint.lng.toFixed(5)}
                    </p>
                  )}
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                  <Controller
                    name='end_point'
                    control={control}
                    rules={{
                      required: 'กรุณาระบุปลายทาง'
                    }}
                    render={({ field }) => {
                      return (
                        <fieldset>
                          <label>ปลายทาง</label>
                          <Input
                            {...field}
                            name={field.name}
                            disabled={isGeocoding}
                            placeholder='กรุณาระบุ'
                            className='w-full'
                            size='large'
                            style={{
                              fontFamily: 'Noto Sans Thai'
                            }}
                            onChange={(e) => {
                              field.onChange(e)
                              handleEndInputChange(e.target.value)
                            }}
                          />
                          {!!errors.end_point &&
                            <p className='text-red-500'>{errors.end_point.message}</p>
                          }
                        </fieldset>
                      )
                    }}
                  />
                  <Button
                    block
                    htmlType='button'
                    color='red'
                    variant={isSelectingEnd ? 'solid' : 'filled'}
                    onClick={() => {
                      setIsSelectingEnd(true);
                      setIsSelectingStart(false);
                    }}
                  >
                    {isSelectingEnd ? 'กรุณาเลือกปลายทางบนแผนที่' : endPoint ? 'เปลี่ยนปลายทาง' : 'หรือเลือกบนแผนที่'}
                  </Button>
                  {endPoint && (
                    <p className="text-xs text-gray-500 mt-1">
                      {endPoint.lat.toFixed(5)}, {endPoint.lng.toFixed(5)}
                    </p>
                  )}
                </Col>
                {startPoint && endPoint && !routes && (
                  <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <Button
                      block
                      htmlType='button'
                      type='primary'
                      disabled={isCalculating}
                      onClick={calculateRoutes}
                    >
                      {isCalculating ? 'กำลังประเมินเส้นทาง...' : 'ประเมินเส้นทาง'}
                    </Button>
                    {error && (
                      <p className='text-red-500'>{error}</p>
                    )}
                  </Col>
                )}
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                  {/* Route Results */}
                  {routes && !isEditMode && (
                    <>
                      <div className="border-t pt-4">
                        <h5>รายละเอียดเส้นทาง</h5>
                        {/* ปุ่มเส้นทางหลัก */}
                        <section>
                          <div
                            className={`p-3 rounded-lg cursor-pointer transition-all mb-2 ${selectedRoute === 'main'
                              ? 'bg-blue-100 border-2 border-blue-500'
                              : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                              }`}
                            onClick={() => setSelectedRoute('main')}
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-medium text-gray-800">เส้นทางหลัก</p>
                                <p className="text-sm text-gray-600">{routes.main.distance}</p>
                              </div>
                              <p className="text-sm font-medium text-blue-600">{routes.main.duration}</p>
                            </div>
                          </div>
                          {/* ปุ่นเส้นทางรอง */}
                          {routes.alternative && (
                            <div
                              className={`p-3 rounded-lg cursor-pointer transition-all ${selectedRoute === 'alternative'
                                ? 'bg-blue-100 border-2 border-blue-500'
                                : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                                }`}
                              onClick={() => setSelectedRoute('alternative')}
                            >
                              <div className="flex justify-between items-start">
                                <div>
                                  <p className="font-medium text-gray-800">เส้นทางอื่น</p>
                                  <p className="text-sm text-gray-600">{routes.alternative.distance}</p>
                                </div>
                                <p className="text-sm font-medium text-gray-600">{routes.alternative.duration}</p>
                              </div>
                            </div>
                          )}
                          {!routes.alternative && (
                            <div className="p-2 bg-gray-100 rounded text-sm text-gray-600">
                              ไม่พบเส้นทางอื่น
                            </div>
                          )}
                        </section>
                        <section className='mt-5'>
                          <Button
                            block
                            htmlType='button'
                            color='orange'
                            variant='solid'
                            icon={<FaEdit />}
                            onClick={handleEditRoute}
                          >
                            ปรับแต่งเส้นทาง
                          </Button>
                          <Button
                            block
                            htmlType='button'
                            color='default'
                            variant='outlined'
                            icon={<FaTimes />}
                            className='mt-3'
                            onClick={resetMap}
                          >
                            ล้างค่าเส้นทาง
                          </Button>
                        </section>
                      </div>
                    </>
                  )}
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                  {/* Edit Mode */}
                  {isEditMode && (
                    <>
                      <div className="bg-orange-50 border border-orange-200 p-3 rounded-lg">
                        <p className="text-sm text-orange-800 font-medium">
                          แก้ไขเส้นทาง
                        </p>
                        <p className="text-xs text-orange-600 mt-1">
                          กดบนแผนที่เพื่อแก้ไขเส้นทาง
                        </p>
                      </div>

                      {waypoints.length > 0 && (
                        <section>
                          <h4 className="font-medium text-gray-800 mb-2">
                            เส้นทาง ({waypoints.length})
                          </h4>
                          <div className="space-y-2">
                            {waypoints.map((wp, idx) => (
                              <div
                                key={idx}
                                className="flex items-center justify-between bg-yellow-50 p-2 rounded"
                              >
                                <span className="text-sm text-gray-700">
                                  {wp.lat.toFixed(5)}, {wp.lng.toFixed(5)}
                                </span>
                                <button
                                  className="text-red-500 hover:text-red-700"
                                  onClick={() => removeWaypoint(idx)}
                                >
                                  <FaTimes />
                                </button>
                              </div>
                            ))}
                          </div>
                        </section>
                      )}
                      <section className='mt-5'>
                        <Button
                          block
                          htmlType='button'
                          type='primary'
                          disabled={isCalculating}
                          onClick={calculateRoutes}
                        >
                          {isCalculating ? 'กำลังประเมินเส้นทางใหม่...' : 'แก้ไขเส้นทาง'}
                        </Button>
                        <Button
                          block
                          htmlType='button'
                          color='default'
                          variant='outlined'
                          className='mt-3'
                          onClick={() => setIsEditMode(false)}
                        >
                          ยกเลิกการแก้ไข
                        </Button>
                      </section>
                    </>
                  )}
                </Col>
              </Row>
            </section>
          </Col>
        </Row>
        <button ref={submitRef} hidden type='submit' />
      </form>
    </main >
  )
}

export default React.memo<Props>(RouteEstimation)
