import { NextRouter } from 'next/router'

export const getWindowWidth = () => {
  const { innerWidth: windowWidth } =
    typeof window !== 'undefined' ? window : { innerWidth: 0 }

  return { windowWidth }
}

export const formatPrice = (num: number) => {
  const price = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  return price.replace('.00', '')
}

export const createSelectOption = (value: string | number) => ({
  value,
  label: value,
})

export const getQueryParamOnFirstRender = (
  queryName: string,
  router: NextRouter
) =>
  router.query[queryName] ||
  router.asPath.match(new RegExp(`[&?]${queryName}=(.*)(&|$)`))

export const toggleClassNamesForOverlayAndBody = (
  overlayClassName: string = 'open'
) => {
  document.querySelector('.overlay')?.classList.toggle(overlayClassName)
  document.querySelector('.body')?.classList.toggle('overflow-hidden')
}

export const removeClassNamesForOverlayAndBody = () => {
  document.querySelector('.overlay')?.classList.remove('open')
  document.querySelector('.overlay')?.classList.remove('open-search')
  document.querySelector('.body')?.classList.remove('overflow-hidden')
}
