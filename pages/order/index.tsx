import Layout from '@/components/layout/Layout'
import OrderPage from '@/components/templates/OrderPage/OrderPage'
import useRedirectByUserCheck from '@/hooks/useRedirectByUserCheck'
import '@/styles/globals.css'

const Order = () => {
  const { shouldLoadContent } = useRedirectByUserCheck()

  return (
    <>
      {shouldLoadContent && (
        <Layout title={'Sifariş'}>
          <OrderPage />
        </Layout>
      )}
    </>
  )
}

export default Order
