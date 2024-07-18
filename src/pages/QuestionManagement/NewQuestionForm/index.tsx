/* eslint-disable indent */
import React, { useState, FC } from 'react'
import style from './NewQuestionForm.module.scss'
import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  notification,
  Radio,
  Row,
  Space,
} from 'antd'
import Quill from '@/components/Quill'
import { PlusOutlined } from '@ant-design/icons'
import AddSolution from '../AddSolution'
import { useSolution } from './hooks/useSolution'
import TagFormItem from '@/components/TagFormItem'
import UploadItem from '../UploadItem'
import { NUMBER_LIST } from '@/constants/errors'
import { useBlocker, useConfirmNavigate } from '@/utils/usePrompt'
import { Transition } from 'history'
import ModalCancel from '@/components/Modal/ModalCancel'
import { QUESTION_MANAGEMENT } from '@/constants/routes'
import SuccessIcon from '@/assets/icons/ico_success.svg'
import clsx from 'clsx'
import { useNavigate } from 'react-router-dom'

const NewQuestionFrom: FC = () => {
  const navigate = useNavigate()
  const initialValues = { id: '', solutions: null, status: 1 }

  const onFinishFormFailed = ({ errorFields }) => {
    console.log(errorFields)
    notification.error({
      message: `正しく入力されていない項目が${
        NUMBER_LIST[errorFields.length]
      }あります。ご確認の上、もう一度ご入力下さい。`,
      className: 'notification-error',
      duration: 5,
    })
  }

  const onFinish = (e) => {
    console.log(e)
    notification.success({
      message: `問題を登録しました（ID : ${e.id}）`,
      className: 'notification-success',
      duration: 5,
      icon: <SuccessIcon />,
    })

    setIsEnablePrompt(false)

    setTimeout(() => {
      navigate(QUESTION_MANAGEMENT)
    }, 0)
  }

  const [isCheckExpiredAt, setIsCheckExpiredAt] = useState<boolean>(false)

  const {
    isHiddenAddSolutionBtn,
    addSolutionCount,
    setAddSolutionCount,
    setIsHiddenAddSolutionBtn,
    arrayMove,
  } = useSolution()

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
    setPathTarget(tx?.location?.pathname)
    onHandleCancel(false, QUESTION_MANAGEMENT)
  }, isEnablePrompt)

  return (
    <div className={style.root}>
      <Form
        name="topic_add_form"
        initialValues={initialValues}
        onFinishFailed={onFinishFormFailed}
        onFinish={onFinish}
      >
        <Form.Item
          label="ID"
          name="id"
          rules={[{ required: true, message: 'IDを正しく入力してください' }]}
        >
          <Input style={{ width: '350px' }} placeholder="IDを入力してください" />
        </Form.Item>

        <Form.Item
          label="問題タイトル"
          name="title"
          rules={[{ required: true, message: '問題タイトルを正しく入力してください' }]}
        >
          <Input placeholder="問題タイトルを入力してください" style={{ width: '700px' }} />
        </Form.Item>

        <Form.Item label="補足説明" name="description" className="form-item-required">
          <Quill placeholder=" 補足説明を入力してください" />
        </Form.Item>

        <Form.Item
          label="動画・補足画像"
          className={clsx('form-item-required', style.uploadItem)}
          rules={[{ required: true, message: 'error' }]}
        >
          <div>
            <div className={style.uploadVideo}>
              <UploadItem title="問題動画" isVideo isNew />
              <UploadItem title="サムネイル" isNew />
            </div>

            <div>
              <p className={style.uploadVideoTitle}>補足動画（6枚まで）</p>
              <Space size={[16, 12]} wrap>
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i}>
                    <UploadItem isNew />
                  </div>
                ))}
              </Space>
            </div>
          </div>
        </Form.Item>

        {/* Solution */}
        <Form.Item
          label="解答方法"
          className="form-item-required"
          rules={[{ required: true, message: 'error' }]}
        >
          <>
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
                  item={item}
                />
              ))}
            </div>

            {isHiddenAddSolutionBtn && (
              <div className={style.addSolutionBtnWrapper}>
                <Button
                  onClick={() =>
                    setAddSolutionCount([
                      ...addSolutionCount,
                      { id: `${addSolutionCount.length + 1}`, text: '' },
                    ])
                  }
                  type="link"
                  icon={<PlusOutlined />}
                  className={style.addSolutionBtn}
                >
                  <span>解答方法を追加</span>
                </Button>
              </div>
            )}
          </>
        </Form.Item>

        {/* Tags */}
        <Form.Item label="タグ">
          <TagFormItem />
        </Form.Item>

        <Form.Item label="備考" name="remarks" className={style.remarksItem}>
          <Input.TextArea placeholder="備考を設定してください" rows={7} />
          <p className={style.areaNote}>※未設定可</p>
        </Form.Item>

        <Row gutter={16}>
          <Col>
            <Form.Item
              className={style.expiredItem}
              valuePropName="checked"
              label="有効期限"
              name="expiredAt"
            >
              <Checkbox onChange={() => setIsCheckExpiredAt(!isCheckExpiredAt)}>
                問題に有効期限を設定する
              </Checkbox>
            </Form.Item>
          </Col>
          <Col>
            {isCheckExpiredAt && (
              <Space direction="vertical" size={8}>
                <Space size={8}>
                  <Form.Item
                    style={{ marginBottom: 0 }}
                    name="expireRange"
                    rules={[{ required: true, message: '有効期限を設定してください' }]}
                  >
                    <DatePicker.RangePicker
                      style={{ width: '370px' }}
                      placeholder={['YYYY - MM - DD', 'YYYY - MM - DD']}
                    />
                  </Form.Item>
                </Space>
                <p className={style.expiredAtLabel}>
                  ※有効期限を設定した場合、期限切れの問題は自動的に非公開となります
                </p>
              </Space>
            )}
          </Col>
        </Row>

        <Form.Item label="ステータス" name="status" rules={[{ required: true, message: 'error' }]}>
          <Radio.Group>
            <Radio value={1}>公開</Radio>
            <Radio value={2}>非公開</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item className={style.formButtons}>
          <Button
            htmlType="button"
            className={style.actionTBtn}
            onClick={() => setIsVisibleModalCancel(true)}
          >
            キャンセル
          </Button>

          <Button
            className={style.actionTBtn}
            style={{ marginLeft: '20px' }}
            type="primary"
            htmlType="submit"
          >
            登録
          </Button>
        </Form.Item>
      </Form>

      <ModalCancel
        visible={isVisibleModalCancel}
        handleGoBack={() => handleGoBack(QUESTION_MANAGEMENT)}
        handleCloseModal={handleCloseModalCancel}
      />
    </div>
  )
}

export default NewQuestionFrom
