import React from 'react'
import { Table } from 'antd'
import XIcon from '@/assets/icons/ico_x-red.svg'
import styles from './ConsentStatusTable.module.scss'

const ConsentStatusTable = () => {
  return (
    <Table
      dataSource={consentStatusData}
      columns={consentStatusColumns}
      scroll={{ y: 200 }}
      pagination={false}
      className={styles.wrapper}
    />
  )
}

export default ConsentStatusTable

const consentStatusColumns = [
  {
    title: '個人情報の取り扱い',
    width: '50%',
    children: [
      {
        title: 'バージョン',
        dataIndex: 'personalInfoVersion',
        key: 'personalInfoVersion',
        align: 'center',
        width: '18.53%',
      },
      {
        title: '同意日時',
        dataIndex: 'personalInfoConsentTime',
        key: 'personalInfoConsentTime',
        align: 'center',
        render: (_, record) => (
          <div>
            {!record.personalInfoVersion ? (
              ''
            ) : !record.personalInfoConsentTime ? (
              <XIcon />
            ) : (
              record.personalInfoConsentTime
            )}
          </div>
        ),
      },
    ],
  },
  {
    title: '利用規約',
    children: [
      {
        title: 'バージョン',
        dataIndex: 'serviceVersion',
        key: 'serviceVersion',
        align: 'center',
        width: '18.53%',
      },
      {
        title: '同意日時',
        dataIndex: 'serviceTime',
        key: 'serviceTime',
        align: 'center',
        render: (_, record) => (
          <div>
            {!record.serviceVersion ? '' : !record.serviceTime ? <XIcon /> : record.serviceTime}
          </div>
        ),
      },
    ],
  },
]

const consentStatusData = [
  {
    key: '1',
    personalInfoVersion: '1.2.2',
    personalInfoConsentTime: '2022/01/30 - 07:40',
    serviceVersion: '1.2.2',
    serviceTime: '2022/01/30 - 07:40',
  },
  {
    key: '2',
    personalInfoVersion: '1.2.3',
    personalInfoConsentTime: '2022/01/30 - 07:40',
    serviceVersion: '1.2.3',
    serviceTime: '',
  },
  {
    key: '3',
    personalInfoVersion: '1.2.4',
    personalInfoConsentTime: '',
    serviceVersion: '1.2.4',
    serviceTime: '2022/01/30 - 07:40',
  },
  {
    key: '4',
    personalInfoVersion: '1.2.5',
    personalInfoConsentTime: '2022/01/30 - 07:40',
    serviceVersion: '',
    serviceTime: '',
  },
  {
    key: '5',
    personalInfoVersion: '',
    personalInfoConsentTime: '',
    serviceVersion: '1.2.2',
    serviceTime: '2022/01/30 - 07:40',
  },
  {
    key: '6',
    personalInfoVersion: '1.2.3',
    personalInfoConsentTime: '2022/01/30 - 07:40',
    serviceVersion: '1.2.3',
    serviceTime: '2022/01/30 - 07:40',
  },
  {
    key: '7',
    personalInfoVersion: '1.2.4',
    personalInfoConsentTime: '2022/01/30 - 07:40',
    serviceVersion: '1.2.4',
    serviceTime: '',
  },
  {
    key: '8',
    personalInfoVersion: '1.2.5',
    personalInfoConsentTime: '2022/01/30 - 07:40',
    serviceVersion: '',
    serviceTime: '',
  },
]
