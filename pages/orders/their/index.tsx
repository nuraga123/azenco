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
          digər anbar-istifadəçilərdən gələn sifarişlər
        </Layout>
      )}
    </>
  )
}

export default TheirOrder
