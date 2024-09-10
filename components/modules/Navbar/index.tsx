import React, { useState } from 'react'
import { navbarArray } from './navbarArray'
import NavbarItem from './NavbarItem'
import styles from '@/styles/layout/index.module.scss'
import { $setInOpenNavbar } from '@/context/navbar'

const Navbar: React.FC = () => {
  const storageIsOpen =
    localStorage.getItem('isOpen') === 'open' ? 'open' : 'close'
  const [isOpen, setIsOpen] = useState<'close' | 'open'>(storageIsOpen)

  const [isNavVisible, setIsNavVisible] = useState<boolean>(false)

  const toggleNavVisibility = () => setIsNavVisible((prev) => !prev)

  const handleToggle = () => {
    if (isOpen === 'open') {
      setIsOpen('close')
      $setInOpenNavbar('close')
      localStorage.setItem('isOpen', 'close')
    }

    if (isOpen === 'close') {
      setIsOpen('open')
      $setInOpenNavbar('open')
      localStorage.setItem('isOpen', 'open')
    }
  }

  const handleMouseEnter = () => !isNavVisible && toggleNavVisibility()
  const handleMouseLeave = () => isNavVisible && toggleNavVisibility()

  const showNavbar: boolean = (isOpen === 'open' ? true : false) || isNavVisible

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
            checked={isOpen === 'open' ? true : false}
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
