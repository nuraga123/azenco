import { useState } from 'react'
import LogoImg from '@/components/elements/LogoImg/LogoImg'
import { navbarArray } from './navbarArray'
import NavbarItem from './NavbarItem'
import styles from '@/styles/layout/index.module.scss'

const Navbar = () => {
  const [isNavVisible, setIsNavVisible] = useState<boolean>(true)
  const toggleNavVisibility = () => setIsNavVisible((prev) => !prev)

  return (
    <nav className={styles.nav}>
      <div className={styles.logo} onClick={toggleNavVisibility}>
        <LogoImg />
        {isNavVisible && (
          <span className={styles.navItem__text}>Naviqasiya</span>
        )}
      </div>
      <ul>
        {navbarArray.length &&
          navbarArray.map((item, index) => (
            <NavbarItem
              key={index}
              url={item.href}
              text={item.title}
              icon={item.icon}
              isNavVisible={isNavVisible}
              toggleNavVisibility={toggleNavVisibility}
            />
          ))}
      </ul>
    </nav>
  )
}

export default Navbar
