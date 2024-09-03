import { useStore } from 'effector-react'
import Link from 'next/link'

import Layout from '@/components/layout/Layout'
import { $user } from '@/context/user'
import useRedirectByUserCheck from '@/hooks/useRedirectByUserCheck'

import spinnerStyles from '@/styles/spinner/index.module.scss'
import styles from '@/styles/barn/index.module.scss'
import '@/styles/globals.css'

const MyBarn = () => {
  const { shouldLoadContent } = useRedirectByUserCheck()

  // Получаем ID пользователя
  const { username } = useStore($user)

  // Отображаем спиннер, если происходит загрузка или контент не должен загружаться
  if (!shouldLoadContent) {
    return (
      <Layout title={`Anbar | ${username}`}>
        <div
          className={spinnerStyles.spinner}
          style={{
            width: '100px',
            height: '100px',
            top: '40%',
          }}
        />
      </Layout>
    )
  }

  // Отображаем компонент AnbarItem только когда загрузка завершена и контент должен загружаться
  return (
    <Layout title={`Anbar | ${username}`}>
      <div className={styles.barn}>
        <h1 className={styles.barn__title}>Anbardar: {username}</h1>

        <div className={styles.barn__wrapper}>
          <div>
            <Link href={`my/create-form`} passHref legacyBehavior>
              <a className={styles.barn__btn_add}>ANBAR YARADIN</a>
            </Link>
          </div>

          <Link href={'/my/barn'} passHref legacyBehavior>
            <button className={styles.barn__ok}>Anbar materiallar</button>
          </Link>

          <Link href={'/my/lost-barn'} passHref legacyBehavior>
            <button className={styles.barn__not}>Itirilmiş materiallar</button>
          </Link>
        </div>
      </div>
    </Layout>
  )
}

export default MyBarn
