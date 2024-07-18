import React, { useState } from 'react'
import { ColumnsType } from 'antd/es/table'
import { Button, Table } from 'antd'
import clsx from 'clsx'

import { data as dataSource } from './__mocks__/data'
import styles from './ManagementContentLogTable.module.scss'
import DownloadIcon from '@/assets/icons/ico_download.svg'
import ModalDownloadLog from '../ModalDownload'

export interface DataType {
  key: string
  year: string
  january: boolean
  february: boolean
  march: boolean
  april: boolean
  may: boolean
  june: boolean
  july: boolean
  august: boolean
  september: boolean
  october: boolean
  november: boolean
  december: boolean
}

const ManagementContentLogTable = () => {
  const [isVisibleModalDownload, setIsVisibleModalDownload] = useState<boolean>(false)

  const renderDownloadBtn = (isHasDownload: boolean) => (
    <div className={clsx(styles.cellWrapper, isHasDownload && styles.downloadWrapper)}>
      {isHasDownload && <Button type="text" icon={<DownloadIcon />}></Button>}
    </div>
  )

  const columns: ColumnsType<DataType> = [
    {
      title: '年',
      dataIndex: 'year',
      align: 'center',
      width: 170,
    },
    {
      title: '1月',
      dataIndex: 'january',
      align: 'center',
      render: renderDownloadBtn,
    },
    {
      title: '2月',
      dataIndex: 'february',
      align: 'center',
      render: renderDownloadBtn,
    },
    {
      title: '3月',
      dataIndex: 'march',
      align: 'center',
      render: renderDownloadBtn,
    },
    {
      title: '4月',
      dataIndex: 'april',
      align: 'center',
      render: renderDownloadBtn,
    },
    {
      title: '5月',
      dataIndex: 'may',
      align: 'center',
      render: renderDownloadBtn,
    },
    {
      title: '6月',
      dataIndex: 'june',
      align: 'center',
      render: renderDownloadBtn,
    },
    {
      title: '7月',
      dataIndex: 'july',
      align: 'center',
      render: renderDownloadBtn,
    },
    {
      title: '8月',
      dataIndex: 'august',
      align: 'center',
      render: renderDownloadBtn,
    },
    {
      title: '9月',
      dataIndex: 'september',
      align: 'center',
      render: renderDownloadBtn,
    },
    {
      title: '10月',
      dataIndex: 'october',
      align: 'center',
      render: renderDownloadBtn,
    },
    {
      title: '11月',
      dataIndex: 'november',
      align: 'center',
      render: renderDownloadBtn,
    },
    {
      title: '12月',
      dataIndex: 'december',
      align: 'center',
      render: renderDownloadBtn,
    },
  ]

  const onClickDownload = () => {
    setIsVisibleModalDownload(true)
  }

  const handleCancel = () => {
    setIsVisibleModalDownload(false)
  }

  const handleDownloadLogs = () => {
    console.log('download logs...')
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
      />

      <div className={styles.filterWrapper}>
        <Button type="primary" onClick={onClickDownload}>
          条件を指定してCSVファイルをダウンロード
        </Button>
      </div>

      <ModalDownloadLog
        visible={isVisibleModalDownload}
        handleCancel={handleCancel}
        handleDownload={handleDownloadLogs}
      />
    </div>
  )
}

export default ManagementContentLogTable
