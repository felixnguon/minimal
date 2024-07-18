import { Button, Checkbox, Col, Form, Input, Modal, notification, Radio, Row, Space } from 'antd'
import React, { useState } from 'react'
import style from './EditTopicGroup.module.scss'
import ArrowLeftIcon from '@/assets/icons/ico_arrow-left.svg'
import { getFlag } from '@/utils/useGetFlag'
import { Locale } from '@/types/locale'
import PreviewIcon from '@/assets/icons/ico_preview.svg'
import { ColumnsType } from 'antd/es/table'
import TopicListTable from '@/components/TopicListTable'
import { Link, useNavigate } from 'react-router-dom'
import SuccessIcon from '@/assets/icons/ico_success.svg'
import { QUESTION_MANAGEMENT } from '@/constants/routes'

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
    id: '0001',
    question:
      '問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル',
    locale: 'en',
  },
  {
    key: 1,
    id: '0002',
    question:
      '問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル',
    locale: 'vn',
  },
]

const EditTopicGroup = () => {
  const navigate = useNavigate()
  const initialValues = {
    title: 'title',
    status: 1,
    locales: ['en', 'vn'],
    confirmDeleteCheckbox: false,
  }

  const [localesCheckedList, setLocalesCheckedList] = useState<string[]>(['en', 'vn'])
  const [disabled, setDisabled] = useState<boolean>(true)
  const [isVisibleModalConfirmMoreLocales, setIsVisibleModalConfirmMoreLocales] =
    useState<boolean>(false)
  const [visibleConfirmDelete, setVisibleConfirmDelete] = useState<boolean>(false)

  const [isHiddenFilterBtn, setIsHiddenFilterBtn] = useState<boolean>(true)
  const [dataSource, setDataSource] = useState<QuestionItem[]>(questionsData)

  const onChangeLocales = (checkedValues) => {
    setLocalesCheckedList(checkedValues)
  }

  const filterTopics = () => {
    setDataSource(questionsData)
  }

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
    },
    getCheckboxProps: (record) => ({
      disabled: disabled, // Column configuration not to be checked
      name: record.name,
    }),
    selectedRowKeys: questionsData.map((item) => item.key),
  }

  const [form] = Form.useForm()

  const [currentCheckBoxClicked, setCurrentCheckBoxClicked] = useState<any>({})

  const onCheckMoreLocale = (e) => {
    if (!isHiddenFilterBtn) return
    if (!e.target.checked) {
      setIsHiddenFilterBtn(false)
      return
    }
    setIsVisibleModalConfirmMoreLocales(true)
    setCurrentCheckBoxClicked(e.target)
  }

  const onCancelModal = () => {
    setIsVisibleModalConfirmMoreLocales(false)
    form.setFieldsValue({
      locales: currentCheckBoxClicked.checked
        ? localesCheckedList.filter((item) => item !== currentCheckBoxClicked.value)
        : [...localesCheckedList, currentCheckBoxClicked.value],
    })
  }

  const onOkModal = () => {
    setIsVisibleModalConfirmMoreLocales(false)
    setIsHiddenFilterBtn(false)
  }

  const [status, setStatus] = useState<number>(1)

  const onFinish = (value) => {
    if (value.confirmDeleteCheckbox) {
      setVisibleConfirmDelete(true)

      return
    }
  }

  const confirmDelete = () => {
    setVisibleConfirmDelete(false)
    navigate(`${QUESTION_MANAGEMENT}?tab=2`)

    notification.success({
      message: 'グループを削除しました（ID : 00006）',
      className: 'notification-success',
      duration: 5,
      icon: <SuccessIcon />,
    })
  }

  return (
    <div className={style.root}>
      <div className={style.wrapper}>
        <Button type="link" icon={<ArrowLeftIcon />} className={style.backBtn}>
          <Link to={'/question-management?tab=2'}>出題問題管理に戻る</Link>
        </Button>

        <p className={style.headline}>グループの編集</p>

        <div className={style.formNote}>
          <p>
            <span className={style.formNoteLabel}>最終更新日時 ：</span>
            <span> 2022/01/30 - 07:40AM</span>
          </p>
        </div>
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

          <Form.Item label="対応言語" name="locales" rules={[{ required: true, message: 'Error' }]}>
            <Checkbox.Group
              className={style.checkBoxGroup}
              style={{ width: '100%' }}
              onChange={onChangeLocales}
            >
              <Row gutter={[0, 16]}>
                {locales.map((item) => (
                  <Col span={6} key={item.code}>
                    <Space align="baseline" size={0}>
                      <Checkbox onChange={onCheckMoreLocale} disabled={disabled} value={item.code}>
                        {getFlag(item.code)}
                      </Checkbox>

                      <p className={style.localeText}>{item.name}</p>
                    </Space>
                  </Col>
                ))}
              </Row>
            </Checkbox.Group>
          </Form.Item>

          <div className={style.submitButton}>
            {isHiddenFilterBtn ? (
              <>
                {disabled ? (
                  <Button type="primary" onClick={() => setDisabled(false)}>
                    対応言語の再選択
                  </Button>
                ) : (
                  <Button
                    className={style.buttonRejectPickLocale}
                    onClick={() => setDisabled(true)}
                  >
                    対応言語の再選択キャンセル
                  </Button>
                )}
              </>
            ) : (
              <Button
                disabled={localesCheckedList.length === 0}
                type="primary"
                onClick={filterTopics}
              >
                選択可能問題の表示
              </Button>
            )}
          </div>

          <div className={style.tableNote}>
            <p>NN 問選択中</p>
          </div>
          <Form.Item
            className="form-item-required"
            label="登録問題"
            rules={[{ required: true, message: 'Error' }]}
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

          <Space size={6}>
            <Form.Item
              label="ステータス"
              name="status"
              rules={[{ required: true, message: 'Error' }]}
            >
              <Radio.Group onChange={(e) => setStatus(e.target.value)}>
                <Radio value={1}>有効</Radio>
                <Radio value={2}>無効 </Radio>
              </Radio.Group>
            </Form.Item>

            {status === 2 && (
              <Form.Item valuePropName="confirmDeleteCheckbox" name="confirmDeleteCheckbox">
                <Checkbox
                  onChange={(e) => form.setFieldsValue({ confirmDeleteCheckbox: e.target.checked })}
                >
                  このグループを削除する
                </Checkbox>
              </Form.Item>
            )}
          </Space>

          <Form.Item className={style.formButtons}>
            <Link to="/question-management?tab=2">
              <Button htmlType="button">キャンセル</Button>
            </Link>
            <Button style={{ marginLeft: '20px' }} type="primary" htmlType="submit">
              登録
            </Button>
          </Form.Item>
        </Form>

        <Modal
          title="追加確認"
          visible={isVisibleModalConfirmMoreLocales}
          onCancel={onCancelModal}
          footer={null}
        >
          <div className={style.modalContent}>
            <p>
              言語を追加した場合、選択した言語に 対応していない問題の選択が解除され
              ますがよろしいですか？
            </p>
          </div>

          <div className={style.modalButtons}>
            <Button onClick={onCancelModal}>キャンセル</Button>

            <Button type="primary" onClick={onOkModal}>
              言語を追加する
            </Button>
          </div>
        </Modal>

        <Modal
          title="削除確認"
          visible={visibleConfirmDelete}
          onCancel={() => setVisibleConfirmDelete(false)}
          footer={null}
        >
          <div className={style.modalContent}>
            <p>このグループを削除してもよろしいですか？</p>
          </div>

          <div className={style.modalButtons}>
            <Button onClick={() => setVisibleConfirmDelete(false)}>キャンセル</Button>

            <Button type="primary" onClick={confirmDelete} danger>
              削除する
            </Button>
          </div>
        </Modal>
      </div>
    </div>
  )
}

export default EditTopicGroup
