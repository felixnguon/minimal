import { useEffect, useState } from 'react'

export const useGetHeight = () => {
  const [height, setHeight] = useState<number>(0)

  const getInnerHeight = () => {
    setHeight(window.innerHeight)
  }

  useEffect(() => {
    getInnerHeight()
    window.addEventListener('resize', getInnerHeight)

    return () => window.removeEventListener('resize', getInnerHeight)
  }, [])

  return {
    height,
  }
}
