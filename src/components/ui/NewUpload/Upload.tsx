import { postUploadFile, postUploadImage } from '@/services/entrepreneur/VehicleListService'
import { FaUpload as UploadIcon } from 'react-icons/fa6'
import { useCallback, useState } from 'react'
import { useFormContext, Controller, Control, FieldPath, FieldValues } from 'react-hook-form'

export interface UploadProps<T extends FieldValues = FieldValues> {
  name: string
  label?: string
  accept?: string
  maxSize?: number // in MB
  isImage?: boolean
  disabled?: boolean
  className?: string
  error?: string
  onUploadSuccess?: (url: string) => void
  onUploadError?: (error: string) => void
  // Controller props
  control?: Control<T>
  fieldName?: FieldPath<T>
}

function Upload<T extends FieldValues = FieldValues>(props: UploadProps<T>) {
  const { 
    name, 
    label, 
    accept = ".pdf", 
    maxSize = 10, 
    isImage = false, 
    disabled = false,
    className = "",
    error,
    onUploadSuccess,
    onUploadError,
    control,
    fieldName
  } = props
  
  // Use Controller if control is provided, otherwise use useFormContext
  const formContext = useFormContext()
  const isControllerMode = !!control && !!fieldName

  // Actual file name from the file input for display
  const [fileName, setFileName] = useState<string>('')
  
  const { setValue, watch } = isControllerMode ? {} : formContext
  
  // Get the field value - either from Controller or direct context
  const getFieldValue = () => {
    if (isControllerMode && control) {
      // For Controller mode, we'll get the value from the field prop
      return undefined // Will be provided by Controller's render prop
    }
    return watch ? watch(name) : undefined
  }
  
  const uploadFile = useCallback(
    async (fileName: string, file: File, setFieldValue?: (value: any) => void) => {
      let uploadAPI
      if (isImage) {
        uploadAPI = postUploadImage
      } else {
        uploadAPI = postUploadFile
      }
      
      try {
        // Check file size
        if (file.size > maxSize * 1024 * 1024) {
          const errorMsg = `ไฟล์มีขนาดใหญ่เกินไป (สูงสุด ${maxSize}MB)`
          onUploadError?.(errorMsg)
          return
        }
        
        // POST
        const response = await uploadAPI({ upload: file as any })
        if (response.status === 200) {
          const fileUrl = response.data?.url
          if (setFieldValue) {
            // For Controller mode, use the provided setFieldValue
            setFileName(file.name)
            setFieldValue(fileUrl)
          } else if (setValue) {
            setFileName(file.name)
            setValue(fileName, fileUrl)
          }
          onUploadSuccess?.(fileUrl)
        } else {
          const errorMsg = 'เกิดข้อผิดพลาดในการอัปโหลดไฟล์'
          onUploadError?.(errorMsg)
        }
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : 'เกิดข้อผิดพลาดในการอัปโหลดไฟล์'
        onUploadError?.(errorMsg)
      }
    },
    [setValue, maxSize, isImage, onUploadSuccess, onUploadError],
  )

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setFieldValue?: (value: any) => void) => {
    const file = e.target.files?.[0]
    if (file) {
      const targetField = isControllerMode ? (fieldName as string) : name
      uploadFile(targetField, file, setFieldValue)
    }
  }

  const handleRemoveFile = (setFieldValue?: (value: any) => void) => {
    if (setFieldValue) {
      setFieldValue('')
    } else if (setValue) {
      setValue(name, '')
    }
  }

  const getFileDisplayName = (url: string) => {
    if (isImage) {
      return 'รูปภาพ'
    }
    // Extract filename from URL or use default
    const urlParts = url.split('/')
    return urlParts[urlParts.length - 1] || 'ไฟล์ที่อัปโหลด'
  }

  // If using Controller, render the component with field props
  if (isControllerMode && control) {
    return (
      <Controller
        name={fieldName as FieldPath<T>}
        control={control}
        render={({ field, fieldState }) => {
          const fieldValue = field.value
          const fieldError = fieldState.error?.message
          
          return (
            <div className={className}>
              {label && (
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {label}
                </label>
              )}
              
              {!fieldValue ? (
                <label
                  htmlFor={`upload_${fieldName}`}
                  className={`flex flex-col items-center justify-center w-full p-4 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors ${
                    disabled ? 'opacity-50 cursor-not-allowed' : ''
                  } ${fieldError || error ? 'border-red-500' : ''}`}
                >
                  <div className="flex gap-5 items-center justify-center">
                    <UploadIcon className="w-5 h-5 mr-2 text-gray-400" />
                    <p className="text-sm text-gray-500">
                      <span className="font-semibold">
                        คลิกเพื่ออัพโหลดไฟล์
                      </span>
                    </p>
                    <p className="text-xs text-gray-500">
                      {accept.toUpperCase()} (สูงสุด {maxSize}MB)
                    </p>
                  </div>
                  <input
                    id={`upload_${fieldName}`}
                    name={field.name}
                    type="file"
                    className="hidden"
                    accept={accept}
                    disabled={disabled}
                    onChange={(e) => handleFileChange(e, field.onChange)}
                  />
                </label>
              ) : (
                <div className="flex items-center justify-between w-full p-4 border rounded-lg bg-gray-50">
                  <div className="flex items-center overflow-hidden">
                    <UploadIcon className="w-5 h-5 mr-2 text-gray-400 flex-shrink-0" />
                    <span className="text-sm text-gray-600 truncate" title={fileName}>
                      {fileName}
                    </span>
                  </div>
                  <button
                    type="button"
                    className="text-red-500 hover:text-red-700 transition-colors flex-shrink-0 ml-2"
                    onClick={() => handleRemoveFile(field.onChange)}
                    disabled={disabled}
                  >
                    ลบ
                  </button>
                </div>
              )}
              
              {(fieldError || error) && (
                <p className="mt-1 text-sm text-red-600">
                  {fieldError || error}
                </p>
              )}
            </div>
          )
        }}
      />
    )
  }

  // Default mode with useFormContext
  const fieldValue = getFieldValue()
  
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      
      {!fieldValue ? (
        <label
          htmlFor={`upload_${name}`}
          className={`flex flex-col items-center justify-center w-full p-4 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors ${
            disabled ? 'opacity-50 cursor-not-allowed' : ''
          } ${error ? 'border-red-500' : ''}`}
        >
          <div className="flex gap-5 items-center justify-center">
            <UploadIcon className="w-5 h-5 mr-2 text-gray-400" />
            <p className="text-sm text-gray-500">
              <span className="font-semibold">
                คลิกเพื่ออัพโหลดไฟล์
              </span>
            </p>
            <p className="text-xs text-gray-500">
              {accept.toUpperCase()} (สูงสุด {maxSize}MB)
            </p>
          </div>
          <input
            id={`upload_${name}`}
            name={name}
            type="file"
            className="hidden"
            accept={accept}
            disabled={disabled}
            onChange={(e) => handleFileChange(e)}
          />
        </label>
      ) : (
        <div className="flex items-center justify-between w-full p-4 border rounded-lg bg-gray-50">
          <div className="flex items-center">
            <UploadIcon className="w-5 h-5 mr-2 text-gray-400" />
            <span className="text-sm text-gray-600">
              {getFileDisplayName(fieldValue)}
            </span>
          </div>
          <button
            type="button"
            className="text-red-500 hover:text-red-700 transition-colors"
            onClick={() => handleRemoveFile()}
            disabled={disabled}
          >
            ลบ
          </button>
        </div>
      )}
      
      {error && (
        <p className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  )
}

export default Upload