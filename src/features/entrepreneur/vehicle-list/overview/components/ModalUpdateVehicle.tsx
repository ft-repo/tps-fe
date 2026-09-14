/* eslint-disable no-useless-escape */
/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import { APIPostBody, VehicleListByIDResponse } from '@/@types/services/vehicle';
import { Col, Modal, Row } from 'antd'
import React, { Ref, useCallback, useEffect, useRef } from 'react'
import { INIT_VEHICLE_MODAL } from '../screen';
import { useForm } from 'react-hook-form';
import { FieldType } from '@/@types/entrepreneur/vehicle-list';
import { FormUpdateData, FormUpdateDocument } from '../components';
import { getProductType, setLoading, useAppDispatch, useAppSelector } from '@/store';
import { putVehicleAPI } from '@/services/entrepreneur/VehicleListService';
import { getVehicleData } from '@/store/slices/entrepreneur';
import { buildUploadFileUrl } from '@/utils/uploadFileUrl';

interface Props {
  open: boolean;
  data: VehicleListByIDResponse;
  setOpen: ({ open, data, id }: { open: boolean, data: VehicleListByIDResponse, id: string | number }) => void;
  id: string | number;
}

interface ContentProps {
  id: string | number;
  data: VehicleListByIDResponse,
  submitRef: Ref<HTMLButtonElement>;
  setOpen: ({ open, data, id }: { open: boolean, data: VehicleListByIDResponse, id: string | number }) => void;
}

const Content = (props: ContentProps) => {
  const { id, data, submitRef, setOpen } = props
  const dispatch = useAppDispatch()
  const vehicle = useAppSelector(state => state.entrepreneur.vehicleList)
  const { province } = useAppSelector(state => state.master)

  // console.log(data.vehicle_detail)

  const form = useForm<FieldType>({
    defaultValues: {
      vehicle_type: data.vehicle_detail.vehicle_type_id || null,
      // license_plate: data.vehicle_detail.vehicle_type_id === 3 ? data.vehicle_detail.plate_no.split(',').map(item => item.trim()) : data.vehicle_detail.plate_no,
      license_plate: data.vehicle_detail.plate_no || '',
      vehicle_model: data.vehicle_detail.brand || '',
      province: province.find(item => item.name_th === data.vehicle_detail.plate_province)?.id || null,
      vehicle_weight: data.vehicle_detail.weight || 0,
      vehicle_distance: data.vehicle_detail.kingpin_distance || 0,
      vehicle_color: data.vehicle_detail.color || '',
      wide_unit: data.vehicle_detail.width || 0,
      long_unit: data.vehicle_detail.length || 0,
      tall_unit: data.vehicle_detail.height || 0,
      vehicle_axles: data.vehicle_detail.axis_type_id || null,
      file_registered_document_id: {
        file: [],
        url: ''
      },
      file_property_document_id: {
        file: [],
        url: ''
      },
      file_hire_contact_document_id: {
        file: [],
        url: ''
      },
      file_purchase_contact_document_id: {
        file: [],
        url: ''
      },
      file_transfer_contact_document_id: {
        file: [],
        url: ''
      },
      file_front_image_id: {
        file: [],
        url: ''
      },
      file_side_image_id: {
        file: [],
        url: ''
      },
      file_back_image_id: {
        file: [],
        url: ''
      },
    }
  })

  const {
    handleSubmit,
    control,
    setValue,
  } = form;

  const onSubmit = useCallback(async (value: FieldType) => {
    const body: APIPostBody = {
      vehicle_detail: {
        vehicle_type_id: value.vehicle_type || '',
        // plate_no: value.vehicle_type === 3 ? [...value.license_plate].join(',') : value.license_plate,
        plate_no: value.license_plate || '',
        plate_province: province.find(item => item.id === value.province)?.name_th || '',
        brand: value.vehicle_model || '',
        weight: Number(value.vehicle_weight) || 0,
        color: value.vehicle_color || '',
        kingpin_distance: Number(value.vehicle_distance) || 0,
        width: Number(value.wide_unit) || 0,
        length: Number(value.long_unit) || 0,
        height: Number(value.tall_unit) || 0,
        axis_type_id: Number(value.vehicle_axles) || null,
        registration_document_url: value.file_registered_document_id.url
      },
      vehicle_owner_document: {
        owner_document_url: value.file_property_document_id.url,
        employment_contact_url: value.file_hire_contact_document_id.url,
        buyer_contact_url: value.file_purchase_contact_document_id.url,
        assignment_contact_url: value.file_transfer_contact_document_id.url
      },
      vehicle_picture: {
        front_rear_url: value.file_front_image_id.url,
        side_rear_url: value.file_side_image_id.url,
        back_rear_url: value.file_back_image_id.url
      }
    }

    // INIT LOADING
    dispatch(setLoading(true))
    // CREATING REQUEST
    try {
      const response = await putVehicleAPI(id, body)
      if (response.status === 200) {
        Modal.success({
          title: 'สำเร็จ',
          content: 'บันทึกข้อมูลสำเร็จ',
          okText: 'ตกลง',
          onOk: () => {
            dispatch(getVehicleData(vehicle.overview.search))
            dispatch(getProductType())
            setOpen(INIT_VEHICLE_MODAL)
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
      } else {
        console.log(response)
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
  }, [dispatch, vehicle.overview.search, id, setOpen, province])

  // const extractFileName = useCallback((url: string | null) => {
  //   const match = url?.match(/\/([^\/]+)$/);
  //   return match ? match[1] : '';
  // }, [])

  // Documents already live behind an api-key-guarded url, so the form can point straight
  // at them. Fetching each one as a blob first — as this screen used to — left the preview
  // holding bytes with no url, and a blob can only be handed onward as a data: uri, which
  // Chrome refuses to open as a top-level navigation.
  const setDocumentField = useCallback((field: string, label: string, documentUrl?: string | null) => {
    if (!documentUrl) return
    const extension = documentUrl.split('?')[0].split('.').pop()?.toLowerCase()
    // antd decides whether to draw a thumbnail from `type`; it can't read the extension
    // off these urls because the api key sits after it.
    const type = extension === 'pdf'
      ? 'application/pdf'
      : extension
        ? `image/${extension === 'jpg' ? 'jpeg' : extension}`
        : undefined
    setValue(`${field}.file` as never, [
      {
        name: label,
        uid: '1',
        status: 'done',
        url: buildUploadFileUrl(documentUrl),
        type,
      },
    ] as never)
    setValue(`${field}.url` as never, documentUrl as never)
  }, [setValue])

  useEffect(() => {
    setDocumentField('file_registered_document_id', 'เอกสารเล่มทะเบียน', data.vehicle_detail.registration_document_url)
    setDocumentField('file_property_document_id', 'เอกสารถือครองสิทธิ์', data.vehicle_owner_documents.owner_document_url)
    setDocumentField('file_hire_contact_document_id', 'สัญญาจ้างหรือเช่า', data.vehicle_owner_documents.employment_contact_url)
    setDocumentField('file_purchase_contact_document_id', 'สัญญาเช่าซื้อ', data.vehicle_owner_documents.buyer_contact_url)
    setDocumentField('file_transfer_contact_document_id', 'สัญญามอบสิทธิ์', data.vehicle_owner_documents.assignment_contact_url)
    setDocumentField('file_front_image_id', 'รูปด้านหน้า', data.vehicle_pictures.front_rear_url)
    setDocumentField('file_side_image_id', 'รูปด้านข้าง', data.vehicle_pictures.side_rear_url)
    setDocumentField('file_back_image_id', 'รูปด้านหลัง', data.vehicle_pictures.back_rear_url)
  }, [
    setDocumentField,
    data.vehicle_detail.registration_document_url,
    data.vehicle_owner_documents.owner_document_url,
    data.vehicle_owner_documents.employment_contact_url,
    data.vehicle_owner_documents.buyer_contact_url,
    data.vehicle_owner_documents.assignment_contact_url,
    data.vehicle_pictures.front_rear_url,
    data.vehicle_pictures.side_rear_url,
    data.vehicle_pictures.back_rear_url
  ])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} lg={12} xl={12} xxl={12}>
          <FormUpdateData
            control={control}
            setValue={setValue}
          />
        </Col>
        <Col xs={24} sm={24} lg={12} xl={12} xxl={12}>
          <FormUpdateDocument
            control={control}
            setValue={setValue}
          />
        </Col>
      </Row>
      <button ref={submitRef} hidden type='submit' />
    </form>
  )
}

const ModalUpdateVehicle: React.FC<Props> = (props) => {
  const { open, data, setOpen, id } = props
  const submitRef = useRef<HTMLButtonElement>(null)
  const loading = useAppSelector(state => state.layout.loading)
  if (!data) return

  return (
    <Modal
      destroyOnHidden
      width={1600}
      open={open}
      title='แก้ไขข้อมูล'
      okText='บันทึก'
      cancelText='ยกเลิก'
      okButtonProps={{
        loading: loading
      }}
      cancelButtonProps={{
        loading: loading
      }}
      onOk={() => submitRef.current?.click()}
      onCancel={() => setOpen(INIT_VEHICLE_MODAL)}
    >
      <Content
        id={id}
        data={data}
        submitRef={submitRef}
        setOpen={setOpen}
      />
    </Modal>
  )
}

export default React.memo<Props>(ModalUpdateVehicle)
