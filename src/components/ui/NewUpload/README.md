# Upload Component with React Hook Form

This component provides a file upload interface that integrates seamlessly with React Hook Form. It supports both **direct usage** (with `useFormContext`) and **Controller usage** patterns.

## Features

- ✅ Full React Hook Form integration
- ✅ Two usage patterns: Direct and Controller
- ✅ File size validation
- ✅ File type restrictions
- ✅ Image and document support
- ✅ Error handling and display
- ✅ Success/error callbacks
- ✅ Disabled state support
- ✅ Customizable styling
- ✅ File removal functionality

## Usage Patterns

### 1. Direct Usage (useFormContext)

Use this pattern when you want simple integration within a `FormProvider`:

```tsx
import { useForm, FormProvider } from 'react-hook-form'
import Upload from '@/components/ui/NewUpload'

const MyForm = () => {
  const methods = useForm({
    defaultValues: {
      document: ''
    }
  })

  return (
    <FormProvider {...methods}>
      <form>
        <Upload
          name="document"
          label="Upload Document"
          accept=".pdf"
          maxSize={10}
        />
      </form>
    </FormProvider>
  )
}
```

### 2. Controller Usage

Use this pattern when you need more control over the field or want to use it outside of `FormProvider`:

```tsx
import { useForm, Controller } from 'react-hook-form'
import Upload from '@/components/ui/NewUpload'

const MyForm = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      document: ''
    }
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="document"
        control={control}
        render={({ field, fieldState }) => (
          <Upload
            name="document"
            label="Upload Document"
            accept=".pdf"
            maxSize={10}
            error={fieldState.error?.message}
            control={control}
            fieldName="document"
          />
        )}
      />
    </form>
  )
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | **required** | Form field name |
| `label` | `string` | - | Label displayed above the upload area |
| `accept` | `string` | `".pdf"` | Accepted file types (e.g., ".pdf,.doc,.jpg") |
| `maxSize` | `number` | `10` | Maximum file size in MB |
| `isImage` | `boolean` | `false` | Whether this is an image upload (affects display) |
| `disabled` | `boolean` | `false` | Whether the upload is disabled |
| `className` | `string` | `""` | Additional CSS classes |
| `error` | `string` | - | Error message to display |
| `onUploadSuccess` | `(url: string) => void` | - | Callback when upload succeeds |
| `onUploadError` | `(error: string) => void` | - | Callback when upload fails |

### Controller-specific Props

| Prop | Type | Description |
|------|------|-------------|
| `control` | `Control<T>` | React Hook Form control object (required for Controller mode) |
| `fieldName` | `FieldPath<T>` | Field name for Controller mode (required for Controller mode) |

## Advanced Usage Examples

### With Validation

```tsx
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const schema = yup.object({
  document: yup.string().required('Document is required')
})

const MyForm = () => {
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      document: ''
    }
  })

  const { formState: { errors } } = methods

  return (
    <FormProvider {...methods}>
      <form>
        <Upload
          name="document"
          label="Upload Document"
          accept=".pdf,.doc,.docx"
          maxSize={20}
          error={errors.document?.message}
        />
      </form>
    </FormProvider>
  )
}
```

### With Callbacks

```tsx
<Upload
  name="profileImage"
  label="Profile Image"
  accept=".jpg,.jpeg,.png"
  maxSize={5}
  isImage={true}
  onUploadSuccess={(url) => {
    console.log('Upload successful:', url)
    // Handle successful upload
  }}
  onUploadError={(error) => {
    console.error('Upload failed:', error)
    // Handle upload error
  }}
/>
```

### Mixed Usage Patterns

```tsx
const MyForm = () => {
  const methods = useForm({
    defaultValues: {
      businessLicense: '',
      taxCertificate: '',
      profileImage: ''
    }
  })

  const { control } = methods

  return (
    <FormProvider {...methods}>
      <form>
        {/* Direct usage */}
        <Upload
          name="businessLicense"
          label="Business License"
          accept=".pdf"
          maxSize={10}
        />
        
        {/* Controller usage */}
        <Controller
          name="taxCertificate"
          control={control}
          render={({ field, fieldState }) => (
            <Upload
              name="taxCertificate"
              label="Tax Certificate"
              accept=".pdf"
              maxSize={10}
              error={fieldState.error?.message}
              control={control}
              fieldName="taxCertificate"
            />
          )}
        />
        
        {/* Direct usage */}
        <Upload
          name="profileImage"
          label="Company Logo"
          accept=".jpg,.jpeg,.png"
          maxSize={5}
          isImage={true}
        />
      </form>
    </FormProvider>
  )
}
```

## When to Use Each Pattern

### Use Direct Usage (useFormContext) when:
- ✅ You're within a `FormProvider` context
- ✅ You want simple, straightforward integration
- ✅ You don't need complex field control
- ✅ You're building a standard form

### Use Controller Usage when:
- ✅ You need more control over the field
- ✅ You're using the component outside of `FormProvider`
- ✅ You want to customize field behavior
- ✅ You need to access field state directly
- ✅ You're building complex forms with conditional rendering

## Requirements

- React Hook Form must be set up
- For direct usage: Must be within `FormProvider` context
- For Controller usage: Must provide `control` and `fieldName` props
- File upload services must be configured

## Notes

- The component automatically handles file size validation
- Uploaded files are stored as URLs in the form state
- The component supports both single file uploads
- File removal clears the form field value
- Error states are automatically handled and displayed
- Both usage patterns provide the same functionality and UI
