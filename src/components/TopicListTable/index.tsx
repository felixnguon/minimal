import { Table } from 'antd'
import React, { FC } from 'react'
import styles from './TopicListTable.module.scss'

const TopicListTable: FC<any> = ({ ...rest }) => {
  return (
    <Table scroll={{ y: 400, x: false }} className={styles.root} showHeader={false} {...rest} />
  )
}

export default TopicListTable
