import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  Modal,
  notification,
  Radio,
  Row,
  Space,
  Table,
} from 'antd'
import React, { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import style from './NewTopicGroup.module.scss'
import ArrowLeftIcon from '@/assets/icons/ico_arrow-left.svg'
import { getFlag } from '@/utils/useGetFlag'
import { Locale } from '@/types/locale'
import PreviewIcon from '@/assets/icons/ico_preview.svg'
import { ColumnsType } from 'antd/es/table'
import TopicListTable from '@/components/TopicListTable'
import { useBlocker, useConfirmNavigate } from '@/utils/usePrompt'
import { Transition } from 'history'
import { QUESTION_MANAGEMENT } from '@/constants/routes'
import ModalCancel from '@/components/Modal/ModalCancel'
import SuccessIcon from '@/assets/icons/ico_success.svg'

const locales: Locale[] = [
  { code: 'jp', name: '日本語' },
  { code: 'en', name: '英語' },
  { code: 'cn', name: '中国語 (簡体字)' },
  { code: 'my', name: 'マレー語' },
  { code: 'th', name: 'タイ語' },
  { code: 'vn', name: 'ベトナム語' },
  { code: 'id', name: 'インドネシア語' },
]

type QuestionItem = {
  id: string
  question: string
  locale: string[]
}

const columnsQuestion: ColumnsType<QuestionItem> = [
  {
    dataIndex: 'id',
    width: '48px',
    className: style.idText,
  },
  {
    dataIndex: 'question',
    width: '70%',
    className: style.questionText,
  },
  {
    dataIndex: 'previewQuestion',
    className: style.previewText,
    render: () => (
      <Button type="link" className={style.previewBtn} icon={<PreviewIcon />}>
        プレビュー
      </Button>
    ),
  },
]

const questionsData = [
  {
    key: 0,
    id: '00001',
    question:
      '問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル',
    locale: ['en', 'vn'],
  },
  {
    key: 1,
    id: '00002',
    question:
      '問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル',
    locale: ['vn', 'en'],
  },
]

const NewTopicGroup = () => {
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const initialValues = {
    title: 'title',
    status: 1,
  }

  const [localesCheckedList, setLocalesCheckedList] = useState<string[]>([])
  const [dataSource, setDataSource] = useState<QuestionItem[]>([])

  const onChangeLocales = (checkedValues) => {
    setLocalesCheckedList(checkedValues)
  }

  const [isHiddenResult, setIsHiddenResult] = useState<boolean>(false)

  const filterTopics = () => {
    setDataSource(questionsData)
    setIsHiddenResult(true)
  }

  const removeFilter = () => {
    form.resetFields()
    setIsHiddenResult(false)
  }

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
    },
  }

  const {
    isEnablePrompt,
    isVisibleModalCancel,
    onHandleCancel,
    handleCloseModalCancel,
    handleGoBack,
    setPathTarget,
    setIsVisibleModalCancel,
    setIsEnablePrompt,
  } = useConfirmNavigate()

  useBlocker((tx: Transition) => {
    setPathTarget(`${tx?.location?.pathname}?tab=2`)
    onHandleCancel(false, `${QUESTION_MANAGEMENT}?tab=2`)
  }, isEnablePrompt)

  const onFinish = (e) => {
    console.log(e)
    notification.success({
      message: `グループを登録しました（ID : ${e.title}）`,
      className: 'notification-success',
      duration: 5,
      icon: <SuccessIcon />,
    })

    setIsEnablePrompt(false)

    setTimeout(() => {
      navigate(`${QUESTION_MANAGEMENT}?tab=2`)
    }, 0)
  }

  return (
    <div className={style.root}>
      <div className={style.wrapper}>
        <Button type="link" icon={<ArrowLeftIcon />} className={style.backBtn}>
          <Link to={'/question-management?tab=2'}>出題問題管理に戻る</Link>
        </Button>

        <p className={style.headline}>新規グループ登録</p>

        <Form
          form={form}
          name="topic_add_form"
          initialValues={initialValues}
          // onFinishFailed={onFinishFormFailed}
          onFinish={onFinish}
        >
          <Form.Item
            label="グループ名"
            name="title"
            rules={[{ required: true, message: 'グループ名を正しく入力してください' }]}
          >
            <Input placeholder="グループ名を入力してください" style={{ width: '700px' }} />
          </Form.Item>

          <Form.Item
            valuePropName="locales"
            label="対応言語"
            name="locales"
            rules={[{ required: true, message: 'error' }]}
          >
            <Checkbox.Group style={{ width: '100%' }} onChange={onChangeLocales}>
              <Row gutter={[0, 16]}>
                {locales.map((item) => (
                  <Col span={6} key={item.code}>
                    <Space align="baseline" size={0}>
                      <Checkbox value={item.code}>{getFlag(item.code)}</Checkbox>

                      <p className={style.localeText}>{item.name}</p>
                    </Space>
                  </Col>
                ))}
              </Row>
            </Checkbox.Group>
          </Form.Item>

          <div className={style.submitButton}>
            {!isHiddenResult ? (
              <Button
                disabled={localesCheckedList.length === 0}
                type="primary"
                onClick={filterTopics}
              >
                選択可能問題の表示
              </Button>
            ) : (
              <Button type="default" onClick={removeFilter}>
                言語選択解除
              </Button>
            )}
          </div>

          {isHiddenResult && (
            <>
              <p className={style.count}>NN 問選択中</p>
              <Form.Item
                className="form-item-required"
                label="登録問題選択"
                rules={[{ required: true, message: '登録問題を選択してください' }]}
              >
                <div className={style.topics}>
                  <TopicListTable
                    pagination={false}
                    columns={columnsQuestion}
                    dataSource={dataSource}
                    rowSelection={rowSelection}
                  />
                </div>
              </Form.Item>

              <Form.Item label="備考" style={{ marginBottom: '35px' }}>
                <Input.TextArea placeholder="備考を設定してください" rows={7} />
                <p className={style.textAreaNote}>※未設定可</p>
              </Form.Item>

              <Form.Item
                label="ステータス"
                name="status"
                rules={[{ required: true, message: 'error' }]}
              >
                <Radio.Group>
                  <Radio value={1}>有効</Radio>
                  <Radio value={2}>無効</Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item className={style.formButtons}>
                <Button onClick={() => setIsVisibleModalCancel(true)} htmlType="button">
                  キャンセル
                </Button>

                <Button style={{ marginLeft: '20px' }} type="primary" htmlType="submit">
                  登録
                </Button>
              </Form.Item>
            </>
          )}
        </Form>
      </div>

      <ModalCancel
        visible={isVisibleModalCancel}
        handleGoBack={() => handleGoBack(`${QUESTION_MANAGEMENT}?tab=2`)}
        handleCloseModal={handleCloseModalCancel}
      />
    </div>
  )
}

export default NewTopicGroup
