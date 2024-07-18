import React, { useCallback, useEffect, useState } from 'react'
import { Form, FormProps, Tabs } from 'antd'
import clsx from 'clsx'
import { Moment } from 'moment'
import BasicInformationTab from '@/pages/OrganizationManagement/OrganizationDetail/--components/BasicInformationTab'
import ContractInformationTab from '@/pages/OrganizationManagement/OrganizationDetail/--components/ContractInformationTab'
import RegisteredAccountTab from '@/pages/OrganizationManagement/OrganizationDetail/--components/RegisteredAccountTab'
import AnswerTab from '@/pages/OrganizationManagement/OrganizationDetail/--components/AnswerTab'
import styles from './OrganizationDetailForm.module.scss'

const { TabPane } = Tabs

type ContractFile = {
  uid: string
  name: string
  status?: string
  url: string
}

type Tag = {
  id: string
  text: string
}

type ValuesType = {
  id?: string
  usingName: string
  representativeName: string
  representativeGender: string
  location: string
  zipCode: string
  phoneNumber: string
  email: string
  country: string
  workSpace: string
  tags: Tag[]
  remarks: string
  status: string
  questionsNumber: number
  answerersNumber: number
  startDateContract: Moment
  startDateHour: number
  startDateMinute: number
  endDateHour: number
  endDateMinute: number
  endDateContract: Moment
  contractPoints: number
  contracts: ContractFile[]
  historyData: Array<any>
  userData: any
}

type PropsType = FormProps & {
  initialValues: ValuesType
  onFormFinish: (name: any, { forms: any }) => void
  onHandleCancel: () => void
  onTabClick: (key: string) => void
  activeKey: string
}

const OrganizationDetailForm: React.FC<PropsType> = ({
  initialValues,
  onFormFinish,
  onHandleCancel,
  onTabClick,
  activeKey,
  ...rest
}) => {
  const [hasScrollBarTable, setHasScrollBarTable] = useState(false)

  const handleCancel = useCallback(() => {
    onHandleCancel && onHandleCancel()
  }, [onHandleCancel])

  const handleTabClick = useCallback(
    (key) => {
      onTabClick && onTabClick(key)
    },
    [onTabClick]
  )

  useEffect(() => {
    setTimeout(() => {
      if (document.getElementsByClassName('ant-table-cell-scrollbar').length)
        setHasScrollBarTable(true)
    }, 100)
  }, [])

  return (
    <div className={styles.wrapper}>
      <Form.Provider
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        labelAlign="left"
        name="organization_detail"
        onFormFinish={onFormFinish}
        {...rest}
      >
        <Tabs
          activeKey={activeKey}
          onTabClick={handleTabClick}
          className={activeKey === 'answer' ? styles.answerTab : undefined}
        >
          <TabPane tab="基本情報" key="1" className={styles.justifyContent}>
            <BasicInformationTab initialValues={initialValues} onHandleCancel={handleCancel} />
          </TabPane>
          <TabPane
            tab="契約情報"
            key="2"
            className={clsx(
              styles.justifyContent,
              hasScrollBarTable ? styles.tabHasScrollBarTable : undefined
            )}
          >
            <ContractInformationTab initialValues={initialValues} onHandleCancel={handleCancel} />
          </TabPane>
          <TabPane tab="登録アカウント" key="3">
            <RegisteredAccountTab userData={initialValues.userData} />
          </TabPane>
          <TabPane tab="解答" key="4">
            <AnswerTab />
          </TabPane>
        </Tabs>
      </Form.Provider>
    </div>
  )
}

export default OrganizationDetailForm
