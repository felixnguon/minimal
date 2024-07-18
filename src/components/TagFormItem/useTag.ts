import { useState } from 'react'
import { uniqueId } from 'lodash'

type Tag = {
  id: string
  name: string
  isSelected: boolean
}

const dummyTag: Tag[] = [
  {
    id: '1',
    name: '#タグ',
    isSelected: true,
  },
  {
    id: '2',
    name: '#タグ',
    isSelected: false,
  },
  {
    id: '3',
    name: '#タグ',
    isSelected: false,
  },
  {
    id: '4',
    name: '#タグ',
    isSelected: false,
  },
  {
    id: '5',
    name: '#タグ',
    isSelected: false,
  },
  {
    id: '6',
    name: '#タグ',
    isSelected: false,
  },
  {
    id: '7',
    name: '#タグ',
    isSelected: false,
  },
  {
    id: '8',
    name: '#タグ',
    isSelected: false,
  },
  {
    id: '9',
    name: '#タグ',
    isSelected: false,
  },
  {
    id: '10',
    name: '#タグ',
    isSelected: false,
  },
  {
    id: '11',
    name: '#タグ',
    isSelected: false,
  },
]

export const useTag = () => {
  const [tags, setTags] = useState<Tag[]>(dummyTag)
  const [inputTag, setInputTag] = useState<string>('')
  const [visibleTagModal, setVisibleTagModal] = useState<boolean>(false)
  const [closeTags, setCloseTags] = useState<Tag[]>([])

  const addTag = (e) => {
    e.preventDefault()
    setTags((prevTag) => [...prevTag, { id: uniqueId('__tag'), name: inputTag, isSelected: false }])
    setInputTag('')
  }

  const handleClose = (id) => {
    setCloseTags([...closeTags, tags.filter((tag) => tag.id === id)[0]])
    setTags((prevTag) => prevTag.filter((tag) => tag.id !== id))
  }

  const clickTag = (id) => {
    setTags((prevTag) =>
      prevTag.map((tag) => {
        if (tag.id === id) {
          return { ...tag, isSelected: !tag.isSelected }
        }
        return tag
      })
    )
  }

  const cancelModal = () => {
    setTags((prevTag) => [...prevTag, ...closeTags])
    setVisibleTagModal(false)
    setCloseTags([])
  }

  const confirmModal = () => {
    setCloseTags([])
    setVisibleTagModal(false)
  }

  return {
    tags,
    inputTag,
    visibleTagModal,
    addTag,
    setInputTag,
    clickTag,
    handleClose,
    setVisibleTagModal,
    cancelModal,
    confirmModal,
  }
}
