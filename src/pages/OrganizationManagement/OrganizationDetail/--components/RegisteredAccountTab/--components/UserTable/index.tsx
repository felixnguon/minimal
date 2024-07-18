import React, { useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Table, Pagination } from 'antd'
import { ColumnsType } from 'antd/es/table'
import XIcon from '@/assets/icons/ico_line_close.svg'
import OIcon from '@/assets/icons/ico_line_circle.svg'
import Avatar from '@/assets/icons/ico_avatar.svg'
import styles from './UserTable.module.scss'

type ItemTable = {
  key: string
  id: string
  registrationDate: string
  name: string
  age: number
  gender: string
  isHasPersonalInformation: boolean
  isHasTermsOfService: boolean
  status: string
}

type PropsType = {
  data: any
  isQuestioners?: boolean
}

const UserTable: React.FC<PropsType> = ({ data, isQuestioners = false }) => {
  const navigate = useNavigate()

  const onRowClick = useCallback(
    (record: ItemTable) => {
      const id = record.id
      if (!id) return
      if (isQuestioners) {
        navigate(`question/${record.id}`)
      } else navigate(`answerer/${record.id}`)
    },
    [isQuestioners, navigate]
  )

  return (
    <div className={styles.root}>
      <Table<ItemTable>
        columns={isQuestioners ? questionersColumns : answerersColumns}
        dataSource={data}
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

export default UserTable
const answerersColumns: ColumnsType<ItemTable> = [
  {
    title: 'ID',
    dataIndex: 'id',
    align: 'center',
    sorter: true,
    width: '7.6%',
    className: styles.idColumn,
  },
  {
    title: '登録日',
    dataIndex: 'registrationDate',
    align: 'center',
    sorter: true,
    width: '9.7%',
    className: styles.dateColumn,
  },
  {
    title: '解答者氏名',
    dataIndex: 'name',
    align: 'left',
    className: 'nameColumn',
    render: (_, record) => (
      <div className={styles.nameColumn}>
        <div className={styles.avatar}>
          <Avatar />
        </div>
        <p>{record.name}</p>
      </div>
    ),
  },
  {
    title: '年齢',
    dataIndex: 'age',
    sorter: true,
    align: 'center',
    width: '7.6%',
  },
  {
    title: '性別',
    dataIndex: 'gender',
    sorter: true,
    align: 'center',
    width: '7.6%',
  },
  {
    title: '規約同意状況',
    children: [
      {
        title: '個人情報',
        dataIndex: 'isHasPersonalInformation',
        align: 'center',
        width: '8.45%',
        className: styles.agreementStatusColumn,
        render: (value: string[]) => <>{value ? <OIcon /> : <XIcon />}</>,
      },
      {
        title: '利用規約',
        dataIndex: 'isHasTermsOfService',
        align: 'center',
        width: '8.45%',
        className: styles.agreementStatusColumn,
        render: (value: string[]) => <>{value ? <OIcon /> : <XIcon />}</>,
      },
    ],
  },
  {
    title: 'ステータス',
    dataIndex: 'status',
    align: 'center',
    sorter: true,
    render: (value) => (
      <span className={value === '無効' ? styles.redText : styles.blackText}>{value}</span>
    ),
    width: '14%',
  },
]

const questionersColumns: ColumnsType<ItemTable> = [
  {
    title: 'ID',
    dataIndex: 'id',
    align: 'center',
    sorter: true,
    width: '7.6%',
    className: styles.idColumn,
  },
  {
    title: '登録日',
    dataIndex: 'registrationDate',
    align: 'center',
    sorter: true,
    width: '9.7%',
    className: styles.dateColumn,
  },
  {
    title: '出題者氏名',
    dataIndex: 'name',
    align: 'left',
    className: 'nameColumn',
    render: (_, record) => (
      <div className={styles.nameColumn}>
        <div className={styles.avatar}>
          <Avatar />
        </div>
        <p>{record.name}</p>
      </div>
    ),
  },
  {
    title: '性別',
    dataIndex: 'gender',
    sorter: true,
    align: 'center',
    width: '7.6%',
  },
  {
    title: '規約同意状況',
    children: [
      {
        title: '個人情報',
        dataIndex: 'isHasPersonalInformation',
        align: 'center',
        width: '8.45%',
        className: styles.agreementStatusColumn,
        render: (value: string[]) => <>{value ? <OIcon /> : <XIcon />}</>,
      },
      {
        title: '利用規約',
        dataIndex: 'isHasTermsOfService',
        align: 'center',
        width: '8.45%',
        className: styles.agreementStatusColumn,
        render: (value: string[]) => <>{value ? <OIcon /> : <XIcon />}</>,
      },
    ],
  },
  {
    title: 'ステータス',
    dataIndex: 'status',
    align: 'center',
    sorter: true,
    render: (value) => (
      <span className={value === '無効' ? styles.redText : styles.blackText}>{value}</span>
    ),
    width: '14%',
  },
]
