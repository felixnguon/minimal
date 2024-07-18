import React, { useMemo } from 'react'
import { Modal, Table, Button, ModalProps } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { useGetWidth } from '@/utils/useGetWidth'
import PreviewIcon from '@/assets/icons/ico_preview.svg'
import styles from './ReviewQuestionModal.module.scss'

type QuestionItem = {
  key: number
  id: string
  question: string
  previewQuestion: string
}

type PropsType = ModalProps & {
  data: Array<QuestionItem>
}

const ReviewQuestionModal: React.FC<PropsType> = ({ data, ...rest }) => {
  const { width } = useGetWidth()

  const columns: ColumnsType<QuestionItem> = useMemo(
    () => [
      {
        dataIndex: 'id',
        width: '40px',
        className: styles.idText,
      },
      {
        dataIndex: 'question',
        width: width > 1600 ? '85%' : '81%',
      },
      {
        dataIndex: 'previewQuestion',
        className: styles.previewText,
        render: (value) => (
          <Button type="text" icon={<PreviewIcon />}>
            プレビュー
          </Button>
        ),
      },
    ],
    [width]
  )

  return (
    <Modal
      title="グループ名（1）"
      width={width > 1600 ? 1000 : 800}
      footer={null}
      className={styles.root}
      {...rest}
    >
      <Table columns={columns} dataSource={data} scroll={{ y: 400 }} pagination={false} />
    </Modal>
  )
}

export default ReviewQuestionModal
