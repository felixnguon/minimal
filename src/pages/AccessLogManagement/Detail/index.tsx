import React from 'react'
import { Button } from 'antd'
import { Link } from 'react-router-dom'

import ManagementContentLogTable from '../-components/ManagementContentLogTable'
import styles from './Detail.module.scss'
import ArrowLeftIcon from '@/assets/icons/ico_arrow-left.svg'
import { ACCESS_LOG_MANAGEMENT } from '@/constants/routes'

const DetailPage = () => {
  return (
    <div className={styles.root}>
      <div className={styles.head}>
        <Button type="link" icon={<ArrowLeftIcon />} className={styles.backBtn}>
          <Link to={ACCESS_LOG_MANAGEMENT+ '?tab=2'}>一覧に戻る</Link>
        </Button>
        <h1 className={styles.title}>利用組織名利用組織名利用組織名利用組織名</h1>
      </div>

      <ManagementContentLogTable />
    </div>
  )
}

export default DetailPage
