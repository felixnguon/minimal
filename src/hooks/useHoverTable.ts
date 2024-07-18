import { useEffect } from 'react'

export const useHoverTable = () => {
  const addClassHover = (el: Element, rowEl: Element) => () => {
    el.getElementsByTagName('td')[0].classList.add('hovered')
    rowEl.classList.add('hovered')
  }

  const removeClassHover = (el: Element, rowEl: Element) => () => {
    el.getElementsByTagName('td')[0].classList.remove('hovered')
    rowEl.classList.remove('hovered')
  }

  useEffect(() => {
    const tableBody = document
      .getElementsByClassName('hasExpandedHoverBehavior')[0]
      .getElementsByClassName('ant-table-tbody')[0]
    const rowLevel0s = tableBody.getElementsByClassName('ant-table-row-level-0')
    const expandedRows = tableBody.getElementsByClassName('ant-table-expanded-row')

    Array.from(expandedRows).forEach((el, i) => {
      el.addEventListener('mouseover', addClassHover(el, rowLevel0s[i]))
      el.addEventListener('mouseleave', removeClassHover(el, rowLevel0s[i]))
    })

    return () => {
      Array.from(expandedRows).forEach((el, i) => {
        el.removeEventListener('mouseover', addClassHover(el, rowLevel0s[i]))
        el.removeEventListener('mouseleave', removeClassHover(el, rowLevel0s[i]))
      })
    }
  }, [])
}
