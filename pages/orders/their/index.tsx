import Layout from '@/components/layout/Layout'
import useRedirectByUserCheck from '@/hooks/useRedirectByUserCheck'
import '@/styles/globals.css'

const TheirOrder = () => {
  const { shouldLoadContent } = useRedirectByUserCheck()

  return (
    <>
      {shouldLoadContent && (
        <Layout title={'Sifariş'}>
          {/* <TheirOrderPage /> */}
          Anbar işçilərinin sifarişləri
        </Layout>
      )}
    </>
  )
}

export default TheirOrder
