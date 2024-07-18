import { message, Space, Upload } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import style from './UploadItem.module.scss'
import TrashIcon from '@/assets/icons/ico_trash.svg'
import EyeIcon from '@/assets/icons/ico_eye.svg'
import DownloadIcon from '@/assets/icons/ico_download.svg'
import { UploadChangeParam, RcFile } from 'antd/lib/upload/interface'
import Modal from 'antd/lib/modal/Modal'
import PictureIcon from '@/assets/icons/ico_picture.svg'
import YoutubeIcon from '@/assets/icons/ico_youtube.svg'

interface UploadItemProps {
  title?: string
  isVideo?: boolean
  isNew?: boolean
}

const UploadItem: FC<UploadItemProps> = ({ title = '', isVideo = false, isNew = false }) => {
  const getBase64 = (img: RcFile, callback: (p: string) => void) => {
    const reader = new FileReader()

    reader.addEventListener('load', () => callback(reader.result as string))
    reader.readAsDataURL(img)
  }

  const handleChangeUpload = (info: UploadChangeParam) => {
    console.log(info)
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj as RcFile, (imageUrl: string) => setFiles(imageUrl))
    }
  }

  const [files, setFiles] = useState<string>('')

  const beforeUpload = (file: RcFile) => {
    const isLt400M = file.size / 1024 / 1024 < 400
    if (!isLt400M) {
      message.error('Image must smaller than 400MB!')
    }
    return isLt400M
  }

  const [previewVisible, setPreviewVisible] = useState(false)

  const [thumbnail, setThumbnail] = useState<string>('')

  useEffect(() => {
    if (isNew) {
      setThumbnail('')
    } else {
      setThumbnail(isVideo ? '/images/thumbnail-video.png' : '/images/thumbnail-img.png')
    }
  }, [])

  return (
    <div>
      {title && <p className={style.uploadVideoTitle}>{title}</p>}

      <div className={style.uploadImg}>
        <Upload
          beforeUpload={beforeUpload}
          onChange={handleChangeUpload}
          listType="picture-card"
          showUploadList={false}
        >
          <div>
            {thumbnail ? (
              <img alt="preview modal" width="100%" src={thumbnail} />
            ) : (
              <>
                {isVideo ? <YoutubeIcon /> : <PictureIcon />}
                <p className={style.uploadDescription}>ファイルをここにドラッグ</p>
              </>
            )}
          </div>
        </Upload>

        {thumbnail && (
          <div className={style.uploadActionButtons}>
            <Space size={24}>
              <TrashIcon color="#8C8C8C" onClick={() => setThumbnail('')} />
              <EyeIcon color="#8C8C8C" onClick={() => setPreviewVisible(true)} />
              <DownloadIcon color="#8C8C8C" />
            </Space>
          </div>
        )}
      </div>

      <Modal
        visible={previewVisible}
        title="プレビュー"
        footer={null}
        className={style.previewModal}
        onCancel={() => setPreviewVisible(false)}
      >
        <img alt="preview modal" width="100%" src={thumbnail} />
      </Modal>
    </div>
  )
}

export default UploadItem
