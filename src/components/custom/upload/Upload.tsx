/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import React, { ReactElement, useCallback } from 'react'
import { Upload as UploadAntd } from 'antd'
import { FaUpload as UploadIcon } from "react-icons/fa6";
import { Button, Notification, toast } from '@/components/ui';
import { HiOutlineCloudUpload } from 'react-icons/hi';
import { RcFile, UploadFile } from 'antd/es/upload';
import { EyeOutlined, DeleteOutlined } from '@ant-design/icons'
// import { useAppSelector } from '@/store';

interface Props {
  name?: string;
  disabled?: boolean;
  onChange?: (event: any) => void;
  id?: number | string | null | any;
  accept?: string;
  maxSizeLimit?: number;
  onRemove?: (event: any) => void;
  beforeUpload?: (file: RcFile, fileList: RcFile[]) => void;
  listType?: 'text' | 'picture' | 'picture-card' | 'picture-circle';
  defaultFileList?: UploadFile[];
  fileList?: UploadFile[];
  maxCount?: number;
  previewFile?: (file: File | Blob) => Promise<any>;
}

const Upload: React.FC<Props> = (props) => {
  const {
    name,
    disabled,
    onChange,
    id,
    accept,
    maxSizeLimit = 5000000,
    onRemove,
    beforeUpload,
    listType = 'text',
    defaultFileList = [],
    fileList = [],
    maxCount = 1,
    previewFile,
    ...propsUpload
  } = props
  // const token = useAppSelector(state => state.auth.session.token)

  const _onBeforeUpload = useCallback((file: RcFile, fileList: RcFile[]) => {
    if (typeof beforeUpload === 'function') {
      return beforeUpload(file, fileList)
    }

    let acceptMimeTypes = accept?.split(',') || []

    if (acceptMimeTypes.length) {
      acceptMimeTypes = acceptMimeTypes.map((item: any) => item.trim())
      if (!acceptMimeTypes.includes(file.type)) {
        // message.error(`ไม่สามารถอัปโหลดไฟล์ได้ ประเภทไฟล์ไม่ถูกต้อง`)
        toast.push(
          <Notification
            type="danger"
            title="ไม่สามารถอัปโหลดไฟล์ได้"
          >
            ไม่สามารถอัปโหลดไฟล์ได้ ประเภทไฟล์ไม่ถูกต้อง
          </Notification>, {
          placement: 'top-center',
        })
        return UploadAntd.LIST_IGNORE
      }
    }

    const isOverMaxSize = file.size > maxSizeLimit
    if (isOverMaxSize) {
      // message.error('ไม่สามารถอัปโหลดไฟล์ได้ ไฟล์ที่อัปโหลดมีขนาดเกิน 10 MB')
      toast.push(
        <Notification
          type="danger"
          title="ไม่สามารถอัปโหลดไฟล์ได้"
        >
          ไม่สามารถอัปโหลดไฟล์ได้ ไฟล์ที่อัปโหลดมีขนาดเกิน 10 MB
        </Notification>, {
        placement: 'top-center',
      })
      return UploadAntd.LIST_IGNORE
    }
    // return isOverMaxSize ? UploadAntd.LIST_IGNORE : true;
    return false;
  }, [beforeUpload, maxSizeLimit, accept])

  const _previewFile = useCallback(async (file: File | Blob | any) => {
    if (typeof previewFile === 'function') {
      return previewFile(file)
    }
    if (file.type && file.type.startsWith('image/')) {
      const objectURL = URL.createObjectURL(file)
      return objectURL
    } else if (file.type && file.type === 'application/pdf') {
      // const pdfBlob = new Blob([file.originFileObj], { type: 'application/pdf' });
      const pdfUrl = URL.createObjectURL(file.originFileObj);
      window.open(pdfUrl);
    }
    return false
  }, [previewFile])

  const _itemRender = useCallback((
    originNode: ReactElement,
    file: UploadFile,
    fileList: object[],
    actions: {
      download: (file: any) => void,
      preview: (file: any) => void,
      remove: (file: any) => void
    }
  ) => {
    if (file.type === 'application/pdf') {
      return (
        <div className='relative inline-block w-full h-full group'>
          {originNode}
          <div className='absolute inset-0 flex justify-center items-center m-2 gap-2.5 text-white bg-black/50 opacity-0 transition-opacity duration-300 z-10 group-hover:opacity-100'>
            <EyeOutlined
              className='text-white text-lg cursor-pointer'
              onClick={() => _previewFile(file)}
            />
            <DeleteOutlined
              className='text-white text-lg cursor-pointer'
              onClick={() => actions.remove(file)}
            />
          </div>
        </div>
      )
    }
    return originNode
  }, [_previewFile]);

  return (
    <UploadAntd
      name={name}
      defaultFileList={defaultFileList || []}
      fileList={fileList || []}
      id={id}
      accept={accept}
      listType={listType}
      disabled={disabled}
      beforeUpload={_onBeforeUpload}
      maxCount={maxCount}
      style={{
        width: '100%',
        fontFamily: 'Noto Sans Thai'
      }}
      // PUT IT HERE
      previewFile={_previewFile}
      // LINE END HERE
      itemRender={_itemRender}
      showUploadList={{
        showRemoveIcon: (file) => {
          if (file.type === 'application/pdf') {
            return false
          } else {
            return true
          }
        }
      }}
      onChange={onChange}
      onRemove={onRemove}
      {...propsUpload}
    >
      {listType === 'picture-card' || listType === 'picture-circle' ?
        maxCount && fileList.length || 0 >= maxCount ? null :
          <div className="my-3 text-center">
            <div className="text-6xl mb-4 flex justify-center">
              <UploadIcon />
            </div>
            <p className="font-semibold text-gray-800 dark:text-white">
              เพิ่มไฟล์
            </p>
            <p className="mt-1 opacity-60 dark:text-white">
              กรุณาอัปโหลดไฟล์ประเภท PDF
            </p>
          </div> :
        <Button
          disabled
          variant="solid"
          icon={<HiOutlineCloudUpload />}
          size='sm'
          type='button'
        >
          เพิ่มไฟล์ .pdf
        </Button>
      }
    </UploadAntd>
  )
}

export default React.memo<Props>(Upload)
