import Layout from '@/components/layout/Layout'
import TheirOrderPage from '@/components/templates/OrderPage/TheirOrderPage'
import useRedirectByUserCheck from '@/hooks/useRedirectByUserCheck'
import '@/styles/globals.css'

const TheirOrder = () => {
  const { shouldLoadContent } = useRedirectByUserCheck()

  return (
    <>
      {shouldLoadContent && (
        <Layout title={'Sifariş'}>
          <TheirOrderPage />
        </Layout>
      )}
    </>
  )
}

export default TheirOrder
