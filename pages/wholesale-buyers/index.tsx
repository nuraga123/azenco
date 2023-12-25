import Layout from '@/components/layout/Layout'
import ContactsPage from '@/components/templates/ContactsPage/ContactsPage'
import useRedirectByUserCheck from '@/hooks/useRedirectByUserCheck'
import '@/styles/globals.css'

const WholesaleBuyers = () => {
  const { shouldLoadContent } = useRedirectByUserCheck()

  return (
    <>
      {shouldLoadContent && (
        <Layout title={'Topdan alıcılar üçün'}>
          <ContactsPage isWholesaleBuyersPage={true} />
        </Layout>
      )}
    </>
  )
}

export default WholesaleBuyers
