import Head from 'next/head'
import { ILayoutProps } from '@/types/common'
import ProfileDropDown from '../modules/Header/ProfileDropDown'
import Navbar from '../modules/Navbar'
import LogoImg from '@/components/elements/LogoImg/LogoImg'
import ServerStatusComponent from '../elements/AuthPage/ServerStatusComponent'

import styles from '@/styles/layout/index.module.scss'
import BackBtn from '../elements/btn/BackBtn'
import ReloadBtn from '../elements/btn/ReloadBtn'

const Layout = ({ children, title }: ILayoutProps) => {
  console.log()

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
          <div className={styles.wrapper__content}>
            <header className={styles.header}>
              <BackBtn />
              <ReloadBtn />
              <br />
              <ServerStatusComponent>{''}</ServerStatusComponent>
              <div className={styles.classFlex}>
                <LogoImg />
                <h1 className={styles.header__title}>AZENCO ASC</h1>
              </div>
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
