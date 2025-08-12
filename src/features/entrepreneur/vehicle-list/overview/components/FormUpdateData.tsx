/* eslint-disable import/no-unresolved */
/* eslint-disable react-refresh/only-export-components */
import { FieldType } from '@/@types/entrepreneur/vehicle-list'
import { Input, Select } from '@/components/ui';
import { useAppSelector } from '@/store';
import React from 'react'
import { Control, Controller, FieldErrors, UseFormSetValue } from 'react-hook-form'
// import { HiOutlineCloudUpload } from 'react-icons/hi';
import { Upload as CustomUpload } from '@/components/custom/upload';
import { UploadFile } from 'antd';

interface Props {
  control: Control<FieldType>;
  setValue: UseFormSetValue<FieldType>;
  errors: FieldErrors<FieldType>;
  defaultFileList: UploadFile[];
}

const FormUpdateData: React.FC<Props> = (props) => {
  const { control, setValue, errors, defaultFileList } = props
  const { vehicle_type } = useAppSelector(state => state.master)

  return (
    <div className='mt-5'>
      <section className='mb-3'>
        <h5>แก้ไขข้อมูลสำคัญ</h5>
        <p>กรุณากรอกข้อมูลจริงเท่านั้น</p>
      </section>
      <div className='block sm:grid sm:grid-cols-2 gap-3'>
        <Controller
          disabled
          name='vehicle_type'
          control={control}
          rules={{
            required: 'กรุณาระบุประเภทรถ'
          }}
          render={({ field }) => {
            return (
              <fieldset>
                <label>ประเภทรถ</label>
                <Select
                  disabled
                  {...field}
                  name={field.name}
                  placeholder='กรุณาเลือก'
                  options={vehicle_type.map((item) => {
                    return {
                      label: item.name,
                      value: item.id,
                    }
                  }) as any}
                  onChange={(e: any) => {
                    setValue('vehicle_type', e.value)
                    field.onChange(e)
                  }}
                />
                {!!errors.vehicle_type &&
                  <p className='text-red-500'>{errors.vehicle_type.message}</p>
                }
              </fieldset>
            )
          }}
        />
        <Controller
          disabled
          name='license_plate'
          control={control}
          rules={{
            required: 'กรุณาระบุเลขทะเบียน / เลขตัวรถ'
          }}
          render={({ field }) => {
            return (
              <fieldset>
                <label>เลขทะเบียน / เลขตัวรถ</label>
                <Input
                  disabled
                  {...field}
                  name={field.name}
                  placeholder='กรุณาระบุ'
                />
                {!!errors.license_plate &&
                  <p className='text-red-500'>{errors.license_plate.message}</p>
                }
              </fieldset>
            )
          }}
        />
        <Controller
          name='vehicle_model'
          control={control}
          rules={{
            required: 'กรุณาระบุยี่ห้อ',
          }}
          render={({ field }) => {
            return (
              <fieldset>
                <label>ยี่ห้อ</label>
                <Input
                  {...field}
                  name={field.name}
                  placeholder='กรุณาระบุ'
                />
                {!!errors.vehicle_model &&
                  <p className='text-red-500'>{errors.vehicle_model.message}</p>
                }
              </fieldset>
            )
          }}
        />
        <Controller
          disabled
          name='province'
          control={control}
          rules={{
            required: 'กรุณาระบุจังหวัด'
          }}
          render={({ field }) => {
            return (
              <fieldset>
                <label>จังหวัด</label>
                <Input
                  disabled
                  {...field}
                  name={field.name}
                  placeholder='กรุณาระบุ'
                />
                {!!errors.province &&
                  <p className='text-red-500'>{errors.province.message}</p>
                }
              </fieldset>
            )
          }}
        />
        <Controller
          disabled
          name='vehicle_weight'
          control={control}
          rules={{
            required: 'กรุณาระบุน้ำหนักรถเปล่า (กก.)'
          }}
          render={({ field }) => {
            return (
              <fieldset>
                <label>น้ำหนักรถเปล่า (กก.)</label>
                <Input
                  disabled
                  {...field}
                  name={field.name}
                  placeholder='กรุณาระบุ'
                />
                {!!errors.vehicle_weight &&
                  <p className='text-red-500'>{errors.vehicle_weight.message}</p>
                }
              </fieldset>
            )
          }}
        />
        <Controller
          name='vehicle_color'
          control={control}
          rules={{
            required: 'กรุณาระบุสีรถ'
          }}
          render={({ field }) => {
            return (
              <fieldset>
                <label>สีรถ</label>
                <Input
                  {...field}
                  name={field.name}
                  placeholder='กรุณาระบุ'
                />
                {!!errors.vehicle_color &&
                  <p className='text-red-500'>{errors.vehicle_color.message}</p>
                }
              </fieldset>
            )
          }}
        />
        <div className='col-span-2'>
          <Controller
            name='vehicle_distance'
            control={control}
            rules={{
              required: 'กรุณาระบุระยะ kingpin (ม.)'
            }}
            render={({ field }) => {
              return (
                <fieldset>
                  <label>ระยะ kingpin (ม.)</label>
                  <Input
                    {...field}
                    name={field.name}
                    placeholder='กรุณาระบุ'
                  />
                  {!!errors.vehicle_distance &&
                    <p className='text-red-500'>{errors.vehicle_distance.message}</p>
                  }
                </fieldset>
              )
            }}
          />
        </div>
      </div>
      <div className='block sm:grid sm:grid-cols-3 gap-3 mt-3'>
        <Controller
          name='wide_unit'
          control={control}
          rules={{
            required: 'กรุณาระบุกว้าง (ม.)'
          }}
          render={({ field }) => {
            return (
              <fieldset>
                <label>กว้าง (ม.)</label>
                <Input
                  {...field}
                  name={field.name}
                  placeholder='กรุณาระบุ'
                />
                {!!errors.wide_unit &&
                  <p className='text-red-500'>{errors.wide_unit.message}</p>
                }
              </fieldset>
            )
          }}
        />
        <Controller
          disabled
          name='long_unit'
          control={control}
          rules={{
            required: 'กรุณาระบุกว้าง (ม.)'
          }}
          render={({ field }) => {
            return (
              <fieldset>
                <label>ยาว (ม.)</label>
                <Input
                  disabled
                  {...field}
                  name={field.name}
                  placeholder='กรุณาระบุ'
                />
                {!!errors.long_unit &&
                  <p className='text-red-500'>{errors.long_unit.message}</p>
                }
              </fieldset>
            )
          }}
        />
        <Controller
          disabled
          name='tall_unit'
          control={control}
          rules={{
            required: 'กรุณาระบุสูง (ม.)'
          }}
          render={({ field }) => {
            return (
              <fieldset>
                <label>สูง (ม.)</label>
                <Input
                  disabled
                  {...field}
                  name={field.name}
                  placeholder='กรุณาระบุ'
                />
                {!!errors.tall_unit &&
                  <p className='text-red-500'>{errors.tall_unit.message}</p>
                }
              </fieldset>
            )
          }}
        />
      </div>
      <div className='mt-3'>
        <Controller
          disabled
          name='file_registered_document_id'
          control={control}
          rules={{
            required: 'กรุณาอัปโหลดเอกสารเล่มทะเบียน'
          }}
          render={({ field }) => {
            return (
              <fieldset>
                <label>เอกสารเล่มทะเบียน</label>
                <div className='block'>
                  <CustomUpload
                    disabled
                    {...field}
                    name={field.name}
                    listType='picture-card'
                    maxCount={1}
                    defaultFileList={[defaultFileList[0]]}
                    fileList={[defaultFileList[0]]}
                  />
                </div>
                {/* <Upload
                  disabled
                  className='block'
                  uploadLimit={1}
                  // fileList={[fileList[0]]}
                >
                  <Button
                    disabled
                    variant="solid"
                    icon={<HiOutlineCloudUpload />}
                    size='sm'
                    type='button'
                  >
                    เพิ่มไฟล์ .pdf
                  </Button>
                </Upload> */}
                {!!errors.file_registered_document_id &&
                  <p className='text-red-500'>{errors.file_registered_document_id.message}</p>
                }
              </fieldset>
            )
          }}
        />

      </div>
    </div>
  )
}

export default React.memo<Props>(FormUpdateData)
