import Head from '@/components/elements/Head/Head'
import Layout from '@/components/layout/Layout'
import MyOrdersPage from '@/components/templates/OrderPage/MyOrdersPage'
import useRedirectByUserCheck from '@/hooks/useRedirectByUserCheck'
import '@/styles/globals.css'

const MyOrder = () => {
  const { shouldLoadContent } = useRedirectByUserCheck()

  return (
    <>
      {shouldLoadContent && (
        <Layout title={'Mənim sifarişlərim'}>
          <div>
            <Head headTitle={'Mənim sifarişlərim'} />
            <MyOrdersPage />
          </div>
        </Layout>
      )}
    </>
  )
}

export default MyOrder
