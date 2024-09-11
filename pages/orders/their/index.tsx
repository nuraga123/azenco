import Layout from '@/components/layout/Layout'
import Head from '@/components/elements/Head/Head'
import TheirOrderPage from '@/components/templates/OrderPage/TheirOrderPage'
import useRedirectByUserCheck from '@/hooks/useRedirectByUserCheck'
import '@/styles/globals.css'

const TheirOrder = () => {
  const { shouldLoadContent } = useRedirectByUserCheck()

  return (
    <>
      {shouldLoadContent && (
        <Layout title={'Digər anbar-istifadəçilərdən gələn sifarişlər'}>
          <Head headTitle={'Digər anbar-istifadəçilərdən gələn sifarişlər'} />
          <TheirOrderPage />
        </Layout>
      )}
    </>
  )
}

export default TheirOrder
