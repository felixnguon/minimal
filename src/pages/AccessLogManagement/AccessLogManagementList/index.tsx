import React, { useEffect, useState } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import { Button, Tabs } from 'antd'
import queryString from 'query-string'

import DownloadIcon from '@/assets/icons/ico_download.svg'
import styles from './AccessLogManagementList.module.scss'
import ManagementContentLogTable from '../-components/ManagementContentLogTable'
import UserContentLogTable from '../-components/UserContentLogTable'

const OperationAccountManagementPage: React.FC = () => {
  const location = useLocation()
  const [, setSearchParams] = useSearchParams()

  const [key, setKey] = useState<string>(String(queryString.parse(location.search)?.tab || '1'))

  useEffect(() => {
    setSearchParams({ tab: key })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const callback = (key) => {
    setSearchParams({ tab: String(key) })
    setKey(key)
  }

  return (
    <div className={styles.root}>
      <div className={styles.head}>
        <h1 className={styles.title}>管理コンテンツのログ</h1>
        <div className={styles.headRight}>
          {key === '2' && (
            <Button type="text" className={styles.download} icon={<DownloadIcon />}>
              前月のログ一括ダウンロード
            </Button>
          )}
        </div>
      </div>

      <Tabs defaultActiveKey={key} onChange={callback} className={styles.tabs}>
        <Tabs.TabPane tab="管理コンテンツのログ" key="1" />
        <Tabs.TabPane tab="ユーザコンテンツのログ" key="2" />
      </Tabs>

      {key === '1' && <ManagementContentLogTable />}

      {key === '2' && <UserContentLogTable />}
    </div>
  )
}

export default OperationAccountManagementPage
