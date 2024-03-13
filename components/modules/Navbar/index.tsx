import { useState } from 'react'
import LogoImg from '@/components/elements/LogoImg/LogoImg'
import { navbarArray } from './navbarArray'
import NavbarItem from './NavbarItem'
import styles from '@/styles/layout/index.module.scss'

const Navbar: React.FC = () => {
  const [isNavVisible, setIsNavVisible] = useState<boolean>(true)
  const [openNavbar, setOpenNavbar] = useState<boolean>(false)

  const toggleNavVisibility = () => setIsNavVisible((prev) => !prev)

  const handleOpenClick = () => setOpenNavbar(true)
  const handleCloseClick = () => setOpenNavbar(false)

  const handleMouseEnter = () => !isNavVisible && toggleNavVisibility()
  const handleMouseLeave = () => isNavVisible && toggleNavVisibility()

  const showNavbar: boolean = openNavbar || isNavVisible

  const navStyle: React.CSSProperties = {
    width: showNavbar ? '210px' : '70px',
  }

  return (
    <nav className={styles.nav} style={navStyle}>
      <div className={styles.logo}>
        <LogoImg />
        {isNavVisible && (
          <span className={styles.navItem__text}>Naviqasiya</span>
        )}

        <button onClick={handleOpenClick}>open</button>
        <button onClick={handleCloseClick}>close</button>
      </div>

      <ul
        style={{ borderTop: '3px solid #4caf50' }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {navbarArray.map((item) => (
          <div key={item.title}>
            <NavbarItem
              url={item.href}
              text={item.title}
              icon={item.icon}
              showNavbar={showNavbar}
              toggleNavVisibility={toggleNavVisibility}
            />
          </div>
        ))}
      </ul>
    </nav>
  )
}

export default Navbar
