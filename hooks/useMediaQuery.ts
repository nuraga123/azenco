import { getWindowWidth } from '@/utils/common'
import { useEffect, useState } from 'react'

const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState(getWindowWidth())

  const handleRezise = () => setWindowWidth(getWindowWidth())

  useEffect(() => {
    window.addEventListener('resize', handleRezise, true)

    return () => window.removeEventListener('resize', handleRezise, true)
  }, [])

  return { windowWidth, handleRezise }
}

export const useMediaQuery = (maxWidth: number) => {
  const {
    handleRezise,
    windowWidth: { windowWidth },
  } = useWindowWidth()

  const [isMedia, setIsMedia] = useState(false)

  useEffect(() => {
    windowWidth <= maxWidth ? setIsMedia(true) : setIsMedia(false)
  }, [handleRezise, maxWidth, windowWidth])
  return isMedia
}
