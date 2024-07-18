import React, { useState, useCallback, useRef, useEffect } from 'react'
import clsx from 'clsx'
import { Button, Form, Select, InputNumber, DatePicker, Collapse, notification } from 'antd'
import { FormInstance } from 'antd/lib/form/Form'
import styles from './CurrentContractDetailForm.module.scss'
import { hours, minutes } from '@/constants/time'
import contractNumberList from '@/constants/contractNumberList'
import OpenCollapseIcon from '@/assets/icons/ico_collapse_open.svg'
import CloseCollapseIcon from '@/assets/icons/ico_collapse_close.svg'
import SuccessIcon from '@/assets/icons/ico_success.svg'
import RegistrationQuestionSelectionTable from '@/pages/OrganizationManagement/--components/RegistrationQuestionSelectionTable'
import QuestionTable from './--components/QuestionTable'

const { Option } = Select
const { Panel } = Collapse

const dateFormat = 'YYYY/MM/DD'

type PropsType = { form: FormInstance; isExpandedElement?: boolean; isEffectedContract?: boolean }
const CurrentContractDetailForm: React.FC<PropsType> = ({
  form,
  isExpandedElement = false,
  isEffectedContract = true,
}) => {
  const [isEditPeriod, setEditPeriod] = useState<boolean>(false)
  const [isEditContractAccount, setEditContractAccount] = useState<boolean>(false)
  const [isEditNumberQuestion, setEditNumberQuestion] = useState<boolean>(false)

  const initialData = useRef({})

  const onCancelEdit = useCallback(
    (fieldName) => {
      switch (fieldName) {
        case 'period':
          setEditPeriod(false)
          break
        case 'account':
          setEditContractAccount(false)
          break
        case 'numberQuestion':
          setEditNumberQuestion(false)
          break
        default:
          break
      }
      form.setFieldsValue(initialData.current)
    },
    [form]
  )

  const onSubmitEdit = useCallback(
    (fieldName) => {
      notification.success({
        message: '契約内容を変更しました',
        className: 'notification-success',
        duration: 5,
        icon: <SuccessIcon />,
      })
      switch (fieldName) {
        case 'period':
          setEditPeriod(false)
          break
        case 'account':
          setEditContractAccount(false)
          break
        case 'numberQuestion':
          setEditNumberQuestion(false)
          break
        default:
          break
      }
      initialData.current = form.getFieldsValue()
    },
    [form]
  )

  useEffect(() => {
    initialData.current = form.getFieldsValue()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={clsx(styles.wrapper, isExpandedElement ? styles.childElementWrapper : {})}>
      <div className={styles.header}>利用期間</div>
      <div className={clsx(styles.wrapFormItem, styles.multiplyRow)}>
        <div>
          <Form.Item className={clsx(styles.flexFormItem, styles.childrenForm)}>
            <span
              className={clsx(
                styles.formItemText,
                styles.firstChildLabel,
                styles.labelNotBlur,
                !isEditPeriod ? styles.labelInNotEditingStatus : undefined
              )}
            >
              開始日時
            </span>
            <span
              className={isEditPeriod ? styles.hide : undefined}
              style={{ transform: 'translateY(5px)' }}
            >
              :
            </span>
            <Form.Item
              name="startDateContract"
              className={clsx(styles.inlineFormItem, !isEditPeriod ? styles.hide : undefined)}
              style={{ width: '220px' }}
              rules={[{ required: true, message: 'This field is required' }]}
            >
              <DatePicker format={dateFormat} placeholder="YYYY/MM/DD" />
            </Form.Item>
            <DynamicText
              form={form}
              condition={isEditPeriod}
              fieldName="startDateContract"
              isDateText
              hourFieldName="startDateHour"
              minuteFieldName="startDateMinute"
            />
            <Form.Item
              name="startDateHour"
              className={clsx(styles.inlineFormItem, !isEditPeriod ? styles.hide : undefined)}
              style={{ width: '68px' }}
              rules={[{ required: true, message: 'This field is required' }]}
            >
              <Select>
                {hours.map((item) => (
                  <Option key={item} value={item}>
                    {item}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <span className={clsx(styles.formItemText, !isEditPeriod ? styles.hide : undefined)}>
              時
            </span>
            <Form.Item
              name="startDateMinute"
              className={clsx(styles.inlineFormItem, !isEditPeriod ? styles.hide : undefined)}
              style={{ width: '68px' }}
              rules={[{ required: true, message: 'This field is required' }]}
            >
              <Select>
                {minutes.map((item) => (
                  <Option key={item} value={item}>
                    {item}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <span className={clsx(styles.formItemText, !isEditPeriod ? styles.hide : undefined)}>
              分
            </span>
          </Form.Item>
          <Form.Item className={clsx(styles.flexFormItem, styles.childrenForm)}>
            <span
              className={clsx(
                styles.formItemText,
                styles.firstChildLabel,
                styles.labelNotBlur,
                !isEditPeriod ? styles.labelInNotEditingStatus : undefined
              )}
            >
              終了日時
            </span>
            <span
              className={isEditPeriod ? styles.hide : undefined}
              style={{ transform: 'translateY(5px)' }}
            >
              :
            </span>
            <Form.Item
              name="endDateContract"
              className={clsx(
                styles.inlineFormItem,

                !isEditPeriod ? styles.hide : undefined
              )}
              style={{ width: '220px' }}
            >
              <DatePicker format={dateFormat} placeholder="YYYY/MM/DD" />
            </Form.Item>

            <DynamicText
              form={form}
              condition={isEditPeriod}
              fieldName="endDateContract"
              isDateText
              hourFieldName="endDateHour"
              minuteFieldName="endDateMinute"
            />

            <Form.Item
              name="endDateHour"
              className={clsx(styles.inlineFormItem, !isEditPeriod ? styles.hide : undefined)}
              style={{ width: '68px' }}
              rules={[{ required: true, message: 'This field is required' }]}
            >
              <Select>
                {hours.map((item) => (
                  <Option key={item} value={item}>
                    {item}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <span className={clsx(styles.formItemText, !isEditPeriod ? styles.hide : undefined)}>
              時
            </span>
            <Form.Item
              name="endDateMinute"
              className={clsx(styles.inlineFormItem, !isEditPeriod ? styles.hide : undefined)}
              style={{ width: '68px' }}
              rules={[{ required: true, message: 'This field is required' }]}
            >
              <Select>
                {minutes.map((item) => (
                  <Option key={item} value={item}>
                    {item}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <span className={clsx(styles.formItemText, !isEditPeriod ? styles.hide : undefined)}>
              分
            </span>
          </Form.Item>
        </div>

        <div>
          {isEffectedContract ? (
            isEditPeriod ? (
              <div className={styles.groupEditButton}>
                <Button type="default" onClick={() => onCancelEdit('period')}>
                  キャンセル
                </Button>
                <Button type="primary" onClick={() => onSubmitEdit('period')}>
                  登録
                </Button>
              </div>
            ) : (
              <Button type="link" onClick={() => setEditPeriod(true)}>
                編集
              </Button>
            )
          ) : null}
        </div>
      </div>

      <div className={styles.header}>契約アカウント数</div>
      <div className={styles.wrapFormItem}>
        <div style={{ marginBottom: '20px' }}>
          <span
            className={clsx(
              styles.formItemText,
              styles.firstChildLabel,
              styles.labelNotBlur,
              !isEditContractAccount ? styles.labelInNotEditingStatus : undefined
            )}
          >
            出題者数
          </span>
          <span className={isEditContractAccount ? styles.hide : undefined}>:</span>
          <Form.Item
            name="questionsNumber"
            className={clsx(
              styles.inlineFormItem,
              !isEditContractAccount ? styles.hide : undefined
            )}
            style={{ width: '130px' }}
            rules={[{ required: true, message: 'This field is required' }]}
          >
            <InputNumber min={1} placeholder="数字のみ入力可" />
          </Form.Item>

          <DynamicText form={form} condition={isEditContractAccount} fieldName="questionsNumber" />
          <span
            className={clsx(styles.formItemText, styles.unitText)}
            style={{ marginRight: '50px' }}
          >
            人
          </span>
          <span
            className={clsx(
              styles.formItemText,
              styles.labelNotBlur,
              !isEditContractAccount ? styles.labelInNotEditingStatus : undefined
            )}
          >
            解答者数
          </span>
          <span className={isEditContractAccount ? styles.hide : undefined}>:</span>
          <Form.Item
            name="answerersNumber"
            className={clsx(
              styles.inlineFormItem,
              !isEditContractAccount ? styles.hide : undefined
            )}
            style={{ width: '130px' }}
            rules={[{ required: true, message: 'This field is required' }]}
          >
            <InputNumber min={1} placeholder="数字のみ入力可" />
          </Form.Item>

          <DynamicText form={form} condition={isEditContractAccount} fieldName="answerersNumber" />
          <span className={clsx(styles.formItemText, styles.unitText)}>人</span>
        </div>

        <div>
          {isEffectedContract ? (
            isEditContractAccount ? (
              <div className={styles.groupEditButton}>
                <Button type="default" onClick={() => onCancelEdit('account')}>
                  キャンセル
                </Button>
                <Button type="primary" onClick={() => onSubmitEdit('account')}>
                  登録
                </Button>
              </div>
            ) : (
              <Button type="link" onClick={() => setEditContractAccount(true)}>
                編集
              </Button>
            )
          ) : null}
        </div>
      </div>
      <div className={styles.header}>契約問題数</div>
      <div className={styles.wrapFormItem}>
        <div style={{ marginBottom: '20px' }}>
          <span
            className={clsx(
              styles.formItemText,
              styles.firstChildLabel,
              styles.labelNotBlur,
              !isEditNumberQuestion ? styles.labelInNotEditingStatus : undefined
            )}
          >
            契約点数
          </span>
          <span className={isEditNumberQuestion ? styles.hide : undefined}>:</span>
          <Form.Item
            name="contractPoints"
            className={clsx(styles.inlineFormItem, !isEditNumberQuestion ? styles.hide : undefined)}
            style={{ width: '68px' }}
            rules={[{ required: true, message: 'This field is required' }]}
          >
            <Select placeholder="_">
              {contractNumberList.map((item) => (
                <Option key={item} value={item}>
                  {item}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <DynamicText form={form} condition={isEditNumberQuestion} fieldName="contractPoints" />
          <span className={clsx(styles.formItemText, styles.unitText)}>問</span>
        </div>

        <div>
          {isEffectedContract ? (
            isEditNumberQuestion ? (
              <div className={styles.groupEditButton}>
                <Button type="default" onClick={() => onCancelEdit('numberQuestion')}>
                  キャンセル
                </Button>
                <Button type="primary" onClick={() => onSubmitEdit('numberQuestion')}>
                  登録
                </Button>
              </div>
            ) : (
              <Button type="link" onClick={() => setEditNumberQuestion(true)}>
                編集
              </Button>
            )
          ) : null}
        </div>
      </div>
      {isEditNumberQuestion ? (
        <div className={styles.registrationQuestionTable}>
          <RegistrationQuestionSelectionTable form={form} />
        </div>
      ) : null}
      {!isExpandedElement ? (
        <Collapse
          className={isEditNumberQuestion ? styles.collapseClosed : undefined}
          bordered={false}
          expandIconPosition="right"
          expandIcon={({ isActive }) => (
            <span>{isActive ? <CloseCollapseIcon /> : <OpenCollapseIcon />}</span>
          )}
          destroyInactivePanel
        >
          <Panel
            header={<p>契約中の問題</p>}
            key="1"
            className={styles.contractQuestionsPanel}
            collapsible={isEditNumberQuestion ? 'disabled' : undefined}
            forceRender
          >
            <QuestionTable />
          </Panel>
        </Collapse>
      ) : null}

      {isExpandedElement && !isEditNumberQuestion ? (
        <div className={styles.questionTableWrapper}>
          <QuestionTable />
        </div>
      ) : null}
    </div>
  )
}

export default CurrentContractDetailForm

type DynamicTextPropType = {
  form: FormInstance
  condition: boolean
  fieldName: string
  isDateText?: boolean
  hourFieldName?: string
  minuteFieldName?: string
}

const DynamicText: React.FC<DynamicTextPropType> = ({
  form,
  condition,
  fieldName,
  isDateText = false,
  hourFieldName = '',
  minuteFieldName = '',
}) => {
  return (
    <span
      className={clsx(
        styles.formItemText,
        styles.labelNotBlur,
        condition ? styles.hide : undefined,
        !condition ? styles.contentInNotEditing : undefined
      )}
    >
      {isDateText ? (
        hourFieldName && minuteFieldName ? (
          <>
            {form.getFieldValue([fieldName]).format('YYYY/MM/DD')}
            {' - '}
            {form.getFieldValue([hourFieldName])}:{form.getFieldValue([minuteFieldName])}
          </>
        ) : (
          form.getFieldValue([fieldName]).format('YYYY/MM/DD')
        )
      ) : (
        form.getFieldValue([fieldName])
      )}
    </span>
  )
}
