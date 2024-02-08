import { useEffect, useState } from 'react'
import Head from 'next/head'

import useRedirectByUserCheck from '@/hooks/useRedirectByUserCheck'
import AuthPage from '@/components/templates/AuthPage/AuthPage'
import { getWorkingServer } from '@/app/api/auth'

import '@/styles/globals.css'

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
        console.error('Error:', error)
      }
    }

    // Вызываем fetchData при монтировании компонента
    workingServer()

    // Устанавливаем интервал для регулярных запросов
    // Здесь 5000 - интервал в миллисекундах (например, каждые 5 секунд)
    const intervalId = setInterval(workingServer, 5000)

    // Очищаем интервал при размонтировании компонента
    return () => clearInterval(intervalId)
  }, [])

  return (
    <>
      <Head>
        <title>AZENCO ASC | {shouldLoadContent ? 'Логин' : ''}</title>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/svg" sizes="32x32" href="/img/logo.svg" />
      </Head>
      {message && (
        <div
          style={{
            position: 'absolute',
            width: '20px',
            height: '20px',
            margin: '10px',
            backgroundColor: 'green',
            border: '1px solid #5ac936',
            borderRadius: '50%',
            zIndex: 999,
            boxShadow: '3px 3px 5px rgba(0, 0, 0, 0.5)',
          }}
        />
      )}
      <AuthPage />
    </>
  )
}

export default Login
