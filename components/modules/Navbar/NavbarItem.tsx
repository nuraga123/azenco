import Link from 'next/link'
import { useState } from 'react'
import styles from '@/styles/layout/index.module.scss'

interface INavbarItem {
  text: string
  icon: JSX.Element
  url: string
  key: number
  isNavVisible: boolean
  toggleNavVisibility: () => void
}

const NavbarItem = ({
  text,
  icon,
  url,
  key,
  isNavVisible,
  toggleNavVisibility,
}: INavbarItem) => {
  const [isActive, setIsActive] = useState<boolean>(false)

  const handleClick = () => {
    setIsActive(!isActive)
    toggleNavVisibility()
  }

  return (
    <li
      key={key}
      className={`${styles.navItem} ${isActive ? styles.active : ''}`}
    >
      <span onClick={handleClick}>{icon}</span>
      <Link href={url} passHref legacyBehavior>
        <a>
          <span className={styles.navItem__text}>{isNavVisible && text}</span>
        </a>
      </Link>
    </li>
  )
}

export default NavbarItem
