import { SignUpCredential } from '@/@types/auth'
import { Select } from '@/components/ui/Select'
import { useAppSelector } from '@/store'
import {
  Control,
  Controller,
  UseFormSetValue,
} from 'react-hook-form'

interface Props {
  control: Control<SignUpCredential>
  setValue: UseFormSetValue<SignUpCredential>
  setProvinceId: (provinceId: string) => void
}

function SignUpForm(props: Props) {
  const { control, setValue, setProvinceId } = props
  const { province, district } = useAppSelector((state) => state.master)

  return (
    <section className="mt-5">
      <div className="block lg:grid grid-cols-2 gap-3">
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
                  options={province.map((item) => {
                    return {
                      label: item.name_th,
                      value: item.id,
                    }
                  })}
                  onChange={(e: any) => {
                    setValue(
                      'business_address.province_id',
                      e.value,
                    )
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
                  options={district.map((item) => {
                    return {
                      label: item.name_th,
                      value: item.id,
                    }
                  })}
                  onChange={(e: any) => {
                    setValue(
                      'business_address.district_id',
                      e.value,
                    )
                    field.onChange(e)
                  }}
                  isDisabled={district.length === 0}
                />
              </fieldset>
            )
          }}
        />
      </div>
    </section>
  )
}

export default SignUpForm
