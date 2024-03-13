import Link from 'next/link'
import { useEffect, useState } from 'react'
import styles from '@/styles/layout/index.module.scss'
import { useRouter } from 'next/router'

interface INavbarItem {
  text: string
  icon: JSX.Element
  url: string
  showNavbar: boolean
  toggleNavVisibility: () => void
}

const NavbarItem = ({
  text,
  icon,
  url,
  showNavbar,
  toggleNavVisibility,
}: INavbarItem) => {
  const router = useRouter()
  console.log(router)
  const [isActive, setIsActive] = useState<boolean>(false)

  const handleClick = () => {
    setIsActive(!isActive)
    toggleNavVisibility()
  }

  useEffect(() => {
    if (router.pathname.includes(url)) {
      setIsActive(true)
      console.log(router.asPath, url, router.pathname.includes(url))
    }
  }, [router.asPath, router.pathname, url])

  return (
    <li
      key={text}
      className={`${styles.navItem} ${isActive ? styles.active : ''}`}
    >
      <span className={styles.navItem__icon} onClick={handleClick}>
        {icon}
      </span>
      {showNavbar && (
        <Link href={url} passHref legacyBehavior>
          <a style={{ width: '100%' }}>
            <span className={styles.navItem__text}>{text}</span>
          </a>
        </Link>
      )}
    </li>
  )
}

export default NavbarItem
