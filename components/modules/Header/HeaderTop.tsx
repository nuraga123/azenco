import Link from 'next/link'
import ProfileDropDown from './ProfileDropDown'
import styles from '@/styles/header/index.module.scss'
import { $mode } from '@/context/mode'
import { useStore } from 'effector-react'
import usePopup from '@/hooks/usePopup'

interface INavElement {
  href: string
  title: string
}

const HeaderTop = () => {
  const { toggleOpen, open, closePopup } = usePopup()

  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  const navsArr: INavElement[] = [
    {
      href: '/anbar/my',
      title: 'Mənim Anbarım',
    },
    {
      href: '/products',
      title: 'Materiallar',
    },
    {
      href: '/anbar',
      title: 'Anbarlar',
    },
    {
      href: '/shipping-payment',
      title: 'Çatdırılma',
    },
    {
      href: '/contacts',
      title: 'Kontaktlar',
    },
    {
      href: '/about',
      title: 'Şirkət haqqında',
    },
    {
      href: '/catalog',
      title: 'Catalog',
    },
  ]

  return (
    <div className={styles.header__top}>
      <div className={`container ${styles.header__top__container}`}>
        <button
          onClick={toggleOpen}
          className={`${styles.burger_menu} ${
            open ? styles.open : ''
          } ${darkModeClass}`}
        >
          <span style={{ color: 'white' }}>Menyu</span>
        </button>

        {/* Вертикальное меню */}
        <nav
          className={`${styles.vertical_menu} ${
            open ? styles.open : ''
          } ${darkModeClass}`}
        >
          <ul className={styles.vertical_menu__list}>
            {navsArr.map((el, index) => (
              <li key={index} className={styles.vertical_menu__list__item}>
                <Link href={el.href} passHref legacyBehavior>
                  <a
                    className={`${styles.vertical_menu__list__item__link} ${darkModeClass}`}
                    onClick={closePopup}
                  >
                    {el.title}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <ProfileDropDown />
      </div>
    </div>
  )
}

export default HeaderTop
