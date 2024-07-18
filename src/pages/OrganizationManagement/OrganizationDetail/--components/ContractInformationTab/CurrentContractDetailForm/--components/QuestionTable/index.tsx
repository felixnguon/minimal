import React, { useMemo } from 'react'
import { Button } from 'antd'
import TopicListTable from '@/components/TopicListTable'
import { ColumnsType } from 'antd/es/table'
import PreviewIcon from '@/assets/icons/ico_preview.svg'
import styles from './QuestionTable.module.scss'
import { useGetWidth } from '@/utils/useGetWidth'

type QuestionItem = {
  key: number
  id: number
  question: string
  previewQuestion: string
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

for (let i = 1; i < 100; i++) {
  questionsData.push({
    key: i,
    id: i > 9 ? `000${i}` : `0000${i}`,
    question: `問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル ${i}`,
    previewQuestion: `preview question text ${i}`,
  })
}

const QuestionTable = () => {
  const { width } = useGetWidth()
  const columnsQuestion: ColumnsType<QuestionItem> = useMemo(
    () => [
      {
        dataIndex: 'id',
        width: width > 1300 ? (width > 1600 ? '88%' : '83%') : '80%',
        className: styles.idColumn,
        render: (_, record) => (
          <div>
            <p className={styles.idText}>{record.id}</p>
            <p>{record.question}</p>
          </div>
        ),
      },
      {
        dataIndex: 'previewQuestion',
        className: styles.previewColumn,
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
    <div className={styles.wrapper}>
      <TopicListTable
        columns={columnsQuestion}
        dataSource={questionsData}
        pagination={{ pageSize: 10 }}
      />
    </div>
  )
}

export default QuestionTable
