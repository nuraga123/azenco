import { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { AppProps } from 'next/app'
import { withHydrate } from 'effector-next'
import NextNProgress from 'nextjs-progressbar'

import '@/styles/globals.css'

const enhance = withHydrate()

function App({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    mounted && (
      <>
        <NextNProgress options={{ showSpinner: false }} height={5} />
        <Component {...pageProps} />
        <ToastContainer
          position="top-right"
          hideProgressBar={false}
          closeOnClick
          rtl={false}
          limit={1}
          theme="light"
        />
      </>
    )
  )
}

export default enhance(App as React.FC<AppProps>)
