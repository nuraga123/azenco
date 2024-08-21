import Layout from '@/components/layout/Layout'
import useRedirectByUserCheck from '@/hooks/useRedirectByUserCheck'
import '@/styles/globals.css'

const MyOrder = () => {
  const { shouldLoadContent } = useRedirectByUserCheck()

  return (
    <>
      {shouldLoadContent && (
        <Layout title={'Mənim sifarişlərim'}>
          Mənim sifarişlərim {/* <MyOrderPage /> */}
        </Layout>
      )}
    </>
  )
}

export default MyOrder
