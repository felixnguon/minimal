import React, { useEffect, useState } from 'react'
import { Button, Tabs, Pagination } from 'antd'
import style from './QuestionManagement.module.scss'
import QuestionTable from './QuestionTable'
import GroupTable from './GroupTable'
import { Link, useLocation, useSearchParams } from 'react-router-dom'
import queryString from 'query-string'

const QuestionManagementPage: React.FC = () => {
  const location = useLocation()
  const [, setSearchParams] = useSearchParams()

  const [key, setKey] = useState<string>(String(queryString.parse(location.search)?.tab || '1'))

  useEffect(() => {
    setSearchParams({ tab: key })
  }, [])

  const callback = (key) => {
    setSearchParams({ tab: String(key) })
    setKey(key)
  }

  return (
    <div className={style.root}>
      <div className={style.head}>
        <p className={style.title}>出題問題管理</p>
        <Link to={`/question-management/${key === '1' ? 'new-topic' : 'new-group'}`}>
          <Button type="primary">{key === '1' ? '新規問題登録' : '新規グループ登録'}</Button>
        </Link>
      </div>

      <div className={style.tabs}>
        <Tabs defaultActiveKey={key} onChange={callback}>
          <Tabs.TabPane tab="問題" key="1" />
          <Tabs.TabPane tab="グループ" key="2" />
        </Tabs>

        <p className={style.count}>
          {key === '1' ? '登録問題' : '登録グループ'}: 9,999,999 {key === '1' ? '問' : 'グループ'}
        </p>
      </div>

      {key === '1' && <QuestionTable />}

      {key === '2' && <GroupTable />}

      <div className={style.pagination}>
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

export default QuestionManagementPage
