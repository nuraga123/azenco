import Head from 'next/head'
import { ILayoutProps } from '@/types/common'
import ProfileDropDown from '../modules/Header/ProfileDropDown'
import Navbar from '../modules/Navbar'
import LogoImg from '@/components/elements/LogoImg/LogoImg'
import styles from '@/styles/layout/index.module.scss'

const Layout = ({ children, title }: ILayoutProps) => {
  const mainWidth = +window?.innerWidth - 200

  return (
    <>
      <Head>
        <title>AZENCO | {title}</title>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/svg" sizes="32x32" href="/img/logo.svg" />
      </Head>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <Navbar />
          <div
            className={styles.wrapper__content}
            style={{ maxWidth: mainWidth || 1000 }}
          >
            <header className={styles.header}>
              <LogoImg />
              <h1 className={styles.header__title}>Azenco</h1>
              <ProfileDropDown />
            </header>
            <main className={styles.main}>{children}</main>
          </div>
        </div>
      </div>
    </>
  )
}

export default Layout
