import React, { useState } from 'react'
import { Modal, Button, ModalProps, Form, Input, Row, Col, Upload, message, Space } from 'antd'
import AvatarIcon from '@/assets/icons/ico_avatar.svg'
import CameraIcon from '@/assets/icons/ico_camera.svg'
import styles from './ModalUserSetting.module.scss'

type PropsType = ModalProps & {
  handleCloseModal: () => void
  handleOpenModalChangePassword: () => void
  user: any
}

const ModalUserSetting: React.FC<PropsType> = ({
  handleCloseModal,
  handleOpenModalChangePassword,
  user,
  ...restProps
}) => {
  const [previewAvatar, setPreviewAvatar] = useState<string>('')
  const [errorAvatar, setErrorAvatar] = useState<boolean>(false)

  const getBase64 = (img, callback) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result))
    reader.readAsDataURL(img)
  }

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!')
      setErrorAvatar(true)
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!')
      setErrorAvatar(true)
    }
    if (isJpgOrPng && isLt2M) setErrorAvatar(false)

    return isJpgOrPng && isLt2M
  }

  const handleChangeAvatar = (info) => {
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, (imageUrl) => setPreviewAvatar(imageUrl))
    }
  }

  const handleDeleteAvatar = () => {
    setPreviewAvatar('')
    setErrorAvatar(false)
  }

  const onFinish = () => {
    handleCloseModal()
  }

  return (
    <Modal
      centered
      title="個人設定"
      onCancel={handleCloseModal}
      footer={null}
      width={700}
      className={styles.userSettingModal}
      {...restProps}
    >
      <Space size={60} align="start" style={{ width: '100%' }}>
        <div>
          <div className={styles.avatarUploadForm}>
            <Upload
              name="avatar"
              action="https://run.mocky.io/v3/ed8c0801-fdd4-46be-9aec-0de2c61ed4dd"
              listType="picture-card"
              showUploadList={false}
              beforeUpload={beforeUpload}
              onChange={handleChangeAvatar}
              className={styles.uploadAvatar}
            >
              <div className={styles.cameraIcon}>
                <CameraIcon />
              </div>
            </Upload>
            {previewAvatar ? (
              <img alt="avatar" className={styles.previewAvatar} src={previewAvatar} />
            ) : (
              <>
                {user?.avatar ? (
                  <img alt="user_avatar" className={styles.previewAvatar} src={user.avatar} />
                ) : (
                  <AvatarIcon width="120px" height="120px" />
                )}
              </>
            )}
          </div>
          <div className={styles.textBehindAvatar}>
            {previewAvatar ? (
              <Button
                type="text"
                className={styles.deleteAvatarButton}
                onClick={handleDeleteAvatar}
              >
                画像を削除
              </Button>
            ) : null}
            {errorAvatar ? (
              <p className={styles.errorText}>
                プロフィール写真は、1 MB 以下の PNGまたはJPG である必要があります
              </p>
            ) : null}
          </div>
        </div>
        <Form
          name="user-setting"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          className={styles.userSettingForm}
          labelAlign="left"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="氏名"
            name="fullName"
            className={styles.userNameFormItem}
            rules={[{ required: true, message: '氏名を正しく入力してください' }]}
          >
            <Input placeholder="text here" />
          </Form.Item>
          <Form.Item
            label="メールアドレス"
            name="email"
            className={styles.emailFormItem}
            rules={[
              { required: true, message: 'メールアドレスを正しく入力してください' },
              {
                type: 'email',
                message: 'メールアドレスを正しく入力してください',
              },
            ]}
          >
            <Input placeholder="メールアドレスを入力してください" />
          </Form.Item>
          <div className={styles.userStatus}>
            <span>権限：承認者</span>
            <span>タグ作成：不可</span>
          </div>
          <Button
            type="link"
            className={styles.resetPasswordButton}
            onClick={handleOpenModalChangePassword}
          >
            パスワードを変更する
          </Button>
          <Form.Item wrapperCol={{ span: 24 }} className={styles.submitFormItem}>
            <Button type="primary" htmlType="submit">
              登録
            </Button>
          </Form.Item>
        </Form>
      </Space>
    </Modal>
  )
}

export default ModalUserSetting
