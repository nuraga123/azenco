import Head from 'next/head'

import useRedirectByUserCheck from '@/hooks/useRedirectByUserCheck'
import AuthPage from '@/components/templates/AuthPage/AuthPage'

import '@/styles/globals.css'

function Auth() {
  const { shouldLoadContent } = useRedirectByUserCheck(true)

  return (
    <>
      <Head>
        <title>AZENCO ASC | {shouldLoadContent ? 'Логин' : ''}</title>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/svg" sizes="32x32" href="/img/logo.svg" />
      </Head>
      {shouldLoadContent && <AuthPage />}
    </>
  )
}

export default Auth
