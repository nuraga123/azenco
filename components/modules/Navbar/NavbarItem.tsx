import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import styles from '@/styles/layout/index.module.scss'

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
  const [isActive, setIsActive] = useState<boolean>(false)

  const handleClick = () => {
    setIsActive(!isActive)
    toggleNavVisibility()
  }

  useEffect(() => {
    if (router.pathname.includes(url)) setIsActive(true)
  }, [router.asPath, router.pathname, url])

  return (
    <li
      key={text}
      className={`${styles.navItem} ${isActive ? styles.active : ''}`}
    >
      <span className={styles.navItem__icon} onClick={handleClick}>
        <Link href={url} passHref legacyBehavior>
          {icon}
        </Link>
      </span>
      {showNavbar && (
        <Link href={url} passHref legacyBehavior>
          <a style={{ width: '100vw' }}>
            <span className={styles.navItem__text}>{text}</span>
          </a>
        </Link>
      )}
    </li>
  )
}

export default NavbarItem
