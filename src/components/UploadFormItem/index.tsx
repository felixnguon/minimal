import React, { useState, useEffect, useMemo } from 'react'
import moment from 'moment'
import clsx from 'clsx'
import { Upload, Button, Form, message } from 'antd'
import { FormInstance } from 'antd/lib/form/Form'
import { UploadFile, RcFile } from 'antd/lib/upload/interface'
import IconUpload from '@/assets/icons/ico_document.svg'
import IconRemove from '@/assets/icons/ico_remove.svg'
import styles from './UploadFormItem.module.scss'

const { Dragger } = Upload

type PropsType = {
  name: string
  form: FormInstance
  width?: string
  removable?: boolean
}
const UploadFormItem: React.FC<PropsType> = ({ name, form, width = '100%', removable = true }) => {
  const [fileList, setFileList] = useState<UploadFile[]>([])

  const beforeUpload = (file: RcFile) => {
    const isLt400M = file.size / 1024 / 1024 < 400
    if (!isLt400M) {
      message.error('Image must smaller than 400MB!')
    }
    return isLt400M
  }

  const onDrop = (e) => {
    console.log('Dropped files', e.dataTransfer.files)
  }
  const onChange = (info) => {
    const { status } = info.file
    if (status !== 'uploading') {
      console.log(info.file, info.fileList)
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`)
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`)
    }
    const uploadedDate = moment().format('YYYY/MM/DD')
    info.file.uploadedDate = uploadedDate
    info.file.editable = true
    setFileList(info.fileList)
  }

  const formItemRender = (_, file, __, actions) => {
    return (
      <div
        className={clsx(styles.uploadedItem, file.status === 'error' && styles.uploadedItemError)}
      >
        <div>
          <IconUpload />
          {file.url ? (
            <a href={file.url} target="_blank" rel="noreferrer">
              {file.name} {file.uploadedDate ? <span>({file.uploadedDate})</span> : null}
            </a>
          ) : (
            <p>
              {file.name} {file.uploadedDate ? <span>({file.uploadedDate})</span> : null}
            </p>
          )}
        </div>
        {removable ? file.editable ? <IconRemove onClick={actions.remove} /> : null : null}
      </div>
    )
  }

  useEffect(() => {
    if (form.getFieldValue('contracts'))
      setFileList((files) => [...files, ...form.getFieldValue('contracts')])
  }, [form])

  return (
    <Form.Item
      name={name}
      valuePropName="contractFiles"
      rules={[{ required: true, message: 'This field is required' }]}
      className={styles.formUpload}
      style={{ width, marginBottom: '25px' }}
    >
      <Dragger
        name="contractFiles"
        multiple={true}
        beforeUpload={beforeUpload}
        onDrop={onDrop}
        onChange={onChange}
        fileList={fileList}
        accept=".jpeg, .png, .pdf, .heic"
        itemRender={(...args) => formItemRender(...args)}
      >
        <div className={styles.uploadField}>
          <span>
            <p className={styles.guideText}> をここにドラッグ</p>
            <p className={styles.guideText}>ファイル（PDF、JPEG、PNG、HEIC)</p>
          </span>
          <p className={styles.orText}>または</p>
          <Button type="primary">ファイルを選択</Button>
        </div>
      </Dragger>
    </Form.Item>
  )
}

export default UploadFormItem
