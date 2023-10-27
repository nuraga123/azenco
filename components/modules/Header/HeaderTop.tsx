import Link from 'next/link'
import CityButton from '@/components/elements/CityButton/CityButton'
import ProfileDropDown from './ProfileDropDown'
import styles from '@/styles/header/index.module.scss'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { $mode } from '@/context/mode'
import { useStore } from 'effector-react'
import usePopup from '@/hooks/usePopup'
import ModeToggler from '@/components/elements/ModeToggler/ModeToggler'

interface INavElement {
  href: string
  title: string
}

const HeaderTop = () => {
  const isMedia950 = useMediaQuery(950)

  const { toggleOpen, open, closePopup } = usePopup()

  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  const navsArr: INavElement[] = [
    {
      href: '/shopping-payment',
      title: 'Доставка и оплата',
    },
    {
      href: '/about',
      title: 'О компании',
    },
    {
      href: '/catalog',
      title: 'Каталог',
    },
    {
      href: '/contacts',
      title: 'Контакты',
    },
    {
      href: '/wholesale-byers',
      title: 'Оптовым покупателям',
    },
  ]

  return (
    <div className={styles.header__top}>
      <div className={`container ${styles.header__top__container}`}>
        {!isMedia950 && <CityButton />}
        {isMedia950 && (
          <button
            onClick={toggleOpen}
            className={`${styles.burger_menu} ${
              open ? styles.open : ''
            } ${darkModeClass}`}
          >
            <span />
            <span />
            <span />
          </button>
        )}
        <nav
          className={`${styles.header__nav} ${
            open ? styles.open : ''
          } ${darkModeClass}`}
        >
          <ul className={styles.header__nav__list}>
            {navsArr.map((el, index) => (
              <li key={index} className={styles.header__nav__list__item}>
                <Link href={el.href} passHref legacyBehavior>
                  <a
                    className={`${styles.header__nav__list__item__link} ${darkModeClass}`}
                    onClick={closePopup}
                  >
                    {el.title}
                  </a>
                </Link>
              </li>
            ))}
            {isMedia950 && (
              <li className={`${styles.header__nav__list__item}`}>
                <CityButton />
              </li>
            )}
            {isMedia950 && (
              <li className={`${styles.header__nav__list__item}`}>
                <ModeToggler />
              </li>
            )}
          </ul>
        </nav>
        <ProfileDropDown />
      </div>
    </div>
  )
}

export default HeaderTop
