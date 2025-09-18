import { SignUpFieldType } from '@/@types/auth'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Upload } from '@/components/ui/NewUpload'
import { useAppSelector } from '@/store'
import { useCallback } from 'react'
import {
  Control,
  Controller,
  FieldErrors,
  UseFormSetError,
  UseFormSetValue,
  useWatch,
} from 'react-hook-form'
import { Notification, toast } from '@/components/ui'

interface Props {
  control: Control<SignUpFieldType>
  setValue: UseFormSetValue<SignUpFieldType>
  errors: FieldErrors<SignUpFieldType>
  setError: UseFormSetError<SignUpFieldType>
  setProvinceId: (provinceId: string) => void
  setDistrictId: (districtId: string) => void
}

function SignUpForm(props: Props) {
  const { control, setValue, setProvinceId, setDistrictId, errors, setError } =
    props
  const { province, district, sub_district, entity_type, contact_type } =
    useAppSelector((state) => state.master)

  const password = useWatch({ control, name: 'password' })

  const handleUploadError = useCallback((error: string) => {
    toast.push(
      <Notification type="danger" title="ผิดพลาด">
        {error}
      </Notification>,
      { placement: 'top-center' }
    )
  }, [])

  return (
    <section className="mt-5">
      <div className="block lg:grid grid-cols-2 gap-3">
        <Controller
          name="business_detail.entity_type_id"
          control={control}
          rules={{ required: 'กรุณาระบุ' }}
          render={({ field }) => {
            return (
              <fieldset>
                <label>ประเภทนิติบุคคล</label>
                <Select
                  {...field}
                  name={field.name}
                  placeholder="กรุณาเลือก"
                  options={entity_type.map((item) => ({
                    label: item.name,
                    value: item.id,
                  }))}
                  onChange={(e: any) => {
                    setValue('business_detail.entity_type_id', e.value)
                    field.onChange(e)
                  }}
                />
                {!!errors.business_detail?.entity_type_id && (
                  <p className="text-red-500">
                    {errors.business_detail.entity_type_id.message}
                  </p>
                )}
              </fieldset>
            )
          }}
        />

        {/* เลขทะเบียนนิติบุคคล: ตัวเลขล้วน + 13 หลัก */}
        <Controller
          name="business_detail.registration_no"
          control={control}
          rules={{
            required: 'กรุณาระบุ',
            pattern: {
              value: /^\d+$/,
              message: 'กรุณากรอกเฉพาะตัวเลข',
            },
            minLength: { value: 13, message: 'กรุณากรอกหมายเลขให้ถูกต้อง' },
            maxLength: { value: 13, message: 'กรุณากรอกหมายเลขให้ถูกต้อง' },
          }}
          render={({ field }) => {
            return (
              <fieldset>
                <label>เลขทะเบียนนิติบุคคล</label>
                <Input
                  {...field}
                  name={field.name}
                  placeholder="กรุณาระบุ"
                  maxLength={13}
                  inputMode="numeric"
                  onChange={(e) => {
                    setValue('business_detail.registration_no', e.target.value)
                    field.onChange(e)
                  }}
                />
                {!!errors.business_detail?.registration_no && (
                  <p className="text-red-500">
                    {errors.business_detail.registration_no.message}
                  </p>
                )}
              </fieldset>
            )
          }}
        />

        <Controller
          name="business_detail.business_name"
          control={control}
          rules={{ required: 'กรุณาระบุ' }}
          render={({ field }) => {
            return (
              <fieldset className="col-span-2">
                <label>ชื่อบริษัท/ห้าง/ร้าน</label>
                <Input
                  {...field}
                  name={field.name}
                  placeholder="กรุณาระบุ"
                  onChange={(e) => {
                    setValue('business_detail.business_name', e.target.value)
                    field.onChange(e)
                  }}
                />
                {!!errors.business_detail?.business_name && (
                  <p className="text-red-500">
                    {errors.business_detail.business_name.message}
                  </p>
                )}
              </fieldset>
            )
          }}
        />

        {/* เบอร์โทร: ตัวเลขล้วน */}
        <Controller
          name="business_address.phone_number"
          control={control}
          rules={{
            required: 'กรุณาระบุ',
            pattern: { value: /^\d+$/, message: 'กรุณากรอกเฉพาะตัวเลข' },
            minLength: { value: 9, message: 'กรุณากรอกหมายเลขให้ถูกต้อง' },
            maxLength: { value: 9, message: 'กรุณากรอกหมายเลขให้ถูกต้อง' },
          }}
          render={({ field }) => {
            return (
              <fieldset className="col-span-2">
                <label>เบอร์โทรสำนักงาน</label>
                <Input
                  {...field}
                  name={field.name}
                  placeholder="กรุณาระบุ"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="off"
                  maxLength={9}
                  onChange={(e) => {
                    setValue('business_address.phone_number', e.target.value)
                    field.onChange(e)
                  }}
                />
                {!!errors.business_address?.phone_number && (
                  <p className="text-red-500">
                    {errors.business_address.phone_number.message}
                  </p>
                )}
              </fieldset>
            )
          }}
        />

        {/* ข้อมูลที่อยู่ */}
        <div className="mb-4 col-span-2">
          <div className="font-semibold mb-2">ที่อยู่ (Address)</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Controller
              name="business_address.house_number"
              control={control}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>เลขที่</label>
                    <Input
                      {...field}
                      name={field.name}
                      placeholder="กรุณาระบุ"
                      onChange={(e) => {
                        setValue('business_address.house_number', e.target.value)
                        field.onChange(e)
                      }}
                    />
                  </fieldset>
                )
              }}
            />
            <Controller
              name="business_address.village"
              control={control}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>หมู่ที่</label>
                    <Input
                      {...field}
                      name={field.name}
                      placeholder="กรุณาระบุ"
                      onChange={(e) => {
                        setValue('business_address.village', e.target.value)
                        field.onChange(e)
                      }}
                    />
                  </fieldset>
                )
              }}
            />
            <Controller
              name="business_address.lane"
              control={control}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>ซอย</label>
                    <Input
                      {...field}
                      name={field.name}
                      placeholder="กรุณาระบุ"
                      onChange={(e) => {
                        setValue('business_address.lane', e.target.value)
                        field.onChange(e)
                      }}
                    />
                  </fieldset>
                )
              }}
            />
            <Controller
              name="business_address.road"
              control={control}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>ถนน</label>
                    <Input
                      {...field}
                      name={field.name}
                      placeholder="กรุณาระบุ"
                      onChange={(e) => {
                        setValue('business_address.road', e.target.value)
                        field.onChange(e)
                      }}
                    />
                  </fieldset>
                )
              }}
            />
            <Controller
              name="business_address.province_id"
              control={control}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>จังหวัด</label>
                    <Select
                      {...field}
                      name={field.name}
                      placeholder="กรุณาเลือก"
                      options={province.map((item) => ({
                        label: item.name_th,
                        value: item.id,
                      }))}
                      onChange={(e: any) => {
                        setValue('business_address.province_id', e.value)
                        setProvinceId(e.value)
                        field.onChange(e)
                      }}
                    />
                  </fieldset>
                )
              }}
            />
            <Controller
              name="business_address.district_id"
              control={control}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>เขต/อำเภอ</label>
                    <Select
                      {...field}
                      name={field.name}
                      placeholder="กรุณาเลือก"
                      options={district.map((item) => ({
                        label: item.name_th,
                        value: item.id,
                      }))}
                      onChange={(e: any) => {
                        setValue('business_address.district_id', e.value)
                        setValue('business_address.sub_district_id', 0)
                        setValue('business_address.zip_code', '')
                        setDistrictId(e.value)
                        field.onChange(e)
                      }}
                      isDisabled={district.length === 0}
                    />
                  </fieldset>
                )
              }}
            />
            <Controller
              name="business_address.sub_district_id"
              control={control}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>แขวง/ตำบล</label>
                    <Select
                      {...field}
                      name={field.name}
                      placeholder="กรุณาเลือก"
                      options={sub_district.map((item) => ({
                        label: item.name_th,
                        value: item.id,
                      }))}
                      onChange={(e: any) => {
                        setValue('business_address.sub_district_id', e.value)
                        setValue(
                          'business_address.zip_code',
                          sub_district.find((item) => item.id === e.value)?.zip_code || ''
                        )
                        field.onChange(e)
                      }}
                      isDisabled={sub_district.length === 0}
                    />
                  </fieldset>
                )
              }}
            />
            <Controller
              name="business_address.zip_code"
              control={control}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>รหัสไปรษณีย์</label>
                    <Input
                      {...field}
                      name={field.name}
                      placeholder="กรุณาระบุ"
                      disabled
                      onChange={(e) => {
                        setValue('business_address.zip_code', e.target.value)
                        field.onChange(e)
                      }}
                    />
                  </fieldset>
                )
              }}
            />
          </div>
        </div>

        {/* ผู้รับมอบอำนาจ / ผู้ติดต่อ */}
        <div className="mb-4 col-span-2">
          <div className="font-semibold mb-2">ผู้ติดต่อ/รับมอบอำนาจ</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Controller
              name="contact_info.contact_name"
              control={control}
              rules={{ required: 'กรุณาระบุ' }}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>ชื่อผู้ติดต่อ / มอบอำนาจ</label>
                    <Input
                      {...field}
                      name={field.name}
                      placeholder="กรุณาระบุ"
                      onChange={(e) => {
                        setValue('contact_info.contact_name', e.target.value)
                        field.onChange(e)
                      }}
                    />
                    {!!errors.contact_info?.contact_name && (
                      <p className="text-red-500">
                        {errors.contact_info.contact_name.message}
                      </p>
                    )}
                  </fieldset>
                )
              }}
            />
            <Controller
              name="contact_info.contact_type_id"
              control={control}
              rules={{ required: 'กรุณาระบุ' }}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>ประเภทผู้ติดต่อ / มอบอำนาจ</label>
                    <Select
                      {...field}
                      name={field.name}
                      placeholder="กรุณาเลือก"
                      options={contact_type.map((item) => ({
                        label: item.name,
                        value: item.id,
                      }))}
                      onChange={(e: any) => {
                        setValue('contact_info.contact_type_id', e.value)
                        field.onChange(e)
                      }}
                    />
                    {!!errors.contact_info?.contact_name && (
                      <p className="text-red-500">
                        {errors.contact_info.contact_name.message}
                      </p>
                    )}
                  </fieldset>
                )
              }}
            />
            {/* เบอร์โทรผู้ติดต่อ: ตัวเลขล้วน */}
            <Controller
              name="contact_info.phone_number"
              control={control}
              rules={{
                required: 'กรุณาระบุ',
                pattern: { value: /^\d+$/, message: 'กรุณากรอกเฉพาะตัวเลข' },
                minLength: { value: 9, message: 'กรุณากรอกหมายเลขให้ถูกต้อง' },
                maxLength: { value: 9, message: 'กรุณากรอกหมายเลขให้ถูกต้อง' },
              }}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>เบอร์โทรผู้ติดต่อ</label>
                    <Input
                      {...field}
                      name={field.name}
                      placeholder="กรุณาระบุ"
                      type="tel"
                      inputMode="numeric"
                      autoComplete="off"
                      maxLength={9}
                      onChange={(e) => {
                        setValue('contact_info.phone_number', e.target.value)
                        field.onChange(e)
                      }}
                    />
                    {!!errors.contact_info?.phone_number && (
                      <p className="text-red-500">
                        {errors.contact_info.phone_number.message}
                      </p>
                    )}
                  </fieldset>
                )
              }}
            />
            {/* เลขบัตร: ตัวเลขล้วน + 13 หลัก */}
            <Controller
              name="contact_info.cid"
              control={control}
              rules={{
                required: 'กรุณาระบุ',
                pattern: { value: /^\d+$/, message: 'กรุณากรอกเฉพาะตัวเลข' },
                minLength: { value: 13, message: 'กรุณากรอกหมายเลขให้ถูกต้อง' },
                maxLength: { value: 13, message: 'กรุณากรอกหมายเลขให้ถูกต้อง' },
              }}
              render={({ field }) => {
                return (
                  <fieldset>
                    <label>หมายเลขบัตรประชาชน</label>
                    <Input
                      {...field}
                      name={field.name}
                      placeholder="กรุณาระบุ"
                      type="text"
                      inputMode="numeric"
                      autoComplete="off"
                      maxLength={13}
                      onChange={(e) => {
                        setValue('contact_info.cid', e.target.value)
                        field.onChange(e)
                      }}
                    />
                    {!!errors.contact_info?.cid && (
                      <p className="text-red-500">
                        {errors.contact_info.cid.message}
                      </p>
                    )}
                  </fieldset>
                )
              }}
            />
          </div>
        </div>

        {/* เอกสารที่ต้องมี */}
        <div className="mb-4 col-span-2">
          <Controller
            name="business_document.business_file_url"
            control={control}
            rules={{ required: 'หนังสือรับรองนิติบุคคลต้องมี' }}
            render={({ field, fieldState }) => (
              <Upload
                name="business_document.business_file_url"
                label="หนังสือรับรองนิติบุคคล"
                accept=".pdf"
                maxSize={10}
                value={field.value}
                error={fieldState.error?.message}
                control={control}
                fieldName="business_document.business_file_url"
                onUploadError={(error) => {
                  handleUploadError(error)
                }}
              />
            )}
          />
          <Controller
            name="business_document.cid_card_file_url"
            control={control}
            rules={{ required: 'รูปบัตรประชาชนต้องมี' }}
            render={({ field, fieldState }) => (
              <Upload
                name="business_document.cid_card_file_url"
                label="รูปบัตรประชาชน"
                accept=".png,.jpeg,.jpg"
                isImage={true}
                value={field.value}
                maxSize={10}
                error={fieldState.error?.message}
                control={control}
                fieldName="business_document.cid_card_file_url"
                onUploadError={(error) => {
                  handleUploadError(error)
                }}
              />
            )}
          />
          <Controller
            name="business_document.certificate_file_url"
            control={control}
            rules={{ required: 'รูปบริษัท / ผู้ติดต่อ / ผู้มอบอำนาจต้องมี' }}
            render={({ field, fieldState }) => (
              <Upload
                name="business_document.certificate_file_url"
                label="รูปบริษัท / ผู้ติดต่อ / ผู้มอบอำนาจ"
                accept=".pdf,.png,.jpeg,.jpg"
                isImage={true}
                value={field.value}
                maxSize={10}
                error={fieldState.error?.message}
                control={control}
                fieldName="business_document.certificate_file_url"
                onUploadError={(error) => {
                  handleUploadError(error)
                }}
              />
            )}
          />
        </div>

        <Controller
          name="password"
          control={control}
          rules={{ required: 'กรุณาระบุ' }}
          render={({ field }) => {
            return (
              <fieldset>
                <label>รหัสผ่าน</label>
                <Input
                  {...field}
                  name={field.name}
                  placeholder="กรุณาระบุ"
                  type="password"
                  autoComplete="off"
                  onChange={(e) => {
                    setValue('password', e.target.value)
                    field.onChange(e)
                  }}
                />
                {!!errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </fieldset>
            )
          }}
        />

        <Controller
          name="password_confirmation"
          control={control}
          rules={{
            required: 'กรุณาระบุ',
            validate: (value) => value === password || 'รหัสผ่านไม่ตรงกัน',
            onBlur: (e) => {
              if (e.target.value !== password) {
                setError('password_confirmation', {
                  message: 'รหัสผ่านไม่ตรงกัน',
                })
              }
            },
          }}
          render={({ field }) => {
            return (
              <fieldset>
                <label>ยืนยันรหัสผ่าน</label>
                <Input
                  {...field}
                  name={field.name}
                  placeholder="กรุณาระบุ"
                  type="password"
                  autoComplete="off"
                  onChange={(e) => {
                    setValue('password_confirmation', e.target.value)
                    field.onChange(e)
                  }}
                />
                {!!errors.password_confirmation && (
                  <p className="text-red-500">
                    {errors.password_confirmation.message}
                  </p>
                )}
              </fieldset>
            )
          }}
        />
      </div>
    </section>
  )
}

export default SignUpForm
