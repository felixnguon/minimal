import React, { useState, useCallback } from 'react'
import { Table, Pagination, Tooltip, Button } from 'antd'
import clsx from 'clsx'
import { ColumnsType } from 'antd/es/table'
import { useNavigate } from 'react-router-dom'
import DuplicateIcon from '@/assets/icons/ico_duplicate.svg'
import styles from './TabTable.module.scss'

type ItemTable = {
  id: string
  regisDate: string
  startDate?: string
  endDate?: string
  version: string
  status: string
}

const PolicyTable: React.FC<any> = ({ ...rest }) => {
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
      {text ? text : '-'}
    </div>
  )

  const renderStatus = (text: string, rowIndex: number, ...restStyles) => (
    <div
      className={clsx(
        styles.cellWrapper,
        currentRow === rowIndex && styles.isCellHover,
        ...restStyles
      )}
      onMouseEnter={() => setCurrentRowHover(rowIndex)}
      onMouseLeave={() => setCurrentRowHover(null)}
    >
      {text === '無効' ? (
        <span className={styles.invalidStatus}>{text}</span>
      ) : (
        <span className={styles.validStatus}>{text}</span>
      )}
    </div>
  )

  const onDuplicate = useCallback((e, data) => {
    e.stopPropagation()
    console.log('data: ', data)
  }, [])

  const onRowClick = (record: ItemTable) => {
    const id = record.id
    if (!id) return
    navigate(`${id}/review`)
  }

  const columns: ColumnsType<ItemTable> = [
    {
      title: '登録日',
      dataIndex: 'regisDate',
      align: 'center',
      width: '14.25%',
      sorter: true,
      render: (text, _, rowIndex) => renderText(text, rowIndex, styles.dateColumn),
    },
    {
      title: '開始日',
      dataIndex: 'startDate',
      align: 'center',
      width: '14.25%',
      sorter: true,
      className: styles.dateColumn,
      render: (text, _, rowIndex) => renderText(text, rowIndex, styles.dateColumn),
    },
    {
      title: '終了日',
      dataIndex: 'endDate',
      align: 'center',
      width: '14.25%',
      sorter: true,
      className: styles.dateColumn,
      render: (text, _, rowIndex) => renderText(text, rowIndex, styles.dateColumn),
    },
    {
      title: 'バージョン',
      dataIndex: 'version',
      align: 'center',
      render: (text, _, rowIndex) => renderText(text, rowIndex),
      width: '32.38%',
    },

    {
      title: 'ステータス',
      dataIndex: 'status',
      align: 'center',
      width: '14.25%',
      render: (text, _, rowIndex) => renderStatus(text, rowIndex, styles.dateColumn),
    },

    {
      title: '複製',
      align: 'center',
      width: '10.62%',
      render: (_, record) => (
        <div
          className={clsx(styles.duplicateWrapper)}
          onClick={(e) => {
            e.stopPropagation()
            e.preventDefault()
          }}
          onMouseEnter={() => setCurrentRowHover(null)}
          onMouseLeave={() => setCurrentRowHover(null)}
        >
          <Tooltip
            placement="topRight"
            title="コピーして新規バージョンを作成"
            overlayInnerStyle={{ padding: '8px 16px' }}
          >
            <Button type="text" onClick={(e) => onDuplicate(e, record)}>
              <DuplicateIcon />
            </Button>
          </Tooltip>
        </div>
      ),
    },
  ]

  return (
    <div className={styles.wrapper}>
      <Table
        bordered
        scroll={{ x: true }}
        pagination={{ pageSize: 10 }}
        columns={columns}
        onRow={(record) => {
          return {
            onClick: () => onRowClick(record),
          }
        }}
        {...rest}
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

export default PolicyTable
