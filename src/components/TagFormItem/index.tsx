import React from 'react'
import style from './TagFormItem.module.scss'
import { Button, Input, Modal, Tag } from 'antd'
import clsx from 'clsx'
import { useTag } from '@/components/TagFormItem/useTag'

const TagFormItem = () => {
  const {
    tags,
    visibleTagModal,
    inputTag,
    addTag,
    setInputTag,
    clickTag,
    handleClose,
    setVisibleTagModal,
    cancelModal,
    confirmModal,
  } = useTag()

  return (
    <>
      <div className={style.tagsWrapper}>
        <div className={style.tagHead}>
          <p className={style.title}>タグを選択</p>
          <Button
            className={style.deleteTagBtn}
            type="link"
            onClick={() => setVisibleTagModal(true)}
          >
            登録されるタグ削除
          </Button>
          <Modal
            title="登録されるタグ削除"
            visible={visibleTagModal}
            onCancel={() => setVisibleTagModal(false)}
            footer={null}
            width={800}
            className={style.deleteTagModal}
          >
            <div className={clsx(style.tags, style.modalTags)}>
              {tags.map((item) => (
                <Tag
                  className={clsx(item.isSelected && style.tagSelected)}
                  color={item.isSelected ? '#294680' : '#F0F0F0'}
                  key={item.id}
                  closable
                  onClose={() => handleClose(item.id)}
                >
                  {item.name}
                </Tag>
              ))}
            </div>

            <div className={style.buttonsModal}>
              <Button className={clsx(style.actionBtn, style.cancelBtn)} onClick={cancelModal}>
                キャンセル
              </Button>
              <Button className={style.actionBtn} onClick={confirmModal} type="primary">
                登録
              </Button>
            </div>
          </Modal>
        </div>

        <div className={style.tags}>
          {tags.map((item) => (
            <Tag
              className={clsx(item.isSelected && style.tagSelected)}
              color={item.isSelected ? '#294680' : '#F0F0F0'}
              key={item.id}
              onClick={() => clickTag(item.id)}
            >
              {item.name}
            </Tag>
          ))}
        </div>

        <Input
          placeholder="タグを入力して[Enter] キーを押しなさい"
          onPressEnter={addTag}
          style={{ width: '350px', fontWeight: 300 }}
          value={inputTag}
          onChange={(e) => setInputTag(e.target.value)}
        />
      </div>
      <p className={style.note}>※未設定可</p>
    </>
  )
}

export default TagFormItem
