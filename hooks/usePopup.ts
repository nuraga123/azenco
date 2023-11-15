import { useEffect, useState } from 'react'

const usePopup = () => {
  const [open, setOpen] = useState(false)
  const header__logo = document.getElementById('header__logo')
  const toggleOpen = () => {
    window.scrollTo(0, 0)
    document.querySelector('.overlay')?.classList.toggle('open')
    document.querySelector('.body')?.classList.toggle('overflow-hidden')
    setOpen(!open)
  }

  const closePopup = () => {
    window.scrollTo(0, 0)
    document.querySelector('.overlay')?.classList.remove('open')
    document.querySelector('.body')?.classList.remove('overflow-hidden')
    setOpen(false)
  }

  useEffect(() => {
    if (!open && header__logo) {
      header__logo.style.zIndex = '40'
      header__logo.style.display = 'block'
    }

    if (open && header__logo) {
      header__logo.style.display = 'none'
    }

    const overlay = document.querySelector('.overlay')

    overlay?.addEventListener('click', closePopup)

    return () => overlay?.removeEventListener('click', closePopup)
  }, [header__logo, open])

  return { toggleOpen, open, closePopup }
}

export default usePopup
