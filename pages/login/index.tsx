import { useEffect, useState } from 'react'
import Head from 'next/head'

import useRedirectByUserCheck from '@/hooks/useRedirectByUserCheck'
import AuthPage from '@/components/templates/AuthPage/AuthPage'
import { getWorkingServer } from '@/app/api/auth'

import '@/styles/globals.css'
import styles from '@/styles/auth/index.module.scss'

function Login() {
  const { shouldLoadContent } = useRedirectByUserCheck(true)
  console.log(shouldLoadContent)

  const [message, setMessage] = useState<boolean>(false)

  useEffect(() => {
    const workingServer = async () => {
      try {
        const response: boolean = await getWorkingServer()
        console.log(response)
        setMessage(response)
      } catch (error) {
        console.log('Error:', error)
      }
    }

    // Устанавливаем интервал для регулярных запросов
    // Здесь 5000 - интервал в миллисекундах (например, каждые 5 секунд)
    const intervalId = setInterval(workingServer, 5000)

    // Очищаем интервал при размонтировании компонента
    return () => clearInterval(intervalId)
  }, [])

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
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#f5f5f5',
          zIndex: 999,
        }}
      >
        {message ? (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div
              style={{
                width: '30px',
                height: '30px',
                margin: '10px',
                backgroundColor: 'green',
                border: '1px solid #5ac936',
                borderRadius: '50%',
                boxShadow: '3px 3px 5px rgba(0, 0, 0, 0.5)',
                zIndex: 999,
              }}
            />
            <p>server işləyir 😊</p>
          </div>
        ) : (
          <>
            <div
              style={{
                width: '30px',
                height: '30px',
                margin: '10px',
                backgroundColor: 'red',
                border: '1px solid #5ac936',
                borderRadius: '50%',
                boxShadow: '3px 3px 5px rgba(0, 0, 0, 0.5)',
                zIndex: 999,
              }}
            />
            <p>server işləmir 😞</p>
          </>
        )}
        <button
          style={{ margin: 10 }}
          className={styles.button}
          onClick={switchIsLogin}
        >
          {isLogin ? 'Siz qeydiyyatdan keçmisiniz ?' : 'Sizin hesabınız var ?'}
        </button>
      </div>
      <AuthPage isLogin={isLogin} />
    </>
  )
}

export default Login
