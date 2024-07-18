import React from 'react'
import { Modal, Button, ModalProps } from 'antd'

type PropsType = ModalProps & {
  handleConfirm: () => void
  handleCancel: () => void
  content?: string
}

const ModalConfirmDelete: React.FC<PropsType> = ({
  handleConfirm,
  handleCancel,
  content,
  ...restProps
}) => {
  return (
    <Modal
      centered
      title="削除確認"
      onOk={handleConfirm}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          キャンセル
        </Button>,
        <Button key="submit" type="primary" danger onClick={handleConfirm}>
          削除する
        </Button>,
      ]}
      width={450}
      {...restProps}
    >
      {content ? (
        <p>{content}</p>
      ) : (
        <>
          <p>このアカウントを削除してもよろしいですか？</p>
          <p>アカウントを削除すると、削除したアカウントの</p>
          <p>アクセスログも全て削除されます</p>
        </>
      )}
    </Modal>
  )
}

export default ModalConfirmDelete
