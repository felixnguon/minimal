import React, { useState, useMemo } from 'react'
import { Tabs, Button } from 'antd'
import { FormInstance } from 'antd/lib/form/Form'
import { ColumnsType } from 'antd/es/table'
import PreviewIcon from '@/assets/icons/ico_preview.svg'
import ReviewDocumentIcon from '@/assets/icons/ico_view_document.svg'
import styles from './RegistrationQuestionSelectionTable.module.scss'
import TopicListTable from '@/components/TopicListTable'
import ReviewQuestionModal from '@/pages/OrganizationManagement/--components/ReviewQuestionModal'
import { useGetWidth } from '@/utils/useGetWidth'

const { TabPane } = Tabs

type PropsType = {
  form: FormInstance
}

type QuestionItem = {
  key: number
  id: string
  question: string
  previewQuestion: string
}

type GroupItem = {
  key: number
  id: string
  content: string
  viewText: string
}

const questionsData = [
  {
    key: 0,
    id: '00000',
    question:
      '問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル',
    previewQuestion: 'preview question text',
  },
]

const groupData = [
  {
    key: 0,
    id: '00000',
    content: 'グループ名（1）',
    viewText: 'view',
  },
]

for (let i = 1; i < 100; i++) {
  questionsData.push({
    key: i,
    id: i > 9 ? `000${i}` : `0000${i}`,
    question: `問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル ${i}`,
    previewQuestion: `preview question text ${i}`,
  })

  groupData.push({
    key: i,
    id: i > 9 ? `000${i}` : `0000${i}`,
    content: `グループ名 (${i})`,
    viewText: `view ${i}`,
  })
}

const RegistrationQuestionSelectionTable: React.FC<PropsType> = ({ form }) => {
  const [questionModalVisible, setQuestionModalVisible] = useState<boolean>(false)
  const selectedQuestions = <span className={styles.selectedQuestionNumber}>NN 問選択中</span>
  const { width } = useGetWidth()

  const columnsGroup: ColumnsType<GroupItem> = useMemo(
    () => [
      {
        dataIndex: 'id',
        width: '40px',
        className: styles.idText,
      },
      {
        dataIndex: 'content',
        width: width > 1600 ? '85%' : '74%',
      },
      {
        dataIndex: 'viewText',
        className: styles.previewText,
        render: (value) => (
          <Button type="text" onClick={onOpenModal} icon={<ReviewDocumentIcon />}>
            問題確認
          </Button>
        ),
      },
    ],
    [width]
  )
  const columnsQuestion: ColumnsType<QuestionItem> = useMemo(
    () => [
      {
        dataIndex: 'id',
        width: '40px',
        className: styles.idText,
      },
      {
        dataIndex: 'question',
        width: width > 1600 ? '85%' : '74%',
        className: styles.questionText,
      },
      {
        dataIndex: 'previewQuestion',
        className: styles.previewText,
        render: (value) => (
          <Button
            type="text"
            icon={<PreviewIcon />}
            style={width < 1600 ? { paddingRight: '8px' } : undefined}
          >
            プレビュー
          </Button>
        ),
      },
    ],
    [width]
  )

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
    },
  }

  const onCloseModal = () => setQuestionModalVisible(false)

  const onOpenModal = () => setQuestionModalVisible(true)

  return (
    <Tabs defaultActiveKey="1" tabBarExtraContent={selectedQuestions} className={styles.root}>
      <TabPane tab="問題を選択" key="question">
        <TopicListTable
          columns={columnsQuestion}
          dataSource={questionsData}
          pagination={{ pageSize: 10 }}
          rowSelection={rowSelection}
        />
      </TabPane>
      <TabPane tab="グループから選択" key="groupQuestion">
        <TopicListTable
          pagination={{ pageSize: 10 }}
          columns={columnsGroup}
          dataSource={groupData}
          rowSelection={rowSelection}
        />
        <ReviewQuestionModal
          data={questionsData.slice(0, 12)}
          visible={questionModalVisible}
          onCancel={onCloseModal}
        />
      </TabPane>
    </Tabs>
  )
}

export default RegistrationQuestionSelectionTable
