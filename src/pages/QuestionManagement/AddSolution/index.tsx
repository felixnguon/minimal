import { Button, Checkbox, Input, Radio, Select, Space } from 'antd'
import React, { useEffect, useState, FC } from 'react'
import style from './AddSolution.module.scss'
import Quill from '@/components/Quill'
import clsx from 'clsx'
import RemoveIcon from '@/assets/icons/ico_remove.svg'
import MoveUpIcon from '@/assets/icons/ico_move-up.svg'
import MoveDownIcon from '@/assets/icons/ico_move-down.svg'

interface AddSolutionProps {
  setIsHiddenAddSolutionBtn: (p: boolean) => void
  moveDown: () => void
  moveUp: () => void
  disabledUp: boolean
  disabledDown: boolean
  isShowMoveBtn: boolean
  isShowDeleteBtn: boolean
  setAddSolutionCount: (p: any) => void
  item?: any
  isEdit?: boolean
}

type RadioSolutionArray = {
  id: string
}

const AddSolution: FC<AddSolutionProps> = ({
  setIsHiddenAddSolutionBtn,
  moveDown,
  moveUp,
  disabledUp,
  disabledDown,
  isShowMoveBtn,
  isShowDeleteBtn = false,
  setAddSolutionCount,
  isEdit = false,
  item,
}) => {
  const [solutionVal, setSolutionVal] = useState<string | null>(
    isEdit && item.id < 4 ? item.id : null
  )

  const onChange = (value: string) => {
    setSolutionVal(value)
  }

  const [radioSolutionArray, setRadioSolutionArray] = useState<RadioSolutionArray[]>([
    {
      id: '1',
    },
    {
      id: '2',
    },
    {
      id: '3',
    },
  ])

  const [expandOption, setExpandOption] = useState<boolean>(false)

  const removeRadioSolution = (target) => {
    setRadioSolutionArray(radioSolutionArray.filter((i) => i.id !== target.id))
  }

  const addRadioSolution = () => {
    setRadioSolutionArray([...radioSolutionArray, { id: `${radioSolutionArray.length + 1}` }])
  }

  const addExpandOption = () => {
    setExpandOption(true)
  }

  const handleSetAddSolutionCount = () => {
    setAddSolutionCount((prev) => prev.filter((i) => i.id !== item.id))
  }

  useEffect(() => {
    setExpandOption(false)
    if (solutionVal) setIsHiddenAddSolutionBtn(true)
  }, [solutionVal])

  return (
    <div className={style.root}>
      <div className={style.select}>
        <Select
          dropdownClassName={style.selectQuestions}
          style={{ width: '180px' }}
          placeholder="解答方法を選択"
          onChange={onChange}
          disabled={isEdit && item.id < 4}
          value={solutionVal}
        >
          <Select.Option value="1">単一行</Select.Option>
          <Select.Option value="2">複数行</Select.Option>
          <Select.Option value="3">ラジオボタン</Select.Option>
          <Select.Option value="4">チェックボックス</Select.Option>
        </Select>

        {isShowMoveBtn && (
          <>
            <Button
              disabled={disabledUp}
              type="link"
              icon={<MoveUpIcon />}
              className={clsx(style.moveBtn, style.moveBtnUp)}
              onClick={moveUp}
            >
              <span>上に移動</span>
            </Button>

            <Button
              disabled={disabledDown}
              onClick={moveDown}
              type="link"
              icon={<MoveDownIcon />}
              className={clsx(style.moveBtn, style.moveBtnDown)}
            >
              下に移動
            </Button>

            {isShowDeleteBtn && (
              <Button
                onClick={handleSetAddSolutionCount}
                type="link"
                icon={<RemoveIcon />}
                className={clsx(style.removeBtn)}
              />
            )}
          </>
        )}
      </div>

      {(solutionVal === '1' || solutionVal === '2') && (
        <div className={style.wrapper}>
          <p className={style.wrapperTitle}>解答補足文</p>
          <Quill value={item.text} placeholder="解答補足文を入力してください" />
          <p className={style.note}>※未入力可</p>

          <div className={clsx(style.single, style.ml0)}>
            <Space size={16}>
              <p>文字数制限</p>
              <div>
                <Input type="number" style={{ width: '82px' }} />
                <span className={style.inputNote}>文字</span>
              </div>
            </Space>

            <Checkbox>文字数制限無し</Checkbox>
          </div>
        </div>
      )}
      {solutionVal === '3' && (
        <div className={style.wrapper}>
          <p className={style.wrapperTitle}>解答補足文</p>
          <Quill value={item.text} placeholder="解答補足文を入力してください" />
          <p className={style.note}>※未入力可</p>

          <div className={style.radioSolution}>
            {radioSolutionArray.map((i, index) => (
              <div key={i.id} className={style.radioSolutionItem}>
                <Radio>
                  <Input placeholder={`選択肢（${index + 1})`} style={{ width: '450px' }} />
                </Radio>
                <Button
                  type="link"
                  icon={<RemoveIcon />}
                  className={clsx(style.removeBtn, index < 2 && style.lastSolution)}
                  onClick={() => removeRadioSolution(i)}
                >
                  <span>選択肢を削除</span>
                </Button>
              </div>
            ))}
          </div>
          {expandOption && (
            <div className={style.expandWrapper}>
              <div className={style.radioSolutionItem}>
                <Radio>
                  <Input placeholder={'その他'} style={{ width: '450px' }} />
                </Radio>
                <Button
                  onClick={() => setExpandOption(false)}
                  type="link"
                  icon={<RemoveIcon />}
                  className={clsx(style.removeBtn)}
                >
                  <span>選択肢を削除</span>
                </Button>
              </div>
              <div className={style.single}>
                <Space size={16}>
                  <p>文字数制限</p>
                  <div>
                    <Input type="number" style={{ width: '82px' }} />
                    <span className={style.inputNote}>文字</span>
                  </div>
                </Space>

                <Checkbox>文字数制限無し</Checkbox>
              </div>
            </div>
          )}
          <div className={style.actionButtons}>
            <Button type="link" onClick={addRadioSolution} className={style.linkButton}>
              <span>選択肢を追加</span>
            </Button>
            {!expandOption && (
              <>
                <span>または</span>
                <Button type="link" className={style.linkButton} onClick={addExpandOption}>
                  <span>その他を追加</span>
                </Button>
              </>
            )}
          </div>
        </div>
      )}
      {solutionVal === '4' && (
        <div className={style.wrapper}>
          <p className={style.wrapperTitle}>解答補足文</p>
          <Quill value={item.text} placeholder="解答補足文を入力してください" />
          <p className={style.note}>※未入力可</p>

          <div className={style.radioSolution}>
            {radioSolutionArray.map((i, index) => (
              <div key={i.id} className={style.radioSolutionItem}>
                <Checkbox>
                  <Input placeholder={`選択肢（${index + 1})`} style={{ width: '450px' }} />
                </Checkbox>
                <Button
                  type="link"
                  icon={<RemoveIcon />}
                  className={clsx(style.removeBtn, index < 2 && style.lastSolution)}
                  onClick={() => removeRadioSolution(i)}
                >
                  <span>選択肢を削除</span>
                </Button>
              </div>
            ))}
          </div>
          {expandOption && (
            <div className={style.expandWrapper}>
              <div className={style.radioSolutionItem}>
                <Checkbox>
                  <Input placeholder="その他" style={{ width: '450px' }} />
                </Checkbox>
                <Button
                  type="link"
                  icon={<RemoveIcon />}
                  className={clsx(style.removeBtn)}
                  onClick={() => setExpandOption(false)}
                >
                  <span>選択肢を削除</span>
                </Button>
              </div>
              <div className={style.single}>
                <p>文字数制限</p>
                <div>
                  <Input type="number" style={{ width: '82px' }} />
                  <span className={style.inputNote}>文字</span>
                </div>
                <Checkbox>文字数制限無し</Checkbox>
              </div>
            </div>
          )}

          <div className={style.actionButtons}>
            <Button type="link" onClick={addRadioSolution} className={style.linkButton}>
              <span>選択肢を追加</span>
            </Button>
            {!expandOption && (
              <>
                <span>または</span>
                <Button type="link" className={style.linkButton} onClick={addExpandOption}>
                  <span>その他を追加</span>
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default AddSolution
