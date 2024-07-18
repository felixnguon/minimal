import React, { useState, useEffect, useCallback } from 'react'
import { Button, notification, Form, Input, Checkbox, Select, Spin } from 'antd'
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom'
import clsx from 'clsx'
import ModalCancel from '@/components/Modal/ModalCancel'
import ArrowLeftIcon from '@/assets/icons/ico_arrow-left.svg'
import PreviewIcon from '@/assets/icons/ico_preview.svg'
import SuccessIcon from '@/assets/icons/ico_success.svg'
import { PRIVACY_POLICY_OF_MANAGEMENT } from '@/constants/routes'
import styles from './PolicyForm.module.scss'
import { getFlag } from '@/utils/useGetFlag'
import Quill from '@/components/Quill'
import regex from '@/constants/regex'

const { Option } = Select

const PolicyForm: React.FC = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const { state }: any = useLocation()
  const params = useParams()
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [loading, setLoading] = useState(true)
  const [isVisibleModalCancel, setIsVisibleModalCancel] = useState<boolean>(false)

  const onHandleCancel = () => {
    setIsVisibleModalCancel(true)
  }

  const handleGoBack = () => {
    setIsVisibleModalCancel(false)
    navigate(PRIVACY_POLICY_OF_MANAGEMENT)
  }

  const handleCloseModal = () => {
    setIsVisibleModalCancel(false)
  }

  const fetchData = useCallback(() => {
    setLoading(false)
  }, [])

  const onFinishFormFailed = ({ errorFields }) => {}

  const onFinish = (values) => {
    notification.success({
      message: '個人情報の取り扱いを登録しました（バージョン : 2.0.3)',
      className: 'notification-success hasGreenMessage',
      duration: 5,
      icon: <SuccessIcon />,
    })
    console.log('form values: ', values)
    navigate(PRIVACY_POLICY_OF_MANAGEMENT)
  }

  const onCopyVersion = useCallback(() => {
    navigate('/privacy-policy-management/new-privacy-policy-management', {
      state: { copyData: initialValues },
    })
  }, [navigate])

  useEffect(() => {
    if (params.id) {
      setIsEdit(true)
      fetchData()
    } else {
      setLoading(false)
    }
  }, [fetchData, params.id])

  useEffect(() => {
    if (state?.copyData?.version) {
      form.setFieldsValue(state.copyData)
    }
  }, [form, state])

  return (
    <>
      {loading ? (
        <div className={styles.loadingContent}>
          <Spin size="large" />
        </div>
      ) : (
        <div className={styles.formContent}>
          <Form
            form={form}
            labelCol={{ span: 3 }}
            wrapperCol={{ span: 21 }}
            labelAlign="left"
            name="privacy_policy_form"
            onFinish={onFinish}
            onFinishFailed={onFinishFormFailed}
            initialValues={initialValues}
          >
            <div className={styles.header}>
              {state?.copyData?.version ? null : (
                <Button type="link" icon={<ArrowLeftIcon />} className={styles.backBtn}>
                  <Link to={PRIVACY_POLICY_OF_MANAGEMENT}>個人情報保護方針管理に戻る</Link>
                </Button>
              )}
              <div
                className={clsx(
                  styles.titleSection,
                  state?.copyData?.version && styles.copyDataTitle
                )}
              >
                <p className={styles.title}>
                  {state?.copyData?.version ? '新規個人情報保護方針登録' : '新規利用規約登録'}
                </p>
                <div className={styles.titleSectionRight}>
                  {!isEdit ? (
                    <span className={styles.previewButton}>
                      <Button type="text" icon={<PreviewIcon />}>
                        プレビュー
                      </Button>
                    </span>
                  ) : null}
                  <Form.Item
                    className={styles.inlineFormItem}
                    style={{
                      width: '180px',
                    }}
                    name="language"
                    rules={[{ required: true, message: 'This field is required' }]}
                    wrapperCol={{ span: 24 }}
                  >
                    <Select placeholder="言語" disabled={isEdit}>
                      {languages.map((item, index) => (
                        <Option key={index} value={item.code} className={styles.languageOption}>
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            {getFlag(item.code)} &nbsp; {item.name}
                          </div>
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>
              </div>
            </div>
            <Form.Item
              wrapperCol={{ span: 24 }}
              className={styles.justifyRightFormItem}
              valuePropName="checked"
              name="isUsing"
              initialValue={false}
            >
              <Checkbox>このバージョンを利用する（有効にする）</Checkbox>
            </Form.Item>

            <Form.Item className={styles.copyVersionFormItem} wrapperCol={{ span: 24 }}>
              <Form.Item
                label="バージョン"
                name="version"
                rules={[
                  { required: true, message: '正しいバージョンを入力してください' },
                  {
                    pattern: regex.version,
                    message: '正しいバージョンを入力してください',
                  },
                ]}
                className={isEdit ? styles.hideRequiredFromSpot : undefined}
                labelCol={{ span: 3 }}
                wrapperCol={{ span: 21 }}
              >
                <Input
                  placeholder="バージョン"
                  style={{
                    width: '100px',
                  }}
                  disabled={isEdit}
                />
              </Form.Item>

              {isEdit ? (
                <Button className={styles.copyVersionButton} type="primary" onClick={onCopyVersion}>
                  このバージョンをコピーして新規バージョンを作成
                </Button>
              ) : null}
            </Form.Item>

            <Form.Item
              label={isEdit ? null : '本文'}
              wrapperCol={{ span: isEdit ? 24 : 21 }}
              name="content"
              rules={[
                { required: true, message: '本文を入力してください' },
                () => ({
                  validator(_, value) {
                    if (value !== '<p><br></p>') {
                      return Promise.resolve()
                    }
                    return Promise.reject(new Error('本文を入力してください'))
                  },
                }),
              ]}
              className={isEdit ? styles.readOnlyQuill : undefined}
            >
              <Quill toolbar={toolbar} readOnly={isEdit} hasRule />
            </Form.Item>
            {isEdit ? (
              <Button
                className={styles.copyVersionButtonBottom}
                type="primary"
                onClick={onCopyVersion}
              >
                このバージョンをコピーして新規バージョンを作成
              </Button>
            ) : (
              <Form.Item className={styles.actionButtons}>
                <Button htmlType="button" onClick={onHandleCancel}>
                  キャンセル
                </Button>
                <Button type="primary" htmlType="submit">
                  登録
                </Button>
              </Form.Item>
            )}
          </Form>

          <ModalCancel
            visible={isVisibleModalCancel}
            handleGoBack={handleGoBack}
            handleCloseModal={handleCloseModal}
            className={styles.modalCancel}
          />
        </div>
      )}
    </>
  )
}

export default PolicyForm

const languages = [
  {
    id: 0,
    code: 'jp',
    name: ' 日本語',
  },
  {
    id: 1,
    code: 'en',
    name: '英語',
  },
  {
    id: 2,
    code: 'tw',
    name: '台湾人',
  },
  {
    id: 3,
    code: 'cn',
    name: '中国語',
  },
  {
    id: 4,
    code: 'kr',
    name: '韓国語',
  },
  {
    id: 5,
    code: 'my',
    name: 'マレーシア人',
  },
  {
    id: 6,
    code: 'id',
    name: 'インドネシア語',
  },
  {
    id: 7,
    code: 'th',
    name: 'タイ語',
  },
  {
    id: 8,
    code: 'vi',
    name: 'ベトナム',
  },
]

const toolbar = [
  ['bold', 'italic', 'underline', { color: [] }, 'strike'], // toggled buttons
  ['link', 'image', { size: ['small', false, 'large', 'huge'] }],
  [{ align: 'center' }, { align: 'right' }],
  [{ list: 'check' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
  ['clean'], // remove formatting button
]

const initialValues = {
  language: 'jp',
  version: '2.01',
  content:
    '<p><strong class="ql-size-huge">Feelnote利用規約</strong></p><p>本規約は、株式会社サマデイ（以下「当社」といいます）が企画・運営するFeelnote（以下「本サービス」といいます）の利用について、本サービスの会員登録を行った法人（以下「会員法人」といいます）、及び会員法人に所属する利用者（会員法人の卒業者で本規約に基づき卒業後の継続利用を認められた卒業生ユーザーを含み、以下「ユーザー」といいます）が、本サービスを利用する場合に適用されます。</p><p><br></p><p><strong class="ql-size-large">第１条（Feelnote）</strong></p><p>「Feelnote」とは、当社がインターネット上において提供する、ユーザーが自己の学習歴、活動歴等の実績、成果を一元化して入力、管理、蓄積ないし第三者と共有し、蓄積されたデータを様々なフォーマットにアウトプットして利用することのできるサービスをいいます。</p><p><br></p><p><strong class="ql-size-large">第２条（会員法人、ユーザー、会員等）</strong></p><p>会員法人 本サービスの利用を希望する、高校、大学等の各種教育機関・団体、企業等で、本規約に同意の上、当社指定の書面によって利用申込みを行い、当社がこれを承認した法人をいいます。 ユーザー 会員法人に所属する利用者及び会員法人を卒業等した後に第８条に定める卒業生ユーザーとして本サービスの利用を許された者をいいます。 会員等 「会員法人」と「ユーザー」を併せて会員等といいます。</p>',
}
