import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Table, Pagination, Tag } from 'antd'
import { ColumnsType } from 'antd/es/table'
import styles from './AnswerTab.module.scss'

type ItemTable = {
  key: string
  id: string
  additionDate: string
  answererName: string
  answerNumber: number
  status: string
}

const AnswerTab = () => {
  const navigate = useNavigate()

  const onRowClick = (record: ItemTable) => {
    const id = record.id
    if (!id) return
    navigate(`answer/${record.id}`)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.count}>
        <a href="#">
          登録問題数：<span>12 問</span>
        </a>
        <a href="#">
          登録問題: <span>9,999,999 問</span>
        </a>
      </div>
      <Table<ItemTable>
        columns={columns}
        dataSource={dummyData}
        bordered
        pagination={false}
        onRow={(record) => {
          return {
            onClick: () => onRowClick(record),
          }
        }}
      />
      <div className={styles.pagination}>
        <Pagination
          showTotal={(total, range) => `${range[0]}-${range[1]} / ${total}件`}
          defaultCurrent={2}
          total={50}
          size="small"
        />
      </div>
    </div>
  )
}

export default AnswerTab

const columns: ColumnsType<ItemTable> = [
  {
    title: 'ID',
    dataIndex: 'id',
    className: styles.idColumn,
    align: 'center',
    sorter: true,
    width: '10%',
  },
  {
    title: '追加日',
    dataIndex: 'additionDate',
    className: styles.dateColumn,
    align: 'center',
    sorter: true,
    width: '12%',
  },
  {
    title: '解答者氏名',
    dataIndex: 'answererName',
    align: 'left',
    render: (_, record) => (
      <div style={{ display: 'flex' }}>
        <p className={styles.answererName}>{record.answererName}</p>
        {record.status === '有効' ? (
          <Tag color="#389e0d" className={styles.validTag}>
            {record.status}
          </Tag>
        ) : record.status === '契約前' ? (
          <Tag color="#ffccc7" className={styles.beforeContractTag}>
            {record.status}
          </Tag>
        ) : (
          <Tag color="#d9d9d9" className={styles.notValid}>
            {record.status}
          </Tag>
        )}
      </div>
    ),
  },
  {
    title: '解答数',
    dataIndex: 'answerNumber',
    align: 'center',
    width: '12%',
  },
]

const dummyData = [
  {
    id: '00001',
    key: '00001',
    additionDate: '2022/02/01',
    answererName:
      '問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル',
    status: '契約前',
    answerNumber: 99,
  },
  {
    id: '00002',
    key: '00002',
    additionDate: '2022/02/01',
    answererName:
      '問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル',
    status: '有効',
    answerNumber: 999,
  },
  {
    id: '00003',
    key: '00003',
    additionDate: '2022/02/01',
    answererName:
      '問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル ',
    status: '契約前',
    answerNumber: 99,
  },
  {
    id: '00004',
    key: '00004',
    additionDate: '2022/02/01',
    answererName:
      '問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル ',
    status: '終了',
    answerNumber: 999,
  },
  {
    id: '00005',
    key: '00005',
    additionDate: '2022/02/01',
    answererName:
      '問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル ',
    status: '有効',
    answerNumber: 999999,
  },
  {
    id: '00006',
    key: '00006',
    additionDate: '2022/02/01',
    answererName:
      '問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル ',
    status: '終了',
    answerNumber: 99,
  },
  {
    id: '00007',
    key: '00007',
    additionDate: '2022/02/01',
    answererName:
      '問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル ',
    status: '終了',
    answerNumber: 999,
  },
  {
    id: '00008',
    key: '00008',
    additionDate: '2022/02/01',
    answererName:
      '問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル ',
    status: '終了',
    answerNumber: 99,
  },
  {
    id: '00009',
    key: '00009',
    additionDate: '2022/02/01',
    answererName:
      '問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル ',
    status: '契約前',
    answerNumber: 999,
  },
  {
    id: '00010',
    key: '00010',
    additionDate: '2022/02/01',
    answererName:
      '問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル ',
    status: '契約前',
    answerNumber: 999999,
  },
]
