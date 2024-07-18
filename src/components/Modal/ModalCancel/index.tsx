import React from 'react'
import { Modal, Button, ModalProps } from 'antd'

type PropsType = ModalProps & {
  handleCloseModal: () => void
  handleGoBack: () => void
}

const ModalCancel: React.FC<PropsType> = ({ handleCloseModal, handleGoBack, ...restProps }) => {
  return (
    <Modal
      centered
      title="このページを離れますか ?"
      onCancel={handleCloseModal}
      footer={[
        <Button key="back" onClick={handleGoBack}>
          編集を終了
        </Button>,
        <Button key="submit" type="primary" onClick={handleCloseModal}>
          編集を続行
        </Button>,
      ]}
      width={450}
      {...restProps}
    >
      <p>入力した内容は保存されません</p>
      <p>編集を終了してもよろしいですか？</p>
    </Modal>
  )
}

export default ModalCancel
