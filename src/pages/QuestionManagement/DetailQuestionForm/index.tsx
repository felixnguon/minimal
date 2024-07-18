/* eslint-disable indent */
import React, { useState, FC, useMemo } from 'react'
import style from './DetailQuestionForm.module.scss'
import {
  DatePicker,
  Button,
  Checkbox,
  Form,
  Input,
  notification,
  Radio,
  Space,
  Row,
  Col,
} from 'antd'
import Quill from '@/components/Quill'
import AddSolution from '@/pages/QuestionManagement/AddSolution'
import { useSolution } from '@/pages/QuestionManagement/NewQuestionForm/hooks/useSolution'
import TagFormItem from '@/components/TagFormItem'
import { PlusOutlined } from '@ant-design/icons'
import UploadItem from '@/pages/QuestionManagement/UploadItem'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import { QUESTION_MANAGEMENT } from '@/constants/routes'
import clsx from 'clsx'
import SuccessIcon from '@/assets/icons/ico_success.svg'
import ModalConfirmDelete from '@/components/Modal/ModalConfirmDelete'

const DetailQuestionFrom: FC = () => {
  const navigate = useNavigate()
  const [isOpenModalDelete, setIsOpenModalDelete] = useState<boolean>(false)

  const initialValues = {
    id: '0001',
    group: 'グループ名（1）、グループ名（2）',
    title:
      '問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タイトル 問題タ',
    remarks:
      '備考テキスト　備考テキスト　備考テキスト　備考テキスト　備考テキスト　備考テキスト　備考テキスト　備考テキスト　備考テキスト　備考テキスト　備考テキスト　備考テキスト　備考テキスト　備考テキスト　備考テキスト　備考テキスト　備考テキスト　備考テキスト　備考テキスト　備考テキスト　備考テキスト　備考テキスト　備考テキスト　備考テキスト　備考テキスト　備考テキスト　備考テキスト　備考テキスト　備考テキスト　備考テキスト　備考テキスト　備考テキスト　備考テキスト　',
    status: 1,
    expiredAt: true,
  }

  const onFinishFormFailed = () => {
    notification.error({
      message: '正しく入力されていない項目が二つあります。ご確認の上、もう一度ご入力下さい。',
      className: 'notification-error',
      duration: 5,
    })
  }

  const onFinish = () => {
    if (isDeleteChecked) {
      setIsOpenModalDelete(true)

      return
    }

    notification.success({
      message: '問題を削除しました（ID : 00006）',
      className: 'notification-success',
      duration: 5,
      icon: <SuccessIcon />,
    })
    navigate(QUESTION_MANAGEMENT)
  }

  const handleConfirm = () => {
    setIsOpenModalDelete(false)
    notification.success({
      message: '問題を削除しました（ID : 00006）',
      className: 'notification-success',
      duration: 5,
      icon: <SuccessIcon />,
    })
    navigate(QUESTION_MANAGEMENT)
  }

  const [form] = Form.useForm()
  const [isCheckExpiredAt, setIsCheckExpiredAt] = useState<boolean>(true)
  const [isDeleteChecked, setIsDeleteChecked] = useState<boolean>(false)
  const [statusField, setStatusField] = useState<number>(1)

  const onChangeStatus = (e) => {
    setIsDeleteChecked(false)
    setStatusField(e.target.value)
  }

  const {
    isHiddenAddSolutionBtn,
    addSolutionCount,
    setAddSolutionCount,
    setIsHiddenAddSolutionBtn,
    arrayMove,
  } = useSolution(true)

  return (
    <div className={style.root}>
      <Form
        name="topic_add_form"
        initialValues={initialValues}
        onFinishFailed={onFinishFormFailed}
        onFinish={onFinish}
        form={form}
      >
        <Form.Item
          label="ID"
          name="id"
          rules={[{ required: true, message: 'IDを正しく入力してください' }]}
        >
          <Input style={{ width: '350px' }} placeholder="IDを入力してください" />
        </Form.Item>

        <Form.Item label="グループ" name="group" rules={[{ required: true, message: 'error' }]}>
          <Input disabled style={{ width: '350px' }} placeholder="group" />
        </Form.Item>

        <Form.Item
          label="問題タイトル"
          name="title"
          rules={[{ required: true, message: '問題タイトルを正しく入力してください' }]}
        >
          <Input placeholder="問題タイトルを入力してください" />
        </Form.Item>

        <Form.Item label="補足説明" name="description" className="form-item-required">
          <Quill
            placeholder=" 補足説明を入力してください"
            value="補足説明補足説明補足説明補足説明補足説明補足説明補足説明補足説明補足説明補足説明補足説明補足説明補足説明補足説明補足説明補足説明補足説明補足説明補足説明補足説明補足説明補足説明補足説明補足説明補足説明補足説明補足説明補足説明補足説明補足説明補足説明補足説明補足説明補足説明補足説明補足説明補足説明補足説明補足説明補足説明補足説明補足説明補足説明補足説明補足説明補足説明補足説明補足説明補足説明補足説明補足説明補足説明補足説明補足説明補足説明補足説明補足説明補足説明補足説明補足説明補足説明補"
          />
        </Form.Item>

        <Form.Item
          label="動画・補足画像"
          className={clsx('form-item-required', style.uploadItem)}
          rules={[{ required: true, message: 'error' }]}
        >
          <div className={style.uploadVideo}>
            <UploadItem title="問題動画" isVideo />

            <UploadItem title="サムネイル" />
          </div>

          <div>
            <p className={style.uploadVideoTitle}>補足動画（6枚まで）</p>
            <Space size={[16, 12]} wrap>
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i}>
                  <UploadItem />
                </div>
              ))}
            </Space>
          </div>
        </Form.Item>

        {/* Solution */}
        <Form.Item
          label="解答方法"
          rules={[{ required: true, message: 'error' }]}
          className="form-item-required"
        >
          <div className={style.addSolutionCountWrapper}>
            {addSolutionCount.map((item, index, array) => (
              <AddSolution
                disabledUp={index === 0}
                disabledDown={index === array.length - 1}
                isShowMoveBtn={array.length > 1}
                isShowDeleteBtn={index > 0}
                key={item.id}
                moveDown={() => arrayMove(array, index, index + 1)}
                moveUp={() => arrayMove(array, index, index - 1)}
                setIsHiddenAddSolutionBtn={setIsHiddenAddSolutionBtn}
                setAddSolutionCount={setAddSolutionCount}
                isEdit
                item={item}
              />
            ))}
          </div>

          {isHiddenAddSolutionBtn && (
            <div className={style.addSolutionBtnWrapper}>
              <Button
                onClick={() => {
                  setAddSolutionCount([
                    ...addSolutionCount,
                    { id: `${addSolutionCount.length + 1}`, text: '' },
                  ])
                }}
                type="link"
                icon={<PlusOutlined />}
                className={style.addSolutionBtn}
              >
                <span>解答方法を追加</span>
              </Button>
            </div>
          )}
        </Form.Item>

        {/* Tags */}
        <Form.Item label="タグ" rules={[{ required: true, message: 'error' }]}>
          <TagFormItem />
        </Form.Item>

        <Form.Item label="備考" name="remarks">
          <Input.TextArea placeholder="備考を設定してください" rows={7} />
        </Form.Item>

        <Row gutter={20}>
          <Col>
            <Form.Item valuePropName="checked" label="有効期限" name="expiredAt">
              <Checkbox onChange={() => setIsCheckExpiredAt(!isCheckExpiredAt)}>
                問題に有効期限を設定する
              </Checkbox>
            </Form.Item>
          </Col>

          <Col>
            {isCheckExpiredAt && (
              <Space direction="vertical" size={8}>
                <Space size={40}>
                  <DatePicker.RangePicker
                    style={{ width: '300px' }}
                    defaultValue={[
                      moment('2019-09-03', 'YYYY-MM-DD'),
                      moment('2019-11-22', 'YYYY-MM-DD'),
                    ]}
                  />
                </Space>

                <p className={style.expiredAtLabel}>
                  ※有効期限を設定した場合、期限切れの問題は自動的に非公開となります
                </p>
              </Space>
            )}
          </Col>
        </Row>

        <Space align="baseline">
          <Form.Item
            label="ステータス"
            name="status"
            rules={[{ required: true, message: 'error' }]}
          >
            <Radio.Group onChange={onChangeStatus}>
              <Radio value={1}>公開</Radio>
              <Radio value={2}>非公開</Radio>
            </Radio.Group>
          </Form.Item>
          {statusField === 2 && (
            <Checkbox
              value={isDeleteChecked}
              onChange={(e) => setIsDeleteChecked(e.target.checked)}
            >
              この問題を削除する
            </Checkbox>
          )}
        </Space>

        <Form.Item className={style.formButtons}>
          <Button onClick={() => navigate(QUESTION_MANAGEMENT)} htmlType="button">
            キャンセル
          </Button>

          <Button style={{ marginLeft: '20px' }} type="primary" htmlType="submit">
            登録
          </Button>
        </Form.Item>
      </Form>

      <ModalConfirmDelete
        visible={isOpenModalDelete}
        handleCancel={() => setIsOpenModalDelete(false)}
        handleConfirm={handleConfirm}
        content="この契約を削除してもよろしいですか？"
      />
    </div>
  )
}

export default DetailQuestionFrom
