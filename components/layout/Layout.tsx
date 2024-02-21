import Head from 'next/head'
import Header from '@/components/modules/Header/Header'
import { ILayoutProps } from '@/types/common'

const Layout = ({ children, title }: ILayoutProps) => (
  <>
    <Head>
      <title>AZENCO | {title}</title>
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="icon" type="image/svg" sizes="32x32" href="/img/logo.svg" />
    </Head>
    <Header />
    <div className="overlay" />
    <div>{children}</div>
  </>
)

export default Layout
