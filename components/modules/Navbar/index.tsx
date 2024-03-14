import React, { useState } from 'react'
import { navbarArray } from './navbarArray'
import NavbarItem from './NavbarItem'
import styles from '@/styles/layout/index.module.scss'

const Navbar: React.FC = () => {
  const [isNavVisible, setIsNavVisible] = useState<boolean>(true)
  const [isOpen, setIsOpen] = useState<boolean>(true)

  const toggleNavVisibility = () => setIsNavVisible((prev) => !prev)
  const handleToggle = () => setIsOpen(!isOpen)

  const handleMouseEnter = () => !isNavVisible && toggleNavVisibility()
  const handleMouseLeave = () => isNavVisible && toggleNavVisibility()

  const showNavbar: boolean = isOpen || isNavVisible

  const navStyle: React.CSSProperties = {
    width: showNavbar ? '250px' : '100px',
  }

  return (
    <nav className={styles.nav} style={navStyle}>
      <div className={styles.logo}>
        <div className={styles.logo__content}>
          <span>Menyu</span>
        </div>
        <div className={styles.logo__content}>
          <input
            type="checkbox"
            id="toggleSwitch"
            className={styles.toggleSwitch}
            checked={isOpen}
            onChange={handleToggle}
          />
          <label htmlFor="toggleSwitch" className={styles.toggleLabel}>
            <div className={styles.toggleButton} />
          </label>
        </div>
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
