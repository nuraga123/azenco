import React from 'react'
import Link from 'next/link'

import useRedirectByUserCheck from '@/hooks/useRedirectByUserCheck'
import Layout from '@/components/layout/Layout'
import Head from '@/components/elements/Head/Head'
import Spinner from '@/components/modules/Spinner/Spinner'

import styles from '@/styles/barn/index.module.scss'

const MyBarn = () => {
  const { shouldLoadContent } = useRedirectByUserCheck()

  if (!shouldLoadContent) {
    return (
      <Layout title={`yüklənir`}>
        <Spinner top={40} widthPX={100} heightPX={100} loadingText="yüklənir" />
      </Layout>
    )
  } else {
    // Отображаем компонент AnbarItem только когда загрузка завершена и контент должен загружаться
    return (
      <Layout title={`Mənim anbarım`}>
        <div className={styles.barn}>
          <Head headTitle={`Mənim anbarım`} />

          <div className={styles.barn__wrapper}>
            <div>
              <Link href={`my/create-form`} passHref legacyBehavior>
                <a className={styles.barn__btn_add}>ANBAR YARADIN</a>
              </Link>
            </div>

            <div>
              <Link href={'/my/barn'} passHref legacyBehavior>
                <button className={styles.barn__ok}>Anbar materiallar</button>
              </Link>
            </div>

            <div>
              <Link href={'/my/lost-barn'} passHref legacyBehavior>
                <button className={styles.barn__not}>
                  Itirilmiş materiallar
                </button>
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default MyBarn
