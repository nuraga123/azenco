import Link from 'next/link'
import SearchInput from '@/components/elements/SearchInput/SearchInput'
import ModeToggler from '@/components/elements/ModeToggler/ModeToggler'
import { $mode } from '@/context/mode'
import { useStore } from 'effector-react'
import CartPopup from './CartPopup/CartPopup'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import styles from '@/styles/header/index.module.scss'
import Image from 'next/image'

const HeaderBottom = () => {
  const isMedia950 = useMediaQuery(950)

  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  return (
    <div className={`container ${styles.header__bottom}`}>
      <div className={`container ${styles.header__bottom__container}`}>
        <h1 className={styles.header__logo} id="header__logo">
          <Link href="/dashboard" passHref legacyBehavior>
            <a className={styles.header__logo__link}>
              <Image src="/img/logo.svg" alt="logo" width={40} height={25} />
              <span
                className={`${styles.header__logo__link__text} ${darkModeClass}`}
                style={{ letterSpacing: '2px' }}
              >
                AZENCO ASC
              </span>
            </a>
          </Link>
        </h1>

        <div className={styles.header__search}>
          <SearchInput />
        </div>

        <div className={styles.header__shopping_cart}>
          {!isMedia950 && <ModeToggler />}
          <CartPopup />
        </div>
      </div>
    </div>
  )
}

export default HeaderBottom
