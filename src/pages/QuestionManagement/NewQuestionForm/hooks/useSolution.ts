/* eslint-disable indent */
import { useState } from 'react'

type AddSolutionCount = {
  id: string
  text: string
}

export const useSolution = (isEdit = false) => {
  const [addSolutionCount, setAddSolutionCount] = useState<AddSolutionCount[]>(
    !isEdit
      ? [
          {
            id: '1',
            text: '',
          },
        ]
      : [
          {
            id: '1',
            text: '解答補足文解答補足文解答補足文解答補足文解答補足文解答補足文解答補足文解答補足文解答補足文解答補足文解答補足文解答補足文解答補足文解答補足文解答補足文解答補足文解答補足文解答補足文解答補足文解答補足文解答補足文解答補足文解答補足文解答補足文解答補足文解答補足文解答補足文解答補足文解答補足文',
          },
          {
            id: '2',
            text: '解答補足文解答補足文解答補足文解答補足文解答補足文解答補足文解答補足文解答補足文解答補足文解答補足文解答補足文解答補足文解答補足文解答補足文解答補足文解答補足文解答補足文解答補足文解答補足文解答補足文解答補足文解答補足文解答補足文解答補足文解答補足文解答補足文解答補足文解答補足文解答補足文',
          },
          {
            id: '3',
            text: '解答補足文解答補足文解答補足文解答補足文解答補足文解答補足文解答補足文解答補足文解答補足文解答補足文解答補足文解答補足文解答補足文解答補足文解答補足文解答補足文解答補足文解答補足文解答補足文解答補足文解答補足文解答補足文解答補足文解答補足文解答補足文解答補足文解答補足文解答補足文解答補足文',
          },
        ]
  )

  const [isHiddenAddSolutionBtn, setIsHiddenAddSolutionBtn] = useState<boolean>(false)

  const arrayMove = (arr, fromIndex, toIndex) => {
    const _arr = [...arr]
    const element = _arr[fromIndex]
    _arr.splice(fromIndex, 1)
    _arr.splice(toIndex, 0, element)

    setAddSolutionCount(_arr)
  }

  return {
    isHiddenAddSolutionBtn,
    addSolutionCount,
    setAddSolutionCount,
    setIsHiddenAddSolutionBtn,
    arrayMove,
  }
}
