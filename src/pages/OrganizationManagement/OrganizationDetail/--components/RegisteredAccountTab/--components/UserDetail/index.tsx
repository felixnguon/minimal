import React, { useEffect, useState } from 'react'
import { Button, Descriptions, Row, Col, Table, Pagination } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { Link, useParams } from 'react-router-dom'
import styles from './UserDetail.module.scss'
import ArrowLeftIcon from '@/assets/icons/ico_arrow-left.svg'
import Avatar from '@/assets/icons/ico_avatar.svg'
import ConsentStatusTable from '@/pages/OrganizationManagement/OrganizationDetail/--components/ConsentStatusTable'
import { ORGANIZATION_MANAGEMENT } from '@/constants/routes'

type ItemTable = {
  key: string
  id: string
  answerDate: string
  problemTitle: string
  releaseStatus: string
  answerTime: string
  earnedPoints: number
}

const UserDetail = () => {
  const params: any = useParams()
  const [isAnswerer, setIsAnswerer] = useState<boolean>(true)

  useEffect(() => {
    if (params.questionId) setIsAnswerer(false)
  }, [params.questionId])

  return (
    <div className={styles.root}>
      <div className={styles.justifyContent}>
        <div className={styles.header}>
          <div className={styles.buttonGroup}>
            <Button type="link" icon={<ArrowLeftIcon />} className={styles.backBtn}>
              <Link
                to={`${ORGANIZATION_MANAGEMENT}/${params.id}/edit?tab=3`}
                state={{ tab: isAnswerer ? '1' : '2' }}
              >
                一覧に戻る
              </Link>
            </Button>
          </div>
          <p className={styles.title}>利用組織名利用組織名利用組織名利用組織名</p>
        </div>
        <Row className={styles.generalInformation}>
          <Col className={styles.avatarContent}>
            <div className={styles.avatar}>
              <Avatar />
              <div className={styles.roleTitle}>{isAnswerer ? '解答者' : '出題者'}</div>
            </div>
          </Col>
          <Col className={styles.contentCol}>
            <Descriptions bordered size="middle" className={styles.informationContent}>
              <Descriptions.Item label="ID" span={3}>
                {dummyData.id}
              </Descriptions.Item>
              <Descriptions.Item label="登録日" span={3}>
                {dummyData.registrationDate}
              </Descriptions.Item>
              <Descriptions.Item label="氏名" span={3}>
                {dummyData.fullName}
              </Descriptions.Item>

              {isAnswerer ? (
                <Descriptions.Item label="ニックネーム" span={3}>
                  {dummyData.nickname}
                </Descriptions.Item>
              ) : null}
              {isAnswerer ? (
                <Descriptions.Item label="年齢" span={3}>
                  {dummyData.age}
                </Descriptions.Item>
              ) : null}

              <Descriptions.Item label="性別" span={3}>
                {dummyData.sex}
              </Descriptions.Item>
              <Descriptions.Item label="メールアドレス" span={3}>
                {dummyData.emailAddress}
              </Descriptions.Item>

              {isAnswerer ? (
                <Descriptions.Item label="解答の公開の初期設定" span={3}>
                  {dummyData.setting}
                </Descriptions.Item>
              ) : null}

              <Descriptions.Item label="ステータス" span={3}>
                {dummyData.status}
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>
        <Row>
          <Col className={styles.labelCol}>
            <p>同意状況</p>
          </Col>
          <Col className={styles.contentCol}>
            <ConsentStatusTable />
          </Col>
        </Row>
      </div>
      {isAnswerer ? (
        <>
          {dummyData.answerData && dummyData.answerData.length ? (
            <div className={styles.tableContent}>
              <Table<ItemTable>
                columns={questionersColumns}
                dataSource={dummyData.answerData}
                bordered
                pagination={false}
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
          ) : null}
        </>
      ) : null}
    </div>
  )
}

export default UserDetail

const questionersColumns: ColumnsType<ItemTable> = [
  {
    title: '解答日',
    dataIndex: 'answerDate',
    align: 'center',
    sorter: true,
    width: '10.82%',
    className: 'dateColumn',
  },
  {
    title: '問題タイトル',
    dataIndex: 'problemTitle',
    className: 'nameColumn',
    align: 'left',
  },
  {
    title: '公開',
    dataIndex: 'releaseStatus',
    align: 'center',
    sorter: true,
    width: '7.95%',
  },
  {
    title: '解答時間',
    dataIndex: 'answerTime',
    sorter: true,
    align: 'center',
    width: '10.5%',
  },

  {
    title: '獲得ポイント',
    dataIndex: 'earnedPoints',
    align: 'center',
    width: '12.18%',
  },
]
const dummyData = {
  id: '0001',
  registrationDate: ' 2022/01/30',
  fullName: '氏名 氏名',
  nickname: ' ニックネーム',
  age: '12歳 (生年月日：2022/01/30)',
  sex: 'その他（その他詳細）',
  emailAddress: 'xxxx@xxxx.jp',
  setting: 'ニックネームで公開する',
  status: '有効',
  answerData: [
    {
      key: '1',
      id: '0001',
      answerDate: '2022/01/30',
      problemTitle: '問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル ',
      releaseStatus: '非公開',
      answerTime: '07:40:30',
      earnedPoints: 12,
    },
    {
      key: '2',
      id: '0002',
      answerDate: '2022/01/30',
      problemTitle: '問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル ',
      releaseStatus: '公開',
      answerTime: '07:40:30',
      earnedPoints: 10,
    },
    {
      key: '3',
      id: '0003',
      answerDate: '2022/01/30',
      problemTitle: '問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル ',
      releaseStatus: '非公開',
      answerTime: '07:40:30',
      earnedPoints: 10,
    },
    {
      key: '4',
      id: '0004',
      answerDate: '2022/01/30',
      problemTitle: '問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル ',
      releaseStatus: '非公開',
      answerTime: '07:40:30',
      earnedPoints: 22,
    },
  ],
}
