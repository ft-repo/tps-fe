import React from 'react'
import { useForm, FormProvider, Controller } from 'react-hook-form'
import { Button } from '@/components/ui'
import Upload from './Upload'

interface FormData {
  businessDocument: string
  profileImage: string
  contractFile: string
  licenseFile: string
}

const UploadDemo: React.FC = () => {
  const methods = useForm<FormData>({
    defaultValues: {
      businessDocument: '',
      profileImage: '',
      contractFile: '',
      licenseFile: ''
    }
  })

  const { handleSubmit, watch, formState: { errors }, control } = methods
  const watchedValues = watch()

  const onSubmit = (data: FormData) => {
    console.log('Form submitted:', data)
  }

  const handleUploadSuccess = (fieldName: string, url: string) => {
    console.log(`${fieldName} uploaded successfully:`, url)
  }

  const handleUploadError = (fieldName: string, error: string) => {
    console.error(`${fieldName} upload failed:`, error)
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto p-6 space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Upload Component Demo</h2>
        
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2">Direct Usage (useFormContext)</h3>
          <p className="text-sm text-blue-700 mb-4">
            These upload fields use the component directly within FormProvider context
          </p>
        </div>

        {/* Business Document Upload - Direct Usage */}
        <div>
          <Upload
            name="businessDocument"
            label="หนังสือรับรองนิติบุคคล (Direct Usage)"
            accept=".pdf"
            maxSize={10}
            error={errors.businessDocument?.message}
            onUploadSuccess={(url) => handleUploadSuccess('businessDocument', url)}
            onUploadError={(error) => handleUploadError('businessDocument', error)}
          />
        </div>

        {/* Profile Image Upload - Direct Usage */}
        <div>
          <Upload
            name="profileImage"
            label="รูปโปรไฟล์ (Direct Usage)"
            accept=".jpg,.jpeg,.png"
            maxSize={5}
            isImage={true}
            error={errors.profileImage?.message}
            onUploadSuccess={(url) => handleUploadSuccess('profileImage', url)}
            onUploadError={(error) => handleUploadError('profileImage', error)}
          />
        </div>

        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="font-semibold text-green-800 mb-2">Controller Usage</h3>
          <p className="text-sm text-green-700 mb-4">
            These upload fields use the Controller pattern for more control
          </p>
        </div>

        {/* Contract File Upload - Controller Usage */}
        <div>
          <Controller
            name="contractFile"
            control={control}
            render={({ field, fieldState }) => (
              <Upload
                name="contractFile"
                label="สัญญา (Controller Usage)"
                accept=".pdf,.doc,.docx"
                maxSize={20}
                error={fieldState.error?.message}
                onUploadSuccess={(url) => handleUploadSuccess('contractFile', url)}
                onUploadError={(error) => handleUploadError('contractFile', error)}
                control={control}
                fieldName="contractFile"
              />
            )}
          />
        </div>

        {/* License File Upload - Controller Usage */}
        <div>
          <Controller
            name="licenseFile"
            control={control}
            render={({ field, fieldState }) => (
              <Upload
                name="licenseFile"
                label="ใบอนุญาต (Controller Usage)"
                accept=".pdf,.jpg,.jpeg,.png"
                maxSize={15}
                error={fieldState.error?.message}
                onUploadSuccess={(url) => handleUploadSuccess('licenseFile', url)}
                onUploadError={(error) => handleUploadError('licenseFile', error)}
                control={control}
                fieldName="licenseFile"
              />
            )}
          />
        </div>

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
    </FormProvider>
  )
}

export default UploadDemo
