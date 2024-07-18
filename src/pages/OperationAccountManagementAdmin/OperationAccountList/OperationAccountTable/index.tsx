import React from 'react'
import { Pagination, Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { SortOrder } from 'antd/lib/table/interface'
import { useNavigate } from 'react-router-dom'
import clsx from 'clsx'

import { data as dataSource } from './__mocks__/data'
import styles from './OperationAccountTable.module.scss'
import AvatarIcon from '@/assets/icons/ico_avatar.svg'

export interface DataType {
  key: string
  id: string
  registrationDate: string
  fullName: string
  emailAddress: string
  authority: string
  status: string
}

const OperationAccountTable: React.FC = () => {
  const navigate = useNavigate()

  const handleSortColumn = (
    columnName: keyof Omit<DataType, 'key'>,
    sortOrder: SortOrder | undefined
  ) => {
    console.log('sort:', columnName, sortOrder)

    return 0
  }

  const columns: ColumnsType<DataType> = [
    {
      title: 'ID',
      dataIndex: 'id',
      align: 'center',
      sorter: (_a, _b, sortOrder) => handleSortColumn('id', sortOrder),
      width: '10%',
      render: (text: number) => <div className={styles.id}>{text}</div>,
    },
    {
      title: '登録日',
      dataIndex: 'registrationDate',
      align: 'center',
      sorter: (_a, _b, sortOrder) => handleSortColumn('registrationDate', sortOrder),
      width: 140,
      render: (text: number) => <div className={styles.registrationDate}>{text}</div>,
    },
    {
      title: '氏名',
      dataIndex: 'fullName',
      align: 'center',
      render: (text: number) => (
        <div className={styles.fullName}>
          <AvatarIcon />
          {text}
        </div>
      ),
    },
    {
      title: 'メールアドレス',
      dataIndex: 'emailAddress',
      align: 'center',
      render: (text: number) => <div className={styles.emailAddress}>{text}</div>,
      width: '20%',
    },
    {
      title: '権限',
      dataIndex: 'authority',
      align: 'center',
      sorter: (_a, _b, sortOrder) => handleSortColumn('authority', sortOrder),
      width: 140,
    },
    {
      title: 'ステータス',
      dataIndex: 'status',
      align: 'center',
      render: (text: string) => (
        <>
          {(() => {
            switch (text) {
              case '有効':
                return <p className={styles.status}>有効</p>
              case '未ログイン':
                return <p className={clsx(styles.status, styles.textRed)}>未ログイン</p>
              case '無効':
                return <p className={clsx(styles.status, styles.textRed)}>無効</p>
              default:
                return null
            }
          })()}
        </>
      ),
      sorter: (_a, _b, sortOrder) => handleSortColumn('status', sortOrder),
      width: 130,
    },
  ]

  const onRowClick = (record: DataType) => {
    const id = record.id
    if (!id) return
    navigate(`${id}/edit`)
  }

  return (
    <>
      <p className={styles.registeredUser}>登録ユーザ：9,999,999 人</p>

      <Table<DataType>
        columns={columns}
        dataSource={dataSource}
        bordered
        pagination={false}
        scroll={{ x: true }}
        className={styles.table}
        onRow={(record) => {
          return {
            onClick: () => onRowClick(record),
          }
        }}
      />

      <div className={styles.pagination}>
        <Pagination
          showTotal={(total, range) => `${range[0]}-${range[1]} / ${total}件`}
          defaultCurrent={1}
          pageSize={20}
          total={200}
          size="small"
        />
      </div>
    </>
  )
}

export default OperationAccountTable
