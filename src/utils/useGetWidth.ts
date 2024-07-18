import { useEffect, useState } from 'react'

export const useGetWidth = () => {
  const [width, setWidth] = useState<number>(0)

  const getInnerWidth = () => {
    setWidth(window.innerWidth)
  }

  useEffect(() => {
    getInnerWidth()
    window.addEventListener('resize', getInnerWidth)

    return () => window.removeEventListener('resize', getInnerWidth)
  }, [])

  return {
    width,
  }
}
