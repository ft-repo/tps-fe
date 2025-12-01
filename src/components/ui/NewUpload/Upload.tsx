import { postUploadFileAPI, postUploadImageAPI, getUploadAPI } from '@/services/entrepreneur/VehicleListService'
import { FaUpload as UploadIcon, FaExpand as MaximizeIcon } from 'react-icons/fa6'
import { useCallback, useState, useEffect } from 'react'
import { useFormContext, Controller, Control, FieldPath, FieldValues } from 'react-hook-form'
import { Modal } from 'antd'

export interface UploadProps<T extends FieldValues = FieldValues> {
  name: string
  label?: string
  accept?: string
  maxSize?: number // in MB
  isImage?: boolean
  disabled?: boolean
  className?: string
  error?: string
  value?: string
  onChange?: (value: string) => void
  onUploadSuccess?: (url: string) => void
  onUploadError?: (error: string) => void
  // Controller props
  control?: Control<T>
  fieldName?: FieldPath<T>
  isRequired?: boolean;
  fixedFileName?: string;
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
    value,
    onChange,
    onUploadSuccess,
    onUploadError,
    control,
    fieldName,
    isRequired,
    fixedFileName
  } = props

  // Use Controller if control is provided, otherwise use useFormContext
  const formContext = useFormContext()
  const isControllerMode = !!control && !!fieldName

  // Actual file name from the file input for display
  const [fileName, setFileName] = useState<string>('')
  // URL preview state
  const [urlPreview, setUrlPreview] = useState<string | null>(null)
  // Image preview state
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const { setValue, watch } = isControllerMode ? {} : formContext

  // Get the field value - either from Controller or direct context
  const getFieldValue = () => {
    if (isControllerMode && control) {
      // For Controller mode, we'll get the value from the field prop
      return undefined // Will be provided by Controller's render prop
    }
    return watch ? watch(name) : undefined
  }

  // Fetch image preview when URL changes
  useEffect(() => {
    const fetchImagePreview = async (url: string) => {
      if (!isImage || !url) {
        setImagePreview(null)
        return
      }

      try {
        // Extract the file path from the URL
        const urlParts = url.split('/')
        const fileName = urlParts[urlParts.length - 2] + '/' + urlParts[urlParts.length - 1]

        if (fileName) {
          const response = await getUploadAPI(fileName)
          if (response.status === 200 && response.data) {
            // Create blob URL for preview
            const blob = new Blob([response.data], { type: 'image/*' })
            const previewUrl = URL.createObjectURL(blob)
            setImagePreview(previewUrl)
          }
        }
      } catch (error) {
        console.error('Error fetching image preview:', error)
        setImagePreview(null)
      }
    }

    if (urlPreview) {
      fetchImagePreview(urlPreview)
    }

    // Cleanup function to revoke blob URLs
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview)
      }
    }
  }, [urlPreview, isImage])

  // Handle value prop changes for existing data
  useEffect(() => {
    if (value) {
      setUrlPreview(value)
      // Extract filename from URL for display
      const urlParts = value.split('/')
      const extractedFileName = urlParts[urlParts.length - 1] || 'ไฟล์ที่อัปโหลด'
      setFileName(extractedFileName)
    } else {
      setUrlPreview(null)
      setFileName('')
      setImagePreview(null)
    }
  }, [value])

  // Cleanup image preview when component unmounts
  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview)
      }
    }
  }, [imagePreview])

  console.log(fileName)

  const uploadFile = useCallback(
    async (fileName: string, file: File, setFieldValue?: (value: any) => void) => {
      let uploadAPI
      if (isImage) {
        uploadAPI = postUploadImageAPI
      } else {
        uploadAPI = postUploadFileAPI
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
            setUrlPreview(fileUrl)
          } else if (setValue) {
            setFileName(file.name)
            setValue(fileName, fileUrl)
            setUrlPreview(fileUrl)
          }
          // Call external onChange if provided
          if (onChange) {
            onChange(fileUrl)
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
    [setValue, maxSize, isImage, onUploadSuccess, onUploadError, onChange],
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
    // Call external onChange if provided
    if (onChange) {
      onChange('')
    }
    // Clear image preview and local state
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview)
    }
    setUrlPreview(null)
    setImagePreview(null)
    setFileName('')
  }

  const handleImageClick = () => {
    let size = '60%';

    if (imagePreview) {
      Modal.confirm({
        title: 'รูปภาพที่อัปโหลด',
        centered: true,
        content: <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />,
        cancelText: 'ปิด',
        okText: 'ขยาย',
        okType: 'primary',
        width: size,
        onOk: () => {
          size = '100%';
        },
        okButtonProps: {
          style: {
            fontFamily: 'Noto Sans Thai'
          }
        },
        cancelButtonProps: {
          style: {
            fontFamily: 'Noto Sans Thai'
          }
        },
        style: {
          fontFamily: 'Noto Sans Thai'
        }
      })
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
          const fieldValue = field.value || value
          const fieldError = fieldState.error?.message

          return (
            <div className={className}>
              {label && (
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {label} {isRequired && <span className='text-red-500'>*</span>}
                </label>
              )}

              {!fieldValue ? (
                <label
                  htmlFor={`upload_${fieldName}`}
                  className={`flex flex-col items-center justify-center w-full p-4 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors ${disabled ? 'opacity-50 cursor-not-allowed' : ''
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
                <div className="space-y-3">
                  {/* File info */}
                  <div className="flex items-center justify-between w-full p-4 border rounded-lg bg-gray-50">
                    <div className="flex items-center overflow-hidden cursor-pointer" onClick={handleImageClick}>
                      {isImage && imagePreview && (
                        <img src={imagePreview} alt="Preview" className="w-10 h-10 mr-2 object-cover" />
                      )}
                      {!isImage && (
                        <UploadIcon className="w-5 h-5 mr-2 text-gray-400 flex-shrink-0" />
                      )}
                      <span className="text-sm text-gray-600 truncate" title={fixedFileName ? fixedFileName : fileName}>
                        {fixedFileName ? fixedFileName : fileName}
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

                  {/* Image preview */}
                  {/* {isImage && imagePreview && (
                    <div className="border rounded-lg overflow-hidden cursor-pointer hover:opacity-50">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="w-full h-48 object-cover"
                        onError={() => setImagePreview(null)}
                      />
                    </div>
                  )} */}
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
  const fieldValue = getFieldValue() || value

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label} {isRequired && <span className='text-red-500'>*</span>}
        </label>
      )}

      {!fieldValue ? (
        <label
          htmlFor={`upload_${name}`}
          className={`flex flex-col items-center justify-center w-full p-4 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors ${disabled ? 'opacity-50 cursor-not-allowed' : ''
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
        <div className="space-y-3">
          {/* File info */}
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

          {/* Image preview */}
          {isImage && imagePreview && (
            <div className="border rounded-lg overflow-hidden">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-48 object-cover"
                onError={() => setImagePreview(null)}
              />
            </div>
          )}
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