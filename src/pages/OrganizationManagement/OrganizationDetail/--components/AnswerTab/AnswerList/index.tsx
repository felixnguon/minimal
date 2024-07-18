import React from 'react'
import { Table, Pagination, Button } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { Link } from 'react-router-dom'
import CSVIcon from '@/assets/icons/ico_csv.svg'
import styles from './AnswerList.module.scss'
import Avatar from '@/assets/icons/ico_avatar.svg'
import ArrowLeftIcon from '@/assets/icons/ico_arrow-left.svg'

type ItemTable = {
  key: string
  id: string
  registrationDate: string
  answererName: string
  age: number
  gender: string
  releaseStatus: string
  answerTime: string
  earnedPoint: number
}

const AnswerList = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.head}>
        <div className={styles.headerLeftSide}>
          <Button type="link" icon={<ArrowLeftIcon />} className={styles.backBtn}>
            <Link to={'/organization-management/00001/edit?tab=4'}>一覧に戻る</Link>
          </Button>
          <p className={styles.title}>利用組織名利用組織名利用組織名利用組織名</p>
        </div>

        <div className={styles.headerRightSide}>
          <span className={styles.csvButton}>
            <Button type="default" icon={<CSVIcon />}>
              CSVダウンロード
            </Button>
          </span>
        </div>
      </div>
      <div className={styles.count}>
        <a href="#">
          解答数：<span>9,999,999 問</span>
        </a>
      </div>
      <div className={styles.questionTitle}>
        問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル
        」解答一覧
      </div>
      <Table<ItemTable> columns={columns} dataSource={dummyData} bordered pagination={false} />
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

export default AnswerList

const columns: ColumnsType<ItemTable> = [
  {
    title: 'ID',
    dataIndex: 'id',
    align: 'center',
    sorter: true,
    width: '8%',
    className: styles.idColumn,
  },
  {
    title: '登録日',
    dataIndex: 'registrationDate',
    align: 'center',
    sorter: true,
    width: '9.8%',
    className: styles.dateColumn,
  },
  {
    title: '解答者氏名',
    dataIndex: 'answererName',
    align: 'left',
    render: (_, record) => (
      <div className={styles.nameColumn}>
        <div className={styles.avatar}>
          <Avatar />
        </div>
        <p>{record.answererName}</p>
      </div>
    ),
  },
  {
    title: '年齢',
    dataIndex: 'age',
    align: 'center',
    sorter: true,
    width: '8%',
  },
  {
    title: '性別',
    dataIndex: 'gender',
    align: 'center',
    sorter: true,
    width: '8%',
  },
  {
    title: '公開',
    dataIndex: 'releaseStatus',
    align: 'center',
    sorter: true,
    width: '8%',
  },
  {
    title: '解答時間',
    dataIndex: 'answerTime',
    align: 'center',
    sorter: true,
    width: '10.5%',
  },
  {
    title: '獲得ポイント',
    dataIndex: 'earnedPoint',
    align: 'center',
    sorter: true,
    width: '12.9%',
  },
]

const dummyData = [
  {
    key: '0001',
    id: '0001',
    registrationDate: '2022/01/30',
    answererName: 'ユーザ氏名',
    age: 15,
    gender: 'その他',
    releaseStatus: '公開',
    answerTime: '07:45:52',
    earnedPoint: 12,
  },
  {
    key: '0002',
    id: '0002',
    registrationDate: '2022/01/30',
    answererName: 'ユーザ氏名',
    age: 15,
    gender: 'その他',
    releaseStatus: '公開',
    answerTime: '07:45:52',
    earnedPoint: 12,
  },
  {
    key: '0003',
    id: '0003',
    registrationDate: '2022/01/30',
    answererName: 'ユーザ氏名',
    age: 15,
    gender: 'その他',
    releaseStatus: '公開',
    answerTime: '07:45:52',
    earnedPoint: 12,
  },
  {
    key: '0004',
    id: '0004',
    registrationDate: '2022/01/30',
    answererName: 'ユーザ氏名',
    age: 15,
    gender: 'その他',
    releaseStatus: '公開',
    answerTime: '07:45:52',
    earnedPoint: 12,
  },
  {
    key: '0005',
    id: '0005',
    registrationDate: '2022/01/30',
    answererName: 'ユーザ氏名',
    age: 15,
    gender: 'その他',
    releaseStatus: '公開',
    answerTime: '07:45:52',
    earnedPoint: 12,
  },
]
