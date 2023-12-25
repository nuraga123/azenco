import Layout from '@/components/layout/Layout'
import ShippingPayment from '@/components/templates/ShippingPayment/ShippingPayment'
import useRedirectByUserCheck from '@/hooks/useRedirectByUserCheck'
import '@/styles/globals.css'

function ShippingPaymentPage() {
  const { shouldLoadContent } = useRedirectByUserCheck()
  return (
    <>
      {shouldLoadContent && (
        <Layout title={'Çatdırılma'}>
          <main>
            {/* <Breadcrumbs
              getDefaultTextGenerator={getDefaultTextGenerator}
              getTextGenerator={getTextGenerator}
            /> */}
            <ShippingPayment />
          </main>
        </Layout>
      )}
    </>
  )
}

export default ShippingPaymentPage
