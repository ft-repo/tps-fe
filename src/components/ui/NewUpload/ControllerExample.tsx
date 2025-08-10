import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Button } from '@/components/ui'
import Upload from './Upload'

interface FormData {
  businessLicense: string
  taxCertificate: string
  profileImage: string
}

const ControllerExample: React.FC = () => {
  const { control, handleSubmit, watch, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      businessLicense: '',
      taxCertificate: '',
      profileImage: ''
    }
  })

  const watchedValues = watch()

  const onSubmit = (data: FormData) => {
    console.log('Form submitted:', data)
  }

  // Example of conditional rendering based on form state
  const showTaxCertificate = watchedValues.businessLicense

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Controller Usage Example</h2>
      <p className="text-gray-600">
        This example shows how to use the Upload component with Controller for more complex scenarios.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Business License - Always visible */}
        <Controller
          name="businessLicense"
          control={control}
          rules={{ required: 'Business license is required' }}
          render={({ field, fieldState }) => (
            <Upload
              name="businessLicense"
              label="Business License *"
              accept=".pdf"
              maxSize={10}
              error={fieldState.error?.message}
              control={control}
              fieldName="businessLicense"
            />
          )}
        />

        {/* Tax Certificate - Only visible when business license is uploaded */}
        {showTaxCertificate && (
          <Controller
            name="taxCertificate"
            control={control}
            rules={{ required: 'Tax certificate is required when business license is provided' }}
            render={({ field, fieldState }) => (
              <Upload
                name="taxCertificate"
                label="Tax Certificate *"
                accept=".pdf"
                maxSize={10}
                error={fieldState.error?.message}
                control={control}
                fieldName="taxCertificate"
              />
            )}
          />
        )}

        {/* Profile Image - Optional */}
        <Controller
          name="profileImage"
          control={control}
          render={({ field, fieldState }) => (
            <Upload
              name="profileImage"
              label="Company Logo (Optional)"
              accept=".jpg,.jpeg,.png"
              maxSize={5}
              isImage={true}
              error={fieldState.error?.message}
              control={control}
              fieldName="profileImage"
            />
          )}
        />

        {/* Form Values Display */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-700 mb-2">Current Form Values:</h3>
          <pre className="text-sm text-gray-600 whitespace-pre-wrap">
            {JSON.stringify(watchedValues, null, 2)}
          </pre>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button type="submit" variant="solid">
            Submit Form
          </Button>
        </div>
      </form>
    </div>
  )
}

export default ControllerExample
