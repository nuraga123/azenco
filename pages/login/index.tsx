import { useState } from 'react'
import Head from 'next/head'

import useRedirectByUserCheck from '@/hooks/useRedirectByUserCheck'
import AuthPage from '@/components/templates/AuthPage/AuthPage'
import HeaderAuth from '@/components/elements/AuthPage/HeaderAuth'

import '@/styles/globals.css'
import styles from '@/styles/auth/index.module.scss'

function Login() {
  const { shouldLoadContent } = useRedirectByUserCheck(true)
  const TextRegister = 'Siz qeydiyyatdan keçmisiniz ?'
  const TextLogin = 'Sizin hesabınız var ?'

  const [isLogin, setIsLogin] = useState(true)
  const switchIsLogin = () => setIsLogin(!isLogin)

  return (
    <>
      <Head>
        <title>AZENCO ASC | {shouldLoadContent ? 'Логин' : ''}</title>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/svg" sizes="32x32" href="/img/logo.svg" />
      </Head>

      <HeaderAuth>
        <button className={styles.button} onClick={switchIsLogin}>
          {isLogin ? TextRegister : TextLogin}
        </button>
      </HeaderAuth>

      <AuthPage isLogin={isLogin} />
    </>
  )
}

export default Login
