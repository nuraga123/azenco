import { checkUserAuthFx } from '@/app/api/auth'
import Layout from '@/components/layout/Layout'
import ContactsPage from '@/components/templates/ContactsPage/ContactsPage'
import useRedirectByUserCheck from '@/hooks/useRedirectByUserCheck'
import '@/styles/globals.css'

const WholesaleBuyers = () => {
  const { shouldLoadContent } = useRedirectByUserCheck()

  const getLoginCheck = async () => {
    const loginCheckData = await checkUserAuthFx('/users/login-check')
    console.log('loginCheckData')
    console.log(loginCheckData)
  }

  return (
    <>
      {shouldLoadContent && (
        <Layout title={'Topdan alıcılar üçün'}>
          <ContactsPage />
          <button onClick={getLoginCheck}>GO</button>
        </Layout>
      )}
    </>
  )
}

export default WholesaleBuyers
