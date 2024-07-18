import React, { useState } from 'react'
import { Button, Pagination, Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { Link, useNavigate } from 'react-router-dom'
import clsx from 'clsx'

import styles from './UserContentLogTable.module.scss'
import DownloadIcon from '@/assets/icons/ico_download.svg'
import { data as dataSource } from './__mocks__/data'

export interface DataType {
  key: string
  id: string
  startDate: string
  endDate: string
  organizationName: string
  country: string
  status: string
  previousMonth: boolean
}

const UserContentLogTable: React.FC = () => {
  const navigate = useNavigate()
  const [currentRow, setCurrentRowHover] = useState<number | null>()

  const renderText = (text: string, rowIndex: number, ...restStyles) => (
    <div
      className={clsx(
        styles.cellWrapper,
        currentRow === rowIndex && styles.isCellHover,
        ...restStyles
      )}
      onMouseEnter={() => setCurrentRowHover(rowIndex)}
      onMouseLeave={() => setCurrentRowHover(null)}
    >
      {text}
    </div>
  )

  const columns: ColumnsType<DataType> = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 90,
      sorter: true,
      align: 'center',
      render: (text, _, rowIndex) =>
        renderText(text, rowIndex, styles.fontSizeMini, styles.cellCenter),
    },
    {
      title: '利用開始日',
      dataIndex: 'startDate',
      width: 120,
      sorter: true,
      align: 'center',
      render: (text, _, rowIndex) =>
        renderText(text, rowIndex, styles.fontSizeMini, styles.cellCenter),
    },
    {
      title: '利用終了日',
      dataIndex: 'endDate',
      width: 120,
      sorter: true,
      align: 'center',
      render: (text, _, rowIndex) =>
        renderText(text, rowIndex, styles.fontSizeMini, styles.cellCenter),
    },
    {
      title: '利用組織名',
      dataIndex: 'organizationName',
      align: 'center',
      render: (text, _, rowIndex) => renderText(text, rowIndex, styles.organizationName),
    },
    {
      title: '利用国',
      dataIndex: 'country',
      width: 90,
      sorter: true,
      align: 'center',
      render: (text, _, rowIndex) => renderText(text, rowIndex, styles.cellCenter),
    },
    {
      title: 'ステータス',
      dataIndex: 'status',
      width: 110,
      sorter: true,
      align: 'center',
      render: (text, _, rowIndex) => renderText(text, rowIndex, styles.cellCenter),
    },
    {
      title: '前月のログ',
      dataIndex: 'previousMonth',
      width: 125,
      render: (isHasDownload: boolean) => (
        <div
          className={clsx(styles.downloadWrapper)}
          onClick={(e) => {
            e.stopPropagation()
            e.preventDefault()
          }}
          onMouseEnter={() => setCurrentRowHover(null)}
          onMouseLeave={() => setCurrentRowHover(null)}
        >
          {isHasDownload && <Button type="text" icon={<DownloadIcon />}></Button>}
        </div>
      ),
    },
  ]

  const onRowClick = (record: DataType) => {
    const id = record.id
    if (!id) return
    navigate(`${id}`)
  }

  return (
    <div className={styles.tableWrapper}>
      <Table<DataType>
        columns={columns}
        dataSource={dataSource}
        bordered
        pagination={false}
        scroll={{ x: true }}
        className={styles.table}
        onRow={(record) => ({
          onClick: () => onRowClick(record),
        })}
      />

      <div className={styles.pagination}>
        <Pagination
          showTotal={(total, range) => `${range[0]}-${range[1]} / ${total}件`}
          defaultPageSize={20}
          defaultCurrent={1}
          total={50}
          size="small"
        />
      </div>
    </div>
  )
}

export default UserContentLogTable
