import React, { FC } from 'react'
import ReactQuill from 'react-quill'
import clsx from 'clsx'
import style from './Quill.module.scss'

interface OnChangeHandler {
  (e: any): void
}

interface QuillProps {
  toolbar?: Array<any>
  onChange?: OnChangeHandler
  value?: string
  readOnly?: boolean
  hasRule?: boolean
  placeholder?: string
}

const defaultToolbar = [
  ['bold', 'italic', 'underline', { color: [] }, { background: [] }], // toggled buttons
  // ['link', 'image'], tmp remove
  [{ align: 'center' }, { align: 'right' }, { align: 'justify' }],
  [{ list: 'check' }, { list: 'bullet' }, { list: 'ordered' }, { indent: '-1' }, { indent: '+1' }],

  ['clean'], // remove formatting button
]

const Quill: FC<QuillProps> = ({
  toolbar = defaultToolbar,
  onChange,
  value = '',
  readOnly = false,
  hasRule = false,
  placeholder = '本文を入力してください',
}) => {
  const modules = {
    toolbar: toolbar,
  }

  return (
    <ReactQuill
      placeholder={placeholder}
      className={clsx(
        style.root,
        hasRule ? value === '<p><br></p>' && style.fieldError : undefined
      )}
      modules={modules}
      onChange={onChange}
      value={value}
      readOnly={readOnly}
    />
  )
}

export default Quill
