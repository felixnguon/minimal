import React from 'react'
import { Modal, Button, ModalProps } from 'antd'
import styles from './ModalAskToChangePassword.module.scss'

type PropsType = ModalProps & {
  handleCloseModal: () => void
  handleSubmitChangePassword: () => void
}

const ModalAskToChangePassword: React.FC<PropsType> = ({
  handleCloseModal,
  handleSubmitChangePassword,
  ...restProps
}) => {
  return (
    <Modal
      centered
      title="このページを離れますか ?"
      onCancel={handleCloseModal}
      footer={[
        <Button key="cancel" onClick={handleCloseModal}>
          キャンセル
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmitChangePassword}>
          パスワードをリセット
        </Button>,
      ]}
      width={700}
      {...restProps}
      className={styles.askToChangePasswordModal}
    >
      <p>パスワードをリセットします。</p>
      <p>
        パスワードリセット実行後、登録されたメールアドレスにパスワード再設定のURLが送信されます。
      </p>
      <p>URLの有効期限はN時間になっていますので、N時間以内にメールに記載されたURLにアクセスし、</p>
      <p>パスワードを設定してください。</p>
      <p>
        有効期限が切れた場合は、現在のパスワードでログインし、再度パスワードの再設定をおこなってください。
      </p>
    </Modal>
  )
}

export default ModalAskToChangePassword
